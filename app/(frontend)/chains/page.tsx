import type { Metadata } from 'next'
import { getChainsLanding, getChains, getPricingConfig } from '@/lib/datocms'
import MetalPicker from '@/components/chains/MetalPicker'
import ChainGrid from '@/components/chains/ChainGrid'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gold Chains Collection | Alasali Jewelry',
  description:
    'Explore our handcrafted gold chain collection. Cuban, Figaro, Rope, and more in Yellow Gold and White Gold. Made in Toronto.',
}

const CHAIN_TYPES = [
  { slug: 'cuban', label: 'Cuban' },
  { slug: 'rope', label: 'Rope' },
  { slug: 'franco', label: 'Franco' },
  { slug: 'figaro', label: 'Figaro' },
  { slug: 'curb', label: 'Curb' },
  { slug: 'box', label: 'Box' },
  { slug: 'wheat', label: 'Wheat' },
  { slug: 'byzantine', label: 'Byzantine' },
  { slug: 'snake', label: 'Snake' },
  { slug: 'herringbone', label: 'Herringbone' },
  { slug: 'mariner', label: 'Mariner' },
  { slug: 'cable', label: 'Cable' },
]

export default async function ChainsPage() {
  const [landing, allChains, featuredChains, pricingConfig] = await Promise.all([
    getChainsLanding(),
    getChains(),
    getChains({ filter: { featured: true }, limit: 8 }),
    getPricingConfig(),
  ])

  // Count chains per type for the category tiles
  const typeCounts: Record<string, number> = {}
  for (const chain of allChains) {
    typeCounts[chain.chainType] = (typeCounts[chain.chainType] || 0) + 1
  }

  const heroTitle = landing?.heroTitle || 'Gold Chains Collection'
  const heroSubtitle =
    landing?.heroSubtitle ||
    'Handcrafted gold chains in a variety of styles, karats, and lengths. Made in Toronto with exceptional craftsmanship.'

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 gradient-hero">
        <div className="section-container text-center">
          <h1 className="heading-hero text-deep-charcoal mb-4">{heroTitle}</h1>
          <p className="text-lg sm:text-xl text-glacier-grey max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Metal Picker */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-3">
            Shop by Metal
          </h2>
          <p className="text-center text-glacier-grey mb-10 max-w-lg mx-auto">
            Choose your preferred gold color to explore our full collection
          </p>
          <MetalPicker />
        </div>
      </section>

      {/* Shop by Type — Visual Tiles */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-3">
            Shop by Type
          </h2>
          <p className="text-center text-glacier-grey mb-10 max-w-lg mx-auto">
            Find the perfect chain style for any occasion
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CHAIN_TYPES.map((type) => {
              const count = typeCounts[type.slug] || 0
              return (
                <Link
                  key={type.slug}
                  href={`/chains/yellow-gold/${type.slug}`}
                  className="group relative h-32 rounded-lg border-2 border-soft-black overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.03] hover:border-glacier-grey"
                >
                  {/* CSS chain-link pattern background */}
                  <div className="absolute inset-0 bg-deep-charcoal">
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 8px,
                          rgba(255,255,255,0.15) 8px,
                          rgba(255,255,255,0.15) 10px
                        ), repeating-linear-gradient(
                          -45deg,
                          transparent,
                          transparent 8px,
                          rgba(255,255,255,0.15) 8px,
                          rgba(255,255,255,0.15) 10px
                        )`,
                      }}
                    />
                  </div>
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
                    <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white group-hover:text-stone transition-colors leading-tight">
                      {type.label}
                    </h3>
                    {count > 0 && (
                      <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-white/80 backdrop-blur-sm border border-white/10">
                        {count} chain{count !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Chains */}
      {featuredChains.length > 0 && pricingConfig && (
        <section className="py-16 sm:py-20">
          <div className="section-container">
            <h2 className="heading-section text-deep-charcoal text-center mb-3">
              Featured Chains
            </h2>
            <p className="text-center text-glacier-grey mb-10 max-w-lg mx-auto">
              Our most popular selections, handpicked for quality and style
            </p>
            <ChainGrid
              chains={featuredChains}
              pricingConfig={pricingConfig}
              columns={4}
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      {landing?.faqItems && landing.faqItems.length > 0 && (
        <section className="py-16 sm:py-20 bg-warm-white">
          <div className="section-container max-w-3xl">
            <h2 className="heading-section text-deep-charcoal text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {landing.faqItems.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-stone/50 p-6"
                >
                  <h3 className="font-heading text-lg font-medium text-deep-charcoal mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-charcoal leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
