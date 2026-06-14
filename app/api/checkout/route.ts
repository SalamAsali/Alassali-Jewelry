import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const ItemSchema = z.object({
  chainId: z.string(),
  name: z.string(),
  slug: z.string(),
  karat: z.string(),
  metal: z.string(),
  lengthIn: z.number(),
  widthMm: z.number(),
  weightG: z.number(),
  priceCad: z.number(),
  heroImage: z.string().nullable(),
  quantity: z.number().optional(),
})

// Accept either a single item or { items: [...] }
const CheckoutSchema = z.union([
  ItemSchema,
  z.object({ items: z.array(ItemSchema) }),
])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = CheckoutSchema.parse(body)

    const items = 'items' in parsed ? parsed.items : [parsed]

    const line_items = items.map(item => ({
      price_data: {
        currency: 'cad' as const,
        unit_amount: Math.round(item.priceCad * 100),
        product_data: {
          name: item.name,
          description: `${item.karat.toUpperCase()} ${item.metal.replace(/-/g, ' ')} · ${item.lengthIn}" · ${item.weightG.toFixed(1)}g · ${item.widthMm}mm`,
          ...(item.heroImage ? { images: [item.heroImage] } : {}),
          metadata: {
            chainId: item.chainId,
            slug: item.slug,
            karat: item.karat,
            metal: item.metal,
            lengthIn: String(item.lengthIn),
            widthMm: String(item.widthMm),
            weightG: String(item.weightG),
          },
        },
      },
      quantity: item.quantity || 1,
    }))

    const firstSlug = items[0]?.slug || 'chains'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      currency: 'cad',
      line_items,
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'],
      },
      automatic_tax: { enabled: false },
      metadata: {
        itemCount: String(items.length),
        firstChainSlug: firstSlug,
      },
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/chains`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[checkout] Failed:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
