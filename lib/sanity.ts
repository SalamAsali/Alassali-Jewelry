/**
 * Sanity Client Library
 */

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Tag-aware fetch wrapper for on-demand revalidation.
 * Every query specifies which document types it depends on; the
 * /api/revalidate webhook handler calls revalidateTag(<type>) to
 * purge matching caches when content changes in Sanity.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { tags },
  })
}

// ============================================================================
// Type Definitions
// ============================================================================

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface PortfolioCategory {
  _id: string
  name: string
  slug: { current: string }
  order?: number
}

export interface PortfolioItem {
  _id: string
  name: string
  slug?: { current: string }
  image: SanityImage
  additionalImages?: SanityImage[]
  category?: PortfolioCategory
  order?: number
}

export interface GalleryItem {
  _id: string
  title: string
  description?: string
  category?: string
  featured?: boolean
  order?: number
  image: SanityImage
}

export interface Testimonial {
  name: string
  text: string
  rating: number
}

export interface ProcessStep {
  label: string
  description: string
  icon?: SanityImage
}

export interface HomepageData {
  _id: string
  title?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImage
  featuredItems?: GalleryItem[]
  testimonials?: Testimonial[]
  processSteps?: ProcessStep[]
  madeInTorontoImages?: SanityImage[]
}

export type ChainType = 'cuban' | 'figaro' | 'rope' | 'box' | 'byzantine' | 'snake' | 'herringbone' | 'mariner' | 'wheat' | 'bead' | 'paperclip' | 'curb' | 'cable' | 'franco' | 'round-link' | 'anchor' | 'singapore' | 'oval-link' | 'domed-cuban'
export type MetalColor = 'yellow-gold' | 'white-gold' | 'rose-gold' | 'two-tone'
export type Karat = '10k' | '14k' | '18k'
export type Construction = 'hollow' | 'semi-solid' | 'solid'

export interface Chain {
  _id: string
  name: string
  slug: { current: string }
  chainType: ChainType
  widthMm: number
  availableMetals: MetalColor[]
  availableKarats: Karat[]
  availableLengths: number[]
  construction: Construction
  weightPerInchG: number
  heroImage: SanityImage
  galleryImages: SanityImage[]
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
  markupEighteenK: number
  markupFourteenK: number
  markupTenK: number
  makingChargePerGram: number
  heavyChainSurchargePerGram: number
  claspChargeCad: number
  spotPriceSource: string
  lastSpotTwentyfourK: number
  spotUpdatedAt: string
  manualOverrideActive: boolean
  // Mapped short names for lib/pricing.ts compatibility
  markup18k: number
  markup14k: number
  markup10k: number
  lastSpot24k: number
}

export interface ChainsLandingData {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImage
  metalPickerYellowImage?: SanityImage
  metalPickerWhiteImage?: SanityImage
  faqItems?: Array<{ question: string; answer: string }>
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  date?: string
  tag?: string
  excerpt?: string
  readingMinutes?: number
}

export interface FaqCategory {
  _id: string
  name: string
  order?: number
}

export interface FaqItem {
  _id: string
  question: string
  answer: string
  category?: FaqCategory
  order?: number
}

export interface PageData {
  _id: string
  title: string
  slug: { current: string }
  hideFromNavigation?: boolean
  seo?: { title?: string; description?: string; image?: SanityImage }
  contentBlocks?: Array<Record<string, unknown>>
}

export interface HeaderData {
  logo?: SanityImage
  navItems?: Array<{ label: string; url: string }>
}

export interface FooterData {
  logo?: SanityImage
  tagline?: string
  email?: string
  phone?: string
  location?: string
  navItems?: Array<{ label: string; url: string }>
}

export interface MasterJewellerData {
  name?: string
  title?: string
  slug?: { current: string }
  tagline?: string
  bio?: string
  seoTitle?: string
  seoDescription?: string
}

// ============================================================================
// GROQ Queries
// ============================================================================

const imageFields = `{
  _type,
  asset->{_id, url, metadata {dimensions, lqip}},
  alt,
  hotspot,
  crop
}`

// ============================================================================
// Data Fetching Functions
// ============================================================================

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  return sanityFetch({
    query: `*[_type == "portfolioCategory"] | order(order asc) { _id, name, slug, order }`,
    tags: ['portfolioCategory'],
  })
}

