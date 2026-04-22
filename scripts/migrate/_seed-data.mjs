// Seed content — lifted verbatim from the FALLBACK_* constants across:
//   app/(frontend)/portfolio/page.tsx
//   app/(frontend)/faq/page.tsx
//   app/(frontend)/blog/page.tsx
//   app/(frontend)/about/master-jeweller/[slug]/page.tsx

export const PORTFOLIO_PAGE = {
  heading: 'PORTFOLIO',
  intro:
    'A curated selection of custom pieces from our Toronto studio — each one designed, cast, set, and finished in-house.',
}

export const PORTFOLIO_CATEGORIES = [
  { name: 'Rings', slug: 'rings', order: 1 },
  { name: 'Pendants', slug: 'pendants', order: 2 },
  { name: 'Chains', slug: 'chains', order: 3 },
  { name: 'Grillz', slug: 'grillz', order: 4 },
  { name: 'Bracelets', slug: 'bracelets', order: 5 },
  { name: 'Glasses', slug: 'glasses', order: 6 },
  { name: 'Engagement Rings', slug: 'engagement-rings', order: 7 },
]

// categorySlug resolves against PORTFOLIO_CATEGORIES.slug.
// image matches a filename in scripts/migrate/.uploads.json (written by 02).
export const PORTFOLIO_ITEMS = [
  { name: 'Gold Cuban Link Bracelet with Pave Diamond Clasp', categorySlug: 'bracelets', image: 'bracelets-cuban-link-bracelet.jpg', order: 10 },
  { name: 'Sterling Silver Heavy Cuban Link Chain', categorySlug: 'chains', image: 'chains-silver-cuban-link.jpg', order: 20 },
  { name: 'Sterling Silver Miami Cuban Link Choker', categorySlug: 'chains', image: 'chains-cuban-link-choker.jpg', order: 30 },
  { name: 'Oval Diamond Halo Engagement Ring with Pave Band', categorySlug: 'engagement-rings', image: 'engagement-oval-halo-ring.jpg', order: 40 },
  { name: 'Rimless Diamond-Bridge Sunglasses in Gold', categorySlug: 'glasses', image: 'glasses-diamond-bridge.jpg', order: 50 },
  { name: 'Diamond-Accented Rimless Sunglasses Duo', categorySlug: 'glasses', image: 'glasses-rimless-duo.jpg', order: 60 },
  { name: 'Sterling Silver Full Set Grillz', categorySlug: 'grillz', image: 'grillz-silver-full-set.jpg', order: 70 },
  { name: 'White Gold Single-Tooth Open-Face Grill', categorySlug: 'grillz', image: 'grillz-single-open-face.jpg', order: 80 },
  { name: 'Gold Open-Face Fang Grillz Set', categorySlug: 'grillz', image: 'grillz-gold-fang-set.jpg', order: 90 },
  { name: 'Gold Single-Tooth Canine Grill', categorySlug: 'grillz', image: 'grillz-gold-single-canine.jpg', order: 100 },
  { name: 'Gold 6-Piece Bottom Grillz Set', categorySlug: 'grillz', image: 'grillz-gold-bottom-set.png', order: 110 },
  { name: 'Rose Gold Khanda Medallion Pendant', categorySlug: 'pendants', image: 'pendants-khanda-medallion.jpg', order: 120 },
  { name: 'Gold Script "Dima" Custom Name Necklace', categorySlug: 'pendants', image: 'pendants-dima-name-necklace.png', order: 130 },
  { name: 'Gold Iced-Out Photo Medallion Pendants', categorySlug: 'pendants', image: 'pendants-photo-medallions.jpg', order: 140 },
  { name: 'Gold Script "Zayden" Custom Name Necklace', categorySlug: 'pendants', image: 'pendants-zayden-name-necklace.jpg', order: 150 },
  { name: 'Sterling Silver "Demons" Custom Pendant', categorySlug: 'pendants', image: 'pendants-demons-custom.jpg', order: 160 },
  { name: 'Gold Diamond-Pave "G" Initial Pendant', categorySlug: 'pendants', image: 'pendants-g-initial.jpg', order: 170 },
  { name: 'Gold Anchor Chain-Link Band Ring', categorySlug: 'rings', image: 'rings-anchor-chain-band.jpg', order: 180 },
  { name: 'Sterling Silver "SA" Monogram Signet Ring', categorySlug: 'rings', image: 'rings-sa-signet.jpg', order: 190 },
  { name: 'Sterling Silver Crown of Thorns Band', categorySlug: 'rings', image: 'rings-crown-thorns-band.jpg', order: 200 },
  { name: 'Gold Butterfly Wrap Ring', categorySlug: 'rings', image: 'rings-butterfly-wrap.jpg', order: 210 },
  { name: 'Full Pave Diamond Dome Pinky Ring Duo', categorySlug: 'rings', image: 'rings-pave-dome-duo.png', order: 220 },
  { name: 'Iced-Out Gothic "03" Number Ring', categorySlug: 'rings', image: 'rings-03-number.jpg', order: 230 },
]

