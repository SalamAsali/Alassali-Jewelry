import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const TITLE = 'Portfolio | Custom Jewelry Toronto'
const DESCRIPTION =
  'Explore our portfolio of custom jewelry: engagement rings, grillz, chains, pendants, and more. Handcrafted in Toronto by Al-Asali Jewelry.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_CONFIG.url}/portfolio` },
  openGraph: mergeOpenGraph({ title: `${TITLE} | Al-Asali Jewelry`, description: DESCRIPTION, url: '/portfolio' }),
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
