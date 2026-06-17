import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { LOCATIONS, SERVICES, getLocation, getFullAddress } from '@/lib/locations'
import { MapPin, Phone, Clock, CalendarClock, ArrowRight, Gem, Shield, Diamond, Award, Video, Hammer } from 'lucide-react'
import DotPattern from '@/components/DotPattern'
import DiamondPattern from '@/components/DiamondPattern'
import FloatingDiamonds from '@/components/FloatingDiamonds'

type Props = { params: Promise<{ city: string }> }

// Studio hours — shared across both meeting locations.
const HOURS = [
  { days: 'Monday – Friday', time: '11:00 AM – 7:00 PM' },
  { days: 'Saturday', time: '11:00 AM – 5:00 PM' },
  { days: 'Sunday', time: 'Closed' },
]

export async function generateStaticParams() {
  return LOCATIONS.map(l => ({ city: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc || loc.slug === 'toronto') return {}
  return {
    title: `Custom Jeweler in ${loc.name}`,
    description: `Serving ${loc.name} by appointment & virtually. Custom engagement rings, gold chains, grillz & more — handcrafted in-house in Toronto. 10K, 14K, 18K gold. Book your free consultation.`,
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
      {/* Hero — signature floating-diamond backdrop */}
      <section className="relative min-h-[80vh] flex items-center bg-soft-black text-white overflow-hidden py-24 sm:py-28">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <FloatingDiamonds />

        <div className="section-container relative z-10 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-stone mb-5">
            By Appointment &amp; Virtual · Crafted in Toronto
          </p>
          <h1 className="mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            <span
              className="block text-6xl md:text-7xl lg:text-8xl font-bold mb-3"
              style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              {loc.name.toUpperCase()}
            </span>
            <span className="block text-3xl md:text-4xl font-light text-white">Custom Jewelry</span>
          </h1>
          <p className="text-base sm:text-lg text-stone max-w-2xl mx-auto leading-relaxed mb-10">
            Engagement rings, wedding bands, gold chains, pendants, and grillz — designed with you in {loc.name}, meeting in person by appointment or fully online, and handcrafted in-house at our Toronto studio.
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
        <div className="section-container flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-2 text-charcoal">
            <MapPin className="w-4 h-4 text-glacier-grey" />
            <span>{getFullAddress(loc)}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-deep-charcoal">
            <CalendarClock className="w-4 h-4 text-glacier-grey" />
            <span>By appointment only</span>
          </div>
          <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-2 bg-glacier-grey text-white px-4 py-2 rounded-lg font-bold hover:bg-glacier-grey-light transition-colors">
            <Phone className="w-4 h-4" />
            {loc.phone}
          </a>
        </div>
      </section>

      {/* How we work — virtual-first + by-appointment meeting space */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-section text-deep-charcoal mb-4">
              How We Work With {loc.name} Clients
            </h2>
            <p className="text-charcoal leading-relaxed">
              Most of our clients design with us virtually — share your ideas, references, and budget from anywhere, and we guide you through every step. Prefer to meet face-to-face? Book our {loc.name} studio for a private, by-appointment consultation. Every piece is then made entirely in-house at our Toronto workshop.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Video, title: 'Design Virtually', desc: `Consult from anywhere in ${loc.name} over video, email, or text — share references and approve designs online.` },
              { icon: CalendarClock, title: 'Meet by Appointment', desc: `Prefer in person? Reserve a private session at our ${loc.name} location. Visits are by appointment only.` },
              { icon: Hammer, title: 'Handcrafted in Toronto', desc: 'Cast, set, and finished entirely in-house at our Toronto studio — no outsourcing, ever.' },
            ].map((step) => (
              <div key={step.title} className="rounded-xl border-2 border-soft-black p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-glacier-grey/10 border border-glacier-grey/30 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-glacier-grey" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2">{step.title}</h3>
                <p className="text-sm text-charcoal leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Hours */}
          <div className="mt-12 max-w-md mx-auto rounded-xl bg-warm-white border border-stone/40 p-6">
            <div className="flex items-center gap-2 justify-center mb-4">
              <Clock className="w-5 h-5 text-glacier-grey" />
              <h3 className="font-heading text-lg font-semibold text-deep-charcoal">Studio Hours</h3>
            </div>
            <div className="space-y-1.5">
              {HOURS.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 text-sm">
                  <span className="text-deep-charcoal font-medium">{h.days}</span>
                  <span className={h.time === 'Closed' ? 'text-glacier-grey italic' : 'text-charcoal'}>{h.time}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-glacier-grey mt-4 text-center italic">By appointment only — please call ahead to book.</p>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-12">
            Why Choose Al-Asali in {loc.name}
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
            name: `Al-Asali Custom Jewelry — ${loc.name}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: loc.address,
              addressLocality: loc.city,
              addressRegion: loc.province,
              postalCode: loc.postalCode,
              addressCountry: 'CA',
            },
            telephone: loc.phone,
            openingHoursSpecification: HOURS.filter(h => h.time !== 'Closed').map(h => ({
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: h.days,
              opens: h.time.split(' – ')[0],
              closes: h.time.split(' – ')[1],
            })),
            url: `https://www.alasalicustomjewelry.ca/${city}`,
          }),
        }}
      />
    </div>
  )
}
