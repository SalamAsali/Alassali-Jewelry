'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <main className="flex-grow">
        <div className="bg-off-white py-24">
          <div className="section-container max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-error/20 flex items-center justify-center mx-auto">
                <XCircle className="w-16 h-16 text-error" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Payment Cancelled
            </h1>
            <p className="text-lg text-taupe mb-8">
              Your payment was cancelled. No charges have been made.
            </p>
            <p className="text-taupe mb-12">
              If you experienced any issues, please contact us and we'll be happy to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cart"
                className="bg-champagne-gold text-soft-black px-8 py-3 rounded-lg font-semibold hover:bg-warm-gold transition-all"
              >
                Return to Cart
              </Link>
              <Link
                href="/catalog"
                className="bg-white border-2 border-deep-charcoal text-deep-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-deep-charcoal hover:text-white transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
