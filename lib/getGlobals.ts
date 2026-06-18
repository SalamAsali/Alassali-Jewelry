import {
  getHeader as sanityGetHeader,
  getFooter as sanityGetFooter,
  getSanityImageUrl,
  type HeaderData as SanityHeaderData,
  type FooterData as SanityFooterData,
  type SanityImage,
} from './sanity'

export type HeaderData = {
  logo?: { url?: string; alt?: string } | null
  navItems?: Array<{ label: string; url: string }>
}

export type FooterData = {
  logo?: { url?: string; alt?: string } | null
  tagline?: string | null
  navItems?: Array<{ label: string; url: string }>
  phone?: string | null
  email?: string | null
  location?: string | null
}

function mapLogo(img: SanityImage | undefined | null): { url?: string; alt?: string } | null {
  if (!img?.asset) return null
  return { url: getSanityImageUrl(img, 300), alt: img.alt }
}

export async function getHeader(): Promise<HeaderData | null> {
  try {
    const data = await sanityGetHeader()
    if (!data) return null
    return {
      logo: mapLogo(data.logo),
      navItems: data.navItems,
    }
  } catch {
    return null
  }
}

export async function getFooter(): Promise<FooterData | null> {
  try {
    const data = await sanityGetFooter()
    if (!data) return null
    return {
      logo: mapLogo(data.logo),
      tagline: data.tagline,
      navItems: data.navItems,
      phone: data.phone,
      email: data.email,
      location: data.location,
    }
  } catch {
    return null
  }
}

export function logoUrl(logo: HeaderData['logo'] | FooterData['logo']): string | null {
  if (!logo) return null
  if (typeof logo === 'object' && logo && 'url' in logo && logo.url) return logo.url
  return null
}
