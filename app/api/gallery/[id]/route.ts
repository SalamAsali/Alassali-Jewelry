import { NextRequest, NextResponse } from 'next/server'
import { getGalleryItemById, isDatoCMSConfigured } from '@/lib/datocms'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if DatoCMS is configured
    if (!isDatoCMSConfigured()) {
      return NextResponse.json({ error: 'CMS not configured' }, { status: 503 })
    }

    const { id } = await params

    const item = await getGalleryItemById(id)

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // Transform the data to match frontend expectations
    const transformed = {
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
      featured: item.featured,
    }

    return NextResponse.json(transformed)
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    console.error('Gallery item API error:', error)
    return NextResponse.json(
      { error: msg || 'Internal server error' },
      { status: 500 }
    )
  }
}
