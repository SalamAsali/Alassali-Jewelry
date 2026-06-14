export interface LocationData {
  slug: string
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  neighborhoods: string[]
  isMain: boolean
}

export const LOCATIONS: LocationData[] = [
  {
    slug: 'toronto',
    name: 'Toronto',
    address: '5070 Oscar Peterson Blvd',
    city: 'Mississauga',
    province: 'ON',
    postalCode: 'L5M 7W3',
    phone: '(647) 562-4640',
    isMain: true,
    neighborhoods: [
      'Downtown Toronto', 'Yorkville', 'Forest Hill', 'North York',
      'Scarborough', 'Etobicoke', 'Rosedale', 'The Annex',
      'Liberty Village', 'King West', 'Queen West', 'Kensington Market',
      'Danforth', 'Leslieville', 'Beaches', 'High Park',
      'Bloor West Village', 'Junction', 'Parkdale', 'Cabbagetown',
      'St. Clair West', 'Midtown', 'Lawrence Park', 'Leaside',
      'Don Mills', 'Willowdale', 'Bayview Village', 'Thornhill',
    ],
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    address: '3158 Sixth Line',
    city: 'Oakville',
    province: 'ON',
    postalCode: 'L6M 4J9',
    phone: '(647) 562-4640',
    isMain: false,
    neighborhoods: [
      'Bronte', 'Downtown Oakville', 'Glen Abbey', 'Clearview',
      'River Oaks', 'Falgarwood', 'Iroquois Ridge', 'College Park',
      'Palermo', 'Joshua Creek', 'West Oak Trails', 'Eastlake',
      'Old Oakville', 'South East Oakville', 'Uptown Core',
      'Burlington', 'Milton', 'Mississauga South',
    ],
  },
]

export const SERVICES = [
  { slug: 'custom-engagement-rings', name: 'Custom Engagement Rings', formType: 'engagement-rings' },
  { slug: 'custom-wedding-bands', name: 'Custom Wedding Bands', formType: 'wedding-bands' },
  { slug: 'custom-rings', name: 'Custom Rings', formType: 'rings' },
  { slug: 'custom-pendants', name: 'Custom Pendants', formType: 'pendants' },
  { slug: 'custom-chains', name: 'Custom Chains', formType: 'chains' },
  { slug: 'custom-earrings', name: 'Custom Earrings', formType: 'earrings' },
  { slug: 'custom-bracelets', name: 'Custom Bracelets', formType: 'bracelets' },
  { slug: 'custom-grillz', name: 'Custom Grillz', formType: 'grillz' },
]

export function getLocation(slug: string): LocationData | undefined {
  return LOCATIONS.find(l => l.slug === slug)
}

export function getService(slug: string) {
  return SERVICES.find(s => s.slug === slug)
}

export function getFullAddress(loc: LocationData): string {
  return `${loc.address}, ${loc.city}, ${loc.province} ${loc.postalCode}`
}
