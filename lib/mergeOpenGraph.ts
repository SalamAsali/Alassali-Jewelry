import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { CHAINS_ENABLED } from './featureFlags'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: CHAINS_ENABLED
    ? 'Toronto\'s premier custom jeweler. Bespoke engagement rings, gold chains, diamond pendants, and grillz handcrafted in-house. 5-star rated on Google.'
    : 'Toronto\'s premier custom jeweler. Bespoke engagement rings, diamond pendants, and grillz handcrafted in-house. 5-star rated on Google.',
  images: [
    { url: `${getServerSideURL()}/opengraph-image.png` },
  ].filter(Boolean),
  siteName: 'Al-Asali Jewelry',
  locale: 'en_CA',
  title: CHAINS_ENABLED
    ? 'Custom Jeweler Toronto | Rings, Chains & Grillz | Al-Asali Jewelry'
    : 'Custom Jeweler Toronto | Rings, Pendants & Grillz | Al-Asali Jewelry',
}

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images?.length ? og.images : defaultOpenGraph.images,
  }
}
