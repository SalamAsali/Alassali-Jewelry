import { getPayloadInstance } from './payload'

export type HeaderData = {
  logo?: { url?: string; filename?: string } | number | null
  navItems?: Array<{ label: string; url: string }>
}

export type FooterData = {
  logo?: { url?: string; filename?: string } | number | null
  tagline?: string | null
  navItems?: Array<{ label: string; url: string }>
  phone?: string | null
  email?: string | null
  location?: string | null
}

export async function getHeader(): Promise<HeaderData | null> {
  const payload = await getPayloadInstance()
  if (!payload) return null
  try {
    const header = await (payload as any).findGlobal({
      slug: 'header',
      overrideAccess: true,
      depth: 1,
    })
    return header as HeaderData
  } catch {
    return null
  }
}

export async function getFooter(): Promise<FooterData | null> {
  const payload = await getPayloadInstance()
  if (!payload) return null
  try {
    const footer = await (payload as any).findGlobal({
      slug: 'footer',
      overrideAccess: true,
      depth: 1,
    })
    return footer as FooterData
  } catch {
    return null
  }
}

export function logoUrl(logo: HeaderData['logo'] | FooterData['logo']): string | null {
  if (!logo || typeof logo === 'number') return null
  if (typeof logo === 'object' && logo && 'url' in logo && logo.url) return logo.url
  return null
}
