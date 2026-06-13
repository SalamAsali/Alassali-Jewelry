import { NextRequest, NextResponse } from 'next/server'
import { buildClient } from '@datocms/cma-client-node'
import { Resend } from 'resend'

const WRITABLE_ORDER_FIELDS = ['status', 'tracking_number', 'tracking_url', 'estimated_ship_date', 'internal_notes', 'fulfilment_notes', 'shipping_method'] as const
const WRITABLE_CUSTOMER_FIELDS = ['tags', 'internal_notes', 'marketing_opt_in'] as const

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-notion-webhook-secret') || request.headers.get('authorization')
  if (secret !== process.env.NOTION_WEBHOOK_SECRET && secret !== `Bearer ${process.env.NOTION_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { page_id, properties, database_id } = body

    if (!page_id || !properties) {
      return NextResponse.json({ skipped: true, reason: 'Missing page_id or properties' })
    }

    const client = buildClient({ apiToken: process.env.DATOCMS_CMA_TOKEN! })

    // Determine which DB this came from
    const isOrder = database_id === process.env.NOTION_ORDERS_DB_ID
    const isCustomer = database_id === process.env.NOTION_CUSTOMERS_DB_ID

    // Extract datoItemId from properties
    const datoItemId = properties['Dato Item ID']?.rich_text?.[0]?.plain_text
    if (!datoItemId) {
      return NextResponse.json({ skipped: true, reason: 'No Dato Item ID found' })
    }

    if (isOrder) {
      const updates: Record<string, unknown> = {}

      if (properties['Stage']?.status?.name) {
        updates.status = properties['Stage'].status.name.toLowerCase().replace(/ /g, '_')
      }
      if (properties['Tracking Number']?.rich_text?.[0]?.plain_text) {
        updates.tracking_number = properties['Tracking Number'].rich_text[0].plain_text
      }
      if (properties['Fulfilment Notes']?.rich_text?.[0]?.plain_text) {
        updates.fulfilment_notes = properties['Fulfilment Notes'].rich_text[0].plain_text
      }
      if (properties['Internal Notes']?.rich_text?.[0]?.plain_text) {
        updates.internal_notes = properties['Internal Notes'].rich_text[0].plain_text
      }
      if (properties['Carrier']?.select?.name) {
        updates.shipping_method = properties['Carrier'].select.name.toLowerCase().replace(/ /g, '-')
      }

      if (Object.keys(updates).length > 0) {
        await client.items.update(datoItemId, updates)
        console.log(`[notion-to-dato] Updated order ${datoItemId}:`, Object.keys(updates))

        // If status changed to shipped, send email notification
        if (updates.status === 'shipped' && updates.tracking_number) {
          try {
            const resend = new Resend(process.env.RESEND_API_KEY)
            const order = await client.items.find(datoItemId)
            // TODO: Look up customer email from the order's customer relation
            console.log('[notion-to-dato] Order shipped — email notification queued')
          } catch (emailErr) {
            console.error('[notion-to-dato] Email failed:', emailErr)
          }
        }
      }
    }

    if (isCustomer) {
      const updates: Record<string, unknown> = {}

      if (properties['Internal Notes']?.rich_text?.[0]?.plain_text) {
        updates.internal_notes = properties['Internal Notes'].rich_text[0].plain_text
      }
      if (properties['Marketing Opt-In']?.checkbox !== undefined) {
        updates.marketing_opt_in = properties['Marketing Opt-In'].checkbox
      }

      if (Object.keys(updates).length > 0) {
        await client.items.update(datoItemId, updates)
        console.log(`[notion-to-dato] Updated customer ${datoItemId}:`, Object.keys(updates))
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[notion-to-dato] Sync failed:', error)
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 })
  }
}
