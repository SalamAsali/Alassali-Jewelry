'use client'

import { motion } from 'framer-motion'
import { Scroll, Star, Sparkles, Pen, Type, Camera, HeartCrack, Paintbrush } from 'lucide-react'

const subTypes = [
  {
    name: 'Arabic Calligraphy Pendants',
    keyword: 'Arabic calligraphy pendant Toronto',
    icon: Scroll,
    desc: 'Custom Arabic name pendants, phrases, and verses hand-crafted in Thuluth, Naskh, Diwani, or modern calligraphic fonts. Our master jeweller specializes in translating Arabic calligraphy into flowing gold and platinum pieces — each carefully proofread before CAD rendering.',
    examples: ['Arabic name pendants', 'Mashallah pendants', 'Inshallah pendants', 'Custom Arabic quotes', 'Bismillah pendants'],
  },
  {
    name: 'Islamic Religious Pendants',
    keyword: 'Allah pendant Toronto',
    icon: Star,
    desc: 'Handcrafted Allah pendants, Ayat al-Kursi pendants, and Bismillah pendants — available in traditional calligraphy or contemporary interpretations. Diamond-set and plain gold options in 10K, 14K, and 18K.',
    examples: ['Allah pendants', 'Ayat al-Kursi pendants', 'Bismillah pendants', '99 Names of Allah', 'Kaaba pendants', 'Arabic prayer pendants'],
  },
  {
    name: 'Bubble Letter Pendants',
    keyword: 'bubble letter pendant Toronto',
    icon: Type,
    desc: 'Our signature bubble-letter name pendants in any font, any size, any word. Available plain polished or fully iced out with diamond pavé. Up to 6 letters standard — longer names on request.',
    examples: ['Name bubble letters', 'Script bubble letters', 'Old English letters', 'Gothic letters', 'Diamond-set bubble letters'],
  },
  {
    name: 'Photo Pendants',
    keyword: 'photo pendant Toronto',
    icon: Camera,
    desc: 'Custom photo pendants in two styles: laser-engraved portraits on solid gold, or dome-set photos behind crystal with optional diamond halos. Perfect for memorial pieces, loved ones, and commemorative portraits.',
    examples: ['Laser-engraved photo pendants', 'Crystal dome photo pendants', 'Diamond halo photo pendants', 'Memorial photo pendants', 'Family portrait pendants'],
  },
  {
    name: 'Memorial & Cremation Pendants',
    keyword: 'memorial pendant Toronto',
    icon: HeartCrack,
    desc: 'Thoughtfully crafted memorial pendants incorporating fingerprints, handwriting, silhouettes, or small keepsakes. Cremation-ash memorial pendants can be arranged with advance consultation.',
    examples: ['Fingerprint pendants', 'Handwriting pendants', 'Silhouette pendants', 'Cremation ash pendants', 'Keepsake pendants'],
  },
  {
    name: 'Religious Symbol Pendants',
    keyword: 'religious pendant Toronto',
    icon: Sparkles,
    desc: 'Custom religious symbol pendants across traditions — crosses, hamsas, Stars of David, Om symbols, ankhs, and zodiacs — each crafted in your preferred style, size, and stone configuration.',
    examples: ['Cross pendants', 'Hamsa pendants', 'Star of David pendants', 'Om pendants', 'Ankh pendants', 'Zodiac pendants', 'Evil eye pendants'],
  },
  {
    name: 'Initial & Monogram Pendants',
    keyword: 'initial pendant Toronto',
    icon: Pen,
    desc: 'Single letter, double letter, and full monogram pendants in script, block, cursive, Old English, or custom fonts. Plain gold or fully diamond-set.',
    examples: ['Single letter pendants', 'Cursive initial pendants', 'Diamond initial pendants', 'Monogram pendants', 'Old English initials'],
  },
  {
    name: 'Logo & Brand Pendants',
    keyword: 'custom logo pendant Toronto',
    icon: Paintbrush,
    desc: 'From a logo file to a finished 3D pendant. We translate brand logos, team crests, company marks, and custom artwork into solid gold, platinum, or silver pendants. Full CAD approval before crafting.',
    examples: ['Custom logo pendants', 'Team crest pendants', 'Company pendants', 'Brand pendants', 'Organization pendants'],
  },
]

export default function PendantsHeritageSection() {
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
            Every Pendant Style We Craft
          </h2>
          <p className="text-stone max-w-2xl mx-auto">
            From Arabic calligraphy and religious symbols to bubble letters, photo pendants, and custom logos — here&apos;s every style of pendant we&apos;ve perfected at our Toronto studio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subTypes.map((sub, i) => {
            const Icon = sub.icon
            return (
              <motion.article
                key={sub.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6 hover:border-glacier-grey/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-glacier-grey/15 border border-glacier-grey/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-glacier-grey" />
                  </div>
                  <h3 className="text-white font-bold">{sub.name}</h3>
                </div>
                <p className="text-stone text-sm leading-relaxed mb-4">{sub.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {sub.examples.map((ex) => (
                    <span
                      key={ex}
                      className="text-xs text-glacier-grey bg-glacier-grey/10 border border-glacier-grey/20 rounded-full px-3 py-1"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center max-w-3xl mx-auto bg-charcoal/40 border border-glacier-grey/20 rounded-2xl p-8"
        >
          <Scroll className="w-10 h-10 text-glacier-grey mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Arabic Calligraphy Is Our Specialty
          </h3>
          <p className="text-stone leading-relaxed">
            Al-Assali Jewelry is one of the few custom jewellers in Toronto with deep expertise in Arabic calligraphy pendants. Master jeweller Mohammad Al-Assali personally reviews and hand-shapes every Arabic piece — ensuring authentic letter forms, balanced proportions, and faithful rendering of sacred text. Whether you want your name in script, an Ayat al-Kursi pendant, or a full verse for a loved one, we craft it with the care the language deserves.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
