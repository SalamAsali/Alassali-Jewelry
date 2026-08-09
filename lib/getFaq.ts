import {
  getFaqPage,
  getFaqCategories as sanityGetFaqCategories,
  getFaqItems as sanityGetFaqItems,
  type FaqCategory as SanityFaqCategory,
  type FaqItem as SanityFaqItem,
} from './sanity'
import { normalizeCmsText } from './normalizeCms'

export type FaqPageMeta = {
  heading?: string | null
  intro?: string | null
}

export type FaqCategory = {
  id: string
  name: string
  order?: number | null
}

export type FaqItem = {
  id: string
  question: string
  answer: string
  order?: number | null
  category?: FaqCategory | null
}

export type FaqData = {
  page: FaqPageMeta | null
  categories: FaqCategory[]
  items: FaqItem[]
}

function mapCategory(cat: SanityFaqCategory): FaqCategory {
  return { id: cat._id, name: normalizeCmsText(cat.name), order: cat.order }
}

function mapItem(item: SanityFaqItem): FaqItem {
  return {
    id: item._id,
    question: normalizeCmsText(item.question),
    answer: normalizeCmsText(item.answer),
    order: item.order,
    category: item.category ? { id: item.category._id, name: normalizeCmsText(item.category.name) } : null,
  }
}

export async function getFaq(): Promise<FaqData | null> {
  try {
    const [page, categories, items] = await Promise.all([
      getFaqPage(),
      sanityGetFaqCategories(),
      sanityGetFaqItems(),
    ])
    const meta = (page ?? null) as FaqPageMeta | null
    return {
      page: meta
        ? { heading: normalizeCmsText(meta.heading), intro: normalizeCmsText(meta.intro) }
        : null,
      categories: (categories ?? []).map(mapCategory),
      items: (items ?? []).map(mapItem),
    }
  } catch {
    return null
  }
}
