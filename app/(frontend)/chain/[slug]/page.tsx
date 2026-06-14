import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getChainBySlug, getChains, getPricingConfig } from '@/lib/datocms'
import { formatChainName } from '@/lib/format-chain-name'
import { computeWeight, priceForChain } from '@/lib/pricing'
import type { Karat } from '@/lib/pricing'
import ChainProductDetail from './ChainProductDetail'

const SITE_URL = 'https://www.alasalicustomjewelry.ca'

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

type ChainDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ChainDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const chain = await getChainBySlug(slug)
  if (!chain) return {}

  const formattedName = formatChainName(chain.name, chain.widthMm)
  const karats = chain.availableKarats.map((k) => k.toUpperCase()).join(', ')
  const metalLabel = chain.defaultMetal === 'yellow-gold' ? 'Yellow Gold'
    : chain.defaultMetal === 'white-gold' ? 'White Gold'
    : chain.defaultMetal === 'rose-gold' ? 'Rose Gold'
    : 'Two-Tone'

  return {
    title: chain.seoTitle || `${formattedName} - ${metalLabel} ${chain.widthMm}mm | Al-Assali Jewelry`,
    description:
      chain.seoDescription ||
      `${formattedName}. Available in ${karats}. ${chain.construction.charAt(0).toUpperCase() + chain.construction.slice(1)} gold chain, ${chain.widthMm}mm width. Handcrafted in Toronto.`,
    alternates: {
      canonical: `${SITE_URL}/chain/${slug}`,
    },
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

  // --- JSON-LD Schema ---
  const formattedName = formatChainName(chain.name, chain.widthMm)
  const heroImageUrl = chain.heroImage?.responsiveImage?.src || chain.heroImage?.url || ''
  const typeLabel = CHAIN_TYPE_LABELS[chain.chainType] || chain.chainType
  const metalSlug = chain.defaultMetal || 'yellow-gold'

  // Compute low price (lowest karat, shortest length) and high price (highest karat, longest length)
  const karatOrder: Karat[] = ['10k', '14k', '18k']
  const sortedKarats = chain.availableKarats.slice().sort(
    (a, b) => karatOrder.indexOf(a) - karatOrder.indexOf(b)
  )
  const sortedLengths = chain.availableLengths.slice().sort((a, b) => a - b)

  const lowestKarat = sortedKarats[0]
  const highestKarat = sortedKarats[sortedKarats.length - 1]
  const shortestLength = sortedLengths[0]
  const longestLength = sortedLengths[sortedLengths.length - 1]

  const lowWeight = computeWeight(chain.widthMm, chain.weightPerInchG, shortestLength)
  const highWeight = computeWeight(chain.widthMm, chain.weightPerInchG, longestLength)

  const lowPrice = priceForChain({
    weightG: lowWeight,
    karat: lowestKarat,
    widthMm: chain.widthMm,
    config: pricingConfig,
  })
  const highPrice = priceForChain({
    weightG: highWeight,
    karat: highestKarat,
    widthMm: chain.widthMm,
    config: pricingConfig,
  })

  const offerCount = chain.availableKarats.length * chain.availableLengths.length

  // Default weight for schema
  const defaultLength = chain.defaultLengthIn || shortestLength
  const defaultWeight = computeWeight(chain.widthMm, chain.weightPerInchG, defaultLength)

  // Price valid until tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const priceValidUntil = tomorrow.toISOString().split('T')[0]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: formattedName,
      description:
        chain.description ||
        `${formattedName}. ${chain.construction.charAt(0).toUpperCase() + chain.construction.slice(1)} gold chain, ${chain.widthMm}mm width. Handcrafted in Toronto.`,
      image: heroImageUrl,
      sku: chain.supplierSku || chain.slug,
      brand: {
        '@type': 'Brand',
        name: 'Al-Assali Jewelry',
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'CAD',
        lowPrice: lowPrice,
        highPrice: highPrice,
        offerCount: offerCount,
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/chain/${chain.slug}`,
        priceValidUntil: priceValidUntil,
        seller: {
          '@type': 'Organization',
          name: 'Al-Assali Custom Jewelry',
        },
      },
      material: 'Gold',
      weight: {
        '@type': 'QuantitativeValue',
        value: Math.round(defaultWeight * 100) / 100,
        unitCode: 'GRM',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Gold Chains',
          item: `${SITE_URL}/chains/${metalSlug}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: typeLabel,
          item: `${SITE_URL}/chains/${metalSlug}/${chain.chainType}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: formattedName,
        },
      ],
    },
  ]

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChainProductDetail
        chain={chain}
        pricingConfig={pricingConfig}
        relatedChains={relatedChains}
      />
    </div>
  )
}
