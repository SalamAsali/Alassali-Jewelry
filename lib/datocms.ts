/**
 * DatoCMS Client Library
 * Provides functions to fetch content from DatoCMS GraphQL API
 */

const DATOCMS_API_URL = 'https://graphql.datocms.com/'
const DATOCMS_PREVIEW_URL = 'https://graphql.datocms.com/preview'

interface DatoCMSRequestOptions {
  query: string
  variables?: Record<string, unknown>
  preview?: boolean
}

/**
 * Make a request to DatoCMS GraphQL API
 */
export async function datocmsRequest<T = unknown>({
  query,
  variables = {},
  preview = false,
}: DatoCMSRequestOptions): Promise<T> {
  const token = process.env.DATOCMS_API_TOKEN

  if (!token) {
    console.warn('[DatoCMS] DATOCMS_API_TOKEN is not set')
    throw new Error('DatoCMS API token is not configured')
  }

  const endpoint = preview ? DATOCMS_PREVIEW_URL : DATOCMS_API_URL

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Include drafts in preview mode
      ...(preview && { 'X-Include-Drafts': 'true' }),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  const json = await response.json()

  if (json.errors) {
    console.error('[DatoCMS] GraphQL errors:', json.errors)
    throw new Error(json.errors[0]?.message || 'DatoCMS query failed')
  }

  return json.data as T
}

// ============================================================================
// GraphQL Queries
// ============================================================================

const GALLERY_QUERY = `
  query AllGalleryItems($first: IntType, $filter: GalleryModelFilter) {
    allGalleries(first: $first, filter: $filter, orderBy: _createdAt_DESC) {
      id
      title
      description
      category
      featured
      order
      image {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 800, h: 800 }) {
          src
          width
          height
          alt
          base64
        }
      }
    }
  }
`

const GALLERY_BY_ID_QUERY = `
  query GalleryById($id: ItemId!) {
    gallery(filter: { id: { eq: $id } }) {
      id
      title
      description
      category
      featured
      order
      image {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 1200, h: 1200 }) {
          src
          width
          height
          alt
          base64
        }
      }
    }
  }
`

const HOMEPAGE_QUERY = `
  query Homepage {
    homepage {
      id
      title
      heroTitle
      heroSubtitle
      heroImage {
        url
        alt
        responsiveImage(imgixParams: { fit: crop, w: 1920, h: 1080 }) {
          src
          width
          height
          alt
          base64
        }
      }
      featuredItems {
        id
        title
        description
        category
        image {
          url
          alt
          responsiveImage(imgixParams: { fit: crop, w: 800, h: 800 }) {
            src
            width
            height
            alt
            base64
          }
        }
      }
      testimonials {
        id
        name
        text
        rating
      }
      processSteps {
        id
        label
        description
        icon {
          url
          alt
        }
      }
      madeInTorontoImages {
        id
        image {
          url
          alt
          responsiveImage(imgixParams: { fit: crop, w: 400, h: 600 }) {
            src
            width
            height
            alt
            base64
          }
        }
      }
    }
  }
`

// ============================================================================
// Type Definitions
// ============================================================================

export interface DatoCMSImage {
  url: string
  alt?: string
  width?: number
  height?: number
  responsiveImage?: {
    src: string
    width: number
    height: number
    alt?: string
    base64?: string
  }
}

export interface GalleryItem {
  id: string
  title: string
  description?: string
  category?: string
  featured?: boolean
  order?: number
  image: DatoCMSImage
}

export interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
}

export interface ProcessStep {
  id: string
  label: string
  description: string
  icon: DatoCMSImage
}

export interface MadeInTorontoImage {
  id: string
  image: DatoCMSImage
}

export interface HomepageData {
  id: string
  title: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: DatoCMSImage
  featuredItems?: GalleryItem[]
  testimonials?: Testimonial[]
  processSteps?: ProcessStep[]
  madeInTorontoImages?: MadeInTorontoImage[]
}

// ============================================================================
// Data Fetching Functions
// ============================================================================

interface GalleryFilter {
  featured?: boolean
  category?: string
}

/**
 * Fetch all gallery items with optional filters
 */
export async function getGalleryItems(
  options: { filter?: GalleryFilter; limit?: number } = {}
): Promise<GalleryItem[]> {
  const { filter = {}, limit = 100 } = options

  const datoFilter: Record<string, unknown> = {}
  if (filter.featured !== undefined) {
    datoFilter.featured = { eq: filter.featured }
  }
  if (filter.category) {
    datoFilter.category = { eq: filter.category }
  }

  try {
    const data = await datocmsRequest<{ allGalleries: GalleryItem[] }>({
      query: GALLERY_QUERY,
      variables: {
        first: limit,
        filter: Object.keys(datoFilter).length > 0 ? datoFilter : undefined,
      },
    })
    return data.allGalleries || []
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch gallery items:', error)
    return []
  }
}

/**
 * Fetch a single gallery item by ID
 */
