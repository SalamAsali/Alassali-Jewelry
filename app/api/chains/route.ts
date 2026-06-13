import { NextRequest, NextResponse } from 'next/server'
import { getChains } from '@/lib/datocms'
import type { ChainType, MetalColor } from '@/lib/datocms'

export const revalidate = 60

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const chainType = searchParams.get('chainType') as ChainType | null
  const metal = searchParams.get('metal') as MetalColor | null
  const featured = searchParams.get('featured')
  const limit = searchParams.get('limit')

  const chains = await getChains({
    filter: {
      ...(chainType && { chainType }),
      ...(metal && { metal }),
      ...(featured === 'true' && { featured: true }),
      active: true,
    },
    limit: limit ? parseInt(limit, 10) : 100,
  })

  return NextResponse.json(chains)
}
