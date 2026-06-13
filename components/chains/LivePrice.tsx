'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { formatPrice } from '@/lib/pricing'

interface LivePriceProps {
  price: number
}

export default function LivePrice({ price }: LivePriceProps) {
  return (
    <div className="flex items-baseline gap-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={price}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="text-3xl font-heading font-semibold text-deep-charcoal"
        >
          {formatPrice(price)}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-glacier-grey">CAD</span>
    </div>
  )
}
