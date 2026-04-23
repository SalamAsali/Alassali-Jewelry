import type { Metadata } from 'next'
import BlogLayout from '@/components/blog/BlogLayout'
import { buildArticleSchema } from '@/lib/seo/article'
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const SLUG = 'lab-grown-vs-natural-diamonds-toronto'
const TITLE = 'Lab-Grown vs Natural Diamonds in Toronto: A Jeweller\'s Honest 2026 Guide'
const DESCRIPTION = 'Lab-grown or natural? A working Toronto jeweller explains the real differences, prices, ethics, and resale value — without sales pressure.'
const DATE = '2026-04-17'

export const metadata: Metadata = {
  title: 'Lab-Grown vs Natural Diamonds Toronto 2026 | Al-Assali Jewelry',
  description: DESCRIPTION,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article' },
}

const faq = [
  { q: 'Are lab-grown diamonds real diamonds?', a: 'Yes. Lab-grown diamonds are chemically, physically, and optically identical to mined diamonds. Only highly specialized machines can tell them apart.' },
  { q: 'Which is cheaper for the same carat size?', a: 'Lab-grown is 40-60% cheaper than natural at the same 4C specs. A 1ct lab-grown solitaire costs around $2,800 vs $6,500 for natural in 14K gold.' },
  { q: 'Do lab-grown diamonds hold value?', a: 'Not well. The resale market is limited and lab-grown values have dropped ~70% since 2020. Natural diamonds hold value better over decades.' },
  { q: 'Are lab-grown diamonds more ethical than natural?', a: 'Neither is automatically more ethical. Lab-grown has zero mining impact but uses significant energy. Our natural diamonds are Kimberley Process and SCS-certified conflict-free.' },
  { q: 'Can you tell lab-grown from natural by looking?', a: 'No — not with the naked eye, a jeweller\'s loupe, or most handheld testers. Professional gemmological equipment can detect the difference.' },
]

