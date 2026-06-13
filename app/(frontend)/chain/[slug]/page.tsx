import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getChainBySlug, getPricingConfig } from '@/lib/datocms'
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

  return (
    <div>
      <ChainProductDetail chain={chain} pricingConfig={pricingConfig} />
    </div>
  )
}
