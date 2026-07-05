'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Truck } from 'lucide-react'
import type { Chain, PricingConfig, MetalColor } from '@/lib/sanity'
import { computeWeight, priceForChain, formatPrice } from '@/lib/pricing'
import type { Karat } from '@/lib/pricing'
import { formatChainName } from '@/lib/format-chain-name'
import LivePrice from './LivePrice'
import ChainAdditionalInfo from './ChainAdditionalInfo'
import InquiryModal from './InquiryModal'

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

const METAL_SWATCH_COLORS: Record<string, string> = {
  'yellow-gold': 'bg-amber-400',
  'white-gold': 'bg-gray-200',
  'rose-gold': 'bg-rose-gold',
  'two-tone': 'bg-gradient-to-r from-amber-400 to-gray-200',
}

export default function ChainVariantPicker({ chain, pricingConfig }: ChainVariantPickerProps) {
  // Metal color first (Icebox flow)
  const [selectedMetal, setSelectedMetal] = useState<MetalColor>(
    chain.defaultMetal || chain.availableMetals[0]
  )
  const [selectedLength, setSelectedLength] = useState<number>(
    chain.defaultLengthIn || chain.availableLengths[0]
  )
  const [selectedKarat, setSelectedKarat] = useState<Karat>(
    chain.defaultKarat || chain.availableKarats[0]
  )
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)

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

  return (
    <div>
      {/* Price */}
      <div className="mb-6">
        <LivePrice price={price} />
      </div>

      {/* Available badge */}
      <div className="mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Available
        </span>
      </div>

      {/* Metal Color Picker — Circle swatches */}
      <div className="mb-5">
        <label className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2 block">
          Color — {METAL_LABELS[selectedMetal] || selectedMetal}
        </label>
        <div className="flex gap-3">
          {chain.availableMetals.map((metal) => {
            const isActive = selectedMetal === metal
            return (
              <button
                key={metal}
                onClick={() => setSelectedMetal(metal as MetalColor)}
                title={METAL_LABELS[metal] || metal}
                className={`w-10 h-10 rounded-full transition-all duration-200 ${METAL_SWATCH_COLORS[metal]} ${
                  isActive
                    ? 'ring-2 ring-offset-2 ring-soft-black scale-110'
                    : 'ring-1 ring-stone/50 hover:ring-glacier-grey hover:scale-105'
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* Length Picker — Pill buttons */}
      <div className="mb-5">
        <label className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2 block">
          Length
        </label>
        <div className="flex flex-wrap gap-2">
          {chain.availableLengths.map((length) => (
            <button
              key={length}
              onClick={() => setSelectedLength(length)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedLength === length
                  ? 'bg-soft-black text-white shadow-md'
                  : 'bg-warm-white text-charcoal border border-stone hover:border-glacier-grey'
              }`}
            >
              {length}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Karat Picker — Pill buttons */}
      <div className="mb-5">
        <label className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2 block">
          Karat
        </label>
        <div className="flex gap-2">
          {chain.availableKarats.map((karat) => (
            <button
              key={karat}
              onClick={() => setSelectedKarat(karat as Karat)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-200 ${
                selectedKarat === karat
                  ? 'bg-soft-black text-white shadow-md'
                  : 'bg-warm-white text-charcoal border border-stone hover:border-glacier-grey'
              }`}
            >
              {KARAT_LABELS[karat] || karat}
            </button>
          ))}
        </div>
      </div>

      {/* Weight display */}
      <motion.div
        key={`${selectedKarat}-${selectedMetal}-${selectedLength}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 text-sm text-glacier-grey"
      >
        Estimated weight: {weightG.toFixed(2)}g
      </motion.div>

      {/* Inquire CTA */}
      <div className="space-y-3">
        <button
          onClick={() => setIsInquiryOpen(true)}
          className="inline-flex items-center justify-center w-full gap-2 px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide bg-soft-black text-white hover:bg-charcoal hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5" /> Inquire — {formatPrice(price)}
        </button>
      </div>

      {/* Shipping info */}
      <div className="mt-3 flex items-start gap-2 text-sm text-glacier-grey">
        <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          Ships within 2-3 business days &middot; Free insured shipping over $500
        </p>
      </div>

      {/* Trust signals */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-glacier-grey">
        <span className="trust-badge">Handcrafted in Toronto</span>
        <span>&middot;</span>
        <span className="trust-badge">In-House Manufacturing</span>
      </div>

      {/* Additional Info Accordion */}
      <ChainAdditionalInfo
        chain={chain}
        selectedKarat={selectedKarat}
        selectedMetal={selectedMetal}
        selectedLength={selectedLength}
        weightG={weightG}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        chain={{
          chainName: formatChainName(chain.name, chain.widthMm),
          karat: selectedKarat,
          metal: selectedMetal,
          lengthIn: selectedLength,
          widthMm: chain.widthMm,
          weightG,
          priceCad: price,
          slug: chain.slug?.current ?? '',
          chainId: chain._id,
        }}
      />
    </div>
  )
}
