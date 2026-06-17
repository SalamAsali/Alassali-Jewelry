import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChains, getPricingConfig } from '@/lib/datocms'
import type { MetalColor, ChainType } from '@/lib/datocms'
import ChainGrid from '@/components/chains/ChainGrid'
import ChainTypeScroller from '@/components/chains/ChainTypeScroller'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

const VALID_METALS: MetalColor[] = ['yellow-gold', 'white-gold', 'rose-gold', 'two-tone']

const METAL_LABELS: Record<string, string> = {
  'yellow-gold': 'Yellow Gold',
  'white-gold': 'White Gold',
  'rose-gold': 'Rose Gold',
  'two-tone': 'Two-Tone',
}

const VALID_CHAIN_TYPES: ChainType[] = [
  'cuban', 'figaro', 'rope', 'box', 'byzantine', 'snake',
  'herringbone', 'mariner', 'curb', 'wheat', 'franco', 'cable',
  'bead', 'paperclip', 'round-link', 'anchor', 'singapore',
  'oval-link', 'domed-cuban',
]

const CHAIN_TYPE_LABELS: Record<string, string> = {
  cuban: 'Cuban',
  figaro: 'Figaro',
  rope: 'Rope',
  box: 'Box',
  byzantine: 'Byzantine',
  snake: 'Snake',
  herringbone: 'Herringbone',
  mariner: 'Mariner',
  curb: 'Curb',
  wheat: 'Wheat',
  franco: 'Franco',
  cable: 'Cable',
  bead: 'Bead',
  paperclip: 'Paperclip',
  'round-link': 'Round Link',
  anchor: 'Anchor',
  singapore: 'Singapore',
  'oval-link': 'Oval Link',
  'domed-cuban': 'Domed Cuban',
}

type ChainTypePageProps = {
  params: Promise<{ metal: string; chainType: string }>
}

export async function generateMetadata({ params }: ChainTypePageProps): Promise<Metadata> {
  const { metal, chainType } = await params
  const metalLabel = METAL_LABELS[metal]
  const typeLabel = CHAIN_TYPE_LABELS[chainType]
  if (!metalLabel || !typeLabel) return {}
  return {
    title: `${typeLabel} ${metalLabel} Chains`,
    description: `Shop ${typeLabel.toLowerCase()} chains in ${metalLabel.toLowerCase()}. Available in 10K, 14K & 18K. Handcrafted in Toronto with premium craftsmanship.`,
    alternates: {
      canonical: `https://www.alasalicustomjewelry.ca/chains/${metal}/${chainType}`,
    },
    openGraph: mergeOpenGraph({
      title: `${typeLabel} ${metalLabel} Chains | Al-Asali Jewelry`,
      description: `Shop ${typeLabel.toLowerCase()} chains in ${metalLabel.toLowerCase()}. Available in 10K, 14K & 18K. Handcrafted in Toronto.`,
      url: `/chains/${metal}/${chainType}`,
    }),
  }
}

export default async function ChainTypePage({ params }: ChainTypePageProps) {
  const { metal, chainType } = await params

  if (!VALID_METALS.includes(metal as MetalColor)) {
    notFound()
  }
  if (!VALID_CHAIN_TYPES.includes(chainType as ChainType)) {
    notFound()
  }

  const metalColor = metal as MetalColor
  const chainTypeValue = chainType as ChainType
  const metalLabel = METAL_LABELS[metal]
  const typeLabel = CHAIN_TYPE_LABELS[chainType]

  const [allMetalChains, chains, pricingConfig] = await Promise.all([
    getChains({ filter: { metal: metalColor } }),
    getChains({ filter: { metal: metalColor, chainType: chainTypeValue } }),
    getPricingConfig(),
  ])

  // Count chains per type for scroller
  const typeCounts: Record<string, number> = {}
  for (const chain of allMetalChains) {
    typeCounts[chain.chainType] = (typeCounts[chain.chainType] || 0) + 1
  }

  // ItemList JSON-LD schema
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${typeLabel} ${metalLabel} Chains`,
    numberOfItems: chains.length,
    itemListElement: chains.slice(0, 10).map((chain, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.alasalicustomjewelry.ca/chain/${chain.slug}`,
    })),
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {/* Hero */}
      <section className="py-16 sm:py-20 gradient-hero">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-glacier-grey mb-6">
            <Link href="/chains" className="hover:text-deep-charcoal transition-colors">
              All
            </Link>
            <span>/</span>
            <Link
              href={`/chains/${metal}`}
              className="hover:text-deep-charcoal transition-colors"
            >
              {metalLabel}
            </Link>
            <span>/</span>
            <span className="text-deep-charcoal font-medium">{typeLabel}</span>
          </nav>

          <h1 className="heading-hero text-deep-charcoal mb-4">
            {typeLabel} {metalLabel} Chains
          </h1>
          <p className="text-lg text-glacier-grey max-w-2xl leading-relaxed">
            Discover our {typeLabel.toLowerCase()} link chains in {metalLabel.toLowerCase()},
            available in multiple karats and lengths.
          </p>
        </div>
      </section>

      {/* Chain Type Scroller */}
      <section className="py-6 sm:py-8 border-b border-stone/30">
        <div className="section-container">
          <ChainTypeScroller
            basePath={`/chains/${metal}`}
            activeType={chainType}
            typeCounts={typeCounts}
          />
        </div>
      </section>

      {/* BNPL Banner */}
      <section className="py-4 sm:py-5">
        <div className="section-container">
          <div className="bg-warm-white border border-stone rounded-lg p-3 text-center text-sm text-charcoal">
            Buy Now, Pay Later — Split your purchase into 4 interest-free payments
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 sm:py-12">
        <div className="section-container">
          {chains.length > 0 && pricingConfig ? (
            <ChainGrid
              chains={chains}
              pricingConfig={pricingConfig}
              showFilters
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-heading text-deep-charcoal mb-2">
                No {typeLabel.toLowerCase()} chains found
              </p>
              <p className="text-glacier-grey mb-6">
                We don&apos;t have any {typeLabel.toLowerCase()} {metalLabel.toLowerCase()} chains
                at the moment. Try browsing all {metalLabel.toLowerCase()} chains.
              </p>
              <Link
                href={`/chains/${metal}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                View All {metalLabel} Chains
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
