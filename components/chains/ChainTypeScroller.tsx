'use client'

import Link from 'next/link'
import { useRef } from 'react'

interface ChainTypeTile {
  slug: string
  label: string
}

interface ChainTypeScrollerProps {
  /** Base path e.g. "/chains/yellow-gold" */
  basePath: string
  /** Currently active chain type slug, or null for "All" */
  activeType?: string | null
  /** Optional counts per type */
  typeCounts?: Record<string, number>
}

const CHAIN_TYPES: ChainTypeTile[] = [
  { slug: 'cuban', label: 'Cuban' },
  { slug: 'rope', label: 'Rope' },
  { slug: 'franco', label: 'Franco' },
  { slug: 'figaro', label: 'Figaro' },
  { slug: 'curb', label: 'Curb' },
  { slug: 'box', label: 'Box' },
  { slug: 'byzantine', label: 'Byzantine' },
  { slug: 'snake', label: 'Snake' },
  { slug: 'wheat', label: 'Wheat' },
  { slug: 'anchor', label: 'Anchor' },
  { slug: 'cable', label: 'Cable' },
  { slug: 'paperclip', label: 'Paperclip' },
]

/** CSS pattern backgrounds per chain type */
const CHAIN_PATTERNS: Record<string, React.CSSProperties> = {
  cuban: {
    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(255,255,255,0.06) 6px, rgba(255,255,255,0.06) 8px), repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(255,255,255,0.06) 6px, rgba(255,255,255,0.06) 8px)`,
  },
  rope: {
    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.07) 4px, rgba(255,255,255,0.07) 6px), repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.07) 4px, rgba(255,255,255,0.07) 6px)`,
  },
  franco: {
    backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 5px, rgba(255,255,255,0.06) 5px, rgba(255,255,255,0.06) 7px)`,
  },
  figaro: {
    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 12px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.04) 20px, rgba(255,255,255,0.04) 22px)`,
  },
  curb: {
    backgroundImage: `repeating-linear-gradient(30deg, transparent, transparent 7px, rgba(255,255,255,0.06) 7px, rgba(255,255,255,0.06) 9px)`,
  },
  box: {
    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.07) 8px, rgba(255,255,255,0.07) 10px), repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.07) 8px, rgba(255,255,255,0.07) 10px)`,
  },
  byzantine: {
    backgroundImage: `repeating-conic-gradient(rgba(255,255,255,0.04) 0% 25%, transparent 0% 50%) 0 0 / 12px 12px`,
  },
  snake: {
    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 5px)`,
  },
  wheat: {
    backgroundImage: `repeating-linear-gradient(120deg, transparent, transparent 5px, rgba(255,255,255,0.06) 5px, rgba(255,255,255,0.06) 7px), repeating-linear-gradient(-120deg, transparent, transparent 5px, rgba(255,255,255,0.04) 5px, rgba(255,255,255,0.04) 7px)`,
  },
  anchor: {
    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.05) 12px, rgba(255,255,255,0.05) 14px)`,
  },
  cable: {
    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.06) 12px)`,
  },
  paperclip: {
    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(255,255,255,0.05) 16px, rgba(255,255,255,0.05) 18px), repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.04) 8px, rgba(255,255,255,0.04) 10px)`,
  },
}

export default function ChainTypeScroller({ basePath, activeType, typeCounts }: ChainTypeScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isAllActive = !activeType

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {/* "All" tile */}
        <Link
          href={basePath}
          className={`flex-shrink-0 relative w-[140px] sm:w-[180px] h-[110px] sm:h-[140px] rounded-lg overflow-hidden transition-all duration-300 group ${
            isAllActive
              ? 'border-2 border-glacier-grey shadow-lg'
              : 'border-2 border-soft-black/60 hover:border-glacier-grey hover:shadow-md'
          }`}
        >
          <div className="absolute inset-0 bg-deep-charcoal" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="relative h-full flex flex-col items-center justify-center px-3 text-center">
            <span className="font-heading text-2xl sm:text-3xl font-semibold text-white group-hover:text-stone transition-colors">
              All
            </span>
          </div>
        </Link>

        {/* Chain type tiles */}
        {CHAIN_TYPES.map((type) => {
          const isActive = activeType === type.slug
          const count = typeCounts?.[type.slug]
          return (
            <Link
              key={type.slug}
              href={`${basePath}/${type.slug}`}
              className={`flex-shrink-0 relative w-[140px] sm:w-[180px] h-[110px] sm:h-[140px] rounded-lg overflow-hidden transition-all duration-300 group ${
                isActive
                  ? 'border-2 border-glacier-grey shadow-lg'
                  : 'border-2 border-soft-black/60 hover:border-glacier-grey hover:shadow-md'
              }`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-deep-charcoal">
                <div
                  className="absolute inset-0"
                  style={CHAIN_PATTERNS[type.slug] || {}}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center px-3 text-center">
                <span className="font-heading text-xl sm:text-2xl font-semibold text-white group-hover:text-stone transition-colors leading-tight">
                  {type.label}
                </span>
                {count !== undefined && count > 0 && (
                  <span className="mt-1.5 text-[10px] sm:text-xs text-white/60 font-medium">
                    {count} chain{count !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
