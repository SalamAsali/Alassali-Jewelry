import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alassali Jewelry - Custom Jewelry & Grillz | Toronto',
  description: 'Crafting bespoke luxury jewelry in Toronto. Custom engagement rings, grillz, chains, pendants, and more. Made in Toronto, serving globally.',
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
