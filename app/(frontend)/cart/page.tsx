'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image?: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch {
          setCartItems([])
        }
      }
    }
    setLoading(false)
  }, [])

  const updateCart = (items: CartItem[]) => {
    setCartItems(items)
    if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(items))
  }

  const removeItem = (id: string) => updateCart(cartItems.filter((item) => item.id !== id))

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    updateCart(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const getTotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const getItemCount = () => cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-champagne-gold border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="bg-off-white py-12">
      <div className="section-container">
        <h1 className="heading-section mb-8">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-taupe mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-deep-charcoal mb-4">Your cart is empty</h2>
            <p className="text-taupe mb-8">Start adding items to your cart to see them here.</p>
            <Link href="/catalog" className="inline-block bg-champagne-gold text-soft-black px-8 py-3 rounded-lg font-semibold hover:bg-warm-gold transition-all">Browse Collection</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-6 border border-stone shadow-sm">
                  <div className="flex gap-6">
                    {item.image && <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />}
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2">{item.title}</h3>
                      <p className="text-lg font-bold text-deep-charcoal mb-4">${item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-stone rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-soft-beige transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-soft-beige transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-error hover:text-red-700 transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-deep-charcoal">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 border border-stone shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-deep-charcoal mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-taupe"><span>Subtotal ({getItemCount()} items)</span><span>${getTotal().toLocaleString()}</span></div>
                  <div className="flex justify-between text-taupe"><span>Shipping</span><span>Calculated at checkout</span></div>
                  <div className="border-t border-stone pt-4 flex justify-between text-lg font-bold text-deep-charcoal"><span>Total</span><span>${getTotal().toLocaleString()}</span></div>
                </div>
                <Link href="/checkout" className="block w-full bg-champagne-gold text-soft-black text-center px-8 py-3 rounded-lg font-semibold hover:bg-warm-gold transition-all">Proceed to Checkout</Link>
                <Link href="/catalog" className="block w-full text-center mt-4 text-taupe hover:text-deep-charcoal transition-colors">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
