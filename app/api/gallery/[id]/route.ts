import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }

    const { id } = await params

    const result = await payloadInstance.findByID({
      collection: 'gallery',
      id,
      depth: 1,
    })

    if (!result) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // Transform the data to match frontend expectations
    const transformed = {
      id: result.id,
      title: result.title,
      description: result.description,
      image: result.image,
      category: result.category,
      featured: result.featured,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }

    return NextResponse.json(transformed)
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    const missingTable = /relation "gallery" does not exist|does not exist/i.test(msg)
    if (missingTable) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    console.error('Gallery item API error:', error)
    return NextResponse.json(
      { error: msg || 'Internal server error' },
      { status: 500 }
    )
  }
}
