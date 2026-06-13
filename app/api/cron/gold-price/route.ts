import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { fetchGoldSpotPrice } from '@/lib/gold-price'
import { buildClient } from '@datocms/cma-client-node'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const spot = await fetchGoldSpotPrice()

    const client = buildClient({ apiToken: process.env.DATOCMS_CMA_TOKEN! })
    const records = await client.items.list({
      filter: { type: 'pricing_config' },
    })

    if (records.length > 0) {
      await client.items.update(records[0].id, {
        last_spot_twentyfour_k: spot.priceGram24kCad,
        spot_updated_at: spot.fetchedAt.toISOString(),
      })
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
