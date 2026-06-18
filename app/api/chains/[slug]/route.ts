import { NextRequest, NextResponse } from 'next/server'
import { getChainBySlug } from '@/lib/sanity'

export const revalidate = 60

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const chain = await getChainBySlug(slug)

  if (!chain) {
    return NextResponse.json({ error: 'Chain not found' }, { status: 404 })
  }

  return NextResponse.json(chain)
}
