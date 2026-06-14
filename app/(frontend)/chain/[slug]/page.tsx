import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getChainBySlug, getChains, getPricingConfig } from '@/lib/datocms'
import ChainProductDetail from './ChainProductDetail'

type ChainDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ChainDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const chain = await getChainBySlug(slug)
  if (!chain) return {}
  return {
    title: chain.seoTitle || `${chain.name} | Alasali Jewelry`,
    description:
      chain.seoDescription ||
      `${chain.name} — ${chain.widthMm}mm ${chain.chainType} chain. Handcrafted in Toronto. Available in multiple karats and lengths.`,
  }
}

export default async function ChainDetailPage({ params }: ChainDetailPageProps) {
  const { slug } = await params

  const [chain, pricingConfig] = await Promise.all([
    getChainBySlug(slug),
    getPricingConfig(),
  ])

  if (!chain || !pricingConfig) {
    notFound()
  }

  // Fetch related chains: same chainType first, then same metal to fill up to 4
  const [sameTypeChains, sameMetalChains] = await Promise.all([
    getChains({ filter: { chainType: chain.chainType }, limit: 5 }),
    getChains({ filter: { metal: chain.defaultMetal }, limit: 8 }),
  ])

  // Exclude current chain, pick up to 4
  const relatedByType = sameTypeChains.filter((c) => c.id !== chain.id)
  const relatedChains = relatedByType.slice(0, 4)

  // If fewer than 4 from same type, fill from same metal
  if (relatedChains.length < 4) {
    const existingIds = new Set([chain.id, ...relatedChains.map((c) => c.id)])
    const metalFill = sameMetalChains.filter((c) => !existingIds.has(c.id))
    relatedChains.push(...metalFill.slice(0, 4 - relatedChains.length))
  }

  return (
    <div>
      <ChainProductDetail
        chain={chain}
        pricingConfig={pricingConfig}
        relatedChains={relatedChains}
      />
    </div>
  )
}