export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  try {
    const data = await datocmsRequest<{ gallery: GalleryItem | null }>({
      query: GALLERY_BY_ID_QUERY,
      variables: { id },
    })
    return data.gallery
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch gallery item:', error)
    return null
  }
}

/**
 * Fetch homepage content
 */
export async function getHomepage(): Promise<HomepageData | null> {
  try {
    const data = await datocmsRequest<{ homepage: HomepageData | null }>({
      query: HOMEPAGE_QUERY,
    })
    return data.homepage
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch homepage:', error)
    return null
  }
}

// ============================================================================
// Pages
// ============================================================================

const PAGES_QUERY = `
  query AllPages($filter: PageModelFilter) {
    allPages(filter: $filter) {
      id
      title
      slug
      content
      metaTitle
      metaDescription
      published
    }
  }
`

const PAGE_BY_SLUG_QUERY = `
  query PageBySlug($slug: String!) {
    page(filter: { slug: { eq: $slug } }) {
      id
      title
      slug
      content
      metaTitle
      metaDescription
      published
    }
  }
`

export interface PageData {
  id: string
  title: string
  slug: string
  content?: string
  metaTitle?: string
  metaDescription?: string
  published?: boolean
}

/**
 * Fetch all pages
 */
export async function getPages(options: { published?: boolean } = {}): Promise<PageData[]> {
  try {
    const filter: Record<string, unknown> = {}
    if (options.published !== undefined) {
      filter.published = { eq: options.published }
    }

    const data = await datocmsRequest<{ allPages: PageData[] }>({
      query: PAGES_QUERY,
      variables: {
        filter: Object.keys(filter).length > 0 ? filter : undefined,
      },
    })
    return data.allPages || []
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch pages:', error)
    return []
  }
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const data = await datocmsRequest<{ page: PageData | null }>({
      query: PAGE_BY_SLUG_QUERY,
      variables: { slug },
    })
    return data.page
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch page:', error)
    return null
  }
}

/**
 * Check if DatoCMS is properly configured
 */
export function isDatoCMSConfigured(): boolean {
  return Boolean(process.env.DATOCMS_API_TOKEN)
}

// ============================================================================
// Chains — GraphQL Queries
// ============================================================================

const CHAINS_QUERY = `
  query AllChains($first: IntType, $filter: ChainModelFilter) {
    allChains(first: $first, filter: $filter, orderBy: order_ASC) {
      id
      name
      slug
      chainType
      widthMm
      availableMetals
      availableKarats
      availableLengths
      construction
      weightPerInchG
      heroImage {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 800, h: 800 }) {
          src
          width
          height
          alt
          base64
        }
      }
      galleryImages {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 800, h: 800 }) {
          src
          width
          height
          alt
          base64
        }
      }
      defaultKarat
      defaultMetal
      defaultLengthIn
      description
      specifications
      seoTitle
      seoDescription
      featured
      order
      supplierSku
      active
    }
  }
`

const CHAIN_BY_SLUG_QUERY = `
  query ChainBySlug($slug: String!) {
    chain(filter: { slug: { eq: $slug } }) {
      id
      name
      slug
      chainType
      widthMm
      availableMetals
      availableKarats
      availableLengths
      construction
      weightPerInchG
      heroImage {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 800, h: 800 }) {
          src
          width
          height
          alt
          base64
        }
      }
      galleryImages {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 1200, h: 1200 }) {
          src
          width
          height
          alt
          base64
        }
      }
      defaultKarat
      defaultMetal
      defaultLengthIn
      description
      specifications
      seoTitle
      seoDescription
      featured
      order
      supplierSku
      active
    }
  }
`

const PRICING_CONFIG_QUERY = `
  query PricingConfig {
    pricingConfig {
      markupEighteenK
      markupFourteenK
      markupTenK
      makingChargePerGram
      heavyChainSurchargePerGram
      claspChargeCad
      spotPriceSource
      lastSpotTwentyfourK
      spotUpdatedAt
      manualOverrideActive
    }
  }
`

const CHAINS_LANDING_QUERY = `
  query ChainsLanding {
    chainsLanding {
      heroTitle
      heroSubtitle
      heroImage {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 1920, h: 800 }) {
          src
          width
          height
          alt
          base64
        }
      }
      metalPickerYellowImage {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 800, h: 800 }) {
          src
          width
          height
          alt
          base64
        }
      }
      metalPickerWhiteImage {
        url
        alt
        width
        height
        responsiveImage(imgixParams: { fit: crop, w: 800, h: 800 }) {
          src
          width
          height
          alt
          base64
        }
      }
      faqItems
    }
  }
`

// ============================================================================
// Chains — Type Definitions
// ============================================================================

