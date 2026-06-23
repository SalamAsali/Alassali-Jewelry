import type { Metadata } from 'next'

import BlogLayout from '@/components/blog/BlogLayout'
import { buildArticleSchema } from '@/lib/seo/article'
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const SLUG = 'arabic-calligraphy-jewelry-toronto'
const TITLE = 'Arabic Calligraphy Jewelry in Toronto: A Craftsman\'s Guide'
const DESCRIPTION = 'Arabic calligraphy pendants, rings, and engravings — explained by a Toronto custom jeweler. Fonts, verses, meanings, and what to ask for when you commission a piece.'
const DATE = '2026-04-19'
const COVER = '/blog/arabic-calligraphy-jewelry-toronto-cover.png'
const COVER_ALT = 'Arabic calligraphy jewelry Toronto 2026 — custom name pendants, Allah pendants, Ayat al-Kursi, and wedding band engravings in gold and diamond, Al-Asali Custom Jewelry'

export const metadata: Metadata = {
  title: 'Arabic Calligraphy Jewelry Toronto',
  description: DESCRIPTION,
  alternates: { canonical: '/blog/arabic-calligraphy-jewellery-toronto' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', images: [COVER], url: '/blog/arabic-calligraphy-jewellery-toronto', locale: 'en_CA', siteName: 'Al-Asali Jewelry' },
}

const faq = [
  { q: 'What Arabic calligraphy fonts do you work with?', a: 'Thuluth, Naskh, Diwani, Kufic, Ruqaʿa, and modern script calligraphy. We can also replicate a specific font or style from a reference you provide.' },
  { q: 'Can you engrave Arabic inside a wedding band?', a: 'Yes — inside or outside the band, any font. Popular choices include names, wedding dates, short verses, and meaningful words like Mashallah or Habibi.' },
  { q: 'How much does an Arabic calligraphy pendant cost?', a: 'Custom Arabic pieces vary based on complexity, letter count, metal, and whether you want diamond setting. A simple name pendant and a detailed Ayat al-Kursi piece involve very different amounts of work — book a free consultation and we\'ll quote your specific piece.' },
  { q: 'Will you verify the Arabic before casting?', a: 'Always. We proofread every Arabic piece, and for religious text we reference authoritative sources to ensure correct rendering before moving to CAD.' },
  { q: 'Can you work from my handwriting?', a: 'Yes — one of our favourite projects is converting a parent\'s or grandparent\'s handwritten Arabic into a pendant or band engraving.' },
]

export default function Page() {
  const article = buildArticleSchema({
    slug: SLUG,
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: DATE,
    imagePath: COVER,
    keywords: ['Arabic calligraphy pendant Toronto', 'Allah pendant Toronto', 'Ayat al-Kursi pendant Toronto', 'Arabic jewelry Toronto', 'custom Arabic name pendant'],
    wordCount: 1000,
    articleSection: 'Heritage',
  })
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
    { name: TITLE, url: `${SITE_CONFIG.url}/blog/${SLUG}` },
  ])
  const faqSchema = buildFaqSchema(faq)

  return (
    <BlogLayout
      title={TITLE}
      subtitle="Arabic calligraphy is one of our specialties — the fonts, the process, and what makes a piece authentic."
      datePublished={DATE}
      readingMinutes={7}
      category="Heritage"
      coverImage={COVER}
      coverImageAlt={COVER_ALT}
      relatedLinks={[
        { label: 'Custom Pendants in Toronto', href: '/custom-pendants' },
        { label: 'Custom Wedding Bands in Toronto', href: '/custom-wedding-bands' },
        { label: 'Meet the Master Jeweler', href: '/about/master-jeweller/mohammad-al-assali' },
      ]}
    >
      <p>
        Arabic calligraphy is a craft, not a font. When it&apos;s rendered correctly in jewelry, it flows — the strokes balance, the letters connect as the script demands, the proportions feel alive. When it&apos;s rendered poorly, it looks like a copy-pasted shape that happens to be in Arabic. The difference matters, especially for pieces that carry sacred text or a loved one&apos;s name.
      </p>
      <p>
        Al-Asali Jewelry Studio specializes in Arabic calligraphy jewelry in Toronto. This guide walks through the fonts we work with, the most-requested pieces, and what to ask for when you commission a piece.
      </p>

      <h2>The fonts we work with</h2>

      <div className="my-8 rounded-xl overflow-hidden border border-glacier-grey/20 not-prose">
        <img
          src="/blog/arabic-calligraphy-jewelry-toronto-script-styles.png"
          alt="Arabic calligraphy script styles for jewelry Toronto — Naskh (clear, readable, everyday), Thuluth (bold, majestic, statement pieces), Ruq'ah (compact, modern), and Diwani (fluid, ornamental) with descriptions and best use cases"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </div>

      <p>
        Arabic calligraphy has several classical scripts, each suited to different moods and piece types:
      </p>
      <ul>
        <li><strong>Thuluth</strong> — The script of mosque walls and Quranic art. Dramatic, sweeping, tall. Best for Ayat al-Kursi pendants, Allah pendants, and statement verse pieces.</li>
        <li><strong>Naskh</strong> — The script of printed books and modern Arabic. Clean, readable, approachable. Best for everyday name pendants and casual pieces.</li>
        <li><strong>Diwani</strong> — Ottoman court script. Flowing, ornate, curled. Best for elegant name pendants, wedding band engravings, anniversary pieces.</li>
        <li><strong>Kufic</strong> — Ancient geometric script. Angular, architectural, striking. Best for bold contemporary pieces and logos.</li>
        <li><strong>Ruqaʿa</strong> — Everyday handwriting script. Informal, fluid. Best when replicating a family member&apos;s handwriting.</li>
        <li><strong>Modern / Contemporary</strong> — Not a classical script, but a popular aesthetic. Rounded, friendly, clean. Best for casual name pendants and everyday wear.</li>
      </ul>

      <h2>Most-requested pieces</h2>
      <h3>Allah pendants</h3>
      <p>
        One of the most requested pieces in our Toronto studio. Classical renderings use Thuluth or Diwani script to emphasize the word&apos;s sacred weight. We craft Allah pendants in 10K, 14K, or 18K gold, plain or with pavé diamond outlines. Complexity and metal choice determine the final price — reach out for a consultation.
      </p>
      <h3>Ayat al-Kursi pendants</h3>
      <p>
        The Throne Verse — one of the most beloved verses of the Quran, often worn for protection. These pendants require careful proofreading of every character; we reference authoritative sources for the script before any CAD work begins. Oval or rectangular silhouettes are most popular. Because of the letter density and detailed setting work involved, these pieces are among our more complex commissions.
      </p>
      <h3>Name pendants</h3>
      <p>
        Custom Arabic name pendants are our single most popular category. You pick the font (Diwani and modern script are most requested), we render your name in gold or platinum — plain or diamond-set. Pricing depends on letter count, metal, and stone work; simpler names in a single metal are the most accessible starting point.
      </p>
      <h3>Wedding band engraving</h3>
      <p>
        Inside or outside engraving in Arabic is a signature choice for Muslim couples marrying in Toronto. Common engravings include each other&apos;s names, wedding dates in the Hijri calendar, Mashallah, or short verses. Engraving is included free with most custom wedding bands.
      </p>
      <h3>Religious phrases</h3>
      <p>
        Bismillah, Mashallah, Subhanallah, Alhamdulillah, and the 99 Names of Allah. Each has its own traditional rendering we can match, or we can deliver a contemporary interpretation depending on your preference.
      </p>
      <h3>Arabic handwriting pieces</h3>
      <p>
        One of our most meaningful categories. Clients send us a handwritten phrase — from a parent, a grandparent, a loved one who has passed — and we render it in gold. The asymmetry and texture of real handwriting translates beautifully into jewelry.
      </p>

      <h2>What shapes the price of an Arabic calligraphy piece</h2>
      <p>
        Unlike a standard ring where the price is mostly stone + metal, Arabic calligraphy pieces add a layer of labour-intensive design and verification. What drives cost:
      </p>
      <ul>
        <li><strong>Text length and complexity</strong> — a 2-letter name and a full Throne Verse are vastly different undertakings. More characters means more CAD time, more casting weight, more setting work if diamonds are involved.</li>
        <li><strong>Metal</strong> — 10K, 14K, or 18K gold, or platinum. Each tier adds cost proportionally.</li>
        <li><strong>Diamond setting</strong> — plain gold pieces are the most accessible. Pavé diamond outlines or full stone coverage add meaningful cost depending on surface area.</li>
        <li><strong>Silhouette and size</strong> — a small everyday pendant vs a large statement piece uses different amounts of gold and setting labour.</li>
      </ul>
      <p>
        The best way to understand your specific quote is through a consultation — we walk through options at every price point and adjust the design to fit your budget without compromising the script.
      </p>

      <h2>Our process for Arabic pieces</h2>

      <div className="my-8 rounded-xl overflow-hidden border border-glacier-grey/20 not-prose">
        <img
          src="/blog/arabic-calligraphy-jewelry-toronto-process-steps.png"
          alt="Arabic calligraphy jewelry making process Toronto — 5 steps: free consultation, proofread every character, CAD design with unlimited revisions, casting and hand-setting in Toronto studio, final inspection by Mohammad Al-Asali before shipping"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </div>

      <ol>
        <li><strong>Consultation</strong>. We discuss the text, font, and silhouette you want. If you&apos;re unsure which font fits, we show examples side by side.</li>
        <li><strong>Proofread</strong>. Every character is verified against authoritative sources — especially for Quranic text. Mistakes here can&apos;t be corrected without recasting.</li>
        <li><strong>CAD rendering</strong>. You see a 3D preview of your exact piece before anything is cast. Unlimited revisions until approved.</li>
        <li><strong>Casting &amp; setting</strong>. Cast in your chosen metal. Diamond setting, if chosen, is done by hand in our Toronto studio.</li>
        <li><strong>Final inspection</strong>. Mohammad personally inspects every Arabic piece before it leaves the studio.</li>
      </ol>

      <h2>Why the craftsman matters</h2>
      <p>
        Many jewelers will accept an Arabic calligraphy commission by running the text through a font converter and casting whatever comes out. That produces shapes that approximate Arabic but don&apos;t read correctly — letters disconnect where they should join, proportions feel cramped, and religious text sometimes renders with errors.
      </p>
      <p>
        Our master jeweler, Mohammad Al-Asali, hand-verifies every Arabic piece and personally adjusts the calligraphy where the font rendering needs correcting. It&apos;s slower. It&apos;s why we&apos;re the first stop for Arabic calligraphy commissions across the GTA.
      </p>

      <h2>Book a consultation</h2>
      <p>
        Whether you have a specific verse in mind, a family member&apos;s handwriting you want preserved in gold, or just an idea — we&apos;ll walk you through it. Consultations are free — virtual via Zoom, phone, or message, or in-person in Toronto by appointment.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([article, breadcrumb, faqSchema]) }}
      />
    </BlogLayout>
  )
}
