import { NextRequest, NextResponse } from 'next/server'
import { upsertChainToNotion, upsertOrderToNotion, upsertCustomerToNotion } from '@/lib/notion'

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get('x-dato-webhook-secret') || request.headers.get('authorization')
  if (secret !== process.env.DATO_WEBHOOK_SECRET && secret !== `Bearer ${process.env.DATO_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { event_type, entity } = body

    if (!entity) {
      return NextResponse.json({ skipped: true, reason: 'No entity in payload' })
    }

    const modelApiKey = entity.relationships?.item_type?.data?.attributes?.api_key
      || body.related_entities?.[0]?.attributes?.api_key
      || ''

    switch (modelApiKey) {
      case 'chain':
        await upsertChainToNotion({
          datoItemId: entity.id,
          name: entity.attributes?.name || '',
          chainType: entity.attributes?.chain_type || '',
          widthMm: entity.attributes?.width_mm || 0,
          construction: entity.attributes?.construction || '',
          availableKarats: entity.attributes?.available_karats || [],
          availableMetals: entity.attributes?.available_metals || [],
          active: entity.attributes?.active ?? true,
          supplierSku: entity.attributes?.supplier_sku,
        })
        break

      case 'order':
        await upsertOrderToNotion({
          datoItemId: entity.id,
          orderNo: entity.attributes?.order_no || '',
          customerName: '',
          status: entity.attributes?.status || 'pending',
          totalCad: entity.attributes?.total_cad || 0,
          itemsCount: entity.attributes?.items?.length || 0,
          createdAt: entity.attributes?.created_at || new Date().toISOString(),
          shippingMethod: entity.attributes?.shipping_method,
          trackingNumber: entity.attributes?.tracking_number,
          stripePiId: entity.attributes?.stripe_pi_id,
        })
        break

      case 'customer':
        await upsertCustomerToNotion({
          datoItemId: entity.id,
          firstName: entity.attributes?.first_name || '',
          lastName: entity.attributes?.last_name || '',
          email: entity.attributes?.email || '',
          phone: entity.attributes?.phone,
          stripeCustomerId: entity.attributes?.stripe_customer_id,
          marketingOptIn: entity.attributes?.marketing_opt_in,
        })
        break

      default:
        console.log(`[dato-to-notion] Skipping unknown model: ${modelApiKey}`)
    }

    return NextResponse.json({ success: true, model: modelApiKey })
  } catch (error) {
    console.error('[dato-to-notion] Sync failed:', error)
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 })
  }
}
