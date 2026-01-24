import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Crafting bespoke luxury jewelry in Toronto. Custom engagement rings, grillz, chains, pendants, and more. Made in Toronto, serving globally.',
  images: [
    { url: `${getServerSideURL()}/opengraph-image.jpg` },
  ].filter(Boolean),
  siteName: 'Alassali Jewelry',
  title: 'Alassali Jewelry - Custom Jewelry & Grillz | Toronto',
}

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images?.length ? og.images : defaultOpenGraph.images,
  }
}
