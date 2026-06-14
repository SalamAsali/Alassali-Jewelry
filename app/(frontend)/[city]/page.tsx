import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LOCATIONS, SERVICES, getLocation, getFullAddress } from '@/lib/locations'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

/* ------------------------------------------------------------------ */
/*  Static params                                                     */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ city: loc.slug }))
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const location = getLocation(city)
  if (!location) return {}

  const title = `Custom Jeweler in ${location.name} | Al-Assali Custom Jewelry`
  const description = `Handcrafted engagement rings, gold chains, diamond pendants & custom grillz in ${location.name}. Master jeweler Mohammad Al-Asali designs every piece by hand. Book your free consultation today.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${city}`,
      siteName: SITE_CONFIG.brandName,
      type: 'website',
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Service icons (inline SVG paths for each service)                 */
/* ------------------------------------------------------------------ */

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'custom-engagement-rings': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2L8 6H4l4 4-4 4h4l4 4 4-4h4l-4-4 4-4h-4L12 2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  'custom-wedding-bands': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <ellipse cx="9" cy="12" rx="5" ry="7" />
      <ellipse cx="15" cy="12" rx="5" ry="7" />
    </svg>
  ),
  'custom-rings': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="12" cy="14" r="7" />
      <path d="M9 7l3-4 3 4" />
    </svg>
  ),
  'custom-pendants': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2v6" />
      <path d="M8 2h8" />
      <circle cx="12" cy="14" r="6" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  ),
  'custom-chains': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <ellipse cx="8" cy="8" rx="4" ry="3" transform="rotate(-45 8 8)" />
      <ellipse cx="16" cy="16" rx="4" ry="3" transform="rotate(-45 16 16)" />
      <path d="M10.5 10.5l3 3" />
    </svg>
  ),
  'custom-earrings': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="12" cy="6" r="2" />
      <path d="M12 8v2" />
      <path d="M8 14a4 4 0 008 0" />
      <circle cx="12" cy="18" r="1" />
    </svg>
  ),
  'custom-bracelets': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <ellipse cx="12" cy="12" rx="9" ry="5" />
      <ellipse cx="12" cy="12" rx="6" ry="3" />
    </svg>
  ),
  'custom-grillz': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M4 12c0-2 2-4 8-4s8 2 8 4" />
      <path d="M4 12c0 2 2 4 8 4s8-2 8-4" />
      <path d="M7 12v0M10 12v0M12 12v0M14 12v0M17 12v0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
}

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'custom-engagement-rings': 'One-of-a-kind engagement rings designed around your stone, style, and story.',
  'custom-wedding-bands': 'Matching or unique wedding bands handcrafted in gold, platinum, or mixed metals.',
  'custom-rings': 'Statement rings, signet rings, and fashion rings made to your exact specifications.',
  'custom-pendants': 'Photo medallions, name pendants, and diamond-set custom pendants in solid gold.',
  'custom-chains': 'Cuban links, rope chains, and every style in 10K-24K gold, built to your length and weight.',
  'custom-earrings': 'Studs, hoops, and drop earrings designed and handcrafted with certified stones.',
  'custom-bracelets': 'Tennis bracelets, bangles, and link bracelets in gold with diamonds or gemstones.',
  'custom-grillz': 'Custom-fitted gold grillz with diamonds, open-face, solid, or iced-out styles.',
}

/* ------------------------------------------------------------------ */
/*  Value props                                                       */
/* ------------------------------------------------------------------ */

function getValueProps(cityName: string) {
  return [
    { icon: '🔨', label: `Handcrafted in ${cityName}` },
    { icon: '✏️', label: '100% Custom Designs' },
    { icon: '💎', label: 'Certified Gold & Diamonds' },
    { icon: '⭐', label: '5-Star Google Rating' },
    { icon: '📞', label: 'Free Consultation' },
  ]
}

/* ------------------------------------------------------------------ */
/*  FAQ data                                                          */
/* ------------------------------------------------------------------ */

