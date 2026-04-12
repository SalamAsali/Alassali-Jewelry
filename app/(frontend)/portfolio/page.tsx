'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'

interface PortfolioItem {
  id: string
  name: string
  category: string
  image: string
}

const categories = [
  'All',
  'Rings',
  'Pendants',
  'Chains',
  'Grillz',
  'Bracelets',
  'Glasses',
  'Engagement Rings',
] as const

const portfolioItems: PortfolioItem[] = [
  // Bracelets
  {
    id: 'bracelets-1',
    name: 'Gold Cuban Link Bracelet with Pave Diamond Clasp',
    category: 'Bracelets',
    image: '/images/portfolio/bracelets-cuban-link-bracelet.jpg',
  },
  // Chains
  {
    id: 'chains-1',
    name: 'Sterling Silver Heavy Cuban Link Chain',
    category: 'Chains',
    image: '/images/portfolio/chains-silver-cuban-link.jpg',
  },
  {
    id: 'chains-2',
    name: 'Sterling Silver Miami Cuban Link Choker',
    category: 'Chains',
    image: '/images/portfolio/chains-cuban-link-choker.jpg',
  },
  // Engagement Rings
  {
    id: 'engagement-1',
    name: 'Oval Diamond Halo Engagement Ring with Pave Band',
    category: 'Engagement Rings',
    image: '/images/portfolio/engagement-oval-halo-ring.jpg',
  },
  // Glasses
  {
    id: 'glasses-1',
    name: 'Rimless Diamond-Bridge Sunglasses in Gold',
    category: 'Glasses',
    image: '/images/portfolio/glasses-diamond-bridge.jpg',
  },
  {
    id: 'glasses-2',
    name: 'Diamond-Accented Rimless Sunglasses Duo',
    category: 'Glasses',
    image: '/images/portfolio/glasses-rimless-duo.jpg',
  },
  // Grillz
  {
    id: 'grillz-1',
    name: 'Sterling Silver Full Set Grillz',
    category: 'Grillz',
    image: '/images/portfolio/grillz-silver-full-set.jpg',
  },
  {
    id: 'grillz-2',
    name: 'White Gold Single-Tooth Open-Face Grill',
    category: 'Grillz',
    image: '/images/portfolio/grillz-single-open-face.jpg',
  },
  {
    id: 'grillz-3',
    name: 'Gold Open-Face Fang Grillz Set',
    category: 'Grillz',
    image: '/images/portfolio/grillz-gold-fang-set.jpg',
  },
  {
    id: 'grillz-4',
    name: 'Gold Single-Tooth Canine Grill',
    category: 'Grillz',
    image: '/images/portfolio/grillz-gold-single-canine.jpg',
  },
  {
    id: 'grillz-5',
    name: 'Gold 6-Piece Bottom Grillz Set',
    category: 'Grillz',
    image: '/images/portfolio/grillz-gold-bottom-set.png',
  },
  // Pendants
  {
    id: 'pendants-1',
    name: 'Rose Gold Khanda Medallion Pendant',
    category: 'Pendants',
    image: '/images/portfolio/pendants-khanda-medallion.jpg',
  },
  {
    id: 'pendants-2',
    name: 'Gold Script "Dima" Custom Name Necklace',
    category: 'Pendants',
    image: '/images/portfolio/pendants-dima-name-necklace.png',
  },
  {
    id: 'pendants-3',
    name: 'Gold Iced-Out Photo Medallion Pendants',
    category: 'Pendants',
    image: '/images/portfolio/pendants-photo-medallions.jpg',
  },
  {
    id: 'pendants-4',
    name: 'Gold Script "Zayden" Custom Name Necklace',
    category: 'Pendants',
    image: '/images/portfolio/pendants-zayden-name-necklace.jpg',
  },
  {
    id: 'pendants-5',
    name: 'Sterling Silver "Demons" Custom Pendant',
    category: 'Pendants',
    image: '/images/portfolio/pendants-demons-custom.jpg',
  },
  {
    id: 'pendants-6',
    name: 'Gold Diamond-Pave "G" Initial Pendant',
    category: 'Pendants',
    image: '/images/portfolio/pendants-g-initial.jpg',
  },
  // Rings
  {
    id: 'rings-1',
    name: 'Gold Anchor Chain-Link Band Ring',
    category: 'Rings',
    image: '/images/portfolio/rings-anchor-chain-band.jpg',
  },
  {
    id: 'rings-2',
    name: 'Sterling Silver "SA" Monogram Signet Ring',
    category: 'Rings',
    image: '/images/portfolio/rings-sa-signet.jpg',
  },
  {
    id: 'rings-3',
    name: 'Sterling Silver Crown of Thorns Band',
    category: 'Rings',
    image: '/images/portfolio/rings-crown-thorns-band.jpg',
  },
  {
    id: 'rings-4',
    name: 'Gold Butterfly Wrap Ring',
    category: 'Rings',
    image: '/images/portfolio/rings-butterfly-wrap.jpg',
  },
  {
    id: 'rings-5',
    name: 'Full Pave Diamond Dome Pinky Ring Duo',
    category: 'Rings',
    image: '/images/portfolio/rings-pave-dome-duo.png',
  },
  {
    id: 'rings-6',
    name: 'Iced-Out Gothic "03" Number Ring',
    category: 'Rings',
    image: '/images/portfolio/rings-03-number.jpg',
  },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-soft-black text-white overflow-hidden">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <div className="section-container py-20 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PORTFOLIO
          </motion.h1>
        </div>
      </section>

      {/* Category Filters + Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="section-container relative z-10">
          {/* Category Buttons */}
          <div className="mb-16 max-w-4xl mx-auto">
            {/* Mobile: "All" on its own row, rest wrap into 2 rows */}
            <div className="flex flex-col items-center gap-2.5 lg:hidden">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-6 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 ${
                  activeCategory === 'All'
                    ? 'bg-soft-black text-white shadow-lg'
                    : 'bg-transparent text-charcoal border border-stone hover:bg-soft-black hover:text-white hover:border-soft-black hover:shadow-lg'
                }`}
              >
                All
              </button>
              <div className="flex flex-wrap justify-center gap-2.5">
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-soft-black text-white shadow-lg'
                        : 'bg-transparent text-charcoal border border-stone hover:bg-soft-black hover:text-white hover:border-soft-black hover:shadow-lg'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {/* Desktop: all on one row */}
            <div className="hidden lg:flex justify-center gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-soft-black text-white shadow-lg'
                      : 'bg-transparent text-charcoal border border-stone hover:bg-soft-black hover:text-white hover:border-soft-black hover:shadow-lg'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg border-4 border-soft-black shadow-lg">
                    <div className="aspect-square overflow-hidden bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Hover Overlay -- name only */}
                    <div className="absolute inset-0 bg-gradient-to-t from-soft-black/90 via-soft-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <h3
                        className="text-lg font-semibold text-white leading-tight"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}
