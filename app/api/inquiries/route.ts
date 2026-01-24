import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }

    const body = await request.json()

    const result = await payloadInstance.create({
      collection: 'inquiries',
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || undefined,
        jewelryCategory: body.jewelryCategory || body.type || undefined,
        budget: body.budget || undefined,
        style: body.style || undefined,
        metalType: body.metalType || body.metal_type || undefined,
        stonePreferences: (body.stonePreferences || body.stone_preferences || []).map((s: string) =>
          typeof s === 'string' ? { stone: s } : s
        ),
        size: body.size || undefined,
        timeline: body.timeline || undefined,
        notes: body.notes || undefined,
        inspirationNames: body.inspirationNames || body.inspirationImages?.join(', ') || undefined,
        source: body.source || 'website',
        status: 'new',
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Inquiry API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
