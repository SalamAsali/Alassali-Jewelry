'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'

export const dynamic = 'force-dynamic'

interface GalleryItem {
  id: string
  title: string
  description?: string
  image: {
    url?: string
    filename?: string
  } | string
  category?: string
}

export default function PortfolioPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${baseUrl}/api/gallery`)
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  const customPortfolioItems = [
    {
      id: 'custom-1',
      title: 'Custom Pendants Collection',
      category: 'pendants',
      image: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/vw4agpvw_4-pendants-on-the-rolls-Royce-scaled.jpeg',
      description: 'Bespoke pendants featuring custom photo bezels'
    },
    {
      id: 'custom-2',
      title: 'Silver Cuban Chains',
      category: 'chains',
      image: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/12igjdxa_DSC_0203_Original-scaled.jpg',
      description: 'Premium silver Miami Cuban link chains'
    },
    {
      id: 'custom-3',
      title: 'Custom Chain Design',
      category: 'chains',
      image: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/2vm3an05_DSC_2764_Original-scaled.jpg',
      description: 'Hand-crafted custom chain with unique links'
    },
  ]

  const allItems = [...items, ...customPortfolioItems]

  const getImageUrl = (item: GalleryItem) => {
    if (typeof item.image === 'string') return item.image
    if (item.image?.url) return item.image.url
    if (item.image?.filename) {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      return `${baseUrl}/media/${item.image.filename}`
    }
    return 'https://via.placeholder.com/400'
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <main className="flex-grow">
        <div className="relative bg-soft-black text-white py-24 overflow-hidden">
          <DotPattern />
          <DiamondPattern className="text-white" />
          
          <div className="section-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Portfolio
              </h1>
              <p className="text-lg text-stone max-w-3xl mx-auto">
                A showcase of our finest work, from custom engagement rings to statement chains
              </p>
            </motion.div>
          </div>
        </div>

        <div className="bg-white py-24">
          <div className="section-container">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                  >
                    <div className="product-card">
                      <div className="aspect-square overflow-hidden bg-warm-white relative">
                        <motion.img
                          src={getImageUrl(item)}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2 group-hover:text-champagne-gold transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-taupe mb-3">{item.description}</p>
                        )}
                        {item.category && (
                          <span className="text-xs uppercase tracking-wider text-champagne-gold font-medium">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
