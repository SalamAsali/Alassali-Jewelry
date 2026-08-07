/**
 * Bespoke service page copy.
 *
 * Extracted from the page component so a server component can read it without
 * pulling in the client bundle. `landingContent` is the built-in copy that
 * ships with the code; Sanity overrides it field by field at request time
 * (see getBespokeLanding), falling back here whenever a CMS field is blank.
 */

import type { City } from '@/lib/locations'

export const landingContent: Record<string, {
  heroH1: string
  heroSub: string
  intro: string
  processNote: string
  budgetGuide: string
  stoneNote: string
  faq: { q: string; a: string }[]
  relatedPages: { name: string; path: string }[]
  /** Per-page Diamond & Stone Shapes copy, keyed by shape name. */
  shapeBlurbs?: Record<string, string>
  /**
   * Inline cross-reference rendered between the stone shapes and timeline
   * sections. Plain strings render as text; objects render as links.
   */
  crossLink?: (string | { anchor: string; path: string })[]
  /** Single differentiating claim rendered after "How We Work Together". */
  differentiator?: string
}> = {
  'engagement-rings': {
    heroH1: 'Custom Engagement Rings in Toronto',
    heroSub: 'Design a one-of-a-kind ring as unique as your love story. Handcrafted in-house by Toronto\'s finest.',
    intro: 'At Al-Asali Jewelry, every custom engagement ring begins with your vision. Whether you dream of a classic solitaire, a vintage halo setting, or a bold modern design, our master jeweler brings it to life entirely in-house in Toronto. Choose from ethically sourced natural and lab-grown diamonds, sapphires, rubies, and emeralds, set in platinum, 18K, or 14K gold. This is a piece you\'ll wear for the rest of your life, and we treat it that way from the first sketch to the final polish. Couples across the GTA work with us because nothing gets outsourced: every cut, setting, and polish happens under our roof.',
    processNote: 'Most custom engagement rings take 4-6 weeks from design approval to completion. We start with a personal consultation to understand your vision, create detailed CAD renderings for your approval, then hand-select your stones before our master jewelers begin crafting. Rush orders are available when your timeline demands it.',
    budgetGuide: 'Custom engagement rings start at $1,000 and scale based on your choice of metal, stone type, carat weight, and design complexity. During consultation, we\'ll work within your budget to maximize brilliance, whether that means a stunning lab-grown diamond or a natural stone with exceptional cut quality.',
    stoneNote: 'Choose from natural diamonds, lab-grown diamonds, sapphires, rubies, and emeralds. We source every stone for maximum fire and brilliance, and we\'re happy to walk you through the 4Cs (cut, clarity, colour, carat) during your consultation. Lab-grown diamonds offer the same physical properties at a lower price point.',
    faq: [
      { q: 'How long does it take to make a custom engagement ring in Toronto?', a: 'Most custom engagement rings take 4-6 weeks from design approval to completion. Rush orders can be completed in 2-3 weeks for an additional fee, and we\'ll keep you updated at every stage.' },
      { q: 'How much does a custom engagement ring cost in Toronto?', a: 'Custom engagement rings start at $1,000 and scale with metal choice, diamond origin (lab-grown or natural), carat weight, and design complexity. Solitaires start around $1,800, halo rings around $3,500, and three-stone designs from $4,500. We quote every project up front with no hidden fees.' },
      { q: 'Can I design my own engagement ring?', a: 'Absolutely. Bring us sketches, Pinterest boards, or just a rough idea. Our designers will create detailed 3D CAD renderings for your approval before any crafting begins. You can iterate as many times as you need.' },
      { q: 'Lab-grown vs. natural diamonds: which is better for an engagement ring?', a: 'Both are real diamonds with identical physical, chemical, and optical properties. Natural diamonds hold long-term resale value better, while lab-grown diamonds offer 40-60% more carat for the same budget. We help you weigh both during consultation.' },
      { q: 'Do you provide GIA certification for diamonds?', a: 'Yes, every natural diamond over 0.50ct ships with a GIA grading report. Lab-grown diamonds ship with IGI or GCAL reports. You can also request certification for smaller stones on request.' },
      { q: 'Can I see my engagement ring before it\'s finished?', a: 'Yes. We share 3D CAD renderings within 5-7 business days of your consultation, plus a wax or resin model before we cast in precious metal. You\'ll know exactly what your ring will look like before we begin final crafting.' },
      { q: 'What engagement ring styles do you offer?', a: 'We create Classic, Modern, Vintage, Art Deco, Halo, Solitaire, Three-Stone, and Bridal engagement rings, or any fully custom design you can envision. Unusual settings like toi et moi, cluster, and bezel-set are all within scope.' },
      { q: 'Which diamond shape is best for me?', a: 'Round brilliant is the most popular for its fire, oval and pear look larger per carat, princess and emerald cuts suit modern tastes, and cushion and radiant offer vintage warmth. During consultation we walk through every shape with loose stones, virtually on camera or in-person by appointment, so you can compare before choosing.' },
      { q: 'Can I reset a family diamond into my new engagement ring?', a: 'Yes. Heirloom resets are some of our most meaningful projects. We carefully remove your existing stone and design a new setting around it, preserving the sentiment while modernizing the look.' },
      { q: 'Do you offer flexible payment options for custom engagement rings?', a: 'Yes. For custom orders, a deposit is required to begin production, with the balance due before shipping. Contact us during consultation and we\'ll work out an arrangement that fits your timeline.' },
      { q: 'Do you resize engagement rings for free?', a: 'Yes. Every custom engagement ring we create includes free resizing within the first year, and free resizing for life if you have any significant finger-size change. Free cleanings and inspections for life as well.' },
      { q: 'Where are you based?', a: 'Al-Asali Jewelry Studio is a Toronto-based bespoke jeweler that operates by appointment only, offering free virtual consultations via Zoom, phone, or message, complimentary secure insured delivery across Toronto and the GTA, and optional in-person meetings in Toronto at a time that works for you.' },
    ],
    relatedPages: [
      { name: 'Custom Wedding Bands', path: '/custom-wedding-bands-toronto' },
      { name: 'Custom Rings', path: '/custom-rings-toronto' },
      { name: 'Custom Pendants', path: '/custom-pendants-toronto' },
    ],
    shapeBlurbs: {
      'Round Brilliant': 'The most popular shape for engagement rings by a wide margin. 58 facets deliver maximum fire and sparkle, the classic choice when in doubt.',
      'Princess': 'A square cut with sharp corners and brilliant faceting. A popular pick for couples who want something a little more modern than round.',
      'Oval': 'Elongates the finger and looks larger per carat than a round of the same weight, a great way to maximize visual size on a budget.',
      'Emerald': 'A rectangular step-cut with clean lines. Understated and elegant, with a distinctly vintage Art Deco feel.',
      'Cushion': 'A square or rectangular cut with rounded corners. Warm and vintage, and one of the most requested shapes for halo engagement rings.',
      'Pear': 'A teardrop shape that blends round brilliance with oval elongation. Flattering on the hand, and a bit less common if you want something distinctive.',
      'Marquise': 'A football-shaped cut with pointed ends. Makes the finger look longer and the stone look larger per carat, a favorite for vintage-inspired rings.',
      'Radiant': 'A rectangular cut with cropped corners and brilliant faceting, combining the shape of an emerald cut with the fire of a round.',
      'Asscher': 'A square step-cut with cropped corners. Deeper than emerald, with a hall-of-mirrors effect vintage and Art Deco lovers tend to gravitate toward.',
      'Heart': 'The most romantic shape on this list, best at 1.0ct or larger so the silhouette actually reads clearly.',
      'Trillion': 'A bold triangular cut, often used as side stones in a three-stone engagement ring or as a striking solitaire on its own.',
      'Baguette': 'A slim rectangular step-cut, classic as side stones in three-stone and channel-set engagement rings.',
      'Other': 'Old mine, rose cut, hexagon, kite, shield, or fully custom shapes. Bring us anything and we\'ll source or cut it for your ring.',
    },
    crossLink: [
      'Planning to design a matching wedding band too? See our ',
      { anchor: 'custom wedding bands', path: '/custom-wedding-bands-toronto' },
      ' page.',
    ],
  },
  'rings': {
    heroH1: 'Custom Rings in Toronto',
    heroSub: 'Signet rings, statement rings, wedding bands, and more, designed around your vision and handcrafted in Toronto.',
    intro: 'From bold signet rings to elegant wedding bands and one-of-a-kind statement pieces, Al-Asali Jewelry creates custom rings that are uniquely yours. Every ring is handcrafted in-house in Toronto using gold, platinum, or silver, with optional diamond and gemstone settings. Whether you bring a detailed sketch or just an idea, our master jeweler will bring your ring to life with precision and care.',
    processNote: 'Custom rings typically take 3-5 weeks. We begin with a design consultation, in Toronto or online, create CAD renderings, and hand-select any stones before crafting begins. Whether it\'s a wedding band, a family signet ring, or a bold everyday statement piece, we treat every ring with the same level of detail.',
    budgetGuide: 'Custom rings start at $1,000 for simpler designs in 10K gold or silver, and scale with gold karat, platinum, stone settings, and design intricacy. Signet rings and wedding bands are among our most popular commissions.',
    stoneNote: 'Add diamonds (natural or lab-grown), sapphires, rubies, or emeralds to any custom ring. Stones can be flush-set, prong-set, or channel-set depending on your design and daily wear needs.',
    faq: [
      { q: 'What types of custom rings can you make in Toronto?', a: 'Signet rings, statement rings, wedding bands, stackable rings, cocktail rings, pinky rings, mens rings, promise rings, birthstone rings, everyday essentials, and fully custom designs in any style you can imagine.' },
      { q: 'How much does a custom ring cost in Toronto?', a: 'Custom rings start at $1,000 in 10K gold or silver for simpler designs. Signet rings start around $1,400, statement rings $1,800, and stackable sets from $2,500 for three bands. Final price depends on metal, gold weight, stone count, and engraving.' },
      { q: 'Can I bring my own design for a ring?', a: 'Yes. Bring sketches, reference photos, or describe your idea verbally. Our designers create detailed 3D CAD renderings for your approval before any crafting begins. Revisions are included.' },
      { q: 'How do I determine my ring size?', a: 'We mail you a free ring sizer, or walk you through measuring with string during your virtual consultation. If you\'d prefer, we can measure your ring size in person by appointment in Toronto. Every custom ring also includes free resizing.' },
      { q: 'Can you make a custom signet ring with a family crest?', a: 'Family-crest signet rings are one of our favourite commissions. Send us your crest, coat of arms, monogram, or initial design and we\'ll hand-engrave it into your ring.' },
      { q: 'Can I get a matching men\'s and women\'s ring set?', a: 'Matching couples rings and promise rings are a regular request. We design them in proportional sizes and complementary finishes (often different widths in matching metal).' },
      { q: 'What metals are available for custom rings?', a: '10K gold, 14K gold, 18K gold in yellow, white, and rose, plus platinum and sterling silver. We\'ll recommend the right choice based on your daily wear, finger size, and budget.' },
      { q: 'Do you engrave custom rings?', a: 'Yes. We engrave inside or outside the band in any font, including Arabic calligraphy, dates, names, coordinates, fingerprints, and soundwaves. Engraving is free with most custom rings.' },
      { q: 'Can you set diamonds or gemstones in a custom ring?', a: 'We can set natural or lab-grown diamonds, sapphires, rubies, emeralds, birthstones, or any gemstone you source, in prong, bezel, channel, pavé, flush, or tension settings.' },
      { q: 'How long does a custom ring take in Toronto?', a: 'Simpler rings take 3-4 weeks. Signet rings with engraving take 4-5 weeks. Diamond-set rings and complex designs take 5-6 weeks. Rush orders can be completed in 2-3 weeks for an additional fee.' },
    ],
    relatedPages: [
      { name: 'Custom Engagement Rings', path: '/custom-engagement-rings-toronto' },
      { name: 'Custom Wedding Bands', path: '/custom-wedding-bands-toronto' },
      { name: 'Custom Chains', path: '/custom-chains-toronto' },
    ],
    shapeBlurbs: {
      'Round Brilliant': 'The most versatile shape for any custom ring, equally at home in a subtle everyday piece or a bold statement design.',
      'Princess': 'A modern square cut with sharp corners and brilliant facets, a strong choice for a geometric statement ring.',
      'Oval': 'Elongates the finger and looks larger per carat than a round, a popular pick for a statement centerpiece.',
      'Emerald': 'A rectangular step-cut with clean lines. Understated and elegant, well suited to a signet or vintage-style ring.',
      'Cushion': 'A square or rectangular cut with rounded corners. Warm and vintage, a natural fit for a statement or cocktail ring.',
      'Pear': 'A teardrop shape that blends round brilliance with oval elongation, distinctive enough to anchor a statement piece.',
      'Marquise': 'A football-shaped cut with pointed ends, making the finger look longer, a striking choice for an everyday or stackable ring.',
      'Radiant': 'A rectangular cut with cropped corners and brilliant faceting, combining the shape of an emerald with the fire of a round.',
      'Asscher': 'A square step-cut with cropped corners. Deeper than emerald, with a hall-of-mirrors effect suited to a bold statement ring.',
      'Heart': 'The most sentimental shape on this list, often set into a signet or promise-style ring rather than a full pavé design.',
      'Trillion': 'A bold triangular cut, often used as an accent stone in a stackable or statement ring design.',
      'Baguette': 'A slim rectangular step-cut, a classic choice for a channel-set stackable band or an accent alongside a larger stone.',
      'Other': 'Old mine, rose cut, hexagon, kite, shield, or fully custom shapes. Bring us anything and we\'ll source or cut it for your ring.',
    },
    crossLink: [
      'Looking for an engagement ring or a wedding band specifically? Visit our ',
      { anchor: 'custom engagement rings', path: '/custom-engagement-rings-toronto' },
      ' or ',
      { anchor: 'custom wedding bands', path: '/custom-wedding-bands-toronto' },
      ' pages for style and price specific guidance.',
    ],
  },
  'pendants': {
    heroH1: 'Custom Pendants in Toronto',
    heroSub: 'Name pendants, photo pendants, diamond initials, and more, handcrafted in-house in Toronto.',
    intro: 'Al-Asali Jewelry creates custom pendants that carry meaning. From diamond-encrusted name pendants and photo pendants to religious symbols and fully custom designs, every piece is handcrafted in-house in Toronto. Choose your metal, stones, and design. We\'ll build the piece around exactly what you pick. Our custom name chains and bubble letter pendants are among the most requested pieces in the GTA.',
    processNote: 'Custom pendants take 2-4 weeks depending on complexity. Name and initial pendants are on the faster end, while photo pendants and diamond-set pieces require additional crafting time. We create a detailed mockup for your approval before beginning work, whether your consultation happens in Toronto or online.',
    budgetGuide: 'Custom pendants start at $1,000. Simple name pendants in 10K gold are the most accessible, while diamond-set photo pendants and large statement pieces sit at the higher end. We\'ll help you find the right balance of size, metal, and stone work for your budget.',
    stoneNote: 'Pendants can be set with diamonds (natural or lab-grown), sapphires, rubies, or emeralds. Popular options include diamond-encrusted initials, pave-set name pendants, and bezel-set center stones.',
    faq: [
      { q: 'What types of custom pendants do you make in Toronto?', a: 'Name pendants, initial pendants, photo pendants, bubble letter pendants, script pendants, Old English pendants, religious symbols (Allah, Ayat al-Kursi, Bismillah, Cross, Hamsa, Om, Star of David), zodiac pendants, memorial pendants, company logos, and fully custom designs.' },
      { q: 'Can you make a photo pendant?', a: 'Yes. We create custom photo pendants where your image is laser-engraved onto gold or set behind a crystal dome. You can also add a diamond halo or pavé border for extra detail.' },
      { q: 'How much does a custom gold pendant cost in Toronto?', a: 'Custom gold pendants start around $1,000 in 10K gold, $1,500 in 14K gold, and $2,000 in 18K gold. Diamond-set pendants start from $2,500, with photo pendants from $1,800. Size, stone count, and gold weight drive final price.' },
      { q: 'Do you make Arabic calligraphy pendants in Toronto?', a: 'Arabic calligraphy pendants are one of our signature offerings. We craft Arabic name pendants in any font (Thuluth, Naskh, Diwani, modern script), Allah pendants, Ayat al-Kursi, Bismillah, Mashallah, and fully custom Arabic calligraphy in gold, platinum, or silver.' },
      { q: 'Can you make a bubble letter pendant?', a: 'Bubble letter pendants are actually one of our most popular styles. Available in 10K, 14K, or 18K gold, with or without diamond pavé, in any size and name or word you want.' },
      { q: 'What chain comes with a custom pendant?', a: 'Chains are priced separately so you can choose the perfect pairing. We can craft a matching custom chain (cuban, rope, franco, box) in the same metal, or help you choose a stock chain from our collection.' },
      { q: 'Can I add diamonds to my pendant?', a: 'We can set natural or lab-grown diamonds, as well as sapphires, rubies, emeralds, and birthstones. Popular options include diamond-encrusted initials, pavé-set name pendants, and bezel-set centre stones.' },
      { q: 'Can you make a memorial pendant?', a: 'Yes. We craft memorial pendants that incorporate fingerprints, handwriting, silhouette portraits, or small keepsakes. Cremation-ash pendants can also be arranged with advance notice.' },
      { q: 'How long does a custom pendant take in Toronto?', a: 'Simple name or initial pendants take 2-3 weeks. Diamond-set pendants and photo pendants take 3-4 weeks. Complex multi-stone pieces can take 4-6 weeks. Rush orders are available on request.' },
      { q: 'Can you make a custom logo or company pendant?', a: 'We frequently produce custom logo pendants for brands, companies, and sports teams. Send us a logo file and we\'ll translate it into a 3D CAD model for your approval before crafting.' },
      { q: 'How do I receive my custom pendant?', a: 'We deliver finished pieces fully insured to your door anywhere in Toronto and the GTA at no extra cost, and ship securely anywhere in Canada. In-person handover by appointment in Toronto is also available.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom-chains-toronto' },
      { name: 'Custom Rings', path: '/custom-rings-toronto' },
      { name: 'Custom Earrings', path: '/custom-earrings-toronto' },
    ],
    shapeBlurbs: {
      'Round Brilliant': 'Delivers maximum sparkle in a pendant setting, where the stone catches light from every angle as it moves.',
      'Princess': 'A modern square cut with sharp corners and brilliant facets, a clean look for a diamond-set initial or geometric pendant.',
      'Oval': 'Elongated and eye-catching, a flattering shape for a pendant that hangs vertically at the center of a chain.',
      'Emerald': 'A rectangular step-cut with clean lines. Understated and elegant, well suited to a vintage-style pendant.',
      'Cushion': 'A square or rectangular cut with rounded corners. Warm and vintage, a popular choice for a halo pendant setting.',
      'Pear': 'A teardrop shape that naturally points downward, one of the most classic silhouettes for a solitaire pendant.',
      'Marquise': 'A football-shaped cut with pointed ends, elegant on its own or as an accent alongside a center stone.',
      'Radiant': 'A rectangular cut with cropped corners and brilliant faceting, combining the shape of an emerald with the fire of a round.',
      'Asscher': 'A square step-cut with cropped corners and a hall-of-mirrors depth, a striking choice for a statement pendant.',
      'Heart': 'The most sentimental shape on this list, a natural fit for a pendant given as a gift.',
      'Trillion': 'A bold triangular cut, often used as an accent stone alongside a name or initial pendant.',
      'Baguette': 'A slim rectangular step-cut, typically set alongside a larger center stone rather than used on its own.',
      'Other': 'Old mine, rose cut, hexagon, kite, shield, or fully custom shapes. Bring us anything and we\'ll source or cut it for your pendant.',
    },
    crossLink: [
      'Pairing your pendant with a chain? See our ',
      { anchor: 'custom chains', path: '/custom-chains-toronto' },
      ' page for link styles, widths, and lengths.',
    ],
  },
  'chains': {
    heroH1: 'Custom Chains in Toronto',
    heroSub: 'Cuban links, rope chains, franco chains, and more, built to your exact specifications in gold, silver, or platinum.',
    intro: 'Al-Asali Jewelry is Toronto\'s destination for custom chains. Whether you want a heavyweight Miami Cuban link, a classic rope chain, or a sleek franco, every chain is handcrafted in-house in Toronto to your exact length, width, and weight specifications. Choose from 10K, 14K, or 18K gold in yellow, white, or rose, as well as platinum and sterling silver. Every chain we make is solid gold, with no hollow links, full stop, which is the biggest difference between a chain that lasts and one that doesn\'t. Our custom gold chains and name chains are among the most sought-after pieces in the GTA, and every one is built solid, with no hollow links.',
    processNote: 'Custom chains in Toronto take 2-4 weeks depending on complexity and weight. Cuban links and heavier chains require more crafting time. We weigh and measure each chain to your exact specifications before finishing.',
    budgetGuide: 'Custom chain pricing depends primarily on gold weight. A lighter 10K gold box chain starts around $1,000, while a heavy 18K Cuban link can reach $10,000+. We quote based on current gold prices, karat, and your desired dimensions.',
    stoneNote: 'Chains can incorporate diamond-set clasps, diamond-cut links, or integrated diamond settings. We can also create matching chain-and-pendant combinations.',
    faq: [
      { q: 'What types of custom chains do you offer in Toronto?', a: 'Miami Cuban link, rope, franco, figaro, box, wheat, anchor, curb, herringbone, paperclip, byzantine, and fully custom link designs. Any style, any weight, any length.' },
      { q: 'How much does a custom Cuban link chain cost in Toronto?', a: 'A 22" 10K gold Cuban link starts around $2,500 at 5mm width and scales with width, length, and karat. A 22" 14K Cuban at 8mm typically runs $6,000-$8,000. Solid 18K heavyweight chains at 10mm+ can reach $12,000+. We quote by exact gram weight.' },
      { q: 'Solid gold vs hollow gold chains — what\'s the difference?', a: 'Hollow chains are lightweight and cheaper but dent, kink, and snap under everyday wear. We only make solid gold chains as they hold their shape, last a lifetime, and hold resale value. We\'ll walk you through the weight trade-offs during consultation.' },
      { q: 'How many grams is a 5mm Cuban chain?', a: 'A 22" 5mm solid Cuban chain is roughly 40-50 grams in 10K gold, 45-55 grams in 14K, and 50-60 grams in 18K. Exact weight varies slightly by link style. We weigh and measure to your spec before finishing.' },
      { q: 'What gold karats are available for chains?', a: '10K, 14K, and 18K gold in yellow, white, and rose, plus platinum and sterling silver. 14K is our most popular as it has a great balance of colour, durability, and price for everyday wear.' },
      { q: 'Can I customize the length and width of my chain?', a: 'Every chain is made to your exact length, width, and gram weight specifications. Common lengths: 18", 20", 22", 24", 26", 28", 30". Widths from 2mm to 15mm+ depending on chain style.' },
      { q: 'Do you make chains with name plates or pendants integrated?', a: 'We can integrate custom name plates, ID bars, pendants, and diamond-set sections into any chain design. Matching chain-and-pendant sets are a signature offering.' },
      { q: 'Can you add diamonds to a chain clasp or links?', a: 'Yes, diamond-set clasps, diamond-cut facets, and fully diamond-embedded links (iced-out chains) are all available. Natural or lab-grown, any clarity tier.' },
      { q: 'How long does a custom chain take in Toronto?', a: 'Most chains take 2-4 weeks. Lightweight chains 2-3 weeks, heavyweight Cuban or franco chains 3-4 weeks, fully iced-out chains 5-6 weeks due to setting work. Rush production is available.' },
      { q: 'Do you repair or re-solder broken chains?', a: 'Yes, we repair, re-solder, and re-plate chains (even if they weren\'t made here). We also shorten and extend existing chains to your preferred length.' },
    ],
    crossLink: [
      'Building a matching chain-and-pendant set? See our ',
      { anchor: 'custom pendants', path: '/custom-pendants-toronto' },
      ' page for name plates, initials, and calligraphy work.',
    ],
    relatedPages: [
      { name: 'Custom Pendants', path: '/custom-pendants-toronto' },
      { name: 'Custom Bracelets', path: '/custom-bracelets-toronto' },
      { name: 'Custom Grillz', path: '/custom-grillz-toronto' },
    ],
  },
  'earrings': {
    heroH1: 'Custom Earrings in Toronto',
    heroSub: 'Diamond studs, gold hoops, drop earrings, and more — handcrafted to your design in our Toronto studio.',
    intro: 'From elegant diamond studs to bold statement hoops, Al-Asali Jewelry designs and crafts custom earrings entirely in-house in Toronto. Choose your style, metal, and stone preferences, whether you\'re after a subtle everyday pair or a show-stopping set for a special occasion, and we\'ll craft them to perfection. We also create matching earring-and-pendant sets for a cohesive look.',
    processNote: 'Custom earrings in Toronto take 2-4 weeks. Stud earrings are quicker to produce, while complex chandelier designs with multiple stone settings require more time. We create a detailed design for your approval before crafting.',
    budgetGuide: 'Custom earrings start at $1,000. Diamond stud earrings are priced based on stone size and quality, while gold hoops depend on weight and karat. We\'ll find the best combination for your budget.',
    stoneNote: 'Earrings can feature diamonds (natural or lab-grown), sapphires, rubies, and emeralds. Popular choices include diamond stud earrings, pave-set hoops, and drop earrings with colored gemstones.',
    faq: [
      { q: 'What types of custom earrings can you make in Toronto?', a: 'We offer diamond studs, gold hoops, huggies, drop earrings, chandelier earrings, ear climbers, ear cuffs, threader earrings, cluster earrings, and fully custom designs. All custom earrings are handcrafted in our Toronto studio.' },
      { q: 'How much do custom diamond stud earrings cost in Toronto?', a: '0.5ctw lab-grown studs start around $1,000 in 14K gold. 1ctw studs $1,500-$2,500 (lab) or $3,500-$5,000 (natural). 2ctw studs $3,000-$6,000 (lab) or $8,000-$15,000 (natural). Premium VVS clarity adds 15-25% to each tier.' },
      { q: 'Lab-grown vs natural diamond studs — which should I choose?', a: 'Lab-grown studs deliver the same brilliance and hardness for roughly 50% less which is ideal if you want bigger visible size. Natural diamonds hold long-term resale value and carry heirloom sentiment. Both are real diamonds and we can show you loose stones of each to compare.' },
      { q: 'How much do custom gold hoops cost?', a: 'Plain 10K gold hoops start around $800, 14K from $1,100, 18K from $1,500. Diamond-set pavé hoops start from $2,500. Final price scales with diameter, width, and gold weight.' },
      { q: 'Can I design matching earrings, pendant, and ring?', a: 'Yes. Matching sets are a signature offering. Design your earrings alongside a pendant, ring, or bracelet for a cohesive collection. We offer set discounts when ordered together.' },
      { q: 'Do you make huggies and small everyday earrings?', a: 'Huggies, small hoops, and everyday studs are some of our most popular pieces. We make them in 10K, 14K, or 18K gold with optional diamond pavé.' },
      { q: 'What metals are available for earrings?', a: '10K, 14K, and 18K gold in yellow, white, and rose, plus platinum and sterling silver. Platinum is the most durable and hypoallergenic which is ideal if you have sensitive ears.' },
      { q: 'What\'s the difference between push-back and screw-back studs?', a: 'Push-back (friction-back) is the standard and easiest to wear daily, while screw-back offers more security for high-value diamonds you never want to lose. We offer both and will recommend based on stone size and how you\'ll wear them.' },
      { q: 'How long do custom earrings take in Toronto?', a: 'Diamond studs take 2-3 weeks, plain gold hoops 2-3 weeks, pavé hoops 3-4 weeks, chandelier and complex multi-stone designs 4-5 weeks. Rush production available.' },
      { q: 'Can I get earrings re-plated or diamonds tightened?', a: 'Yes. We provide free rhodium re-plating and free diamond tightening for life on every pair we create. We also service earrings from other jewelers at competitive rates.' },
    ],
    relatedPages: [
      { name: 'Custom Pendants', path: '/custom-pendants-toronto' },
      { name: 'Custom Rings', path: '/custom-rings-toronto' },
      { name: 'Custom Bracelets', path: '/custom-bracelets-toronto' },
    ],
    shapeBlurbs: {
      'Round Brilliant': 'The classic choice for diamond studs, delivering the most sparkle possible in a small setting.',
      'Princess': 'A modern square cut with sharp corners and brilliant facets, a clean look for a geometric stud.',
      'Oval': 'Elongated and eye-catching, a flattering shape for a drop earring that moves with you.',
      'Emerald': 'A rectangular step-cut with clean lines. Understated and elegant, well suited to a vintage-style drop.',
      'Cushion': 'A square or rectangular cut with rounded corners. Warm and vintage, a popular choice for a halo stud.',
      'Pear': 'A teardrop shape that naturally points downward, one of the most classic silhouettes for a drop earring.',
      'Marquise': 'A football-shaped cut with pointed ends, elegant as a stud or dramatic as a dangling drop.',
      'Radiant': 'A rectangular cut with cropped corners and brilliant faceting, combining the shape of an emerald with the fire of a round.',
      'Asscher': 'A square step-cut with cropped corners and a hall-of-mirrors depth, a striking choice for a statement stud.',
      'Heart': 'A sentimental shape best suited to a stud or small drop, where the outline still reads clearly at a smaller size.',
      'Trillion': 'A bold triangular cut, often used as an accent stone in a cluster or chandelier design.',
      'Baguette': 'A slim rectangular step-cut, typically set alongside round stones in a chandelier or hoop design.',
      'Other': 'Old mine, rose cut, hexagon, kite, shield, or fully custom shapes. Bring us anything and we\'ll source or cut it for your earrings.',
    },
    crossLink: [
      'Want a matching earring-and-pendant set? See our ',
      { anchor: 'custom pendants', path: '/custom-pendants-toronto' },
      ' page to design both together.',
    ],
  },
  'bracelets': {
    heroH1: 'Custom Bracelets in Toronto',
    heroSub: 'Tennis bracelets, bangles, cuffs, and engraved pieces for men and women — designed and crafted in Toronto.',
    intro: 'Al-Asali Jewelry creates custom bracelets for every style and occasion. From diamond tennis bracelets and elegant bangles to bold cuffs and engraved pieces for men, every bracelet is handcrafted in-house in Toronto. Whether you want a personalized name bracelet, a custom charm bracelet, or a men\'s engraved bracelet in solid gold, we\'ll build it to fit your wrist and your vision exactly.',
    processNote: 'Custom bracelets in Toronto take 3-5 weeks. Tennis bracelets with many individual stone settings require more time, while bangles and cuffs are quicker. We measure your wrist for a precise fit during consultation.',
    budgetGuide: 'Custom bracelets start at $1,000. Tennis bracelets are priced based on stone count and quality, while bangles and cuffs depend on metal weight. Engraved bracelets for men are among our most popular commissions.',
    stoneNote: 'Bracelets can feature diamonds, sapphires, and other gemstones. Tennis bracelets with round brilliant diamonds are our most popular stone-set bracelet style. We also offer diamond-accented cuffs and charm bracelets.',
    faq: [
      { q: 'What types of custom bracelets do you make in Toronto?', a: 'Tennis bracelets, chain bracelets (Cuban, rope, franco, figaro), bangles, cuffs, charm bracelets, ID bracelets, engraved mens bracelets, byzantine bracelets, and fully custom designs for men and women.' },
      { q: 'How much does a custom tennis bracelet cost in Toronto?', a: 'Lab-grown diamond tennis bracelets: 2ctw from $2,500, 3ctw from $3,800, 5ctw from $6,500, 7ctw from $9,500, 10ctw from $14,000. Natural diamond tennis bracelets typically cost 2.5-3x the lab-grown equivalent. All prices in 14K gold.' },
      { q: 'Can I get an engraved bracelet for men in Toronto?', a: 'Engraved men\'s bracelets are one of our most requested pieces. We offer custom engraving in any font including Arabic calligraphy, dates, names, or logos for ID bracelets, Cuban links with name plates, Figaros with engraved bars, and solid cuffs.' },
      { q: 'How do I measure my wrist for a bracelet?', a: 'Wrap a flexible tape measure snugly around your wrist just below the wrist bone, then add 0.5" (loose) or 0.25" (snug). Standard men\'s: 7.5-8.5". Standard women\'s: 6.5-7". We\'re happy to walk you through it on Zoom, or measure your wrist in person by appointment in Toronto.' },
      { q: 'What\'s the difference between a tennis bracelet and a diamond chain bracelet?', a: 'A tennis bracelet has prong-set diamonds in a continuous line, each stone visible front and side. A diamond chain bracelet has stones set into chain links. Tennis bracelets typically show more stone face-up and are the more formal style.' },
      { q: 'Do you make custom ID bracelets?', a: 'ID bracelets are a staple of our men\'s collection. We offer solid gold, platinum, or silver plates engraved with names, dates, Arabic calligraphy, or any custom design, attached to Cuban, figaro, or rope link chains.' },
      { q: 'Can I add diamonds to a bangle or cuff?', a: 'Pavé-set bangles, diamond-accent cuffs, and fully diamond-encrusted cuffs are all available, with natural or lab-grown at any clarity tier.' },
      { q: 'What metals are available for custom bracelets?', a: '10K, 14K, and 18K gold in yellow, white, and rose, plus platinum and sterling silver. 14K and 18K are our most popular for bracelets due to everyday durability.' },
      { q: 'Do you offer safety chains on tennis bracelets?', a: 'Every tennis bracelet we make includes a safety chain and a double-lock box clasp as standard. If you have an older bracelet from elsewhere missing one, we can repair it and add a safety chain.' },
      { q: 'How long does a custom bracelet take in Toronto?', a: 'Tennis bracelets 4-5 weeks due to hand-setting each stone. Bangles and cuffs 3-4 weeks. Chain bracelets 2-3 weeks. Engraved ID bracelets 3-4 weeks. Rush production available.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom-chains-toronto' },
      { name: 'Custom Rings', path: '/custom-rings-toronto' },
      { name: 'Custom Pendants', path: '/custom-pendants-toronto' },
    ],
    shapeBlurbs: {
      'Round Brilliant': 'The standard for tennis bracelets, delivering consistent sparkle across every link.',
      'Princess': 'A modern square cut with sharp corners and brilliant facets, occasionally used in a geometric channel-set bracelet.',
      'Oval': 'Elongated and eye-catching, a striking choice for a statement bangle or link bracelet.',
      'Emerald': 'A rectangular step-cut with clean lines. Understated and elegant, well suited to an architectural cuff design.',
      'Cushion': 'A square or rectangular cut with rounded corners. Warm and vintage, a soft touch on a bangle or cuff.',
      'Pear': 'A teardrop shape that adds movement, often used as an accent in a charm or link bracelet.',
      'Marquise': 'A football-shaped cut with pointed ends, often alternated with round stones for a fuller-looking tennis bracelet.',
      'Radiant': 'A rectangular cut with cropped corners and brilliant faceting, combining the shape of an emerald with the fire of a round.',
      'Asscher': 'A square step-cut with cropped corners and a hall-of-mirrors depth, a striking choice for a statement cuff.',
      'Heart': 'A sentimental shape, more commonly used as a single charm than set continuously around a full bracelet.',
      'Trillion': 'A bold triangular cut, occasionally used as an accent stone in a mixed-shape bracelet design.',
      'Baguette': 'A slim rectangular step-cut, a classic choice for a channel-set tennis bracelet.',
      'Other': 'Old mine, rose cut, hexagon, kite, shield, or fully custom shapes. Bring us anything and we\'ll source or cut it for your bracelet.',
    },
    crossLink: [
      'After a Cuban link bracelet? The same links are on our ',
      { anchor: 'custom chains', path: '/custom-chains-toronto' },
      ' page, in every width and weight we make.',
    ],
  },
  'grillz': {
    heroH1: 'Custom Grillz in Toronto',
    heroSub: 'Gold grillz, diamond grillz, and VVS sets — Toronto\'s premier custom grillz studio. In-house craftsmanship, competitive prices.',
    intro: 'Al-Asali Jewelry is Toronto\'s go-to destination for custom grillz. From single-tooth pieces to full diamond-set grillz, every set is handcrafted in-house using real gold and genuine diamonds, never plated, never CZ. Most clients come in knowing exactly what they want, from the metal down to the stone size. Others just say "surprise me" and we take it from there. We offer 10K, 14K, and 18K gold in yellow, white, and rose, with optional VVS diamond, diamond dust, and fully custom designs. Our mold process ensures a perfect fit every time, and our prices are explained upfront with no surprises. Whether you\'re looking for gold grillz, diamond grillz, or something entirely unique, we\'re the only shop in Toronto that does it all under one roof.',
    processNote: 'Custom grillz take 1-2 weeks after your mold appointment. We take a precise dental impression, design your grillz, and handcraft them in your chosen metal and stone configuration. Mold sessions are booked by appointment in Toronto.',
    budgetGuide: 'Grillz start at $500 for a single tooth in 10K gold. Top 6 or bottom 6 sets range from $2,000-$5,000 in solid gold. Full diamond-set VVS grillz start around $5,000 and scale with diamond quality and coverage.',
    stoneNote: 'We set genuine natural and lab-grown diamonds in grillz, including VVS clarity stones. Diamond dust finishes, channel-set diamonds, and fully iced-out options are all available. We never use cubic zirconia.',
    faq: [
      { q: 'How much do custom grillz cost in Toronto?', a: 'Single tooth grillz start at $500 in 10K gold. Top 6 or bottom 6 sets range from $2,000-$5,000 in solid gold. Full diamond-set VVS grillz start around $5,000 and scale to $15,000+ for fully iced-out sets. Every quote is broken down up front by gold weight, karat, and stone count.' },
      { q: 'What types of grillz do you offer?', a: 'Full sets (top + bottom), top 6, bottom 6, top 8, bottom 8, single tooth, fangs, open-face, honeycomb, bar, diamond dust, and fully custom designs. We also create matching grillz for couples and teams.' },
      { q: 'Are your grillz removable?', a: 'Every grillz we make is removable. We create a precise dental mold of your teeth for a snug, secure fit that clicks in and out without permanently altering your teeth.' },
      { q: 'Are removable grillz safe for your teeth?', a: 'Yes, when properly made. Because our grillz are custom-fit from your exact dental mold, they sit snugly without damaging enamel. We recommend removing them before eating and cleaning them with a soft brush daily.' },
      { q: 'VVS vs VS vs SI — which clarity should I pick for grillz?', a: 'VVS offers the cleanest, brightest look and is our premium tier. VS gives a near-identical visual face-up for about 20-30% less. SI stones look great in micro-pavé or dust settings. We\'ll walk through all three with loose stones during consultation.' },
      { q: 'Do you use real diamonds in grillz?', a: 'We use genuine natural and lab-grown diamonds only, including VVS clarity stones. No cubic zirconia, no moissanite substitutions, ever. Every stone is hand-set by our master jeweler in Toronto.' },
      { q: 'What gold karats are available for grillz?', a: '10K, 14K, and 18K gold in yellow, white, and rose gold. 10K is the most durable and affordable. 14K is our most popular as it is a great balance of colour and price. 18K delivers the deepest yellow but is softer and needs gentler care.' },
      { q: 'How long does it take to make custom grillz in Toronto?', a: 'Most custom grillz are completed in 1-2 weeks after your mold appointment. Full diamond-set VVS sets can take 3-4 weeks due to the setting work. Rush orders are available on request.' },
      { q: 'How does the grillz mold process work?', a: 'We take a precise dental-grade silicone impression of your teeth at a by-appointment mold session in Toronto. The impression is cast into a stone model that we use to shape and fit your grillz exactly to your bite. The appointment takes about 20 minutes.' },
      { q: 'Can I eat or drink with grillz in?', a: 'We recommend removing grillz before eating to protect both the grillz and your teeth. Drinking water is fine. Avoid sugary drinks with grillz in to prevent buildup along the gum line.' },
      { q: 'Do you offer permanent grillz?', a: 'We specialize in removable custom grillz because they\'re safer for your long-term oral health. If you\'re looking for semi-permanent grillz, we\'ll discuss the pros, cons, and dental considerations during consultation.' },
      { q: 'Do you make matching grillz for couples?', a: 'Matching couples grillz are one of our most requested orders. We can create mirrored designs, shared stones, or complementary styles between partners.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom-chains-toronto' },
      { name: 'Custom Pendants', path: '/custom-pendants-toronto' },
      { name: 'Custom Rings', path: '/custom-rings-toronto' },
    ],
    differentiator: 'Unlike mail-order grillz kits, we don\'t rely on a self-molded impression you take at home and hope turns out right. Every mold is taken in person by hand, which is the difference between grillz that fit and grillz that don\'t.',
  },
  'wedding-bands': {
    heroH1: 'Custom Wedding Bands in Toronto',
    heroSub: 'Handcrafted in Toronto to match your ring exactly, in a band built to last as long as your vow.',
    intro: 'A wedding band is the piece you\'ll wear every day for the rest of your life, so it deserves the same care as the engagement ring it sits beside. At Al-Asali Jewelry, every custom wedding band is designed and handcrafted in-house in Toronto, from classic comfort-fit bands and eternity rings to contour-shaped bands that nest perfectly against a halo or solitaire. Choose platinum, 18K, 14K, or 10K gold in yellow, white, or rose, with optional diamond or gemstone accents and any engraving you can imagine, including Arabic calligraphy, fingerprints, soundwaves and more. We also craft matching bridal sets for couples, modern men\'s bands in brushed or hammered finishes, and stackable anniversary bands, all backed by our lifetime craftsmanship guarantee.',
    processNote: 'Custom wedding bands take 3-5 weeks from design approval to completion. We start with a free consultation, in Toronto or online, to understand the fit, finish, and story you want, then create CAD renderings for your approval before hand-crafting each band in your chosen metal. Matching bridal sets are designed alongside the engagement ring when possible, to ensure a perfect nest. Rush orders can be completed in 2-3 weeks for an additional fee.',
    budgetGuide: 'Custom wedding bands start at $900 for plain 10K gold bands and scale with karat, width, eternity stone coverage, and engraving complexity. A solid platinum comfort-fit band typically starts around $1,800, a half-eternity diamond band around $3,500, and a full diamond eternity band from $6,000. We quote every band up front with no hidden fees.',
    stoneNote: 'Bands can be set with diamonds (natural or lab-grown), sapphires, rubies, or emeralds in channel, bead, or shared-prong settings. Eternity and half-eternity bands are our most popular stone-set options, with birthstone bands a close second for anniversary pieces.',
    faq: [
      { q: 'How much does a custom wedding band cost in Toronto?', a: 'Custom wedding bands start at $900 for plain 10K gold and scale with metal karat, width, diamond coverage, and engraving. Platinum bands start around $1,800, half-eternity diamond bands from $3,500.' },
      { q: 'Do you match wedding bands to engagement rings?', a: 'We specialize in contour and shaped bands that nest flush against halo, solitaire, and three-stone engagement rings. Bring in your engagement ring and we\'ll design a band to match.' },
      { q: 'What\'s the difference between comfort fit and standard fit?', a: 'Comfort-fit bands have a slightly domed interior, making them easier to slide over the knuckle and more comfortable for daily wear. Standard-fit bands have a flat interior and feel slightly more traditional.' },
      { q: 'Can you engrave Arabic calligraphy on a wedding band?', a: 'Absolutely. We engrave Arabic calligraphy, scripture, names, dates, fingerprints, soundwaves, and any custom design you envision, inside or outside the band.' },
      { q: 'Do you make men\'s wedding bands?', a: 'We craft men\'s wedding bands in widths from 4mm to 10mm with brushed, hammered, polished, or matte finishes. Popular options include tungsten-look platinum, two-tone gold, and diamond-accent bands.' },
      { q: 'How long does a custom wedding band take in Toronto?', a: 'Most bands take 3-5 weeks from design approval. Matching bridal sets take 4-6 weeks. Rush orders can be completed in 2-3 weeks for an additional fee.' },
      { q: 'Can I reset diamonds from a family ring into a new band?', a: 'Heirloom resets are one of our most meaningful projects. We\'ll carefully remove the stones and reset them into your new custom band design.' },
      { q: 'Do you make stackable anniversary bands?', a: 'We love designing stackable sets that add a new band for every anniversary or milestone. Mix metals, karats, and stone colours for a truly personal stack.' },
      { q: 'Can you size my band precisely?', a: 'We measure your ring size during consultation at no charge, and every custom band includes free resizing for life if your size changes.' },
      { q: 'If we\'re ordering an engagement ring and wedding band together, how long does the whole process take?', a: 'We typically design both together so the band nests perfectly against the ring, which adds coordination but not much extra time. Plan for 4-6 weeks total, about the same as an engagement ring on its own, since we build the band around the ring\'s final design rather than starting it separately.' },
    ],
    relatedPages: [
      { name: 'Custom Engagement Rings', path: '/custom-engagement-rings-toronto' },
      { name: 'Custom Rings', path: '/custom-rings-toronto' },
      { name: 'Custom Pendants', path: '/custom-pendants-toronto' },
    ],
    shapeBlurbs: {
      'Round Brilliant': 'The most popular choice for eternity bands, delivering consistent sparkle all the way around.',
      'Princess': 'A modern square cut with sharp corners, popular for channel-set men\'s and women\'s bands alike.',
      'Oval': 'Elongated and eye-catching, a striking option for a half-eternity band worn alongside a round engagement ring.',
      'Emerald': 'A rectangular step-cut with clean lines. Understated and elegant, well suited to a vintage or Art Deco-inspired band.',
      'Cushion': 'A square or rectangular cut with rounded corners. Warm and vintage, pairing especially well with a halo engagement ring.',
      'Pear': 'A teardrop shape less common in bands, but a distinctive choice for an accent or an alternating pattern.',
      'Marquise': 'A football-shaped cut with pointed ends, often alternated with round stones for a fuller-looking eternity band.',
      'Radiant': 'A rectangular cut with cropped corners and brilliant faceting, combining an emerald outline with round-cut fire.',
      'Asscher': 'A square step-cut with cropped corners and a hall-of-mirrors depth, a striking pick for a channel-set band.',
      'Heart': 'The ultimate romantic shape, more common as a single accent stone than set continuously around a full band.',
      'Trillion': 'A bold triangular cut, often alternated with round stones for a graphic, eternity-style pattern.',
      'Baguette': 'A slim rectangular step-cut, the classic choice for a channel-set eternity or half-eternity band.',
      'Other': 'Old mine, rose cut, hexagon, kite, shield, or fully custom shapes. Bring us anything and we\'ll source or cut it for your band.',
    },
    crossLink: [
      'Designing your engagement ring too? Visit our ',
      { anchor: 'custom engagement rings', path: '/custom-engagement-rings-toronto' },
      ' page to plan the full bridal set together.',
    ],
  },
}

