import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCATIONS, getLocation, getFullAddress } from '@/lib/locations'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'
import CityHomeClient from './CityHomeClient'

/* ------------------------------------------------------------------ */
/*  Static params                                                     */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ city: loc.slug }))
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const location = getLocation(city)
  if (!location) return {}

  const title = `Custom Jeweler in ${location.name} | Al-Assali Custom Jewelry`
  const description = `${location.name}'s premier custom jeweler. Handcrafted engagement rings, gold chains, grillz & more. 10K, 14K, 18K gold. Book your free consultation.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.alasalicustomjewelry.ca/${city}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${city}`,
      siteName: SITE_CONFIG.brandName,
      type: 'website',
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) notFound()

  const { reviews, rating, totalReviews, source } = await fetchGoogleReviews()
  const liveReviews = source === 'live' && reviews.length > 0 ? reviews : undefined

  return (
    <CityHomeClient
      city={{
        name: loc.name,
        slug: loc.slug,
        address: loc.address,
        fullAddress: getFullAddress(loc),
        phone: loc.phone,
        neighborhoods: loc.neighborhoods,
      }}
      liveReviews={liveReviews}
      liveRating={rating}
      liveReviewCount={totalReviews}
    />
  )
}
