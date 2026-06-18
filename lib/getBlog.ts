import { getBlogIndex as sanityGetBlogIndex, getBlogPosts, type BlogPost } from './sanity'

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
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readingMinutes: post.readingMinutes,
    tag: post.tag,
  }
}

export async function getBlogIndex(): Promise<BlogData | null> {
  try {
    const [page, posts] = await Promise.all([
      sanityGetBlogIndex(),
      getBlogPosts(),
    ])
    return {
      page: page ?? null,
      posts: (posts ?? []).map(mapPost),
    }
  } catch {
    return null
  }
}
