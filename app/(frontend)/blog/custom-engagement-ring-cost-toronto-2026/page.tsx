import type { Metadata } from 'next'
import BlogLayout from '@/components/blog/BlogLayout'
import { buildArticleSchema } from '@/lib/seo/article'
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const SLUG = 'custom-engagement-ring-cost-toronto-2026'
const TITLE = 'How Much Does a Custom Engagement Ring Cost in Toronto? (2026 Guide)'
const DESCRIPTION = 'A real Toronto jeweller breaks down exactly what a custom engagement ring costs in 2026 — by style, metal, diamond origin, and carat weight. No generic ranges.'
const DATE = '2026-04-17'

export const metadata: Metadata = {
  title: 'Custom Engagement Ring Cost Toronto 2026 | Al-Assali Jewelry',
  description: DESCRIPTION,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article' },
}

const faq = [
  { q: 'What\'s the cheapest custom engagement ring you can make in Toronto?', a: 'Our most accessible custom engagement ring is a 0.5ct lab-grown solitaire in 14K gold, starting at $1,800. Smaller stones or 10K gold bring this closer to $1,200.' },
  { q: 'Is lab-grown cheaper than natural for the same look?', a: 'Yes — typically 40-60% cheaper carat-for-carat. A 1ct lab-grown solitaire in 14K gold costs around $2,800 vs $6,500 for the natural equivalent.' },
  { q: 'Does gold karat affect engagement ring price a lot?', a: 'Yes — higher karats cost more. 14K to 18K gold adds roughly 15-20% to the setting cost; platinum adds 30-40% over 14K gold.' },
  { q: 'How much more does a halo add over a solitaire?', a: 'Expect $800-$1,500 extra for a pavé halo, depending on the stone count and metal. A diamond halo dramatically increases perceived size.' },
  { q: 'Do you include taxes in the price?', a: 'Prices quoted are pre-HST. Ontario HST (13%) applies to the final total.' },
]

