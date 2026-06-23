import type { Metadata } from 'next'

import NextLink from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import { getBlogIndex, BlogPostSummary } from '@/lib/getBlog'

const FALLBACK_HEADING = 'Jewelry Guides'
const FALLBACK_INTRO =
  'Straight answers on pricing, craftsmanship, and how to shop for custom jewelry in Toronto — from our master jeweler.'
const FALLBACK_SEO_TITLE = 'Custom Jewelry Guides & Toronto Jeweler Insights | Al-Asali Jewelry'
const FALLBACK_SEO_DESCRIPTION =
  "Expert guides from Toronto's bespoke jeweler: custom engagement ring costs, grillz pricing, lab-grown vs natural diamonds, and more."

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Engagement Rings': { bg: 'bg-[#B89778]/10', text: 'text-[#B89778]', border: 'border-[#B89778]/40', dot: 'bg-[#B89778]' },
  'Grillz': { bg: 'bg-[#8E9196]/10', text: 'text-[#A3A7AC]', border: 'border-[#8E9196]/40', dot: 'bg-[#A3A7AC]' },
  'Diamonds': { bg: 'bg-[#D4CFC5]/10', text: 'text-[#D4CFC5]', border: 'border-[#D4CFC5]/30', dot: 'bg-[#D4CFC5]' },
  'Heritage': { bg: 'bg-[#8B7D6B]/10', text: 'text-[#8B7D6B]', border: 'border-[#8B7D6B]/40', dot: 'bg-[#8B7D6B]' },
}

const FALLBACK_POSTS: BlogPostSummary[] = [
  {
    id: 'custom-engagement-ring-cost-toronto-2026',
    slug: 'custom-engagement-ring-cost-toronto-2026',
    title: 'How Much Does a Custom Engagement Ring Cost in Toronto? (2026 Guide)',
    excerpt: 'No generic ranges — real starting prices by style, metal, and diamond origin, from a working Toronto custom jeweler.',
    date: '2026-04-17',
    readingMinutes: 7,
    tag: 'Engagement Rings',
    coverImage: '/blog/custom-engagement-ring-cost-toronto-2026-cover.png',
    coverImageAlt: 'Custom engagement ring cost Toronto 2026 — pricing by style table from solitaire to toi et moi',
  },
  {
    id: 'grillz-price-guide-toronto-2026',
    slug: 'grillz-price-guide-toronto-2026',
    title: 'How Much Do Custom Grillz Cost in Toronto? (2026 Price Guide)',
    excerpt: 'Real 2026 numbers for gold grillz, diamond grillz, and VVS full sets — from a working Toronto grillz studio.',
    date: '2026-04-17',
    readingMinutes: 6,
    tag: 'Grillz',
    coverImage: '/blog/grillz-price-guide-toronto-2026-cover.png',
    coverImageAlt: 'Custom grillz price guide Toronto 2026 — pricing from single tooth $500 to full VVS set $14,000',
  },
  {
    id: 'lab-grown-vs-natural-diamonds-toronto',
    slug: 'lab-grown-vs-natural-diamonds-toronto',
    title: "Lab-Grown vs Natural Diamonds in Toronto: A Jeweler's Honest 2026 Guide",
    excerpt: "Both are real diamonds. Here's how to choose — without the sales pitch.",
    date: '2026-04-17',
    readingMinutes: 8,
    tag: 'Diamonds',
    coverImage: '/blog/lab-grown-vs-natural-diamonds-toronto-cover.png',
    coverImageAlt: 'Lab-grown vs natural diamonds Toronto 2026 — 11-attribute head-to-head comparison',
  },
  {
    id: 'arabic-calligraphy-jewellery-toronto',
    slug: 'arabic-calligraphy-jewellery-toronto',
    title: "Arabic Calligraphy Jewelry in Toronto: A Craftsman's Guide",
    excerpt: 'Arabic calligraphy pendants, rings, and engravings — explained by a Toronto custom jeweler. Fonts, verses, meanings, prices, and what to ask for.',
    date: '2026-04-19',
    readingMinutes: 7,
    tag: 'Heritage',
    coverImage: '/blog/arabic-calligraphy-jewelry-toronto-cover.png',
    coverImageAlt: 'Arabic calligraphy jewelry Toronto 2026 — pricing guide for name pendants, Allah, Ayat al-Kursi',
  },
]

