import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { LOCATIONS, SERVICES, getLocation, getService, getFullAddress } from '@/lib/locations'
import { MapPin, Phone, Star, Shield, Gem, Clock, Award } from 'lucide-react'

type Props = { params: Promise<{ city: string; service: string }> }

export async function generateStaticParams() {
  return LOCATIONS.flatMap((loc) =>
    SERVICES.map((svc) => ({ city: loc.slug, service: svc.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getService(service)
  if (!loc || !svc) return {}
  return {
    title: `${svc.name} in ${loc.name} | Al-Assali Custom Jewelry`,
    description: `${svc.name} handcrafted in ${loc.name}, Ontario. Premium 10K, 14K & 18K gold. Book your free consultation today. Serving ${loc.neighborhoods.slice(0, 5).join(', ')} and more.`,
    alternates: { canonical: `https://www.alasalicustomjewelry.ca/${city}/${service}` },
  }
}

export default async function CityServicePage({ params }: Props) {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getService(service)
  if (!loc || !svc) notFound()

  const otherCity = LOCATIONS.find((l) => l.slug !== city)
  const otherServices = SERVICES.filter((s) => s.slug !== service)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-soft-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-soft-black via-deep-charcoal to-soft-black" />
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-sm text-glacier-grey mb-8">
            <Link href={`/${city}`} className="hover:text-white transition-colors">{loc.name}</Link>
            <span>/</span>
            <span className="text-white">{svc.name}</span>
          </nav>

          <h1 className="heading-hero text-white mb-6 max-w-4xl">
            {svc.name} in {loc.name}
          </h1>
          <p className="text-xl text-stone max-w-2xl mb-10 leading-relaxed">
            Handcrafted by master jewelers at our {loc.name} studio. Every piece is made to your exact specifications using premium materials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href={`/custom/${svc.formType}`}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Start Your Custom {svc.formType === 'grillz' ? 'Grillz' : 'Design'}
            </Link>
            <a
              href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {loc.phone}
            </a>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Gem, text: 'Certified Gold & Diamonds' },
              { icon: Shield, text: 'Handcrafted In-House' },
              { icon: Star, text: '5-Star Google Rating' },
              { icon: Clock, text: 'Free Consultation' },
              { icon: Award, text: '100% Custom Designs' },
            ].map((prop) => (
              <div key={prop.text} className="flex items-center gap-2 text-sm text-stone">
                <prop.icon className="w-4 h-4 text-glacier-grey flex-shrink-0" />
                <span>{prop.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location info bar */}
      <section className="bg-warm-white py-4 border-b border-stone/30">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-charcoal">
            <MapPin className="w-4 h-4 text-glacier-grey" />
            <span>{getFullAddress(loc)}</span>
          </div>
          <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-glacier-grey hover:text-deep-charcoal transition-colors font-semibold">
            <Phone className="w-4 h-4" />
            {loc.phone}
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-4">
            Why Choose Al-Assali for {svc.name} in {loc.name}
          </h2>
          <p className="text-center text-glacier-grey mb-12 max-w-2xl mx-auto">
            Our master jewelers bring decades of experience to every custom piece, right here in {loc.name}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Quality Materials', desc: 'Certified 10K, 14K & 18K gold. Natural and lab-grown diamonds sourced ethically.' },
              { title: 'Master Craftsmanship', desc: 'Every piece handcrafted in our studio by experienced artisans with years of expertise.' },
              { title: 'Transparent Pricing', desc: 'No hidden fees. You see exactly what goes into your piece — gold weight, stones, labour.' },
              { title: 'Satisfaction Guaranteed', desc: 'We work with you through every step until your piece is exactly what you envisioned.' },
            ].map((card) => (
              <div key={card.title} className="rounded-lg border-2 border-soft-black p-6">
                <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2">{card.title}</h3>
                <p className="text-sm text-charcoal leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-soft-black">
        <div className="section-container">
          <h2 className="heading-section text-white text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: `Visit our ${loc.name} studio or start online. Tell us your vision, budget, and timeline.` },
              { step: '02', title: 'Design', desc: 'Our designers create detailed renders and sketches. You approve every detail before crafting begins.' },
              { step: '03', title: 'Crafting', desc: 'Master jewelers handcraft your piece using premium materials. Quality checked at every stage.' },
              { step: '04', title: 'Delivery', desc: `Pick up at our ${loc.name} location or receive insured shipping. Presented in luxury packaging.` },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="text-4xl font-heading font-bold text-glacier-grey block mb-3">{item.step}</span>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-stone leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — link to the actual form */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-warm-white to-off-white">
        <div className="section-container text-center">
          <h2 className="heading-section text-deep-charcoal mb-4">Ready to Start?</h2>
          <p className="text-glacier-grey mb-8 max-w-xl mx-auto">
            Begin designing your {svc.name.toLowerCase().replace('custom ', '')} with our guided custom form. It takes just 2 minutes.
          </p>
          <Link
            href={`/custom/${svc.formType}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Start Your Custom Design →
          </Link>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 sm:py-16 border-t border-stone/30">
        <div className="section-container">
          <h2 className="heading-subsection text-deep-charcoal mb-6">
            {svc.name} — Serving {loc.name} &amp; Surrounding Areas
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

      {/* Other location for this service */}
      {otherCity && (
        <section className="py-8 bg-warm-white border-t border-stone/30">
          <div className="section-container">
            <p className="text-sm text-glacier-grey">
              Also available at our{' '}
              <Link href={`/${otherCity.slug}/${service}`} className="font-semibold text-deep-charcoal hover:text-glacier-grey underline underline-offset-2">
                {otherCity.name} location →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Other services in this city */}
      <section className="py-12 sm:py-16 border-t border-stone/30">
        <div className="section-container">
          <h2 className="heading-subsection text-deep-charcoal mb-6">
            Other Custom Services in {loc.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${city}/${s.slug}`}
                className="rounded-lg border border-stone hover:border-glacier-grey p-4 text-center transition-all duration-200 hover:shadow-sm"
              >
                <span className="text-sm font-medium text-deep-charcoal">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${svc.name} in ${loc.name}`,
              provider: {
                '@type': 'JewelryStore',
                name: 'Al-Assali Custom Jewelry',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: loc.address,
                  addressLocality: loc.city,
                  addressRegion: loc.province,
                  postalCode: loc.postalCode,
                  addressCountry: 'CA',
                },
                telephone: loc.phone,
              },
              areaServed: { '@type': 'City', name: loc.name },
              url: `https://www.alasalicustomjewelry.ca/${city}/${service}`,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: loc.name, item: `https://www.alasalicustomjewelry.ca/${city}` },
                { '@type': 'ListItem', position: 2, name: svc.name },
              ],
            },
          ]),
        }}
      />
    </div>
  )
}
