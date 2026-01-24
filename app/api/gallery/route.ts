import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')

    const query: any = {}
    if (featured === 'true') {
      query.featured = { equals: true }
    }
    if (category) {
      query.category = { equals: category }
    }

    const result = await payloadInstance.find({
      collection: 'gallery',
      where: Object.keys(query).length > 0 ? query : undefined,
      limit: 100,
      sort: '-createdAt',
    })

    // Transform the data to match frontend expectations
    const transformedDocs = (result.docs || []).map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      image: doc.image, // This will be the media relation
      category: doc.category,
      featured: doc.featured,
    }))

    return NextResponse.json(transformedDocs)
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    const missingTable = /relation "gallery" does not exist|does not exist/i.test(msg)
    if (missingTable) {
      return NextResponse.json([])
    }
    console.error('Gallery API error:', error)
    return NextResponse.json(
      { error: msg || 'Internal server error' },
      { status: 500 }
    )
  }
}
