import { NextRequest, NextResponse } from 'next/server'
import { upsertChainToNotion, upsertOrderToNotion, upsertCustomerToNotion } from '@/lib/notion'

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
        await upsertOrderToNotion({
          datoItemId: doc._id,
          orderNo: doc.orderNo || '',
          customerName: '',
          status: doc.status || 'pending',
          totalCad: doc.totalCad || 0,
          itemsCount: doc.items?.length || 0,
          createdAt: doc._createdAt || new Date().toISOString(),
          shippingMethod: doc.shippingMethod,
          trackingNumber: doc.trackingNumber,
          stripePiId: doc.stripePiId,
        })
        break

      case 'customer':
        await upsertCustomerToNotion({
          datoItemId: doc._id,
          firstName: doc.firstName || '',
          lastName: doc.lastName || '',
          email: doc.email || '',
          phone: doc.phone,
          stripeCustomerId: doc.stripeCustomerId,
          marketingOptIn: doc.marketingOptIn,
        })
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
