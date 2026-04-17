import { SITE_CONFIG, MASTER_JEWELLER } from './siteConfig'

const FOUNDER_ID = `${SITE_CONFIG.url}/about/master-jeweller/${MASTER_JEWELLER.slug}#person`
const ORG_ID = `${SITE_CONFIG.url}/#organization`

export type ArticleInput = {
  slug: string
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  imagePath?: string
  keywords?: string[]
}

export function buildArticleSchema(input: ArticleInput) {
  const url = `${SITE_CONFIG.url}/blog/${input.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: url,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: { '@id': FOUNDER_ID },
    publisher: { '@id': ORG_ID },
    image: `${SITE_CONFIG.url}${input.imagePath || SITE_CONFIG.defaultOgPath}`,
    keywords: input.keywords?.join(', '),
    inLanguage: 'en-CA',
  }
}
