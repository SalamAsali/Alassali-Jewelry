import { NextRequest, NextResponse } from 'next/server'
import { getPages, getPageBySlug, isSanityConfigured } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Check if Sanity is configured
    if (!isSanityConfigured()) {
      console.warn('[Pages API] Sanity not configured')
      return NextResponse.json([])
    }

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const published = searchParams.get('published')

    if (slug) {
      // Get specific page by slug
      const page = await getPageBySlug(slug)

      if (page) {
        // Filter by published status if requested
        if (published === 'true' && !page.published) {
          return NextResponse.json({ error: 'Page not found' }, { status: 404 })
        }
        return NextResponse.json(page)
      }
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    // Get all pages (Sanity publishes by default; no published filter needed)
    const pages = await getPages()

    return NextResponse.json(pages)
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    console.error('Pages API error:', error)
    
    // Return empty array for configuration errors
    if (msg.includes('not configured') || msg.includes('not set')) {
      return NextResponse.json([])
    }
    
    return NextResponse.json(
      { error: msg || 'Internal server error' },
      { status: 500 }
    )
  }
}
