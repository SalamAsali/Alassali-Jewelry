import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChains, getPricingConfig } from '@/lib/datocms'
import type { MetalColor } from '@/lib/datocms'
import ChainGrid from '@/components/chains/ChainGrid'
import ChainTypeScroller from '@/components/chains/ChainTypeScroller'

const VALID_METALS: MetalColor[] = ['yellow-gold', 'white-gold', 'rose-gold', 'two-tone']

const METAL_LABELS: Record<string, string> = {
  'yellow-gold': 'Yellow Gold',
  'white-gold': 'White Gold',
  'rose-gold': 'Rose Gold',
  'two-tone': 'Two-Tone',
}

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

  // Count chains per type
  const typeCounts: Record<string, number> = {}
  for (const chain of chains) {
    typeCounts[chain.chainType] = (typeCounts[chain.chainType] || 0) + 1
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-20 gradient-hero">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-glacier-grey mb-6">
            <Link href="/chains" className="hover:text-deep-charcoal transition-colors">
              All
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

      {/* Chain Type Scroller */}
      <section className="py-6 sm:py-8 border-b border-stone/30">
        <div className="section-container">
          <ChainTypeScroller
            basePath={`/chains/${metal}`}
            activeType={null}
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
