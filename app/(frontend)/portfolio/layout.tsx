import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Alasali Jewelry',
  description: 'Explore our portfolio of custom jewelry. Engagement rings, grillz, chains, pendants, and more. Made in Toronto.',
  alternates: { canonical: '/portfolio' },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
