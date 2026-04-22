import { datocmsRequest, isDatoCMSConfigured } from './datocms'

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
}

export type BlogData = {
  page: BlogIndexMeta | null
  posts: BlogPostSummary[]
}

const BLOG_INDEX_QUERY = `
  query BlogIndex {
    blogIndex {
      heading
      intro
      seoTitle
      seoDescription
    }
    allBlogPosts(orderBy: date_DESC, first: 100) {
      id
      slug
      title
      excerpt
      date
      readingMinutes
      tag
    }
  }
`

type BlogIndexQueryResult = {
  blogIndex: BlogIndexMeta | null
  allBlogPosts: BlogPostSummary[]
}

export async function getBlogIndex(): Promise<BlogData | null> {
  if (!isDatoCMSConfigured()) return null
  try {
    const data = await datocmsRequest<BlogIndexQueryResult>({ query: BLOG_INDEX_QUERY })
    return {
      page: data.blogIndex,
      posts: data.allBlogPosts ?? [],
    }
  } catch {
    return null
  }
}
