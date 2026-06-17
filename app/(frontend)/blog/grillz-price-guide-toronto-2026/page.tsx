import type { Metadata } from 'next'

import BlogLayout from '@/components/blog/BlogLayout'
import { buildArticleSchema } from '@/lib/seo/article'
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const SLUG = 'grillz-price-guide-toronto-2026'
const TITLE = 'How Much Do Custom Grillz Cost in Toronto? (2026 Price Guide)'
const DESCRIPTION = 'A Toronto custom jeweler explains what drives the cost of gold grillz and diamond grillz — karat, coverage, diamond grade, and finish.'
const DATE = '2026-04-17'
const COVER = '/blog/grillz-price-guide-toronto-2026-cover.svg'
const COVER_ALT = 'Custom grillz price guide Toronto 2026 — what affects cost: gold karat, diamond clarity, coverage and number of teeth, Al-Asali Custom Jewelry'

export const metadata: Metadata = {
  title: 'Custom Grillz Price Guide Toronto 2026',
  description: DESCRIPTION,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', images: [COVER], url: `/blog/${SLUG}`, locale: 'en_CA', siteName: 'Al-Asali Jewelry' },
}

const faq = [
  { q: 'What\'s the cheapest grillz I can get in Toronto?', a: 'A single-tooth plain 10K gold grillz is our most accessible option. The price varies with gold spot rates and any stone work — book a free consultation and we\'ll quote you directly.' },
  { q: 'How much for a top 6 diamond grillz in Toronto?', a: 'Top 6 grillz span a wide range depending on karat, diamond clarity (VS vs VVS), and coverage style. Contact us with your specs for a custom quote.' },
  { q: 'How much does a full diamond grillz set cost?', a: 'Full sets (top + bottom, typically 12 teeth) vary significantly based on karat, diamond grade, and whether you want full iced-out coverage or selective stone placement. Reach out for a quote.' },
  { q: 'Why are VVS grillz more expensive than VS?', a: 'VVS diamonds have near-invisible inclusions and sparkle noticeably brighter than VS. They cost more per carat, which adds up across a full set. The visual difference is most apparent in direct light and at scale.' },
  { q: 'Is cubic zirconia ever used in grillz?', a: 'Never by us. Every stone we set is a genuine natural or lab-grown diamond, including VS and VVS clarity tiers.' },
]

