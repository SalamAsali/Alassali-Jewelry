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

const CHAIN_TYPES: { slug: ChainType; label: string }[] = [
  { slug: 'cuban', label: 'Cuban' },
  { slug: 'figaro', label: 'Figaro' },
  { slug: 'rope', label: 'Rope' },
  { slug: 'box', label: 'Box' },
  { slug: 'byzantine', label: 'Byzantine' },
  { slug: 'snake', label: 'Snake' },
  { slug: 'herringbone', label: 'Herringbone' },
  { slug: 'mariner', label: 'Mariner' },
  { slug: 'curb', label: 'Curb' },
  { slug: 'wheat', label: 'Wheat' },
  { slug: 'franco', label: 'Franco' },
  { slug: 'cable', label: 'Cable' },
]

type MetalPageProps = {
  params: Promise<{ metal: string }>
}

export async function generateMetadata({ params }: MetalPageProps): Promise<Metadata> {
  const { metal } = await params
  const label = METAL_LABELS[metal]
  if (!label) return {}
  return {
    title: `${label} Chains | Alasali Jewelry`,
    description: `Browse our ${label.toLowerCase()} chain collection. Handcrafted in Toronto in a variety of styles, karats, and lengths.`,
  }
}

export default async function MetalPage({ params }: MetalPageProps) {
  const { metal } = await params

  if (!VALID_METALS.includes(metal as MetalColor)) {
    notFound()
  }

  const metalColor = metal as MetalColor
  const metalLabel = METAL_LABELS[metal]

  const [chains, pricingConfig] = await Promise.all([
    getChains({ filter: { metal: metalColor } }),
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
            <span className="text-deep-charcoal font-medium">{metalLabel}</span>
          </nav>

          <h1 className="heading-hero text-deep-charcoal mb-4">
            {metalLabel} Chains
          </h1>
          <p className="text-lg text-glacier-grey max-w-2xl leading-relaxed">
            Explore our collection of handcrafted {metalLabel.toLowerCase()} chains,
            available in multiple styles, karats, and lengths.
          </p>
        </div>
      </section>

      {/* Filter Chips */}
      <section className="py-6 border-b border-stone/30">
        <div className="section-container">
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/chains/${metal}`}
              className="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide bg-soft-black text-white"
            >
              All Types
            </Link>
            {CHAIN_TYPES.map((type) => (
              <Link
                key={type.slug}
                href={`/chains/${metal}/${type.slug}`}
                className="px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide bg-warm-white text-charcoal border border-stone hover:border-glacier-grey transition-all duration-300"
              >
                {type.label}
              </Link>
            ))}
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
                No chains found
              </p>
              <p className="text-glacier-grey mb-6">
                We don&apos;t have any {metalLabel.toLowerCase()} chains available at the
                moment. Check back soon or browse other metals.
              </p>
              <Link
                href="/chains"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Browse All Chains
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
