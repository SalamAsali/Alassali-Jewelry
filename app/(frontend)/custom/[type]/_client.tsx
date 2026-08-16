'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import NextLink from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Upload, ArrowRight, ArrowLeft, ArrowDown, Sparkles,
  Heart, Zap, Clock, Hexagon, Sun, Diamond, HelpCircle,
  LayoutGrid, ChevronUp, ChevronDown, Square, Flame,
  Link, Waves, Shield, Type, Pen, Star, MapPin, Wrench, MessageSquare,
  Paintbrush, Crown, Circle, Layers, ShieldCheck,
  CircleDot, Droplet, Gem, Hammer,
  MinusCircle, Leaf, FlaskConical,
  DollarSign, Calendar, CalendarDays, CalendarCheck,
  Quote, Ruler, Coins, Ring, Scroll,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import StoneShapeSection from '@/components/bespoke/StoneShapeSection'
import NaturalVsLabSection from '@/components/bespoke/NaturalVsLabSection'
import GrillzConfigSection from '@/components/bespoke/GrillzConfigSection'
import PendantsHeritageSection from '@/components/bespoke/PendantsHeritageSection'
import ClientLiveReviewsStrip from '@/components/reviews/ClientLiveReviewsStrip'
import LocationSection from '@/components/bespoke/LocationSection'
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema, buildOakvilleStoreSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'
import { bespokePath, type City } from '@/lib/locations'
import { type LandingEntry } from '@/lib/bespoke/content'
import { isCalendlyConfigured } from '@/lib/calendly'
import CalendlyScheduler from '@/components/scheduling/CalendlyScheduler'

// ---------------------------------------------------------------------------
// Floating diamond icons (matches homepage hero)
// ---------------------------------------------------------------------------

const floatingDiamonds = [
  { top: '5%', left: '8%', size: 64, opacity: 'opacity-[0.12]', anim: 'float 8s ease-in-out infinite' },
  { top: '12%', right: '6%', size: 48, opacity: 'opacity-[0.18]', anim: 'float-slow 12s ease-in-out infinite 1s' },
  { top: '30%', left: '3%', size: 36, opacity: 'opacity-[0.15]', anim: 'float 10s ease-in-out infinite 2s' },
  { top: '22%', right: '15%', size: 28, opacity: 'opacity-[0.22]', anim: 'float-slow 9s ease-in-out infinite 0.5s' },
  { top: '50%', left: '6%', size: 52, opacity: 'opacity-[0.10]', anim: 'float-slow 14s ease-in-out infinite 3s' },
  { top: '45%', right: '4%', size: 40, opacity: 'opacity-[0.15]', anim: 'float 7s ease-in-out infinite 1.5s' },
  { top: '68%', left: '10%', size: 24, opacity: 'opacity-[0.25]', anim: 'float 6s ease-in-out infinite 2.5s' },
  { top: '72%', right: '10%', size: 56, opacity: 'opacity-[0.10]', anim: 'float-slow 11s ease-in-out infinite 4s' },
  { top: '85%', left: '20%', size: 32, opacity: 'opacity-[0.20]', anim: 'float 9s ease-in-out infinite 1s' },
  { top: '88%', right: '22%', size: 20, opacity: 'opacity-[0.28]', anim: 'float-slow 8s ease-in-out infinite 3.5s' },
  { top: '15%', left: '45%', size: 22, opacity: 'opacity-[0.20]', anim: 'float 7s ease-in-out infinite 0.5s' },
  { top: '60%', left: '48%', size: 18, opacity: 'opacity-[0.25]', anim: 'float-slow 10s ease-in-out infinite 2s' },
]

