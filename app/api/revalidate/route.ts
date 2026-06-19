import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current: string }
    }>(req, process.env.SANITY_WEBHOOK_SECRET)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad request', { status: 400 })
    }

    // Revalidate the tag matching the document type
    revalidateTag(body._type)

    // Also revalidate common global tags when globals change
    const globalTypes = ['header', 'footer', 'homepage', 'pricingConfig', 'chainsLanding']
    if (globalTypes.includes(body._type)) {
      revalidateTag('global')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body._type,
    })
  } catch (err) {
    console.error('[revalidate] Failed:', err)
    return new NextResponse('Error', { status: 500 })
  }
}
