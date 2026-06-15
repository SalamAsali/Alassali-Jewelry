import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { LOCATIONS, SERVICES, getLocation, getFullAddress } from '@/lib/locations'
import { MapPin, Phone, Clock, Star, ArrowRight, Gem, Shield, Diamond, Award } from 'lucide-react'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return LOCATIONS.map(l => ({ city: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc || loc.slug === 'toronto') return {}
  return {
    title: `Custom Jeweler in ${loc.name} | Al-Assali Custom Jewelry`,
    description: `${loc.name}'s premier custom jeweler. Handcrafted engagement rings, gold chains, grillz & more. 10K, 14K, 18K gold. Book your free consultation.`,
    alternates: { canonical: `https://www.alasalicustomjewelry.ca/${city}` },
  }
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) notFound()

  // Toronto → homepage
  if (loc.slug === 'toronto') redirect('/')

  // Oakville (and future cities) get a landing page
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-soft-black py-20 sm:py-28 overflow-hidden">
        <div className="section-container relative z-10 text-center">
          <h1 className="heading-hero text-white mb-6">
            Custom Jeweler in {loc.name}
          </h1>
          <p className="text-lg sm:text-xl text-stone max-w-2xl mx-auto leading-relaxed mb-10">
            Handcrafted engagement rings, gold chains, diamond pendants, and custom grillz — now serving {loc.name} and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/custom-form"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Book Free Consultation
            </Link>
            <a
              href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {loc.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-6 bg-warm-white border-b border-stone/30">
        <div className="section-container flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-charcoal">
            <MapPin className="w-4 h-4 text-glacier-grey" />
            <span>{getFullAddress(loc)}</span>
          </div>
          <div className="flex items-center gap-2 text-charcoal">
            <Clock className="w-4 h-4 text-glacier-grey" />
            <span>By appointment only</span>
          </div>
          <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-glacier-grey hover:text-deep-charcoal transition-colors font-semibold">
            <Phone className="w-4 h-4" />
            {loc.phone}
          </a>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-12">
            Why Choose Al-Assali in {loc.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Gem, title: 'Certified Materials', desc: '10K, 14K & 18K gold. Natural and lab-grown diamonds, ethically sourced.' },
              { icon: Shield, title: 'Lifetime Guarantee', desc: 'Free polishing, rhodium re-plating, and resizing for life on every piece.' },
              { icon: Diamond, title: 'GIA-Graded Diamonds', desc: 'Conflict-free diamonds graded to GIA standards. Full certification included.' },
              { icon: Award, title: 'Master Craftsmanship', desc: 'Every piece handcrafted in-house by master jeweler Mohammad Al-Asali.' },
            ].map((card) => (
              <div key={card.title} className="rounded-lg border-2 border-soft-black p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-glacier-grey/10 border border-glacier-grey/30 flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-6 h-6 text-glacier-grey" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2">{card.title}</h3>
                <p className="text-sm text-charcoal leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-soft-black">
        <div className="section-container">
          <h2 className="heading-section text-white text-center mb-4">Our Services in {loc.name}</h2>
          <p className="text-center text-stone mb-12 max-w-2xl mx-auto">
            Every piece custom designed and handcrafted to your specifications.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICES.map((svc) => (
              <Link
                key={svc.slug}
                href={`/custom-${svc.formType}-toronto`}
                className="group rounded-lg border border-glacier-grey/20 hover:border-glacier-grey/60 p-5 text-center transition-all duration-300 hover:bg-charcoal/30"
              >
                <h3 className="font-heading text-base font-medium text-white group-hover:text-glacier-grey-light transition-colors mb-1">{svc.name}</h3>
                <span className="inline-flex items-center gap-1 text-glacier-grey text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <h2 className="heading-subsection text-deep-charcoal mb-6">
            Serving {loc.name} &amp; Surrounding Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {loc.neighborhoods.map((n) => (
              <span key={n} className="px-3 py-1.5 rounded-full bg-warm-white border border-stone text-xs text-charcoal">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-soft-black">
        <div className="section-container text-center">
          <h2 className="heading-section text-white mb-4">Start Your Custom Design</h2>
          <p className="text-stone mb-8 max-w-xl mx-auto">
            Free consultation. No obligation. Tell us what you have in mind.
          </p>
          <Link
            href="/custom-form"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'JewelryStore',
            name: `Al-Assali Custom Jewelry — ${loc.name}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: loc.address,
              addressLocality: loc.city,
              addressRegion: loc.province,
              postalCode: loc.postalCode,
              addressCountry: 'CA',
            },
            telephone: loc.phone,
            url: `https://www.alasalicustomjewelry.ca/${city}`,
          }),
        }}
      />
    </div>
  )
}
