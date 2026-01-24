import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Catalog | Alassali Jewelry',
  description: 'Discover our curated selection of fine jewelry. Engagement rings, grillz, chains, pendants, and more. Made in Toronto.',
  openGraph: mergeOpenGraph({
    title: 'Catalog | Alassali Jewelry',
    description: 'Discover our curated selection of fine jewelry. Engagement rings, grillz, chains, pendants, and more.',
  }),
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
