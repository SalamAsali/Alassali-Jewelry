'use client'

import { useState, useCallback } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'

export interface FilterState {
  priceRange: string | null
  width: string | null
  karat: string | null
  construction: string | null
}

interface ChainFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  /** Number of results currently shown */
  resultCount?: number
}

const PRICE_RANGES = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1000', label: '$500 – $1,000' },
  { value: '1000-2500', label: '$1,000 – $2,500' },
  { value: '2500-5000', label: '$2,500 – $5,000' },
  { value: '5000-plus', label: '$5,000+' },
]

const WIDTH_RANGES = [
  { value: 'under-2', label: 'Under 2mm' },
  { value: '2-3', label: '2 – 3mm' },
  { value: '3-5', label: '3 – 5mm' },
  { value: '5-plus', label: '5mm+' },
]

const KARATS = [
  { value: '10k', label: '10K' },
  { value: '14k', label: '14K' },
  { value: '18k', label: '18K' },
]

const CONSTRUCTIONS = [
  { value: 'solid', label: 'Solid' },
  { value: 'hollow', label: 'Hollow' },
  { value: 'semi-solid', label: 'Semi-Solid' },
]

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-soft-black text-white'
          : 'bg-warm-white text-charcoal border border-stone hover:border-glacier-grey'
      }`}
    >
      {label}
    </button>
  )
}

export default function ChainFilters({ filters, onChange, resultCount }: ChainFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters = filters.priceRange || filters.width || filters.karat || filters.construction
  const activeCount = [filters.priceRange, filters.width, filters.karat, filters.construction].filter(Boolean).length

  const toggle = useCallback(
    (key: keyof FilterState, value: string) => {
      onChange({
        ...filters,
        [key]: filters[key] === value ? null : value,
      })
    },
    [filters, onChange]
  )

  const clearAll = useCallback(() => {
    onChange({ priceRange: null, width: null, karat: null, construction: null })
  }, [onChange])

  return (
    <div>
      {/* Desktop: inline filter bar */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap items-start gap-6">
          {/* Price Range */}
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2">Price</p>
            <div className="flex flex-wrap gap-1.5">
              {PRICE_RANGES.map((r) => (
                <FilterChip
                  key={r.value}
                  label={r.label}
                  isActive={filters.priceRange === r.value}
                  onClick={() => toggle('priceRange', r.value)}
                />
              ))}
            </div>
          </div>

          {/* Width */}
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2">Width</p>
            <div className="flex flex-wrap gap-1.5">
              {WIDTH_RANGES.map((r) => (
                <FilterChip
                  key={r.value}
                  label={r.label}
                  isActive={filters.width === r.value}
                  onClick={() => toggle('width', r.value)}
                />
              ))}
            </div>
          </div>

          {/* Karat */}
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2">Karat</p>
            <div className="flex flex-wrap gap-1.5">
              {KARATS.map((r) => (
                <FilterChip
                  key={r.value}
                  label={r.label}
                  isActive={filters.karat === r.value}
                  onClick={() => toggle('karat', r.value)}
                />
              ))}
            </div>
          </div>

          {/* Construction */}
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-2">Construction</p>
            <div className="flex flex-wrap gap-1.5">
              {CONSTRUCTIONS.map((r) => (
                <FilterChip
                  key={r.value}
                  label={r.label}
                  isActive={filters.construction === r.value}
                  onClick={() => toggle('construction', r.value)}
                />
              ))}
            </div>
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <div className="self-end">
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-glacier-grey hover:text-deep-charcoal transition-colors underline underline-offset-2"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: toggle button + slide-in panel */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone text-sm font-medium text-charcoal hover:border-glacier-grey transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-soft-black text-white text-xs flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile slide-in overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          {/* Panel */}
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone/30">
              <h3 className="font-heading text-xl font-medium text-deep-charcoal">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-warm-white transition-colors"
              >
                <X className="w-5 h-5 text-glacier-grey" />
              </button>
            </div>

            {/* Filter sections */}
            <div className="p-4 space-y-6">
              {/* Price Range */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-3">Price Range</p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((r) => (
                    <FilterChip
                      key={r.value}
                      label={r.label}
                      isActive={filters.priceRange === r.value}
                      onClick={() => toggle('priceRange', r.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Width */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-3">Width</p>
                <div className="flex flex-wrap gap-2">
                  {WIDTH_RANGES.map((r) => (
                    <FilterChip
                      key={r.value}
                      label={r.label}
                      isActive={filters.width === r.value}
                      onClick={() => toggle('width', r.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Karat */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-3">Karat</p>
                <div className="flex flex-wrap gap-2">
                  {KARATS.map((r) => (
                    <FilterChip
                      key={r.value}
                      label={r.label}
                      isActive={filters.karat === r.value}
                      onClick={() => toggle('karat', r.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Construction */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-glacier-grey mb-3">Construction</p>
                <div className="flex flex-wrap gap-2">
                  {CONSTRUCTIONS.map((r) => (
                    <FilterChip
                      key={r.value}
                      label={r.label}
                      isActive={filters.construction === r.value}
                      onClick={() => toggle('construction', r.value)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone/30 space-y-3">
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="w-full text-center text-sm text-glacier-grey hover:text-deep-charcoal transition-colors underline underline-offset-2"
                >
                  Clear all filters
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-lg bg-soft-black text-white font-bold text-sm uppercase tracking-wide hover:bg-charcoal transition-colors"
              >
                Show Results{resultCount !== undefined ? ` (${resultCount})` : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Helper: check if a chain passes the current filters.
 * Used by parent components to filter chains client-side.
 */
export function chainMatchesFilters(
  chain: {
    widthMm: number
    availableKarats: string[]
    construction: string
  },
  startingPrice: number,
  filters: FilterState
): boolean {
  // Price range
  if (filters.priceRange) {
    switch (filters.priceRange) {
      case 'under-500':
        if (startingPrice >= 500) return false
        break
      case '500-1000':
        if (startingPrice < 500 || startingPrice >= 1000) return false
        break
      case '1000-2500':
        if (startingPrice < 1000 || startingPrice >= 2500) return false
        break
      case '2500-5000':
        if (startingPrice < 2500 || startingPrice >= 5000) return false
        break
      case '5000-plus':
        if (startingPrice < 5000) return false
        break
    }
  }

  // Width
  if (filters.width) {
    switch (filters.width) {
      case 'under-2':
        if (chain.widthMm >= 2) return false
        break
      case '2-3':
        if (chain.widthMm < 2 || chain.widthMm > 3) return false
        break
      case '3-5':
        if (chain.widthMm < 3 || chain.widthMm > 5) return false
        break
      case '5-plus':
        if (chain.widthMm < 5) return false
        break
    }
  }

  // Karat
  if (filters.karat) {
    if (!chain.availableKarats.includes(filters.karat)) return false
  }

  // Construction
  if (filters.construction) {
    if (chain.construction !== filters.construction) return false
  }

  return true
}
