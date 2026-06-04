import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Toronto\'s premier custom jeweler — bespoke engagement rings, gold chains, diamond pendants, and grillz handcrafted in-house. 5-star rated on Google.',
  images: [
    { url: `${getServerSideURL()}/images/portfolio/engagement-oval-halo-ring.jpg` },
  ].filter(Boolean),
  siteName: 'Al-Asali Jewelry',
  locale: 'en_CA',
  title: 'Custom Jeweler Toronto | Rings, Chains & Grillz — Al-Asali Jewelry',
}

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images?.length ? og.images : defaultOpenGraph.images,
  }
}
