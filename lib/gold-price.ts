import { z } from 'zod'

const GoldApiResponseSchema = z.object({
  price_gram_24k: z.number(),
  timestamp: z.number(),
  currency: z.string(),
})

export interface GoldSpotPrice {
  priceGram24kCad: number
  fetchedAt: Date
}

export async function fetchGoldSpotPrice(): Promise<GoldSpotPrice> {
  const token = process.env.GOLDAPI_TOKEN
  if (!token) {
    throw new Error('GOLDAPI_TOKEN is not configured')
  }

  const res = await fetch('https://www.goldapi.io/api/XAU/CAD', {
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`GoldAPI request failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  const parsed = GoldApiResponseSchema.parse(json)

  return {
    priceGram24kCad: parsed.price_gram_24k,
    fetchedAt: new Date(parsed.timestamp * 1000),
  }
}
