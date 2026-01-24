'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import { getImageUrl } from '@/lib/getImageUrl'

export const dynamic = 'force-dynamic'

interface GalleryItem {
  id: string
  title: string
  description?: string
  image: { url?: string; filename?: string } | string
  category?: string
  featured?: boolean
}

function CatalogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    featured: searchParams.get('featured') || '',
  })

  useEffect(() => {
    fetchItems()
  }, [filters])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const params = new URLSearchParams()
      if (filters.category) params.append('category', filters.category)
      if (filters.featured) params.append('featured', filters.featured)
      const response = await fetch(`${baseUrl}/api/gallery?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)
    const params = new URLSearchParams()
    if (newFilters.category) params.set('category', newFilters.category)
    if (newFilters.featured) params.set('featured', newFilters.featured)
    router.push(`/catalog?${params.toString()}`)
  }

  const categories = [
    { value: '', label: 'All' },
    { value: 'engagement-rings', label: 'Engagement Rings' },
    { value: 'grillz', label: 'Grillz' },
    { value: 'chains', label: 'Chains' },
    { value: 'pendants', label: 'Pendants' },
    { value: 'rings', label: 'Rings' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
  ]

  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="heading-section text-center mb-4">Our Collection</h1>
          <p className="text-center text-taupe max-w-2xl mx-auto">Discover our curated selection of fine jewelry</p>
        </motion.div>
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-center" data-testid="product-filters">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-charcoal" />
            <span className="font-medium text-charcoal">Filters:</span>
          </div>
          <select
            value={filters.category}
            onChange={(e) => updateFilters({ ...filters, category: e.target.value })}
            className="input-field max-w-xs"
            data-testid="filter-category"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-taupe text-lg">No items found matching your filters.</p>
            <Link href="/catalog" className="text-champagne-gold hover:underline mt-4 inline-block">View All Items</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="product-grid">
            {items.map((item, index) => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8 }} className="group cursor-pointer">
                  <div className="product-card">
                    <div className="aspect-square overflow-hidden bg-warm-white relative">
                      <motion.img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-medium text-deep-charcoal mb-2 group-hover:text-champagne-gold transition-colors">{item.title}</h3>
                      {item.description && <p className="text-sm text-taupe mb-3 line-clamp-2">{item.description}</p>}
                      {item.category && <span className="text-xs uppercase tracking-wider text-champagne-gold font-medium">{item.category}</span>}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-champagne-gold border-t-transparent rounded-full" />
      </div>
    }>
      <CatalogContent />
    </Suspense>
  )
}
