import { NextRequest, NextResponse } from 'next/server'
import {
  upsertChainToNotion,
  findOrCreateCustomer,
  findOrderByNumber,
  updateOrderStageByNumber,
  SANITY_TO_NOTION_STAGE,
} from '@/lib/notion'

/**
 * Sanity webhook → Notion sync
 * Set up a Sanity webhook at https://www.sanity.io/manage/project/oh0jn4tt/api/webhooks
 * pointing to this endpoint with the SANITY_WEBHOOK_SECRET header
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-sanity-webhook-secret') || request.headers.get('authorization')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET && secret !== `Bearer ${process.env.SANITY_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const doc = body

    if (!doc?._type) {
      return NextResponse.json({ skipped: true, reason: 'No document type' })
    }

    switch (doc._type) {
      case 'chain':
        await upsertChainToNotion({
          datoItemId: doc._id,
          name: doc.name || '',
          chainType: doc.chainType || '',
          widthMm: doc.widthMm || 0,
          construction: doc.construction || '',
          availableKarats: doc.availableKarats || [],
          availableMetals: doc.availableMetals || [],
          active: doc.active ?? true,
          supplierSku: doc.supplierSku,
        })
        break

      case 'order':
        // Sync status changes from Sanity to Notion
        if (doc.orderNo && doc.status) {
          const notionStage = SANITY_TO_NOTION_STAGE[doc.status]
          if (notionStage) {
            await updateOrderStageByNumber(doc.orderNo, notionStage)
          }
        }
        break

      case 'customer':
        // Find or create in Notion by email (dedup)
        if (doc.email) {
          await findOrCreateCustomer({
            name: `${doc.firstName || ''} ${doc.lastName || ''}`.trim() || doc.email,
            email: doc.email,
            phone: doc.phone,
          })
        }
        break

      default:
        console.log(`[sanity-to-notion] Skipping type: ${doc._type}`)
    }

    return NextResponse.json({ success: true, type: doc._type })
  } catch (error) {
    console.error('[sanity-to-notion] Sync failed:', error)
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 })
  }
}
