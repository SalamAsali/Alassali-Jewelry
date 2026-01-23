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
    const slug = searchParams.get('slug')
    const published = searchParams.get('published')

    if (slug) {
      // Get specific page by slug
      const result = await payloadInstance.find({
        collection: 'pages',
        where: {
          slug: { equals: slug },
          ...(published === 'true' ? { published: { equals: true } } : {}),
        },
        limit: 1,
      })

      if (result.docs && result.docs.length > 0) {
        return NextResponse.json(result.docs[0])
      }
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    // Get all pages
    const where: any = {}
    if (published === 'true') {
      where.published = { equals: true }
    }

    const result = await payloadInstance.find({
      collection: 'pages',
      where: Object.keys(where).length > 0 ? where : undefined,
      limit: 100,
      sort: '-createdAt',
    })

    return NextResponse.json(result.docs || [])
  } catch (error) {
    console.error('Pages API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
