'use client'

import { useParams } from 'next/navigation'
import { ServicePageContent } from '@/components/bespoke/ServicePageContent'
import { getLocation } from '@/lib/locations'

export const dynamic = 'force-dynamic'

export default function CityServicePage() {
  const params = useParams()
  const citySlug = params?.city as string
  const service = params?.service as string

  // Extract the type from "custom-engagement-rings" → "engagement-rings"
  const type = service.replace(/^custom-/, '')

  const loc = getLocation(citySlug)
  if (!loc) return null

  return (
    <ServicePageContent
      type={type}
      city={{
        name: loc.name,
        slug: loc.slug,
        address: `${loc.address}, ${loc.city}, ${loc.province} ${loc.postalCode}`,
        phone: loc.phone,
        neighborhoods: loc.neighborhoods,
      }}
    />
  )
}
