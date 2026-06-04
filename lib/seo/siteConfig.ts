// Site-wide constants powering both metadata and JSON-LD schema.
// Keep values in sync with Google Business Profile, Instagram bio, and footer.

export const SITE_CONFIG = {
  legalName: 'Al-Asali Custom Jewelry',
  brandName: 'Al-Asali Custom Jewelry',
  shortName: 'Al-Asali',
  // Common alternate spellings / names people search for — used in schema alternateName.
  alternateNames: [
    'Al-Asali Jewelry Studio',
    'Al-Assali Jewelry',
    'Alasali Jewelry',
    'Al-Asali Jewellery',
  ],
  url: 'https://www.alasalicustomjewelry.ca',
  logoPath: '/images/logo.png',
  // Engagement ring is the hero product image — used as default OG and schema image.
  defaultOgPath: '/images/portfolio/engagement-oval-halo-ring.jpg',
  phone: '+1-647-562-4340',
  phoneDisplay: '(647) 562-4340',
  email: 'contact@alasalicustomjewelry.ca',
  founded: '2017',
  founder: 'Mohammad Al-Asali',
  priceRange: '$$$',
  currenciesAccepted: 'CAD',
  paymentAccepted: 'Cash, Credit Card, Debit Card, Interac E-Transfer',

  address: {
    streetAddress: '624 Vaughan Rd',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    postalCode: 'M6E 2X3',
    addressCountry: 'CA',
  },

  // Exact coordinates from the Al-Asali Jewelry Studio GBP embed.
  geo: {
    latitude: 43.69254459710162,
    longitude: -79.44107981534424,
  },
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.8662181637624!2d-79.44107981534424!3d43.69254459710162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b43ebc5d39ceb%3A0xe7cb39f29dad222f!2sAl-assali%20Jewelry%20Studio!5e0!3m2!1sen!2sca!4v1776446921332!5m2!1sen!2sca',
  // Source of truth for reviews / local-pack schema. Matches the FTID
  // `0x882b43ebc5d39ceb:0xe7cb39f29dad222f` in the embed URL above.
  // CID decimal: 16702507357223854639 → hasMap URL below.
  googleMapsPlaceId: 'ChIJ658z3OtDK4gRLyKtnfI5y-c',
  // Stable Google Maps CID link — used in schema hasMap field.
  googleMapsUrl: 'https://www.google.com/maps?cid=16702507357223854639',

  // Appointment-only studio.
  hours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '19:00' },
    { dayOfWeek: 'Saturday', opens: '11:00', closes: '17:00' },
  ],
  closedDays: ['Sunday'],
  hoursNote: 'By appointment only',

  // Primary ranking target. Extended GTA cities listed in schema but copy stays Toronto-led.
  primaryCity: 'Toronto',
  extendedServiceAreas: [
    'Mississauga',
    'Etobicoke',
    'North York',
    'Scarborough',
    'Vaughan',
    'Markham',
    'Oakville',
    'Burlington',
    'Brampton',
    'Milton',
    'Richmond Hill',
  ],

  aggregateRating: {
    ratingValue: '5.0',
    // Fallback used when Google Places API is unavailable. Update manually when
    // the live count drifts more than ~5 reviews from this value.
    reviewCount: 42,
    bestRating: '5',
    worstRating: '1',
  },

  // Portfolio images used in the schema image array (schema.org recommends multiple).
  // Keep these in sync with public/images/portfolio/.
  schemaImages: [
    '/images/portfolio/engagement-oval-halo-ring.jpg',
    '/images/portfolio/chains-cuban-link-choker.jpg',
    '/images/portfolio/grillz-gold-fang-set.jpg',
    '/images/portfolio/pendants-photo-medallions.jpg',
    '/images/portfolio/rings-pave-dome-duo.png',
  ],

  social: {
    instagram: 'https://www.instagram.com/alassalijewelry/',
    tiktok: 'https://www.tiktok.com/@alassalijewelry',
    facebook: 'https://www.facebook.com/alassalijewelry/',
    etsy: 'https://www.etsy.com/ca/shop/AlassaliJewelrStudio',
    linkedin: 'https://www.linkedin.com/in/mohammad-al-assali-710bb31a5/',
    googleBusiness: 'https://share.google/0P2UwwHVcoC3cVXn2',
  },
} as const

export const MASTER_JEWELER = {
  name: 'Mohammad Al-Asali',
  jobTitle: 'Master Jeweler & Founder',
  slug: 'mohammad-al-assali',
  credentials: [
    'George Brown College — Jewelry Arts Program (Diploma)',
  ],
  practicingSince: '2017',
  bio: 'Mohammad Al-Asali is the founder and master jeweler behind Al-Asali Jewelry Studio in Toronto. A George Brown College Jewelry Arts Program graduate practicing since 2017, Mohammad has designed and handcrafted hundreds of bespoke engagement rings, gold chains, diamond pendants, and custom grillz for clients across the Greater Toronto Area — every piece finished in-house with no outsourcing.',
  knowsAbout: [
    'Bespoke Engagement Ring Design',
    'Diamond Grading (4Cs)',
    'Goldsmithing',
    'CAD Jewelry Design',
    'Custom Gold Chains',
    'Diamond Setting',
    'Custom Grillz Fabrication',
    'Lost-Wax Casting',
    'Arabic Calligraphy Jewelry',
  ],
} as const

export type SiteConfig = typeof SITE_CONFIG
export type MasterJeweler = typeof MASTER_JEWELER
