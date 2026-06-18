import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { fetchGoldSpotPrice } from '@/lib/gold-price'
import { createClient } from '@sanity/client'

export const dynamic = 'force-dynamic'

const sanityWriteClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const spot = await fetchGoldSpotPrice()

    const config = await sanityWriteClient.fetch(
      `*[_type == "pricingConfig"][0]{ _id }`
    )

    if (config?._id) {
      await sanityWriteClient
        .patch(config._id)
        .set({
          lastSpotTwentyfourK: spot.priceGram24kCad,
          spotUpdatedAt: spot.fetchedAt.toISOString(),
        })
        .commit()
    }

    revalidatePath('/chains', 'layout')
    revalidatePath('/chain', 'layout')

    return NextResponse.json({
      success: true,
      spot24kCad: spot.priceGram24kCad,
      fetchedAt: spot.fetchedAt.toISOString(),
    })
  } catch (error) {
    console.error('[cron/gold-price] Failed:', error)
    return NextResponse.json(
      { error: 'Failed to update gold price', details: String(error) },
      { status: 500 }
    )
  }
}
