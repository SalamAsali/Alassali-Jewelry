import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NextLink from 'next/link'
import {
  MapPin, ArrowRight, Phone, Mail, Diamond, Hammer, Scroll, Sparkles, Link as LinkIcon, Heart, Gem, Flame,
} from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import LocationSection from '@/components/bespoke/LocationSection'
import LiveReviewsStrip from '@/components/reviews/LiveReviewsStrip'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import { buildBreadcrumbSchema, buildFaqSchema, STORE_REF } from '@/lib/seo/schema'
import { neighbourhoods, neighbourhoodSlugs } from './neighbourhoods'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return neighbourhoodSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const n = neighbourhoods[params.slug]
  if (!n) return {}
  return {
    title: n.metaTitle,
    description: n.metaDescription,
    alternates: { canonical: `/toronto/${n.slug}` },
  }
}

const bespokeGrid = [
  { name: 'Custom Engagement Rings', path: '/custom/engagement-rings', icon: Diamond },
  { name: 'Custom Wedding Bands', path: '/custom/wedding-bands', icon: Heart },
  { name: 'Custom Rings', path: '/custom/rings', icon: Hammer },
  { name: 'Custom Pendants', path: '/custom/pendants', icon: Scroll },
  { name: 'Custom Chains', path: '/custom/chains', icon: LinkIcon },
  { name: 'Custom Earrings', path: '/custom/earrings', icon: Sparkles },
  { name: 'Custom Bracelets', path: '/custom/bracelets', icon: Gem },
  { name: 'Custom Grillz', path: '/custom/grillz', icon: Flame },
]

export default function NeighbourhoodPage({ params }: { params: Params }) {
  const n = neighbourhoods[params.slug]
  if (!n) notFound()

  // Build neighbourhood-specific Place schema linked to our store
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    ...STORE_REF,
    areaServed: {
      '@type': 'Place',
      name: `${n.name}, Toronto`,
      containedInPlace: { '@type': 'City', name: 'Toronto' },
    },
  }

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Toronto', url: `${SITE_CONFIG.url}/toronto/${n.slug}` },
    { name: n.name, url: `${SITE_CONFIG.url}/toronto/${n.slug}` },
  ])

  const faqSchema = buildFaqSchema(n.faq)

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28 space-y-20">

        {/* HERO */}
        <header className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-glacier-grey" />
            <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">{n.name}, Toronto</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            {n.h1}
          </h1>
          <p className="text-lg md:text-xl text-stone leading-relaxed mb-6">{n.hook}</p>
          <NextLink
            href="/custom/general"
            className="inline-flex items-center gap-2 bg-glacier-grey text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-glacier-grey-light transition-all"
          >
            Start Your Custom Project <ArrowRight className="w-4 h-4" />
          </NextLink>
        </header>

        {/* INTRO */}
        <section className="max-w-3xl mx-auto space-y-5 text-stone leading-relaxed">
          <p>{n.intro}</p>
          <p>{n.aboutArea}</p>
        </section>

        {/* WHY LOCAL */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Why {n.name} Clients Choose Al-Assali Jewelry
          </h2>
          <p className="text-stone text-center mb-10 max-w-2xl mx-auto">{n.distanceNote}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {n.whyLocal.map((bullet, i) => (
              <li key={i} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-glacier-grey shrink-0 mt-0.5" />
                <span className="text-stone text-sm leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* BESPOKE GRID */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            What We Craft for {n.name} Clients
          </h2>
          <p className="text-stone text-center mb-10 max-w-xl mx-auto text-sm">
            Every category is fully customizable. Explore any bespoke type to see styles, materials, pricing, and timelines.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bespokeGrid.map(({ name, path, icon: Icon }) => (
              <NextLink
                key={path}
                href={path}
                className="group bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-4 text-center hover:border-glacier-grey/60 hover:bg-charcoal transition-all"
              >
                <Icon className="w-7 h-7 text-glacier-grey/70 group-hover:text-glacier-grey mx-auto mb-2 transition-colors" />
                <span className="text-white font-bold text-xs block">{name}</span>
              </NextLink>
            ))}
          </div>
        </section>

        {/* SERVED-ALSO-FROM (adjacent areas) */}
        {n.servedAlsoFrom && n.servedAlsoFrom.length > 0 && (
          <section className="bg-charcoal/40 border border-glacier-grey/20 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Also Serving Nearby Toronto Neighbourhoods
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {n.servedAlsoFrom.map((area) => (
                <span key={area} className="text-xs text-glacier-grey bg-glacier-grey/10 border border-glacier-grey/20 rounded-full px-3 py-1">
                  {area}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT CTA */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Book a Free Consultation from {n.name}
          </h2>
          <p className="text-stone text-sm mb-6 leading-relaxed">
            Call, email, or submit our custom inquiry form. Free virtual consultations — in-person in Toronto by appointment.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light">
              <Phone className="w-4 h-4" /> {SITE_CONFIG.phoneDisplay}
            </a>
            <span className="text-stone">·</span>
            <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light">
              <Mail className="w-4 h-4" /> {SITE_CONFIG.email}
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {n.faq.map((item, i) => (
              <div key={i} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5">
                <h3 className="text-white font-bold text-sm mb-2">{item.q}</h3>
                <p className="text-stone text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <LiveReviewsStrip />

      {/* Embedded map + full NAP */}
      <LocationSection />

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([placeSchema, breadcrumb, faqSchema]),
        }}
      />
    </div>
  )
}
