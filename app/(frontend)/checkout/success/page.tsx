'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'

export const dynamic = 'force-dynamic'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden flex items-center justify-center">
      <DotPattern />
      <DiamondPattern className="text-white" />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto text-center px-4 relative z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="inline-block mb-8">
          <div className="w-32 h-32 rounded-full bg-glacier-grey/20 flex items-center justify-center">
            <CheckCircle2 className="w-20 h-20 text-glacier-grey" />
          </div>
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Order Confirmed!</h1>
        <p className="text-xl text-stone mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
        <p className="text-stone mb-12 max-w-2xl mx-auto">You will receive an email confirmation shortly with your order details and tracking information.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-white/10 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-soft-black transition-all">Return Home</Link>
          <Link href="/catalog" className="bg-glacier-grey text-soft-black px-8 py-3 rounded-lg font-semibold hover:bg-glacier-grey-light transition-all">Continue Shopping</Link>
        </div>
      </motion.div>
    </div>
  )
}
