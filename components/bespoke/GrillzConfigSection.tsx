'use client'

import { motion } from 'framer-motion'
import { Square, ChevronUp, ChevronDown, LayoutGrid, Flame, Circle, Diamond, Sparkles, Gem } from 'lucide-react'

const teethConfigs = [
  { name: 'Single Tooth', icon: Square, desc: 'One tooth, usually a canine or front tooth. Most accessible entry point — starts at $500 in plain 10K gold or $1,400 with VS diamond pavé.', keywords: 'single tooth grillz Toronto' },
  { name: 'Top 6', icon: ChevronUp, desc: 'Six top teeth (canine to canine). Our most popular set. Plain 10K from $2,000, diamond-set VS from $4,500, VVS from $6,500.', keywords: 'top 6 grillz Toronto' },
  { name: 'Bottom 6', icon: ChevronDown, desc: 'Six bottom teeth. Subtle from the front but striking when you smile. Plain 10K from $2,000, diamond-set VS from $4,500.', keywords: 'bottom 6 grillz Toronto' },
  { name: 'Top 8 / Bottom 8', icon: LayoutGrid, desc: 'Extended 8-tooth coverage for a wider smile line. Plain 10K from $2,800, diamond-set VS from $6,000.', keywords: 'top 8 grillz Toronto' },
  { name: 'Full Set', icon: LayoutGrid, desc: 'Top + bottom = 12 teeth. The statement piece. Plain 10K from $4,500, diamond-set VS from $9,500, full VVS from $14,000+.', keywords: 'full set grillz Toronto' },
  { name: 'Fangs', icon: Flame, desc: 'Canine teeth only (pair). Bold, iconic, and budget-friendly. Plain 10K from $800, diamond-set from $1,400.', keywords: 'fangs grillz Toronto' },
  { name: 'Open-Face', icon: Circle, desc: 'Outline-only grillz with no metal covering the tooth surface — visible enamel through the centre. Plain 10K from $1,400 per 4 teeth.', keywords: 'open face grillz Toronto' },
  { name: 'Honeycomb / Bar', icon: Gem, desc: 'Geometric lattice designs set with diamonds. From $1,800 for bar top 6, from $5,500 diamond-set.', keywords: 'honeycomb grillz Toronto' },
  { name: 'Diamond Dust', icon: Sparkles, desc: 'Textured finish with micro-set diamonds across the surface — subtle sparkle, not full pavé. Add $300-$600 to any config.', keywords: 'diamond dust grillz Toronto' },
]

const clarityLadder = [
  { name: 'No Diamonds', range: 'Plain gold', note: 'Polished or matte finish in 10K/14K/18K. Starting tier.', modifier: 'Base price' },
  { name: 'Cubic Zirconia', range: 'We do not use', note: 'We never substitute CZ for real diamonds. Every stone is genuine.', modifier: 'Not offered' },
  { name: 'SI (Slightly Included)', range: 'Entry diamond', note: 'Eye-clean from most angles. Great for dust finishes and micro-pavé. 10-15% premium over plain.', modifier: '+10–15%' },
  { name: 'VS (Very Slightly Included)', range: 'Mid-premium', note: 'Clean face-up, strong brilliance. Our most popular clarity tier for full pavé grillz.', modifier: '+30–40% over plain' },
  { name: 'VVS (Very Very Slightly Included)', range: 'Premium tier', note: 'Inclusions invisible without 10x magnification. Maximum fire — the "VVS grillz Toronto" tier.', modifier: '+60–80% over plain' },
  { name: 'Flawless (FL/IF)', range: 'Ultra-premium', note: 'No inclusions under 10x magnification. Rare — available on request.', modifier: '+120%+ over plain' },
]

export default function GrillzConfigSection() {
  return (
    <>
      {/* TEETH CONFIGURATIONS */}
      <section className="py-20 px-4 border-t border-glacier-grey/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Teeth Configurations
            </h2>
            <p className="text-stone max-w-2xl mx-auto">
              Every configuration we make, with real starting prices. Mix configurations (e.g. top 6 + bottom fangs) on request.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teethConfigs.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.article
                  key={c.name}
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
                    <h3 className="text-white font-bold text-sm">{c.name}</h3>
                  </div>
                  <p className="text-stone text-xs leading-relaxed">{c.desc}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* DIAMOND CLARITY LADDER */}
      <section className="py-20 px-4 border-t border-glacier-grey/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Diamond Clarity Ladder
            </h2>
            <p className="text-stone max-w-2xl mx-auto">
              How diamond clarity affects your grillz price and look. We never use cubic zirconia or substitute materials — every stone is real.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="border-b border-glacier-grey/30">
                  <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Clarity Tier</th>
                  <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Price Range</th>
                  <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">What You Get</th>
                  <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Modifier</th>
                </tr>
              </thead>
              <tbody>
                {clarityLadder.map((c, i) => (
                  <motion.tr
                    key={c.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-glacier-grey/10 hover:bg-charcoal/30 transition-colors"
                  >
                    <td className="p-3 text-white text-sm font-medium flex items-center gap-2">
                      <Diamond className="w-4 h-4 text-glacier-grey" /> {c.name}
                    </td>
                    <td className="p-3 text-stone text-sm">{c.range}</td>
                    <td className="p-3 text-stone text-xs leading-relaxed">{c.note}</td>
                    <td className="p-3 text-glacier-grey text-sm font-semibold whitespace-nowrap">{c.modifier}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
