// Google Places API (Places API "Place Details") integration for live GBP reviews.
//
// Setup (one-time, by Salam):
//   1. Google Cloud Console → create (or pick) a project
//   2. Enable "Places API" for that project
//   3. APIs & Services → Credentials → create an API key
//   4. Restrict the key to "Places API" and, ideally, server IP / referrer
//   5. Add to Vercel env vars:
//        GOOGLE_PLACES_API_KEY=...     (server-only — never NEXT_PUBLIC_...)
//        GOOGLE_PLACES_PLACE_ID=ChIJ658z3OtDK4gRLyKtnfI5y-c  (already in siteConfig)
//
// Behaviour:
//   - Fetches up to 5 most-recent reviews at build time (or with Next's fetch cache
//     revalidating every 24h on each request) — Google Places only returns 5 at a time.
//   - Falls back to [] if API key is missing, request fails, or quota exhausted —
//     callers decide what to render in the fallback case (e.g. placeholder quotes).
//   - Zero client-side network calls — never exposes the API key.

import { SITE_CONFIG } from '@/lib/seo/siteConfig'

export type GoogleReview = {
  authorName: string
  rating: number
  text: string
  relativeTime: string
  timestamp: number
  profilePhotoUrl?: string
}

type PlacesDetailsResponse = {
  result?: {
    name?: string
    formatted_address?: string
    rating?: number
    user_ratings_total?: number
    reviews?: Array<{
      author_name: string
      profile_photo_url?: string
      rating: number
      relative_time_description: string
      text: string
      time: number
    }>
  }
  status?: string
  error_message?: string
}

const PLACE_ID = SITE_CONFIG.googleMapsPlaceId

// Verification anchors — the Places API response must match one of these name
// fragments and the address must contain this substring, otherwise we refuse
// to render the reviews. Prevents silently showing a stranger's reviews if the
// Place ID ever gets corrupted (env var swap, copy-paste error, etc.).
const EXPECTED_NAME_FRAGMENTS = ['al-assali', 'alassali']
const EXPECTED_ADDRESS_FRAGMENT = 'vaughan rd'

export async function fetchGoogleReviews(): Promise<{
  reviews: GoogleReview[]
  rating: number
  totalReviews: number
  source: 'live' | 'fallback'
}> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    return {
      reviews: [],
      rating: Number(SITE_CONFIG.aggregateRating.ratingValue),
      totalReviews: SITE_CONFIG.aggregateRating.reviewCount,
      source: 'fallback',
    }
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  url.searchParams.set('place_id', PLACE_ID)
  // Request `name` + `formatted_address` too so we can verify we're pulling
  // from the correct place before rendering any reviews.
  url.searchParams.set('fields', 'name,formatted_address,rating,user_ratings_total,reviews')
  url.searchParams.set('reviews_sort', 'newest')
  url.searchParams.set('reviews_no_translations', 'true')
  url.searchParams.set('language', 'en')
  url.searchParams.set('key', apiKey)

  try {
    const res = await fetch(url.toString(), {
      // Cache reviews for 24h to stay well under Places quota + keep pages fast.
      next: { revalidate: 86400, tags: ['google-reviews'] },
    })

    if (!res.ok) throw new Error(`Places API HTTP ${res.status}`)
    const data = (await res.json()) as PlacesDetailsResponse

    if (data.status !== 'OK' || !data.result) {
      throw new Error(data.error_message || `Places API status: ${data.status}`)
    }

    // Identity check: refuse to render reviews unless the returned place looks
    // like Al-Assali Jewelry Studio. Guards against accidentally pulling a
    // stranger's reviews if the Place ID ever gets corrupted.
    const name = (data.result.name || '').toLowerCase()
    const address = (data.result.formatted_address || '').toLowerCase()
    const nameMatches = EXPECTED_NAME_FRAGMENTS.some((f) => name.includes(f))
    const addressMatches = address.includes(EXPECTED_ADDRESS_FRAGMENT)
    if (!nameMatches || !addressMatches) {
      console.error(
        `[googlePlaces] Identity check FAILED — Place ID ${PLACE_ID} resolved to "${data.result.name}" at "${data.result.formatted_address}". Expected name to include one of [${EXPECTED_NAME_FRAGMENTS.join(', ')}] and address to include "${EXPECTED_ADDRESS_FRAGMENT}". Refusing to render these reviews.`,
      )
      return {
        reviews: [],
        rating: Number(SITE_CONFIG.aggregateRating.ratingValue),
        totalReviews: SITE_CONFIG.aggregateRating.reviewCount,
        source: 'fallback',
      }
    }

    const reviews = (data.result.reviews || []).map((r) => ({
      authorName: r.author_name,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relative_time_description,
      timestamp: r.time,
      profilePhotoUrl: r.profile_photo_url,
    }))

    return {
      reviews,
      rating: data.result.rating ?? Number(SITE_CONFIG.aggregateRating.ratingValue),
      totalReviews: data.result.user_ratings_total ?? SITE_CONFIG.aggregateRating.reviewCount,
      source: 'live',
    }
  } catch (err) {
    console.error('[googlePlaces] Failed to fetch reviews', err)
    return {
      reviews: [],
      rating: Number(SITE_CONFIG.aggregateRating.ratingValue),
      totalReviews: SITE_CONFIG.aggregateRating.reviewCount,
      source: 'fallback',
    }
  }
}
