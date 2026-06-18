import { NextResponse } from 'next/server'
import { getPricingConfig } from '@/lib/sanity'

export const revalidate = 60

export async function GET() {
  const config = await getPricingConfig()

  if (!config) {
    return NextResponse.json(
      { error: 'Pricing config not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(config)
}
