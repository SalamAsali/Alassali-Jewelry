import type { Metadata } from 'next'
import NextLink from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import { getBlogIndex, BlogPostSummary } from '@/lib/getBlog'

const FALLBACK_HEADING = 'Jewellery Guides'
const FALLBACK_INTRO =
  'Straight answers on pricing, craftsmanship, and how to shop for custom jewellery in Toronto — from our master jeweller.'
const FALLBACK_SEO_TITLE = 'Custom Jewellery Guides & Toronto Jeweller Insights | Al-Assali Jewelry'
const FALLBACK_SEO_DESCRIPTION =
  "Expert guides from Toronto's bespoke jeweller: custom engagement ring costs, grillz pricing, lab-grown vs natural diamonds, and more."

const FALLBACK_POSTS: BlogPostSummary[] = [
  {
    id: 'custom-engagement-ring-cost-toronto-2026',
    slug: 'custom-engagement-ring-cost-toronto-2026',
    title: 'How Much Does a Custom Engagement Ring Cost in Toronto? (2026 Guide)',
    excerpt: 'No generic ranges — real starting prices by style, metal, and diamond origin, from a working Toronto custom jeweller.',
    date: '2026-04-17',
    readingMinutes: 7,
    tag: 'Engagement Rings',
  },
  {
    id: 'grillz-price-guide-toronto-2026',
    slug: 'grillz-price-guide-toronto-2026',
    title: 'How Much Do Custom Grillz Cost in Toronto? (2026 Price Guide)',
    excerpt: 'Real 2026 numbers for gold grillz, diamond grillz, and VVS full sets — from a working Toronto grillz studio.',
    date: '2026-04-17',
    readingMinutes: 6,
    tag: 'Grillz',
  },
  {
    id: 'lab-grown-vs-natural-diamonds-toronto',
    slug: 'lab-grown-vs-natural-diamonds-toronto',
    title: "Lab-Grown vs Natural Diamonds in Toronto: A Jeweller's Honest 2026 Guide",
    excerpt: "Both are real diamonds. Here's how to choose — without the sales pitch.",
    date: '2026-04-17',
    readingMinutes: 8,
    tag: 'Diamonds',
  },
  {
    id: 'arabic-calligraphy-jewellery-toronto',
    slug: 'arabic-calligraphy-jewellery-toronto',
    title: "Arabic Calligraphy Jewellery in Toronto: A Craftsman's Guide",
    excerpt: 'Arabic calligraphy pendants, rings, and engravings — explained by a Toronto custom jeweller. Fonts, verses, meanings, prices, and what to ask for.',
    date: '2026-04-19',
    readingMinutes: 7,
    tag: 'Heritage',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getBlogIndex()
  return {
    title: cms?.page?.seoTitle?.trim() || FALLBACK_SEO_TITLE,
    description: cms?.page?.seoDescription?.trim() || FALLBACK_SEO_DESCRIPTION,
    alternates: { canonical: '/blog' },
  }
}

export default async function BlogIndex() {
  const cms = await getBlogIndex()
  const heading = cms?.page?.heading?.trim() || FALLBACK_HEADING
  const intro = cms?.page?.intro?.trim() || FALLBACK_INTRO
  const posts = cms && cms.posts.length > 0 ? cms.posts : FALLBACK_POSTS

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
  ])

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28">
        <header className="text-center mb-14 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {heading}
          </h1>
          <p className="text-lg text-stone leading-relaxed whitespace-pre-line">{intro}</p>
        </header>

        <div className="space-y-5">
          {posts.map((post) => (
            <NextLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-6 md:p-8 hover:border-glacier-grey/60 hover:bg-charcoal transition-all"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-glacier-grey mb-3">
                {post.tag ? (
                  <span className="bg-glacier-grey/10 border border-glacier-grey/20 px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                ) : null}
                {post.date ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                ) : null}
                {post.readingMinutes ? (
                  <>
                    <span>·</span>
                    <span>{post.readingMinutes} min read</span>
                  </>
                ) : null}
              </div>
              <h2
                className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-glacier-grey-light transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {post.title}
              </h2>
              {post.excerpt ? (
                <p className="text-stone text-sm leading-relaxed mb-3">{post.excerpt}</p>
              ) : null}
              <span className="inline-flex items-center gap-1 text-glacier-grey text-sm font-medium group-hover:gap-2 transition-all">
                Read the guide <ArrowRight className="w-4 h-4" />
              </span>
            </NextLink>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </div>
    </div>
  )
}
