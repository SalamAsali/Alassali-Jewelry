import { NextRequest, NextResponse } from 'next/server'
import { getHomepage, isDatoCMSConfigured } from '@/lib/datocms'

export const dynamic = 'force-dynamic'

// Default homepage content when CMS is not configured or no content exists
const DEFAULT_HOMEPAGE = {
  title: 'Homepage',
  heroTitle: '',
  heroSubtitle: '',
  featuredItems: [],
  testimonials: [],
  processSteps: [],
  madeInTorontoImages: [],
}

export async function GET(request: NextRequest) {
  try {
    // Check if DatoCMS is configured
    if (!isDatoCMSConfigured()) {
      console.warn('[Homepage API] DatoCMS not configured, returning defaults')
      return NextResponse.json(DEFAULT_HOMEPAGE)
    }

    const homepage = await getHomepage()

    if (homepage) {
      return NextResponse.json(homepage)
    }

    // Return default if no homepage content exists
    return NextResponse.json(DEFAULT_HOMEPAGE)
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    console.error('Homepage API error:', error)
    
    // Return defaults for configuration errors
    if (msg.includes('not configured') || msg.includes('not set')) {
      return NextResponse.json(DEFAULT_HOMEPAGE)
    }
    
    return NextResponse.json(
      { error: msg || 'Internal server error' },
      { status: 500 }
    )
  }
}
