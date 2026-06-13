'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Chain, PricingConfig, MetalColor } from '@/lib/datocms'
import { computeWeight, priceForChain, formatPrice } from '@/lib/pricing'
import type { Karat } from '@/lib/pricing'
import { formatChainName } from '@/lib/format-chain-name'
import LivePrice from './LivePrice'
import ChainAdditionalInfo from './ChainAdditionalInfo'

interface ChainVariantPickerProps {
  chain: Chain
  pricingConfig: PricingConfig
}

const KARAT_LABELS: Record<string, string> = {
  '10k': '10K',
  '14k': '14K',
  '18k': '18K',
}

const METAL_LABELS: Record<string, string> = {
  'yellow-gold': 'Yellow Gold',
  'white-gold': 'White Gold',
  'rose-gold': 'Rose Gold',
  'two-tone': 'Two-Tone',
}

const METAL_COLORS: Record<string, string> = {
  'yellow-gold': 'bg-amber-400',
  'white-gold': 'bg-gray-200',
  'rose-gold': 'bg-rose-gold',
  'two-tone': 'bg-gradient-to-r from-amber-400 to-gray-200',
}

export default function ChainVariantPicker({ chain, pricingConfig }: ChainVariantPickerProps) {
  const [selectedKarat, setSelectedKarat] = useState<Karat>(
    chain.defaultKarat || chain.availableKarats[0]
  )
  const [selectedMetal, setSelectedMetal] = useState<MetalColor>(
    chain.defaultMetal || chain.availableMetals[0]
  )
  const [selectedLength, setSelectedLength] = useState<number>(
    chain.defaultLengthIn || chain.availableLengths[0]
  )

  const weightG = useMemo(
    () => computeWeight(chain.widthMm, chain.weightPerInchG, selectedLength),
    [chain.widthMm, chain.weightPerInchG, selectedLength]
  )

  const price = useMemo(
    () =>
      priceForChain({
        weightG,
        karat: selectedKarat,
        widthMm: chain.widthMm,
        config: pricingConfig,
      }),
    [weightG, selectedKarat, chain.widthMm, pricingConfig]
  )

  const [isLoading, setIsLoading] = useState(false)

  async function handleAddToCart() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId: chain.id,
          name: formatChainName(chain.name, chain.widthMm),
          slug: chain.slug,
          karat: selectedKarat,
          metal: selectedMetal,
          lengthIn: selectedLength,
          widthMm: chain.widthMm,
          weightG,
          priceCad: price,
          heroImage: chain.heroImage?.url || null,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* Price */}
      <div className="mb-6">
        <LivePrice price={price} />
        <motion.p
          key={`${selectedKarat}-${selectedMetal}-${selectedLength}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-glacier-grey mt-1"
        >
          {weightG.toFixed(2)}g &middot; {KARAT_LABELS[selectedKarat]} {METAL_LABELS[selectedMetal]} &middot; {selectedLength}&quot;
        </motion.p>
      </div>

      {/* Karat Picker */}
      <div className="mb-5">
        <label className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2 block">
          Karat
        </label>
        <div className="flex gap-2">
          {chain.availableKarats.map((karat) => (
            <button
              key={karat}
              onClick={() => setSelectedKarat(karat as Karat)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                selectedKarat === karat
                  ? 'bg-soft-black text-white shadow-lg'
                  : 'bg-warm-white text-charcoal border border-stone hover:border-glacier-grey'
              }`}
            >
              {KARAT_LABELS[karat] || karat}
            </button>
          ))}
        </div>
      </div>

      {/* Metal Picker */}
      <div className="mb-5">
        <label className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2 block">
          Metal Color
        </label>
        <div className="flex gap-2">
          {chain.availableMetals.map((metal) => (
            <button
              key={metal}
              onClick={() => setSelectedMetal(metal as MetalColor)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedMetal === metal
                  ? 'bg-soft-black text-white shadow-lg'
                  : 'bg-warm-white text-charcoal border border-stone hover:border-glacier-grey'
              }`}
            >
              <span className={`w-4 h-4 rounded-full ${METAL_COLORS[metal]} border border-stone/50`} />
              {METAL_LABELS[metal] || metal}
            </button>
          ))}
        </div>
      </div>

      {/* Length Picker — Segmented Control */}
      <div className="mb-6">
        <label className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2 block">
          Length
        </label>
        <div className="inline-flex rounded-lg border border-stone overflow-hidden">
          {chain.availableLengths.map((length) => (
            <button
              key={length}
              onClick={() => setSelectedLength(length)}
              className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 border-r border-stone last:border-r-0 ${
                selectedLength === length
                  ? 'bg-soft-black text-white'
                  : 'bg-warm-white text-charcoal hover:bg-off-white'
              }`}
            >
              {length}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : `Add to Cart — ${formatPrice(price)}`}
      </button>

      {/* Trust signals */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-glacier-grey">
        <span className="trust-badge">Secure Stripe Checkout</span>
        <span>&middot;</span>
        <span className="trust-badge">Handcrafted in Toronto</span>
      </div>

      {/* Additional Info Accordion */}
      <ChainAdditionalInfo
        chain={chain}
        selectedKarat={selectedKarat}
        selectedMetal={selectedMetal}
        selectedLength={selectedLength}
        weightG={weightG}
      />
    </div>
  )
}