export const FAQ_PAGE = {
  heading: 'Frequently Asked Questions',
  intro: 'Everything you need to know about our jewelry, services, and policies',
}

export const FAQ_CATEGORIES = [
  { name: 'Payment', order: 1 },
  { name: 'Shipping', order: 2 },
  { name: 'Custom Orders', order: 3 },
  { name: 'Care & Maintenance', order: 4 },
]

export const FAQ_ITEMS = [
  { category: 'Payment', question: 'What form of payments are accepted?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), wire transfers, and cryptocurrencies (Bitcoin, USDC). For custom orders over $10,000, we offer flexible payment plans.', order: 10 },
  { category: 'Payment', question: 'Am I able to split up payments?', answer: 'Yes! For custom orders, we offer flexible payment plans. A deposit is required to begin production, with the balance due before shipping. Contact us to discuss payment arrangements that work for you.', order: 20 },
  { category: 'Payment', question: 'What is the minimum deposit for a custom?', answer: 'The minimum deposit for custom jewelry is $500 CAD. This deposit is applied toward your final price and secures your spot in our production queue. The deposit is non-refundable once production begins.', order: 30 },
  { category: 'Payment', question: 'Are deposits refundable?', answer: 'Deposits are refundable before production begins. Once we start creating your custom piece, the deposit becomes non-refundable as materials have been sourced and labor committed.', order: 40 },
  { category: 'Shipping', question: 'Can I track my shipments?', answer: 'Yes! Once your order ships, you will receive a tracking number via email. All shipments are fully insured and require an adult signature (21+) upon delivery.', order: 50 },
  { category: 'Shipping', question: 'How long does shipping take?', answer: 'Standard shipping within Canada takes 3-5 business days. International shipping varies by destination. Express shipping options are available for an additional fee.', order: 60 },
  { category: 'Shipping', question: 'Is shipping insured?', answer: 'Yes, all shipments are fully insured. We take every precaution to ensure your jewelry arrives safely and securely.', order: 70 },
  { category: 'Custom Orders', question: 'How long does a custom piece take?', answer: 'Custom jewelry typically takes 4-8 weeks from design approval to completion. Complex pieces may take longer. We will provide a detailed timeline during your consultation.', order: 80 },
  { category: 'Custom Orders', question: 'Can I see the design before production?', answer: 'Absolutely! We provide CAD renderings and detailed sketches before production begins. You can request revisions until you are completely satisfied with the design.', order: 90 },
  { category: 'Custom Orders', question: 'What is your return policy for custom pieces?', answer: 'Custom pieces are made to your specifications and are non-returnable. However, we offer complimentary resizing and adjustments within 30 days of delivery.', order: 100 },
  { category: 'Care & Maintenance', question: 'How do I care for my jewelry?', answer: 'We provide detailed care instructions with every purchase. Generally, store jewelry in a soft pouch, avoid harsh chemicals, and clean with a soft cloth. Professional cleaning is recommended annually.', order: 110 },
  { category: 'Care & Maintenance', question: 'Do you offer resizing?', answer: 'Yes! We offer complimentary resizing within 30 days of purchase. After that, resizing is available for a small fee.', order: 120 },
  { category: 'Care & Maintenance', question: 'What is your warranty?', answer: 'All jewelry comes with a lifetime warranty against manufacturing defects. Normal wear and tear is not covered, but we offer repair services at reasonable rates.', order: 130 },
]

