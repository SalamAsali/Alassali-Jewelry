// Server component — fetches live Google Business Profile reviews at build time
// (or revalidates every 24h) and passes them to the client scroll component.
// Falls back gracefully to curated reviews if the API key is unset or the fetch fails.

import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'
import ReviewsScroller from './ReviewsScroller'

type Props = {
  heading?: string
  variant?: 'dark' | 'light'
}

export default async function LiveReviewsStrip({ heading = 'What Our Toronto Clients Say', variant = 'dark' }: Props) {
  const { reviews, rating, totalReviews, source } = await fetchGoogleReviews()

  const hasLive = source === 'live' && reviews.length > 0

  return (
    <ReviewsScroller
      reviews={hasLive ? reviews : undefined}
      rating={hasLive ? rating : undefined}
      totalReviews={totalReviews}
      heading={heading}
      variant={variant}
    />
  )
}
