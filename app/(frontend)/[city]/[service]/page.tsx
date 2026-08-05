import { notFound, redirect, permanentRedirect } from 'next/navigation'
import { LOCATIONS, SERVICES, getLocation, getService, GEO_CITIES } from '@/lib/locations'

type Props = { params: Promise<{ city: string; service: string }> }

export async function generateStaticParams() {
  return LOCATIONS.flatMap((loc) =>
    SERVICES.map((svc) => ({ city: loc.slug, service: svc.slug }))
  )
}

/**
 * Legacy hierarchical URLs (/oakville/custom-rings). Every city that has its
 * own bespoke landing page now 301s to the flat geo URL that ranks for it;
 * anything else falls back to the Toronto page.
 *
 * No generateMetadata here on purpose — these paths only ever redirect, so
 * emitting indexable metadata for them would compete with the real pages.
 */
export default async function CityServicePage({ params }: Props) {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getService(service)
  if (!loc || !svc) notFound()

  if ((GEO_CITIES as readonly string[]).includes(loc.slug)) {
    permanentRedirect(`/custom-${svc.formType}-${loc.slug}`)
  }

  redirect(`/custom-${svc.formType}-toronto`)
}
