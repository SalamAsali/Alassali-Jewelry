import type { Metadata } from 'next'
import { getServerSideURL } from '@/lib/getURL'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'
import JsonLd from '@/components/seo/JsonLd'
import {
  buildJewelryStoreSchema,
  buildOrganizationSchema,
  buildMasterJewelerSchema,
  buildWebsiteSchema,
} from '@/lib/seo/schema'
import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Custom Jeweler Toronto | Bespoke Engagement Rings, Chains & Grillz — Al-Asali Jewelry',
    template: '%s | Al-Asali Jewelry',
  },
  description: 'Toronto\'s premier custom jeweler. Bespoke engagement rings, wedding bands, gold chains, diamond pendants, and custom grillz — handcrafted in-house in Toronto, by appointment. 5-star rated on Google.',
  openGraph: mergeOpenGraph(),
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const reviewsData = await fetchGoogleReviews()

  return (
    <html lang="en">
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="AVNynhehvSQEh5GaujqbDg"
          async
        />
      </head>
      <body className="antialiased">
        <JsonLd
          id="site-schema"
          data={[
            buildJewelryStoreSchema(
              reviewsData.source === 'live' ? reviewsData : undefined,
            ),
            buildOrganizationSchema(),
            buildMasterJewelerSchema(),
            buildWebsiteSchema(),
          ]}
        />
        {children}
      </body>
    </html>
  )
}
