import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'
import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'

export const dynamic = 'force-dynamic'

// Self-referential canonical + og:url for the highest-priority URL. Title and
// description are inherited from the root layout's metadata defaults.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: mergeOpenGraph({ url: '/' }),
}

export default async function Home() {
  const { reviews, rating, totalReviews, source } = await fetchGoogleReviews()

  // Pass live reviews down when the Places API returns them; client falls back
  // to its hardcoded curated quotes when source === 'fallback'.
  const liveReviews = source === 'live' && reviews.length > 0 ? reviews : undefined

  return (
    <HomePageClient
      liveReviews={liveReviews}
      liveRating={rating}
      liveReviewCount={totalReviews}
    />
  )
}
