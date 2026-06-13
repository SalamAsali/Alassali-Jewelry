export type Karat = '10k' | '14k' | '18k'

export const KARAT_PURITY: Record<Karat, number> = {
  '10k': 0.417,
  '14k': 0.583,
  '18k': 0.750,
}

export interface PricingConfig {
  markup18k: number
  markup14k: number
  markup10k: number
  makingChargePerGram: number
  heavyChainSurchargePerGram: number
  claspChargeCad: number
  lastSpot24k: number
}

export function getMarkupForKarat(karat: Karat, config: PricingConfig): number {
  const map: Record<Karat, number> = {
    '18k': config.markup18k,
    '14k': config.markup14k,
    '10k': config.markup10k,
  }
  return map[karat]
}

export function computeWeight(widthMm: number, weightPerInchG: number, lengthIn: number): number {
  return weightPerInchG * lengthIn
}

export function priceForChain({
  weightG,
  karat,
  widthMm,
  config,
}: {
  weightG: number
  karat: Karat
  widthMm: number
  config: PricingConfig
}): number {
  const karatPct = KARAT_PURITY[karat]
  const markup = getMarkupForKarat(karat, config)
  const making = config.makingChargePerGram + (widthMm > 6 ? config.heavyChainSurchargePerGram : 0)
  const material = config.lastSpot24k * karatPct * weightG
  return Math.round((material * (1 + markup) + making * weightG + config.claspChargeCad) * 100) / 100
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(cents)
}
