import HomePageClient from './HomePageClient'
import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'

export const dynamic = 'force-dynamic'

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
