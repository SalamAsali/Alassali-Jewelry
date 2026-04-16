'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight, Star,
  MessageSquare, Pencil, Gem, PenTool, Hammer, Gift,
  CircleDot, Layers, Link2, Ear, Watch, Smile,
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
  { icon: '', label: 'Consultation', description: 'We start with a personal conversation to understand your vision, style preferences, and the story behind your piece.' },
  { icon: '', label: 'Sketch', description: 'Our designers create detailed sketches and CAD renderings, refining until every detail matches your dream.' },
  { icon: '', label: 'Material Selection', description: 'Hand-pick from the finest metals and ethically sourced gemstones — diamonds, sapphires, rubies, and more.' },
  { icon: '', label: 'Design', description: 'Your approved design is finalized with precise CAD models, ready for our master craftspeople.' },
  { icon: '', label: 'In-House Manufacture', description: 'Every piece is crafted entirely in-house in Toronto using traditional techniques and modern precision.' },
  { icon: '', label: 'Presentation', description: 'Your finished piece is presented in luxury packaging — a moment as special as the jewelry itself.' },
]

const FALLBACK_FEATURED: GalleryItem[] = [
  {
    id: 'cuban-chain',
    title: 'Silver Cuban Chain',
    description: 'Hand-crafted Cuban link chain in sterling silver',
    image: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/12igjdxa_DSC_0203_Original-scaled.jpg',
    category: 'chains',
    featured: true,
  },
  {
    id: 'diamond-pendant',
    title: 'Diamond Photo Pendant',
    description: 'Custom diamond-encrusted photo pendant',
    image: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/vmbmd1a1_image5.png',
    category: 'pendants',
    featured: true,
  },
  {
    id: 'custom-ring',
    title: 'Custom Diamond Ring',
    description: 'Bespoke diamond ring, designed to order',
    image: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/sqmmun3t_image2.png',
    category: 'rings',
    featured: true,
  },
  {
    id: 'diamond-grillz',
    title: 'Diamond Grillz Set',
    description: 'Full custom diamond grillz set',
    image: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/yymak1c4_image3.png',
    category: 'grillz',
    featured: true,
  },
]

const MADE_IN_TORONTO_IMAGES = [
  'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/12igjdxa_DSC_0203_Original-scaled.jpg',
  'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/2vm3an05_DSC_2764_Original-scaled.jpg',
]

