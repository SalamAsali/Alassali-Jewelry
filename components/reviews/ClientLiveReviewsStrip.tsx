'use client'

// Client-side counterpart of LiveReviewsStrip for use inside client components
// (e.g. app/(frontend)/custom/[type]/page.tsx). Fetches /api/reviews on mount
// and renders the ReviewsScroller with the live data, falling back gracefully
// if the API errors or returns no live reviews.

import { useEffect, useState } from 'react'
import ReviewsScroller from './ReviewsScroller'
import type { GoogleReview } from '@/lib/reviews/googlePlaces'

type ApiResponse = {
  reviews: GoogleReview[]
  rating: number
  totalReviews: number
  source: 'live' | 'fallback'
}

type Props = {
  heading?: string
  variant?: 'dark' | 'light'
}

export default function ClientLiveReviewsStrip({ heading, variant = 'dark' }: Props) {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : null))
      .then((json: ApiResponse | null) => {
        if (!cancelled && json) setData(json)
      })
      .catch(() => {
        /* fall through to ReviewsScroller's built-in fallback */
      })
    return () => {
      cancelled = true
    }
  }, [])

  const hasLive = data?.source === 'live' && data.reviews.length > 0

  return (
    <ReviewsScroller
      reviews={hasLive ? data?.reviews : undefined}
      rating={hasLive ? data?.rating : undefined}
      totalReviews={data?.totalReviews}
      heading={heading}
      variant={variant}
    />
  )
}
