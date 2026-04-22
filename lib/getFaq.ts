import { datocmsRequest, isDatoCMSConfigured } from './datocms'

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

const FAQ_QUERY = `
  query Faq {
    faqPage {
      heading
      intro
    }
    allFaqCategories(orderBy: order_ASC, first: 100) {
      id
      name
      order
    }
    allFaqItems(orderBy: order_ASC, first: 300) {
      id
      question
      answer
      order
      category {
        id
        name
        order
      }
    }
  }
`

type FaqQueryResult = {
  faqPage: FaqPageMeta | null
  allFaqCategories: FaqCategory[]
  allFaqItems: FaqItem[]
}

export async function getFaq(): Promise<FaqData | null> {
  if (!isDatoCMSConfigured()) return null
  try {
    const data = await datocmsRequest<FaqQueryResult>({ query: FAQ_QUERY })
    return {
      page: data.faqPage,
      categories: data.allFaqCategories ?? [],
      items: data.allFaqItems ?? [],
    }
  } catch {
    return null
  }
}
