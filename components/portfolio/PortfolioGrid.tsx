'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type PortfolioGridItem = {
  id: string
  name: string
  category: string
  image: string
}

type Props = {
  items: PortfolioGridItem[]
  categories: string[]
}

export default function PortfolioGrid({ items, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory)

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="mb-16 max-w-4xl mx-auto">
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
  )
}
