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
      depth: 2,
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
      processSteps: [],
      madeInTorontoImages: [],
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    const missingTable = /relation "homepage" does not exist|does not exist/i.test(msg)
    if (missingTable) {
      return NextResponse.json({
        title: 'Homepage',
        heroTitle: '',
        heroSubtitle: '',
        featuredItems: [],
        testimonials: [],
        processSteps: [],
        madeInTorontoImages: [],
      })
    }
    console.error('Homepage API error:', error)
    return NextResponse.json(
      { error: msg || 'Internal server error' },
      { status: 500 }
    )
  }
}