// ---------------------------------------------------------------------------

export type LandingEntry = (typeof landingContent)[string]

export const oakvilleContent: Record<string, Partial<LandingEntry> & { faqAnswers?: Record<string, string> }> = {
  'engagement-rings': {
    heroH1: 'Custom Engagement Rings in Oakville',
    heroSub: 'Design a ring that\'s entirely yours, with an Oakville jeweler who handcrafts every piece in-house.',
    intro: 'At Al-Asali Jewelry, every custom engagement ring begins with your vision. Whether you dream of a classic solitaire, a vintage halo setting, or a bold modern design, our master jeweler brings it to life entirely in-house. Choose from ethically sourced natural and lab-grown diamonds, sapphires, rubies, and emeralds, set in platinum, 18K, or 14K gold. This is a piece you\'ll wear for the rest of your life, and we treat it that way from the first sketch to the final polish. Our Oakville clients work with us because nothing gets outsourced: every cut, setting, and polish happens under our roof.',
    faqAnswers: {
      'Where are you based?': 'Al-Asali Jewelry Studio is a custom jeweler serving Oakville by appointment. We offer virtual consultations via Zoom, phone, or message, complimentary secure insured delivery in Oakville and across the GTA, and optional in-person meetings at our Oakville studio at a time that works for you.',
    },
  },
  'rings': {
    heroH1: 'Custom Rings in Oakville',
    heroSub: 'Signet rings, statement rings, wedding bands, and more, designed with clients in Oakville and handcrafted in-house.',
    intro: 'From bold signet rings to elegant wedding bands and one-of-a-kind statement pieces, Al-Asali Jewelry creates custom rings for Oakville clients, each one uniquely theirs. Every ring is handcrafted in-house using gold, platinum, or silver, with optional diamond and gemstone settings. Whether you bring a detailed sketch or just an idea, our master jeweler will bring your ring to life with precision and care.',
    processNote: 'Custom rings typically take 3-5 weeks. We begin with a design consultation, in Oakville or online, create CAD renderings, and hand-select any stones before crafting begins. Whether it\'s a wedding band, a family signet ring, or a bold everyday statement piece, we treat every ring with the same level of detail.',
  },
  'wedding-bands': {
    heroH1: 'Custom Wedding Bands in Oakville',
    heroSub: 'Designed with Oakville clients, handcrafted in-house to match your ring exactly, in a band built to last as long as your vow.',
    intro: 'A wedding band is the piece you\'ll wear every day for the rest of your life, so it deserves the same care as the engagement ring it sits beside. For our Oakville clients, every custom wedding band is designed and handcrafted in-house, from classic comfort-fit bands and eternity rings to contour-shaped bands that nest perfectly against a halo or solitaire. Choose platinum, 18K, 14K, or 10K gold in yellow, white, or rose, with optional diamond or gemstone accents and any engraving you can imagine, including Arabic calligraphy, fingerprints, soundwaves and more. We also craft matching bridal sets for couples, modern men\'s bands in brushed or hammered finishes, and stackable anniversary bands, all backed by our lifetime craftsmanship guarantee.',
    processNote: 'Custom wedding bands take 3-5 weeks from design approval to completion. We start with a free consultation, in Oakville or online, to understand the fit, finish, and story you want, then create CAD renderings for your approval before hand-crafting each band at our Toronto workshop. Matching bridal sets are designed alongside the engagement ring when possible, to ensure a perfect nest. Rush orders can be completed in 2-3 weeks for an additional fee.',
  },
  'pendants': {
    heroH1: 'Custom Pendants in Oakville',
    heroSub: 'Name pendants, photo pendants, diamond initials, and more, designed with Oakville clients and handcrafted in-house.',
    intro: 'Al-Asali Jewelry creates custom pendants that carry meaning. From diamond-encrusted name pendants and photo pendants to religious symbols and fully custom designs, every piece is handcrafted in-house for our Oakville clients. Choose your metal, stones, and design. We\'ll build the piece around exactly what you pick. Our custom name chains and bubble letter pendants are among the most requested pieces in the GTA, Oakville included.',
    processNote: 'Custom pendants take 2-4 weeks depending on complexity. Name and initial pendants are on the faster end, while photo pendants and diamond-set pieces require additional crafting time. We create a detailed mockup for your approval before beginning work, whether your consultation happens in Oakville or online.',
    faqAnswers: {
      'How do I receive my custom pendant?': 'We deliver finished pieces fully insured to your door anywhere in Oakville and the rest of the GTA at no extra cost, and ship securely anywhere in Canada. In-person handover by appointment in Oakville is also available.',
    },
  },
  'chains': {
    heroH1: 'Custom Chains in Oakville',
    heroSub: 'Cuban links, rope chains, franco chains, and more, built to your exact specifications in gold, silver, or platinum.',
    intro: 'Al-Asali Jewelry is Oakville\'s destination for custom chains. Whether you want a heavyweight Miami Cuban link, a classic rope chain, or a sleek franco, every chain is handcrafted in-house to your exact length, width, and weight specifications. Choose from 10K, 14K, or 18K gold in yellow, white, or rose, as well as platinum and sterling silver. Every chain we make is solid gold, with no hollow links, full stop, which is the biggest difference between a chain that lasts and one that doesn\'t. Our custom gold chains and name chains are among the most sought-after pieces in Oakville and the rest of the GTA, and every one is built solid, with no hollow links.',
    processNote: 'Custom chains for Oakville clients take 2-4 weeks depending on complexity and weight. Cuban links and heavier chains require more crafting time. We weigh and measure each chain to your exact specifications before finishing.',
  },
  'earrings': {
    heroH1: 'Custom Earrings in Oakville',
    heroSub: 'Diamond studs, gold hoops, drop earrings, and more, designed with Oakville clients and handcrafted in-house.',
    intro: 'From elegant diamond studs to bold statement hoops, Al-Asali Jewelry designs and crafts custom earrings for Oakville clients entirely in-house. Choose your style, metal, and stone preferences, whether you\'re after a subtle everyday pair or a show-stopping set for a special occasion, and we\'ll craft them to perfection. We also create matching earring-and-pendant sets for a cohesive look.',
    processNote: 'Custom earrings for Oakville clients take 2-4 weeks. Stud earrings are quicker to produce, while complex chandelier designs with multiple stone settings require more time. We create a detailed design for your approval before crafting.',
    faqAnswers: {
      'What types of custom earrings can you make in Toronto?': 'We offer diamond studs, gold hoops, huggies, drop earrings, chandelier earrings, ear climbers, ear cuffs, threader earrings, cluster earrings, and fully custom designs. All custom earrings for Oakville clients are handcrafted in-house.',
    },
  },
  'bracelets': {
    heroH1: 'Custom Bracelets in Oakville',
    heroSub: 'Tennis bracelets, bangles, cuffs, and engraved pieces for men and women, designed with Oakville clients and handcrafted in-house.',
    intro: 'Al-Asali Jewelry creates custom bracelets for every style and occasion. From diamond tennis bracelets and elegant bangles to bold cuffs and engraved pieces for men, every bracelet is handcrafted in-house for our Oakville clients. Whether you want a personalized name bracelet, a custom charm bracelet, or a men\'s engraved bracelet in solid gold, we\'ll build it to fit your wrist and your vision exactly.',
    processNote: 'Custom bracelets for Oakville clients take 3-5 weeks. Tennis bracelets with many individual stone settings require more time, while bangles and cuffs are quicker. We measure your wrist for a precise fit during consultation.',
    faqAnswers: {
      'How do I measure my wrist for a bracelet?': 'Wrap a flexible tape measure snugly around your wrist just below the wrist bone, then add 0.5" (loose) or 0.25" (snug). Standard men\'s: 7.5-8.5". Standard women\'s: 6.5-7". We\'re happy to walk you through it on Zoom, or measure your wrist in person by appointment in Oakville.',
    },
  },
  'grillz': {
    heroH1: 'Custom Grillz in Oakville',
    heroSub: 'Gold grillz, diamond grillz, and VVS sets, handcrafted in-house for Oakville clients with competitive and transparent pricing.',
    // The Toronto intro closes on "the only shop in Toronto that does it all
    // under one roof". That claim is dropped here rather than relocated —
    // the shop is in Toronto, so it cannot be made about Oakville.
    intro: 'Al-Asali Jewelry is Oakville\'s go-to destination for custom grillz. From single-tooth pieces to full diamond-set grillz, every set is handcrafted in-house using real gold and genuine diamonds, never plated, never CZ. Most clients come in knowing exactly what they want, from the metal down to the stone size. Others just say "surprise me" and we take it from there. We offer 10K, 14K, and 18K gold in yellow, white, and rose, with optional VVS diamond, diamond dust, and fully custom designs. Our mold process ensures a perfect fit every time, and our prices are explained upfront with no surprises.',
    // processNote intentionally inherited: mold sessions genuinely happen at
    // the Toronto studio, which the review notes asked us to be accurate about.
  },
}

/** Build the content for a page, applying Oakville overrides when relevant. */
export function resolveLanding(type: string, city: City): LandingEntry | null {
  const base = landingContent[type]
  if (!base) return null
  if (city !== 'oakville') return base

  const o = oakvilleContent[type]
  if (!o) return base

  const { faqAnswers, ...fields } = o
  return {
    ...base,
    ...fields,
    faq: base.faq.map(({ q, a }) => ({
      q: q.replace(/\bToronto\b/g, 'Oakville'),
      a: faqAnswers?.[q] ?? a,
    })),
    relatedPages: base.relatedPages.map(({ name, path }) => ({
      name,
      path: path.replace(/-toronto$/, '-oakville'),
    })),
    crossLink: base.crossLink?.map((part) =>
      typeof part === 'string' ? part : { ...part, path: part.path.replace(/-toronto$/, '-oakville') }
    ),
  }
}
