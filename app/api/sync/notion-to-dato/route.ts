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
 * When you change a stage in Notion, this updates the Sanity order document
 * so the customer dashboard reflects the new status.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-notion-webhook-secret') || request.headers.get('authorization')
  if (secret !== process.env.NOTION_WEBHOOK_SECRET && secret !== `Bearer ${process.env.NOTION_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { properties, database_id } = body

    if (!properties) {
      return NextResponse.json({ skipped: true, reason: 'Missing properties' })
    }

    const isOrder = database_id === process.env.NOTION_ORDERS_DB_ID
    const isCustomer = database_id === process.env.NOTION_CUSTOMERS_DB_ID

    if (isOrder) {
      // Look up order in Sanity by order number (title in Notion)
      const orderNo = properties['Order']?.title?.[0]?.plain_text
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

      if (properties['Stage']?.status?.name) {
        const notionStage = properties['Stage'].status.name
        const sanityStatus = NOTION_TO_SANITY_STATUS[notionStage]
        if (sanityStatus) {
          updates.status = sanityStatus
        }
      }

      if (Object.keys(updates).length > 0) {
        await sanityWriteClient.patch(sanityOrder._id).set(updates).commit()
        console.log(`[notion-to-sanity] Updated order ${orderNo}:`, updates)

        // Send shipping notification email when status changes to "shipped"
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
    }

    if (isCustomer) {
      // Look up customer by email
      const email = properties['Email']?.email
      if (!email) {
        return NextResponse.json({ skipped: true, reason: 'No email found' })
      }

      const sanityCustomer = await sanityWriteClient.fetch(
        `*[_type == "customer" && email == $email][0]{ _id }`,
        { email }
      )
      if (!sanityCustomer) {
        return NextResponse.json({ skipped: true, reason: `Customer ${email} not found in Sanity` })
      }

      const updates: Record<string, unknown> = {}

      if (properties['Notes']?.rich_text?.[0]?.plain_text) {
        updates.internalNotes = properties['Notes'].rich_text[0].plain_text
      }

      if (Object.keys(updates).length > 0) {
        await sanityWriteClient.patch(sanityCustomer._id).set(updates).commit()
        console.log(`[notion-to-sanity] Updated customer ${email}:`, Object.keys(updates))
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[notion-to-sanity] Sync failed:', error)
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 })
  }
}
