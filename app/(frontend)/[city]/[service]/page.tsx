import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { LOCATIONS, SERVICES, getLocation, getService } from '@/lib/locations'

type Props = { params: Promise<{ city: string; service: string }> }

export async function generateStaticParams() {
  return LOCATIONS.flatMap((loc) =>
    SERVICES.map((svc) => ({ city: loc.slug, service: svc.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getService(service)
  if (!loc || !svc) return {}
  return {
    title: `${svc.name} in ${loc.name} | Al-Assali Custom Jewelry`,
    description: `${svc.name} handcrafted in ${loc.name}, Ontario. Premium 10K, 14K & 18K gold. Book your free consultation today.`,
    alternates: { canonical: `https://www.alasalicustomjewelry.ca/${city}/${service}` },
  }
}

export default async function CityServicePage({ params }: Props) {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getService(service)
  if (!loc || !svc) notFound()

  // Toronto service pages redirect to the main service pages
  if (loc.slug === 'toronto') {
    redirect(`/custom-${svc.formType}-toronto`)
  }

  // Oakville service pages redirect to main for now
  redirect(`/custom-${svc.formType}-toronto`)
}