const ALL_CATEGORIES = ['All', 'Engagement Rings', 'Grillz', 'Diamonds', 'Heritage']

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

  const featured = posts[0]

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
  ])

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {heading}
          </h1>
          <p className="text-lg text-stone leading-relaxed whitespace-pre-line">{intro}</p>
        </header>

        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {ALL_CATEGORIES.map((cat) => {
            const colors = CATEGORY_COLORS[cat]
            if (cat === 'All') {
              return (
                <span key={cat} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border border-glacier-grey/40 text-glacier-grey-light bg-charcoal/50">
                  All Guides
                </span>
              )
            }
            return (
              <span key={cat} className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                {cat}
              </span>
            )
          })}
        </div>

        {/* Featured post — horizontal compact layout */}
        {featured && (
          <NextLink
            href={`/blog/${featured.slug}`}
            className="group flex flex-col md:flex-row gap-0 bg-charcoal/50 border border-glacier-grey/25 rounded-2xl overflow-hidden hover:border-glacier-grey/60 hover:bg-charcoal transition-all mb-6"
          >
            {(featured as any).coverImage && (
              <div className="md:w-80 flex-shrink-0">
                <img
                  src={(featured as any).coverImage}
                  alt={(featured as any).coverImageAlt ?? featured.title}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs text-glacier-grey mb-3">
                {featured.tag && (() => {
                  const colors = CATEGORY_COLORS[featured.tag]
                  return colors ? (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {featured.tag}
                    </span>
                  ) : (
                    <span className="bg-glacier-grey/10 border border-glacier-grey/20 px-3 py-1 rounded-full">{featured.tag}</span>
                  )
                })()}
                {featured.date && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featured.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                )}
                {featured.readingMinutes && <><span>·</span><span>{featured.readingMinutes} min read</span></>}
                <span className="text-xs uppercase tracking-widest border border-glacier-grey/30 px-2 py-0.5 rounded text-glacier-grey">Featured</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-glacier-grey-light transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                {featured.title}
              </h2>
              {featured.excerpt && <p className="text-stone text-sm leading-relaxed mb-4">{featured.excerpt}</p>}
              <span className="inline-flex items-center gap-1 text-glacier-grey text-sm font-medium group-hover:gap-2 transition-all">
                Read the guide <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </NextLink>
        )}

        {/* Remaining posts */}
        <div className="space-y-4">
          {posts.slice(1).map((post) => {
            const colors = post.tag ? CATEGORY_COLORS[post.tag] : null
            const cover = (post as any).coverImage
            return (
              <NextLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row gap-0 bg-charcoal/50 border border-glacier-grey/20 rounded-2xl overflow-hidden hover:border-glacier-grey/60 hover:bg-charcoal transition-all"
              >
                {cover && (
                  <div className="sm:w-56 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover}
                      alt={(post as any).coverImageAlt ?? post.title}
                      width={448}
                      height={252}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-glacier-grey mb-2.5">
                    {post.tag && colors ? (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                        {post.tag}
                      </span>
                    ) : post.tag ? (
                      <span className="bg-glacier-grey/10 border border-glacier-grey/20 px-3 py-1 rounded-full">{post.tag}</span>
                    ) : null}
                    {post.date && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                    {post.readingMinutes && <><span>·</span><span>{post.readingMinutes} min read</span></>}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-white mb-1.5 group-hover:text-glacier-grey-light transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                    {post.title}
                  </h2>
                  {post.excerpt && <p className="text-stone text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>}
                  <span className="inline-flex items-center gap-1 text-glacier-grey text-sm font-medium group-hover:gap-2 transition-all">
                    Read the guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </NextLink>
            )
          })}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </div>
    </div>
  )
}
