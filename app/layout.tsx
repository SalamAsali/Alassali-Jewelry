import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
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
    default: 'Custom Jeweler Toronto | Rings, Chains & Grillz — Al-Asali Jewelry',
    template: '%s | Al-Asali Jewelry',
  },
  description: 'Toronto\'s premier custom jeweler — bespoke engagement rings, gold chains, diamond pendants, and grillz handcrafted in-house. 5-star rated on Google.',
  openGraph: mergeOpenGraph(),
  twitter: { card: 'summary_large_image' },
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
        {/* Warm up the image CDN connection — portfolio/product images are
            served from DatoCMS and this shaves ~150ms off the first request. */}
        <link rel="preconnect" href="https://www.datocms-assets.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.datocms-assets.com" />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="AVNynhehvSQEh5GaujqbDg"
          async
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-51DE9LX7GE"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-51DE9LX7GE');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ClerkProvider>
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
        </ClerkProvider>
      </body>
    </html>
  )
}