export default function Page() {
  const article = buildArticleSchema({
    slug: SLUG,
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: DATE,
    keywords: ['lab grown vs natural diamond Toronto', 'lab diamond Toronto', 'are lab grown diamonds real', 'lab diamond resale value'],
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
      subtitle="Both are real diamonds. Here's how to choose — without the sales pitch."
      datePublished={DATE}
      readingMinutes={8}
      relatedLinks={[
        { label: 'Custom Engagement Rings in Toronto', href: '/custom/engagement-rings' },
        { label: 'Custom Engagement Ring Cost Guide', href: '/blog/custom-engagement-ring-cost-toronto-2026' },
        { label: 'Meet the Master Jeweller', href: '/about/master-jeweller/mohammad-al-assali' },
      ]}
    >
      <p>
        Lab-grown diamonds went from &quot;what are those?&quot; to 60% of our engagement ring orders in under five years. Every week a couple walks into our Toronto studio asking the same question: lab or natural?
      </p>
      <p>
        There is no universally right answer. This guide gives you the real differences and helps you pick based on what actually matters to you — not what a jeweller is trying to sell you.
      </p>

      <h2>The short version</h2>
      <ul>
        <li><strong>Same properties.</strong> Both are real diamonds — same carbon lattice, same hardness (Mohs 10), same brilliance, same fire.</li>
        <li><strong>Price.</strong> Lab-grown costs 40-60% less at identical 4C specs.</li>
        <li><strong>Resale.</strong> Natural holds value over decades. Lab-grown values have dropped ~70% since 2020 and the secondary market is weak.</li>
        <li><strong>Ethics.</strong> Lab-grown has zero mining impact but uses energy. Certified natural (Kimberley Process + SCS) is conflict-free.</li>
        <li><strong>Sentiment.</strong> Natural formed over billions of years. Lab-grown grew in a few weeks under pressure.</li>
      </ul>

      <h2>What exactly is a lab-grown diamond?</h2>
      <p>
        Lab-grown diamonds are real diamonds produced in laboratory conditions that mimic the heat and pressure that form natural diamonds underground. Two methods are used today:
      </p>
      <ul>
        <li><strong>HPHT (High Pressure High Temperature)</strong> — mimics deep-earth conditions; used for smaller and coloured diamonds.</li>
        <li><strong>CVD (Chemical Vapour Deposition)</strong> — grows diamonds layer by layer from carbon-rich gas; dominant method for colourless gem-quality stones.</li>
      </ul>
      <p>
        Both produce 100% real diamonds. The GIA, IGI, and GCAL all certify lab-grown diamonds — with reports that look nearly identical to natural diamond reports.
      </p>

      <h2>Head-to-head comparison</h2>
      <table>
        <thead>
          <tr><th>Attribute</th><th>Natural</th><th>Lab-Grown</th></tr>
        </thead>
        <tbody>
          <tr><td>Chemical composition</td><td>Carbon (C)</td><td>Carbon (C)</td></tr>
          <tr><td>Hardness (Mohs)</td><td>10</td><td>10</td></tr>
          <tr><td>Brilliance / fire</td><td>Identical</td><td>Identical</td></tr>
          <tr><td>Certification</td><td>GIA (standard)</td><td>GIA & IGI</td></tr>
          <tr><td>Price (1ct, G VS1)</td><td>~$6,500</td><td>~$2,800</td></tr>
          <tr><td>Price per carat trend</td><td>Stable / rising</td><td>Falling year over year</td></tr>
          <tr><td>Resale value</td><td>Good over decades</td><td>Limited secondary market</td></tr>
          <tr><td>Ethical sourcing</td><td>KP + SCS certified</td><td>No mining impact</td></tr>
          <tr><td>Energy use</td><td>Mining energy</td><td>Electricity (CVD/HPHT)</td></tr>
          <tr><td>Sentiment / story</td><td>Billions of years old</td><td>Grown in weeks</td></tr>
          <tr><td>Size for budget</td><td>Smaller for $</td><td>~2× larger for $</td></tr>
        </tbody>
      </table>

      <h2>When to choose lab-grown</h2>
      <p>
        Lab-grown makes sense when:
      </p>
      <ul>
        <li>You want the biggest visible stone for your budget</li>
        <li>You&apos;re OK with the diamond being &quot;new&quot; vs ancient</li>
        <li>Zero-mining-impact matters to you more than long-term resale</li>
        <li>You want VVS clarity at a price you&apos;d pay for VS natural</li>
        <li>You&apos;re buying a tennis bracelet, studs, or anniversary piece where resale isn&apos;t primary</li>
      </ul>

      <h2>When to choose natural</h2>
      <p>
        Natural makes sense when:
      </p>
      <ul>
        <li>Long-term resale value matters (heirloom engagement rings)</li>
        <li>You care about the geological history — formed deep underground over billions of years</li>
        <li>You want it to hold value through economic cycles</li>
        <li>You&apos;re resetting a family stone into a new piece</li>
        <li>You want the classic engagement-ring symbolism</li>
      </ul>

      <h2>The resale question — worth understanding</h2>
      <p>
        Lab-grown diamond prices have dropped dramatically since 2020. A 1ct CVD lab-grown that sold for $5,200 in 2021 now retails for about $2,800. That&apos;s great if you&apos;re buying today, but it means if you buy a lab-grown now and try to sell or upgrade it in five years, you&apos;ll take a significant hit.
      </p>
      <p>
        Natural diamonds have a limited but real secondary market. A 1ct GIA-graded natural loses roughly 30-50% of retail when sold, but that&apos;s been stable for decades. Lab-grown doesn&apos;t yet have a mature secondary market at all.
      </p>
      <p>
        Put plainly: if you&apos;re buying an engagement ring you expect to pass to a child, natural is the safer choice. If you&apos;re buying a tennis bracelet or studs to wear for a decade, lab-grown is the better value.
      </p>

      <h2>What we recommend at our Toronto studio</h2>
      <p>
        For our Toronto clients, the rule of thumb we suggest:
      </p>
      <ul>
        <li><strong>Engagement rings</strong>: Natural if you want heirloom value; lab-grown if bigger-for-budget matters more.</li>
        <li><strong>Tennis bracelets, studs, anniversary bands</strong>: Lab-grown almost always. 3-5× the stone for the same spend.</li>
        <li><strong>Grillz</strong>: Either works. Most clients pick lab-grown for price; some pick natural for status.</li>
        <li><strong>Pendants, earrings, right-hand rings</strong>: Lab-grown usually wins. These aren&apos;t typically resold.</li>
      </ul>

      <h2>How we source at Al-Assali Jewelry</h2>
      <p>
        We stock both lab-grown and natural diamonds at our Toronto studio. Every natural diamond over 0.5ct ships with a GIA grading report. Every lab-grown over 0.5ct ships with an IGI or GCAL report. During your consultation we compare loose stones of both — on camera in high resolution, or in person by appointment in Toronto. Most couples change their mind at least once after seeing them side by side.
      </p>

      <h2>Book a consultation</h2>
      <p>
        No pressure, no sales script. Book a free virtual consultation — or come meet us in Toronto by appointment. We&apos;ll walk through the trade-offs that matter to you, pull loose stones in both categories, and help you choose with eyes open.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([article, breadcrumb, faqSchema]) }}
      />
    </BlogLayout>
  )
}
