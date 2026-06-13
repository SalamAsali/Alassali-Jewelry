'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Chain, PricingConfig, DatoCMSImage } from '@/lib/datocms'
import ChainVariantPicker from '@/components/chains/ChainVariantPicker'

interface ChainProductDetailProps {
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

function getImageSrc(img: DatoCMSImage): string {
  return img.responsiveImage?.src || img.url || '/images/placeholder-chain.jpg'
}

export default function ChainProductDetail({ chain, pricingConfig }: ChainProductDetailProps) {
  const allImages = [chain.heroImage, ...(chain.galleryImages || [])].filter(Boolean) as DatoCMSImage[]
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const selectedImage = allImages[selectedImageIdx] || allImages[0]

  const typeLabel = CHAIN_TYPE_LABELS[chain.chainType] || chain.chainType

  return (
    <div>
      {/* Breadcrumb */}
      <div className="section-container py-4">
        <nav className="flex items-center gap-2 text-sm text-glacier-grey">
          <Link href="/chains" className="hover:text-deep-charcoal transition-colors">
            Chains
          </Link>
          <span>/</span>
          <Link
            href={`/chains/${chain.defaultMetal || 'yellow-gold'}`}
            className="hover:text-deep-charcoal transition-colors capitalize"
          >
            {(chain.defaultMetal || 'yellow-gold').replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-deep-charcoal font-medium">{chain.name}</span>
        </nav>
      </div>

      {/* Product Layout */}
      <div className="section-container pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Images */}
          <div>
            {/* Hero Image */}
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-warm-white border border-stone/30">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIdx}
                    src={getImageSrc(selectedImage)}
                    alt={selectedImage.alt || chain.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        idx === selectedImageIdx
                          ? 'border-soft-black shadow-lg'
                          : 'border-stone/50 hover:border-glacier-grey'
                      }`}
                    >
                      <img
                        src={getImageSrc(img)}
                        alt={img.alt || `${chain.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — Product Info & Variant Picker */}
          <div className="pt-2">
            {/* Type badge */}
            <span className="inline-block px-3 py-1 rounded-full bg-warm-white border border-stone text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-3">
              {typeLabel}
            </span>

            {/* Title */}
            <h1 className="heading-hero text-deep-charcoal mb-2">{chain.name}</h1>

            {/* Width */}
            <p className="text-lg text-glacier-grey mb-6">
              {chain.widthMm}mm &middot;{' '}
              <span className="capitalize">{chain.construction}</span>
            </p>

            {/* Variant Picker + Price + CTA + Accordion */}
            <ChainVariantPicker chain={chain} pricingConfig={pricingConfig} />
          </div>
        </div>
      </div>
    </div>
  )
}
