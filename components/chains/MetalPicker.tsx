'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface MetalPickerProps {
  basePath?: string
}

const metals = [
  {
    label: 'Yellow Gold',
    slug: 'yellow-gold',
    gradient: 'from-amber-300 via-yellow-400 to-amber-500',
  },
  {
    label: 'White Gold',
    slug: 'white-gold',
    gradient: 'from-gray-200 via-white to-gray-300',
  },
]

export default function MetalPicker({ basePath = '/chains' }: MetalPickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {metals.map((metal) => (
        <Link key={metal.slug} href={`${basePath}/${metal.slug}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-lg bg-soft-black h-64 flex items-center justify-center cursor-pointer group"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-soft-black/80 to-charcoal/60 group-hover:from-soft-black/70 group-hover:to-charcoal/40 transition-all duration-500" />

            {/* Gold text */}
            <h3
              className={`relative z-10 text-4xl sm:text-5xl font-heading font-light tracking-wide bg-gradient-to-r ${metal.gradient} bg-clip-text text-transparent`}
            >
              {metal.label}
            </h3>

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-glacier-grey/40 transition-all duration-500" />
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
