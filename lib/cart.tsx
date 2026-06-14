'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface CartItem {
  id: string // unique key: chainId-karat-metal-length
  chainId: string
  slug: string
  name: string
  karat: string
  metal: string
  lengthIn: number
  widthMm: number
  weightG: number
  priceCad: number
  quantity: number
  image?: string | null
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

function generateCartId(item: { chainId: string; karat: string; metal: string; lengthIn: number }): string {
  return `${item.chainId}-${item.karat}-${item.metal}-${item.lengthIn}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('alassali-cart')
    if (saved) {
      try { setItems(JSON.parse(saved)) } catch { /* ignore */ }
    }
    setLoaded(true)
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('alassali-cart', JSON.stringify(items))
    }
  }, [items, loaded])

  const addItem = useCallback((newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    const id = generateCartId(newItem)
    setItems(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1, priceCad: newItem.priceCad } : i)
      }
      return [...prev, { ...newItem, id, quantity: 1 }]
    })
    setIsOpen(true) // Open mini cart on add
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id))
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem('alassali-cart')
  }, [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.priceCad * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
