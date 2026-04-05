'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import NextLink from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Upload, ArrowRight, ArrowLeft, Sparkles,
  Heart, Zap, Clock, Hexagon, Sun, Diamond, HelpCircle,
  LayoutGrid, ChevronUp, ChevronDown, Square, Flame,
  Link, Waves, Shield, Type, Pen, Star,
  Paintbrush, Crown, Circle, Layers,
  CircleDot, Droplet, Gem,
  MinusCircle, Leaf, FlaskConical,
  DollarSign, Calendar, CalendarDays, CalendarCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Piece type options
// ---------------------------------------------------------------------------

const pieceTypeOptions: { value: string; label: string; icon: LucideIcon; subtitle: string }[] = [
  { value: 'engagement-rings', label: 'Engagement Ring', icon: Diamond, subtitle: 'Begin your forever' },
  { value: 'rings', label: 'Ring', icon: Circle, subtitle: 'Statement, band, signet & more' },
  { value: 'chains', label: 'Chain', icon: Link, subtitle: 'Cuban, rope, franco & more' },
  { value: 'pendants', label: 'Pendant', icon: Layers, subtitle: 'Initial, name, symbol & more' },
  { value: 'earrings', label: 'Earrings', icon: CircleDot, subtitle: 'Studs, hoops, drops & more' },
  { value: 'bracelets', label: 'Bracelet', icon: Gem, subtitle: 'Tennis, bangle, cuff & more' },
  { value: 'grillz', label: 'Grillz', icon: Flame, subtitle: 'Bold precious metal statements' },
  { value: 'other', label: 'Other', icon: HelpCircle, subtitle: 'Something unique — tell us more' },
]

// ---------------------------------------------------------------------------
// Config per piece type
// ---------------------------------------------------------------------------

