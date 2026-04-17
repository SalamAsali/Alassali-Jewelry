'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Circle, Square, CircleDot, Hexagon, Shield, Droplet, Diamond,
  Sun, Layers, Heart, Flame, MinusCircle, HelpCircle,
} from 'lucide-react'

type Shape = {
  name: string
  icon: LucideIcon
  blurb: string
  keywords: string
}

const shapes: Shape[] = [
  { name: 'Round Brilliant', icon: Circle, blurb: 'The most popular shape. 58 facets deliver maximum fire and sparkle — the benchmark for engagement rings and diamond studs.', keywords: 'round brilliant diamond Toronto' },
  { name: 'Princess', icon: Square, blurb: 'A modern square cut with sharp corners and brilliant facets. Second most popular for engagement rings.', keywords: 'princess cut diamond Toronto' },
  { name: 'Oval', icon: CircleDot, blurb: 'Elongates the finger and looks larger per carat than a round. A top-trending shape for engagement rings.', keywords: 'oval diamond engagement ring Toronto' },
  { name: 'Emerald', icon: Hexagon, blurb: 'A rectangular step-cut with clean lines — understated, elegant, and distinctly vintage Art Deco.', keywords: 'emerald cut diamond Toronto' },
  { name: 'Cushion', icon: Shield, blurb: 'A square or rectangular cut with rounded corners. Warm, vintage, and timeless — often paired with halos.', keywords: 'cushion cut diamond Toronto' },
  { name: 'Pear', icon: Droplet, blurb: 'A teardrop shape that blends round brilliance with oval elongation. Flattering and distinctive.', keywords: 'pear shaped diamond Toronto' },
  { name: 'Marquise', icon: Diamond, blurb: 'A football-shaped cut with pointed ends. Makes fingers appear longer and stones look larger per carat.', keywords: 'marquise diamond Toronto' },
  { name: 'Radiant', icon: Sun, blurb: 'A rectangular cut with cropped corners and brilliant faceting. Combines the shape of emerald with the fire of round.', keywords: 'radiant cut diamond Toronto' },
  { name: 'Asscher', icon: Layers, blurb: 'A square step-cut with cropped corners. Deeper than emerald, with a hall-of-mirrors visual effect.', keywords: 'asscher cut diamond Toronto' },
  { name: 'Heart', icon: Heart, blurb: 'The ultimate romantic shape. Best in 1.0ct+ sizes where the silhouette reads clearly.', keywords: 'heart shaped diamond Toronto' },
  { name: 'Trillion', icon: Flame, blurb: 'A bold triangular cut — often used as side stones in three-stone rings or as striking solitaires.', keywords: 'trillion cut diamond Toronto' },
  { name: 'Baguette', icon: MinusCircle, blurb: 'A slim rectangular step-cut. Classic as side stones in three-stone and channel-set engagement rings.', keywords: 'baguette diamond Toronto' },
  { name: 'Other', icon: HelpCircle, blurb: 'Old mine, rose cut, hexagon, kite, shield, or fully custom shapes — bring us anything and we\'ll source or cut it.', keywords: 'custom diamond shape Toronto' },
]

export default function StoneShapeSection({ heading = 'Diamond & Stone Shapes' }: { heading?: string }) {
  return (
    <section className="py-20 px-4 border-t border-glacier-grey/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {heading}
          </h2>
          <p className="text-stone max-w-2xl mx-auto">
            Every diamond and gemstone shape we source and set — each with distinct visual traits, price per carat, and styling strengths.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shapes.map((shape, i) => {
            const Icon = shape.icon
            return (
              <motion.article
                key={shape.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5 hover:border-glacier-grey/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-glacier-grey/15 border border-glacier-grey/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-glacier-grey" />
                  </div>
                  <h3 className="text-white font-bold text-sm">{shape.name}</h3>
                </div>
                <p className="text-stone text-xs leading-relaxed">{shape.blurb}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
