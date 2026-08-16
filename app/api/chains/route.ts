import { NextRequest, NextResponse } from 'next/server'
import { CHAINS_ENABLED } from '@/lib/featureFlags'
import { getChains } from '@/lib/sanity'
import type { ChainType, MetalColor } from '@/lib/sanity'

export const revalidate = 60

export async function GET(request: NextRequest) {
  if (!CHAINS_ENABLED) {
    return NextResponse.json({ error: 'Chains are currently unavailable' }, { status: 404 })
  }

  const { searchParams } = request.nextUrl
  const chainType = searchParams.get('chainType') as ChainType | null
  const metal = searchParams.get('metal') as MetalColor | null
  const featured = searchParams.get('featured')
  const limit = searchParams.get('limit')

  const chains = await getChains({
    ...(chainType && { chainType }),
    ...(metal && { metal }),
    ...(featured === 'true' && { featured: true }),
    active: true,
    limit: limit ? parseInt(limit, 10) : 100,
  })

  return NextResponse.json(chains)
}
