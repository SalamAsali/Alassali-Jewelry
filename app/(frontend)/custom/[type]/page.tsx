'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Upload, ArrowRight, ArrowLeft, Sparkles, Check,
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
// Config
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
// Progress helpers — 4 main steps, 10 total pages
// ---------------------------------------------------------------------------
// Pages: 1=Contact, 2=Budget, 3=Style, 4=Metal, 5=Stones,
//        6=Photos, 7=Size, 8=Timeline, 9=Notes, 10=Review

const mainSteps = [
  { label: 'About You', pages: ['Contact', 'Budget'] },
  { label: 'Design', pages: ['Style', 'Metal', 'Stones'] },
  { label: 'Details', pages: ['Photos', 'Size', 'Timeline', 'Notes'] },
  { label: 'Review', pages: ['Review'] },
]

const getMainIdx = (page: number) => {
  if (page <= 2) return 0
  if (page <= 5) return 1
  if (page <= 9) return 2
  return 3
}

const getSubIdx = (page: number) => {
  if (page <= 2) return page - 1
  if (page <= 5) return page - 3
  if (page <= 9) return page - 6
  return 0
}

// ---------------------------------------------------------------------------
// Shared sub-component
// ---------------------------------------------------------------------------

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-glacier-grey/10 pb-3">
      <span className="font-medium text-glacier-grey">{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function CustomJewelryPage() {
  const params = useParams()
  const router = useRouter()
  const type = (params?.type as string) || 'engagement-rings'

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    type,
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
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)

  const config = typeConfig[type] || typeConfig['engagement-rings']
  const totalSteps = 10

  // ---- handlers ----

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectMetal = (metal: string) => {
    setFormData(prev => ({
      ...prev,
      metalType: metal,
      goldColor: metal.includes('Gold') ? prev.goldColor : '',
    }))
  }

  const toggleStone = (stone: string) => {
    setFormData(prev => {
      const has = prev.stonePreferences.includes(stone)
      const stones = has
        ? prev.stonePreferences.filter(s => s !== stone)
        : [...prev.stonePreferences, stone]
      return {
        ...prev,
        stonePreferences: stones,
        diamondType: stones.includes('Diamond') ? prev.diamondType : '',
      }
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setUploading(true)
    const fileNames = files.map(f => f.name)
    setFormData(prev => ({
      ...prev,
      inspirationImages: [...prev.inspirationImages, ...fileNames],
    }))
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${baseUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          jewelryCategory: type,
          inspirationNames: formData.inspirationImages.join(', '),
        }),
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error submitting inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Error submitting inquiry. Please try again.')
    }
  }

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1) }
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1) }

  // ---- shared style helpers ----

  const cardBase = 'flex flex-col items-center justify-center rounded-xl border-2 transition-all cursor-pointer'
  const cardSelected = 'bg-glacier-grey/20 border-glacier-grey shadow-lg shadow-glacier-grey/20'
  const cardUnselected = 'bg-charcoal/50 border-glacier-grey/20 hover:border-glacier-grey/50 hover:bg-charcoal'
  const inputClass = 'w-full px-4 py-3 rounded-lg bg-charcoal border-2 border-glacier-grey/50 text-white placeholder-stone focus:border-glacier-grey focus:ring-2 focus:ring-glacier-grey/40 transition-all outline-none'

  // ---- progress helpers ----

  const currentMain = getMainIdx(currentStep)
  const currentSub = getSubIdx(currentStep)
  const subPages = mainSteps[currentMain].pages

  // =========================================================================
  // SUBMITTED
  // =========================================================================

  if (submitted) {
    return (
      <div className="min-h-screen bg-soft-black relative overflow-hidden flex items-center justify-center" data-testid="form-confirmation">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto text-center px-4 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-8"
          >
            <div className="w-32 h-32 rounded-full bg-glacier-grey/20 flex items-center justify-center">
              <CheckCircle2 className="w-20 h-20 text-glacier-grey" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Thank You!
          </h1>
          <p className="text-xl text-stone mb-6">
            Your custom {type.replace('-', ' ')} inquiry has been received.
          </p>
          <p className="text-stone mb-12 max-w-2xl mx-auto">
            Our master craftspeople will review your request and contact you within 24-48 hours
            to begin bringing your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/')} className="bg-white/10 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-soft-black transition-all">
              Return Home
            </button>
            <button onClick={() => router.push('/catalog')} className="bg-glacier-grey text-soft-black px-8 py-3 rounded-lg font-semibold hover:bg-glacier-grey-light transition-all">
              Browse Collection
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // =========================================================================
  // MAIN FORM
  // =========================================================================

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden" data-testid="custom-form-hero">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-glacier-grey/20 bg-deep-charcoal/50 backdrop-blur-sm">
          <div className="section-container py-12">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-glacier-grey" />
                <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {config.title}
                </h1>
              </div>
              <p className="text-xl text-stone font-light max-w-3xl mx-auto">{config.subtitle}</p>
            </motion.div>
          </div>
        </div>

        {/* Body */}
        <div className="section-container py-24">
          <div className="max-w-4xl mx-auto">

            {/* ============ TWO-TIER PROGRESS BAR ============ */}
            <div className="mb-12" data-testid="form-progress">
              {/* Main steps */}
              <div className="flex justify-between items-center mb-2">
                {mainSteps.map((step, i) => {
                  const isCompleted = i < currentMain
                  const isActive = i === currentMain
                  return (
                    <div key={i} className="flex-1 mx-2">
                      <div className="relative">
                        <div className={`h-1.5 rounded-full transition-all duration-500 ${
                          isCompleted || isActive ? 'bg-gradient-to-r from-glacier-grey to-glacier-grey-light' : 'bg-charcoal'
                        }`} />
                        <div className={`absolute -top-3.5 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                          isCompleted
                            ? 'bg-glacier-grey border-glacier-grey text-soft-black'
                            : isActive
                              ? 'bg-glacier-grey border-glacier-grey text-soft-black scale-110'
                              : 'bg-charcoal border-taupe text-taupe'
                        }`}>
                          {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                        </div>
                      </div>
                      <p className={`text-center text-xs mt-4 font-medium transition-colors duration-300 ${
                        isCompleted || isActive ? 'text-glacier-grey' : 'text-taupe'
                      }`}>{step.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Sub-steps */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMain}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                  className="flex justify-center items-center gap-4 mt-6 py-3 px-4 rounded-lg bg-white/5 border border-glacier-grey/10"
                >
                  {subPages.map((label, i) => {
                    const isDone = i < currentSub
                    const isActive = i === currentSub
                    return (
                      <div key={label} className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          isDone ? 'bg-glacier-grey' : isActive ? 'bg-glacier-grey scale-125' : 'bg-charcoal'
                        }`} />
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDone || isActive ? 'text-glacier-grey' : 'text-taupe'
                        }`}>{label}</span>
                      </div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ============ FORM CARD ============ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(44, 44, 44, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                border: '1px solid rgba(201, 167, 94, 0.3)',
                boxShadow: '0 0 60px rgba(201, 167, 94, 0.15)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-glacier-grey/10 via-transparent to-glacier-grey/5 pointer-events-none" />

              <div className="relative z-10 p-8 md:p-12" data-testid="form-container">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">

                    {/* ===== PAGE 1 — Contact ===== */}
                    {currentStep === 1 && (
                      <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                          Let&apos;s Get Started
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">First Name *</label>
                            <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className={inputClass} placeholder="John" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">Last Name *</label>
                            <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className={inputClass} placeholder="Doe" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">Email *</label>
                          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="john@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">Phone</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="+1 (416) 555-1234" />
                        </div>
                      </motion.div>
                    )}

                    {/* ===== PAGE 2 — Budget ===== */}
                    {currentStep === 2 && (
                      <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Your Budget</h2>
                        <p className="text-stone mb-8">Select the range that fits your vision</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {budgetOptions.map(({ value, label, tier }) => (
                            <button key={value} type="button" onClick={() => setFormData(prev => ({ ...prev, budget: value }))} className={`${cardBase} p-6 min-h-[120px] ${formData.budget === value ? cardSelected : cardUnselected}`}>
                              <div className="flex gap-0.5 mb-3">
                                {Array.from({ length: tier }).map((_, i) => (
                                  <DollarSign key={i} className={`w-5 h-5 ${formData.budget === value ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                                ))}
                              </div>
                              <span className="text-white font-semibold text-sm">{label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* ===== PAGE 3 — Style ===== */}
                    {currentStep === 3 && (
                      <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Choose Your Style</h2>
                        <p className="text-stone mb-8">Select the style that speaks to you</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {config.styles.map((style: string) => {
                            const Icon = styleIcons[type]?.[style] || HelpCircle
                            const selected = formData.style === style
                            return (
                              <button key={style} type="button" onClick={() => setFormData(prev => ({ ...prev, style }))} className={`${cardBase} p-6 min-h-[140px] ${selected ? cardSelected : cardUnselected}`}>
                                <Icon className={`w-10 h-10 mb-3 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                                <span className="text-white font-medium text-sm text-center">{style}</span>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* ===== PAGE 4 — Metal + Gold Colour ===== */}
                    {currentStep === 4 && (
                      <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Select Your Metal</h2>
                          <p className="text-stone mb-8">Choose your preferred metal type</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {config.metals.map((metal: string) => {
                              const selected = formData.metalType === metal
                              return (
                                <button key={metal} type="button" onClick={() => selectMetal(metal)} className={`${cardBase} p-6 min-h-[130px] ${selected ? cardSelected : cardUnselected}`}>
                                  <div className="w-10 h-10 rounded-full mb-3 border border-white/20" style={{ background: metalSwatches[metal] || metalSwatches['Silver'], boxShadow: selected ? '0 0 14px rgba(200,170,80,0.3)' : 'none' }} />
                                  <span className="text-white font-medium text-sm text-center">{metal}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                        {formData.metalType.includes('Gold') && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Gold Colour</h3>
                            <p className="text-stone mb-6">Choose your preferred gold colour</p>
                            <div className="grid grid-cols-3 gap-4">
                              {goldColorOptions.map(({ label, gradient, shadow }) => {
                                const selected = formData.goldColor === label
                                return (
                                  <button key={label} type="button" onClick={() => setFormData(prev => ({ ...prev, goldColor: label }))} className={`${cardBase} p-6 ${selected ? 'border-glacier-grey shadow-lg' : 'border-glacier-grey/20 hover:border-glacier-grey/50'}`} style={{ background: selected ? 'rgba(201, 167, 94, 0.15)' : 'rgba(30, 30, 30, 0.5)', boxShadow: selected ? `0 0 24px ${shadow}` : 'none' }}>
                                    <div className="w-14 h-14 rounded-full mb-3 border-2 border-white/20" style={{ background: gradient, boxShadow: `0 4px 14px ${shadow}` }} />
                                    <span className="text-white font-medium text-sm">{label}</span>
                                  </button>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* ===== PAGE 5 — Stones + Diamond Type ===== */}
                    {currentStep === 5 && (
                      <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Stone Preferences</h2>
                          <p className="text-stone mb-8">Select one or more stones for your piece</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {stoneOptions.map(({ name, icon: StoneIcon, color }) => {
                              const selected = formData.stonePreferences.includes(name)
                              return (
                                <button key={name} type="button" onClick={() => toggleStone(name)} className={`${cardBase} p-6 min-h-[130px] ${selected ? cardSelected : cardUnselected}`}>
                                  <StoneIcon className={`w-10 h-10 mb-3 ${selected ? color : 'text-glacier-grey/60'}`} />
                                  <span className="text-white font-medium text-sm">{name}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                        {formData.stonePreferences.includes('Diamond') && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Diamond Type</h3>
                            <p className="text-stone mb-6">Choose your preferred diamond origin</p>
                            <div className="grid grid-cols-2 gap-4">
                              {([
                                { label: 'Natural', icon: Leaf, desc: 'Earth-mined diamonds' },
                                { label: 'Lab-Grown', icon: FlaskConical, desc: 'Laboratory-created diamonds' },
                              ] as const).map(({ label, icon: DIcon, desc }) => {
                                const selected = formData.diamondType === label
                                return (
                                  <button key={label} type="button" onClick={() => setFormData(prev => ({ ...prev, diamondType: label }))} className={`${cardBase} p-6 min-h-[150px] ${selected ? cardSelected : cardUnselected}`}>
                                    <DIcon className={`w-10 h-10 mb-3 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                                    <span className="text-white font-semibold text-sm mb-1">{label}</span>
                                    <span className="text-stone text-xs text-center">{desc}</span>
                                  </button>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* ===== PAGE 6 — Inspiration ===== */}
                    {currentStep === 6 && (
                      <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Share Your Inspiration</h2>
                        <p className="text-stone mb-8">Upload images that inspire you. This helps us understand your vision better.</p>
                        <div className="relative border-2 border-dashed border-glacier-grey/30 rounded-xl p-12 text-center bg-white/5 hover:bg-white/10 transition-all">
                          <Upload className="w-16 h-16 text-glacier-grey mx-auto mb-4" />
                          <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" disabled={uploading} />
                          <label htmlFor="file-upload" className="inline-block bg-glacier-grey text-soft-black px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-glacier-grey-light transition-all">
                            {uploading ? 'Uploading...' : 'Choose Images'}
                          </label>
                          <p className="text-sm text-stone mt-3">PNG, JPG up to 10MB each</p>
                        </div>
                        {formData.inspirationImages.length > 0 && (
                          <div className="mt-8">
                            <p className="text-white mb-4">{formData.inspirationImages.length} image(s) selected</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* ===== PAGE 7 — Size ===== */}
                    {currentStep === 7 && (
                      <motion.div key="s7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Size &amp; Dimensions</h2>
                        <p className="text-stone mb-8">Tell us your measurements so we can craft a perfect fit</p>
                        <div>
                          <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">Size / Dimensions</label>
                          <input type="text" name="size" value={formData.size} onChange={handleInputChange} className={inputClass} placeholder="e.g., Ring size 7, Chain 22 inches" />
                        </div>
                        <div className="p-5 bg-white/5 rounded-xl border border-glacier-grey/10">
                          <p className="text-stone text-sm leading-relaxed">Not sure of your size? Don&apos;t worry — we can help determine the perfect fit during your consultation.</p>
                        </div>
                      </motion.div>
                    )}

                    {/* ===== PAGE 8 — Timeline ===== */}
                    {currentStep === 8 && (
                      <motion.div key="s8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Your Timeline</h2>
                        <p className="text-stone mb-8">When do you need your piece?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {timelineOptions.map(({ value, label, icon: TIcon, desc }) => {
                            const selected = formData.timeline === value
                            return (
                              <button key={value} type="button" onClick={() => setFormData(prev => ({ ...prev, timeline: value }))} className={`${cardBase} p-6 min-h-[130px] ${selected ? cardSelected : cardUnselected}`}>
                                <TIcon className={`w-9 h-9 mb-3 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                                <span className="text-white font-semibold text-sm mb-1">{label}</span>
                                <span className="text-stone text-xs text-center">{desc}</span>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* ===== PAGE 9 — Notes ===== */}
                    {currentStep === 9 && (
                      <motion.div key="s9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Anything Else?</h2>
                        <p className="text-stone mb-8">Share any additional details, special engravings, or references that will help bring your vision to life</p>
                        <div>
                          <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">Additional Notes</label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={7}
                            className={inputClass}
                            placeholder="Tell us more about your vision..."
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* ===== PAGE 10 — Review ===== */}
                    {currentStep === 10 && (
                      <motion.div key="s10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Review Your Request</h2>
                        <div className="space-y-4 bg-white/5 rounded-lg p-6 border border-glacier-grey/20">
                          <ReviewRow label="First Name" value={formData.firstName} />
                          <ReviewRow label="Last Name" value={formData.lastName} />
                          <ReviewRow label="Email" value={formData.email} />
                          {formData.phone && <ReviewRow label="Phone" value={formData.phone} />}
                          {formData.budget && <ReviewRow label="Budget" value={formData.budget} />}
                          {formData.style && <ReviewRow label="Style" value={formData.style} />}
                          {formData.metalType && <ReviewRow label="Metal" value={formData.metalType} />}
                          {formData.goldColor && <ReviewRow label="Gold Colour" value={formData.goldColor} />}
                          {formData.stonePreferences.length > 0 && (
                            <ReviewRow label="Stones" value={formData.stonePreferences.join(', ')} />
                          )}
                          {formData.diamondType && <ReviewRow label="Diamond Type" value={formData.diamondType} />}
                          {formData.size && <ReviewRow label="Size" value={formData.size} />}
                          {formData.timeline && <ReviewRow label="Timeline" value={formData.timeline} />}
                          {formData.notes && (
                            <div className="border-b border-glacier-grey/10 pb-3">
                              <span className="font-medium text-glacier-grey block mb-2">Notes:</span>
                              <span className="text-white text-sm">{formData.notes}</span>
                            </div>
                          )}
                          {formData.inspirationImages.length > 0 && (
                            <div>
                              <span className="font-medium text-glacier-grey block mb-2">Inspiration Images:</span>
                              <span className="text-white text-sm">{formData.inspirationImages.length} image(s) uploaded</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex justify-between mt-12 pt-8 border-t border-glacier-grey/20" data-testid="form-navigation">
                    {currentStep > 1 && (
                      <button type="button" onClick={prevStep} className="flex items-center gap-2 px-8 py-3 rounded-lg bg-white/5 border border-glacier-grey/30 text-white hover:bg-white/10 transition-all font-semibold">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                    )}
                    {currentStep < totalSteps ? (
                      <button type="button" onClick={nextStep} className="ml-auto flex items-center gap-2 px-8 py-3 rounded-lg bg-glacier-grey text-soft-black hover:bg-glacier-grey-light transition-all font-semibold shadow-lg hover:shadow-xl">
                        Next <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button type="submit" className="ml-auto px-8 py-3 rounded-lg bg-glacier-grey text-soft-black hover:bg-glacier-grey-light transition-all font-semibold shadow-lg hover:shadow-xl">
                        Submit Request
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
