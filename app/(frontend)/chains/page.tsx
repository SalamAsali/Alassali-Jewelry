import type { Metadata } from 'next'
import { getChainsLanding, getChains, getPricingConfig } from '@/lib/datocms'
import MetalPicker from '@/components/chains/MetalPicker'
import ChainCard from '@/components/chains/ChainCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gold Chains Collection | Alasali Jewelry',
  description:
    'Explore our handcrafted gold chain collection. Cuban, Figaro, Rope, and more in Yellow Gold and White Gold. Made in Toronto.',
}

const CHAIN_TYPES = [
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

export default async function ChainsPage() {
  const [landing, featuredChains, pricingConfig] = await Promise.all([
    getChainsLanding(),
    getChains({ filter: { featured: true }, limit: 8 }),
    getPricingConfig(),
  ])

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

      {/* Shop by Type */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="section-container">
          <h2 className="heading-section text-deep-charcoal text-center mb-3">
            Shop by Type
          </h2>
          <p className="text-center text-glacier-grey mb-10 max-w-lg mx-auto">
            Find the perfect chain style for any occasion
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CHAIN_TYPES.map((type) => (
              <Link
                key={type.slug}
                href={`/chains/yellow-gold/${type.slug}`}
                className="rounded-lg border-2 border-soft-black hover:border-glacier-grey p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.03] bg-white group"
              >
                <h3 className="font-heading text-xl font-medium text-deep-charcoal group-hover:text-glacier-grey transition-colors">
                  {type.label}
                </h3>
                <p className="text-xs uppercase tracking-wider text-glacier-grey mt-1">
                  Chain
                </p>
              </Link>
            ))}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredChains.map((chain) => (
                <ChainCard
                  key={chain.id}
                  chain={chain}
                  pricingConfig={pricingConfig}
                />
              ))}
            </div>
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
