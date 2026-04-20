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
    metaDescription: 'Bespoke Toronto custom jeweller serving Mississauga by appointment. Custom engagement rings, gold chains, diamond pendants, grillz — handcrafted in-house, no outsourcing.',
    hook: 'Mississauga clients make up one of our largest GTA bases.',
    intro: 'Al-Assali Jewelry Studio is a Toronto-based bespoke custom jeweller that regularly serves clients from across Mississauga — from Port Credit and Clarkson in the south to Meadowvale, Streetsville, and Malton in the north. Every piece is designed and handcrafted in-house in Toronto, then delivered fully insured to your door anywhere in Mississauga.',
    aboutArea: 'Mississauga is the largest city in the GTA outside of Toronto, with distinctive districts including Square One, Port Credit, Streetsville, Erin Mills, Meadowvale, and Malton. The city has a large South Asian, Middle Eastern, and Italian community — and historically strong demand for heritage jewellery, engagement rings, and custom pendants.',
    driveTime: 'Free Zoom, phone, or message consultation — no travel required. In-person meetings in Toronto by appointment if preferred.',
    highlights: [
      'Free virtual consultations via Zoom, phone, or message',
      'Complimentary secure insured delivery anywhere in Mississauga',
      'In-person meetings in Toronto by appointment when preferred',
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
      { q: 'How do consultations work for Mississauga clients?', a: 'Most of the process happens virtually over Zoom, phone, or message — share references, review CAD renderings, and approve stones without leaving home. If you\'d prefer to meet in person, we arrange a private by-appointment meeting in Toronto at a time that works for you.' },
      { q: 'Do you deliver to Mississauga?', a: 'Yes — complimentary secure insured delivery of finished pieces to your door anywhere in Mississauga and across the GTA.' },
      { q: 'Do you serve Muslim and South Asian communities in Mississauga for traditional jewellery?', a: 'Yes — we specialize in Arabic calligraphy pendants, Allah pendants, Ayat al-Kursi pendants, and traditional Middle Eastern heritage jewellery, which are among our most requested pieces from Mississauga clients.' },
    ],
  },
  'vaughan': {
    slug: 'vaughan',
    name: 'Vaughan',
    h1: 'Custom Jeweller Serving Vaughan',
    metaTitle: 'Custom Jeweller Vaughan | Al-Assali Jewelry Studio',
    metaDescription: 'Bespoke Toronto custom jeweller serving Vaughan and Woodbridge by appointment. Custom engagement rings, gold chains, diamond pendants, grillz — handcrafted in-house.',
    hook: 'Woodbridge, Thornhill, and Maple clients choose us for in-house craftsmanship and transparent pricing.',
    intro: 'Al-Assali Jewelry Studio is a Toronto-based bespoke jeweller serving Vaughan clients by appointment. Woodbridge, Thornhill, Maple, Concord, and Kleinburg clients make up a significant part of our custom engagement ring and wedding band bookings, drawn by in-house craftsmanship, transparent pricing, and deep Arabic calligraphy expertise.',
    aboutArea: 'Vaughan sits immediately north of Toronto and includes Woodbridge, Thornhill, Maple, Concord, and Kleinburg. It\'s one of the fastest-growing cities in Canada with strong Italian, Middle Eastern, and Eastern European communities — all with rich jewellery traditions.',
    driveTime: 'Free Zoom, phone, or message consultation — no travel required. In-person meetings in Toronto by appointment if preferred.',
    highlights: [
      'Free virtual consultations via Zoom, phone, or message',
      'Complimentary secure insured delivery anywhere in Vaughan',
      'In-person meetings in Toronto by appointment when preferred',
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
      { q: 'How do consultations work for Vaughan clients?', a: 'Most of the process happens virtually over Zoom, phone, or message. If you\'d prefer to meet in person, we arrange a private by-appointment meeting in Toronto at a time that works for you.' },
      { q: 'Do you deliver to Vaughan?', a: 'Yes — complimentary secure insured delivery anywhere in Vaughan, including Woodbridge, Thornhill, and Maple.' },
    ],
  },
  'markham': {
    slug: 'markham',
    name: 'Markham',
    h1: 'Custom Jeweller Serving Markham',
    metaTitle: 'Custom Jeweller Markham | Al-Assali Jewelry Studio',
    metaDescription: 'Bespoke Toronto custom jeweller serving Markham, Unionville, and Thornhill by appointment. Custom engagement rings, gold chains, diamond pendants, grillz.',
    hook: 'Markham clients bring us some of our most intricate custom design briefs.',
    intro: 'Al-Assali Jewelry Studio is a Toronto-based bespoke jeweller serving Markham clients by appointment. Unionville, Thornhill, Milliken, and Cornell clients come to us for bespoke engagement rings, custom heritage pendants, tennis bracelets, and solid gold chains — always crafted in-house with GIA-graded diamonds.',
    aboutArea: 'Markham is one of the fastest-growing cities in Canada and home to vibrant East Asian, South Asian, and Middle Eastern communities — each with distinct jewellery traditions we work with regularly. Historic Unionville, modern Cornell, and the Markham-Stouffville corridor all fall within our service area.',
    driveTime: 'Free Zoom, phone, or message consultation — no travel required. In-person meetings in Toronto by appointment if preferred.',
    highlights: [
      'Free virtual consultations via Zoom, phone, or message',
      'Complimentary secure insured delivery anywhere in Markham',
      'In-person meetings in Toronto by appointment when preferred',
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
      { q: 'How do consultations work for Markham clients?', a: 'Most of the process happens virtually over Zoom, phone, or message. If you\'d prefer to meet in person, we arrange a private by-appointment meeting in Toronto at a time that works for you.' },
      { q: 'Do you deliver to Markham?', a: 'Yes — complimentary secure insured delivery anywhere in Markham, including Unionville, Thornhill, and Cornell.' },
    ],
  },
}

export const gtaCitySlugs = Object.keys(gtaCities)
