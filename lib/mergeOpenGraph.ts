import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Toronto\'s premier custom jeweller. Bespoke engagement rings, wedding bands, gold chains, diamond pendants, and custom grillz — handcrafted in-house. 5-star rated on Google.',
  images: [
    { url: `${getServerSideURL()}/opengraph-image.jpg` },
  ].filter(Boolean),
  siteName: 'Al-Assali Jewelry',
  locale: 'en_CA',
  title: 'Custom Jeweller Toronto | Bespoke Engagement Rings, Chains & Grillz — Al-Assali Jewelry',
}

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images?.length ? og.images : defaultOpenGraph.images,
  }
}
