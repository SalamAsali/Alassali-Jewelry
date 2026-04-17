import { SITE_CONFIG, MASTER_JEWELLER } from './siteConfig'

const STORE_ID = `${SITE_CONFIG.url}/#jewelrystore`
const ORG_ID = `${SITE_CONFIG.url}/#organization`
const FOUNDER_ID = `${SITE_CONFIG.url}/about/master-jeweller/${MASTER_JEWELLER.slug}#person`

export const STORE_REF = { '@id': STORE_ID }
export const ORG_REF = { '@id': ORG_ID }

const addressNode = {
  '@type': 'PostalAddress',
  streetAddress: SITE_CONFIG.address.streetAddress,
  addressLocality: SITE_CONFIG.address.addressLocality,
  addressRegion: SITE_CONFIG.address.addressRegion,
  postalCode: SITE_CONFIG.address.postalCode,
  addressCountry: SITE_CONFIG.address.addressCountry,
}

const areaServedNodes = [
  { '@type': 'City', name: SITE_CONFIG.primaryCity },
  ...SITE_CONFIG.extendedServiceAreas.map((name) => ({ '@type': 'City' as const, name })),
  { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
]

const sameAs = Object.values(SITE_CONFIG.social).filter(Boolean)

export function buildJewelryStoreSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': STORE_ID,
    name: SITE_CONFIG.legalName,
    alternateName: SITE_CONFIG.brandName,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgPath}`,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logoPath}`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: SITE_CONFIG.priceRange,
    currenciesAccepted: SITE_CONFIG.currenciesAccepted,
    paymentAccepted: SITE_CONFIG.paymentAccepted,
    foundingDate: SITE_CONFIG.founded,
    founder: { '@id': FOUNDER_ID },
    address: addressNode,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: areaServedNodes,
    openingHoursSpecification: [
      ...SITE_CONFIG.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.dayOfWeek,
        opens: h.opens,
        closes: h.closes,
      })),
      ...SITE_CONFIG.closedDays.map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day,
        opens: '00:00',
        closes: '00:00',
      })),
    ],
    sameAs,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE_CONFIG.aggregateRating.ratingValue,
      reviewCount: SITE_CONFIG.aggregateRating.reviewCount,
      bestRating: SITE_CONFIG.aggregateRating.bestRating,
      worstRating: SITE_CONFIG.aggregateRating.worstRating,
    },
    knowsAbout: [
      'Custom Engagement Rings',
      'Custom Wedding Bands',
      'Custom Gold Chains',
      'Custom Diamond Pendants',
      'Custom Grillz',
      'Custom Tennis Bracelets',
      'Bespoke Jewellery Design',
      'Arabic Calligraphy Jewellery',
    ],
  }
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logoPath}`,
    founder: { '@id': FOUNDER_ID },
    foundingDate: SITE_CONFIG.founded,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: 'customer service',
      areaServed: 'CA',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs,
  }
}

export function buildMasterJewellerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: MASTER_JEWELLER.name,
    jobTitle: MASTER_JEWELLER.jobTitle,
    description: MASTER_JEWELLER.bio,
    image: `${SITE_CONFIG.url}/images/master-jeweller.jpg`,
    url: `${SITE_CONFIG.url}/about/master-jeweller/${MASTER_JEWELLER.slug}`,
    worksFor: STORE_REF,
    knowsAbout: [...MASTER_JEWELLER.knowsAbout],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'George Brown College',
      department: 'Jewellery Arts Program',
      url: 'https://www.georgebrown.ca/programs/jewellery-arts-program-g103',
    },
    hasCredential: MASTER_JEWELLER.credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
    sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.instagram].filter(Boolean),
  }
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.brandName,
    publisher: ORG_REF,
    inLanguage: 'en-CA',
  }
}

// ---------------------------------------------------------------------------
// Per-page helpers: Service, BreadcrumbList, FAQPage
// ---------------------------------------------------------------------------

export type ServiceSchemaInput = {
  slug: string
  serviceType: string
  name: string
  description: string
  minPrice: number
  maxPrice?: number
  styles: string[]
}

export function buildServiceSchema(input: ServiceSchemaInput) {
  const url = `${SITE_CONFIG.url}/custom/${input.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    serviceType: input.serviceType,
    name: input.name,
    description: input.description,
    url,
    provider: STORE_REF,
    areaServed: areaServedNodes,
    offers: {
      '@type': 'Offer',
      priceCurrency: SITE_CONFIG.currenciesAccepted,
      price: input.minPrice,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: SITE_CONFIG.currenciesAccepted,
        minPrice: input.minPrice,
        ...(input.maxPrice ? { maxPrice: input.maxPrice } : {}),
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${input.name} Styles`,
      itemListElement: input.styles.map((style) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${style} ${input.serviceType}` },
      })),
    },
  }
}

export type BreadcrumbInput = { name: string; url: string }

export function buildBreadcrumbSchema(items: BreadcrumbInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export type FaqItem = { q: string; a: string }

export function buildFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
