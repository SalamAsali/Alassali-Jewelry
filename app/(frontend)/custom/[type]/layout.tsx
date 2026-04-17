import type { Metadata } from 'next'

const pageMeta: Record<string, { title: string; description: string }> = {
  'engagement-rings': {
    title: 'Custom Engagement Rings Toronto | Design Your Dream Ring — Al-Assali Jewelry',
    description: 'Design a one-of-a-kind engagement ring with Toronto\'s premier custom jeweler. Ethically sourced diamonds, in-house craftsmanship, and a process as special as the ring itself.',
  },
  'rings': {
    title: 'Custom Rings Toronto | Signet, Statement & Wedding Rings — Al-Assali Jewelry',
    description: 'From signet rings to wedding bands, every custom ring is handcrafted in-house in Toronto. Gold, platinum, and silver — designed around your vision.',
  },
  'pendants': {
    title: 'Custom Pendants Toronto | Name, Photo & Diamond Pendants — Al-Assali Jewelry',
    description: 'Handcrafted custom pendants in Toronto — from name pendants and photo pendants to diamond-set initials. Your story, beautifully told in gold and silver.',
  },
  'chains': {
    title: 'Custom Chains Toronto | Cuban Link, Rope & Gold Chains — Al-Assali Jewelry',
    description: 'Custom gold and silver chains handcrafted in Toronto. Cuban links, rope chains, franco chains, and more — built to your exact specifications.',
  },
  'earrings': {
    title: 'Custom Earrings Toronto | Diamond, Gold & Handcrafted — Al-Assali Jewelry',
    description: 'Design custom earrings with Toronto\'s premier jeweler. Studs, hoops, drops, and chandelier earrings — handcrafted in gold, platinum, or silver.',
  },
  'bracelets': {
    title: 'Custom Bracelets Toronto | Tennis, Bangle & Engraved — Al-Assali Jewelry',
    description: 'Custom bracelets handcrafted in Toronto. Tennis bracelets, bangles, cuffs, and engraved pieces for men and women — designed to your exact specifications.',
  },
  'grillz': {
    title: 'Custom Grillz Toronto | Gold & Diamond Grillz — Al-Assali Jewelry',
    description: 'Toronto\'s premier custom grillz studio. Gold, diamond, and VVS grillz — from single tooth to full sets. In-house craftsmanship, competitive prices.',
  },
  'wedding-bands': {
    title: 'Custom Wedding Bands Toronto | Bridal, Eternity & Men\'s Bands — Al-Assali Jewelry',
    description: 'Custom wedding bands handcrafted in Toronto. Matching bridal sets, eternity bands, men\'s wedding rings, engraved bands, and Arabic calligraphy rings — in gold, platinum, or silver.',
  },
  'general': {
    title: 'Custom Jewellery Toronto | Bespoke Jeweller — Al-Assali Jewelry',
    description: 'Design custom jewellery with Toronto\'s premier bespoke jeweller. Engagement rings, wedding bands, chains, pendants, grillz, and more — all handcrafted in-house on Vaughan Rd.',
  },
}

export function generateMetadata({ params }: { params: { type: string } }): Metadata {
  const meta = pageMeta[params.type] || pageMeta['general']
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
