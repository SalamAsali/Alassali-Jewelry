import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import { neighbourhoodSlugs } from './(frontend)/toronto/[slug]/neighbourhoods'
import { gtaCitySlugs } from './(frontend)/gta/[slug]/cities'

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
  'general',
]

const blogSlugs = [
  'custom-engagement-ring-cost-toronto-2026',
  'grillz-price-guide-toronto-2026',
  'lab-grown-vs-natural-diamonds-toronto',
  'arabic-calligraphy-jewellery-toronto',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/catalog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about/master-jeweller/mohammad-al-assali`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/service-areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const bespokePages: MetadataRoute.Sitemap = bespokeSlugs.map((slug) => ({
    url: `${BASE}/custom/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: slug === 'general' ? 0.8 : 0.9,
  }))

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const torontoPages: MetadataRoute.Sitemap = neighbourhoodSlugs.map((slug) => ({
    url: `${BASE}/toronto/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const gtaPages: MetadataRoute.Sitemap = gtaCitySlugs.map((slug) => ({
    url: `${BASE}/gta/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...bespokePages, ...blogPages, ...torontoPages, ...gtaPages]
}
