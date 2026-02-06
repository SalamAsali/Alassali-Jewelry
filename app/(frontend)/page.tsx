'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Star,
  MessageSquare, Pencil, Gem, PenTool, Hammer, Gift,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import { getImageUrl } from '@/lib/getImageUrl'

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
  featured?: boolean
}

type ProcessStep = { label: string; description: string; icon: string | { url?: string; sizes?: { card?: { url?: string }; thumbnail?: { url?: string } } } }

const processIconMap: Record<string, LucideIcon> = {
  'Consultation': MessageSquare,
  'Sketch': Pencil,
  'Material Selection': Gem,
  'Design': PenTool,
  'In-House Manufacture': Hammer,
  'Presentation': Gift,
}

const FALLBACK_PROCESS: ProcessStep[] = [
  { icon: '', label: 'Consultation', description: 'Discuss Your Vision' },
  { icon: '', label: 'Sketch', description: 'Initial Design' },
  { icon: '', label: 'Material Selection', description: 'Choose Metals & Stones' },
  { icon: '', label: 'Design', description: 'CAD Rendering' },
  { icon: '', label: 'In-House Manufacture', description: 'Crafting' },
  { icon: '', label: 'Presentation', description: 'Final Reveal' },
]

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<GalleryItem[]>([])
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([])
  const [madeInTorontoImages, setMadeInTorontoImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedItems()
    fetchHomepage()
  }, [])

  const fetchFeaturedItems = async () => {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${baseUrl}/api/gallery?featured=true`)
      if (response.ok) {
        const data = await response.json()
        setFeaturedItems(data.slice(0, 4))
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchHomepage = async () => {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const res = await fetch(`${baseUrl}/api/homepage`)
      if (res.ok) {
        const data = await res.json()
        if (data.processSteps?.length) {
          setProcessSteps(data.processSteps.map((s: any) => ({
            label: s.label,
            description: s.description,
            icon: s.icon ?? null,
          })))
        }
        if (data.madeInTorontoImages?.length) {
          setMadeInTorontoImages(
            data.madeInTorontoImages.map((i: { image?: unknown }) => getImageUrl(i?.image as any))
          )
        }
      }
    } catch {
      /* use fallback */
    }
  }

  const MADE_IN_TORONTO_PLACEHOLDER = 'https://via.placeholder.com/400x600?text=Toronto'

  const testimonials = [
    { name: 'gray', rating: 5, text: 'Had a perfect experience! Unmatched creativity and execution, definitely the only place to go in toronto for jewelry', source: 'Google' },
    { name: 'Umair Alahi', rating: 5, text: 'My experience shopping here was excellent. They answered all my questions, worked out a price that fits my budget, & helped me choose the perfect piece and also kept in touch after the sale to make sure I was satisfied.', source: 'Google' },
    { name: 'Padrono', rating: 5, text: "I've been to many shops looking for custom grillz and kept getting really high quotes. At this shop I was taken care of and the price was explained. The final product was worth way more than what I paid. By far the only place I will be going!", source: 'Google' },
  ]

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative min-h-screen flex items-center bg-soft-black text-white overflow-hidden" data-testid="homepage-hero">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <div className="section-container py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="max-w-3xl">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TORONTO</motion.h1>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="text-4xl md:text-5xl font-light mb-6 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Custom Jeweler</motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="text-sm uppercase tracking-widest mb-12 text-stone" style={{ fontFamily: 'var(--font-body)' }}>ONLY THE FINEST</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}>
              <Link href="/portfolio" className="inline-block bg-white text-soft-black px-12 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-champagne-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl" data-testid="hero-cta-primary">VIEW MY WORK</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24" data-testid="custom-made-section">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Custom Made</h2>
            <p className="text-lg text-taupe max-w-3xl mx-auto leading-relaxed">&quot;We believe in a collaborative approach to custom jewelry creation. Each piece is a partnership between your vision and our expertise, resulting in truly one-of-a-kind artistry.&quot;</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {(processSteps.length ? processSteps : FALLBACK_PROCESS).map((step, index) => {
              const Icon = processIconMap[step.label]
              return (
                <motion.div
                  key={`${step.label}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col items-center bg-white border-2 border-soft-black rounded-2xl p-8 transition-all duration-500 hover:border-champagne-gold hover:shadow-xl hover:shadow-champagne-gold/10"
                >
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-soft-black group-hover:border-champagne-gold flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-champagne-gold/20 transition-all duration-500">
                    {Icon ? (
                      <Icon className="w-9 h-9 text-deep-charcoal group-hover:text-champagne-gold group-hover:scale-110 transition-all duration-300" />
                    ) : (
                      <img src={typeof step.icon === 'string' ? step.icon : getImageUrl(step.icon)} alt={step.label} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-deep-charcoal mb-1 text-center">{step.label}</h3>
                  <p className="text-xs text-taupe text-center">{step.description}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/custom/engagement-rings" className="inline-flex items-center gap-2 bg-deep-charcoal text-white px-10 py-4 rounded-lg font-semibold hover:bg-champagne-gold hover:text-soft-black transition-all duration-300">SHOP NOW <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>

      <section className="relative bg-soft-black text-white py-24 overflow-hidden">
        <DotPattern />
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative">
            {(() => {
              const img1 = madeInTorontoImages[0] ?? MADE_IN_TORONTO_PLACEHOLDER
              const img2 = madeInTorontoImages[1] ?? MADE_IN_TORONTO_PLACEHOLDER
              return (
                <>
                  <div className="block lg:hidden text-center py-12">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-white" style={{ fontFamily: 'var(--font-heading)' }}>MADE IN<br />TORONTO</h2>
                    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                      <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img1} alt="Silver Cuban chain crafted in Toronto" className="w-full aspect-[3/4] object-cover rounded-lg shadow-2xl border-2 border-champagne-gold/50" />
                      <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img2} alt="Custom chain design crafted in Toronto" className="w-full aspect-[3/4] object-cover rounded-lg shadow-2xl border-2 border-champagne-gold/50" />
                    </div>
                  </div>
                  <div className="hidden lg:block relative">
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative inline-block">
                        <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none text-white/30" style={{ fontFamily: 'var(--font-heading)' }}>M</h2>
                        <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img1} alt="Silver Cuban chain - Toronto craftsmanship" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-48 xl:w-40 xl:h-56 2xl:w-48 2xl:h-64 object-cover rounded-lg shadow-2xl border-4 border-champagne-gold/50" style={{ zIndex: 10, mixBlendMode: 'overlay', opacity: 0.9 }} />
                      </div>
                      <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ADE</h2>
                    </div>
                    <div className="flex items-center justify-center mb-8">
                      <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IN</h2>
                    </div>
                    <div className="flex items-center justify-center relative">
                      <div className="relative inline-block">
                        <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none text-white/30" style={{ fontFamily: 'var(--font-heading)' }}>T</h2>
                        <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img2} alt="Custom gold chain - Toronto artistry" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-48 xl:w-40 xl:h-56 2xl:w-48 2xl:h-64 object-cover rounded-lg shadow-2xl border-4 border-champagne-gold/50" style={{ zIndex: 10, mixBlendMode: 'overlay', opacity: 0.9 }} />
                      </div>
                      <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ORONTO</h2>
                    </div>
                  </div>
                </>
              )
            })()}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path d="M 0,250 Q 250,100 500,250 T 1000,250" fill="none" stroke="#8B7D6B" strokeWidth="2" />
        </svg>
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-block mb-8">
              <svg width="60" height="60" viewBox="0 0 60 60"><path d="M30 5 L40 25 L60 30 L40 35 L30 55 L20 35 L0 30 L20 25 Z" fill="#C9A75E" /></svg>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg p-6 border border-stone">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-deep-charcoal">{testimonial.name}</span>
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4" />
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-taupe text-sm leading-relaxed mb-3 line-clamp-4">{testimonial.text}</p>
                <button className="text-champagne-gold text-sm font-medium hover:underline">Read more</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24" data-testid="featured-products-section">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-4" style={{ fontFamily: 'var(--font-heading)' }}>The Icons</h2>
            <p className="text-lg text-taupe max-w-2xl mx-auto">Our signature pieces that define timeless luxury</p>
          </motion.div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-96 animate-pulse border border-stone" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="featured-products-grid">
              {featuredItems.map((item, index) => (
                <Link href={`/product/${item.id}`} key={item.id}>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }} className="group cursor-pointer">
                    <div className="bg-white rounded-lg overflow-hidden border border-stone hover:border-champagne-gold transition-all shadow-lg hover:shadow-2xl">
                      <div className="aspect-square overflow-hidden bg-white relative">
                            <motion.img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} />
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2 group-hover:text-champagne-gold transition-colors">{item.title}</h3>
                        {item.description && <p className="text-sm text-taupe mb-3 line-clamp-2">{item.description}</p>}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative bg-soft-black text-white py-24" data-testid="final-cta-section">
        <DotPattern />
        <div className="section-container text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Ready to Create Something<br /><span className="text-champagne-gold">Extraordinary?</span></h2>
            <p className="text-lg text-stone mb-8 max-w-2xl mx-auto">Let&apos;s bring your vision to life. Schedule a consultation with our master craftspeople.</p>
            <Link href="/custom/engagement-rings" className="inline-block bg-champagne-gold text-soft-black px-12 py-4 rounded-lg font-bold hover:bg-warm-gold transition-all duration-300 shadow-xl hover:shadow-2xl">START YOUR JOURNEY TODAY</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
