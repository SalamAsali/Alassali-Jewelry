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

const CHAIN_TYPE_POPULARITY: Record<string, number> = {
  cuban: 0, rope: 1, franco: 2, figaro: 3, curb: 4, box: 5,
  wheat: 6, byzantine: 7, anchor: 8, snake: 9, cable: 10,
  paperclip: 11, herringbone: 12, mariner: 13, bead: 14,
  'round-link': 15, singapore: 16, 'oval-link': 17, 'domed-cuban': 18,
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

    if (showFilters) {
      arr = arr.filter((chain) => {
        const price = getStartingPrice(chain, pricingConfig)
        return chainMatchesFilters(chain, price, filters)
      })
    }

    switch (sort) {
      case 'best-selling':
        return arr.sort((a, b) => (CHAIN_TYPE_POPULARITY[a.chainType] ?? 99) - (CHAIN_TYPE_POPULARITY[b.chainType] ?? 99))
      case 'price-low':
        return arr.sort((a, b) => getStartingPrice(a, pricingConfig) - getStartingPrice(b, pricingConfig))
      case 'price-high':
        return arr.sort((a, b) => getStartingPrice(b, pricingConfig) - getStartingPrice(a, pricingConfig))
      case 'newest':
        return arr.sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
      default:
        return arr
    }
  }, [chains, sort, pricingConfig, filters, showFilters])

  const gridCols = columns === 4
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  // Desktop: sidebar layout when filters are enabled
  if (showFilters) {
    return (
      <div className="lg:flex lg:gap-8">
        {/* Left sidebar — filters (desktop only) */}
        <aside className="hidden lg:block lg:w-[240px] lg:flex-shrink-0">
          <div className="sticky top-24 space-y-7">
            <h3 className="font-heading text-lg font-medium text-deep-charcoal">Filters</h3>
            <DesktopFilterSection
              title="Price"
              options={[
                { value: 'under-500', label: 'Under $500' },
                { value: '500-1000', label: '$500 – $1,000' },
                { value: '1000-2500', label: '$1,000 – $2,500' },
                { value: '2500-5000', label: '$2,500 – $5,000' },
                { value: '5000-plus', label: '$5,000+' },
              ]}
              active={filters.priceRange}
              onToggle={(v) => setFilters(f => ({ ...f, priceRange: f.priceRange === v ? null : v }))}
            />
            <DesktopFilterSection
              title="Width"
              options={[
                { value: 'under-2', label: 'Under 2mm' },
                { value: '2-3', label: '2 – 3mm' },
                { value: '3-5', label: '3 – 5mm' },
                { value: '5-plus', label: '5mm+' },
              ]}
              active={filters.width}
              onToggle={(v) => setFilters(f => ({ ...f, width: f.width === v ? null : v }))}
            />
            <DesktopFilterSection
              title="Karat"
              options={[
                { value: '10k', label: '10K' },
                { value: '14k', label: '14K' },
                { value: '18k', label: '18K' },
              ]}
              active={filters.karat}
              onToggle={(v) => setFilters(f => ({ ...f, karat: f.karat === v ? null : v }))}
            />
            <DesktopFilterSection
              title="Construction"
              options={[
                { value: 'solid', label: 'Solid' },
                { value: 'hollow', label: 'Hollow' },
                { value: 'semi-solid', label: 'Semi-Solid' },
              ]}
              active={filters.construction}
              onToggle={(v) => setFilters(f => ({ ...f, construction: f.construction === v ? null : v }))}
            />
            {(filters.priceRange || filters.width || filters.karat || filters.construction) && (
              <button
                onClick={() => setFilters({ priceRange: null, width: null, karat: null, construction: null })}
                className="text-xs text-glacier-grey hover:text-deep-charcoal transition-colors underline underline-offset-2"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <div className="lg:hidden">
                <ChainFilters
                  filters={filters}
                  onChange={setFilters}
                  resultCount={filteredAndSorted.length}
                />
              </div>
              <p className="text-sm text-glacier-grey">
                {filteredAndSorted.length} chain{filteredAndSorted.length !== 1 ? 's' : ''}
              </p>
            </div>
            {showSort && <SortDropdown sort={sort} onSort={setSort} />}
          </div>

          {/* Grid */}
          {filteredAndSorted.length > 0 ? (
            <div className={`grid ${gridCols} gap-5`}>
              {filteredAndSorted.map((chain) => (
                <ChainCard key={chain.id} chain={chain} pricingConfig={pricingConfig} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    )
  }

  // No filters — simple grid
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-glacier-grey">
          {filteredAndSorted.length} chain{filteredAndSorted.length !== 1 ? 's' : ''}
        </p>
        {showSort && <SortDropdown sort={sort} onSort={setSort} />}
      </div>

      {filteredAndSorted.length > 0 ? (
        <div className={`grid ${columns === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : gridCols} gap-5`}>
          {filteredAndSorted.map((chain) => (
            <ChainCard key={chain.id} chain={chain} pricingConfig={pricingConfig} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function SortDropdown({ sort, onSort }: { sort: SortOption; onSort: (s: SortOption) => void }) {
  return (
    <div className="relative">
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortOption)}
        className="appearance-none bg-white border border-stone rounded-lg px-4 py-2 pr-10 text-sm text-charcoal font-medium cursor-pointer hover:border-glacier-grey transition-colors focus:outline-none focus:ring-2 focus:ring-glacier-grey/30"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-glacier-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

function DesktopFilterSection({
  title,
  options,
  active,
  onToggle,
}: {
  title: string
  options: { value: string; label: string }[]
  active: string | null
  onToggle: (value: string) => void
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2.5">{title}</p>
      <div className="space-y-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onToggle(opt.value)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
              active === opt.value
                ? 'bg-soft-black text-white font-medium'
                : 'text-charcoal hover:bg-warm-white hover:text-deep-charcoal'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <p className="text-lg font-heading text-deep-charcoal mb-2">No chains match your filters</p>
      <p className="text-sm text-glacier-grey">Try adjusting your filters to see more results.</p>
    </div>
  )
}
