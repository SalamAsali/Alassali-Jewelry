'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import type { GoogleReview } from '@/lib/reviews/googlePlaces'

const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    authorName: 'gray',
    rating: 5,
    text: 'Had a perfect experience! Unmatched creativity and execution, definitely the only place to go in toronto for jewelry',
    relativeTime: '',
    timestamp: 0,
  },
  {
    authorName: 'Umair Alahi',
    rating: 5,
    text: 'My experience shopping here was excellent. They answered all my questions, worked out a price that fits my budget, & helped me choose the perfect piece and also kept in touch after the sale to make sure I was satisfied.',
    relativeTime: '',
    timestamp: 0,
  },
  {
    authorName: 'Padrono',
    rating: 5,
    text: "I've been to many shops looking for custom grillz and kept getting really high quotes. At this shop I was taken care of and the price was explained. The final product was worth way more than what I paid. By far the only place I will be going!",
    relativeTime: '',
    timestamp: 0,
  },
]

type Props = {
  reviews?: GoogleReview[]
  rating?: number
  totalReviews?: number
  heading?: string
  variant?: 'dark' | 'light'
}

export default function ReviewsScroller({
  reviews,
  rating,
  totalReviews,
  heading = 'What Our Toronto Clients Say',
  variant = 'dark',
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const displayReviews = reviews && reviews.length > 0 ? reviews : FALLBACK_REVIEWS
  const displayRating = rating ?? 5.0
  const displayTotal = totalReviews ?? SITE_CONFIG.aggregateRating.reviewCount

  const isLight = variant === 'light'

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollByAmount = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const sectionClass = isLight
    ? 'bg-white py-24 relative overflow-hidden'
    : 'py-20 border-t border-glacier-grey/10 relative overflow-hidden'

  const cardClass = isLight
    ? 'bg-white rounded-xl shadow-lg p-6 border border-stone'
    : 'bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6'

  const headingClass = isLight
    ? 'text-3xl md:text-4xl font-bold text-deep-charcoal mb-3'
    : 'text-3xl md:text-4xl font-bold text-white mb-3'

  const bodyText = isLight ? 'text-taupe' : 'text-stone'
  const nameText = isLight ? 'text-deep-charcoal' : 'text-white'
  const relText = 'text-glacier-grey'

  const arrowClass = isLight
    ? 'bg-white border border-stone text-deep-charcoal hover:bg-stone/30'
    : 'bg-charcoal border border-glacier-grey/40 text-white hover:bg-charcoal/80'

  const fadeFrom = isLight ? 'from-white' : 'from-soft-black'

  return (
    <section className={sectionClass}>
      {isLight && (
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          <path d="M 0,250 Q 250,100 500,250 T 1000,250" fill="none" stroke="#8B7D6B" strokeWidth="2" />
        </svg>
      )}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 px-4"
        >
          {isLight && (
            <div className="inline-block mb-6">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <path d="M30 5 L40 25 L60 30 L40 35 L30 55 L20 35 L0 30 L20 25 Z" fill="#8E9196" />
              </svg>
            </div>
          )}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className={`font-semibold text-sm ${nameText}`}>
              {displayRating.toFixed(1)} · {displayTotal} Google reviews
            </span>
          </div>
          <h2 className={headingClass} style={{ fontFamily: 'var(--font-heading)' }}>
            {heading}
          </h2>
        </motion.div>

        <div className="relative">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByAmount(-420)}
              aria-label="Previous reviews"
              className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full shadow-lg items-center justify-center transition-all ${arrowClass}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByAmount(420)}
              aria-label="Next reviews"
              className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full shadow-lg items-center justify-center transition-all ${arrowClass}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {canScrollLeft && (
            <div
              className={`hidden md:block absolute left-0 top-0 bottom-4 w-16 z-10 pointer-events-none bg-gradient-to-r ${fadeFrom} to-transparent`}
            />
          )}
          {canScrollRight && (
            <div
              className={`hidden md:block absolute right-0 top-0 bottom-4 w-16 z-10 pointer-events-none bg-gradient-to-l ${fadeFrom} to-transparent`}
            />
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-4 md:px-6 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayReviews.map((r, i) => (
              <motion.blockquote
                key={`${r.authorName}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: Math.min(i * 0.06, 0.3) }}
                className={`${cardClass} snap-start flex-shrink-0 w-[85vw] sm:w-[360px] md:w-[400px] flex flex-col`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`font-semibold ${nameText}`}>{r.authorName}</span>
                  <img
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    alt="Google"
                    className="h-4"
                  />
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(r.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`${bodyText} text-sm leading-relaxed flex-1 mb-3`}>{r.text}</p>
                {r.relativeTime && (
                  <div className={`${relText} text-xs`}>{r.relativeTime}</div>
                )}
              </motion.blockquote>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href={SITE_CONFIG.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
              isLight ? 'text-glacier-grey hover:text-deep-charcoal' : 'text-glacier-grey hover:text-glacier-grey-light'
            }`}
          >
            Read all {displayTotal} reviews on Google →
          </a>
        </div>
      </div>
    </section>
  )
}
