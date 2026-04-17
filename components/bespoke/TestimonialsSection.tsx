'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

// TODO: Replace these with real Google reviews. Client currently has
// 24 real 5-star reviews on GBP — pipe those through via CMS or GBP API.
type Testimonial = {
  name: string
  neighbourhood: string
  piece: string
  quote: string
}

const placeholderTestimonials: Record<string, Testimonial[]> = {
  'engagement-rings': [
    { name: 'Sara', neighbourhood: 'Mississauga', piece: 'Oval halo engagement ring', quote: 'Mohammad walked me through every shape and stone option before my partner proposed. The final ring is exactly what I pictured — down to the milgrain detailing.' },
    { name: 'James', neighbourhood: 'North York', piece: 'Three-stone engagement ring', quote: 'Reset my grandmother\'s diamond into a custom three-stone design. Incredible craftsmanship and genuine care for the heirloom meaning.' },
    { name: 'Priya', neighbourhood: 'Etobicoke', piece: 'Emerald cut solitaire', quote: 'Got three quotes across Toronto. Al-Assali came in the most transparent and delivered a stunner. Ring still gets compliments a year later.' },
  ],
  'wedding-bands': [
    { name: 'Hassan', neighbourhood: 'Vaughan', piece: 'Matching Arabic calligraphy bands', quote: 'Mohammad engraved our names in Arabic inside matching platinum bands. The calligraphy is flawless — every stroke correct.' },
    { name: 'Lauren', neighbourhood: 'Oakville', piece: 'Half-eternity diamond band', quote: 'My engagement ring was from a different jeweller but the contour band from Al-Assali fits flush like they were made together.' },
  ],
  'rings': [
    { name: 'David', neighbourhood: 'Toronto', piece: 'Family-crest signet ring', quote: 'Hand-engraved signet with my family crest. The level of detail is museum-grade. Will pass this down.' },
    { name: 'Amira', neighbourhood: 'Brampton', piece: 'Stackable birthstone set', quote: 'Three custom stackable bands for my 30th. Mohammad suggested the stone combination and it turned out better than I could have imagined.' },
  ],
  'pendants': [
    { name: 'Yusuf', neighbourhood: 'Mississauga', piece: 'Ayat al-Kursi pendant', quote: 'The calligraphy is perfect — verified by my uncle who knows Arabic script deeply. Beautifully executed in 18K yellow gold.' },
    { name: 'Natalie', neighbourhood: 'Toronto', piece: 'Photo memorial pendant', quote: 'After losing my dad, I wanted something to hold him close. The photo pendant is stunning and the process was compassionate.' },
    { name: 'Marcus', neighbourhood: 'Scarborough', piece: 'Diamond bubble letter', quote: 'Iced-out bubble letter pendant came out cleaner than any of my other pieces. VS diamonds, flawless setting.' },
  ],
  'chains': [
    { name: 'Darren', neighbourhood: 'Etobicoke', piece: '8mm 14K Cuban link, 22"', quote: 'Heavyweight solid Cuban. You can feel the weight — nothing hollow about it. Best chain I own.' },
    { name: 'Jay', neighbourhood: 'North York', piece: 'Iced-out Cuban chain', quote: 'VS diamonds across every link. Took a bit longer than a plain chain but worth every minute of the wait.' },
  ],
  'earrings': [
    { name: 'Emma', neighbourhood: 'Oakville', piece: '2ctw lab diamond studs', quote: 'Lab-grown gave me double the carat for the same budget. Mohammad walked me through both options honestly.' },
    { name: 'Rania', neighbourhood: 'Vaughan', piece: 'Pavé diamond huggies', quote: 'Everyday huggies that I haven\'t taken off in months. Comfortable, secure, and they catch the light perfectly.' },
  ],
  'bracelets': [
    { name: 'Olivia', neighbourhood: 'Mississauga', piece: '3ctw lab tennis bracelet', quote: 'Safety chain and double-lock clasp — I\'ve worn this daily for 6 months with zero issues. Sparkles from every angle.' },
    { name: 'Amir', neighbourhood: 'Brampton', piece: 'Engraved men\'s ID bracelet', quote: 'Solid 14K ID bracelet engraved with my kids\' names in Arabic. Exactly what I wanted. Mohammad nailed the font.' },
  ],
  'grillz': [
    { name: 'Tyrone', neighbourhood: 'Toronto', piece: 'VVS top 6 grillz', quote: 'Been to other grillz shops — none this clean. The VVS diamonds hit different. Fit is perfect on the first try.' },
    { name: 'Chris', neighbourhood: 'Scarborough', piece: '14K fangs', quote: 'Plain gold fangs, custom mold. Snap on and off like they\'re meant to be there. Real gold, real craftsmanship.' },
    { name: 'Sanaa', neighbourhood: 'North York', piece: 'Matching couples grillz', quote: 'Got matching single-tooth grillz for our anniversary. Mohammad made the experience fun and the pieces are immaculate.' },
  ],
}

export default function TestimonialsSection({ type }: { type: string }) {
  const testimonials = placeholderTestimonials[type] || placeholderTestimonials['engagement-rings']

  return (
    <section className="py-20 px-4 border-t border-glacier-grey/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-white font-bold ml-2">
              {SITE_CONFIG.aggregateRating.ratingValue} · {SITE_CONFIG.aggregateRating.reviewCount} Google reviews
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            What Our Toronto Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6 flex flex-col"
            >
              <Quote className="w-6 h-6 text-glacier-grey/60 mb-3" />
              <p className="text-stone text-sm leading-relaxed flex-1 mb-4">{t.quote}</p>
              <footer className="border-t border-glacier-grey/10 pt-3">
                <div className="text-white font-bold text-sm">{t.name}</div>
                <div className="text-glacier-grey text-xs">{t.neighbourhood} · {t.piece}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={SITE_CONFIG.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light text-sm font-medium"
          >
            Read all {SITE_CONFIG.aggregateRating.reviewCount} reviews on Google →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
