import { datocmsRequest, isDatoCMSConfigured, DatoCMSImage } from './datocms'

export type PortfolioPageMeta = {
  heading?: string | null
  intro?: string | null
}

export type PortfolioCategory = {
  id: string
  name: string
  slug: string
  order?: number | null
}

export type PortfolioItem = {
  id: string
  name: string
  order?: number | null
  category?: PortfolioCategory | null
  image?: DatoCMSImage | null
}

export type PortfolioData = {
  page: PortfolioPageMeta | null
  categories: PortfolioCategory[]
  items: PortfolioItem[]
}

const PORTFOLIO_QUERY = `
  query Portfolio {
    portfolioPage {
      heading
      intro
    }
    allPortfolioCategories(orderBy: order_ASC, first: 100) {
      id
      name
      slug
      order
    }
    allPortfolioItems(orderBy: order_ASC, first: 200) {
      id
      name
      order
      category {
        id
        name
        slug
        order
      }
      image {
        url
        alt
        width
        height
      }
    }
  }
`

type PortfolioQueryResult = {
  portfolioPage: PortfolioPageMeta | null
  allPortfolioCategories: PortfolioCategory[]
  allPortfolioItems: PortfolioItem[]
}

export async function getPortfolio(): Promise<PortfolioData | null> {
  if (!isDatoCMSConfigured()) return null
  try {
    const data = await datocmsRequest<PortfolioQueryResult>({ query: PORTFOLIO_QUERY })
    return {
      page: data.portfolioPage,
      categories: data.allPortfolioCategories ?? [],
      items: data.allPortfolioItems ?? [],
    }
  } catch {
    return null
  }
}
