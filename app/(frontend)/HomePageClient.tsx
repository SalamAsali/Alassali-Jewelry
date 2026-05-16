'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  MessageSquare, Pencil, Gem, PenTool, Hammer, Gift,
  MapPin, ShieldCheck, Diamond, Star, Sparkles, Phone, Mail, Calendar,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import ReviewsScroller from '@/components/reviews/ReviewsScroller'
import { getImageUrl } from '@/lib/getImageUrl'
import type { GoogleReview } from '@/lib/reviews/googlePlaces'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo/schema'

type HomePageClientProps = {
  liveReviews?: GoogleReview[]
  liveRating?: number
  liveReviewCount?: number
}

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
  { name: 'Engagement Rings', path: '/custom-engagement-rings-toronto', icon: '/images/icons/engagement-rings.svg', blurb: 'Solitaire, halo, vintage, three-stone — designed around your love story.' },
  { name: 'Wedding Bands', path: '/custom-wedding-bands-toronto', icon: '/images/icons/bridal-bands.svg', blurb: 'Matching bridal sets, eternity bands, men’s bands, and engraved pieces.' },
  { name: 'Rings', path: '/custom-rings-toronto', icon: '/images/icons/rings.svg', blurb: 'Signet, statement, stackable, everyday — gold, platinum, or silver.' },
  { name: 'Pendants', path: '/custom-pendants-toronto', icon: '/images/icons/pendants.svg', blurb: 'Name pendants, photo pendants, religious symbols, Arabic calligraphy.' },
  { name: 'Chains', path: '/custom-chains-toronto', icon: '/images/icons/chains.svg', blurb: 'Miami Cuban, rope, franco, figaro — solid gold, never hollow.' },
  { name: 'Earrings', path: '/custom-earrings-toronto', icon: '/images/icons/earrings.svg', blurb: 'Studs, hoops, drops, chandeliers — diamond and gold.' },
  { name: 'Bracelets', path: '/custom-bracelets-toronto', icon: '/images/icons/bracelets.svg', blurb: 'Tennis bracelets, bangles, cuffs, engraved men’s ID bracelets.' },
  { name: 'Grillz', path: '/custom-grillz-toronto', icon: '/images/icons/grillz.svg', blurb: 'Gold and VVS diamond grillz — single tooth to full sets.' },
]

// SEO trust pillars — the four reasons clients pick a custom jeweler in Toronto
const whyAlAssali: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: MapPin, title: 'Made in Toronto', body: 'Designed, cast, set, and finished entirely in-house in our Toronto studio — no outsourcing.' },
  { icon: ShieldCheck, title: 'Lifetime Guarantee', body: 'Free polishing, rhodium re-plating, and resizing for life on every piece we craft.' },
  { icon: Diamond, title: 'GIA-Graded Diamonds', body: 'Conflict-free natural and lab-grown diamonds, graded to GIA standards.' },
  { icon: Star, title: '5.0 on Google', body: '5-star rated by clients across the Greater Toronto Area.' },
]

// FAQ — answers the top "custom jewelry toronto" search queries
const homepageFaq = [
  { q: 'Where is Al-Asali Jewelry based?', a: 'Al-Asali Jewelry Studio is a Toronto-based custom jewelry studio at 624 Vaughan Rd. We work by appointment only — virtual consultations via Zoom, phone, or message, and complimentary insured delivery across the Greater Toronto Area, with optional in-person meetings in Toronto when preferred.' },
  { q: 'What does custom jewelry cost in Toronto?', a: 'Most of our custom pieces start between $500 (single-tooth grillz) and $1,000 (custom rings, pendants, earrings, bracelets, chains), scaling with metal weight, stones, and design complexity. Custom engagement rings typically start at $2,500. Every project is quoted up front with no hidden fees.' },
  { q: 'How long does custom jewelry take?', a: 'Most pieces take 2–6 weeks: grillz 1–2 weeks, pendants 2–4 weeks, chains and earrings 2–4 weeks, rings and bracelets 3–5 weeks, engagement rings 4–6 weeks. Rush orders are available for an additional fee.' },
  { q: 'How do I start a custom jewelry project?', a: 'Book a free consultation — virtual via Zoom, phone, or message, or in-person in Toronto by appointment. We discuss your vision, budget, and timeline, then produce CAD renderings for your approval before any crafting begins.' },
  { q: 'Do you offer lab-grown diamonds?', a: 'Yes — we offer both natural and lab-grown diamonds. Lab-grown stones are chemically and visually identical to natural diamonds and offer significant savings on carat-for-carat value, both fully GIA-graded.' },
  { q: 'Can you reset family diamonds into a new design?', a: 'Absolutely. Heirloom resets are some of our most meaningful projects. We carefully remove the stones from your existing piece and set them into your new custom design while preserving every detail you want to keep.' },
  { q: 'Do you offer Arabic calligraphy jewelry?', a: 'Yes — we specialize in Arabic calligraphy pendants, Allah pendants, Ayat al-Kursi pendants, Bismillah pendants, and engraved Arabic wedding bands. Our master jeweler is fluent in the art of Arabic calligraphy casting.' },
  { q: 'What areas around Toronto do you serve?', a: 'Our studio is in Toronto, and we regularly work with clients from across the Greater Toronto Area including Mississauga, Etobicoke, North York, Scarborough, Vaughan, Markham, Oakville, Burlington, Brampton, Milton, and Richmond Hill.' },
  { q: 'Do I need an appointment to visit the studio?', a: 'Yes — we work by appointment only. Book a free consultation by phone, email, or through our custom inquiry form and we’ll confirm a time that works for you.' },
  { q: 'Do you ship outside of Toronto?', a: 'Yes — we ship securely across the GTA and anywhere in Canada. Finished pieces are always fully insured in transit.' },
]

