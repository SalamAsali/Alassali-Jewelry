'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// DatoCMS assets are served by Imgix. Appending these params delivers a
// browser-native modern format (AVIF/WebP), aggressive compression, and a
// width matched to the actual card size — instead of the full ~3–10 MB
// originals. Untouched origin URLs flow through unchanged so we don't break
// anything served outside datocms-assets.com (fallback paths, /images/*).
function buildImgixSrc(url: string | undefined, width: number): string | undefined {
  if (!url || !/datocms-assets\.com/.test(url)) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}auto=format,compress&fit=crop&w=${width}&q=75`
}

function buildSrcSet(url: string | undefined): string | undefined {
  if (!url || !/datocms-assets\.com/.test(url)) return undefined
  return [400, 600, 800, 1200].map((w) => `${buildImgixSrc(url, w)} ${w}w`).join(', ')
}

// Grid layout: full-width on mobile, 2 columns ≥640px, 3 columns ≥1024px,
// container max-width caps at ~1280px so each card is ~400px wide on desktop.
const CARD_SIZES = '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'

export type PortfolioGridItem = {
  id: string
  name: string
  category: string
  /** Primary image URL (kept for backward compatibility with FALLBACK_ITEMS). */
  image: string
  /**
   * Full ordered list of images for the card. When omitted the card falls
   * back to `[image]`. When length > 1 the card renders as a carousel:
   * left/right arrows + auto-rotate every 3s while the card is visible.
   */
  images?: string[]
}

type Props = {
  items: PortfolioGridItem[]
  categories: string[]
}

/**
 * Single portfolio card. Visually identical to the original single-image card
 * — same border, aspect-square, hover overlay. The only new behaviour kicks
 * in when `images.length > 1`:
 *   - left/right arrow buttons positioned at the vertical centre of the image
 *   - auto-advance the active image every 3000ms while the card is intersecting
 *     the viewport (paused otherwise, and paused for 6s after a manual nav)
 *   - thin progress dots at the bottom of the image to show position
 */
function PortfolioCard({ item }: { item: PortfolioGridItem }) {
  const images =
    item.images && item.images.length > 0 ? item.images : [item.image]
  const total = images.length
  const isCarousel = total > 1

  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [pauseUntil, setPauseUntil] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  // IntersectionObserver — only count as "visible" while at least 25% of the
  // card is on screen. That keeps a row of off-screen cards from racing in
  // the background.
  useEffect(() => {
    if (!isCarousel || !ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isCarousel])

  // Auto-advance every 3s while visible. Manual navigation pauses for 6s.
  useEffect(() => {
    if (!isCarousel || !isVisible) return
    const tick = () => {
      if (Date.now() < pauseUntil) return
      setIndex((i) => (i + 1) % total)
    }
    const id = window.setInterval(tick, 3000)
    return () => window.clearInterval(id)
  }, [isCarousel, isVisible, total, pauseUntil])

  const goTo = (next: number) => {
    setIndex(((next % total) + total) % total)
    setPauseUntil(Date.now() + 6000)
  }

  return (
    <div ref={ref} className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg border-4 border-soft-black shadow-lg">
        <div className="aspect-square overflow-hidden bg-white relative">
          {images.map((src, i) => (
            <img
              key={src + i}
              src={buildImgixSrc(src, 800)}
              srcSet={buildSrcSet(src)}
              sizes={CARD_SIZES}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          ))}
        </div>

        {/* Hover overlay with name — identical to original */}
        <div className="absolute inset-0 bg-gradient-to-t from-soft-black/90 via-soft-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 pointer-events-none">
          <h3
            className="text-lg font-semibold text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {item.name}
          </h3>
        </div>

        {/* Carousel chrome — only when 2+ images */}
        {isCarousel && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                goTo(index - 1)
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-soft-black/70 hover:bg-soft-black text-white flex items-center justify-center text-lg leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                goTo(index + 1)
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-soft-black/70 hover:bg-soft-black text-white flex items-center justify-center text-lg leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    goTo(i)
                  }}
                  aria-label={`Show image ${i + 1} of ${total}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
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
              >
                <PortfolioCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
