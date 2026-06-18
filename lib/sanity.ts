/**
 * Sanity Client Library
 * Replaces DatoCMS - provides functions to fetch content from Sanity
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
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
  asset->{_id, url, metadata {dimensions}},
  alt,
  hotspot,
  crop
}`

// ============================================================================
// Data Fetching Functions
// ============================================================================

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  return sanityClient.fetch(
    `*[_type == "portfolioCategory"] | order(order asc) { _id, name, slug, order }`
  )
}

export async function getPortfolioItems(options?: { category?: string }): Promise<PortfolioItem[]> {
  const filter = options?.category
    ? `*[_type == "portfolioItem" && category->slug.current == $category]`
    : `*[_type == "portfolioItem"]`
  return sanityClient.fetch(
    `${filter} | order(order asc) {
      _id, name, slug, order,
      image ${imageFields},
      additionalImages[] ${imageFields},
      category->{ _id, name, slug, order }
    }`,
    options?.category ? { category: options.category } : {}
  )
}

export async function getGalleryItems(options?: { featured?: boolean; category?: string; limit?: number }): Promise<GalleryItem[]> {
  const conditions = ['_type == "gallery"']
  if (options?.featured !== undefined) conditions.push(`featured == ${options.featured}`)
  if (options?.category) conditions.push(`category == $category`)
  const filter = conditions.join(' && ')
  const limit = options?.limit ? `[0...${options.limit}]` : ''
  return sanityClient.fetch(
    `*[${filter}] | order(order asc) ${limit} {
      _id, title, description, category, featured, order,
      image ${imageFields}
    }`,
    options?.category ? { category: options.category } : {}
  )
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  return sanityClient.fetch(
    `*[_type == "gallery" && _id == $id][0] {
      _id, title, description, category, featured, order,
      image ${imageFields}
    }`,
    { id }
  )
}

export async function getHomepage(): Promise<HomepageData | null> {
  return sanityClient.fetch(
    `*[_type == "homepage"][0] {
      _id, title, heroTitle, heroSubtitle,
      heroImage ${imageFields},
      featuredItems[]->{
        _id, title, description, category,
        image ${imageFields}
      },
      testimonials[] { name, text, rating },
      processSteps[] { label, description, icon ${imageFields} },
      madeInTorontoImages[] ${imageFields}
    }`
  )
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

  return sanityClient.fetch(
    `*[${filter}] | order(order asc) ${limit} {
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
    {
      ...(options?.chainType ? { chainType: options.chainType } : {}),
      ...(options?.metal ? { metal: options.metal } : {}),
    }
  )
}

export async function getChainBySlug(slug: string): Promise<Chain | null> {
  return sanityClient.fetch(
    `*[_type == "chain" && slug.current == $slug][0] {
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
    { slug }
  )
}

export async function getPricingConfig(): Promise<PricingConfig | null> {
  const raw = await sanityClient.fetch(`*[_type == "pricingConfig"][0]`)
  if (!raw) return null
  return {
    markupEighteenK: raw.markupEighteenK ?? 0,
    markupFourteenK: raw.markupFourteenK ?? 0,
    markupTenK: raw.markupTenK ?? 0,
    makingChargePerGram: raw.makingChargePerGram ?? 0,
    heavyChainSurchargePerGram: raw.heavyChainSurchargePerGram ?? 0,
    claspChargeCad: raw.claspChargeCad ?? 0,
    spotPriceSource: raw.spotPriceSource ?? '',
    lastSpotTwentyfourK: raw.lastSpotTwentyfourK ?? 0,
    spotUpdatedAt: raw.spotUpdatedAt ?? '',
    manualOverrideActive: raw.manualOverrideActive ?? false,
    // Mapped names for lib/pricing.ts compatibility
    markup18k: raw.markupEighteenK ?? 0,
    markup14k: raw.markupFourteenK ?? 0,
    markup10k: raw.markupTenK ?? 0,
    lastSpot24k: raw.lastSpotTwentyfourK ?? 0,
  }
}

export async function getChainsLanding(): Promise<ChainsLandingData | null> {
  return sanityClient.fetch(
    `*[_type == "chainsLanding"][0] {
      heroTitle, heroSubtitle,
      heroImage ${imageFields},
      metalPickerYellowImage ${imageFields},
      metalPickerWhiteImage ${imageFields},
      faqItems[] { question, answer }
    }`
  )
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost"] | order(date desc) { _id, title, slug, date, tag, excerpt, readingMinutes }`
  )
}

export async function getBlogIndex() {
  return sanityClient.fetch(`*[_type == "blogIndex"][0] { heading, intro, seoTitle, seoDescription }`)
}

export async function getFaqCategories(): Promise<FaqCategory[]> {
  return sanityClient.fetch(`*[_type == "faqCategory"] | order(order asc) { _id, name, order }`)
}

export async function getFaqItems(categoryId?: string): Promise<FaqItem[]> {
  const filter = categoryId
    ? `*[_type == "faqItem" && category._ref == $categoryId]`
    : `*[_type == "faqItem"]`
  return sanityClient.fetch(
    `${filter} | order(order asc) { _id, question, answer, category->{ _id, name }, order }`,
    categoryId ? { categoryId } : {}
  )
}

export async function getPages(): Promise<PageData[]> {
  return sanityClient.fetch(
    `*[_type == "page"] { _id, title, slug, hideFromNavigation, seo, contentBlocks }`
  )
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0] { _id, title, slug, hideFromNavigation, seo, contentBlocks }`,
    { slug }
  )
}

export async function getHeader(): Promise<HeaderData | null> {
  return sanityClient.fetch(
    `*[_type == "header"][0] { logo ${imageFields}, navItems[] { label, url } }`
  )
}

export async function getFooter(): Promise<FooterData | null> {
  return sanityClient.fetch(
    `*[_type == "footer"][0] { logo ${imageFields}, tagline, email, phone, location, navItems[] { label, url } }`
  )
}

export async function getMasterJeweller(): Promise<MasterJewellerData | null> {
  return sanityClient.fetch(
    `*[_type == "masterJeweller"][0] { name, title, slug, tagline, bio, seoTitle, seoDescription }`
  )
}

export async function getPortfolioPage() {
  return sanityClient.fetch(`*[_type == "portfolioPage"][0] { heading, intro }`)
}

export async function getFaqPage() {
  return sanityClient.fetch(`*[_type == "faqPage"][0] { heading, intro }`)
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
