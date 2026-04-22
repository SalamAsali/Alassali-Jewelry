import type { Metadata } from 'next'
import BlogLayout from '@/components/blog/BlogLayout'
import { buildArticleSchema } from '@/lib/seo/article'
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const SLUG = 'grillz-price-guide-toronto-2026'
const TITLE = 'How Much Do Custom Grillz Cost in Toronto? (2026 Price Guide)'
const DESCRIPTION = 'A Toronto custom jeweller\'s real 2026 pricing for gold grillz, diamond grillz, VVS grillz, and full sets. Straight numbers, no generic ranges.'
const DATE = '2026-04-17'

export const metadata: Metadata = {
  title: 'Custom Grillz Price Guide Toronto 2026 | Al-Assali Jewelry',
  description: DESCRIPTION,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article' },
}

const faq = [
  { q: 'What\'s the cheapest grillz I can get in Toronto?', a: 'A single-tooth plain 10K gold grillz starts at $500. With VS diamond pavé it jumps to $1,400.' },
  { q: 'How much for a top 6 diamond grillz in Toronto?', a: 'Plain 10K gold top 6 from $2,000. Diamond-set VS from $4,500. VVS clarity from $6,500.' },
  { q: 'How much does a full diamond grillz set cost?', a: 'A full set (top + bottom, 12 teeth) plain 10K gold starts at $4,500. Diamond-set VS from $9,500. Fully iced-out VVS sets start at $14,000.' },
  { q: 'Why are VVS grillz more expensive than VS?', a: 'VVS diamonds have near-invisible inclusions and cost roughly 60-80% more than VS. They\'re brighter face-up but the difference is subtle to the untrained eye.' },
  { q: 'Is cubic zirconia ever used in grillz?', a: 'Never by us. Every stone we set is a genuine natural or lab-grown diamond, including VS and VVS clarity tiers.' },
]

