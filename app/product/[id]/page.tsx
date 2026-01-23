'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Sparkles, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

interface Product {
  id: string
  title: string
  description?: string
  image: {
    url?: string
    filename?: string
  } | string
  category?: string
  featured?: boolean
}

function getImageUrl(item: Product): string {
  if (typeof item.image === 'string') {
    return item.image
  }
  if (item.image?.url) {
    return item.image.url
  }
  if (item.image?.filename) {
    return `/media/${item.image.filename}`
  }
  return '/placeholder.jpg'
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${baseUrl}/api/gallery/${id}`)
      
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
        
        // Extract images - if single image, make it an array
        const mainImage = getImageUrl(data)
        setImages([mainImage])
      } else if (response.status === 404) {
        setProduct(null)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    // Get existing cart from localStorage
    const existingCart = typeof window !== 'undefined' 
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : []
    
    // Check if item already in cart
    const existingItem = existingCart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      existingCart.push({
        id: product.id,
        title: product.title,
        price: 0, // Price would come from Payload if added to schema
        quantity: 1,
        image: getImageUrl(product),
      })
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(existingCart))
    }
    
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-champagne-gold border-t-transparent rounded-full"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <main className="flex-grow flex items-center justify-center bg-off-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-deep-charcoal mb-4">Product Not Found</h2>
            <Link
              href="/catalog"
              className="inline-block bg-champagne-gold text-soft-black px-8 py-3 rounded-lg font-semibold hover:bg-warm-gold transition-all"
            >
              Return to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const mainImage = getImageUrl(product)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <main className="flex-grow">
        <div className="bg-off-white py-12">
          <div className="section-container">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-taupe hover:text-deep-charcoal mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Catalog
            </Link>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Images */}
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-lg"
                >
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-lg overflow-hidden ${
                          selectedImage === idx ? 'ring-2 ring-champagne-gold' : ''
                        }`}
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {product.category && (
                  <span className="inline-block text-xs uppercase tracking-wider text-champagne-gold font-medium">
                    {product.category}
                  </span>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-deep-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
                  {product.title}
                </h1>

                {product.description && (
                  <div className="prose max-w-none">
                    <p className="text-lg text-taupe leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-6 border-t border-stone">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="flex-1 bg-champagne-gold text-soft-black px-8 py-4 rounded-lg font-semibold hover:bg-warm-gold transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 border-2 border-deep-charcoal rounded-lg hover:bg-deep-charcoal hover:text-white transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.button>
                </div>

                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Added to cart!</span>
                  </motion.div>
                )}

                <div className="pt-6 space-y-4 border-t border-stone">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-soft-beige flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-champagne-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-charcoal mb-1">Custom Design Available</h3>
                      <p className="text-taupe text-sm">
                        Contact us to create a custom piece tailored to your preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