function getCityFAQ(cityName: string) {
  return [
    {
      q: `Where is Al-Assali Custom Jewelry located in ${cityName}?`,
      a: `We serve ${cityName} clients from our studio. Every piece is handcrafted by our master jeweler Mohammad Al-Asali. Book a free consultation to visit us or start your design remotely.`,
    },
    {
      q: `How long does a custom jewelry piece take in ${cityName}?`,
      a: `Most custom pieces take 2-4 weeks from design approval to completion. Rush orders may be available — contact us to discuss your timeline.`,
    },
    {
      q: `Do you offer free consultations in ${cityName}?`,
      a: `Yes, every custom project starts with a free, no-obligation consultation. We can meet in person at our studio or connect via phone or video call.`,
    },
    {
      q: `What metals and stones do you work with?`,
      a: `We work with 10K, 14K, 18K, and 24K gold (yellow, white, rose), platinum, and both natural and lab-grown diamonds. We also source moissanite, sapphires, emeralds, and other precious stones.`,
    },
    {
      q: `Can I see examples of your custom work in ${cityName}?`,
      a: `Absolutely. Visit our portfolio page to browse hundreds of pieces we have designed and handcrafted for ${cityName} clients, from engagement rings to custom grillz.`,
    },
  ]
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const location = getLocation(city)
  if (!location) notFound()

  const otherLocations = LOCATIONS.filter((l) => l.slug !== city)
  const valueProps = getValueProps(location.name)
  const faq = getCityFAQ(location.name)
  const fullAddress = getFullAddress(location)

  /* JSON-LD */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: SITE_CONFIG.brandName,
    alternateName: SITE_CONFIG.alternateNames,
    url: `${SITE_CONFIG.url}/${city}`,
    telephone: location.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.province,
      postalCode: location.postalCode,
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    image: SITE_CONFIG.schemaImages.map((img) => `${SITE_CONFIG.url}${img}`),
    priceRange: SITE_CONFIG.priceRange,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE_CONFIG.aggregateRating.ratingValue,
      reviewCount: SITE_CONFIG.aggregateRating.reviewCount,
      bestRating: SITE_CONFIG.aggregateRating.bestRating,
      worstRating: SITE_CONFIG.aggregateRating.worstRating,
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
    },
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.founder,
    },
    foundingDate: SITE_CONFIG.founded,
    openingHoursSpecification: SITE_CONFIG.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(SITE_CONFIG.social),
    hasMap: SITE_CONFIG.googleMapsUrl,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="bg-soft-black text-white py-20 lg:py-28">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-hero text-white mb-6">
              Custom Jeweler in {location.name}
              <span className="block text-glacier-grey-light text-2xl sm:text-3xl lg:text-4xl mt-3 font-light">
                Handcrafted Engagement Rings, Gold Chains &amp; Grillz
              </span>
            </h1>

            <p className="text-lg text-stone max-w-2xl mx-auto mb-10">
              Every piece at Al-Assali is designed from scratch and handcrafted in-house by master
              jeweler Mohammad Al-Asali. No templates, no outsourcing — just your vision brought
              to life in solid gold and certified diamonds.
            </p>

            {/* Value props */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
              {valueProps.map((vp) => (
                <div key={vp.label} className="flex items-center gap-2 text-sm text-glacier-grey-light">
                  <span className="text-base">{vp.icon}</span>
                  <span>{vp.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/custom-form"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Book Your Free Consultation
              </Link>
              <a
                href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center gap-2 border-2 border-glacier-grey text-glacier-grey-light px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-glacier-grey/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                {location.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRUST BADGES                                                 */}
      {/* ============================================================ */}
      <section className="bg-warm-white py-8 border-b border-stone/30">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-charcoal">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold">{SITE_CONFIG.aggregateRating.ratingValue}</span>
              <span className="text-taupe">({SITE_CONFIG.aggregateRating.reviewCount} Google Reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-glacier-grey" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Serving {location.name} Since {SITE_CONFIG.founded}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-glacier-grey" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Certified Gold &amp; Diamonds</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SERVICES GRID                                                */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-section text-deep-charcoal mb-4">
              Custom Jewelry Services in {location.name}
            </h2>
            <p className="text-taupe max-w-2xl mx-auto">
              From engagement rings to custom grillz, every piece is designed and handcrafted
              in-house. Tap a service to learn more about what we offer in {location.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc) => (
              <Link
                key={svc.slug}
                href={`/${city}/${svc.slug}`}
                className="group border-2 border-soft-black rounded-lg p-6 hover:border-glacier-grey hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="text-glacier-grey group-hover:text-deep-charcoal transition-colors mb-4">
                  {SERVICE_ICONS[svc.slug]}
                </div>
                <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2">
                  {svc.name}
                </h3>
                <p className="text-sm text-taupe leading-relaxed">
                  {SERVICE_DESCRIPTIONS[svc.slug]}
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-glacier-grey group-hover:text-deep-charcoal transition-colors">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NEIGHBORHOODS                                                */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-20 bg-warm-white">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-8">
            Serving {location.name} &amp; Surrounding Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {location.neighborhoods.map((hood) => (
              <span
                key={hood}
                className="px-4 py-2 bg-white border border-stone/50 rounded-full text-sm text-charcoal"
              >
                {hood}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* OTHER LOCATIONS                                              */}
      {/* ============================================================ */}
      {otherLocations.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="section-container">
            <h2 className="heading-section text-deep-charcoal text-center mb-8">
              Also Serving
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {otherLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="group border-2 border-soft-black rounded-lg p-8 hover:border-glacier-grey hover:shadow-lg transition-all duration-300 bg-white text-center min-w-[280px]"
                >
                  <h3 className="font-heading text-2xl font-semibold text-deep-charcoal mb-2">
                    {loc.name}
                  </h3>
                  <p className="text-sm text-taupe mb-3">{getFullAddress(loc)}</p>
                  <span className="text-sm font-semibold text-glacier-grey group-hover:text-deep-charcoal transition-colors">
                    View {loc.name} services &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* FAQ                                                          */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faq.map((item, idx) => (
              <details
                key={idx}
                className="group border-2 border-soft-black rounded-lg bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-heading text-lg font-semibold text-deep-charcoal hover:text-glacier-grey transition-colors">
                  {item.q}
                  <svg
                    className="w-5 h-5 text-glacier-grey shrink-0 ml-4 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-taupe leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BOTTOM CTA                                                   */}
      {/* ============================================================ */}
      <section className="bg-soft-black text-white py-16 lg:py-20">
        <div className="section-container text-center">
          <h2 className="heading-section text-white mb-4">
            Ready to Create Something Unique?
          </h2>
          <p className="text-stone max-w-xl mx-auto mb-8">
            Book your free consultation with {location.name}&apos;s master jeweler and
            start designing your one-of-a-kind piece today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom-form"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start Your Custom Design
            </Link>
            <a
              href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center gap-2 border-2 border-glacier-grey text-glacier-grey-light px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-glacier-grey/10 transition-all duration-300"
            >
              Call {location.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