export default function HomePageClient({ liveReviews, liveRating, liveReviewCount }: HomePageClientProps = {}) {
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
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="block text-7xl md:text-8xl lg:text-9xl font-bold mb-4" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TORONTO</span>
              <span className="block text-4xl md:text-5xl font-light text-white">Custom Jeweler</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="text-sm uppercase tracking-widest mb-6 text-stone" style={{ fontFamily: 'var(--font-body)' }}>ONLY THE FINEST</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1 }} className="text-base md:text-lg text-stone leading-relaxed mb-12 max-w-2xl">
              Bespoke engagement rings, wedding bands, gold chains, diamond pendants, and custom grillz — handcrafted in our Toronto studio by master jeweler Mohammad Al-Asali, by appointment.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio" className="inline-block bg-white text-soft-black px-12 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-glacier-grey hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl text-center" data-testid="hero-cta-primary">VIEW MY WORK</Link>
              <Link href="/custom-form" className="inline-block bg-glacier-grey text-white px-12 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-lg hover:shadow-2xl text-center">INQUIRE NOW</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== BESPOKE SERVICES — Links to each custom form ===== */}
      <section className="bg-white py-24" data-testid="bespoke-services-section">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-glacier-grey" />
              <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">Toronto’s Custom Jewelry Studio</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Custom Jewelry, Made in Toronto</h2>
            <p className="text-sm md:text-lg text-taupe max-w-3xl mx-auto leading-relaxed">
              Al-Asali Jewelry is a Toronto-based bespoke jewelry studio. Master jeweler Mohammad Al-Asali designs and handcrafts every custom engagement ring, wedding band, diamond pendant, gold chain, and grillz set entirely in-house — from first sketch to final polish, under one roof, with a lifetime craftsmanship guarantee. Choose a category to begin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bespokeCategories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <Link
                  href={cat.path}
                  className="group flex flex-col items-center text-center bg-white border-2 border-soft-black rounded-2xl p-6 md:p-7 transition-all duration-500 hover:border-glacier-grey hover:shadow-xl hover:shadow-glacier-grey/10 hover:-translate-y-2 h-full"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-soft-black group-hover:border-glacier-grey flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-glacier-grey/20 transition-all duration-500">
                    <img
                      src={cat.icon}
                      alt={`${cat.name} icon`}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-deep-charcoal mb-2 group-hover:text-glacier-grey transition-colors">{cat.name}</h3>
                  <p className="text-xs text-taupe leading-relaxed flex-1">{cat.blurb}</p>
                  <span className="inline-flex items-center gap-1 text-glacier-grey text-xs font-medium mt-3 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MADE IN TORONTO ===== */}
      <section className="relative bg-soft-black text-white py-24 overflow-hidden" aria-labelledby="made-in-toronto-heading">
        <DotPattern />
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative">
            {/* Mobile layout — visible, semantic heading for the section */}
            <div className="block lg:hidden text-center py-12">
              <h2 id="made-in-toronto-heading" className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-white" style={{ fontFamily: 'var(--font-heading)' }}>MADE IN<span className="sr-only"> </span><br />TORONTO</h2>
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
                  <div className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none text-white/30" style={{ fontFamily: 'var(--font-heading)' }}>M</div>
                  <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={img1} alt="Silver Cuban chain - Toronto craftsmanship" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-48 xl:w-40 xl:h-56 2xl:w-48 2xl:h-64 object-cover rounded-lg shadow-2xl border-4 border-glacier-grey/50" style={{ zIndex: 10 }} />
                </div>
                <div className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ADE</div>
              </div>
              <div className="flex items-center justify-center mb-8">
                <div className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IN</div>
              </div>
              <div className="flex items-center justify-center relative">
                <div className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TORONT</div>
                <div className="relative inline-block">
                  <div className="text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold leading-none text-white/30" style={{ fontFamily: 'var(--font-heading)' }}>O</div>
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

      {/* ===== WHY AL-ASSALI — Trust pillars (black) ===== */}
      <section className="relative bg-soft-black text-white py-24 overflow-hidden" data-testid="why-section">
        <DotPattern />
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Why Al-Asali Jewelry</h2>
            <p className="text-sm md:text-lg text-stone leading-relaxed">
              We are a small, focused Toronto workshop. Every piece is crafted by a master jeweler — not a factory — and backed by a lifetime craftsmanship guarantee.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyAlAssali.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-6 text-center hover:border-glacier-grey/60 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-glacier-grey/20 border border-glacier-grey/40 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-glacier-grey" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-stone text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MASTER JEWELER (white) ===== */}
      <section className="bg-white py-24" data-testid="master-jeweler-section">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-glacier-grey/10 border border-glacier-grey/40 mb-5">
              <Hammer className="w-6 h-6 text-glacier-grey" />
            </div>
            <div className="text-xs uppercase tracking-widest text-glacier-grey font-medium mb-2">Master Jeweler &amp; Founder</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Mohammad Al-Asali</h2>
            <p className="text-sm md:text-lg text-taupe leading-relaxed mb-8">
              Mohammad is the founder and master jeweler behind Al-Asali Jewelry Studio. A George Brown College Jewelry Arts Program graduate practicing since 2017, he has designed and handcrafted hundreds of bespoke engagement rings, gold chains, diamond pendants, and custom grillz for clients across the Greater Toronto Area. Every piece that leaves our Toronto studio has been personally inspected and finished by Mohammad.
            </p>
            <Link href="/about/master-jeweler/mohammad-al-assali" className="inline-flex items-center gap-2 text-glacier-grey font-semibold hover:gap-3 transition-all">
              Read Mohammad’s story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <ReviewsScroller
        reviews={liveReviews}
        rating={liveRating}
        totalReviews={liveReviewCount}
        variant="light"
        heading="What Our Toronto Clients Say"
      />

      {/* ===== HOW WE WORK / LOCATION (black) ===== */}
      <section className="relative bg-soft-black text-white py-24 overflow-hidden" data-testid="location-section">
        <DotPattern />
        <div className="section-container relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>How We Work Together</h2>
            <p className="text-sm md:text-lg text-stone leading-relaxed mb-8">
              Al-Asali Jewelry Studio is a Toronto-based custom jeweler, serving clients across the GTA by appointment. Free virtual consultations via Zoom, phone, or message, complimentary secure insured delivery of finished pieces — and in-person meetings in Toronto whenever you prefer.
            </p>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm mb-6">
              <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light transition-colors">
                <Phone className="w-4 h-4" /> {SITE_CONFIG.phoneDisplay}
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light transition-colors">
                <Mail className="w-4 h-4" /> {SITE_CONFIG.email}
              </a>
              <span className="inline-flex items-center gap-2 text-stone">
                <Calendar className="w-4 h-4" /> By appointment only
              </span>
            </div>

            <p className="text-stone text-xs leading-relaxed max-w-2xl mx-auto">
              Serving Toronto, Mississauga, Etobicoke, North York, Scarborough, Vaughan, Markham, Oakville, Burlington, Brampton, Milton, Richmond Hill, and the wider Greater Toronto Area.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ (white) ===== */}
      <section className="bg-white py-24" data-testid="faq-section">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Custom Jewelry in Toronto — FAQ</h2>
            <p className="text-sm md:text-lg text-taupe max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about working with a Toronto custom jeweler — pricing, timelines, lab-grown diamonds, heirloom resets, and more.
            </p>
          </motion.div>

          <div className="space-y-3">
            {homepageFaq.map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group bg-off-white border border-stone/30 rounded-xl overflow-hidden hover:border-glacier-grey/50 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <h3 className="text-deep-charcoal font-bold text-sm md:text-base">{item.q}</h3>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-glacier-grey flex items-center justify-center text-white group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-taupe text-sm leading-relaxed">{item.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative bg-soft-black text-white py-24" data-testid="final-cta-section">
        <DotPattern />
        <div className="section-container text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Start Your Custom Jewelry Project<br /><span className="text-glacier-grey">in Toronto</span></h2>
            <p className="text-base md:text-lg text-stone mb-8 max-w-2xl mx-auto">Free consultation. No obligation. Tell us what you have in mind and we’ll send back a sketch, a quote, and a timeline.</p>
            <Link href="/custom-form" className="inline-block bg-glacier-grey text-white px-12 py-4 rounded-lg font-bold hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl">START YOUR JOURNEY TODAY</Link>
          </motion.div>
        </div>
      </section>

      {/* ===== SCHEMA: FAQPage + BreadcrumbList for the homepage ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildFaqSchema(homepageFaq),
            buildBreadcrumbSchema([
              { name: 'Home', url: SITE_CONFIG.url },
            ]),
          ]),
        }}
      />

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
