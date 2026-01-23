import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }

    // Get homepage content (should be single document)
    const result = await payloadInstance.find({
      collection: 'homepage',
      limit: 1,
    })

    if (result.docs && result.docs.length > 0) {
      return NextResponse.json(result.docs[0])
    }

    // Return default if no homepage content exists
    return NextResponse.json({
      title: 'Homepage',
      heroTitle: '',
      heroSubtitle: '',
      featuredItems: [],
      testimonials: [],
    })
  } catch (error) {
    console.error('Homepage API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
