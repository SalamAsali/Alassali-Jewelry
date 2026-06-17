import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

const pageMeta: Record<string, { title: string; description: string }> = {
  'engagement-rings': {
    title: 'Custom Engagement Rings Toronto | Design Your Dream Ring — Al-Asali Jewelry',
    description: 'Design a one-of-a-kind engagement ring with Toronto\'s premier custom jeweler. Ethically sourced diamonds, in-house craftsmanship, and a process as special as the ring itself.',
  },
  'rings': {
    title: 'Custom Rings Toronto | Signet, Statement & Wedding Rings — Al-Asali Jewelry',
    description: 'From signet rings to wedding bands, every custom ring is handcrafted in-house in Toronto. Gold, platinum, and silver — designed around your vision.',
  },
  'pendants': {
    title: 'Custom Pendants Toronto | Name, Photo & Diamond Pendants — Al-Asali Jewelry',
    description: 'Handcrafted custom pendants in Toronto — from name pendants and photo pendants to diamond-set initials. Your story, beautifully told in gold and silver.',
  },
  'chains': {
    title: 'Custom Chains Toronto | Cuban Link, Rope & Gold Chains — Al-Asali Jewelry',
    description: 'Custom gold and silver chains handcrafted in Toronto. Cuban links, rope chains, franco chains, and more — built to your exact specifications.',
  },
  'earrings': {
    title: 'Custom Earrings Toronto | Diamond, Gold & Handcrafted — Al-Asali Jewelry',
    description: 'Design custom earrings with Toronto\'s premier jeweler. Studs, hoops, drops, and chandelier earrings — handcrafted in gold, platinum, or silver.',
  },
  'bracelets': {
    title: 'Custom Bracelets Toronto | Tennis, Bangle & Engraved — Al-Asali Jewelry',
    description: 'Custom bracelets handcrafted in Toronto. Tennis bracelets, bangles, cuffs, and engraved pieces for men and women — designed to your exact specifications.',
  },
  'grillz': {
    title: 'Custom Grillz Toronto | Gold & Diamond Grillz — Al-Asali Jewelry',
    description: 'Toronto\'s premier custom grillz studio. Gold, diamond, and VVS grillz — from single tooth to full sets. In-house craftsmanship, competitive prices.',
  },
  'wedding-bands': {
    title: 'Custom Wedding Bands Toronto | Bridal, Eternity & Men\'s Bands — Al-Asali Jewelry',
    description: 'Custom wedding bands handcrafted in Toronto. Matching bridal sets, eternity bands, men\'s wedding rings, engraved bands, and Arabic calligraphy rings — in gold, platinum, or silver.',
  },
  'general': {
    title: 'Start Your Custom Jewelry Project — Al-Asali Jewelry',
    description: 'Tell us about your custom jewelry project — we’ll send back a sketch, a quote, and a timeline within 24 hours.',
  },
}

export function generateMetadata({ params }: { params: { type: string } }): Metadata {
  const meta = pageMeta[params.type] || pageMeta['general']
  // /custom-form is a form-only conversion utility excluded from the
  // sitemap. Noindex prevents it from competing with the homepage for
  // "custom jewelry toronto" intent.
  const isFormPage = params.type === 'general'
  const canonicalPath = isFormPage ? '/custom-form' : `/custom-${params.type}-toronto`
  return {
    // `absolute` prevents the root layout's "%s | Al-Asali Jewelry" template
    // from appending a second brand suffix to titles that already end in one.
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: canonicalPath },
    openGraph: mergeOpenGraph({
      title: meta.title,
      description: meta.description,
      url: canonicalPath,
    }),
    ...(isFormPage ? { robots: { index: false, follow: true } } : {}),
  }
}

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
