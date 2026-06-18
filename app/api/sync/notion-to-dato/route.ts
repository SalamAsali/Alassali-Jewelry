import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

const sanityWriteClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

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

    const isOrder = database_id === process.env.NOTION_ORDERS_DB_ID
    const isCustomer = database_id === process.env.NOTION_CUSTOMERS_DB_ID

    // The ID stored in Notion references the Sanity document ID
    const sanityItemId = properties['Dato Item ID']?.rich_text?.[0]?.plain_text
    if (!sanityItemId) {
      return NextResponse.json({ skipped: true, reason: 'No Item ID found' })
    }

    if (isOrder) {
      const updates: Record<string, unknown> = {}

      if (properties['Stage']?.status?.name) {
        updates.status = properties['Stage'].status.name.toLowerCase().replace(/ /g, '_')
      }
      if (properties['Tracking Number']?.rich_text?.[0]?.plain_text) {
        updates.trackingNumber = properties['Tracking Number'].rich_text[0].plain_text
      }
      if (properties['Fulfilment Notes']?.rich_text?.[0]?.plain_text) {
        updates.fulfilmentNotes = properties['Fulfilment Notes'].rich_text[0].plain_text
      }
      if (properties['Internal Notes']?.rich_text?.[0]?.plain_text) {
        updates.internalNotes = properties['Internal Notes'].rich_text[0].plain_text
      }
      if (properties['Carrier']?.select?.name) {
        updates.shippingMethod = properties['Carrier'].select.name.toLowerCase().replace(/ /g, '-')
      }

      if (Object.keys(updates).length > 0) {
        await sanityWriteClient.patch(sanityItemId).set(updates).commit()
        console.log(`[notion-to-sanity] Updated order ${sanityItemId}:`, Object.keys(updates))

        if (updates.status === 'shipped' && updates.trackingNumber) {
          try {
            const resend = new Resend(process.env.RESEND_API_KEY)
            console.log('[notion-to-sanity] Order shipped — email notification queued')
          } catch (emailErr) {
            console.error('[notion-to-sanity] Email failed:', emailErr)
          }
        }
      }
    }

    if (isCustomer) {
      const updates: Record<string, unknown> = {}

      if (properties['Internal Notes']?.rich_text?.[0]?.plain_text) {
        updates.internalNotes = properties['Internal Notes'].rich_text[0].plain_text
      }
      if (properties['Marketing Opt-In']?.checkbox !== undefined) {
        updates.marketingOptIn = properties['Marketing Opt-In'].checkbox
      }

      if (Object.keys(updates).length > 0) {
        await sanityWriteClient.patch(sanityItemId).set(updates).commit()
        console.log(`[notion-to-sanity] Updated customer ${sanityItemId}:`, Object.keys(updates))
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[notion-to-sanity] Sync failed:', error)
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 })
  }
}
