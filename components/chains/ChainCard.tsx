'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import type { Chain, PricingConfig } from '@/lib/sanity'
import { getSanityImageUrl } from '@/lib/sanity'
import { computeWeight, priceForChain, formatPrice } from '@/lib/pricing'
import type { Karat } from '@/lib/pricing'
import { formatChainName } from '@/lib/format-chain-name'

interface ChainCardProps {
  chain: Chain
  pricingConfig: PricingConfig
}

const KARAT_LABELS: Record<string, string> = {
  '10k': '10K',
  '14k': '14K',
  '18k': '18K',
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
    getSanityImageUrl(chain.heroImage, 800) || '/images/placeholder-chain.jpg'
  const heroAlt = chain.heroImage?.alt || `${formatChainName(chain.name, chain.widthMm)} - ${(chain.defaultKarat || '14k').toUpperCase()} ${chain.construction} gold chain`

  return (
    <Link href={`/chain/${chain.slug?.current ?? ''}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
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
          {/* Quick Add overlay on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-center gap-2 bg-soft-black/90 backdrop-blur-sm text-white py-3 text-sm font-medium uppercase tracking-wide">
              <ShoppingBag className="w-4 h-4" />
              Quick View
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Name */}
          <h3 className="font-heading text-lg font-medium text-deep-charcoal leading-tight mb-2">
            {formatChainName(chain.name, chain.widthMm)}
          </h3>

          {/* Karat badges */}
          <div className="flex items-center gap-1.5 mb-2">
            {chain.availableKarats.map((k, i) => (
              <span key={k}>
                <span className="text-xs font-semibold text-glacier-grey">
                  {KARAT_LABELS[k] || k}
                </span>
                {i < chain.availableKarats.length - 1 && (
                  <span className="text-glacier-grey/50 ml-1.5">&middot;</span>
                )}
              </span>
            ))}
          </div>

          {/* Construction tag */}
          <p className="text-xs text-glacier-grey capitalize mb-3">
            {chain.construction}
          </p>

          {/* Price */}
          <p className="font-heading text-xl font-semibold text-deep-charcoal">
            From {formatPrice(startingPrice)}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
