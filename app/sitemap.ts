import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const BASE = SITE_CONFIG.url

const bespokeSlugs = [
  'engagement-rings',
  'wedding-bands',
  'rings',
  'pendants',
  'chains',
  'earrings',
  'bracelets',
  'grillz',
]

const blogSlugs = [
  'custom-engagement-ring-cost-toronto-2026',
  'grillz-price-guide-toronto-2026',
  'lab-grown-vs-natural-diamonds-toronto',
  'arabic-calligraphy-jewellery-toronto',
]

const chainMetals = ['yellow-gold', 'white-gold', 'rose-gold', 'two-tone']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about/master-jeweller/mohammad-al-assali`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  // Bespoke service pages (Toronto-targeted)
  const bespokePages: MetadataRoute.Sitemap = bespokeSlugs.map((slug) => ({
    url: `${BASE}/custom-${slug}-toronto`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Gold chains collection pages
  const chainPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/chains`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    ...chainMetals.map((metal) => ({
      url: `${BASE}/chains/${metal}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ]

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Oakville location page
  const locationPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/oakville`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  return [...staticPages, ...bespokePages, ...chainPages, ...blogPages, ...locationPages]
}
