'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/pricing'

export default function MiniCart() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, isOpen, setIsOpen } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  async function handleCheckout() {
    if (items.length === 0) return
    setIsCheckingOut(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            chainId: item.chainId,
            name: item.name,
            slug: item.slug,
            karat: item.karat,
            metal: item.metal,
            lengthIn: item.lengthIn,
            widthMm: item.widthMm,
            weightG: item.weightG,
            priceCad: item.priceCad,
            heroImage: item.image,
            quantity: item.quantity,
          })),
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout failed:', err)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-[60]"
          />

          {/* Slide-out panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone">
              <h2 className="font-heading text-xl font-semibold text-deep-charcoal">
                Cart ({itemCount})
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-warm-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-stone mx-auto mb-4" />
                  <p className="text-taupe">Your cart is empty</p>
                  <Link
                    href="/chains"
                    onClick={() => setIsOpen(false)}
                    className="inline-block mt-4 text-sm font-semibold text-glacier-grey hover:text-glacier-grey-light"
                  >
                    Browse Chains →
                  </Link>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-stone/30">
                    {item.image && (
                      <Link href={`/chain/${item.slug}`} onClick={() => setIsOpen(false)}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border border-stone/30 flex-shrink-0"
                        />
                      </Link>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/chain/${item.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="font-heading text-sm font-medium text-deep-charcoal hover:text-glacier-grey line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-glacier-grey mt-0.5">
                        {item.karat.toUpperCase()} {item.metal.replace('-', ' ')} · {item.lengthIn}&quot;
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 border border-stone rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-warm-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-warm-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading text-sm font-semibold">
                            {formatPrice(item.priceCad * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-glacier-grey hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-stone bg-warm-white">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-charcoal">Subtotal</span>
                  <span className="font-heading text-lg font-bold text-deep-charcoal">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-glacier-grey mb-4">
                  Shipping &amp; taxes calculated at checkout
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center mt-3 text-sm text-glacier-grey hover:text-deep-charcoal transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
