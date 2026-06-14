'use client'

import { useParams } from 'next/navigation'
import { ServicePageContent } from '@/components/bespoke/ServicePageContent'

export const dynamic = 'force-dynamic'

export default function CustomServicePage() {
  const params = useParams()
  const type = (params?.type as string) || 'general'
  return <ServicePageContent type={type} />
}
