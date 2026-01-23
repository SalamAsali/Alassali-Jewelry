import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alassali Jewelry',
  description: 'Custom jewelry and grillz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
