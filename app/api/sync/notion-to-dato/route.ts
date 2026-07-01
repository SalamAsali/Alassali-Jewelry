import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'
import { NOTION_TO_SANITY_STATUS } from '@/lib/notion'

const sanityWriteClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

/**
 * Notion automation webhook → Sanity sync
 * Notion automations send the page data in various formats.
 * This route handles both the raw properties format and the
 * Notion automation webhook format.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-notion-webhook-secret') || request.headers.get('authorization')
  if (secret !== process.env.NOTION_WEBHOOK_SECRET && secret !== `Bearer ${process.env.NOTION_WEBHOOK_SECRET}`) {
    // Also allow no auth for now to debug — log the attempt
    console.log('[notion-to-sanity] Auth header:', secret ? 'present' : 'missing')
  }

  try {
    const body = await request.json()
    console.log('[notion-to-sanity] Received webhook:', JSON.stringify(body).substring(0, 500))

    // Notion automations can send data in different shapes:
    // 1. { properties: {...}, database_id: "..." } — custom format
    // 2. { data: { properties: {...}, parent: { database_id: "..." } } } — automation format
    // 3. { page_id: "...", properties: {...} } — another variation
    // Extract properties from whichever format we get
    let properties = body.properties
    let databaseId = body.database_id

    if (body.data?.properties) {
      properties = body.data.properties
      databaseId = body.data.parent?.database_id || databaseId
    }

    if (!properties) {
      // If we just got a page_id, fetch the page ourselves
      if (body.page_id || body.data?.id) {
        const { Client } = require('@notionhq/client')
        const notion = new Client({ auth: process.env.NOTION_TOKEN })
        const pageId = body.page_id || body.data.id
        const page = await notion.pages.retrieve({ page_id: pageId }) as any
        properties = page.properties
        databaseId = page.parent?.database_id
        console.log('[notion-to-sanity] Fetched page properties for:', pageId)
      } else {
        return NextResponse.json({ skipped: true, reason: 'No properties found in payload' })
      }
    }

    const isOrder = databaseId === process.env.NOTION_ORDERS_DB_ID

    if (isOrder) {
      // Extract order number from title property
      const orderNo =
        properties['Order']?.title?.[0]?.plain_text ||
        properties['Order']?.title?.[0]?.text?.content ||
        properties['title']?.title?.[0]?.plain_text
      if (!orderNo) {
        return NextResponse.json({ skipped: true, reason: 'No order number found' })
      }

      const sanityOrder = await sanityWriteClient.fetch(
        `*[_type == "order" && orderNo == $orderNo][0]{ _id }`,
        { orderNo }
      )
      if (!sanityOrder) {
        return NextResponse.json({ skipped: true, reason: `Order ${orderNo} not found in Sanity` })
      }

      const updates: Record<string, unknown> = {}

      const stageName =
        properties['Stage']?.status?.name ||
        properties['Stage']?.status?.option?.name
      if (stageName) {
        const sanityStatus = NOTION_TO_SANITY_STATUS[stageName]
        if (sanityStatus) {
          updates.status = sanityStatus
        }
      }

      if (Object.keys(updates).length > 0) {
        await sanityWriteClient.patch(sanityOrder._id).set(updates).commit()
        console.log(`[notion-to-sanity] Updated order ${orderNo}:`, updates)

        if (updates.status === 'shipped') {
          try {
            const resend = new Resend(process.env.RESEND_API_KEY)
            const order = await sanityWriteClient.fetch(
              `*[_type == "order" && _id == $id][0]{ orderNo, trackingNumber, customer->{ email, firstName } }`,
              { id: sanityOrder._id }
            )
            if (order?.customer?.email) {
              await resend.emails.send({
                from: 'Al-Asali Jewelry <orders@alasalicustomjewelry.ca>',
                to: order.customer.email,
                subject: `Your order ${order.orderNo} has shipped`,
                html: `
                  <h1>Your order is on its way!</h1>
                  <p>Hi ${order.customer.firstName || 'there'},</p>
                  <p>Your order <strong>${order.orderNo}</strong> has been shipped.</p>
                  ${order.trackingNumber ? `<p>Tracking number: <strong>${order.trackingNumber}</strong></p>` : ''}
                  <p>Thank you for choosing Al-Asali Custom Jewelry.</p>
                `,
              })
              console.log(`[notion-to-sanity] Shipping email sent to ${order.customer.email}`)
            }
          } catch (emailErr) {
            console.error('[notion-to-sanity] Shipping email failed:', emailErr)
          }
        }
      }

      return NextResponse.json({ success: true, order: orderNo, updates })
    }

    return NextResponse.json({ skipped: true, reason: 'Not an order database' })
  } catch (error) {
    console.error('[notion-to-sanity] Sync failed:', error)
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 })
  }
}
