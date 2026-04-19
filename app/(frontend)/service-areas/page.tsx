import type { Metadata } from 'next'
import NextLink from 'next/link'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import LocationSection from '@/components/bespoke/LocationSection'
import LiveReviewsStrip from '@/components/reviews/LiveReviewsStrip'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'
import { neighbourhoods } from '../toronto/[slug]/neighbourhoods'
import { gtaCities } from '../gta/[slug]/cities'

export const metadata: Metadata = {
  title: 'Service Areas | Al-Assali Jewelry Studio Toronto',
  description: 'Al-Assali Jewelry Studio is a Toronto-based custom jeweller serving Toronto neighbourhoods and the entire Greater Toronto Area — Mississauga, Vaughan, Markham, and more.',
  alternates: { canonical: '/service-areas' },
}

const torontoList = Object.values(neighbourhoods)
const gtaList = Object.values(gtaCities)

export default function ServiceAreasPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Service Areas', url: `${SITE_CONFIG.url}/service-areas` },
  ])

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28 space-y-20">

        <header className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-glacier-grey" />
            <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">Where We Serve</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Service Areas
          </h1>
          <p className="text-lg text-stone leading-relaxed mb-6">
            Al-Assali Jewelry Studio is a Toronto-based custom jeweller on Vaughan Rd. We craft custom engagement rings, wedding bands, gold chains, diamond pendants, and custom grillz for clients across Toronto and the wider Greater Toronto Area — all handcrafted at our Toronto studio.
          </p>
        </header>

        {/* TORONTO NEIGHBOURHOODS */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-6 h-6 text-glacier-grey" />
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Toronto Neighbourhoods
            </h2>
          </div>
          <p className="text-stone mb-8 max-w-3xl">
            Our primary service area is Toronto, with specialized dedicated pages for each major neighbourhood.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {torontoList.map((n) => (
              <NextLink
                key={n.slug}
                href={`/toronto/${n.slug}`}
                className="group bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5 hover:border-glacier-grey/60 hover:bg-charcoal transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold group-hover:text-glacier-grey-light transition-colors">{n.name}</h3>
                  <ArrowRight className="w-4 h-4 text-glacier-grey/60 group-hover:text-glacier-grey group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-stone text-xs leading-relaxed">{n.hook}</p>
              </NextLink>
            ))}
          </div>
        </section>

        {/* GTA CITIES */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-6 h-6 text-glacier-grey" />
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Greater Toronto Area
            </h2>
          </div>
          <p className="text-stone mb-8 max-w-3xl">
            We serve clients from every major GTA city with free virtual consultations and secure insured delivery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gtaList.map((c) => (
              <NextLink
                key={c.slug}
                href={`/gta/${c.slug}`}
                className="group bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5 hover:border-glacier-grey/60 hover:bg-charcoal transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold group-hover:text-glacier-grey-light transition-colors">{c.name}</h3>
                  <ArrowRight className="w-4 h-4 text-glacier-grey/60 group-hover:text-glacier-grey group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-stone text-xs leading-relaxed">{c.hook}</p>
              </NextLink>
            ))}
          </div>
        </section>

        {/* WIDER GTA CHIPS (non-page cities) */}
        <section className="bg-charcoal/40 border border-glacier-grey/20 rounded-2xl p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Also Serving Across the Wider GTA
          </h2>
          <p className="text-stone text-sm mb-6 max-w-2xl mx-auto">
            We regularly work with clients across the wider Greater Toronto Area. Don&apos;t see your city listed? Contact us — we likely serve it.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Oakville', 'Burlington', 'Brampton', 'Milton', 'Richmond Hill', 'Pickering', 'Ajax', 'Whitby', 'Aurora', 'Newmarket', 'Georgetown', 'Woodbridge'].map((city) => (
              <span key={city} className="text-xs text-glacier-grey bg-glacier-grey/10 border border-glacier-grey/20 rounded-full px-3 py-1">
                {city}
              </span>
            ))}
          </div>
        </section>

      </div>

      <LiveReviewsStrip />
      <LocationSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </div>
  )
}
