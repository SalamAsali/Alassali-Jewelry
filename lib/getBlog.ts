import { getBlogIndex as sanityGetBlogIndex, getBlogPosts, type BlogPost } from './sanity'
import { normalizeCmsText } from './normalizeCms'

export type BlogIndexMeta = {
  heading?: string | null
  intro?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
}

export type BlogPostSummary = {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  date?: string | null
  readingMinutes?: number | null
  tag?: string | null
  [key: string]: unknown
}

export type BlogData = {
  page: BlogIndexMeta | null
  posts: BlogPostSummary[]
}

function mapPost(post: BlogPost): BlogPostSummary {
  return {
    id: post._id,
    slug: post.slug?.current ?? '',
    title: normalizeCmsText(post.title),
    excerpt: normalizeCmsText(post.excerpt),
    date: post.date,
    readingMinutes: post.readingMinutes,
    tag: normalizeCmsText(post.tag),
  }
}

export async function getBlogIndex(): Promise<BlogData | null> {
  try {
    const [page, posts] = await Promise.all([
      sanityGetBlogIndex(),
      getBlogPosts(),
    ])
    const meta = (page ?? null) as BlogIndexMeta | null
    return {
      page: meta
        ? {
            heading: normalizeCmsText(meta.heading),
            intro: normalizeCmsText(meta.intro),
            seoTitle: normalizeCmsText(meta.seoTitle),
            seoDescription: normalizeCmsText(meta.seoDescription),
          }
        : null,
      posts: (posts ?? []).map(mapPost),
    }
  } catch {
    return null
  }
}