export const BLOG_INDEX = {
  heading: 'Jewellery Guides',
  intro:
    'Straight answers on pricing, craftsmanship, and how to shop for custom jewellery in Toronto — from our master jeweller.',
  seo_title: 'Custom Jewellery Guides & Toronto Jeweller Insights | Al-Assali Jewelry',
  seo_description:
    "Expert guides from Toronto's bespoke jeweller: custom engagement ring costs, grillz pricing, lab-grown vs natural diamonds, and more.",
}

export const BLOG_POSTS = [
  {
    slug: 'custom-engagement-ring-cost-toronto-2026',
    title: 'How Much Does a Custom Engagement Ring Cost in Toronto? (2026 Guide)',
    excerpt: 'No generic ranges — real starting prices by style, metal, and diamond origin, from a working Toronto custom jeweller.',
    date: '2026-04-17',
    reading_minutes: 7,
    tag: 'Engagement Rings',
  },
  {
    slug: 'grillz-price-guide-toronto-2026',
    title: 'How Much Do Custom Grillz Cost in Toronto? (2026 Price Guide)',
    excerpt: 'Real 2026 numbers for gold grillz, diamond grillz, and VVS full sets — from a working Toronto grillz studio.',
    date: '2026-04-17',
    reading_minutes: 6,
    tag: 'Grillz',
  },
  {
    slug: 'lab-grown-vs-natural-diamonds-toronto',
    title: "Lab-Grown vs Natural Diamonds in Toronto: A Jeweller's Honest 2026 Guide",
    excerpt: "Both are real diamonds. Here's how to choose — without the sales pitch.",
    date: '2026-04-17',
    reading_minutes: 8,
    tag: 'Diamonds',
  },
  {
    slug: 'arabic-calligraphy-jewellery-toronto',
    title: "Arabic Calligraphy Jewellery in Toronto: A Craftsman's Guide",
    excerpt: 'Arabic calligraphy pendants, rings, and engravings — explained by a Toronto custom jeweller. Fonts, verses, meanings, prices, and what to ask for.',
    date: '2026-04-19',
    reading_minutes: 7,
    tag: 'Heritage',
  },
]

export const MASTER_JEWELLER_BIO_PARAGRAPHS = [
  'Mohammad Al-Assali is the founder and master jeweller behind Al-Assali Jewelry Studio in Toronto. A graduate of the George Brown College Jewellery Arts Program and a working goldsmith since 2017, Mohammad has personally designed and handcrafted hundreds of bespoke engagement rings, wedding bands, diamond pendants, gold chains, tennis bracelets, and custom grillz for clients across the Greater Toronto Area.',
  'What began as a sole-proprietor commission practice at the end of 2020 has grown into a full Toronto bespoke studio — still operating with the same principle Mohammad started with: every piece is designed, cast, set, and finished in-house. No outsourcing, no middlemen, no shortcuts. If Al-Assali Jewelry made it, Mohammad inspected it.',
  'Mohammad has built a reputation for deep expertise in Arabic calligraphy jewellery — a specialty few Toronto jewellers can authentically execute. From Allah pendants and Ayat al-Kursi pendants to custom Arabic name rings and engraved wedding bands, his work has been carried by clients in Toronto, Mississauga, Vaughan, Markham, and beyond.',
]

export const MASTER_JEWELLER = {
  slug: 'mohammad-al-assali',
  name: 'Mohammad Al-Assali',
  title: 'Master Jeweller & Founder',
  tagline: "Toronto's bespoke jeweller behind every piece that leaves Al-Assali Jewelry Studio.",
  bio: MASTER_JEWELLER_BIO_PARAGRAPHS.join('\n\n'),
  seo_title: 'Mohammad Al-Assali — Master Jeweller & Founder | Al-Assali Jewelry Toronto',
  seo_description:
    'Meet Mohammad Al-Assali — master jeweller and founder of Al-Assali Jewelry Studio in Toronto. George Brown College Jewellery Arts graduate, practicing since 2017.',
}

export const FOOTER = {
  tagline: 'Toronto bespoke jeweller. Every piece designed, cast, set, and finished in-house.',
  phone: '',
  email: '',
  location: 'Toronto, ON',
}