const typeConfig: Record<string, { title: string; subtitle: string; styles: string[]; metals: string[] }> = {
  'engagement-rings': {
    title: 'Custom Engagement Rings',
    subtitle: 'Begin your forever with a ring as unique as your love story',
    styles: ['Classic', 'Modern', 'Vintage', 'Art Deco', 'Halo', 'Solitaire', 'Not Sure'],
    metals: ['Platinum', '18K Gold', '14K Gold', 'Silver'],
  },
  'grillz': {
    title: 'Custom Grillz',
    subtitle: 'Bold statements crafted in precious metal',
    styles: ['Full Set', 'Top 6', 'Bottom 6', 'Single Tooth', 'Fangs', 'Not Sure'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Silver'],
  },
  'chains': {
    title: 'Custom Chains',
    subtitle: 'Wearable art, crafted to your specifications',
    styles: ['Miami Cuban', 'Rope', 'Franco', 'Figaro', 'Box Chain', 'Not Sure'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver'],
  },
  'pendants': {
    title: 'Custom Pendants',
    subtitle: 'Your story, beautifully told',
    styles: ['Initial', 'Name', 'Symbol', 'Religious', 'Custom Design', 'Not Sure'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver'],
  },
  'rings': {
    title: 'Custom Rings',
    subtitle: 'Unique rings designed just for you',
    styles: ['Statement', 'Band', 'Signet', 'Stackable', 'Custom Design', 'Everyday/Essentials', 'Not Sure'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver'],
  },
  'earrings': {
    title: 'Custom Earrings',
    subtitle: 'Elegant earrings crafted to perfection',
    styles: ['Studs', 'Hoops', 'Drops', 'Chandeliers', 'Custom Design', 'Not Sure'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver'],
  },
  'bracelets': {
    title: 'Custom Bracelets',
    subtitle: 'Exquisite bracelets tailored to your style',
    styles: ['Tennis', 'Chain', 'Bangle', 'Cuff', 'Custom Design', 'Not Sure'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver'],
  },
  'other': {
    title: 'Custom Piece',
    subtitle: 'Tell us about your dream piece — we\'ll bring it to life',
    styles: [],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver'],
  },
}

// ---------------------------------------------------------------------------
// Icon maps
// ---------------------------------------------------------------------------

const styleIcons: Record<string, Record<string, LucideIcon>> = {
  'engagement-rings': {
    Classic: Heart, Modern: Zap, Vintage: Clock, 'Art Deco': Hexagon,
    Halo: Sun, Solitaire: Diamond, 'Not Sure': HelpCircle,
  },
  'grillz': {
    'Full Set': LayoutGrid, 'Top 6': ChevronUp, 'Bottom 6': ChevronDown,
    'Single Tooth': Square, Fangs: Flame, 'Not Sure': HelpCircle,
  },
  'chains': {
    'Miami Cuban': Link, Rope: Waves, Franco: Shield,
    Figaro: Circle, 'Box Chain': Square, 'Not Sure': HelpCircle,
  },
  'pendants': {
    Initial: Type, Name: Pen, Symbol: Star,
    Religious: Sparkles, 'Custom Design': Paintbrush, 'Not Sure': HelpCircle,
  },
  'rings': {
    Statement: Crown, Band: Circle, Signet: Shield, Stackable: Layers,
    'Custom Design': Paintbrush, 'Everyday/Essentials': Sun, 'Not Sure': HelpCircle,
  },
  'earrings': {
    Studs: CircleDot, Hoops: Circle, Drops: Droplet,
    Chandeliers: Sparkles, 'Custom Design': Paintbrush, 'Not Sure': HelpCircle,
  },
  'bracelets': {
    Tennis: Gem, Chain: Link, Bangle: Circle,
    Cuff: Shield, 'Custom Design': Paintbrush, 'Not Sure': HelpCircle,
  },
}

// ---------------------------------------------------------------------------
// Size field config per piece type
// ---------------------------------------------------------------------------

const sizeConfig: Record<string, { label: string; placeholder: string }> = {
  'engagement-rings': { label: 'Ring Size', placeholder: 'e.g., Size 7' },
  'rings': { label: 'Ring Size', placeholder: 'e.g., Size 7' },
  'chains': { label: 'Chain Length', placeholder: 'e.g., 22 inches' },
  'pendants': { label: 'Chain Length (optional)', placeholder: 'e.g., 18 inches' },
  'bracelets': { label: 'Wrist Size', placeholder: 'e.g., 7.5 inches' },
  'earrings': { label: 'Size Preference (optional)', placeholder: 'e.g., 1 inch hoops' },
  'grillz': { label: 'Teeth Info', placeholder: 'e.g., Top 6 teeth, mold kit needed' },
  'other': { label: 'Size / Dimensions', placeholder: 'e.g., describe your dimensions' },
}

// ---------------------------------------------------------------------------
// Shared options
// ---------------------------------------------------------------------------

const stoneOptions: { name: string; icon: LucideIcon; color: string }[] = [
  { name: 'Diamond', icon: Diamond, color: 'text-white' },
  { name: 'Sapphire', icon: Gem, color: 'text-blue-400' },
  { name: 'Ruby', icon: Gem, color: 'text-red-400' },
  { name: 'Emerald', icon: Gem, color: 'text-emerald-400' },
  { name: 'None', icon: MinusCircle, color: 'text-stone' },
]

const metalSwatches: Record<string, string> = {
  'Platinum': 'linear-gradient(135deg, #E5E4E2 0%, #BCC6CC 50%, #A0A0A0 100%)',
  '10K Gold': 'linear-gradient(135deg, #D4A437 0%, #C49A2E 50%, #AA8525 100%)',
  '14K Gold': 'linear-gradient(135deg, #E8B923 0%, #D4A437 50%, #B8942A 100%)',
  '18K Gold': 'linear-gradient(135deg, #FFD700 0%, #E8B923 50%, #D4A437 100%)',
  'Silver': 'linear-gradient(135deg, #D0D0D0 0%, #B0B0B0 50%, #969696 100%)',
}

const goldColorOptions = [
  { label: 'Yellow Gold', gradient: 'linear-gradient(135deg, #FFD700 0%, #E8B923 50%, #D4A437 100%)', shadow: 'rgba(255, 215, 0, 0.35)' },
  { label: 'White Gold', gradient: 'linear-gradient(135deg, #F0F0F0 0%, #D4D4D4 50%, #B8B8B8 100%)', shadow: 'rgba(200, 200, 200, 0.35)' },
  { label: 'Rose Gold', gradient: 'linear-gradient(135deg, #F4C2C2 0%, #D4A0A0 50%, #B76E79 100%)', shadow: 'rgba(183, 110, 121, 0.35)' },
]

const budgetOptions = [
  { value: '$1,000-$2,500', label: '$1,000 - $2,500', tier: 1 },
  { value: '$2,500-$5,000', label: '$2,500 - $5,000', tier: 2 },
  { value: '$5,000-$10,000', label: '$5,000 - $10,000', tier: 3 },
  { value: '$10,000+', label: '$10,000+', tier: 4 },
  { value: '$50,000+', label: '$50,000+', tier: 5 },
]

const timelineOptions: { value: string; label: string; icon: LucideIcon; desc: string }[] = [
  { value: 'As soon as possible', label: 'As Soon As Possible', icon: Zap, desc: 'Rush priority' },
  { value: 'No rush', label: 'No Rush', icon: Clock, desc: 'Take your time' },
  { value: '1-2 months', label: '1-2 Months', icon: Calendar, desc: 'Standard timeline' },
  { value: '3-6 months', label: '3-6 Months', icon: CalendarDays, desc: 'Flexible timeline' },
  { value: 'Specific date', label: 'Specific Date', icon: CalendarCheck, desc: "We'll coordinate a date" },
]

// ---------------------------------------------------------------------------
// Review row
// ---------------------------------------------------------------------------

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-glacier-grey/10 pb-2">
      <span className="font-medium text-glacier-grey text-sm">{label}:</span>
      <span className="text-white text-sm">{value}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step type
// ---------------------------------------------------------------------------

type StepId =
  | 'contact' | 'budget' | 'pieceType' | 'style' | 'metal'
  | 'goldColor' | 'stones' | 'diamondType' | 'photos'
  | 'size' | 'timeline' | 'notes' | 'review'

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Landing page for specific types (not the form)
// ---------------------------------------------------------------------------

function LandingPage({ type }: { type: string }) {
  const config = typeConfig[type]
  if (!config) return null

  const styles = config.styles
  const metals = config.metals
  const icons = styleIcons[type] || {}

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden" data-testid="custom-landing">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="h-[70vh] flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-glacier-grey" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {config.title}
            </h1>
            <p className="text-xl md:text-2xl text-stone font-light mb-10 max-w-2xl mx-auto">
              {config.subtitle}
            </p>
            <NextLink
              href="/custom/general"
              className="inline-flex items-center gap-2 bg-glacier-grey text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </NextLink>
          </motion.div>
        </section>

        {/* Available Styles */}
        {styles.length > 0 && (
          <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Available Styles
                </h2>
                <p className="text-stone">Choose from our curated collection of styles</p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {styles.filter(s => s !== 'Not Sure').map((style, i) => {
                  const Icon = icons[style] || HelpCircle
                  return (
                    <motion.div
                      key={style}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex flex-col items-center justify-center p-6 rounded-xl bg-charcoal/50 border border-glacier-grey/20 hover:border-glacier-grey/50 transition-all"
                    >
                      <Icon className="w-10 h-10 mb-3 text-glacier-grey/70" />
                      <span className="text-white font-medium text-sm text-center">{style}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Available Metals */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Premium Metals
              </h2>
              <p className="text-stone">Crafted with the finest materials</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {metals.map((metal, i) => (
                <motion.div
                  key={metal}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center justify-center p-6 rounded-xl bg-charcoal/50 border border-glacier-grey/20"
                >
                  <div
                    className="w-12 h-12 rounded-full mb-3 border border-white/20"
                    style={{ background: metalSwatches[metal] || metalSwatches['Silver'] }}
                  />
                  <span className="text-white font-medium text-sm text-center">{metal}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Begin?
              </h2>
              <p className="text-stone mb-8 max-w-xl mx-auto">
                Start your custom journey and our master craftspeople will bring your vision to life.
              </p>
              <NextLink
                href="/custom/general"
                className="inline-flex items-center gap-2 bg-glacier-grey text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </NextLink>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Router — landing page for specific types, portal form for /custom/general
// ---------------------------------------------------------------------------

export default function CustomJewelryPage() {
  const params = useParams()
  const urlType = (params?.type as string) || 'general'

  // Specific type → landing page (no form)
  if (urlType !== 'general' && urlType in typeConfig) {
    return <LandingPage type={urlType} />
  }

  // /custom/general → portal form
  return <PortalForm />
}

// ---------------------------------------------------------------------------
// Portal form (only for /custom/general — Start Your Journey)
// ---------------------------------------------------------------------------

function PortalForm() {
  const router = useRouter()
  const urlType = 'general'
  const isDirectType = false

  const [formData, setFormData] = useState({
    pieceType: isDirectType ? urlType : '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
    style: '',
    metalType: '',
    goldColor: '',
    stonePreferences: [] as string[],
    diamondType: '',
    size: '',
    timeline: '',
    notes: '',
    inspirationImages: [] as string[],
  })
  const [currentStep, setCurrentStep] = useState<StepId>('contact')
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)

  // Derived
  const activeType = formData.pieceType || ''
  const config = typeConfig[activeType] || null
  const activeSizeConfig = sizeConfig[activeType] || sizeConfig['other']
  const pieceTypeLabel = pieceTypeOptions.find(p => p.value === formData.pieceType)?.label || formData.pieceType

  // ---------------------------------------------------------------------------
  // Build dynamic step sequence
  // ---------------------------------------------------------------------------

  const getSteps = (): StepId[] => {
    const s: StepId[] = ['contact', 'budget']
    if (!isDirectType) s.push('pieceType')

    if (formData.pieceType) {
      const pt = formData.pieceType
      const cfg = typeConfig[pt]
      if (pt !== 'other' && cfg && cfg.styles.length > 0) s.push('style')
      s.push('metal')
      if (formData.metalType.includes('Gold')) s.push('goldColor')
      if (pt !== 'grillz') s.push('stones')
      if (formData.stonePreferences.includes('Diamond')) s.push('diamondType')
      s.push('photos', 'size', 'timeline', 'notes', 'review')
    }
    return s
  }

  const steps = getSteps()
  const idx = steps.indexOf(currentStep)
  const isFirst = idx === 0
  const isLast = idx === steps.length - 1
  const progress = steps.length > 1 ? (idx / (steps.length - 1)) * 100 : 0

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  const goNext = () => {
    const s = getSteps()
    const i = s.indexOf(currentStep)
    if (i < s.length - 1) { setDirection(1); setCurrentStep(s[i + 1]) }
  }

  const goBack = () => {
    const s = getSteps()
    const i = s.indexOf(currentStep)
    if (i > 0) { setDirection(-1); setCurrentStep(s[i - 1]) }
  }

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectPieceType = (pieceType: string) => {
    setFormData(prev => ({
      ...prev, pieceType, style: '', metalType: '', goldColor: '',
      stonePreferences: [], diamondType: '', size: '',
    }))
    setTimeout(() => {
      setDirection(1)
      const cfg = typeConfig[pieceType]
      const hasStyles = pieceType !== 'other' && cfg && cfg.styles.length > 0
      setCurrentStep(hasStyles ? 'style' : 'metal')
    }, 300)
  }

  const selectMetal = (metal: string) => {
    setFormData(prev => ({
      ...prev, metalType: metal,
      goldColor: metal.includes('Gold') ? prev.goldColor : '',
    }))
    setTimeout(() => {
      setDirection(1)
      if (metal.includes('Gold')) {
        setCurrentStep('goldColor')
      } else {
        setCurrentStep(formData.pieceType !== 'grillz' ? 'stones' : 'photos')
      }
    }, 300)
  }

  const selectGoldColor = (color: string) => {
    setFormData(prev => ({ ...prev, goldColor: color }))
    setTimeout(() => {
      setDirection(1)
      setCurrentStep(formData.pieceType !== 'grillz' ? 'stones' : 'photos')
    }, 300)
  }

  const toggleStone = (stone: string) => {
    setFormData(prev => {
      const has = prev.stonePreferences.includes(stone)
      const stones = has ? prev.stonePreferences.filter(s => s !== stone) : [...prev.stonePreferences, stone]
      return { ...prev, stonePreferences: stones, diamondType: stones.includes('Diamond') ? prev.diamondType : '' }
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setUploading(true)
    setFormData(prev => ({ ...prev, inspirationImages: [...prev.inspirationImages, ...files.map(f => f.name)] }))
    setUploading(false)
  }

  const handleSubmit = async () => {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${baseUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: formData.pieceType || 'general',
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          jewelryCategory: formData.pieceType || 'general',
          inspirationNames: formData.inspirationImages.join(', '),
        }),
      })
      if (response.ok) setSubmitted(true)
      else alert('Error submitting inquiry. Please try again.')
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Error submitting inquiry. Please try again.')
    }
  }

  // ---------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------

  const cardBase = 'flex flex-col items-center justify-center rounded-xl border-2 transition-all cursor-pointer'
  const cardSelected = 'bg-glacier-grey/20 border-glacier-grey shadow-lg shadow-glacier-grey/20'
  const cardUnselected = 'bg-charcoal/50 border-glacier-grey/20 hover:border-glacier-grey/50 hover:bg-charcoal'
  const inputClass = 'w-full px-4 py-3 rounded-lg bg-charcoal border-2 border-glacier-grey/50 text-white placeholder-stone focus:border-glacier-grey focus:ring-2 focus:ring-glacier-grey/40 transition-all outline-none'

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  }

  // Determine if current step needs manual "Next" vs auto-advance
  const needsManualNext = ['contact', 'size', 'notes', 'photos', 'stones'].includes(currentStep)

  // =========================================================================
  // SUBMITTED
  // =========================================================================

  if (submitted) {
    return (
      <div className="h-[calc(100dvh-56px)] md:h-[calc(100dvh-72px)] lg:h-[calc(100dvh-80px)] -mb-24 bg-soft-black relative overflow-hidden flex items-center justify-center" data-testid="form-confirmation">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto text-center px-4 relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="inline-block mb-8">
            <div className="w-28 h-28 rounded-full bg-glacier-grey/20 flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-glacier-grey" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Thank You!</h1>
          <p className="text-lg text-stone mb-4">Your custom {pieceTypeLabel.toLowerCase() || 'jewelry'} inquiry has been received.</p>
          <p className="text-stone mb-10 max-w-xl mx-auto text-sm">Our master craftspeople will review your request and contact you within 24-48 hours to begin bringing your vision to life.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/')} className="bg-white/10 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-soft-black transition-all">Return Home</button>
            <button onClick={() => router.push('/catalog')} className="bg-glacier-grey text-white px-8 py-3 rounded-lg font-semibold hover:bg-glacier-grey-light transition-all">Browse Collection</button>
          </div>
        </motion.div>
      </div>
    )
  }

  // =========================================================================
  // PORTAL FORM
  // =========================================================================

  return (
    <div className="h-[calc(100dvh-56px)] md:h-[calc(100dvh-72px)] lg:h-[calc(100dvh-80px)] -mb-24 bg-soft-black relative overflow-hidden flex flex-col" data-testid="custom-form-hero">
      <DotPattern />
      <DiamondPattern className="text-white" />

      {/* Progress line */}
      <div className="relative z-20 w-full shrink-0">
        <div className="h-1 bg-charcoal">
          <motion.div className="h-full bg-gradient-to-r from-glacier-grey to-glacier-grey-light" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: 'easeOut' }} />
        </div>
      </div>

      {/* Compact header */}
      <div className="relative z-10 text-center pt-5 pb-3 px-4 shrink-0">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-glacier-grey" />
          <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">
            {config ? config.title : 'Start Your Journey'}
          </span>
        </div>
      </div>

      {/* Step content — vertically centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 min-h-0">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>

            {/* CONTACT */}
            {currentStep === 'contact' && (
              <motion.div key="contact" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
                <div className="text-center mb-5">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Let&apos;s Get Started</h2>
                  <p className="text-stone text-sm">Tell us a bit about yourself</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-glacier-grey mb-1.5 uppercase tracking-wide">First Name *</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className={inputClass} placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-glacier-grey mb-1.5 uppercase tracking-wide">Last Name *</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className={inputClass} placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-glacier-grey mb-1.5 uppercase tracking-wide">Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-glacier-grey mb-1.5 uppercase tracking-wide">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="+1 (416) 555-1234" />
                </div>
              </motion.div>
            )}

            {/* BUDGET */}
            {currentStep === 'budget' && (
              <motion.div key="budget" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Your Budget</h2>
                  <p className="text-stone text-sm">Select the range that fits your vision</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {budgetOptions.map(({ value, label, tier }) => (
                    <button key={value} type="button" onClick={() => { setFormData(prev => ({ ...prev, budget: value })); setTimeout(goNext, 300) }} className={`${cardBase} p-5 min-h-[100px] ${formData.budget === value ? cardSelected : cardUnselected}`}>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: tier }).map((_, i) => (
                          <DollarSign key={i} className={`w-4 h-4 ${formData.budget === value ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                        ))}
                      </div>
                      <span className="text-white font-semibold text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PIECE TYPE */}
            {currentStep === 'pieceType' && (
              <motion.div key="pieceType" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>What Are You Looking For?</h2>
                  <p className="text-stone text-sm">Select the type of custom piece you&apos;d like us to create</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {pieceTypeOptions.map(({ value, label, icon: PIcon, subtitle: sub }) => {
                    const selected = formData.pieceType === value
                    return (
                      <button key={value} type="button" onClick={() => selectPieceType(value)} className={`${cardBase} p-4 min-h-[120px] ${selected ? cardSelected : cardUnselected}`}>
                        <PIcon className={`w-8 h-8 mb-2 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                        <span className="text-white font-semibold text-sm mb-0.5">{label}</span>
                        <span className="text-stone text-xs text-center leading-tight">{sub}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* STYLE */}
            {currentStep === 'style' && config && (
              <motion.div key="style" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Choose Your Style</h2>
                  <p className="text-stone text-sm">Select the style that speaks to you</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {config.styles.map((style: string) => {
                    const Icon = styleIcons[activeType]?.[style] || HelpCircle
                    const selected = formData.style === style
                    return (
                      <button key={style} type="button" onClick={() => { setFormData(prev => ({ ...prev, style })); setTimeout(goNext, 300) }} className={`${cardBase} p-5 min-h-[100px] ${selected ? cardSelected : cardUnselected}`}>
                        <Icon className={`w-8 h-8 mb-2 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                        <span className="text-white font-medium text-sm text-center">{style}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* METAL */}
            {currentStep === 'metal' && config && (
              <motion.div key="metal" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Select Your Metal</h2>
                  <p className="text-stone text-sm">Choose your preferred metal type</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {config.metals.map((metal: string) => {
                    const selected = formData.metalType === metal
                    return (
                      <button key={metal} type="button" onClick={() => selectMetal(metal)} className={`${cardBase} p-5 min-h-[100px] ${selected ? cardSelected : cardUnselected}`}>
                        <div className="w-10 h-10 rounded-full mb-2 border border-white/20" style={{ background: metalSwatches[metal] || metalSwatches['Silver'], boxShadow: selected ? '0 0 14px rgba(200,170,80,0.3)' : 'none' }} />
                        <span className="text-white font-medium text-sm text-center">{metal}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* GOLD COLOUR */}
            {currentStep === 'goldColor' && (
              <motion.div key="goldColor" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Gold Colour</h2>
                  <p className="text-stone text-sm">Choose your preferred gold colour</p>
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                  {goldColorOptions.map(({ label, gradient, shadow }) => {
                    const selected = formData.goldColor === label
                    return (
                      <button key={label} type="button" onClick={() => selectGoldColor(label)} className={`${cardBase} p-6 ${selected ? 'border-glacier-grey shadow-lg' : 'border-glacier-grey/20 hover:border-glacier-grey/50'}`} style={{ background: selected ? 'rgba(201, 167, 94, 0.15)' : 'rgba(30, 30, 30, 0.5)', boxShadow: selected ? `0 0 24px ${shadow}` : 'none' }}>
                        <div className="w-16 h-16 rounded-full mb-3 border-2 border-white/20" style={{ background: gradient, boxShadow: `0 4px 14px ${shadow}` }} />
                        <span className="text-white font-medium text-sm">{label}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* STONES */}
            {currentStep === 'stones' && (
              <motion.div key="stones" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Stone Preferences</h2>
                  <p className="text-stone text-sm">Select one or more stones for your piece</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {stoneOptions.map(({ name, icon: StoneIcon, color }) => {
                    const selected = formData.stonePreferences.includes(name)
                    return (
                      <button key={name} type="button" onClick={() => toggleStone(name)} className={`${cardBase} p-5 min-h-[100px] ${selected ? cardSelected : cardUnselected}`}>
                        <StoneIcon className={`w-8 h-8 mb-2 ${selected ? color : 'text-glacier-grey/60'}`} />
                        <span className="text-white font-medium text-sm">{name}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* DIAMOND TYPE */}
            {currentStep === 'diamondType' && (
              <motion.div key="diamondType" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Diamond Type</h2>
                  <p className="text-stone text-sm">Choose your preferred diamond origin</p>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {([
                    { label: 'Natural', icon: Leaf, desc: 'Earth-mined diamonds' },
                    { label: 'Lab-Grown', icon: FlaskConical, desc: 'Laboratory-created diamonds' },
                  ] as const).map(({ label, icon: DIcon, desc }) => {
                    const selected = formData.diamondType === label
                    return (
                      <button key={label} type="button" onClick={() => { setFormData(prev => ({ ...prev, diamondType: label })); setTimeout(goNext, 300) }} className={`${cardBase} p-6 min-h-[130px] ${selected ? cardSelected : cardUnselected}`}>
                        <DIcon className={`w-10 h-10 mb-3 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                        <span className="text-white font-semibold text-sm mb-1">{label}</span>
                        <span className="text-stone text-xs text-center">{desc}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* PHOTOS */}
            {currentStep === 'photos' && (
              <motion.div key="photos" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Share Your Inspiration</h2>
                  <p className="text-stone text-sm">Upload images that inspire you (optional)</p>
                </div>
                <div className="relative border-2 border-dashed border-glacier-grey/30 rounded-xl p-10 text-center bg-white/5 hover:bg-white/10 transition-all">
                  <Upload className="w-12 h-12 text-glacier-grey mx-auto mb-3" />
                  <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" disabled={uploading} />
                  <label htmlFor="file-upload" className="inline-block bg-glacier-grey text-white px-6 py-2.5 rounded-lg font-semibold cursor-pointer hover:bg-glacier-grey-light transition-all text-sm">
                    {uploading ? 'Uploading...' : 'Choose Images'}
                  </label>
                  <p className="text-xs text-stone mt-2">PNG, JPG up to 10MB each</p>
                </div>
                {formData.inspirationImages.length > 0 && (
                  <p className="text-white mt-4 text-center text-sm">{formData.inspirationImages.length} image(s) selected</p>
                )}
              </motion.div>
            )}

            {/* SIZE */}
            {currentStep === 'size' && (
              <motion.div key="size" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
                <div className="text-center mb-5">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Size &amp; Dimensions</h2>
                  <p className="text-stone text-sm">Tell us your measurements so we can craft a perfect fit</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-glacier-grey mb-1.5 uppercase tracking-wide">{activeSizeConfig.label}</label>
                  <input type="text" name="size" value={formData.size} onChange={handleInputChange} className={inputClass} placeholder={activeSizeConfig.placeholder} />
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-glacier-grey/10">
                  <p className="text-stone text-sm">Not sure of your size? Don&apos;t worry — we can help during your consultation.</p>
                </div>
              </motion.div>
            )}

            {/* TIMELINE */}
            {currentStep === 'timeline' && (
              <motion.div key="timeline" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Your Timeline</h2>
                  <p className="text-stone text-sm">When do you need your piece?</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timelineOptions.map(({ value, label, icon: TIcon, desc }) => {
                    const selected = formData.timeline === value
                    return (
                      <button key={value} type="button" onClick={() => { setFormData(prev => ({ ...prev, timeline: value })); setTimeout(goNext, 300) }} className={`${cardBase} p-4 min-h-[100px] ${selected ? cardSelected : cardUnselected}`}>
                        <TIcon className={`w-7 h-7 mb-2 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                        <span className="text-white font-semibold text-xs mb-0.5">{label}</span>
                        <span className="text-stone text-xs text-center">{desc}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* NOTES */}
            {currentStep === 'notes' && (
              <motion.div key="notes" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
                <div className="text-center mb-5">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Anything Else?</h2>
                  <p className="text-stone text-sm">Share any additional details or special requests</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-glacier-grey mb-1.5 uppercase tracking-wide">Additional Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={4} className={inputClass} placeholder="Tell us more about your vision..." />
                </div>
              </motion.div>
            )}

            {/* REVIEW */}
            {currentStep === 'review' && (
              <motion.div key="review" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Review Your Request</h2>
                  <p className="text-stone text-sm">Make sure everything looks right</p>
                </div>
                <div className="space-y-2.5 bg-white/5 rounded-lg p-5 border border-glacier-grey/20 max-h-[45vh] overflow-y-auto">
                  <ReviewRow label="Name" value={`${formData.firstName} ${formData.lastName}`} />
                  <ReviewRow label="Email" value={formData.email} />
                  {formData.phone && <ReviewRow label="Phone" value={formData.phone} />}
                  {formData.budget && <ReviewRow label="Budget" value={formData.budget} />}
                  {formData.pieceType && <ReviewRow label="Piece Type" value={pieceTypeLabel} />}
                  {formData.style && <ReviewRow label="Style" value={formData.style} />}
                  {formData.metalType && <ReviewRow label="Metal" value={formData.metalType} />}
                  {formData.goldColor && <ReviewRow label="Gold Colour" value={formData.goldColor} />}
                  {formData.stonePreferences.length > 0 && <ReviewRow label="Stones" value={formData.stonePreferences.join(', ')} />}
                  {formData.diamondType && <ReviewRow label="Diamond Type" value={formData.diamondType} />}
                  {formData.size && <ReviewRow label="Size" value={formData.size} />}
                  {formData.timeline && <ReviewRow label="Timeline" value={formData.timeline} />}
                  {formData.notes && (
                    <div className="border-b border-glacier-grey/10 pb-2">
                      <span className="font-medium text-glacier-grey text-sm block mb-1">Notes:</span>
                      <span className="text-white text-sm">{formData.notes}</span>
                    </div>
                  )}
                  {formData.inspirationImages.length > 0 && <ReviewRow label="Inspiration" value={`${formData.inspirationImages.length} image(s)`} />}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="relative z-10 shrink-0 px-4 pb-6 pt-3" data-testid="form-navigation">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          {!isFirst ? (
            <button type="button" onClick={goBack} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-glacier-grey/30 text-white hover:bg-white/10 transition-all font-medium text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {currentStep === 'review' ? (
            <button type="button" onClick={handleSubmit} className="px-8 py-2.5 rounded-lg bg-glacier-grey text-white hover:bg-glacier-grey-light transition-all font-semibold shadow-lg hover:shadow-xl text-sm">
              Submit Request
            </button>
          ) : needsManualNext ? (
            <button type="button" onClick={goNext} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-glacier-grey text-white hover:bg-glacier-grey-light transition-all font-semibold shadow-lg hover:shadow-xl text-sm">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="button" onClick={goNext} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-glacier-grey/30 text-glacier-grey hover:bg-white/10 transition-all font-medium text-sm">
              Skip <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
