import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createOrderFromStripeEvent } from '@/lib/orders'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Return 200 fast, process async
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      })

      const items = lineItems.data.map((item) => {
        const product = item.price?.product
        const metadata = (typeof product === 'object' && product !== null && 'metadata' in product)
          ? (product as { metadata: Record<string, string> }).metadata
          : {}
        return {
          sku: item.price?.id || '',
          name: item.description || '',
          metal: metadata.metal || '',
          karat: metadata.karat || '',
          lengthIn: Number(metadata.lengthIn) || 0,
          weightG: Number(metadata.weightG) || 0,
          unitPriceCad: (item.amount_total || 0) / 100,
          qty: item.quantity || 1,
          lineSubtotal: (item.amount_total || 0) / 100,
        }
      })

      const result = await createOrderFromStripeEvent({
        customerEmail: session.customer_details?.email || '',
        customerFirstName: session.customer_details?.name?.split(' ')[0] || '',
        customerLastName: session.customer_details?.name?.split(' ').slice(1).join(' ') || '',
        customerPhone: session.customer_details?.phone || undefined,
        items,
        subtotalCad: (session.amount_subtotal || 0) / 100,
        taxCad: ((session.total_details?.amount_tax || 0)) / 100,
        shippingCad: ((session.total_details?.amount_shipping || 0)) / 100,
        totalCad: (session.amount_total || 0) / 100,
        shippingAddress: session.shipping_details?.address
          ? {
              line1: session.shipping_details.address.line1 || '',
              line2: session.shipping_details.address.line2 || '',
              city: session.shipping_details.address.city || '',
              province: session.shipping_details.address.state || '',
              postal: session.shipping_details.address.postal_code || '',
              country: session.shipping_details.address.country || '',
            }
          : {},
        billingAddress: {},
        stripePiId: typeof session.payment_intent === 'string' ? session.payment_intent : '',
        stripeCustomerId: typeof session.customer === 'string' ? session.customer : undefined,
        shippingMethod: 'canada-post',
      })

      // Send confirmation emails
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Customer confirmation
        await resend.emails.send({
          from: 'Al-assali Jewelry <orders@alasalicustomjewelry.ca>',
          to: session.customer_details?.email || '',
          subject: `Order Confirmed — ${result.orderNo}`,
          html: `
            <h1>Thank you for your order!</h1>
            <p>Your order <strong>${result.orderNo}</strong> has been confirmed.</p>
            <p>Total: $${(session.amount_total || 0) / 100} CAD</p>
            <p>We'll send you an update when your order ships.</p>
            <p>— Al-assali Custom Jewelry</p>
          `,
        })

        // Notify Salam
        await resend.emails.send({
          from: 'Al-assali Orders <orders@alasalicustomjewelry.ca>',
          to: 'contact@alasalicustomjewelry.ca',
          subject: `New Order: ${result.orderNo} — $${(session.amount_total || 0) / 100}`,
          html: `
            <h2>New online order received</h2>
            <p><strong>Order:</strong> ${result.orderNo}</p>
            <p><strong>Customer:</strong> ${session.customer_details?.name} (${session.customer_details?.email})</p>
            <p><strong>Total:</strong> $${(session.amount_total || 0) / 100} CAD</p>
            <p><strong>Items:</strong> ${items.length}</p>
            <p>Check Notion CRM for full details.</p>
          `,
        })
      } catch (emailErr) {
        console.error('[stripe-webhook] Email send failed:', emailErr)
      }

      console.log(`[stripe-webhook] Order created: ${result.orderNo}`)
    } catch (err) {
      console.error('[stripe-webhook] Order creation failed:', err)
      // Still return 200 to Stripe to prevent retries for processing errors
    }
  }

  return NextResponse.json({ received: true })
}
