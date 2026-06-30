import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChains, getPricingConfig } from '@/lib/sanity'
import type { MetalColor } from '@/lib/sanity'
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

type MetalPageProps = {
  params: Promise<{ metal: string }>
}

export async function generateMetadata({ params }: MetalPageProps): Promise<Metadata> {
  const { metal } = await params
  const label = METAL_LABELS[metal]
  if (!label) return {}
  return {
    title: `${label} Gold Chains`,
    description: `Shop our collection of ${label.toLowerCase()} gold chains. Cuban, Rope, Franco, Figaro & more. Handcrafted in Toronto. 10K, 14K & 18K solid gold.`,
    alternates: {
      canonical: `https://www.alasalicustomjewelry.ca/chains/${metal}`,
    },
    openGraph: mergeOpenGraph({
      title: `${label} Gold Chains | Al-Asali Jewelry`,
      description: `Shop our collection of ${label.toLowerCase()} gold chains. Cuban, Rope, Franco, Figaro & more. Handcrafted in Toronto.`,
      url: `/chains/${metal}`,
    }),
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
    getChains({ metal: metalColor }),
    getPricingConfig(),
  ])

  // Count chains per type
  const typeCounts: Record<string, number> = {}
  for (const chain of chains) {
    typeCounts[chain.chainType] = (typeCounts[chain.chainType] || 0) + 1
  }

  // ItemList JSON-LD schema
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${metalLabel} Gold Chains`,
    numberOfItems: chains.length,
    itemListElement: chains.slice(0, 10).map((chain, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.alasalicustomjewelry.ca/chain/${chain.slug?.current ?? ''}`,
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