export default function Page() {
  const article = buildArticleSchema({
    slug: SLUG,
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: DATE,
    keywords: ['grillz price Toronto', 'how much do grillz cost Toronto', 'VVS grillz Toronto', 'gold grillz price Canada'],
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
      subtitle="Real 2026 numbers for gold grillz, diamond grillz, and VVS full sets — from a working Toronto grillz studio."
      datePublished={DATE}
      readingMinutes={6}
      relatedLinks={[
        { label: 'Custom Grillz in Toronto', href: '/custom/grillz' },
        { label: 'Custom Gold Chains in Toronto', href: '/custom/chains' },
        { label: 'Meet the Master Jeweller', href: '/about/master-jeweller/mohammad-al-assali' },
      ]}
    >
      <p>
        Grillz pricing is one of the most confusing things to research online. Search results mix Toronto with US shops, plated knockoffs with real solid gold, and cubic zirconia with real VVS diamonds. This guide cuts through all of that with real 2026 pricing from our Toronto studio, broken down by configuration, karat, and diamond clarity.
      </p>

      <h2>Short answer: $500 to $15,000+</h2>
      <p>
        Single-tooth grillz start at $500. A plain gold full set starts at $4,500. A full diamond VVS set starts at $14,000 and scales with carat weight and coverage. Most of our Toronto clients spend between $2,000 and $7,500 on their grillz.
      </p>

      <h2>Price by teeth configuration (plain 10K gold)</h2>
      <table>
        <thead>
          <tr>
            <th>Configuration</th>
            <th>Plain 10K Gold</th>
            <th>Plain 14K Gold</th>
            <th>Diamond-Set VS (14K)</th>
            <th>Diamond-Set VVS (14K)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Single Tooth</td><td>$500</td><td>$700</td><td>$1,400</td><td>$1,900</td></tr>
          <tr><td>Fangs (pair)</td><td>$800</td><td>$1,100</td><td>$1,400</td><td>$2,000</td></tr>
          <tr><td>Top 6</td><td>$2,000</td><td>$2,800</td><td>$4,500</td><td>$6,500</td></tr>
          <tr><td>Bottom 6</td><td>$2,000</td><td>$2,800</td><td>$4,500</td><td>$6,500</td></tr>
          <tr><td>Top 8</td><td>$2,800</td><td>$3,800</td><td>$6,000</td><td>$8,500</td></tr>
          <tr><td>Full Set (12 teeth)</td><td>$4,500</td><td>$6,000</td><td>$9,500</td><td>$14,000</td></tr>
        </tbody>
      </table>
      <p>
        18K gold typically adds 15-20% over 14K, and rose or white gold costs the same as yellow for any tier. Add-on diamond dust finishes are +$300-$600 depending on coverage.
      </p>

      <h2>What actually drives the price</h2>
      <p>
        Three variables do all the work:
      </p>
      <ul>
        <li><strong>Gold weight &amp; karat</strong> — each tooth uses roughly 3-5 grams of solid gold depending on thickness and coverage. Plain gold grillz are priced primarily by gram weight × karat spot price + labour.</li>
        <li><strong>Diamond clarity</strong> — SI costs +10-15% over plain, VS +30-40%, VVS +60-80%, Flawless +120%+.</li>
        <li><strong>Coverage</strong> — open-face vs closed-face, and how many teeth get diamond coverage.</li>
      </ul>

      <h2>VS vs VVS: is VVS worth it?</h2>
      <p>
        VS (Very Slightly Included) diamonds have small inclusions visible under 10x magnification but look eye-clean face-up. VVS (Very, Very Slightly Included) have inclusions so small most jewellers struggle to find them under a loupe.
      </p>
      <p>
        Face-up on a grillz set, the visual difference between VS and VVS is subtle — the VVS set will sparkle noticeably brighter in direct light, and will hold its brilliance longer over time as it resists clouding. If you&apos;re going full-set iced out, VVS is worth the premium. If you&apos;re doing a top 6 or a single tooth, VS delivers near-identical aesthetics for 30-40% less.
      </p>

      <h2>What about cubic zirconia?</h2>
      <p>
        We don&apos;t use it. Ever. Every stone we set is a real natural or lab-grown diamond. CZ knockoffs are cheaper upfront ($800 for a CZ-set top 6 vs $4,500 for real VS diamonds) but they cloud within months, the plating wears through, and you can usually spot them in direct sunlight. If you see &quot;VVS grillz&quot; listed under $2,500, that&apos;s CZ or moissanite.
      </p>

      <h2>How the process works</h2>
      <ol>
        <li><strong>Mold appointment</strong> (~20 min at our Toronto studio). We take a dental-grade silicone impression of your teeth and cast it into a stone model.</li>
        <li><strong>Design consultation</strong>. Configuration, karat, diamond clarity, coverage, engraving, finish.</li>
        <li><strong>Crafting</strong>. Typically 1-2 weeks for plain gold, 3-4 weeks for full diamond-set sets.</li>
        <li><strong>Fitting</strong>. You come back in, we confirm the fit, adjust if needed.</li>
      </ol>
      <p>
        Total turnaround: 2-6 weeks depending on complexity.
      </p>

      <h2>Are grillz safe?</h2>
      <p>
        Custom removable grillz made from precise dental impressions are safe for short-to-medium term wear. We strongly recommend removing them before eating to protect both the grillz and your natural enamel, and brushing them separately daily. Don&apos;t sleep in them. Don&apos;t keep them in during dental appointments (easy X-ray interference).
      </p>
      <p>
        We don&apos;t offer permanent grillz because the dental-work involved introduces long-term enamel risk. If you&apos;re set on a permanent look, we&apos;ll discuss alternatives during consultation — some clients opt for thicker gold caps that grip more firmly without permanent bonding.
      </p>

      <h2>Why Al-Assali Jewelry for grillz in Toronto</h2>
      <ul>
        <li>Every piece handcrafted in our Toronto studio — not mass-produced overseas</li>
        <li>Real solid gold (10K / 14K / 18K) and real diamonds only — no CZ, no moissanite, no plating</li>
        <li>Transparent per-tooth pricing explained up front</li>
        <li>Precise dental-mold fit process at a private in-person session in Toronto (by appointment) or via a mail-in mold kit for out-of-area clients</li>
        <li>Specialized in both Toronto-style iced-out sets and cleaner minimalist pieces</li>
      </ul>

      <h2>Book your grillz mold appointment</h2>
      <p>
        We are a Toronto-based bespoke atelier, appointment only. Book by phone or through our custom inquiry form. Free virtual consultation up front — if you want to proceed, we&apos;ll schedule a private in-person mold session in Toronto or ship you a mail-in mold kit, then walk through pricing and you decide.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([article, breadcrumb, faqSchema]) }}
      />
    </BlogLayout>
  )
}