const ACCENT_IMAGES = [
  { src: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/sqmmun3t_image2.png', alt: 'Custom diamond ring' },
  { src: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/vw4agpvw_4-pendants-on-the-rolls-Royce-scaled.jpeg', alt: 'Custom pendants on Rolls Royce' },
]

const bespokeCategories = [
  { name: 'Custom Engagement Rings', path: '/custom/engagement-rings', icon: Gem, description: 'Design your dream ring in Toronto' },
  { name: 'Custom Rings', path: '/custom/rings', icon: CircleDot, description: 'Signet, statement & wedding rings' },
  { name: 'Custom Pendants', path: '/custom/pendants', icon: Layers, description: 'Name, photo & diamond pendants' },
  { name: 'Custom Chains', path: '/custom/chains', icon: Link2, description: 'Cuban link, rope & gold chains' },
  { name: 'Custom Earrings', path: '/custom/earrings', icon: Ear, description: 'Diamond, gold & handcrafted' },
  { name: 'Custom Bracelets', path: '/custom/bracelets', icon: Watch, description: 'Tennis, bangle & engraved' },
  { name: 'Custom Grillz', path: '/custom/grillz', icon: Smile, description: 'Gold & diamond grillz in Toronto' },
  { name: 'General Inquiry', path: '/custom/general', icon: MessageSquare, description: 'Not sure? Start here' },
]

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<GalleryItem[]>([])
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([])
  const [torontoImages, setTorontoImages] = useState<string[]>(MADE_IN_TORONTO_IMAGES)
  const [loading, setLoading] = useState(true)
  const [processProgress, setProcessProgress] = useState(0)
  const processRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    fetchFeaturedItems()
    fetchHomepage()
  }, [])

  // Scroll-based progress — line tracks viewport midpoint against step dot positions
  useEffect(() => {
    const handleScroll = () => {
      if (!processRef.current) return
      const containerRect = processRef.current.getBoundingClientRect()
      const containerTop = containerRect.top + window.scrollY
      const containerHeight = processRef.current.offsetHeight
      const viewMid = window.scrollY + window.innerHeight / 2

      // Find each step dot's Y position relative to the container
      const dotOffsets = stepRefs.current
        .filter(Boolean)
        .map((el) => {
          const elTop = el!.getBoundingClientRect().top + window.scrollY
          return elTop - containerTop
        })

      if (dotOffsets.length === 0) return

      // Progress = how far the viewport midpoint is between first and last dot
      const firstDot = dotOffsets[0]
      const lastDot = dotOffsets[dotOffsets.length - 1]
      const scrollRelative = viewMid - containerTop - firstDot
      const totalSpan = lastDot - firstDot

      if (totalSpan <= 0) return

      // Map to 0–1 where 0 = first dot, 1 = last dot
      const raw = scrollRelative / totalSpan
      const progress = Math.min(Math.max(raw, 0), 1)

      // Convert to container-height percentage (line goes from first dot to last dot)
      const lineStart = firstDot / containerHeight
      const lineEnd = lastDot / containerHeight
      const lineProgress = lineStart + progress * (lineEnd - lineStart)

      setProcessProgress(lineProgress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
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
          const cmsImages = data.madeInTorontoImages.map(
            (i: { image?: unknown }) => getImageUrl(i?.image as any)
          ).filter((url: string) => url && !url.includes('placeholder'))
          if (cmsImages.length >= 2) {
            setTorontoImages(cmsImages)
          }
        }
      }
    } catch {
      /* use fallback */
    }
  }

  const displayedItems = featuredItems.length > 0 ? featuredItems : FALLBACK_FEATURED
  const img1 = torontoImages[0]
  const img2 = torontoImages[1]
  const steps = processSteps.length ? processSteps : FALLBACK_PROCESS

  const testimonials = [
    { name: 'gray', rating: 5, text: 'Had a perfect experience! Unmatched creativity and execution, definitely the only place to go in toronto for jewelry', source: 'Google' },
    { name: 'Umair Alahi', rating: 5, text: 'My experience shopping here was excellent. They answered all my questions, worked out a price that fits my budget, & helped me choose the perfect piece and also kept in touch after the sale to make sure I was satisfied.', source: 'Google' },
    { name: 'Padrono', rating: 5, text: "I've been to many shops looking for custom grillz and kept getting really high quotes. At this shop I was taken care of and the price was explained. The final product was worth way more than what I paid. By far the only place I will be going!", source: 'Google' },
  ]

  return (
    <div className="overflow-hidden bg-white">
      {/* ===== HERO — Fullscreen ===== */}
      <section className="relative h-svh flex items-center bg-soft-black text-white overflow-hidden" data-testid="homepage-hero">
        <DotPattern />
        <DiamondPattern className="text-white" />

        {/* Orbiting diamond */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
          <div style={{ animation: 'orbit 20s linear infinite' }} className="hidden md:block">
            <Image src="/images/icon-white.png" alt="" width={48} height={48} className="opacity-70" />
          </div>
          <div style={{ animation: 'orbit-mobile 20s linear infinite' }} className="block md:hidden">
            <Image src="/images/icon-white.png" alt="" width={32} height={32} className="opacity-70" />
          </div>
        </div>

        {/* Floating diamonds */}
        {/* Large accent diamonds */}
        <div className="absolute top-[6%] right-[8%] pointer-events-none z-[5]" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <Image src="/images/icon-white.png" alt="" width={96} height={96} className="opacity-15" />
        </div>
        <div className="absolute bottom-[18%] left-[4%] pointer-events-none z-[5]" style={{ animation: 'float-slow 9s ease-in-out infinite 1s' }}>
          <Image src="/images/icon-white.png" alt="" width={110} height={110} className="opacity-10" />
        </div>
        <div className="absolute top-[25%] right-[3%] pointer-events-none z-[5]" style={{ animation: 'float-slow 14s ease-in-out infinite 2s' }}>
          <Image src="/images/icon-white.png" alt="" width={88} height={88} className="opacity-12" />
        </div>

        {/* Medium diamonds */}
        <div className="absolute top-[45%] right-[20%] pointer-events-none z-[5]" style={{ animation: 'float 10s ease-in-out infinite 2s' }}>
          <Image src="/images/icon-white.png" alt="" width={60} height={60} className="opacity-20" />
        </div>
        <div className="absolute top-[15%] left-[22%] pointer-events-none z-[5]" style={{ animation: 'float-slow 12s ease-in-out infinite 1s' }}>
          <Image src="/images/icon-white.png" alt="" width={72} height={72} className="opacity-15" />
        </div>
        <div className="absolute bottom-[35%] right-[12%] pointer-events-none z-[5]" style={{ animation: 'float 11s ease-in-out infinite 4s' }}>
          <Image src="/images/icon-white.png" alt="" width={52} height={52} className="opacity-18" />
        </div>
        <div className="absolute top-[65%] left-[15%] pointer-events-none z-[5]" style={{ animation: 'float-slow 8s ease-in-out infinite' }}>
          <Image src="/images/icon-white.png" alt="" width={56} height={56} className="opacity-15" />
        </div>
        <div className="absolute top-[10%] left-[45%] pointer-events-none z-[5]" style={{ animation: 'float 7s ease-in-out infinite 0.5s' }}>
          <Image src="/images/icon-white.png" alt="" width={48} height={48} className="opacity-20" />
        </div>
        <div className="absolute bottom-[10%] right-[28%] pointer-events-none z-[5]" style={{ animation: 'float-slow 13s ease-in-out infinite 3s' }}>
          <Image src="/images/icon-white.png" alt="" width={64} height={64} className="opacity-12" />
        </div>

        {/* Small diamonds */}
        <div className="absolute bottom-[12%] left-[35%] pointer-events-none z-[5]" style={{ animation: 'float 7s ease-in-out infinite 3s' }}>
          <Image src="/images/icon-white.png" alt="" width={28} height={28} className="opacity-30" />
        </div>
        <div className="absolute top-[38%] left-[8%] pointer-events-none z-[5]" style={{ animation: 'float-slow 10s ease-in-out infinite 2s' }}>
          <Image src="/images/icon-white.png" alt="" width={32} height={32} className="opacity-25" />
        </div>
        <div className="absolute top-[5%] left-[60%] pointer-events-none z-[5]" style={{ animation: 'float 8s ease-in-out infinite 1.5s' }}>
          <Image src="/images/icon-white.png" alt="" width={24} height={24} className="opacity-25" />
        </div>
        <div className="absolute bottom-[6%] left-[55%] pointer-events-none z-[5]" style={{ animation: 'float-slow 10s ease-in-out infinite 3.5s' }}>
          <Image src="/images/icon-white.png" alt="" width={36} height={36} className="opacity-20" />
        </div>
        <div className="absolute top-[75%] right-[40%] pointer-events-none z-[5]" style={{ animation: 'float 9s ease-in-out infinite 5s' }}>
          <Image src="/images/icon-white.png" alt="" width={20} height={20} className="opacity-30" />
        </div>
        <div className="absolute top-[55%] left-[40%] pointer-events-none z-[5]" style={{ animation: 'float-slow 15s ease-in-out infinite 1s' }}>
          <Image src="/images/icon-white.png" alt="" width={40} height={40} className="opacity-10" />
        </div>
        <div className="absolute bottom-[45%] left-[50%] pointer-events-none z-[5]" style={{ animation: 'float 6s ease-in-out infinite 2.5s' }}>
          <Image src="/images/icon-white.png" alt="" width={22} height={22} className="opacity-22" />
        </div>

        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="max-w-3xl">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TORONTO</motion.h1>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="text-4xl md:text-5xl font-light mb-6 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Custom Jeweler</motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="text-sm uppercase tracking-widest mb-12 text-stone" style={{ fontFamily: 'var(--font-body)' }}>ONLY THE FINEST</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio" className="inline-block bg-white text-soft-black px-12 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-glacier-grey hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl text-center" data-testid="hero-cta-primary">VIEW MY WORK</Link>
              <Link href="/custom/general" className="inline-block bg-glacier-grey text-white px-12 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-lg hover:shadow-2xl text-center">INQUIRE NOW</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== BESPOKE SERVICES — Links to each custom form ===== */}
      <section className="bg-white py-24" data-testid="bespoke-services-section">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Bespoke Services</h2>
            <p className="text-sm md:text-lg text-taupe max-w-3xl mx-auto leading-relaxed">Every piece is a partnership between your vision and our expertise. Choose your category to begin.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {bespokeCategories.map((cat, index) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link
                    href={cat.path}
                    className="group flex flex-col items-center bg-white border-2 border-soft-black rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-glacier-grey hover:shadow-xl hover:shadow-glacier-grey/10 hover:-translate-y-2 h-full"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-soft-black group-hover:border-glacier-grey flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-glacier-grey/20 transition-all duration-500">
                      <Icon className="w-7 h-7 md:w-9 md:h-9 text-deep-charcoal group-hover:text-glacier-grey group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-deep-charcoal mb-1 text-center group-hover:text-glacier-grey transition-colors">{cat.name}</h3>
                    <p className="text-xs text-taupe text-center">{cat.description}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== MADE IN TORONTO ===== */}
      <section className="relative bg-soft-black text-white py-24 overflow-hidden">
        <DotPattern />
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative">
            {/* Mobile layout */}
            <div className="block lg:hidden text-center py-12">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-white" style={{ fontFamily: 'var(--font-heading)' }}>MADE IN<br />TORONTO</h2>
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img1} alt="Silver Cuban chain crafted in Toronto" className="w-full aspect-[3/4] object-cover rounded-lg shadow-2xl border-2 border-glacier-grey/50" />
                <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img2} alt="Custom chain design crafted in Toronto" className="w-full aspect-[3/4] object-cover rounded-lg shadow-2xl border-2 border-glacier-grey/50" />
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mt-6">
                {ACCENT_IMAGES.map((accent, i) => (
                  <motion.img key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }} src={accent.src} alt={accent.alt} className="w-full aspect-square object-cover rounded-lg shadow-xl border border-glacier-grey/30" />
                ))}
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:block relative">
              <motion.img
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                src={ACCENT_IMAGES[0].src}
                alt={ACCENT_IMAGES[0].alt}
                className="absolute -right-4 top-8 w-36 xl:w-44 aspect-square object-cover rounded-lg shadow-2xl border-2 border-glacier-grey/40 z-20"
              />
              <motion.img
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                src={ACCENT_IMAGES[1].src}
                alt={ACCENT_IMAGES[1].alt}
                className="absolute -left-4 bottom-8 w-40 xl:w-48 aspect-[4/3] object-cover rounded-lg shadow-2xl border-2 border-glacier-grey/40 z-20"
              />

              <div className="flex items-center justify-center mb-8">
                <div className="relative inline-block">
                  <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none text-white/30" style={{ fontFamily: 'var(--font-heading)' }}>M</h2>
                  <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img1} alt="Silver Cuban chain - Toronto craftsmanship" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-48 xl:w-40 xl:h-56 2xl:w-48 2xl:h-64 object-cover rounded-lg shadow-2xl border-4 border-glacier-grey/50" style={{ zIndex: 10 }} />
                </div>
                <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ADE</h2>
              </div>
              <div className="flex items-center justify-center mb-8">
                <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IN</h2>
              </div>
              <div className="flex items-center justify-center relative">
                <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TORONT</h2>
                <div className="relative inline-block">
                  <h2 className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none text-white/30" style={{ fontFamily: 'var(--font-heading)' }}>O</h2>
                  <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img2} alt="Custom gold chain - Toronto artistry" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-48 xl:w-40 xl:h-56 2xl:w-48 2xl:h-64 object-cover rounded-lg shadow-2xl border-4 border-glacier-grey/50" style={{ zIndex: 10 }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== OUR PROCESS — Vertical scroll with interactive progress line ===== */}
      <section className="bg-white py-24 overflow-hidden" data-testid="process-section">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Our Process</h2>
            <p className="text-sm md:text-lg text-taupe max-w-3xl mx-auto leading-relaxed">From first conversation to final reveal — every step crafted with care.</p>
          </motion.div>

          <div ref={processRef} className="relative max-w-3xl mx-auto">
            {/* Progress line track */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-stone/30" />
            {/* Progress line fill */}
            <div
              className="absolute left-6 md:left-8 top-0 w-0.5 bg-glacier-grey transition-all duration-100 ease-out"
              style={{ height: `${processProgress * 100}%` }}
            />

            <div className="space-y-16">
              {steps.map((step, index) => {
                const Icon = processIconMap[step.label]
                // Check if the fill line has reached this dot's position
                const dotOffset = stepRefs.current[index] && processRef.current
                  ? (stepRefs.current[index]!.getBoundingClientRect().top - processRef.current.getBoundingClientRect().top) / processRef.current.offsetHeight
                  : (index + 0.5) / steps.length
                const isActive = processProgress >= dotOffset

                return (
                  <motion.div
                    key={`${step.label}-${index}`}
                    ref={(el) => { stepRefs.current[index] = el }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: 0.1 }}
                    className="relative pl-16 md:pl-24"
                  >
                    {/* Step dot on the line */}
                    <div className={`absolute left-3.5 md:left-5.5 top-1 w-5 h-5 md:w-5 md:h-5 rounded-full border-2 transition-all duration-500 ${
                      isActive
                        ? 'bg-glacier-grey border-glacier-grey scale-125'
                        : 'bg-white border-stone'
                    }`} />

                    <div className="flex items-start gap-5">
                      <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? 'bg-glacier-grey/10 border-2 border-glacier-grey'
                          : 'bg-off-white border-2 border-stone/40'
                      }`}>
                        {Icon ? (
                          <Icon className={`w-7 h-7 transition-colors duration-500 ${isActive ? 'text-glacier-grey' : 'text-taupe'}`} />
                        ) : (
                          <img src={typeof step.icon === 'string' ? step.icon : getImageUrl(step.icon)} alt={step.label} className="w-8 h-8 object-contain" />
                        )}
                      </div>
                      <div>
                        <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-deep-charcoal' : 'text-taupe'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                          {step.label}
                        </h3>
                        <p className="text-sm md:text-base text-taupe leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white py-24 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path d="M 0,250 Q 250,100 500,250 T 1000,250" fill="none" stroke="#8B7D6B" strokeWidth="2" />
        </svg>
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-block mb-8">
              <svg width="60" height="60" viewBox="0 0 60 60"><path d="M30 5 L40 25 L60 30 L40 35 L30 55 L20 35 L0 30 L20 25 Z" fill="#8E9196" /></svg>
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
                <button className="text-glacier-grey text-sm font-medium hover:underline">Read more</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative bg-soft-black text-white py-24" data-testid="final-cta-section">
        <DotPattern />
        <div className="section-container text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Ready to Create Something<br /><span className="text-glacier-grey">Extraordinary?</span></h2>
            <p className="text-lg text-stone mb-8 max-w-2xl mx-auto">Let&apos;s bring your vision to life. Schedule a consultation with our master craftspeople.</p>
            <Link href="/custom/general" className="inline-block bg-glacier-grey text-white px-12 py-4 rounded-lg font-bold hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl">START YOUR JOURNEY TODAY</Link>
          </motion.div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="bg-soft-black">
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-glacier-grey/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-glacier-grey/50" />
          <div className="w-2 h-2 rotate-45 bg-glacier-grey/70" />
          <div className="w-1.5 h-1.5 rotate-45 bg-glacier-grey/50" />
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-glacier-grey/40" />
        </div>
      </div>
    </div>
  )
}
