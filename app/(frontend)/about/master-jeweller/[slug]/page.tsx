import type { Metadata } from 'next'
import NextLink from 'next/link'
import {
  MapPin, GraduationCap, Hammer, Scroll, Diamond, Sparkles, Star, ArrowRight,
  Phone, Mail,
} from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import { SITE_CONFIG, MASTER_JEWELLER } from '@/lib/seo/siteConfig'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'
import { getMasterJeweller } from '@/lib/getMasterJeweller'

const FALLBACK_TITLE = 'Master Jeweller & Founder'
const FALLBACK_TAGLINE = "Toronto's bespoke jeweller behind every piece that leaves Al-Assali Jewelry Studio."
const FALLBACK_BIO = [
  'Mohammad Al-Assali is the founder and master jeweller behind Al-Assali Jewelry Studio in Toronto. A graduate of the George Brown College Jewellery Arts Program and a working goldsmith since 2017, Mohammad has personally designed and handcrafted hundreds of bespoke engagement rings, wedding bands, diamond pendants, gold chains, tennis bracelets, and custom grillz for clients across the Greater Toronto Area.',
  'What began as a sole-proprietor commission practice at the end of 2020 has grown into a full Toronto bespoke studio — still operating with the same principle Mohammad started with: every piece is designed, cast, set, and finished in-house. No outsourcing, no middlemen, no shortcuts. If Al-Assali Jewelry made it, Mohammad inspected it.',
  'Mohammad has built a reputation for deep expertise in Arabic calligraphy jewellery — a specialty few Toronto jewellers can authentically execute. From Allah pendants and Ayat al-Kursi pendants to custom Arabic name rings and engraved wedding bands, his work has been carried by clients in Toronto, Mississauga, Vaughan, Markham, and beyond.',
].join('\n\n')
const FALLBACK_SEO_TITLE = 'Mohammad Al-Assali — Master Jeweller & Founder | Al-Assali Jewelry Toronto'
const FALLBACK_SEO_DESCRIPTION =
  'Meet Mohammad Al-Assali — master jeweller and founder of Al-Assali Jewelry Studio in Toronto. George Brown College Jewellery Arts graduate, practicing since 2017.'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cms = await getMasterJeweller(slug)
  return {
    title: cms?.seoTitle?.trim() || FALLBACK_SEO_TITLE,
    description: cms?.seoDescription?.trim() || FALLBACK_SEO_DESCRIPTION,
    alternates: { canonical: `/about/master-jeweller/${slug}` },
  }
}

export default async function MasterJewellerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cms = await getMasterJeweller(slug)

  const name = cms?.name?.trim() || MASTER_JEWELLER.name
  const title = cms?.title?.trim() || FALLBACK_TITLE
  const tagline = cms?.tagline?.trim() || FALLBACK_TAGLINE
  const bio = cms?.bio?.trim() || FALLBACK_BIO
  const bioParagraphs = bio.split(/\n\n+/)

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'About', url: `${SITE_CONFIG.url}/about/master-jeweller/${slug}` },
    { name, url: `${SITE_CONFIG.url}/about/master-jeweller/${slug}` },
  ])

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 space-y-20">
        {/* HERO */}
        <header className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5">
            <Hammer className="w-4 h-4 text-glacier-grey" />
            <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">{title}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            {name}
          </h1>
          <p className="text-xl text-stone leading-relaxed">{tagline}</p>
        </header>

        {/* BIO */}
        <section className="max-w-3xl mx-auto space-y-5 text-stone leading-relaxed">
          {bioParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {/* CREDENTIALS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-8">
            <GraduationCap className="w-8 h-8 text-glacier-grey mb-4" />
            <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Education
            </h2>
            <ul className="space-y-2 text-stone text-sm">
              <li>
                <span className="text-white font-medium">George Brown College</span>
                <br />
                Jewellery Arts Program — Diploma
              </li>
            </ul>
          </div>
          <div className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-8">
            <Hammer className="w-8 h-8 text-glacier-grey mb-4" />
            <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Experience
            </h2>
            <ul className="space-y-2 text-stone text-sm">
              <li><span className="text-white font-medium">Practicing since 2017</span></li>
              <li><span className="text-white font-medium">Al-Assali Jewelry Studio</span> — Founder &amp; Master Jeweller (Toronto, 2020–present)</li>
              <li>Hundreds of bespoke pieces handcrafted for GTA clients</li>
            </ul>
          </div>
        </section>

        {/* SPECIALTIES */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
            Specialties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Diamond, title: 'Bespoke Engagement Rings', body: "Solitaire, halo, three-stone, vintage — designed around each couple's story. GIA-graded naturals or IGI-certified lab-grown diamonds." },
              { icon: Sparkles, title: 'Custom Grillz', body: 'Real gold, real diamonds. Single tooth to full sets, VS to VVS clarity, all hand-set in Toronto. No cubic zirconia — ever.' },
              { icon: Scroll, title: 'Arabic Calligraphy Jewellery', body: 'Allah pendants, Ayat al-Kursi, Bismillah, custom Arabic name pendants and rings — crafted with authentic letter forms and balanced proportions.' },
              { icon: Hammer, title: 'Heirloom Resets', body: 'Carefully remove stones from family pieces and set them into new bespoke designs, preserving sentiment while modernizing the look.' },
              { icon: Star, title: 'Custom Gold Chains', body: 'Solid gold Cuban, rope, franco, figaro, and box chains. Built to exact gram weight specifications — never hollow.' },
              { icon: Diamond, title: 'Diamond Setting', body: 'Prong, bezel, channel, pavé, flush, and tension settings. Every stone hand-set and tightened before the piece leaves the studio.' },
            ].map(({ icon: Icon, title: specTitle, body }) => (
              <div key={specTitle} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5">
                <Icon className="w-7 h-7 text-glacier-grey mb-3" />
                <h3 className="text-white font-bold text-sm mb-2">{specTitle}</h3>
                <p className="text-stone text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LOCATION + CTA */}
        <section className="bg-charcoal/40 border border-glacier-grey/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <MapPin className="w-8 h-8 text-glacier-grey mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Book a Free Consultation
          </h2>
          <p className="text-stone text-sm mb-6">
            Every custom project starts with a free consultation — virtually via Zoom, phone, or message, or in-person in Toronto by appointment. Mohammad leads every initial consultation personally.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-6">
            <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light">
              <Phone className="w-4 h-4" /> {SITE_CONFIG.phoneDisplay}
            </a>
            <span className="text-stone">·</span>
            <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light">
              <Mail className="w-4 h-4" /> {SITE_CONFIG.email}
            </a>
          </div>
          <NextLink
            href="/custom/general"
            className="inline-flex items-center gap-2 bg-glacier-grey text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-glacier-grey-light transition-all"
          >
            Start Your Custom Project <ArrowRight className="w-4 h-4" />
          </NextLink>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </div>
    </div>
  )
}
