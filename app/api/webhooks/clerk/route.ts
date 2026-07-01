import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { findOrCreateCustomer } from '@/lib/notion'
import { createClient } from '@sanity/client'

const sanityWriteClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[clerk-webhook] CLERK_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  // Verify the webhook signature
  const svixId = request.headers.get('svix-id')
  const svixTimestamp = request.headers.get('svix-timestamp')
  const svixSignature = request.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const body = await request.text()

  let event: any
  try {
    const wh = new Webhook(webhookSecret)
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    })
  } catch (err) {
    console.error('[clerk-webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'user.created' || event.type === 'user.updated') {
    const { id, email_addresses, first_name, last_name, phone_numbers } = event.data

    const primaryEmail = email_addresses?.find((e: any) => e.id === event.data.primary_email_address_id)?.email_address
      || email_addresses?.[0]?.email_address

    if (!primaryEmail) {
      console.log('[clerk-webhook] No email found for user:', id)
      return NextResponse.json({ skipped: true, reason: 'No email' })
    }

    const name = `${first_name || ''} ${last_name || ''}`.trim() || primaryEmail
    const phone = phone_numbers?.[0]?.phone_number || ''

    try {
      // Create/find customer in Sanity
      const existing = await sanityWriteClient.fetch(
        `*[_type == "customer" && email == $email]{ _id }`,
        { email: primaryEmail }
      )

      if (existing.length === 0) {
        await sanityWriteClient.create({
          _type: 'customer',
          firstName: first_name || '',
          lastName: last_name || '',
          email: primaryEmail,
          phone,
          marketingOptIn: false,
          firstSeenAt: new Date().toISOString(),
          tags: ['New'],
        })
        console.log(`[clerk-webhook] Created Sanity customer: ${primaryEmail}`)
      }

      // Create/find customer in Notion
      await findOrCreateCustomer({
        name,
        email: primaryEmail,
        phone: phone || undefined,
      })
      console.log(`[clerk-webhook] Synced to Notion: ${primaryEmail}`)

    } catch (err) {
      console.error('[clerk-webhook] CRM sync failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}