function FloatingDiamonds() {
  return (
    <>
      {floatingDiamonds.map((d, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none z-[5] ${d.opacity}`}
          style={{
            top: d.top,
            left: 'left' in d ? d.left : undefined,
            right: 'right' in d ? d.right : undefined,
            animation: d.anim,
          }}
        >
          <Image src="/images/icon-white.png" alt="" width={d.size} height={d.size} />
        </div>
      ))}
    </>
  )
}

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Piece type options
// ---------------------------------------------------------------------------

const pieceTypeOptions: { value: string; label: string; icon: LucideIcon; subtitle: string }[] = [
  { value: 'engagement-rings', label: 'Engagement Rings', icon: Diamond, subtitle: 'Begin your forever' },
  { value: 'rings', label: 'Ring', icon: Circle, subtitle: 'Statement, band, signet & more' },
  { value: 'chains', label: 'Chain', icon: Link, subtitle: 'Cuban, rope, franco & more' },
  { value: 'pendants', label: 'Pendant', icon: Layers, subtitle: 'Initial, name, symbol & more' },
  { value: 'earrings', label: 'Earrings', icon: CircleDot, subtitle: 'Studs, hoops, drops & more' },
  { value: 'bracelets', label: 'Bracelet', icon: Gem, subtitle: 'Tennis, bangle, cuff & more' },
  { value: 'grillz', label: 'Grillz', icon: Flame, subtitle: 'Bold precious metal statements' },
  { value: 'other', label: 'Other', icon: HelpCircle, subtitle: 'Something unique, tell us more' },
]

// ---------------------------------------------------------------------------
// Config per piece type
// ---------------------------------------------------------------------------

// `seoNoun` is the singular service phrase used in the two section headings
// that carry the keyword (Styles and FAQs). Singular reads naturally in a
// heading ("Custom Engagement Ring Styles"), where the plural page title does
// not. Deliberately excludes the city: the H1 already carries "in <city>", and
// repeating it down the page is the heading-stuffing pattern we avoid.
const typeConfig: Record<string, { title: string; subtitle: string; seoNoun?: string; styles: string[]; metals: string[] }> = {
  'engagement-rings': {
    title: 'Custom Engagement Rings',
    seoNoun: 'Custom Engagement Ring',
    subtitle: 'Begin your forever with a ring as unique as your love story',
    styles: ['Classic', 'Modern', 'Vintage', 'Art Deco', 'Halo', 'Solitaire', 'Bridal', 'Other'],
    metals: ['Platinum', '18K Gold', '14K Gold', '10K Gold', 'Silver', 'Other'],
  },
  'grillz': {
    title: 'Custom Grillz',
    seoNoun: 'Custom Grillz',
    subtitle: 'Bold statements crafted in precious metal',
    styles: ['Full Set', 'Top 6', 'Bottom 6', 'Single Tooth', 'Fangs', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'chains': {
    title: 'Custom Chains',
    seoNoun: 'Custom Chain',
    subtitle: 'Wearable art, crafted to your specifications',
    styles: ['Miami Cuban', 'Rope', 'Franco', 'Figaro', 'Box Chain', 'Tennis', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'pendants': {
    title: 'Custom Pendants',
    seoNoun: 'Custom Pendant',
    subtitle: 'Your story, beautifully told',
    styles: ['Initial', 'Name', 'Symbol', 'Religious', 'Custom Design and/or Logo Design', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'rings': {
    title: 'Custom Rings',
    seoNoun: 'Custom Ring',
    subtitle: 'Unique rings designed just for you',
    styles: ['Statement', 'Band', 'Signet', 'Stackable', 'Custom Design and/or Logo Design', 'Everyday/Essentials', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'earrings': {
    title: 'Custom Earrings',
    seoNoun: 'Custom Earring',
    subtitle: 'Elegant earrings crafted to perfection',
    styles: ['Studs', 'Hoops', 'Drops', 'Chandeliers', 'Custom Design and/or Logo Design', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'bracelets': {
    title: 'Custom Bracelets',
    seoNoun: 'Custom Bracelet',
    subtitle: 'Exquisite bracelets tailored to your style',
    styles: ['Tennis', 'Chain', 'Bangle', 'Cuff', 'Custom Design and/or Logo Design', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'wedding-bands': {
    title: 'Custom Wedding Bands',
    seoNoun: 'Custom Wedding Band',
    subtitle: 'Bands as timeless as your vow, handcrafted to match your ring',
    styles: ['Classic Band', 'Comfort Fit', 'Eternity', 'Half-Eternity', 'Men\'s Band', 'Engraved', 'Contour / Shaped', 'Stackable', 'Other'],
    metals: ['Platinum', '18K Gold', '14K Gold', '10K Gold', 'Silver', 'Other'],
  },
  'other': {
    title: 'Custom Piece',
    subtitle: 'Tell us about your dream piece, and we\'ll bring it to life',
    styles: [],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
}

// ---------------------------------------------------------------------------
// Icon maps
// ---------------------------------------------------------------------------

const styleIcons: Record<string, Record<string, LucideIcon>> = {
  'engagement-rings': {
    Classic: Heart, Modern: Zap, Vintage: Clock, 'Art Deco': Hexagon,
    Halo: Sun, Solitaire: Diamond, Bridal: Crown, Other: HelpCircle,
  },
  'grillz': {
    'Full Set': LayoutGrid, 'Top 6': ChevronUp, 'Bottom 6': ChevronDown,
    'Single Tooth': Square, Fangs: Flame, Other: HelpCircle,
  },
  'chains': {
    'Miami Cuban': Link, Rope: Waves, Franco: Shield,
    Figaro: Circle, 'Box Chain': Square, Tennis: Gem, Other: HelpCircle,
  },
  'pendants': {
    Initial: Type, Name: Pen, Symbol: Star,
    Religious: Sparkles, 'Custom Design and/or Logo Design': Paintbrush, Other: HelpCircle,
  },
  'rings': {
    Statement: Crown, Band: Circle, Signet: Shield, Stackable: Layers,
    'Custom Design and/or Logo Design': Paintbrush, 'Everyday/Essentials': Sun, Other: HelpCircle,
  },
  'earrings': {
    Studs: CircleDot, Hoops: Circle, Drops: Droplet,
    Chandeliers: Sparkles, 'Custom Design and/or Logo Design': Paintbrush, Other: HelpCircle,
  },
  'bracelets': {
    Tennis: Gem, Chain: Link, Bangle: Circle,
    Cuff: Shield, 'Custom Design and/or Logo Design': Paintbrush, Other: HelpCircle,
  },
  'wedding-bands': {
    'Classic Band': Circle, 'Comfort Fit': CircleDot, Eternity: Sparkles,
    'Half-Eternity': Star, 'Men\'s Band': Shield, Engraved: Pen,
    'Contour / Shaped': Waves, Stackable: Layers, Other: HelpCircle,
  },
}

// ---------------------------------------------------------------------------
// Size field config per piece type
// ---------------------------------------------------------------------------

const sizeConfig: Record<string, { label: string; placeholder: string }> = {
  'engagement-rings': { label: 'Ring Size', placeholder: 'e.g., Size 7' },
  'rings': { label: 'Ring Size', placeholder: 'e.g., Size 7' },
  'wedding-bands': { label: 'Ring Size', placeholder: 'e.g., Size 7' },
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
  { name: 'Other', icon: HelpCircle, color: 'text-glacier-grey' },
  { name: 'None', icon: MinusCircle, color: 'text-stone' },
]

const stoneShapeOptions: { name: string; icon: LucideIcon }[] = [
  { name: 'Round', icon: Circle },
  { name: 'Princess', icon: Square },
  { name: 'Oval', icon: CircleDot },
  { name: 'Emerald', icon: Hexagon },
  { name: 'Cushion', icon: Shield },
  { name: 'Pear', icon: Droplet },
  { name: 'Marquise', icon: Diamond },
  { name: 'Radiant', icon: Sun },
  { name: 'Asscher', icon: Layers },
  { name: 'Heart', icon: Heart },
  { name: 'Trillion', icon: Flame },
  { name: 'Baguette', icon: MinusCircle },
  { name: 'Other', icon: HelpCircle },
]

const metalSwatches: Record<string, string> = {
  'Platinum': 'linear-gradient(135deg, #E5E4E2 0%, #BCC6CC 50%, #A0A0A0 100%)',
  '10K Gold': 'linear-gradient(135deg, #D4A437 0%, #C49A2E 50%, #AA8525 100%)',
  '14K Gold': 'linear-gradient(135deg, #E8B923 0%, #D4A437 50%, #B8942A 100%)',
  '18K Gold': 'linear-gradient(135deg, #FFD700 0%, #E8B923 50%, #D4A437 100%)',
  'Silver': 'linear-gradient(135deg, #D0D0D0 0%, #B0B0B0 50%, #969696 100%)',
  'Other': 'linear-gradient(135deg, #8B8B8B 0%, #6B6B6B 50%, #505050 100%)',
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
  | 'goldColor' | 'stones' | 'stoneShape' | 'diamondType' | 'photos'
  | 'size' | 'timeline' | 'notes' | 'review'

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Landing page for specific types (not the form)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Global "Why Choose Al-Asali" cards — identical across every bespoke page
// ---------------------------------------------------------------------------

const globalWhyCards: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MapPin, title: 'Made in Toronto', text: 'Every piece is crafted entirely in-house in Toronto. No outsourcing and no middlemen.' },
  { icon: Diamond, title: 'Ethically Sourced', text: 'Natural and lab-grown diamonds, conflict-free sapphires, rubies, and emeralds.' },
  { icon: MessageSquare, title: 'One-on-One Design', text: 'Personal consultation from concept to CAD rendering to finished piece.' },
  { icon: ShieldCheck, title: 'Premium Materials', text: '10K-18K gold, platinum, and sterling silver with optional gemstones.' },
]

// ---------------------------------------------------------------------------
// SEO landing page content per type
// ---------------------------------------------------------------------------


const servicePricing: Record<string, { minPrice: number; maxPrice?: number; serviceType: string }> = {
  'engagement-rings': { minPrice: 1000, maxPrice: 50000, serviceType: 'Custom Engagement Ring Design' },
  'rings': { minPrice: 1000, maxPrice: 25000, serviceType: 'Custom Ring Design' },
  'wedding-bands': { minPrice: 900, maxPrice: 15000, serviceType: 'Custom Wedding Band Design' },
  'pendants': { minPrice: 1000, maxPrice: 20000, serviceType: 'Custom Pendant Design' },
  'chains': { minPrice: 1000, maxPrice: 30000, serviceType: 'Custom Chain Design' },
  'earrings': { minPrice: 1000, maxPrice: 20000, serviceType: 'Custom Earring Design' },
  'bracelets': { minPrice: 1000, maxPrice: 25000, serviceType: 'Custom Bracelet Design' },
  'grillz': { minPrice: 500, maxPrice: 25000, serviceType: 'Custom Grillz Design' },
}

function LandingPage({ type, city, landing }: { type: string; city: City; landing: LandingEntry }) {
  const config = typeConfig[type]
  if (!config) return null

  const cityName = city === 'oakville' ? 'Oakville' : 'Toronto'

  // Oakville reframes the consultation card around its own clients. "Made in
  // Toronto" deliberately stays as-is on every page — that is where the work
  // actually happens, and the review notes asked us to keep it accurate.
  const whyCards =
    city === 'oakville'
      ? globalWhyCards.map((c) =>
          c.title === 'One-on-One Design'
            ? { ...c, text: 'Private consultations for Oakville clients from concept to CAD rendering to finished piece.' }
            : c
        )
      : globalWhyCards

  const styles = config.styles

  // Portfolio category to pre-select when the visitor follows the "View Our
  // Work" link below. Pass it as a query param because <NextLink> is a
  // client-side route change — document.referrer wouldn't update.
  const portfolioCategory = type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  const portfolioHref = `/portfolio?category=${encodeURIComponent(portfolioCategory)}`
  const metals = config.metals
  const icons = styleIcons[type] || {}
  const showStones = type !== 'grillz'
  const sizeInfo = sizeConfig[type] || sizeConfig['other']

  const pricing = servicePricing[type]
  const serviceSchema = pricing
    ? buildServiceSchema({
        slug: type,
        city,
        serviceType: pricing.serviceType,
        name: landing.heroH1,
        description: landing.heroSub,
        minPrice: pricing.minPrice,
        maxPrice: pricing.maxPrice,
        styles: config.styles,
      })
    : null

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: `${config.title} ${cityName}`, url: `${SITE_CONFIG.url}${bespokePath(type, city)}` },
  ])

  const faqSchema = buildFaqSchema(landing.faq)

  // The root layout only emits the Toronto store node. Oakville pages need
  // their own branch node present so `provider` on the Service resolves.
  const branchStoreSchema = city === 'oakville' ? buildOakvilleStoreSchema() : null

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden" data-testid="custom-landing">
      <DotPattern />
      <DiamondPattern className="text-white" />
      <FloatingDiamonds />

      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="min-h-[70vh] flex items-center justify-center text-center px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {landing.heroH1}
            </h1>
            <p className="text-xl md:text-2xl text-stone font-light mb-10 max-w-3xl mx-auto leading-relaxed">
              {landing.heroSub}
            </p>
            {/* 📸 IMAGE SLOT 1: Hero product image */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NextLink href={`/custom-form?type=${type}`} className="inline-flex items-center gap-2 bg-glacier-grey text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl">
                Design Your {config.title.replace('Custom ', '')} <ArrowRight className="w-5 h-5" />
              </NextLink>
              <NextLink href={portfolioHref} className="inline-flex items-center gap-2 bg-white/10 border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-soft-black transition-all duration-300">
                View Our Work
              </NextLink>
            </div>
          </motion.div>
        </section>

        {/* ===== WHY CHOOSE AL-ASSALI ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-5xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white text-center mb-14" style={{ fontFamily: 'var(--font-heading)' }}>
              Why Choose Al-Asali
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyCards.map((card, i) => {
                const CardIcon = card.icon
                return (
                  <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6 text-center hover:border-glacier-grey/40 transition-all">
                    <div className="w-14 h-14 rounded-full bg-glacier-grey/10 border border-glacier-grey/30 flex items-center justify-center mx-auto mb-4">
                      <CardIcon className="w-7 h-7 text-glacier-grey" />
                    </div>
                    <h3 className="text-white font-bold mb-2">{card.title}</h3>
                    <p className="text-stone text-sm leading-relaxed">{card.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== INTRO + CONTEXT ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-lg text-stone leading-relaxed">{landing.intro}</p>
            </motion.div>
            {/* 📸 IMAGE SLOT 2: Lifestyle / workshop image */}
          </div>
        </section>

        {/* ===== AVAILABLE STYLES ===== */}
        {styles.length > 0 && (
          <section className="py-20 px-4 border-t border-glacier-grey/10">
            <div className="max-w-5xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  {config.seoNoun ? `${config.seoNoun} Styles` : 'Available Styles'}
                </h2>
                <p className="text-stone">Select the style that speaks to you during your consultation</p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {styles.filter(s => s !== 'Not Sure').map((style, i) => {
                  const Icon = icons[style] || HelpCircle
                  return (
                    <motion.div key={style} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center justify-center p-6 rounded-xl bg-charcoal/50 border border-glacier-grey/20 hover:border-glacier-grey/50 transition-all">
                      <Icon className="w-10 h-10 mb-3 text-glacier-grey/70" />
                      <span className="text-white font-medium text-sm text-center">{style}</span>
                    </motion.div>
                  )
                })}
              </div>
              {/* 📸 IMAGE SLOT 3: Style showcase grid — 4-6 photos of different styles */}
            </div>
          </section>
        )}

        {/* ===== METALS & GOLD COLOURS ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Premium Metals
              </h2>
              <p className="text-stone">Crafted with the finest materials. Choose your metal during consultation.</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
              {metals.map((metal, i) => (
                <motion.div key={metal} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center justify-center p-6 rounded-xl bg-charcoal/50 border border-glacier-grey/20">
                  <div className="w-12 h-12 rounded-full mb-3 border border-white/20" style={{ background: metalSwatches[metal] || metalSwatches['Silver'] }} />
                  <span className="text-white font-medium text-sm text-center">{metal}</span>
                </motion.div>
              ))}
            </div>
            {/* Gold colour options */}
            {metals.some(m => m.includes('Gold')) && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-xl font-bold text-white text-center mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Gold Colour Options</h3>
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                  {goldColorOptions.map(({ label, gradient, shadow }) => (
                    <div key={label} className="flex flex-col items-center p-4 rounded-xl bg-charcoal/50 border border-glacier-grey/20">
                      <div className="w-14 h-14 rounded-full mb-3 border-2 border-white/20" style={{ background: gradient, boxShadow: `0 4px 14px ${shadow}` }} />
                      <span className="text-white font-medium text-sm">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-stone text-sm text-center mt-6">All gold options available in yellow, white, and rose gold</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ===== STONE OPTIONS (hidden for grillz — they have their own stone note) ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {showStones ? 'Stone Options' : 'Diamond & Stone Options'}
              </h2>
            </motion.div>
            {showStones && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stoneOptions.filter(s => s.name !== 'None').map((stone, i) => {
                  const StoneIcon = stone.icon
                  return (
                    <motion.div key={stone.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center justify-center p-6 rounded-xl bg-charcoal/50 border border-glacier-grey/20">
                      <StoneIcon className={`w-10 h-10 mb-3 ${stone.color}`} />
                      <span className="text-white font-medium text-sm">{stone.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            )}
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-stone text-center leading-relaxed">
              {landing.stoneNote}
            </motion.p>
          </div>
        </section>

        {/* ===== STONE SHAPES (types where shape matters) ===== */}
        {['engagement-rings', 'rings', 'earrings', 'bracelets', 'pendants', 'wedding-bands'].includes(type) && (
          <StoneShapeSection blurbs={landing.shapeBlurbs} />
        )}

        {/* ===== CROSS-REFERENCE to a closely related bespoke page ===== */}
        {landing.crossLink && (
          <section className="px-4 pb-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-stone text-center leading-relaxed">
                {landing.crossLink.map((part, i) =>
                  typeof part === 'string' ? (
                    <span key={i}>{part}</span>
                  ) : (
                    <NextLink key={i} href={part.path} className="text-glacier-grey underline underline-offset-4 hover:text-white transition-colors">
                      {part.anchor}
                    </NextLink>
                  )
                )}
              </p>
            </div>
          </section>
        )}

        {/* ===== NATURAL VS LAB-GROWN (diamond-centric types) ===== */}
        {['engagement-rings', 'earrings', 'bracelets', 'wedding-bands'].includes(type) && (
          <NaturalVsLabSection />
        )}

        {/* ===== GRILLZ: teeth config + clarity ladder ===== */}
        {type === 'grillz' && <GrillzConfigSection />}

        {/* ===== PENDANTS: Arabic calligraphy + religious + logo showcase ===== */}
        {type === 'pendants' && <PendantsHeritageSection city={city} />}

        {/* ===== BUDGET GUIDE ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Investment Guide
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {budgetOptions.map(({ label, tier }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center justify-center p-5 rounded-xl bg-charcoal/50 border border-glacier-grey/20">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: tier }).map((_, j) => (
                      <DollarSign key={j} className="w-4 h-4 text-glacier-grey/60" />
                    ))}
                  </div>
                  <span className="text-white font-medium text-xs text-center">{label}</span>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-stone text-center leading-relaxed">
              {landing.budgetGuide}
            </motion.p>
          </div>
        </section>

        {/* ===== TIMELINE & PROCESS ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Timeline &amp; Process
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {timelineOptions.map(({ label, icon: TIcon, desc }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center justify-center p-5 rounded-xl bg-charcoal/50 border border-glacier-grey/20">
                  <TIcon className="w-7 h-7 mb-2 text-glacier-grey/60" />
                  <span className="text-white font-medium text-xs text-center mb-1">{label}</span>
                  <span className="text-stone text-[10px] text-center">{desc}</span>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-stone text-center leading-relaxed">
              {landing.processNote}
            </motion.p>
            {landing.differentiator && (
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-stone text-center leading-relaxed mt-6 max-w-3xl mx-auto">
                {landing.differentiator}
              </motion.p>
            )}
          </div>
        </section>

        {/* ===== SIZING INFO ===== */}
        <section className="py-16 px-4 border-t border-glacier-grey/10">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{sizeInfo.label}</h3>
              <p className="text-stone text-sm leading-relaxed">
                Not sure of your {sizeInfo.label.toLowerCase().replace(' *', '').replace(' (optional)', '')}? We&apos;ll help determine the perfect fit during your free consultation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== TESTIMONIALS (live Google reviews) ===== */}
        <ClientLiveReviewsStrip city={city} heading={`What Our ${cityName} Clients Say`} />

        {/* ===== LOCATION with embedded Google Map ===== */}
        <LocationSection city={city} type={type} />

        {/* ===== FAQ (Schema eligible) ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
              {config.seoNoun ? `${config.seoNoun} FAQs` : 'Frequently Asked Questions'}
            </motion.h2>
            <div className="space-y-3">
              {landing.faq.map((item, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-charcoal/50 border border-glacier-grey/20 rounded-xl overflow-hidden hover:border-glacier-grey/40 transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <h3 className="text-white font-bold text-sm md:text-base">{item.q}</h3>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-glacier-grey flex items-center justify-center text-white group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-stone text-sm leading-relaxed">{item.a}</div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA + RELATED PAGES ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Create Your {config.title.replace('Custom ', '')}?
              </h2>
              <p className="text-stone mb-8 max-w-xl mx-auto">
                Start your custom journey and our master craftspeople will bring your vision to life within 24-48 hours of your inquiry.
              </p>
              <NextLink href={`/custom-form?type=${type}`} className="inline-flex items-center gap-2 bg-glacier-grey text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl mb-12">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </NextLink>
              <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-glacier-grey/10">
                <span className="text-stone text-sm">Also explore:</span>
                {landing.relatedPages.map((page) => (
                  <NextLink key={page.path} href={page.path} className="text-glacier-grey text-sm font-medium hover:text-glacier-grey-light hover:underline transition-all">
                    {page.name} →
                  </NextLink>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== LOCAL TRUST ===== */}
        <section className="py-12 px-4 border-t border-glacier-grey/10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-glacier-grey" />
              <span className="text-stone text-sm">Proudly crafted in Toronto, serving the Greater Toronto Area</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-stone text-sm ml-2">5.0 on Google Reviews</span>
            </div>
          </div>
        </section>
      </div>

      {/* Schema JSON-LD: Service + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            [branchStoreSchema, serviceSchema, breadcrumbSchema, faqSchema].filter(Boolean),
          ),
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Router — landing page for specific types, portal form for /custom/general
// ---------------------------------------------------------------------------

export default function CustomJewelryClient({
  type: urlType,
  city,
  landing,
}: {
  type: string
  city: City
  /** Resolved server-side: built-in copy with any CMS overrides applied. */
  landing: LandingEntry | null
}) {
  // Specific type → landing page (no form)
  if (urlType !== 'general' && urlType in typeConfig && landing) {
    return <LandingPage type={urlType} city={city} landing={landing} />
  }

  // /custom-form → form-only conversion utility. Hub SEO content was
  // moved to the homepage to consolidate ranking authority on a single
  // "custom jewelry toronto" page; this URL is excluded from the sitemap.
  return (
    <Suspense fallback={null}>
      <PortalForm />
    </Suspense>
  )
}

// ---------------------------------------------------------------------------
// Portal form (only for /custom/general — Start Your Journey)
// ---------------------------------------------------------------------------

function PortalForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams?.get('type') || ''
  const isDirectType = typeParam in typeConfig
  const urlType = isDirectType ? typeParam : 'general'

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
    stoneShape: '',
    diamondType: '',
    size: '',
    timeline: '',
    notes: '',
    inspirationImages: [] as string[],
    inspirationImageUrls: [] as { url: string; filename: string }[],
  })
  const [currentStep, setCurrentStep] = useState<StepId>('contact')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)
  // Scheduling step shown after submit: the API's order number (falling back
  // to the inquiry id) travels to Calendly as utm_content so a booking can be
  // matched back to this inquiry; consultationBooked flips when the embed
  // reports calendly.event_scheduled.
  const [inquiryRef, setInquiryRef] = useState('')
  const [consultationBooked, setConsultationBooked] = useState(false)

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
      if (formData.stonePreferences.length > 0 && !formData.stonePreferences.every(sp => sp === 'None')) s.push('stoneShape')
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
      stonePreferences: [], stoneShape: '', diamondType: '', size: '',
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

    try {
      const fd = new FormData()
      files.forEach(f => fd.append('files', f))

      const res = await fetch('/api/inquiries/upload', { method: 'POST', body: fd })
      const data = await res.json()

      if (data.success && data.images) {
        setFormData(prev => ({
          ...prev,
          inspirationImages: [...prev.inspirationImages, ...data.images.map((img: { filename: string }) => img.filename)],
          inspirationImageUrls: [...prev.inspirationImageUrls, ...data.images],
        }))
      } else {
        setFormData(prev => ({ ...prev, inspirationImages: [...prev.inspirationImages, ...files.map(f => f.name)] }))
      }
    } catch {
      setFormData(prev => ({ ...prev, inspirationImages: [...prev.inspirationImages, ...files.map(f => f.name)] }))
    }

    setUploading(false)
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
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
          inspirationImageUrls: formData.inspirationImageUrls,
        }),
      })
      if (response.ok) {
        const data = await response.json().catch(() => null)
        setInquiryRef(data?.orderNo || data?.id || '')
        setSubmitted(true)
      } else {
        setIsSubmitting(false)
        alert('Error submitting inquiry. Please try again.')
      }
    } catch (error) {
      setIsSubmitting(false)
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
    // Without a configured Calendly URL the confirmation stays a single
    // full-viewport screen; with one, it becomes a scrollable page whose
    // final step is booking the initial consultation.
    if (!isCalendlyConfigured()) {
      return (
        <div className="h-[calc(100dvh-56px)] md:h-[calc(100dvh-72px)] lg:h-[calc(100dvh-80px)] bg-soft-black relative overflow-hidden flex items-center justify-center" data-testid="form-confirmation">
          <DotPattern />
          <DiamondPattern className="text-white" />
          <FloatingDiamonds />
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
              <button onClick={() => router.push('/portfolio')} className="bg-glacier-grey text-white px-8 py-3 rounded-lg font-semibold hover:bg-glacier-grey-light transition-all">View Portfolio</button>
            </div>
          </motion.div>
        </div>
      )
    }

    return (
      <div className="min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-72px)] lg:min-h-[calc(100dvh-80px)] bg-soft-black relative overflow-hidden" data-testid="form-confirmation">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <FloatingDiamonds />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto text-center px-4 py-12 md:py-16 relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="inline-block mb-6">
            <div className="w-20 h-20 rounded-full bg-glacier-grey/20 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-glacier-grey" />
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Thank You!</h1>
          <p className="text-lg text-stone mb-2">Your custom {pieceTypeLabel.toLowerCase() || 'jewelry'} inquiry has been received.</p>
          {inquiryRef && (
            <p className="text-sm text-glacier-grey mb-2">Reference: <span className="font-semibold">{inquiryRef}</span></p>
          )}

          {consultationBooked ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8" data-testid="consultation-booked">
              <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-glacier-grey/15 border border-glacier-grey/40 px-4 py-1.5">
                <CalendarCheck className="w-4 h-4 text-glacier-grey" />
                <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">Consultation Booked</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>You&apos;re all set</h2>
              <p className="text-stone mb-10 max-w-xl mx-auto text-sm">A calendar invite is on its way to your email. We look forward to talking through your {pieceTypeLabel.toLowerCase() || 'jewelry'} project.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => router.push('/')} className="bg-white/10 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-soft-black transition-all">Return Home</button>
                <button onClick={() => router.push('/portfolio')} className="bg-glacier-grey text-white px-8 py-3 rounded-lg font-semibold hover:bg-glacier-grey-light transition-all">View Portfolio</button>
              </div>
            </motion.div>
          ) : (
            <div className="mt-8 text-left" data-testid="consultation-scheduler">
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-glacier-grey" />
                  <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">One Last Step</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Book Your Free Consultation</h2>
                <p className="text-stone text-sm max-w-xl mx-auto">Pick a time that works for you and we&apos;ll talk through your vision, budget, and timeline — virtually or in person.</p>
              </div>
              <CalendlyScheduler
                name={`${formData.firstName} ${formData.lastName}`.trim()}
                email={formData.email}
                utmContent={inquiryRef || undefined}
                onScheduled={() => setConsultationBooked(true)}
              />
              <p className="text-center text-xs text-stone mt-6 mb-4">Prefer not to book now? We&apos;ll still reach out within 24-48 hours.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => router.push('/')} className="bg-white/5 border border-glacier-grey/30 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-white/10 transition-all">Return Home</button>
                <button onClick={() => router.push('/portfolio')} className="bg-white/5 border border-glacier-grey/30 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-white/10 transition-all">View Portfolio</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    )
  }

  // =========================================================================
  // PORTAL FORM
  // =========================================================================

  return (
    <div className="h-[calc(100dvh-56px)] md:h-[calc(100dvh-72px)] lg:h-[calc(100dvh-80px)] bg-soft-black relative overflow-hidden flex flex-col" data-testid="custom-form-hero">
      <DotPattern />
      <DiamondPattern className="text-white" />
      <FloatingDiamonds />

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
          <h1 className="text-xs uppercase tracking-widest text-glacier-grey font-medium m-0">
            {config ? `Start Your ${config.title} Project` : 'Start Your Custom Jewelry Project'}
          </h1>
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

            {/* STONE SHAPE */}
            {currentStep === 'stoneShape' && (
              <motion.div key="stoneShape" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Stone Shape</h2>
                  <p className="text-stone text-sm">Choose your preferred stone shape</p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {stoneShapeOptions.map(({ name, icon: ShapeIcon }) => {
                    const selected = formData.stoneShape === name
                    return (
                      <button key={name} type="button" onClick={() => { setFormData(prev => ({ ...prev, stoneShape: name })); setTimeout(goNext, 300) }} className={`${cardBase} p-4 min-h-[90px] ${selected ? cardSelected : cardUnselected}`}>
                        <ShapeIcon className={`w-7 h-7 mb-2 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                        <span className="text-white font-medium text-xs">{name}</span>
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
                  <p className="text-stone text-sm">Not sure of your size? Don&apos;t worry, we can help during your consultation.</p>
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
                  {formData.stoneShape && <ReviewRow label="Stone Shape" value={formData.stoneShape} />}
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
            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="px-8 py-2.5 rounded-lg bg-glacier-grey text-white hover:bg-glacier-grey-light transition-all font-semibold shadow-lg hover:shadow-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
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

// ---------------------------------------------------------------------------
// GeneralHub — SEO-rich hub content rendered below the PortalForm on /custom/general
// Targets "custom jeweler Toronto", "bespoke jewelry Toronto", "custom jewelry Toronto"
// ---------------------------------------------------------------------------

const hubBespokeCards: { name: string; path: string; icon: LucideIcon; blurb: string }[] = [
  { name: 'Custom Engagement Rings', path: '/custom-engagement-rings-toronto', icon: Diamond, blurb: 'Solitaire, halo, vintage, three-stone, designed around your love story.' },
  { name: 'Custom Wedding Bands', path: '/custom-wedding-bands-toronto', icon: Heart, blurb: 'Matching bridal sets, eternity bands, men\'s bands, and engraved pieces.' },
  { name: 'Custom Rings', path: '/custom-rings-toronto', icon: Circle, blurb: 'Signet, statement, stackable, everyday, in gold, platinum, or silver.' },
  { name: 'Custom Pendants', path: '/custom-pendants-toronto', icon: Layers, blurb: 'Name pendants, photo pendants, religious symbols, Arabic calligraphy.' },
  { name: 'Custom Chains', path: '/custom-chains-toronto', icon: Link, blurb: 'Miami Cuban, rope, franco, figaro: solid gold, never hollow.' },
  { name: 'Custom Earrings', path: '/custom-earrings-toronto', icon: CircleDot, blurb: 'Studs, hoops, drops, chandeliers, in diamond and gold.' },
  { name: 'Custom Bracelets', path: '/custom-bracelets-toronto', icon: Gem, blurb: 'Tennis bracelets, bangles, cuffs, engraved men\'s ID bracelets.' },
  { name: 'Custom Grillz', path: '/custom-grillz-toronto', icon: Flame, blurb: 'Gold and VVS diamond grillz, single tooth to full sets.' },
]

const hubProcessSteps = [
  { icon: MessageSquare, title: 'Consultation', body: 'Free virtual consultation via Zoom, phone, or message, or in-person in Toronto by appointment. We discuss your vision, budget, and timeline.' },
  { icon: Pen, title: 'Design & CAD', body: 'Our designers produce detailed sketches and 3D CAD renderings for your approval before crafting begins.' },
  { icon: Diamond, title: 'Stone & Metal Selection', body: 'Hand-pick GIA-graded natural or lab-grown diamonds, coloured gems, and your choice of gold, platinum, or silver.' },
  { icon: Wrench, title: 'In-House Crafting', body: 'Every piece is cast, set, and finished entirely in our Toronto workshop by master jeweler Mohammad Al-Asali, with no outsourcing.' },
  { icon: Gem, title: 'Presentation', body: 'Your finished piece is inspected, photographed, and presented in luxury packaging with a lifetime craftsmanship guarantee.' },
]

const hubFaq = [
  { q: 'Where is Al-Asali Jewelry based?', a: 'Al-Asali Jewelry Studio is a Toronto-based bespoke jeweler. We operate by appointment only, offering virtual consultations, secure insured delivery across the GTA, and optional in-person meetings in Toronto when preferred.' },
  { q: 'Do I need an appointment to visit the Toronto studio?', a: 'Yes, we work by appointment only. Book a free consultation by phone, email, or through our custom inquiry form and we\'ll confirm a time that works for you.' },
  { q: 'What areas around Toronto do you serve?', a: 'Our studio is in Toronto, and we regularly work with clients from across the Greater Toronto Area including Mississauga, Etobicoke, North York, Scarborough, Vaughan, Markham, Oakville, Burlington, Brampton, and Milton.' },
  { q: 'How do I start a custom jewelry project?', a: 'Book a free consultation, virtual via Zoom, phone, or message, or in-person in Toronto by appointment. We\'ll discuss your vision, budget, and timeline, then produce CAD renderings for your approval before any crafting begins. Most projects take 2-6 weeks from design approval.' },
  { q: 'How much does custom jewelry cost in Toronto?', a: 'Most of our custom pieces start between $500 (single-tooth grillz) and $1,000 (custom rings, pendants, earrings, bracelets, chains), scaling with metal, stones, and design complexity. We quote every project up front with no hidden fees.' },
  { q: 'Do you offer lab-grown diamonds?', a: 'Yes, we offer both natural and lab-grown diamonds. Lab-grown stones are chemically and visually identical to natural diamonds and offer significant savings on carat-for-carat value.' },
  { q: 'Can you reset family diamonds into a new design?', a: 'Absolutely. Heirloom resets are some of our most meaningful projects. We\'ll carefully remove the stones from your existing piece and set them into your new custom design.' },
  { q: 'Do you offer Arabic calligraphy jewelry?', a: 'Yes, we specialize in Arabic calligraphy pendants, Allah pendants, Ayat al-Kursi pendants, Bismillah pendants, and engraved Arabic wedding bands. Our master jeweler is fluent in the art of Arabic calligraphy casting.' },
  { q: 'What is the typical timeline for custom jewelry?', a: 'Most pieces take 2-6 weeks: grillz 1-2 weeks, pendants 2-4 weeks, chains and earrings 2-4 weeks, rings and bracelets 3-5 weeks, engagement rings 4-6 weeks. Rush orders are available.' },
  { q: 'Do you ship outside of Toronto?', a: 'Yes, we ship securely across the GTA and anywhere in Canada. Finished pieces are always fully insured in transit.' },
]

function GeneralHub() {
  const hubBreadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Bespoke', url: `${SITE_CONFIG.url}/custom/general` },
  ])
  const hubFaqSchema = buildFaqSchema(hubFaq)

  return (
    <section className="bg-soft-black text-white relative overflow-hidden">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28 space-y-20">

        {/* INTRO */}
        <header className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-glacier-grey" />
            <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">Toronto&apos;s Custom Jewelry Studio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Toronto&apos;s Premier Custom Jeweler
          </h2>
          <p className="text-stone leading-relaxed text-base md:text-lg">
            Al-Asali Jewelry is a Toronto-based bespoke jewelry studio, working by appointment. Master jeweler Mohammad Al-Asali and our team design and handcraft every custom engagement ring, wedding band, diamond pendant, gold chain, and grillz set entirely in-house, with no outsourcing and no middlemen. From the first consultation to the final polish, every piece is crafted under one roof with a lifetime craftsmanship guarantee.
          </p>
        </header>

        {/* BESPOKE GRID */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            What We Create
          </h3>
          <p className="text-stone text-center mb-10 max-w-xl mx-auto text-sm">
            Every category we offer is fully customizable. Choose a piece type to see styles, materials, pricing, and timelines.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hubBespokeCards.map(({ name, path, icon: Icon, blurb }) => (
              <NextLink
                key={path}
                href={path}
                className="group bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5 hover:border-glacier-grey/60 hover:bg-charcoal transition-all"
              >
                <Icon className="w-8 h-8 text-glacier-grey/70 group-hover:text-glacier-grey mb-3 transition-colors" />
                <h4 className="text-white font-bold text-sm mb-1.5">{name}</h4>
                <p className="text-stone text-xs leading-relaxed">{blurb}</p>
                <span className="inline-flex items-center gap-1 text-glacier-grey text-xs font-medium mt-3 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </NextLink>
            ))}
          </div>
        </div>

        {/* PROCESS */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            How Our Custom Process Works
          </h3>
          <p className="text-stone text-center mb-10 max-w-xl mx-auto text-sm">
            Every project follows the same five-step process, tuned to your timeline and budget.
          </p>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {hubProcessSteps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5 relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-glacier-grey/20 border border-glacier-grey/40 flex items-center justify-center text-glacier-grey text-sm font-bold">{i + 1}</div>
                  <Icon className="w-5 h-5 text-glacier-grey" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1.5">{title}</h4>
                <p className="text-stone text-xs leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* WHY AL-ASSALI */}
        <div className="bg-charcoal/40 border border-glacier-grey/20 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Why Al-Asali Jewelry
          </h3>
          <p className="text-stone text-center mb-10 max-w-2xl mx-auto text-sm">
            We are a small, focused Toronto workshop. Every piece is crafted by a master jeweler, not a factory, and backed by a lifetime craftsmanship guarantee.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: 'Made in Toronto', body: 'Designed, cast, set, and finished entirely in-house in our Toronto studio.' },
              { icon: ShieldCheck, title: 'Lifetime Guarantee', body: 'Free polishing, rhodium re-plating, and resizing for life on every piece.' },
              { icon: Diamond, title: 'GIA-Graded Diamonds', body: 'Conflict-free natural and lab-grown diamonds, graded to GIA standards.' },
              { icon: Star, title: '5.0 on Google', body: '5-star rated by clients across the Greater Toronto Area.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-glacier-grey/20 border border-glacier-grey/40 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-glacier-grey" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1.5">{title}</h4>
                <p className="text-stone text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MASTER JEWELER */}
        <div className="bg-charcoal/30 border border-glacier-grey/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-glacier-grey/20 border border-glacier-grey/40 mb-5">
            <Hammer className="w-6 h-6 text-glacier-grey" />
          </div>
          <div className="text-xs uppercase tracking-widest text-glacier-grey font-medium mb-2">Master Jeweler &amp; Founder</div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Mohammad Al-Asali
          </h3>
          <p className="text-stone leading-relaxed text-sm md:text-base">
            Mohammad is the founder and master jeweler behind Al-Asali Jewelry Studio. A George Brown College Jewelry Arts Program graduate practicing since 2017, he has designed and handcrafted hundreds of bespoke engagement rings, gold chains, diamond pendants, and custom grillz for clients across the Greater Toronto Area. Every piece that leaves our Toronto studio has been personally inspected and finished by Mohammad.
          </p>
        </div>

        {/* LOCATION */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            How We Work Together
          </h3>
          <p className="text-stone leading-relaxed text-sm mb-6">
            Al-Asali Jewelry Studio is a Toronto-based bespoke jeweler, serving clients across the GTA by appointment. Free virtual consultations via Zoom, phone, or message, complimentary secure insured delivery of finished pieces, and in-person meetings in Toronto whenever you prefer.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="tel:+16475624340" className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light">
              <MessageSquare className="w-4 h-4" /> (647) 562-4340
            </a>
            <a href="mailto:contact@alasalicustomjewelry.ca" className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light">
              <Type className="w-4 h-4" /> contact@alasalicustomjewelry.ca
            </a>
          </div>
          <p className="text-stone text-xs mt-5">
            Serving Toronto, Mississauga, Etobicoke, North York, Scarborough, Vaughan, Markham, Oakville, Burlington, Brampton, Milton, and the wider GTA.
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {hubFaq.map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group bg-charcoal/50 border border-glacier-grey/20 rounded-xl overflow-hidden hover:border-glacier-grey/40 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <h4 className="text-white font-bold text-sm md:text-base">{item.q}</h4>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-glacier-grey flex items-center justify-center text-white group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-stone text-sm leading-relaxed">{item.a}</div>
              </motion.details>
            ))}
          </div>
        </div>

      </div>

      {/* Schema JSON-LD: Breadcrumb + Hub FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([hubBreadcrumb, hubFaqSchema]),
        }}
      />
    </section>
  )
}
