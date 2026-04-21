import { NextResponse } from 'next/server'
import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'

export const revalidate = 86400

export async function GET() {
  const data = await fetchGoogleReviews()
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
