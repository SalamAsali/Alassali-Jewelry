import { NextRequest, NextResponse } from 'next/server'
import { CHAINS_ENABLED } from '@/lib/featureFlags'
import { getChainBySlug } from '@/lib/sanity'

export const revalidate = 60

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!CHAINS_ENABLED) {
    return NextResponse.json({ error: 'Chains are currently unavailable' }, { status: 404 })
  }

  const { slug } = await params
  const chain = await getChainBySlug(slug)

  if (!chain) {
    return NextResponse.json({ error: 'Chain not found' }, { status: 404 })
  }

  return NextResponse.json(chain)
}
