'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Check, Truck } from 'lucide-react'
import type { Chain, PricingConfig, MetalColor } from '@/lib/sanity'
import { getSanityImageUrl } from '@/lib/sanity'
import { computeWeight, priceForChain, formatPrice } from '@/lib/pricing'
import type { Karat } from '@/lib/pricing'
import { formatChainName } from '@/lib/format-chain-name'
import { useCart } from '@/lib/cart'
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

  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)

  async function handleBuyNow() {
    setIsBuyingNow(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId: chain._id,
          name: formatChainName(chain.name, chain.widthMm),
          slug: chain.slug?.current ?? '',
          karat: selectedKarat,
          metal: selectedMetal,
          lengthIn: selectedLength,
          widthMm: chain.widthMm,
          weightG,
          priceCad: price,
          heroImage: getSanityImageUrl(chain.heroImage, 400) || null,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('Buy now failed:', err)
    } finally {
      setIsBuyingNow(false)
    }
  }

  function handleAddToCart() {
    addItem({
      chainId: chain._id,
      slug: chain.slug?.current ?? '',
      name: formatChainName(chain.name, chain.widthMm),
      karat: selectedKarat,
      metal: selectedMetal,
      lengthIn: selectedLength,
      widthMm: chain.widthMm,
      weightG,
      priceCad: price,
      image: getSanityImageUrl(chain.heroImage, 400) || null,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  const bnplPayment = formatPrice(price / 4)

  return (
    <div>
      {/* Price */}
      <div className="mb-6">
        <LivePrice price={price} />
      </div>

      {/* In Stock badge */}
      <div className="mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          In Stock
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

      {/* CTAs */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className={`inline-flex items-center justify-center w-full gap-2 px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${
            justAdded
              ? 'bg-green-600 text-white'
              : 'bg-soft-black text-white hover:bg-charcoal'
          }`}
        >
          {justAdded ? (
            <><Check className="w-5 h-5" /> Added to Cart</>
          ) : (
            <><ShoppingBag className="w-5 h-5" /> Add to Cart — {formatPrice(price)}</>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isBuyingNow}
          className="inline-flex items-center justify-center w-full gap-2 px-8 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide border-2 border-soft-black text-deep-charcoal hover:bg-soft-black hover:text-white transition-all duration-300 disabled:opacity-50"
        >
          {isBuyingNow ? 'Redirecting...' : 'Buy Now'}
        </button>
      </div>

      {/* BNPL message */}
      <div className="mt-4 p-3 bg-warm-white border border-stone rounded-lg text-center">
        <p className="text-sm text-charcoal">
          Buy Now, Pay Later — 4 interest-free payments of{' '}
          <span className="font-semibold text-deep-charcoal">{bnplPayment}</span>
        </p>
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
