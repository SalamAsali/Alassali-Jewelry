'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Chain, MetalColor } from '@/lib/datocms'
import type { Karat } from '@/lib/pricing'
import { KARAT_PURITY } from '@/lib/pricing'

interface ChainAdditionalInfoProps {
  chain: Chain
  selectedKarat: Karat
  selectedMetal: MetalColor
  selectedLength: number
  weightG: number
}

const METAL_LABELS: Record<string, string> = {
  'yellow-gold': 'Yellow Gold',
  'white-gold': 'White Gold',
  'rose-gold': 'Rose Gold',
  'two-tone': 'Two-Tone',
}

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-stone/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-heading text-lg font-medium text-deep-charcoal group-hover:text-glacier-grey transition-colors">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-glacier-grey" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-charcoal leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ChainAdditionalInfo({
  chain,
  selectedKarat,
  selectedMetal,
  selectedLength,
  weightG,
}: ChainAdditionalInfoProps) {
  return (
    <div className="border-t border-stone/50 mt-8 pt-2">
      <AccordionItem title="Specifications" defaultOpen>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Chain Type</p>
            <p className="font-medium text-deep-charcoal capitalize">{chain.chainType.replace('-', ' ')}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Width</p>
            <p className="font-medium text-deep-charcoal">{chain.widthMm}mm</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Length</p>
            <p className="font-medium text-deep-charcoal">{selectedLength}&quot;</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Weight</p>
            <p className="font-medium text-deep-charcoal">{weightG.toFixed(2)}g</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Karat</p>
            <p className="font-medium text-deep-charcoal uppercase">{selectedKarat}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Metal</p>
            <p className="font-medium text-deep-charcoal">{METAL_LABELS[selectedMetal] || selectedMetal}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Gold Purity</p>
            <p className="font-medium text-deep-charcoal">{(KARAT_PURITY[selectedKarat] * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Construction</p>
            <p className="font-medium text-deep-charcoal capitalize">{chain.construction}</p>
          </div>
        </div>
      </AccordionItem>

      {chain.description && (
        <AccordionItem title="Description">
          <p>{chain.description}</p>
        </AccordionItem>
      )}

      {chain.specifications && (
        <AccordionItem title="Additional Details">
          <p>{chain.specifications}</p>
        </AccordionItem>
      )}

      <AccordionItem title="Construction">
        <p>
          This chain features <strong className="text-deep-charcoal">{chain.construction}</strong> construction.
          {chain.construction === 'solid' && (
            <> Solid gold chains are the most durable and valuable option, made entirely of gold with no hollow core. They offer superior weight and longevity.</>
          )}
          {chain.construction === 'semi-solid' && (
            <> Semi-solid chains strike a balance between durability and weight, offering excellent value with a substantial feel.</>
          )}
          {chain.construction === 'hollow' && (
            <> Hollow chains are lightweight and comfortable for everyday wear, offering an elegant look at an accessible price point.</>
          )}
        </p>
      </AccordionItem>

      <AccordionItem title="Care Instructions">
        <ul className="space-y-2 list-disc pl-4">
          <li>Store in a soft pouch or jewelry box when not wearing</li>
          <li>Avoid contact with perfume, lotions, and harsh chemicals</li>
          <li>Clean gently with a soft cloth and warm soapy water</li>
          <li>Remove before swimming, showering, or exercising</li>
          <li>Have your chain professionally inspected annually</li>
        </ul>
      </AccordionItem>
    </div>
  )
}
