export type GtaCity = {
  slug: string
  name: string
  h1: string
  metaTitle: string
  metaDescription: string
  hook: string
  intro: string
  aboutArea: string
  driveTime: string
  highlights: string[]
  popularOrders: string[]
  faq: { q: string; a: string }[]
}

export const gtaCities: Record<string, GtaCity> = {
  'mississauga': {
    slug: 'mississauga',
    name: 'Mississauga',
    h1: 'Custom Jeweller Serving Mississauga',
    metaTitle: 'Custom Jeweller Mississauga | Al-Assali Jewelry Studio',
    metaDescription: 'Bespoke custom jeweller serving Mississauga clients from our Toronto studio. Custom engagement rings, gold chains, diamond pendants, grillz — handcrafted, no outsourcing.',
    hook: 'Mississauga clients make up one of our largest GTA bases.',
    intro: 'Al-Assali Jewelry Studio is a bespoke Toronto custom jeweller that regularly serves clients from across Mississauga — from Port Credit and Clarkson in the south to Meadowvale, Streetsville, and Malton in the north. Every piece is designed and handcrafted at our Vaughan Rd studio in Toronto, then delivered securely to our Mississauga clients or picked up by appointment.',
    aboutArea: 'Mississauga is the largest city in the GTA outside of Toronto, with distinctive districts including Square One, Port Credit, Streetsville, Erin Mills, Meadowvale, and Malton. The city has a large South Asian, Middle Eastern, and Italian community — and historically strong demand for heritage jewellery, engagement rings, and custom pendants.',
    driveTime: '25-35 minute drive via the Gardiner Expressway / QEW or the 403',
    highlights: [
      'Free virtual consultations (Zoom) for Mississauga clients',
      'Secure insured delivery anywhere in Mississauga',
      'In-studio appointments at 624 Vaughan Rd, 25-35 min from most of Mississauga',
      'Specialist in Arabic calligraphy pendants, heirloom ring resets, and heritage jewellery',
    ],
    popularOrders: [
      'Custom engagement rings in platinum and 18K',
      'Solid gold Cuban chains',
      'Arabic calligraphy name pendants',
      'Tennis bracelets (lab-grown diamonds)',
      'Matching bridal sets',
    ],
    faq: [
      { q: 'Do you serve all of Mississauga?', a: 'Yes — we work with clients from every part of Mississauga including Square One, Port Credit, Clarkson, Streetsville, Meadowvale, Erin Mills, and Malton.' },
      { q: 'How do I get to your Toronto studio from Mississauga?', a: 'Our studio is at 624 Vaughan Rd, Toronto. From most of Mississauga it\'s a 25-35 minute drive via the Gardiner / QEW east, or Highway 403 east → Highway 401 east.' },
      { q: 'Do you deliver to Mississauga?', a: 'Yes — we offer secure insured delivery of finished pieces anywhere in Mississauga and across the GTA.' },
      { q: 'Do you serve Muslim and South Asian communities in Mississauga for traditional jewellery?', a: 'Yes — we specialize in Arabic calligraphy pendants, Allah pendants, Ayat al-Kursi pendants, and traditional Middle Eastern heritage jewellery, which are among our most requested pieces from Mississauga clients.' },
    ],
  },
  'vaughan': {
    slug: 'vaughan',
    name: 'Vaughan',
    h1: 'Custom Jeweller Serving Vaughan',
    metaTitle: 'Custom Jeweller Vaughan | Al-Assali Jewelry Studio',
    metaDescription: 'Bespoke custom jeweller serving Vaughan and Woodbridge clients from our Toronto studio. Custom engagement rings, gold chains, diamond pendants, grillz.',
    hook: 'Woodbridge, Thornhill, and Maple clients regularly drive down for our in-house craftsmanship.',
    intro: 'Al-Assali Jewelry Studio serves Vaughan clients from our Toronto studio on Vaughan Rd — a natural match given the shared name. Woodbridge, Thornhill, Maple, Concord, and Kleinburg clients make up a significant part of our custom engagement ring and wedding band bookings, drawn by in-house craftsmanship, transparent pricing, and deep Arabic calligraphy expertise.',
    aboutArea: 'Vaughan sits immediately north of Toronto and includes Woodbridge, Thornhill, Maple, Concord, and Kleinburg. It\'s one of the fastest-growing cities in Canada with strong Italian, Middle Eastern, and Eastern European communities — all with rich jewellery traditions.',
    driveTime: '20-30 minute drive south via Highway 400 or Bathurst St',
    highlights: [
      'Free virtual consultations (Zoom) for Vaughan clients',
      'Secure insured delivery anywhere in Vaughan',
      '20-30 minute drive south to our Vaughan Rd studio',
      'Specialist in heritage jewellery, Italian gold finishes, and Arabic calligraphy pendants',
    ],
    popularOrders: [
      'Custom engagement rings with Italian-style settings',
      'Heavyweight 18K gold Cuban chains',
      'Tennis bracelets (natural and lab-grown)',
      'Matching bridal sets with eternity bands',
      'Custom logo pendants for family businesses',
    ],
    faq: [
      { q: 'Do you serve Woodbridge, Thornhill, and Maple?', a: 'Yes — all Vaughan neighbourhoods including Woodbridge, Thornhill, Maple, Concord, and Kleinburg. Our studio is 20-30 minutes south on Bathurst St or Highway 400.' },
      { q: 'Is the studio near the city of Vaughan?', a: 'Our studio is on Vaughan Rd in Toronto (not in the City of Vaughan despite the road name). Most Vaughan clients drive 20-30 minutes south via Bathurst or Highway 400.' },
      { q: 'Do you deliver to Vaughan?', a: 'Yes — secure insured delivery anywhere in Vaughan, including Woodbridge, Thornhill, and Maple.' },
    ],
  },
  'markham': {
    slug: 'markham',
    name: 'Markham',
    h1: 'Custom Jeweller Serving Markham',
    metaTitle: 'Custom Jeweller Markham | Al-Assali Jewelry Studio',
    metaDescription: 'Bespoke custom jeweller serving Markham, Unionville, and Thornhill clients from our Toronto studio. Custom engagement rings, gold chains, diamond pendants, grillz.',
    hook: 'Markham clients bring us some of our most intricate custom design briefs.',
    intro: 'Al-Assali Jewelry Studio serves Markham clients from our Toronto studio on Vaughan Rd. Unionville, Thornhill, Milliken, and Cornell clients come to us for bespoke engagement rings, custom heritage pendants, tennis bracelets, and solid gold chains — always crafted in-house with GIA-graded diamonds.',
    aboutArea: 'Markham is one of the fastest-growing cities in Canada and home to vibrant East Asian, South Asian, and Middle Eastern communities — each with distinct jewellery traditions we work with regularly. Historic Unionville, modern Cornell, and the Markham-Stouffville corridor all fall within our service area.',
    driveTime: '30-40 minute drive west via Highway 407 or Highway 401',
    highlights: [
      'Free virtual consultations (Zoom) for Markham clients',
      'Secure insured delivery anywhere in Markham',
      '30-40 minute drive to our Vaughan Rd studio',
      'Specialist in Arabic calligraphy, East Asian heritage pendants, and custom engagement ring designs',
    ],
    popularOrders: [
      'Custom engagement rings with intricate pavé work',
      'Tennis bracelets in lab-grown diamonds',
      'Custom gold chains for mens jewellery',
      'Arabic and Islamic religious pendants',
      'Custom logo pendants for family businesses',
    ],
    faq: [
      { q: 'Do you serve Unionville and Thornhill?', a: 'Yes — all of Markham including Unionville, Thornhill, Milliken, Cornell, Cachet, and Box Grove.' },
      { q: 'How do I get to your Toronto studio from Markham?', a: 'Our studio is at 624 Vaughan Rd, Toronto. From most of Markham it\'s a 30-40 minute drive via Highway 407 west → Highway 400 south, or Highway 401 west.' },
      { q: 'Do you deliver to Markham?', a: 'Yes — secure insured delivery anywhere in Markham, including Unionville, Thornhill, and Cornell.' },
    ],
  },
}

export const gtaCitySlugs = Object.keys(gtaCities)
