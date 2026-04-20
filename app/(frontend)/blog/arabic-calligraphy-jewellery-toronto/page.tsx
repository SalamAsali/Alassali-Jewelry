import type { Metadata } from 'next'
import BlogLayout from '@/components/blog/BlogLayout'
import { buildArticleSchema } from '@/lib/seo/article'
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const SLUG = 'arabic-calligraphy-jewellery-toronto'
const TITLE = 'Arabic Calligraphy Jewellery in Toronto: A Craftsman\'s Guide'
const DESCRIPTION = 'Arabic calligraphy pendants, rings, and engravings — explained by a Toronto custom jeweller. Fonts, verses, meanings, prices, and what to ask for.'
const DATE = '2026-04-19'

export const metadata: Metadata = {
  title: 'Arabic Calligraphy Jewellery Toronto | Al-Assali Jewelry',
  description: DESCRIPTION,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article' },
}

const faq = [
  { q: 'What Arabic calligraphy fonts do you work with?', a: 'Thuluth, Naskh, Diwani, Kufic, Ruqaʿa, and modern script calligraphy. We can also replicate a specific font from a reference you provide.' },
  { q: 'Can you engrave Arabic inside a wedding band?', a: 'Yes — inside or outside the band, any font. Popular choices include names, wedding dates, short verses, and meaningful words like Mashallah or Habibi.' },
  { q: 'How much does an Arabic calligraphy pendant cost?', a: 'Most custom Arabic pendants start at $1,800 in 14K gold for a straightforward name. Complex verses (Ayat al-Kursi, 99 Names) start around $3,500 due to letter density and setting time.' },
  { q: 'Will you verify the Arabic before casting?', a: 'Always. We proofread every Arabic piece, and for religious text we reference authoritative sources to ensure correct rendering before moving to CAD.' },
  { q: 'Can you work from my handwriting?', a: 'Yes — one of our favourite projects is converting a parent\'s or grandparent\'s handwritten Arabic into a pendant or band engraving.' },
]

