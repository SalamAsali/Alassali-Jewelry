'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/pricing'

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart()
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
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned:', data)
      }
    } catch (err) {
      console.error('Checkout failed:', err)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="bg-off-white py-12">
      <div className="section-container">
        <h1 className="heading-section mb-8">Shopping Cart</h1>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-taupe mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-deep-charcoal mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Your cart is empty</h2>
            <p className="text-taupe mb-8">Browse our gold chain collection to find the perfect piece.</p>
            <Link href="/chains" className="inline-block bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300">
              Browse Chains
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-6 border-2 border-soft-black">
                  <div className="flex gap-4 sm:gap-6">
                    {item.image && (
                      <Link href={`/chain/${item.slug}`}>
                        <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0" />
                      </Link>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link href={`/chain/${item.slug}`} className="hover:text-glacier-grey transition-colors">
                        <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-1 line-clamp-2">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-glacier-grey mb-3">
                        {item.karat.toUpperCase()} {item.metal.replace(/-/g, ' ')} &middot; {item.lengthIn}&quot; &middot; {item.weightG.toFixed(1)}g
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-stone rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-warm-white transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-warm-white transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-glacier-grey hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-heading text-xl font-bold text-deep-charcoal">
                        {formatPrice(item.priceCad * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-glacier-grey mt-1">{formatPrice(item.priceCad)} each</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 border-2 border-soft-black sticky top-24">
                <h2 className="font-heading text-xl font-semibold text-deep-charcoal mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-charcoal">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal">
                    <span>Shipping</span>
                    <span className="text-glacier-grey">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal">
                    <span>Tax (HST)</span>
                    <span className="text-glacier-grey">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-stone pt-3 flex justify-between">
                    <span className="font-heading text-lg font-semibold text-deep-charcoal">Total</span>
                    <span className="font-heading text-xl font-bold text-deep-charcoal">{formatPrice(subtotal)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="block w-full bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white text-center px-8 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
                >
                  {isCheckingOut ? 'Redirecting to Stripe...' : 'Proceed to Checkout'}
                </button>
                <Link href="/chains" className="block w-full text-center mt-4 text-sm text-glacier-grey hover:text-deep-charcoal transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
