import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Catalog — Fine & Custom Jewelry',
  description: 'Discover our curated selection of fine jewelry. Engagement rings, grillz, chains, pendants, and more. Made in Toronto.',
  alternates: { canonical: '/catalog' },
  openGraph: mergeOpenGraph({
    title: 'Catalog — Fine & Custom Jewelry | Al-Asali Jewelry',
    description: 'Discover our curated selection of fine jewelry. Engagement rings, grillz, chains, pendants, and more.',
    url: '/catalog',
  }),
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
