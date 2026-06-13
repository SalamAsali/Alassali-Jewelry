import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChains, getPricingConfig } from '@/lib/datocms'
import type { MetalColor, ChainType } from '@/lib/datocms'
import ChainCard from '@/components/chains/ChainCard'

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
    title: `${typeLabel} ${metalLabel} Chains | Alasali Jewelry`,
    description: `Browse our ${typeLabel.toLowerCase()} ${metalLabel.toLowerCase()} chain collection. Handcrafted in Toronto with exceptional quality.`,
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

  const [chains, pricingConfig] = await Promise.all([
    getChains({ filter: { metal: metalColor, chainType: chainTypeValue } }),
    getPricingConfig(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-20 gradient-hero">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-glacier-grey mb-6">
            <Link href="/chains" className="hover:text-deep-charcoal transition-colors">
              Chains
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

      {/* Filter bar showing current metal and type */}
      <section className="py-6 border-b border-stone/30">
        <div className="section-container">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/chains/${metal}`}
              className="px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide bg-warm-white text-charcoal border border-stone hover:border-glacier-grey transition-all duration-300"
            >
              All Types
            </Link>
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide bg-soft-black text-white"
            >
              {typeLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          {chains.length > 0 && pricingConfig ? (
            <>
              <p className="text-sm text-glacier-grey mb-6">
                {chains.length} chain{chains.length !== 1 ? 's' : ''} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {chains.map((chain) => (
                  <ChainCard
                    key={chain.id}
                    chain={chain}
                    pricingConfig={pricingConfig}
                  />
                ))}
              </div>
            </>
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