export type ChainType = 'cuban' | 'figaro' | 'rope' | 'box' | 'byzantine' | 'snake' | 'herringbone' | 'mariner' | 'wheat' | 'bead' | 'paperclip' | 'curb' | 'cable' | 'franco' | 'round-link' | 'anchor' | 'singapore' | 'oval-link' | 'domed-cuban'
export type MetalColor = 'yellow-gold' | 'white-gold' | 'rose-gold' | 'two-tone'
export type Karat = '10k' | '14k' | '18k'
export type Construction = 'hollow' | 'semi-solid' | 'solid'

export interface Chain {
  id: string
  name: string
  slug: string
  chainType: ChainType
  widthMm: number
  availableMetals: MetalColor[]
  availableKarats: Karat[]
  availableLengths: number[]
  construction: Construction
  weightPerInchG: number
  heroImage: DatoCMSImage
  galleryImages: DatoCMSImage[]
  defaultKarat: Karat
  defaultMetal: MetalColor
  defaultLengthIn: number
  description?: string
  specifications?: string
  seoTitle?: string
  seoDescription?: string
  featured: boolean
  order: number
  supplierSku?: string
  active: boolean
}

export interface PricingConfig {
  markup18k: number
  markup14k: number
  markup10k: number
  makingChargePerGram: number
  heavyChainSurchargePerGram: number
  claspChargeCad: number
  spotPriceSource: string
  lastSpot24k: number
  spotUpdatedAt: string
  manualOverrideActive: boolean
}

export interface ChainsLandingData {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: DatoCMSImage
  metalPickerYellowImage?: DatoCMSImage
  metalPickerWhiteImage?: DatoCMSImage
  faqItems?: Array<{ question: string; answer: string }>
}

// ============================================================================
// Chains — Data Fetching Functions
// ============================================================================

/**
 * Fetch all chains with optional filters
 */
export async function getChains(
  options: {
    filter?: {
      chainType?: ChainType
      metal?: MetalColor
      featured?: boolean
      active?: boolean
    }
    limit?: number
  } = {}
): Promise<Chain[]> {
  const { filter = {}, limit = 500 } = options

  // DatoCMS JSON fields don't support anyIn/eq filters via GraphQL,
  // so we fetch all active chains and filter in JS.
  const datoFilter: Record<string, unknown> = {}

  if (filter.active !== undefined) {
    datoFilter.active = { eq: filter.active }
  } else {
    datoFilter.active = { eq: true }
  }

  if (filter.featured !== undefined) {
    datoFilter.featured = { eq: filter.featured }
  }

  try {
    const data = await datocmsRequest<{ allChains: Chain[] }>({
      query: CHAINS_QUERY,
      variables: {
        first: limit,
        filter: Object.keys(datoFilter).length > 0 ? datoFilter : undefined,
      },
    })
    let chains = data.allChains || []

    // Client-side filtering for JSON fields
    if (filter.chainType) {
      chains = chains.filter(c => c.chainType === filter.chainType)
    }
    if (filter.metal) {
      chains = chains.filter(c => c.availableMetals?.includes(filter.metal!))
    }

    return chains.slice(0, limit)
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch chains:', error)
    return []
  }
}

/**
 * Fetch a single chain by slug
 */
export async function getChainBySlug(slug: string): Promise<Chain | null> {
  try {
    const data = await datocmsRequest<{ chain: Chain | null }>({
      query: CHAIN_BY_SLUG_QUERY,
      variables: { slug },
    })
    return data.chain
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch chain:', error)
    return null
  }
}

/**
 * Fetch pricing configuration singleton
 */
export async function getPricingConfig(): Promise<PricingConfig | null> {
  try {
    const data = await datocmsRequest<{ pricingConfig: Record<string, unknown> | null }>({
      query: PRICING_CONFIG_QUERY,
    })
    if (!data.pricingConfig) return null
    const raw = data.pricingConfig
    return {
      markup18k: (raw.markupEighteenK as number) || 0,
      markup14k: (raw.markupFourteenK as number) || 0,
      markup10k: (raw.markupTenK as number) || 0,
      makingChargePerGram: (raw.makingChargePerGram as number) || 0,
      heavyChainSurchargePerGram: (raw.heavyChainSurchargePerGram as number) || 0,
      claspChargeCad: (raw.claspChargeCad as number) || 0,
      spotPriceSource: (raw.spotPriceSource as string) || '',
      lastSpot24k: (raw.lastSpotTwentyfourK as number) || 0,
      spotUpdatedAt: (raw.spotUpdatedAt as string) || '',
      manualOverrideActive: (raw.manualOverrideActive as boolean) || false,
    }
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch pricing config:', error)
    return null
  }
}

/**
 * Fetch chains landing page content
 */
export async function getChainsLanding(): Promise<ChainsLandingData | null> {
  try {
    const data = await datocmsRequest<{ chainsLanding: ChainsLandingData | null }>({
      query: CHAINS_LANDING_QUERY,
    })
    return data.chainsLanding
  } catch (error) {
    console.error('[DatoCMS] Failed to fetch chains landing:', error)
    return null
  }
}