export default function Page() {
  const article = buildArticleSchema({
    slug: SLUG,
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: DATE,
    keywords: ['Arabic calligraphy pendant Toronto', 'Allah pendant Toronto', 'Ayat al-Kursi pendant Toronto', 'Arabic jewellery Toronto', 'custom Arabic name pendant'],
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
      subtitle="Arabic calligraphy is one of our specialties. Here's how we craft it — the fonts, the prices, and what makes a piece authentic."
      datePublished={DATE}
      readingMinutes={7}
      relatedLinks={[
        { label: 'Custom Pendants in Toronto', href: '/custom/pendants' },
        { label: 'Custom Wedding Bands in Toronto', href: '/custom/wedding-bands' },
        { label: 'Meet the Master Jeweller', href: '/about/master-jeweller/mohammad-al-assali' },
      ]}
    >
      <p>
        Arabic calligraphy is a craft, not a font. When it&apos;s rendered correctly in jewellery, it flows — the strokes balance, the letters connect as the script demands, the proportions feel alive. When it&apos;s rendered poorly, it looks like a copy-pasted shape that happens to be in Arabic. The difference matters, especially for pieces that carry sacred text or a loved one&apos;s name.
      </p>
      <p>
        Al-Assali Jewelry Studio specializes in Arabic calligraphy jewellery in Toronto. This guide walks through the fonts we work with, the most-requested pieces, pricing, and what to ask for when you commission a piece.
      </p>

      <h2>The fonts we work with</h2>
      <p>
        Arabic calligraphy has several classical scripts, each suited to different moods and piece types:
      </p>
      <ul>
        <li><strong>Thuluth</strong> — The script of mosque walls and Quranic art. Dramatic, sweeping, tall. Best for Ayat al-Kursi pendants, Allah pendants, and statement verse pieces.</li>
        <li><strong>Naskh</strong> — The script of printed books and modern Arabic. Clean, readable, approachable. Best for everyday name pendants and casual pieces.</li>
        <li><strong>Diwani</strong> — Ottoman court script. Flowing, ornate, curled. Best for elegant name pendants, wedding band engravings, anniversary pieces.</li>
        <li><strong>Kufic</strong> — Ancient geometric script. Angular, architectural, striking. Best for bold contemporary pieces and logos.</li>
        <li><strong>Ruqaʿa</strong> — Everyday handwriting script. Informal, fluid. Best when replicating a family member&apos;s handwriting.</li>
        <li><strong>Modern / Contemporary</strong> — Not a classical script, but a popular aesthetic. Rounded, friendly, Instagram-ready. Best for casual name pendants.</li>
      </ul>

      <h2>Most-requested pieces</h2>
      <h3>Allah pendants</h3>
      <p>
        One of the most requested pieces in our Toronto studio. Classical renderings use Thuluth or Diwani script to emphasize the word&apos;s sacred weight. We craft Allah pendants in 10K, 14K, or 18K gold, plain or with pavé diamond outlines. Starting around $2,200 in 14K gold.
      </p>
      <h3>Ayat al-Kursi pendants</h3>
      <p>
        The Throne Verse — one of the most beloved verses of the Quran, often worn for protection. These pendants require careful proofreading of every character; we reference authoritative sources for the script before any CAD work begins. Oval or rectangular silhouettes are most popular. Starting around $3,500 in 14K gold given the letter density.
      </p>
      <h3>Name pendants</h3>
      <p>
        Custom Arabic name pendants are our single most popular category. You pick the font (Diwani and modern script are most requested), we render your name in gold or platinum — plain or diamond-set. Starting around $1,800 in 14K gold for straightforward names.
      </p>
      <h3>Wedding band engraving</h3>
      <p>
        Inside or outside engraving in Arabic is a signature choice for Muslim couples marrying in Toronto. Common engravings include each other&apos;s names, wedding dates in the Hijri calendar, Mashallah, or short verses. Engraving is free with most custom wedding bands.
      </p>
      <h3>Religious phrases</h3>
      <p>
        Bismillah, Mashallah, Subhanallah, Alhamdulillah, and the 99 Names of Allah. Each has its own traditional rendering we can match, or we can deliver a contemporary interpretation depending on your preference.
      </p>
      <h3>Arabic handwriting pieces</h3>
      <p>
        One of our most meaningful categories. Clients send us a handwritten phrase — from a parent, a grandparent, a loved one who has passed — and we render it in gold. The asymmetry and texture of real handwriting translates beautifully into jewellery.
      </p>

      <h2>What pricing looks like</h2>
      <table>
        <thead>
          <tr><th>Piece</th><th>10K Gold</th><th>14K Gold</th><th>Diamond-Set (14K)</th></tr>
        </thead>
        <tbody>
          <tr><td>Arabic Name (1–3 letters)</td><td>$1,400</td><td>$1,800</td><td>$2,800</td></tr>
          <tr><td>Arabic Name (4–6 letters)</td><td>$1,800</td><td>$2,300</td><td>$3,500</td></tr>
          <tr><td>Allah Pendant</td><td>$1,800</td><td>$2,200</td><td>$3,200</td></tr>
          <tr><td>Ayat al-Kursi Pendant</td><td>$2,800</td><td>$3,500</td><td>$5,500</td></tr>
          <tr><td>Handwriting Pendant</td><td>$1,800</td><td>$2,300</td><td>$3,500</td></tr>
          <tr><td>Wedding Band Engraving</td><td colSpan={3}>Included free with most custom wedding bands</td></tr>
        </tbody>
      </table>

      <h2>Our process for Arabic pieces</h2>
      <ol>
        <li><strong>Consultation</strong>. We discuss the text, font, and silhouette you want. If you&apos;re unsure which font fits, we show examples side by side in loose gold samples.</li>
        <li><strong>Proofread</strong>. Every character is verified against authoritative sources — especially for Quranic text. Mistakes here can&apos;t be fixed later without recasting.</li>
        <li><strong>CAD rendering</strong>. You see a 3D preview of your exact piece before anything is cast. Unlimited revisions until approved.</li>
        <li><strong>Casting &amp; setting</strong>. Cast in your chosen metal. Diamond setting, if chosen, is done by hand in our Toronto studio.</li>
        <li><strong>Final inspection</strong>. Mohammad personally inspects every Arabic piece before it leaves the studio.</li>
      </ol>

      <h2>Why the craftsman matters</h2>
      <p>
        Many jewellers will accept an Arabic calligraphy commission by running the text through a font converter and casting whatever comes out. That produces shapes that approximate Arabic but don&apos;t read correctly — letters disconnect where they should join, proportions feel cramped, and religious text sometimes renders with errors.
      </p>
      <p>
        Our master jeweller, Mohammad Al-Assali, hand-verifies every Arabic piece and personally adjusts the calligraphy where the font renders need correcting. It&apos;s slower. It&apos;s why we&apos;re the first stop for Arabic calligraphy commissions across the GTA.
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
