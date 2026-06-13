'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Chain, PricingConfig } from '@/lib/datocms'
import { computeWeight, priceForChain, formatPrice } from '@/lib/pricing'
import type { Karat } from '@/lib/pricing'

interface ChainCardProps {
  chain: Chain
  pricingConfig: PricingConfig
}

const CHAIN_TYPE_LABELS: Record<string, string> = {
  cuban: 'Cuban',
  figaro: 'Figaro',
  rope: 'Rope',
  box: 'Box',
  byzantine: 'Byzantine',
  snake: 'Snake',
  herringbone: 'Herringbone',
  mariner: 'Mariner',
  curb: 'Curb',
  wheat: 'Wheat',
  franco: 'Franco',
  cable: 'Cable',
  bead: 'Bead',
  paperclip: 'Paperclip',
  'round-link': 'Round Link',
  anchor: 'Anchor',
  singapore: 'Singapore',
  'oval-link': 'Oval Link',
  'domed-cuban': 'Domed Cuban',
}

export default function ChainCard({ chain, pricingConfig }: ChainCardProps) {
  // Compute starting price with defaults
  const defaultKarat = chain.defaultKarat || chain.availableKarats[0]
  const defaultLength = chain.defaultLengthIn || chain.availableLengths[0]
  const weightG = computeWeight(chain.widthMm, chain.weightPerInchG, defaultLength)
  const startingPrice = priceForChain({
    weightG,
    karat: defaultKarat as Karat,
    widthMm: chain.widthMm,
    config: pricingConfig,
  })

  const heroSrc =
    chain.heroImage?.responsiveImage?.src || chain.heroImage?.url || '/images/placeholder-chain.jpg'
  const heroAlt = chain.heroImage?.alt || chain.name

  return (
    <Link href={`/chain/${chain.slug}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border-2 border-soft-black hover:border-glacier-grey bg-white overflow-hidden cursor-pointer group"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-warm-white">
          <img
            src={heroSrc}
            alt={heroAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs uppercase tracking-wider text-glacier-grey font-semibold mb-1">
            {CHAIN_TYPE_LABELS[chain.chainType] || chain.chainType}
          </p>
          <h3 className="font-heading text-lg font-medium text-deep-charcoal leading-tight mb-2">
            {chain.name}
          </h3>
          <p className="text-sm text-charcoal">
            {chain.widthMm}mm &middot; {chain.construction}
          </p>
          <p className="mt-2 font-heading text-xl font-semibold text-deep-charcoal">
            From {formatPrice(startingPrice)}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
