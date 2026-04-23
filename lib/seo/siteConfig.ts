// Site-wide constants powering both metadata and JSON-LD schema.
// Keep values in sync with Google Business Profile, Instagram bio, and footer.

export const SITE_CONFIG = {
  legalName: 'Al-Asali Custom Jewelry',
  brandName: 'Al-Asali Custom Jewelry',
  shortName: 'Al-Asali',
  url: 'https://www.alasalicustomjewelry.ca',
  logoPath: '/images/logo.png',
  defaultOgPath: '/opengraph-image.jpg',
  phone: '+1-647-562-4340',
  phoneDisplay: '(647) 562-4340',
  email: 'contact@alassalijewellerystudio.com',
  founded: '2017',
  founder: 'Mohammad Al-Assali',
  priceRange: '$$$',
  currenciesAccepted: 'CAD',
  paymentAccepted: 'Cash, Credit Card, Debit Card, E-Transfer',

  address: {
    streetAddress: '624 Vaughan Rd',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    postalCode: 'M6E 2Y3',
    addressCountry: 'CA',
  },

  // Exact coordinates from the Al-Assali Jewelry Studio GBP embed.
  geo: {
    latitude: 43.69254459710162,
    longitude: -79.44107981534424,
  },
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.8662181637624!2d-79.44107981534424!3d43.69254459710162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b43ebc5d39ceb%3A0xe7cb39f29dad222f!2sAl-assali%20Jewelry%20Studio!5e0!3m2!1sen!2sca!4v1776446921332!5m2!1sen!2sca',
  // Source of truth for reviews / local-pack schema. Matches the FTID
  // `0x882b43ebc5d39ceb:0xe7cb39f29dad222f` in the embed URL above.
  // To re-verify or swap: paste into https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
  // and confirm the resolved name reads "Al-Assali Jewelry Studio".
  // A runtime identity-check in lib/reviews/googlePlaces.ts will also refuse
  // to render reviews unless the API-returned name contains "al-assali" and
  // the address contains "Vaughan Rd".
  googleMapsPlaceId: 'ChIJ658z3OtDK4gRLyKtnfI5y-c',

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
    reviewCount: 24,
    bestRating: '5',
    worstRating: '1',
  },

  social: {
    instagram: 'https://www.instagram.com/alassalijewelry/',
    tiktok: 'https://www.tiktok.com/@alassalijewelry',
    facebook: 'https://www.facebook.com/alassalijewelry/',
    etsy: 'https://www.etsy.com/ca/shop/AlassaliJewelrStudio',
    linkedin: 'https://www.linkedin.com/in/mohammad-al-assali-710bb31a5/',
    googleBusiness: 'https://share.google/0P2UwwHVcoC3cVXn2',
  },
} as const

export const MASTER_JEWELLER = {
  name: 'Mohammad Al-Assali',
  jobTitle: 'Master Jeweller & Founder',
  slug: 'mohammad-al-assali',
  credentials: [
    'George Brown College — Jewellery Arts Program (Diploma)',
  ],
  practicingSince: '2017',
  bio: 'Mohammad Al-Assali is the founder and master jeweller behind Al-Assali Jewelry Studio in Toronto. A George Brown College Jewellery Arts Program graduate practicing since 2017, Mohammad has designed and handcrafted hundreds of bespoke engagement rings, gold chains, diamond pendants, and custom grillz for clients across the Greater Toronto Area — every piece finished in-house with no outsourcing.',
  knowsAbout: [
    'Bespoke Engagement Ring Design',
    'Diamond Grading (4Cs)',
    'Goldsmithing',
    'CAD Jewellery Design',
    'Custom Gold Chains',
    'Diamond Setting',
    'Custom Grillz Fabrication',
    'Lost-Wax Casting',
    'Arabic Calligraphy Jewellery',
  ],
} as const

export type SiteConfig = typeof SITE_CONFIG
export type MasterJeweller = typeof MASTER_JEWELLER
