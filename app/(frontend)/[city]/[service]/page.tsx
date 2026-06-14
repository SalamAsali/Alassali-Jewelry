import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LOCATIONS, SERVICES, getLocation, getService, getFullAddress } from '@/lib/locations'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

/* ------------------------------------------------------------------ */
/*  Static params — all city x service combos                         */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return LOCATIONS.flatMap((loc) =>
    SERVICES.map((svc) => ({ city: loc.slug, service: svc.slug })),
  )
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}): Promise<Metadata> {
  const { city, service: serviceSlug } = await params
  const location = getLocation(city)
  const service = getService(serviceSlug)
  if (!location || !service) return {}

  const title = `${service.name} in ${location.name} | Al-Assali Custom Jewelry`
  const description = `${service.name} handcrafted by master jeweler Mohammad Al-Asali in ${location.name}. 100% custom designs in solid gold with certified diamonds. Book your free consultation.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city}/${serviceSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${city}/${serviceSlug}`,
      siteName: SITE_CONFIG.brandName,
      type: 'website',
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Per-service content                                                */
/* ------------------------------------------------------------------ */

interface ServiceContent {
  heroSubtitle: string
  sellingPoints: (cityName: string) => string[]
  whyChoose: { title: string; description: string }[]
  process: { step: string; title: string; description: string }[]
  faq: (cityName: string) => { q: string; a: string }[]
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'custom-engagement-rings': {
    heroSubtitle: 'Handcrafted by Master Jewelers',
    sellingPoints: (city) => [
      `One-of-a-kind designs for ${city} couples`,
      'Natural & lab-grown diamond options',
      'CAD rendering before crafting begins',
      'Certified stones with full documentation',
      'Lifetime resizing & maintenance',
    ],
    whyChoose: [
      { title: 'Quality Materials', description: '10K-24K gold, platinum, and GIA/IGI certified diamonds — every stone is hand-selected for brilliance and fire.' },
      { title: 'Master Craftsmanship', description: 'Mohammad Al-Asali designs and finishes every ring in-house. No outsourcing, no mass production.' },
      { title: 'Transparent Pricing', description: 'You see the exact cost of your stone, metal, and labour upfront. No hidden markups or surprise fees.' },
      { title: 'Satisfaction Guaranteed', description: 'We work with you through unlimited revisions until your ring is exactly what you envisioned.' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Share your vision, budget, and timeline. We guide you through stone and metal options.' },
      { step: '02', title: 'Design', description: 'Receive a detailed CAD rendering of your ring. Request changes until every detail is perfect.' },
      { step: '03', title: 'Crafting', description: 'Your ring is handcrafted in our studio using traditional and modern techniques.' },
      { step: '04', title: 'Delivery', description: 'Inspect your finished ring in person. We include a certificate of authenticity and care guide.' },
    ],
    faq: (city) => [
      { q: `How much does a custom engagement ring cost in ${city}?`, a: 'Custom engagement rings start around $2,000-$3,000 for a simple solitaire in 14K gold with a quality diamond. Final pricing depends on the stone, metal, and complexity of the design. We provide a detailed quote during your free consultation.' },
      { q: `How long does it take to make a custom engagement ring?`, a: 'Most custom engagement rings take 2-4 weeks from design approval. If you are on a tighter timeline, let us know — rush orders may be available.' },
      { q: `Can I bring my own diamond or gemstone?`, a: 'Absolutely. We regularly work with client-supplied stones. Bring it to your consultation and we will assess it for setting suitability and design around it.' },
      { q: `Do you offer lab-grown diamonds in ${city}?`, a: 'Yes. We offer both natural and lab-grown diamonds with full certification. Lab-grown stones offer the same brilliance at a fraction of the cost — we help you decide which is right for your budget and values.' },
    ],
  },

  'custom-wedding-bands': {
    heroSubtitle: 'Handcrafted by Master Jewelers',
    sellingPoints: (city) => [
      `Matching & complementary bands for ${city} couples`,
      'His, hers, and non-binary styles',
      'Engravings & custom textures available',
      'Comfort-fit or flat profiles',
      'Coordinate with your engagement ring design',
    ],
    whyChoose: [
      { title: 'Quality Materials', description: 'Solid gold, platinum, or mixed metals — never plated, never hollow. Built to last a lifetime.' },
      { title: 'Master Craftsmanship', description: 'Hand-finished by Mohammad Al-Asali with meticulous attention to comfort and durability.' },
      { title: 'Transparent Pricing', description: 'Clear pricing based on metal weight, stones, and complexity. No surprises.' },
      { title: 'Satisfaction Guaranteed', description: 'Unlimited design revisions and lifetime resizing included with every wedding band.' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Discuss styles, metals, and whether you want matching or contrasting bands.' },
      { step: '02', title: 'Design', description: 'We create CAD renderings so you can visualize your bands before production.' },
      { step: '03', title: 'Crafting', description: 'Each band is handcrafted and finished to your exact ring size and profile.' },
      { step: '04', title: 'Delivery', description: 'Try on your bands, confirm the fit, and take them home with a care guide.' },
    ],
    faq: (city) => [
      { q: `How much do custom wedding bands cost in ${city}?`, a: 'Plain gold wedding bands start around $500-$800 in 14K gold. Diamond-set or specialty designs range higher. We quote exact pricing during your consultation.' },
      { q: 'Can you match my existing engagement ring?', a: 'Yes. Bring your engagement ring to the consultation and we will design a band that sits flush and complements it perfectly.' },
      { q: 'How far in advance should we order?', a: 'We recommend 4-6 weeks before your wedding date. Rush orders may be accommodated — contact us to discuss your timeline.' },
      { q: `Do you engrave wedding bands in ${city}?`, a: 'Yes. We offer hand engraving and machine engraving for names, dates, coordinates, or personal messages inside or outside the band.' },
    ],
  },

  'custom-rings': {
    heroSubtitle: 'Handcrafted by Master Jewelers',
    sellingPoints: (city) => [
      `Statement rings designed for ${city} clients`,
      'Signet, pinky, and fashion ring styles',
      'Gold, platinum, or mixed metals',
      'Diamond, gemstone, or plain designs',
      'Your initials, symbols, or custom motifs',
    ],
    whyChoose: [
      { title: 'Quality Materials', description: 'Solid gold from 10K to 24K, platinum, and hand-selected stones for every custom ring.' },
      { title: 'Master Craftsmanship', description: 'Each ring is designed and finished by hand in our studio — no outsourcing.' },
      { title: 'Transparent Pricing', description: 'Detailed quote provided before work begins. Pay only for materials and craftsmanship.' },
      { title: 'Satisfaction Guaranteed', description: 'We refine the design until you are completely satisfied before casting begins.' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Share your inspiration, preferred style, and budget for your custom ring.' },
      { step: '02', title: 'Design', description: 'Review CAD renderings and request revisions until every detail is right.' },
      { step: '03', title: 'Crafting', description: 'Your ring is cast, set, and polished by hand in our studio.' },
      { step: '04', title: 'Delivery', description: 'Pick up your ring and receive a certificate of authenticity.' },
    ],
    faq: (city) => [
      { q: `What types of custom rings do you make in ${city}?`, a: 'We make signet rings, pinky rings, statement rings, dome rings, fashion rings, and any other style you can imagine. If you can describe it or sketch it, we can build it.' },
      { q: 'Can I have my own design made?', a: 'Absolutely. Bring a sketch, photo, or reference image and we will translate it into a wearable piece.' },
      { q: `How much does a custom ring cost in ${city}?`, a: 'Custom rings start around $800 for a simple gold band and go up based on weight, stones, and complexity. We provide exact pricing after your consultation.' },
      { q: 'How long does a custom ring take?', a: 'Most custom rings take 2-3 weeks from design approval to completion.' },
    ],
  },

  'custom-pendants': {
    heroSubtitle: 'Handcrafted by Master Jewelers',
    sellingPoints: (city) => [
      `Photo medallions popular with ${city} clients`,
      'Name pendants in Arabic & English calligraphy',
      'Diamond-set and plain gold options',
      'Custom shapes, logos, and symbols',
      'Pairs with our custom chain collection',
    ],
    whyChoose: [
      { title: 'Quality Materials', description: 'Solid gold pendants with certified diamonds — never plated, never hollow core.' },
      { title: 'Master Craftsmanship', description: 'Detailed engraving, setting, and finishing by Mohammad Al-Asali.' },
      { title: 'Transparent Pricing', description: 'Clear cost breakdown of gold weight, stones, and labour before production.' },
      { title: 'Satisfaction Guaranteed', description: 'Review your design in CAD before crafting begins. Unlimited revisions included.' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Share your pendant idea — photo, name, symbol, or freeform design.' },
      { step: '02', title: 'Design', description: 'We render your pendant in CAD with exact dimensions and stone placement.' },
      { step: '03', title: 'Crafting', description: 'Your pendant is cast, set, and hand-finished in solid gold.' },
      { step: '04', title: 'Delivery', description: 'Inspect your pendant, pair it with a chain, and take it home.' },
    ],
    faq: (city) => [
      { q: `What kinds of custom pendants do you make in ${city}?`, a: 'We make photo medallions, name pendants, initial pendants, religious symbols, custom logos, and any design you can imagine — all in solid gold.' },
      { q: 'Can I get a photo engraved on a pendant?', a: 'Yes. Our photo medallion pendants are one of our most popular items. Send us a high-resolution photo and we engrave it directly into the gold.' },
      { q: `How much do custom pendants cost in ${city}?`, a: 'Custom pendants start around $600 for a small solid gold piece. Photo medallions and diamond-set designs range higher. Exact pricing is provided during consultation.' },
      { q: 'Do you sell chains to go with pendants?', a: 'Absolutely. We handcraft custom chains in every style and can design the chain and pendant together for a cohesive look.' },
    ],
  },

  'custom-chains': {
    heroSubtitle: 'Handcrafted by Master Jewelers',
    sellingPoints: (city) => [
      `Cuban, rope, and figaro chains for ${city} clients`,
      '10K, 14K, 18K, and 24K gold options',
      'Custom length, width, and weight',
      'Yellow, white, and rose gold available',
      'Matching clasp and finish styles',
    ],
    whyChoose: [
      { title: 'Quality Materials', description: 'Solid gold chains from 10K to 24K — never hollow, never plated. Each link is built to last.' },
      { title: 'Master Craftsmanship', description: 'Every chain is assembled, soldered, and polished by hand in our studio.' },
      { title: 'Transparent Pricing', description: 'Price is based on gold spot price, weight, and style. You see the full breakdown upfront.' },
      { title: 'Satisfaction Guaranteed', description: 'Preview your chain specs before production. We build exactly what you approve.' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Choose your link style, gold karat, length, and width.' },
      { step: '02', title: 'Design', description: 'We confirm specs and provide an exact price based on current gold rates.' },
      { step: '03', title: 'Crafting', description: 'Your chain is built link by link and finished with your chosen clasp.' },
      { step: '04', title: 'Delivery', description: 'Try on your chain, verify the weight, and take it home.' },
    ],
    faq: (city) => [
      { q: `What chain styles do you offer in ${city}?`, a: 'We make Cuban link, figaro, rope, box, Byzantine, curb, Franco, snake, wheat, and more. If you have a reference photo, we can match or customize it.' },
      { q: 'What gold karats are available for chains?', a: 'We offer 10K, 14K, 18K, and 24K in yellow, white, and rose gold. 14K is the most popular for everyday wear, while 18K and 24K offer a richer colour.' },
      { q: `How much does a custom gold chain cost in ${city}?`, a: 'Chain pricing depends on the gold karat, weight, and style. A 14K Cuban link starts around $1,500-$2,000. We quote exact pricing during your consultation.' },
      { q: 'How long does it take to make a custom chain?', a: 'Most custom chains take 1-3 weeks depending on style and complexity.' },
    ],
  },

  'custom-earrings': {
    heroSubtitle: 'Handcrafted by Master Jewelers',
    sellingPoints: (city) => [
      `Diamond studs and hoops for ${city} clients`,
      'Drop, chandelier, and huggie styles',
      'Natural & lab-grown diamonds',
      'Hypoallergenic gold and platinum posts',
      'Matched pairs with certified stones',
    ],
    whyChoose: [
      { title: 'Quality Materials', description: 'Solid gold settings with certified diamonds — no nickel, no plating, no compromises.' },
      { title: 'Master Craftsmanship', description: 'Each earring is set and finished by hand for a flawless, secure fit.' },
      { title: 'Transparent Pricing', description: 'Full cost breakdown provided before production. Stones priced individually.' },
      { title: 'Satisfaction Guaranteed', description: 'Design approval before crafting. We ensure perfect symmetry on every pair.' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Choose your earring style, metal, and stone preferences.' },
      { step: '02', title: 'Design', description: 'Review CAD renderings with exact stone placement and dimensions.' },
      { step: '03', title: 'Crafting', description: 'Your earrings are cast, set, and polished by hand.' },
      { step: '04', title: 'Delivery', description: 'Inspect your earrings and receive a certificate of authenticity.' },
    ],
    faq: (city) => [
      { q: `What types of custom earrings do you make in ${city}?`, a: 'We make diamond studs, hoops, huggie earrings, drop earrings, chandelier earrings, and any custom design. Every pair is handcrafted in solid gold or platinum.' },
      { q: 'Can I get mismatched earrings?', a: 'Absolutely. We can design complementary or intentionally asymmetric pairs to suit your style.' },
      { q: `How much do custom earrings cost in ${city}?`, a: 'Diamond stud earrings start around $800-$1,200 depending on stone size and quality. Elaborate designs with multiple stones range higher. Exact pricing provided at consultation.' },
      { q: 'Are your earrings hypoallergenic?', a: 'Yes. We use solid gold (nickel-free) and platinum posts, which are hypoallergenic and safe for sensitive ears.' },
    ],
  },

  'custom-bracelets': {
    heroSubtitle: 'Handcrafted by Master Jewelers',
    sellingPoints: (city) => [
      `Tennis bracelets popular with ${city} clients`,
      'Cuban link, bangle, and cuff styles',
      'Diamonds, sapphires, and emeralds',
      'Custom sizing for the perfect fit',
      'Secure box clasps and safety chains',
    ],
    whyChoose: [
      { title: 'Quality Materials', description: 'Solid gold with hand-selected certified stones. Every bracelet is built for daily wear.' },
      { title: 'Master Craftsmanship', description: 'Precision stone setting and hand-polished finishes on every bracelet.' },
      { title: 'Transparent Pricing', description: 'Itemized quote for gold, stones, and labour. No hidden costs.' },
      { title: 'Satisfaction Guaranteed', description: 'Approve the design in CAD before crafting. We refine until it is perfect.' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Discuss bracelet style, wrist size, metal, and stone preferences.' },
      { step: '02', title: 'Design', description: 'Review detailed CAD renderings with clasp and stone layout.' },
      { step: '03', title: 'Crafting', description: 'Your bracelet is assembled, set, and finished by hand.' },
      { step: '04', title: 'Delivery', description: 'Try on your bracelet, check the clasp, and take it home.' },
    ],
    faq: (city) => [
      { q: `What types of custom bracelets do you make in ${city}?`, a: 'We make tennis bracelets, Cuban link bracelets, bangles, cuffs, charm bracelets, and any custom design in solid gold with your choice of stones.' },
      { q: 'How do you size a bracelet?', a: 'We measure your wrist during the consultation and add the appropriate clearance for your preferred fit — snug, comfort, or loose.' },
      { q: `How much does a custom bracelet cost in ${city}?`, a: 'Custom bracelets start around $1,200 for a simple gold bangle. Tennis bracelets with diamonds range from $3,000 upward depending on stone quality and count.' },
      { q: 'How long does a custom bracelet take?', a: 'Most custom bracelets take 2-4 weeks from design approval to delivery.' },
    ],
  },

  'custom-grillz': {
    heroSubtitle: 'Handcrafted by Master Jewelers',
    sellingPoints: (city) => [
      `Custom-fitted grillz for ${city} clients`,
      'Open-face, solid, and iced-out styles',
      '10K-24K gold with diamond options',
      'Dental-grade impression kit included',
      'Comfortable, secure fit guaranteed',
    ],
    whyChoose: [
      { title: 'Quality Materials', description: 'Solid gold from 10K to 24K with optional VS+ diamonds. No plating, no base metals.' },
      { title: 'Master Craftsmanship', description: 'Every grill is cast from your dental impression for a precise, comfortable fit.' },
      { title: 'Transparent Pricing', description: 'Price based on tooth count, gold karat, and diamond options. Full quote upfront.' },
      { title: 'Satisfaction Guaranteed', description: 'We ensure a perfect fit — adjustments included at no extra cost.' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Choose your style, tooth count, gold karat, and diamond layout.' },
      { step: '02', title: 'Impression', description: 'We provide a dental impression kit (in-person or shipped to you).' },
      { step: '03', title: 'Crafting', description: 'Your grillz are cast, set, and polished from your exact dental mold.' },
      { step: '04', title: 'Delivery', description: 'Try on your grillz, check the fit, and walk out shining.' },
    ],
    faq: (city) => [
      { q: `How much do custom grillz cost in ${city}?`, a: 'Custom grillz start around $300-$500 for a single-tooth cap in 10K gold. Full sets with diamonds range higher. We provide exact pricing after your consultation.' },
      { q: 'How do I get a dental impression?', a: 'We provide a dental impression kit that you can do at home or in our studio. The kit comes with simple instructions and takes about 5 minutes.' },
      { q: `Are your grillz safe to wear in ${city}?`, a: 'Yes. Our grillz are made from solid gold, which is biocompatible and safe for oral use. We use no base metals or plating that could cause irritation.' },
      { q: 'How long does it take to make custom grillz?', a: 'Most custom grillz take 1-2 weeks from receiving your dental impression. Rush orders may be available.' },
    ],
  },
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default async function ServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}) {
  const { city, service: serviceSlug } = await params
  const location = getLocation(city)
  const service = getService(serviceSlug)
  if (!location || !service) notFound()

  const content = SERVICE_CONTENT[serviceSlug]
  if (!content) notFound()

  const otherLocations = LOCATIONS.filter((l) => l.slug !== city)
  const otherServices = SERVICES.filter((s) => s.slug !== serviceSlug)
  const sellingPoints = content.sellingPoints(location.name)
  const faq = content.faq(location.name)
  const fullAddress = getFullAddress(location)

  /* JSON-LD: Service + LocalBusiness */
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${service.name} in ${location.name}`,
      description: `${service.name} handcrafted by master jeweler Mohammad Al-Asali in ${location.name}. 100% custom designs in solid gold with certified diamonds.`,
      provider: {
        '@type': 'JewelryStore',
        name: SITE_CONFIG.brandName,
        url: SITE_CONFIG.url,
        telephone: location.phone,
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: SITE_CONFIG.aggregateRating.ratingValue,
          reviewCount: SITE_CONFIG.aggregateRating.reviewCount,
          bestRating: SITE_CONFIG.aggregateRating.bestRating,
          worstRating: SITE_CONFIG.aggregateRating.worstRating,
        },
        hasMap: SITE_CONFIG.googleMapsUrl,
      },
      areaServed: {
        '@type': 'City',
        name: location.name,
      },
      url: `${SITE_CONFIG.url}/${city}/${serviceSlug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ]

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
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-glacier-grey mb-8">
              <Link href={`/${city}`} className="hover:text-glacier-grey-light transition-colors">
                {location.name}
              </Link>
              <span>/</span>
              <span className="text-glacier-grey-light">{service.name}</span>
            </nav>

            <h1 className="heading-hero text-white mb-6">
              {service.name} in {location.name}
              <span className="block text-glacier-grey-light text-2xl sm:text-3xl lg:text-4xl mt-3 font-light">
                {content.heroSubtitle}
              </span>
            </h1>

            {/* Selling points */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
              {sellingPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm text-glacier-grey-light">
                  <svg className="w-4 h-4 text-glacier-grey shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/custom-form"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Your Custom {service.name.replace('Custom ', '')}
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
      {/* WHY CHOOSE US                                                */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-12">
            Why Choose Us for {service.name} in {location.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.whyChoose.map((card) => (
              <div
                key={card.title}
                className="border-2 border-soft-black rounded-lg p-6 bg-white hover:border-glacier-grey hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-heading text-xl font-semibold text-deep-charcoal mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-taupe leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROCESS                                                      */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-4">
            How It Works
          </h2>
          <p className="text-taupe text-center max-w-xl mx-auto mb-12">
            From your first idea to the finished piece in your hands — here is our process
            for {service.name.toLowerCase()} in {location.name}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {content.process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-soft-black text-white flex items-center justify-center font-heading text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-taupe leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GOOGLE REVIEWS PLACEHOLDER                                   */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="heading-section text-deep-charcoal mb-2">
              What Our {location.name} Clients Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-deep-charcoal">
                {SITE_CONFIG.aggregateRating.ratingValue}
              </span>
              <span className="text-taupe">
                ({SITE_CONFIG.aggregateRating.reviewCount} reviews on Google)
              </span>
            </div>
          </div>
          <div className="text-center">
            <a
              href={SITE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-glacier-grey hover:text-deep-charcoal transition-colors"
            >
              Read all reviews on Google &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NEIGHBORHOODS                                                */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-20 bg-warm-white">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-8">
            {service.name} — Serving {location.name} Neighbourhoods
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
      {/* OTHER LOCATIONS FOR THIS SERVICE                             */}
      {/* ============================================================ */}
      {otherLocations.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="section-container">
            <h2 className="heading-section text-deep-charcoal text-center mb-8">
              {service.name} in Other Locations
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {otherLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}/${serviceSlug}`}
                  className="group border-2 border-soft-black rounded-lg p-8 hover:border-glacier-grey hover:shadow-lg transition-all duration-300 bg-white text-center min-w-[280px]"
                >
                  <h3 className="font-heading text-2xl font-semibold text-deep-charcoal mb-2">
                    {service.name} in {loc.name}
                  </h3>
                  <p className="text-sm text-taupe mb-3">{getFullAddress(loc)}</p>
                  <span className="text-sm font-semibold text-glacier-grey group-hover:text-deep-charcoal transition-colors">
                    View details &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* OTHER SERVICES IN THIS CITY                                  */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-12">
            Other Custom Jewelry Services in {location.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/${city}/${svc.slug}`}
                className="group border-2 border-soft-black rounded-lg p-5 hover:border-glacier-grey hover:shadow-lg transition-all duration-300 bg-white text-center"
              >
                <h3 className="font-heading text-lg font-semibold text-deep-charcoal group-hover:text-glacier-grey transition-colors">
                  {svc.name}
                </h3>
                <span className="inline-block mt-2 text-sm text-glacier-grey group-hover:text-deep-charcoal transition-colors">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ                                                          */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-12">
            {service.name} in {location.name} — FAQ
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
            Ready to Start Your {service.name.replace('Custom ', '')}?
          </h2>
          <p className="text-stone max-w-xl mx-auto mb-8">
            Book a free consultation with {location.name}&apos;s master jeweler. Share your
            vision and we will bring it to life in solid gold.
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
