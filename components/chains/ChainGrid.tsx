'use client'

import { useState, useMemo } from 'react'
import type { Chain, PricingConfig } from '@/lib/datocms'
import { computeWeight, priceForChain } from '@/lib/pricing'
import type { Karat } from '@/lib/pricing'
import ChainCard from './ChainCard'
import ChainFilters, { chainMatchesFilters, type FilterState } from './ChainFilters'

interface ChainGridProps {
  chains: Chain[]
  pricingConfig: PricingConfig
  showSort?: boolean
  showFilters?: boolean
  columns?: 3 | 4
}

type SortOption = 'featured' | 'best-selling' | 'price-low' | 'price-high' | 'newest'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

/** Chain type popularity order for "Best Selling" sort */
const CHAIN_TYPE_POPULARITY: Record<string, number> = {
  cuban: 0,
  rope: 1,
  franco: 2,
  figaro: 3,
  curb: 4,
  box: 5,
  wheat: 6,
  byzantine: 7,
  anchor: 8,
  snake: 9,
  cable: 10,
  paperclip: 11,
  herringbone: 12,
  mariner: 13,
  bead: 14,
  'round-link': 15,
  singapore: 16,
  'oval-link': 17,
  'domed-cuban': 18,
}

function getStartingPrice(chain: Chain, pricingConfig: PricingConfig): number {
  const defaultKarat = chain.defaultKarat || chain.availableKarats[0]
  const defaultLength = chain.defaultLengthIn || chain.availableLengths[0]
  const weightG = computeWeight(chain.widthMm, chain.weightPerInchG, defaultLength)
  return priceForChain({
    weightG,
    karat: defaultKarat as Karat,
    widthMm: chain.widthMm,
    config: pricingConfig,
  })
}

export default function ChainGrid({
  chains,
  pricingConfig,
  showSort = true,
  showFilters = false,
  columns = 3,
}: ChainGridProps) {
  const [sort, setSort] = useState<SortOption>('featured')
  const [filters, setFilters] = useState<FilterState>({
    priceRange: null,
    width: null,
    karat: null,
    construction: null,
  })

  const filteredAndSorted = useMemo(() => {
    let arr = [...chains]

    // Apply filters if enabled
    if (showFilters) {
      arr = arr.filter((chain) => {
        const price = getStartingPrice(chain, pricingConfig)
        return chainMatchesFilters(chain, price, filters)
      })
    }

    // Sort
    switch (sort) {
      case 'best-selling':
        return arr.sort((a, b) => {
          const aRank = CHAIN_TYPE_POPULARITY[a.chainType] ?? 99
          const bRank = CHAIN_TYPE_POPULARITY[b.chainType] ?? 99
          return aRank - bRank
        })
      case 'price-low':
        return arr.sort(
          (a, b) => getStartingPrice(a, pricingConfig) - getStartingPrice(b, pricingConfig)
        )
      case 'price-high':
        return arr.sort(
          (a, b) => getStartingPrice(b, pricingConfig) - getStartingPrice(a, pricingConfig)
        )
      case 'newest':
        return arr.sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
      case 'featured':
      default:
        return arr
    }
  }, [chains, sort, pricingConfig, filters, showFilters])

  const gridCols =
    columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div>
      {/* Filters */}
      {showFilters && (
        <div className="mb-6">
          <ChainFilters
            filters={filters}
            onChange={setFilters}
            resultCount={filteredAndSorted.length}
          />
        </div>
      )}

      {/* Toolbar: count + sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-sm text-glacier-grey">
          Showing {filteredAndSorted.length} chain{filteredAndSorted.length !== 1 ? 's' : ''}
        </p>

        {showSort && (
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none bg-white border border-stone rounded-lg px-4 py-2 pr-10 text-sm text-charcoal font-medium cursor-pointer hover:border-glacier-grey transition-colors focus:outline-none focus:ring-2 focus:ring-glacier-grey/30 focus:border-glacier-grey"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Chevron icon */}
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-glacier-grey"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {/* Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className={`grid ${gridCols} gap-6`}>
          {filteredAndSorted.map((chain) => (
            <ChainCard key={chain.id} chain={chain} pricingConfig={pricingConfig} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg font-heading text-deep-charcoal mb-2">
            No chains match your filters
          </p>
          <p className="text-sm text-glacier-grey">
            Try adjusting your filters to see more results.
          </p>
        </div>
      )}
    </div>
  )
}
