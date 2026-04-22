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
    metaTitle: 'Custom Jeweller Mississauga | Al-Assali Jewelry',
    metaDescription: 'Toronto-based bespoke custom jeweller serving Mississauga by appointment. Custom engagement rings, gold chains, diamond pendants, grillz — handcrafted in-house with virtual consultations and insured delivery.',
    hook: 'Mississauga clients make up one of our largest GTA bases — we work with most of them virtually.',
    intro: 'Al-Assali Jewelry is a Toronto-based bespoke atelier serving clients across Mississauga — from Port Credit and Clarkson in the south to Meadowvale, Streetsville, and Malton in the north. Every piece is designed and handcrafted in-house in Toronto, with consultations run virtually and finished pieces delivered insured to your door.',
    aboutArea: 'Mississauga is the largest city in the GTA outside of Toronto, with distinctive districts including Square One, Port Credit, Streetsville, Erin Mills, Meadowvale, and Malton. The city has large South Asian, Middle Eastern, and Italian communities — and historically strong demand for heritage jewellery, engagement rings, and custom pendants.',
    driveTime: 'Virtual consultations by default · insured delivery across Mississauga · private in-person sessions by appointment',
    highlights: [
      'Free virtual consultations (Zoom or phone) for Mississauga clients',
      'Complimentary insured delivery anywhere in Mississauga',
      'Private in-person sessions available by appointment when preferred',
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
      { q: 'How do Mississauga projects typically run?', a: 'Most projects run virtually end-to-end — free Zoom or phone consultation, sketches and CAD renders shared remotely, and the finished piece delivered insured. Private in-person sessions in Toronto can be booked by appointment when a project calls for one.' },
      { q: 'Do you deliver to Mississauga?', a: 'Yes — complimentary insured delivery of finished pieces anywhere in Mississauga and across the GTA.' },
      { q: 'Do you serve Muslim and South Asian communities in Mississauga for traditional jewellery?', a: 'Yes — we specialize in Arabic calligraphy pendants, Allah pendants, Ayat al-Kursi pendants, and traditional Middle Eastern heritage jewellery, which are among our most requested pieces from Mississauga clients.' },
    ],
  },
  'vaughan': {
    slug: 'vaughan',
    name: 'Vaughan',
    h1: 'Custom Jeweller Serving Vaughan',
    metaTitle: 'Custom Jeweller Vaughan | Al-Assali Jewelry',
    metaDescription: 'Toronto-based bespoke custom jeweller serving Vaughan and Woodbridge by appointment. Custom engagement rings, gold chains, diamond pendants, grillz — handcrafted with virtual consultations and insured delivery.',
    hook: 'Woodbridge, Thornhill, and Maple clients choose us for in-house craftsmanship — most projects run fully virtual.',
    intro: 'Al-Assali Jewelry is a Toronto-based bespoke atelier serving Vaughan clients across Woodbridge, Thornhill, Maple, Concord, and Kleinburg. Custom engagement rings and wedding bands are our most popular Vaughan bookings — drawn by in-house craftsmanship, transparent pricing, and deep Arabic calligraphy expertise.',
    aboutArea: 'Vaughan sits immediately north of Toronto and includes Woodbridge, Thornhill, Maple, Concord, and Kleinburg. It\'s one of the fastest-growing cities in Canada with strong Italian, Middle Eastern, and Eastern European communities — all with rich jewellery traditions.',
    driveTime: 'Virtual consultations by default · insured delivery across Vaughan · private in-person sessions by appointment',
    highlights: [
      'Free virtual consultations (Zoom or phone) for Vaughan clients',
      'Complimentary insured delivery anywhere in Vaughan',
      'Private in-person sessions available by appointment when preferred',
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
      { q: 'Do you serve Woodbridge, Thornhill, and Maple?', a: 'Yes — all Vaughan neighbourhoods including Woodbridge, Thornhill, Maple, Concord, and Kleinburg.' },
      { q: 'How do Vaughan projects typically run?', a: 'Most projects run virtually end-to-end — free Zoom consultation, CAD renders shared remotely, and finished piece delivered insured. Private in-person sessions in Toronto can be booked by appointment when preferred.' },
      { q: 'Do you deliver to Vaughan?', a: 'Yes — complimentary insured delivery anywhere in Vaughan, including Woodbridge, Thornhill, and Maple.' },
    ],
  },
  'markham': {
    slug: 'markham',
    name: 'Markham',
    h1: 'Custom Jeweller Serving Markham',
    metaTitle: 'Custom Jeweller Markham | Al-Assali Jewelry',
    metaDescription: 'Toronto-based bespoke custom jeweller serving Markham, Unionville, and Thornhill by appointment. Custom engagement rings, gold chains, diamond pendants, grillz — handcrafted with virtual consultations and insured delivery.',
    hook: 'Markham clients bring us some of our most intricate custom design briefs — most projects run fully virtual.',
    intro: 'Al-Assali Jewelry is a Toronto-based bespoke atelier serving Markham clients across Unionville, Thornhill, Milliken, and Cornell. Clients come to us for bespoke engagement rings, custom heritage pendants, tennis bracelets, and solid gold chains — always crafted in-house with GIA-graded diamonds, and delivered insured across the GTA.',
    aboutArea: 'Markham is one of the fastest-growing cities in Canada and home to vibrant East Asian, South Asian, and Middle Eastern communities — each with distinct jewellery traditions we work with regularly. Historic Unionville, modern Cornell, and the Markham-Stouffville corridor all fall within our service area.',
    driveTime: 'Virtual consultations by default · insured delivery across Markham · private in-person sessions by appointment',
    highlights: [
      'Free virtual consultations (Zoom or phone) for Markham clients',
      'Complimentary insured delivery anywhere in Markham',
      'Private in-person sessions available by appointment when preferred',
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
      { q: 'How do Markham projects typically run?', a: 'Most projects run virtually end-to-end — free Zoom consultation, CAD renders shared remotely, and finished piece delivered insured. Private in-person sessions in Toronto can be booked by appointment when preferred.' },
      { q: 'Do you deliver to Markham?', a: 'Yes — complimentary insured delivery anywhere in Markham, including Unionville, Thornhill, and Cornell.' },
    ],
  },
}

export const gtaCitySlugs = Object.keys(gtaCities)
