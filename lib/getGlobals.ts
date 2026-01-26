import { datocmsRequest, isDatoCMSConfigured, DatoCMSImage } from './datocms'

export type HeaderData = {
  logo?: DatoCMSImage | null
  navItems?: Array<{ label: string; url: string }>
}

export type FooterData = {
  logo?: DatoCMSImage | null
  tagline?: string | null
  navItems?: Array<{ label: string; url: string }>
  phone?: string | null
  email?: string | null
  location?: string | null
}

const HEADER_QUERY = `
  query Header {
    header {
      logo {
        url
        alt
      }
      navItems {
        label
        url
      }
    }
  }
`

const FOOTER_QUERY = `
  query Footer {
    footer {
      logo {
        url
        alt
      }
      tagline
      navItems {
        label
        url
      }
      phone
      email
      location
    }
  }
`

export async function getHeader(): Promise<HeaderData | null> {
  if (!isDatoCMSConfigured()) return null
  try {
    const data = await datocmsRequest<{ header: HeaderData | null }>({
      query: HEADER_QUERY,
    })
    return data.header
  } catch {
    return null
  }
}

export async function getFooter(): Promise<FooterData | null> {
  if (!isDatoCMSConfigured()) return null
  try {
    const data = await datocmsRequest<{ footer: FooterData | null }>({
      query: FOOTER_QUERY,
    })
    return data.footer
  } catch {
    return null
  }
}

export function logoUrl(logo: HeaderData['logo'] | FooterData['logo']): string | null {
  if (!logo) return null
  if (typeof logo === 'object' && logo && 'url' in logo && logo.url) return logo.url
  return null
}
