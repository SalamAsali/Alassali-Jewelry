import { NextRequest, NextResponse } from 'next/server'
import { getGalleryItems, isDatoCMSConfigured } from '@/lib/datocms'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Check if DatoCMS is configured
    if (!isDatoCMSConfigured()) {
      console.warn('[Gallery API] DatoCMS not configured, returning empty array')
      return NextResponse.json([])
    }

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')

    const filter: { featured?: boolean; category?: string } = {}
    if (featured === 'true') {
      filter.featured = true
    }
    if (category) {
      filter.category = category
    }

    const items = await getGalleryItems({ filter, limit: 100 })

    // Transform the data to match frontend expectations
    const transformedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
      featured: item.featured,
    }))

    return NextResponse.json(transformedItems)
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Gallery API error:', error)
    
    // Return empty array for missing content/configuration errors
    if (msg.includes('not configured') || msg.includes('not set')) {
      return NextResponse.json([])
    }
    
    return NextResponse.json(
      { error: msg || 'Internal server error' },
      { status: 500 }
    )
  }
}
