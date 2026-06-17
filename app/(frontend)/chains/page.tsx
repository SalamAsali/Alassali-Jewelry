import type { Metadata } from 'next'
import { getChainsLanding, getChains, getPricingConfig } from '@/lib/datocms'
import MetalPicker from '@/components/chains/MetalPicker'
import ChainGrid from '@/components/chains/ChainGrid'
import ChainTypeScroller from '@/components/chains/ChainTypeScroller'

export const metadata: Metadata = {
  title: 'Gold Chains Collection — Cuban, Figaro & Rope',
  description:
    'Explore our handcrafted gold chain collection. Cuban, Figaro, Rope, and more in Yellow Gold and White Gold. Made in Toronto.',
}

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

      {/* Chain Type Scroller */}
      <section className="py-8 sm:py-10 border-b border-stone/30">
        <div className="section-container">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-4">
            Shop by Style
          </h2>
          <ChainTypeScroller
            basePath="/chains/yellow-gold"
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

      {/* Featured Chains */}
      {featuredChains.length > 0 && pricingConfig && (
        <section className="py-16 sm:py-20 bg-warm-white">
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
        <section className="py-16 sm:py-20">
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