export default function Page() {
  const article = buildArticleSchema({
    slug: SLUG,
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: DATE,
    keywords: ['custom engagement ring cost Toronto', 'how much does a custom engagement ring cost', 'engagement ring price Toronto', 'lab grown diamond price Toronto'],
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
      subtitle="No generic ranges — real starting prices by style, metal, and diamond origin, from a working Toronto custom jeweller."
      datePublished={DATE}
      readingMinutes={7}
      relatedLinks={[
        { label: 'Custom Engagement Rings in Toronto', href: '/custom/engagement-rings' },
        { label: 'Custom Wedding Bands in Toronto', href: '/custom/wedding-bands' },
        { label: 'Meet the Master Jeweller', href: '/about/master-jeweller/mohammad-al-assali' },
      ]}
    >
      <p>
        If you&apos;re shopping for a custom engagement ring in Toronto, price anxiety is usually the biggest blocker. Most jewellers bury the number behind &quot;starting at&quot; language or redirect you to a consultation before they&apos;ll quote. This guide doesn&apos;t do that.
      </p>
      <p>
        Below is exactly how we price custom engagement rings at Al-Assali Jewelry Studio in Toronto in 2026 — by style, metal, diamond origin, and carat weight. Every price is pre-HST and assumes a G-H colour, VS clarity stone unless noted. Your quote may vary slightly with gold spot rates and premium stone upgrades, but these are the real numbers you&apos;ll see on our sheet.
      </p>

      <h2>Short answer: $1,800 to $15,000+</h2>
      <p>
        Most of our custom engagement rings fall between <strong>$2,800 and $7,500</strong>. The cheapest ring we can craft is $1,800 (0.5ct lab-grown solitaire in 14K gold). At the high end, heirloom-quality natural diamond rings can exceed $25,000.
      </p>
      <p>
        The four variables that set your final price:
      </p>
      <ul>
        <li><strong>Diamond origin</strong> — lab-grown vs natural, roughly 2.5-3× cost difference</li>
        <li><strong>Carat weight</strong> — non-linear; 2ct is more than 2× the price of 1ct</li>
        <li><strong>Metal</strong> — 10K gold → 14K → 18K → platinum, each tier adds cost</li>
        <li><strong>Style complexity</strong> — solitaire → halo → three-stone → custom design</li>
      </ul>

      <h2>Cost by style (14K gold, pre-HST)</h2>
      <table>
        <thead>
          <tr>
            <th>Style</th>
            <th>Lab-Grown (1ct centre)</th>
            <th>Natural (1ct centre)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Solitaire (4- or 6-prong)</td><td>$2,800</td><td>$6,500</td></tr>
          <tr><td>Halo (pavé)</td><td>$3,800</td><td>$7,500</td></tr>
          <tr><td>Three-Stone (1ct + 0.5ct × 2)</td><td>$4,500</td><td>$9,500</td></tr>
          <tr><td>Vintage / Art Deco</td><td>$4,200</td><td>$8,800</td></tr>
          <tr><td>Bezel Set</td><td>$3,200</td><td>$7,000</td></tr>
          <tr><td>Toi et Moi</td><td>$5,200</td><td>$11,500</td></tr>
        </tbody>
      </table>

      <h2>Cost by metal (solitaire, 1ct natural centre)</h2>
      <table>
        <thead>
          <tr>
            <th>Metal</th>
            <th>Starting From</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>10K Gold</td><td>$5,800</td><td>Most affordable, most durable gold</td></tr>
          <tr><td>14K Gold</td><td>$6,500</td><td>Our most popular — best value-to-quality</td></tr>
          <tr><td>18K Gold</td><td>$7,500</td><td>Richest yellow, softer, higher gold content</td></tr>
          <tr><td>Platinum</td><td>$8,200</td><td>Hypoallergenic, most durable, most premium</td></tr>
        </tbody>
      </table>

      <h2>Cost by carat weight (natural, 14K solitaire)</h2>
      <table>
        <thead>
          <tr>
            <th>Carat Weight</th>
            <th>Lab-Grown</th>
            <th>Natural</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>0.5ct</td><td>$1,800</td><td>$3,500</td></tr>
          <tr><td>0.75ct</td><td>$2,200</td><td>$4,500</td></tr>
          <tr><td>1.0ct</td><td>$2,800</td><td>$6,500</td></tr>
          <tr><td>1.5ct</td><td>$3,800</td><td>$10,500</td></tr>
          <tr><td>2.0ct</td><td>$5,200</td><td>$16,500</td></tr>
          <tr><td>3.0ct</td><td>$8,500</td><td>$32,000+</td></tr>
        </tbody>
      </table>

      <h2>Lab-grown vs natural — what should you choose?</h2>
      <p>
        Both are real diamonds with identical optical, physical, and chemical properties. The choice comes down to priorities:
      </p>
      <ul>
        <li><strong>Want the biggest visible stone for your budget?</strong> Lab-grown. You&apos;ll get roughly double the carat for the same spend.</li>
        <li><strong>Want long-term resale value and heirloom sentiment?</strong> Natural. Lab-grown stones have a limited secondary market; naturals hold value over decades.</li>
        <li><strong>Want absolute ethical peace of mind?</strong> Both work. Our naturals ship with Kimberley Process and SCS certification; lab-grown has zero mining impact.</li>
      </ul>
      <p>
        For our Toronto clients, the split is roughly 60/40 lab-grown to natural in 2026 — up from 40/60 three years ago. Most couples want the bigger look.
      </p>

      <h2>What&apos;s included in our quote</h2>
      <p>
        Every custom engagement ring at Al-Assali Jewelry includes:
      </p>
      <ul>
        <li>Free consultation (in-studio or virtual)</li>
        <li>Unlimited 3D CAD renderings and revisions until approved</li>
        <li>Wax or resin model before final casting</li>
        <li>Hand-setting by our master jeweller</li>
        <li>GIA (natural) or IGI/GCAL (lab-grown) diamond certification</li>
        <li>Luxury presentation box</li>
        <li>Lifetime free cleanings, polishing, and inspections</li>
        <li>Free resizing within the first year</li>
      </ul>

      <h2>How long does it take?</h2>
      <p>
        Our standard timeline is 4-6 weeks from design approval. Simpler solitaires can be completed in 3-4 weeks; three-stone and heavily pavé designs take 5-6. Rush orders can be accommodated in 2-3 weeks for an additional fee — helpful when you&apos;ve already picked a proposal date.
      </p>

      <h2>Why our prices are competitive</h2>
      <p>
        We craft every ring in-house in Toronto — no outsourcing, no middlemen, no broker markup. That means your dollars go into the stone and the craftsmanship, not into intermediaries. We also quote line-by-line (diamond cost, metal cost, setting labour, CAD fee, finishing) so you can see exactly where your money is going.
      </p>

      <h2>Ready to start?</h2>
      <p>
        Book a free consultation at our Toronto studio on Vaughan Rd, or schedule a virtual call. We&apos;ll walk through stones, settings, and styles until we find the ring you want — and the price you&apos;re comfortable with.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([article, breadcrumb, faqSchema]) }}
      />
    </BlogLayout>
  )
}
