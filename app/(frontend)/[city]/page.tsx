import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { LOCATIONS, getLocation, getFullAddress } from '@/lib/locations'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return LOCATIONS.map(l => ({ city: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc || loc.slug === 'toronto') return {}
  return {
    title: `Custom Jeweler in ${loc.name} | Al-Assali Custom Jewelry`,
    description: `${loc.name}'s premier custom jeweler. Handcrafted engagement rings, gold chains, grillz & more. 10K, 14K, 18K gold. Book your free consultation.`,
    alternates: { canonical: `https://www.alasalicustomjewelry.ca/${city}` },
  }
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) notFound()

  // Toronto → homepage (homepage IS the Toronto page)
  if (loc.slug === 'toronto') redirect('/')

  // Oakville and other cities get their own page
  // For now redirect to /locations until dedicated city pages are built
  redirect('/locations')
}
