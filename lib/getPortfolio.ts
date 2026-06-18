import {
  getPortfolioPage,
  getPortfolioCategories,
  getPortfolioItems,
  getSanityImageUrl,
  type PortfolioCategory as SanityPortfolioCategory,
  type PortfolioItem as SanityPortfolioItem,
  type SanityImage,
} from './sanity'

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
  image?: { url?: string; alt?: string; width?: number; height?: number } | null
  additionalImages?: { url?: string; alt?: string; width?: number; height?: number }[] | null
}

export type PortfolioData = {
  page: PortfolioPageMeta | null
  categories: PortfolioCategory[]
  items: PortfolioItem[]
}

function mapImage(img: SanityImage | undefined | null): { url?: string; alt?: string; width?: number; height?: number } | null {
  if (!img?.asset) return null
  const url = getSanityImageUrl(img, 800)
  return { url, alt: img.alt }
}

function mapCategory(cat: SanityPortfolioCategory): PortfolioCategory {
  return {
    id: cat._id,
    name: cat.name,
    slug: cat.slug?.current ?? '',
    order: cat.order,
  }
}

function mapItem(item: SanityPortfolioItem): PortfolioItem {
  return {
    id: item._id,
    name: item.name,
    order: item.order,
    category: item.category ? mapCategory(item.category) : null,
    image: mapImage(item.image),
    additionalImages: item.additionalImages?.map(mapImage).filter(Boolean) as PortfolioItem['additionalImages'] ?? null,
  }
}

export async function getPortfolio(): Promise<PortfolioData | null> {
  try {
    const [page, categories, items] = await Promise.all([
      getPortfolioPage(),
      getPortfolioCategories(),
      getPortfolioItems(),
    ])
    return {
      page: page ?? null,
      categories: (categories ?? []).map(mapCategory),
      items: (items ?? []).map(mapItem),
    }
  } catch {
    return null
  }
}