export async function getPortfolioItems(options?: { category?: string }): Promise<PortfolioItem[]> {
  const filter = options?.category
    ? `*[_type == "portfolioItem" && category->slug.current == $category]`
    : `*[_type == "portfolioItem"]`
  return sanityFetch({
    query: `${filter} | order(order asc) {
      _id, name, slug, order,
      image ${imageFields},
      additionalImages[] ${imageFields},
      category->{ _id, name, slug, order }
    }`,
    params: options?.category ? { category: options.category } : {},
    tags: ['portfolioItem', 'portfolioCategory'],
  })
}

export async function getGalleryItems(options?: { featured?: boolean; category?: string; limit?: number }): Promise<GalleryItem[]> {
  const conditions = ['_type == "gallery"']
  if (options?.featured !== undefined) conditions.push(`featured == ${options.featured}`)
  if (options?.category) conditions.push(`category == $category`)
  const filter = conditions.join(' && ')
  const limit = options?.limit ? `[0...${options.limit}]` : ''
  return sanityFetch({
    query: `*[${filter}] | order(order asc) ${limit} {
      _id, title, description, category, featured, order,
      image ${imageFields}
    }`,
    params: options?.category ? { category: options.category } : {},
    tags: ['gallery'],
  })
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  return sanityFetch({
    query: `*[_type == "gallery" && _id == $id][0] {
      _id, title, description, category, featured, order,
      image ${imageFields}
    }`,
    params: { id },
    tags: ['gallery'],
  })
}

export async function getHomepage(): Promise<HomepageData | null> {
  return sanityFetch({
    query: `*[_type == "homepage"][0] {
      _id, title, heroTitle, heroSubtitle,
      heroImage ${imageFields},
      featuredItems[]->{
        _id, title, description, category,
        image ${imageFields}
      },
      testimonials[] { name, text, rating },
      processSteps[] { label, description, icon ${imageFields} },
      madeInTorontoImages[] ${imageFields}
    }`,
    tags: ['homepage', 'gallery', 'global'],
  })
}

export async function getChains(options?: { chainType?: ChainType; metal?: MetalColor; featured?: boolean; active?: boolean; limit?: number }): Promise<Chain[]> {
  const conditions = ['_type == "chain"']
  if (options?.active !== undefined) conditions.push(`active == ${options.active}`)
  else conditions.push('active == true')
  if (options?.featured !== undefined) conditions.push(`featured == ${options.featured}`)
  if (options?.chainType) conditions.push(`chainType == $chainType`)
  if (options?.metal) conditions.push(`$metal in availableMetals`)

  const filter = conditions.join(' && ')
  const limit = options?.limit ? `[0...${options.limit}]` : '[0...500]'

  return sanityFetch({
    query: `*[${filter}] | order(order asc) ${limit} {
      _id, name, slug, chainType, widthMm,
      availableMetals, availableKarats, availableLengths,
      construction, weightPerInchG,
      heroImage ${imageFields},
      galleryImages[] ${imageFields},
      defaultKarat, defaultMetal, defaultLengthIn,
      description, specifications,
      seoTitle, seoDescription,
      featured, order, supplierSku, active
    }`,
    params: {
      ...(options?.chainType ? { chainType: options.chainType } : {}),
      ...(options?.metal ? { metal: options.metal } : {}),
    },
    tags: ['chain', 'pricingConfig'],
  })
}

export async function getChainBySlug(slug: string): Promise<Chain | null> {
  return sanityFetch({
    query: `*[_type == "chain" && slug.current == $slug][0] {
      _id, name, slug, chainType, widthMm,
      availableMetals, availableKarats, availableLengths,
      construction, weightPerInchG,
      heroImage ${imageFields},
      galleryImages[] ${imageFields},
      defaultKarat, defaultMetal, defaultLengthIn,
      description, specifications,
      seoTitle, seoDescription,
      featured, order, supplierSku, active
    }`,
    params: { slug },
    tags: ['chain'],
  })
}

