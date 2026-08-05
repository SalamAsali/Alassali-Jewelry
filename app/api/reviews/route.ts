import { NextResponse } from 'next/server'
import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'
import { GEO_CITIES, type City } from '@/lib/locations'

export const revalidate = 86400

export async function GET(request: Request) {
  const requested = new URL(request.url).searchParams.get('city')
  const city: City =
    requested && (GEO_CITIES as readonly string[]).includes(requested)
      ? (requested as City)
      : 'toronto'

  const data = await fetchGoogleReviews(city)
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
