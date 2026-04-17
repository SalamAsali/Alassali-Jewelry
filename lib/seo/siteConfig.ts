// Site-wide constants powering both metadata and JSON-LD schema.
// Keep values in sync with Google Business Profile, Instagram bio, and footer.

export const SITE_CONFIG = {
  legalName: 'Al-Assali Jewelry Studio',
  brandName: 'Al-Assali Jewelry',
  shortName: 'Al-Assali',
  url: 'https://www.alassalijewelry.com',
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

  // NOTE: approximate coordinates for 624 Vaughan Rd, Toronto M6E 2Y3.
  // Replace with the exact lat/lng from Google Business Profile.
  geo: {
    latitude: 43.6855,
    longitude: -79.4447,
  },

  // Appointment-only studio. Hours mirror competitor norms for custom jewellers
  // in Toronto (Linara, Orosergio, Kimberfire all run Tue–Sat 11–7). Confirm and
  // update GBP to match.
  hours: [
    { dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '19:00' },
    { dayOfWeek: 'Saturday', opens: '11:00', closes: '17:00' },
  ],
  closedDays: ['Sunday', 'Monday'],
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