export async function getPricingConfig(): Promise<PricingConfig | null> {
  const raw = await sanityFetch<Record<string, unknown> | null>({
    query: `*[_type == "pricingConfig"][0]`,
    tags: ['pricingConfig', 'global'],
  })
  if (!raw) return null
  return {
    markupEighteenK: (raw.markupEighteenK as number) ?? 0,
    markupFourteenK: (raw.markupFourteenK as number) ?? 0,
    markupTenK: (raw.markupTenK as number) ?? 0,
    makingChargePerGram: (raw.makingChargePerGram as number) ?? 0,
    heavyChainSurchargePerGram: (raw.heavyChainSurchargePerGram as number) ?? 0,
    claspChargeCad: (raw.claspChargeCad as number) ?? 0,
    spotPriceSource: (raw.spotPriceSource as string) ?? '',
    lastSpotTwentyfourK: (raw.lastSpotTwentyfourK as number) ?? 0,
    spotUpdatedAt: (raw.spotUpdatedAt as string) ?? '',
    manualOverrideActive: (raw.manualOverrideActive as boolean) ?? false,
    markup18k: (raw.markupEighteenK as number) ?? 0,
    markup14k: (raw.markupFourteenK as number) ?? 0,
    markup10k: (raw.markupTenK as number) ?? 0,
    lastSpot24k: (raw.lastSpotTwentyfourK as number) ?? 0,
  }
}

export async function getChainsLanding(): Promise<ChainsLandingData | null> {
  return sanityFetch({
    query: `*[_type == "chainsLanding"][0] {
      heroTitle, heroSubtitle,
      heroImage ${imageFields},
      metalPickerYellowImage ${imageFields},
      metalPickerWhiteImage ${imageFields},
      faqItems[] { question, answer }
    }`,
    tags: ['chainsLanding', 'global'],
  })
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return sanityFetch({
    query: `*[_type == "blogPost"] | order(date desc) { _id, title, slug, date, tag, excerpt, readingMinutes }`,
    tags: ['blogPost'],
  })
}

export async function getBlogIndex() {
  return sanityFetch({
    query: `*[_type == "blogIndex"][0] { heading, intro, seoTitle, seoDescription }`,
    tags: ['blogIndex', 'global'],
  })
}

export async function getFaqCategories(): Promise<FaqCategory[]> {
  return sanityFetch({
    query: `*[_type == "faqCategory"] | order(order asc) { _id, name, order }`,
    tags: ['faqCategory'],
  })
}

export async function getFaqItems(categoryId?: string): Promise<FaqItem[]> {
  const filter = categoryId
    ? `*[_type == "faqItem" && category._ref == $categoryId]`
    : `*[_type == "faqItem"]`
  return sanityFetch({
    query: `${filter} | order(order asc) { _id, question, answer, category->{ _id, name }, order }`,
    params: categoryId ? { categoryId } : {},
    tags: ['faqItem', 'faqCategory'],
  })
}

export async function getPages(): Promise<PageData[]> {
  return sanityFetch({
    query: `*[_type == "page"] { _id, title, slug, hideFromNavigation, seo, contentBlocks }`,
    tags: ['page'],
  })
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  return sanityFetch({
    query: `*[_type == "page" && slug.current == $slug][0] { _id, title, slug, hideFromNavigation, seo, contentBlocks }`,
    params: { slug },
    tags: ['page'],
  })
}

export async function getHeader(): Promise<HeaderData | null> {
  return sanityFetch({
    query: `*[_type == "header"][0] { logo ${imageFields}, navItems[] { label, url } }`,
    tags: ['header', 'global'],
  })
}

export async function getFooter(): Promise<FooterData | null> {
  return sanityFetch({
    query: `*[_type == "footer"][0] { logo ${imageFields}, tagline, email, phone, location, navItems[] { label, url } }`,
    tags: ['footer', 'global'],
  })
}

export async function getMasterJeweller(): Promise<MasterJewellerData | null> {
  return sanityFetch({
    query: `*[_type == "masterJeweller"][0] { name, title, slug, tagline, bio, seoTitle, seoDescription }`,
    tags: ['masterJeweller', 'global'],
  })
}

export async function getPortfolioPage() {
  return sanityFetch({
    query: `*[_type == "portfolioPage"][0] { heading, intro }`,
    tags: ['portfolioPage', 'global'],
  })
}

export async function getFaqPage() {
  return sanityFetch({
    query: `*[_type == "faqPage"][0] { heading, intro }`,
    tags: ['faqPage', 'global'],
  })
}

/**
 * Helper: get Sanity image URL from image object
 * Drop-in replacement for DatoCMS responsiveImage pattern
 */
export function getSanityImageUrl(image: SanityImage | undefined | null, width?: number): string {
  if (!image?.asset) return ''
  let img = urlFor(image)
  if (width) img = img.width(width)
  return img.url()
}

/**
 * Check if Sanity is properly configured
 */
export function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'oh0jn4tt')
}
