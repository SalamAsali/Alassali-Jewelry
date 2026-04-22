import type { Metadata } from 'next'
import { getServerSideURL } from '@/lib/getURL'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'
import JsonLd from '@/components/seo/JsonLd'
import {
  buildJewelryStoreSchema,
  buildOrganizationSchema,
  buildMasterJewellerSchema,
  buildWebsiteSchema,
} from '@/lib/seo/schema'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Custom Jeweller Toronto | Bespoke Engagement Rings, Chains & Grillz — Al-Assali Jewelry',
    template: '%s | Al-Assali Jewelry',
  },
  description: 'Toronto\'s premier custom jeweller. Bespoke engagement rings, wedding bands, gold chains, diamond pendants, and custom grillz — handcrafted in-house in Toronto. 5-star rated on Google.',
  openGraph: mergeOpenGraph(),
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd
          id="site-schema"
          data={[
            buildJewelryStoreSchema(),
            buildOrganizationSchema(),
            buildMasterJewellerSchema(),
            buildWebsiteSchema(),
          ]}
        />
        {children}
      </body>
    </html>
  )
}
