'use client'

import { motion } from 'framer-motion'
import { Leaf, FlaskConical, Check, Minus } from 'lucide-react'

type Row = {
  attribute: string
  natural: string
  lab: string
  naturalWin?: boolean
  labWin?: boolean
}

const rows: Row[] = [
  { attribute: 'Physical properties', natural: 'Identical (same carbon lattice)', lab: 'Identical (same carbon lattice)' },
  { attribute: 'Brilliance / fire', natural: 'Identical', lab: 'Identical' },
  { attribute: 'Hardness (Mohs 10)', natural: 'Identical', lab: 'Identical' },
  { attribute: 'Certification', natural: 'GIA (standard)', lab: 'GIA & IGI (standard)' },
  { attribute: 'Price per carat', natural: 'Higher (~2.5–3× lab)', lab: 'Lower (40–60% of natural)', labWin: true },
  { attribute: 'Resale / long-term value', natural: 'Holds value better over decades', lab: 'Limited secondary market', naturalWin: true },
  { attribute: 'Ethical sourcing', natural: 'Conflict-free (Kimberley + SCS)', lab: 'Zero mining impact', labWin: true },
  { attribute: 'Carat size per budget', natural: 'Smaller for the same $', lab: 'Up to 2× larger for the same $', labWin: true },
  { attribute: 'Inclusions / character', natural: 'Often unique (some love it)', lab: 'Typically very clean', naturalWin: true },
  { attribute: 'Heirloom / sentiment', natural: 'Formed over billions of years', lab: 'Grown in weeks under pressure', naturalWin: true },
  { attribute: 'Best for', natural: 'Engagement rings, heirloom pieces', lab: 'Larger carat sizes, tennis, studs, anniversary pieces' },
]

export default function NaturalVsLabSection() {
  return (
    <section className="py-20 px-4 border-t border-glacier-grey/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Natural vs Lab-Grown Diamonds
          </h2>
          <p className="text-stone max-w-2xl mx-auto">
            Both are real diamonds — same carbon, same brilliance, same hardness. The right choice depends on your goals. Here\u2019s how they compare side by side.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-bold">Natural Diamond</h3>
            </div>
            <p className="text-stone text-sm leading-relaxed">
              Mined from the earth and formed over billions of years. Holds long-term resale value, ideal for heirloom engagement rings, and carries the sentiment of rarity.
            </p>
          </div>
          <div className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-white font-bold">Lab-Grown Diamond</h3>
            </div>
            <p className="text-stone text-sm leading-relaxed">
              Grown under high pressure and temperature in weeks. Chemically identical to natural, with zero mining impact. Ideal when you want bigger carat size for the same budget.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left border-collapse">
            <thead>
              <tr className="border-b border-glacier-grey/30">
                <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Attribute</th>
                <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Natural</th>
                <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Lab-Grown</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.attribute}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-glacier-grey/10 hover:bg-charcoal/30 transition-colors"
                >
                  <td className="p-3 text-white text-sm font-medium">{row.attribute}</td>
                  <td className={`p-3 text-sm ${row.naturalWin ? 'text-emerald-300' : 'text-stone'}`}>
                    {row.naturalWin ? <Check className="inline w-4 h-4 mr-1 text-emerald-400" /> : null}
                    {row.natural}
                  </td>
                  <td className={`p-3 text-sm ${row.labWin ? 'text-sky-300' : 'text-stone'}`}>
                    {row.labWin ? <Check className="inline w-4 h-4 mr-1 text-sky-400" /> : null}
                    {row.lab}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
