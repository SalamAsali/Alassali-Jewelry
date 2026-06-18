'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Sanity images are served via cdn.sanity.io. Appending width/format params
// delivers optimised modern format (WebP), compression, and a width matched
// to the actual card size. Non-Sanity URLs flow through unchanged.
function buildSanitySrc(url: string | undefined, width: number): string | undefined {
  if (!url) return url
  if (/cdn\.sanity\.io/.test(url)) {
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}w=${width}&auto=format&q=75`
  }
  return url
}

function buildSrcSet(url: string | undefined): string | undefined {
  if (!url || !/cdn\.sanity\.io/.test(url)) return undefined
  return [400, 600, 800, 1200].map((w) => `${buildSanitySrc(url, w)} ${w}w`).join(', ')
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
              src={buildSanitySrc(src, 800)}
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

// Bespoke landing pages drive most portfolio traffic. When a visitor arrives
// from one of them (or lands on /portfolio?category=Rings directly), pre-
// select the matching filter so they see the work they came to see without
// hunting for it.
const BESPOKE_SLUG_TO_CATEGORY: Record<string, string> = {
  'engagement-rings': 'Engagement Rings',
  'wedding-bands': 'Wedding Bands',
  rings: 'Rings',
  pendants: 'Pendants',
  chains: 'Chains',
  bracelets: 'Bracelets',
  grillz: 'Grillz',
  // /custom-earrings-toronto exists but the portfolio has no Earrings
  // category yet — fall through to 'All' until one is added.
}

// Canonical order mirrors the Bespoke nav menu so filter chips read in the
// same sequence everywhere on the site. 'All' always leads. Anything not in
// the canonical list (future Dato categories the editor adds) falls in after
// the known set, preserving its current order from Dato.
const CANONICAL_CATEGORY_ORDER = [
  'Engagement Rings',
  'Wedding Bands',
  'Rings',
  'Pendants',
  'Chains',
  'Earrings',
  'Bracelets',
  'Grillz',
]

function sortCategories(categories: string[]): string[] {
  const all = categories.filter((c) => c === 'All')
  const known = CANONICAL_CATEGORY_ORDER.filter((c) => categories.includes(c))
  const knownSet = new Set([...all, ...known])
  const rest = categories.filter((c) => !knownSet.has(c))
  return [...all, ...known, ...rest]
}

function resolveInitialCategory(categories: string[]): string {
  if (typeof window === 'undefined') return 'All'

  const lookup = (target: string) =>
    categories.find((c) => c.toLowerCase() === target.toLowerCase())

  // 1) Explicit query param wins — supports deep links and shareable URLs.
  const fromQuery = new URLSearchParams(window.location.search).get('category')
  if (fromQuery) {
    const match = lookup(fromQuery)
    if (match) return match
  }

  // 2) Otherwise infer from the referrer path. document.referrer is empty
  //    when the navigation came from a different-origin link or when the
  //    referrer policy strips it, in which case we just stay on 'All'.
  try {
    const ref = document.referrer
    if (ref) {
      const path = new URL(ref).pathname
      const m = path.match(/^\/custom-([a-z-]+)-toronto\/?$/)
      if (m) {
        const target = BESPOKE_SLUG_TO_CATEGORY[m[1]]
        if (target) {
          const match = lookup(target)
          if (match) return match
        }
      }
    }
  } catch {
    /* malformed referrer URL — fall through */
  }

  return 'All'
}

/**
 * Floating pill-shaped filter that drops into view once the primary filter
 * scrolls off the screen, and recedes when it comes back. Tap → upward-
 * expanding panel with the full category list. Matches the brand palette
 * (soft-black surface, white text, glacier-grey eyebrow) and mirrors the
 * mobile dropdown's interaction model.
 */
function FloatingFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('mousedown', onPointer)
    window.addEventListener('touchstart', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onPointer)
      window.removeEventListener('touchstart', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,22rem)]"
    >
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="group w-full flex items-center justify-between gap-3 bg-soft-black text-white px-5 py-3.5 rounded-full shadow-2xl ring-1 ring-charcoal/40 hover:ring-glacier-grey/60 transition-all"
        >
          <span className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              aria-hidden
              className="text-glacier-grey-light"
            >
              <path
                d="M2 3.5h12M4 8h8M6 12.5h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="text-[10px] tracking-[0.25em] text-stone uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Filter
            </span>
            <span className="text-sm uppercase tracking-wider font-semibold">
              {active}
            </span>
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            aria-hidden
            className={`text-stone transition-transform duration-300 ${
              open ? 'rotate-0' : 'rotate-180'
            }`}
          >
            <path
              d="M3 6l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              aria-label="Filter by category"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 bottom-full mb-2 z-50 bg-soft-black text-white rounded-2xl shadow-2xl ring-1 ring-charcoal/40 overflow-hidden max-h-[60vh] overflow-y-auto"
            >
              {categories.map((cat, i) => {
                const isActive = cat === active
                return (
                  <li key={cat} role="option" aria-selected={isActive}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(cat)
                        setOpen(false)
                      }}
                      className={`w-full text-left px-5 py-3 text-sm uppercase tracking-wider font-semibold transition-colors ${
                        isActive
                          ? 'bg-charcoal text-white'
                          : 'text-stone hover:bg-charcoal hover:text-white'
                      } ${
                        i !== categories.length - 1
                          ? 'border-b border-charcoal/40'
                          : ''
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span>{cat}</span>
                        {isActive && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            aria-hidden
                          >
                            <path
                              d="M3 8l3 3 7-7"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function PortfolioGrid({ items, categories: rawCategories }: Props) {
  // Sort to brand-canonical order before we use the list anywhere downstream.
  const categories = sortCategories(rawCategories)

  // Always boot with 'All' so the SSR HTML matches the first client render
  // (hydration safety). On the next tick, swap to the referrer-inferred one
  // so visitors from a bespoke page see their category already selected.
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileRef = useRef<HTMLDivElement | null>(null)

  // Floating filter visibility: true once the primary filter row has scrolled
  // out of the viewport.
  const [floatingShown, setFloatingShown] = useState(false)
  const primaryFilterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const inferred = resolveInitialCategory(categories)
    if (inferred !== 'All') setActiveCategory(inferred)
    // run once on mount — categories list is stable through the page render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle the floating filter when the primary filter leaves/enters the view.
  useEffect(() => {
    const el = primaryFilterRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setFloatingShown(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Close the mobile dropdown when clicking outside it or pressing Escape.
  useEffect(() => {
    if (!mobileOpen) return
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!mobileRef.current?.contains(e.target as Node)) setMobileOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('mousedown', onPointer)
    window.addEventListener('touchstart', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onPointer)
      window.removeEventListener('touchstart', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory)

  return (
    <section className="py-6 lg:py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div
          ref={primaryFilterRef}
          className="mb-6 lg:mb-16 max-w-4xl mx-auto"
        >
          {/* Mobile / tablet: branded dropdown */}
          <div
            ref={mobileRef}
            className="relative lg:hidden max-w-sm mx-auto"
          >
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={mobileOpen}
              className="w-full flex items-center justify-between gap-3 bg-soft-black text-white px-5 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="flex items-center gap-2">
                <span
                  className="text-[10px] tracking-[0.25em] text-stone uppercase"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Filter
                </span>
                <span className="text-sm uppercase tracking-wider font-semibold">
                  {activeCategory}
                </span>
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                aria-hidden
                className={`text-stone transition-transform duration-300 ${
                  mobileOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  d="M3 6l5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.ul
                  role="listbox"
                  aria-label="Filter by category"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 right-0 top-full mt-2 z-30 bg-soft-black text-white rounded-lg shadow-2xl ring-1 ring-charcoal/40 overflow-hidden"
                >
                  {categories.map((cat, i) => {
                    const isActive = cat === activeCategory
                    return (
                      <li key={cat} role="option" aria-selected={isActive}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat)
                            setMobileOpen(false)
                          }}
                          className={`w-full text-left px-5 py-3 text-sm uppercase tracking-wider font-semibold transition-colors ${
                            isActive
                              ? 'bg-charcoal text-white'
                              : 'text-stone hover:bg-charcoal hover:text-white'
                          } ${
                            i !== categories.length - 1
                              ? 'border-b border-charcoal/40'
                              : ''
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span>{cat}</span>
                            {isActive && (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                aria-hidden
                              >
                                <path
                                  d="M3 8l3 3 7-7"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop: original button row, unchanged */}
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

      <AnimatePresence>
        {floatingShown && (
          <FloatingFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
