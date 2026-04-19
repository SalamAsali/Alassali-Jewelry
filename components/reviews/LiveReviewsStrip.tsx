// Server component — safe to render inside other server components and server pages.
// Pulls live Google Business Profile reviews via Places API; falls back gracefully
// to the aggregate rating from siteConfig when the API key is unset or the fetch fails.

import { Quote, Star } from 'lucide-react'
import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

type Props = {
  heading?: string
}

export default async function LiveReviewsStrip({ heading = 'What Our Toronto Clients Say' }: Props) {
  const { reviews, rating, totalReviews, source } = await fetchGoogleReviews()

  // If we have live reviews, show them. Otherwise show the condensed rating-only strip
  // that still contributes an aggregateRating signal without placeholder fake quotes.
  const hasLive = source === 'live' && reviews.length > 0

  return (
    <section className="py-20 px-4 border-t border-glacier-grey/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-white font-bold ml-2">
              {rating.toFixed(1)} · {totalReviews} Google reviews
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {heading}
          </h2>
          {!hasLive && (
            <p className="text-stone max-w-xl mx-auto text-sm">
              Verified 5-star reviews on our Google Business Profile — read what GTA clients are saying.
            </p>
          )}
        </div>

        {hasLive && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((r, i) => (
              <blockquote
                key={`${r.authorName}-${i}`}
                className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6 flex flex-col"
              >
                <Quote className="w-6 h-6 text-glacier-grey/60 mb-3" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-stone text-sm leading-relaxed flex-1 mb-4 line-clamp-6">{r.text}</p>
                <footer className="border-t border-glacier-grey/10 pt-3">
                  <div className="text-white font-bold text-sm">{r.authorName}</div>
                  <div className="text-glacier-grey text-xs">{r.relativeTime}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href={SITE_CONFIG.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light text-sm font-medium"
          >
            Read all {totalReviews} reviews on Google →
          </a>
        </div>
      </div>
    </section>
  )
}
