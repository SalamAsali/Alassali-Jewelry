'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Chain, MetalColor } from '@/lib/sanity'
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

const LENGTH_GUIDE = [
  { length: '16"', fit: 'Choker', description: 'Sits snugly around the neck. Best for women or layering.' },
  { length: '18"', fit: 'Collarbone', description: 'Rests at the collarbone. The most popular length for women.' },
  { length: '20"', fit: 'Below Collarbone', description: 'Falls just below the collarbone. Classic unisex length.' },
  { length: '22"', fit: 'Above Chest', description: 'Sits above the chest. Popular for men and layering.' },
  { length: '24"', fit: 'Mid-Chest', description: 'Falls at mid-chest. The most popular length for men.' },
  { length: '26"', fit: 'Below Chest', description: 'Falls below the chest. Bold statement length.' },
  { length: '28"', fit: 'Sternum', description: 'Reaches the sternum. For a longer, layered look.' },
  { length: '30"', fit: 'Long', description: 'Falls well below the chest. Statement piece.' },
]

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
  const typeLabel = CHAIN_TYPE_LABELS[chain.chainType] || chain.chainType

  return (
    <div className="border-t border-stone/50 mt-8 pt-2">
      {/* Description — open by default */}
      {chain.description && (
        <AccordionItem title="Description" defaultOpen>
          <p>{chain.description}</p>
        </AccordionItem>
      )}

      {/* Specifications */}
      <AccordionItem title="Specifications" defaultOpen={!chain.description}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Chain Type</p>
            <p className="font-medium text-deep-charcoal">{typeLabel}</p>
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
          <div>
            <p className="text-xs uppercase tracking-wider text-glacier-grey mb-0.5">Clasp Type</p>
            <p className="font-medium text-deep-charcoal">Lobster Claw</p>
          </div>
        </div>
      </AccordionItem>

      {/* Length Guide */}
      <AccordionItem title="Length Guide">
        <div className="space-y-0">
          <div className="grid grid-cols-[60px_100px_1fr] gap-2 text-xs uppercase tracking-wider text-glacier-grey font-semibold pb-2 border-b border-stone/30">
            <span>Length</span>
            <span>Fit</span>
            <span>Description</span>
          </div>
          {LENGTH_GUIDE.map((row) => {
            const isSelected = row.length === `${selectedLength}"`
            return (
              <div
                key={row.length}
                className={`grid grid-cols-[60px_100px_1fr] gap-2 py-2 border-b border-stone/20 last:border-b-0 ${
                  isSelected ? 'bg-warm-white -mx-2 px-2 rounded' : ''
                }`}
              >
                <span className={`font-medium ${isSelected ? 'text-deep-charcoal' : 'text-charcoal'}`}>
                  {row.length}
                </span>
                <span className={`font-medium ${isSelected ? 'text-deep-charcoal' : 'text-charcoal'}`}>
                  {row.fit}
                </span>
                <span className="text-glacier-grey">{row.description}</span>
              </div>
            )
          })}
        </div>
      </AccordionItem>

      {/* FAQ */}
      <AccordionItem title="FAQ">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-deep-charcoal mb-1">
              Is this chain {chain.construction === 'solid' ? 'solid gold' : chain.construction}?
            </p>
            <p className="text-glacier-grey">
              {chain.construction === 'solid' && (
                <>Yes, this chain is made of solid gold with no hollow core. Solid gold chains are the most durable and valuable option, offering superior weight and longevity.</>
              )}
              {chain.construction === 'semi-solid' && (
                <>This chain is semi-solid construction, striking a balance between durability and weight. It offers excellent value with a substantial feel.</>
              )}
              {chain.construction === 'hollow' && (
                <>This chain uses hollow construction, making it lightweight and comfortable for everyday wear. It offers an elegant look at an accessible price point.</>
              )}
            </p>
          </div>
          <div>
            <p className="font-medium text-deep-charcoal mb-1">
              Can I shower or swim with this chain?
            </p>
            <p className="text-glacier-grey">
              We recommend removing your chain before swimming, showering, or exercising. While gold is naturally resistant to tarnish, exposure to chlorine, salt water, and chemicals can dull the finish over time.
            </p>
          </div>
          <div>
            <p className="font-medium text-deep-charcoal mb-1">
              How do I know which length is right for me?
            </p>
            <p className="text-glacier-grey">
              Use a flexible measuring tape or string around your neck to find your ideal fit. For men, 22-24&quot; is most popular. For women, 16-20&quot; is typical. Check our Length Guide above for a detailed breakdown.
            </p>
          </div>
        </div>
      </AccordionItem>

      {/* Care Instructions */}
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
