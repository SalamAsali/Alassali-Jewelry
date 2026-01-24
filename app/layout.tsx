import type { Metadata } from 'next'
import { getServerSideURL } from '@/lib/getURL'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'Alassali Jewelry - Custom Jewelry & Grillz | Toronto',
  description: 'Crafting bespoke luxury jewelry in Toronto. Custom engagement rings, grillz, chains, pendants, and more. Made in Toronto, serving globally.',
  openGraph: mergeOpenGraph(),
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