export default function Page() {
  const article = buildArticleSchema({
    slug: SLUG,
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: DATE,
    imagePath: COVER,
    keywords: ['grillz price Toronto', 'how much do grillz cost Toronto', 'VVS grillz Toronto', 'gold grillz price Canada'],
    wordCount: 920,
    articleSection: 'Grillz',
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
      subtitle="Gold karat, diamond grade, coverage, and finish — what actually determines what you pay."
      datePublished={DATE}
      readingMinutes={6}
      category="Grillz"
      coverImage={COVER}
      coverImageAlt={COVER_ALT}
      relatedLinks={[
        { label: 'Custom Grillz in Toronto', href: '/custom-grillz' },
        { label: 'Custom Gold Chains in Toronto', href: '/custom-chains' },
        { label: 'Meet the Master Jeweler', href: '/about/master-jeweller/mohammad-al-assali' },
      ]}
    >
      <p>
        Grillz pricing is one of the most confusing things to research online. Search results mix Toronto with US shops, plated knockoffs with real solid gold, and cubic zirconia with genuine diamonds. This guide cuts through all of that — explaining what actually drives the cost of custom grillz so you can have a meaningful conversation before you commit.
      </p>

      <h2>The range is wide — here&apos;s why</h2>
      <p>
        Custom grillz prices span a wide spectrum, from a single plain gold tooth to a full iced-out VVS set. The gap isn&apos;t arbitrary — it reflects real differences in materials, coverage, and stone quality. A plain single-tooth piece and a full diamond-set VVS set are simply different products built from different materials.
      </p>
      <p>
        Four variables explain almost everything:
      </p>

      <h2>What actually drives the price</h2>

      <div className="my-8 rounded-xl overflow-hidden border border-glacier-grey/20 not-prose">
        <img
          src="/blog/grillz-price-guide-toronto-2026-price-drivers.svg"
          alt="What drives grillz pricing Toronto 2026 — four factors: metal karat (10K, 14K, 18K gold), diamond clarity (VS, VVS, Flawless), coverage (single tooth to full set), and finish style (solid, open-face, iced-out)"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </div>

      <ul>
        <li>
          <strong>Metal karat</strong> — 10K, 14K, or 18K. Each tooth uses several grams of solid gold; higher karat means higher gold content and higher cost. Plain gold grillz are priced primarily by gram weight × karat price + craftsmanship. Rose, white, and yellow gold are roughly the same price at any tier.
        </li>
        <li>
          <strong>Coverage</strong> — single tooth, fangs, top 6, top 8, or full set. More teeth covered means more gold and more stone work. The jump from top 6 to a full 12-tooth set is substantial.
        </li>
        <li>
          <strong>Diamond grade</strong> — plain gold has no diamond cost. VS diamonds are excellent value and look eye-clean. VVS diamonds are near-perfect and sparkle noticeably brighter. Flawless is the pinnacle. Each tier adds meaningful cost across a full set.
        </li>
        <li>
          <strong>Finish &amp; style</strong> — open-face (shows your natural tooth through the gold), closed/solid face, slab, or fully iced-out. Open-face is a popular modern aesthetic; iced-out maximises diamond surface and cost.
        </li>
      </ul>

      <h2>VS vs VVS: is VVS worth it?</h2>

      <div className="my-8 rounded-xl overflow-hidden border border-glacier-grey/20 not-prose">
        <img
          src="/blog/grillz-price-guide-toronto-2026-vs-vs-vvs.svg"
          alt="VS vs VVS vs Flawless diamonds in grillz Toronto 2026 — clarity comparison showing visual sparkle difference, inclusions under magnification, and which grade suits which style of grillz"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </div>

      <p>
        VS (Very Slightly Included) diamonds have small inclusions visible only under 10× magnification — eye-clean face-up. VVS (Very, Very Slightly Included) have inclusions so tiny most jewelers struggle to find them under a loupe — noticeably brighter in direct light.
      </p>
      <p>
        Face-up on a grillz set, VVS sparkles more and holds its brilliance longer over time. If you&apos;re going full-set iced out, VVS is worth the premium. If you&apos;re doing a top 6 or a single tooth, VS delivers near-identical aesthetics for less spend. Both are real diamonds; it comes down to how much the brilliance difference matters to you.
      </p>

      <h2>What about cubic zirconia?</h2>
      <p>
        We don&apos;t use it — ever. Every stone we set is a real natural or lab-grown diamond. CZ knockoffs are cheaper upfront but they cloud within months, the plating wears through, and the difference is visible in direct sunlight. If you see &quot;VVS grillz&quot; listed at a price that seems impossibly low, that&apos;s almost certainly CZ or moissanite.
      </p>

      <h2>How the process works</h2>
      <ol>
        <li><strong>Mold appointment</strong> (~20 min at our Toronto studio). We take a dental-grade silicone impression of your teeth and cast it into a stone model — the foundation of a proper fit.</li>
        <li><strong>Design consultation</strong>. Configuration, karat, diamond clarity, coverage, engraving, finish — we lock in every detail.</li>
        <li><strong>Crafting</strong>. Plain gold pieces typically take 1–2 weeks; full diamond-set sets take 3–4 weeks.</li>
        <li><strong>Fitting</strong>. You return to confirm fit and we adjust if needed before the final finish.</li>
      </ol>
      <p>
        Total turnaround: 2–6 weeks depending on complexity.
      </p>

      <h2>Are grillz safe?</h2>
      <p>
        Custom removable grillz made from precise dental impressions are safe for short-to-medium term wear. We recommend removing them before eating to protect both the grillz and your natural enamel, and cleaning them separately daily. Don&apos;t sleep in them.
      </p>
      <p>
        We don&apos;t offer permanent grillz because the dental work involved introduces long-term enamel risk. If you&apos;re set on a more permanent look, we&apos;ll discuss alternatives during consultation.
      </p>

      <h2>Why Al-Asali Jewelry for grillz in Toronto</h2>
      <ul>
        <li>Every piece handcrafted in our Toronto studio — not mass-produced overseas</li>
        <li>Real solid gold (10K / 14K / 18K) and real diamonds only — no CZ, no moissanite, no plating</li>
        <li>Transparent per-tooth pricing explained up front in your consultation</li>
        <li>Precise dental-mold fit taken in person at a by-appointment session in Toronto</li>
        <li>Specialized in both iced-out sets and cleaner minimalist pieces</li>
      </ul>

      <h2>Book your grillz mold appointment</h2>
      <p>
        Book by phone or through our custom inquiry form. Free consultation — we&apos;ll walk through all options and pricing virtually, and once you&apos;re ready we book a mold session in Toronto to take the impression in person.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([article, breadcrumb, faqSchema]) }}
      />
    </BlogLayout>
  )
}
