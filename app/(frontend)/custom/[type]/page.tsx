'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
import PricingTableSection from '@/components/bespoke/PricingTableSection'
import NaturalVsLabSection from '@/components/bespoke/NaturalVsLabSection'
import GrillzConfigSection from '@/components/bespoke/GrillzConfigSection'
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo/schema'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

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
  { value: 'other', label: 'Other', icon: HelpCircle, subtitle: 'Something unique — tell us more' },
]

// ---------------------------------------------------------------------------
// Config per piece type
// ---------------------------------------------------------------------------

const typeConfig: Record<string, { title: string; subtitle: string; styles: string[]; metals: string[] }> = {
  'engagement-rings': {
    title: 'Custom Engagement Rings',
    subtitle: 'Begin your forever with a ring as unique as your love story',
    styles: ['Classic', 'Modern', 'Vintage', 'Art Deco', 'Halo', 'Solitaire', 'Bridal', 'Other'],
    metals: ['Platinum', '18K Gold', '14K Gold', '10K Gold', 'Silver', 'Other'],
  },
  'grillz': {
    title: 'Custom Grillz',
    subtitle: 'Bold statements crafted in precious metal',
    styles: ['Full Set', 'Top 6', 'Bottom 6', 'Single Tooth', 'Fangs', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'chains': {
    title: 'Custom Chains',
    subtitle: 'Wearable art, crafted to your specifications',
    styles: ['Miami Cuban', 'Rope', 'Franco', 'Figaro', 'Box Chain', 'Custom Design and/or Logo Design', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'pendants': {
    title: 'Custom Pendants',
    subtitle: 'Your story, beautifully told',
    styles: ['Initial', 'Name', 'Symbol', 'Religious', 'Custom Design and/or Logo Design', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'rings': {
    title: 'Custom Rings',
    subtitle: 'Unique rings designed just for you',
    styles: ['Statement', 'Band', 'Signet', 'Stackable', 'Custom Design and/or Logo Design', 'Everyday/Essentials', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'earrings': {
    title: 'Custom Earrings',
    subtitle: 'Elegant earrings crafted to perfection',
    styles: ['Studs', 'Hoops', 'Drops', 'Chandeliers', 'Custom Design and/or Logo Design', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'bracelets': {
    title: 'Custom Bracelets',
    subtitle: 'Exquisite bracelets tailored to your style',
    styles: ['Tennis', 'Chain', 'Bangle', 'Cuff', 'Custom Design and/or Logo Design', 'Other'],
    metals: ['10K Gold', '14K Gold', '18K Gold', 'Platinum', 'Silver', 'Other'],
  },
  'wedding-bands': {
    title: 'Custom Wedding Bands',
    subtitle: 'Bands as timeless as your vow — handcrafted to match your ring',
    styles: ['Classic Band', 'Comfort Fit', 'Eternity', 'Half-Eternity', 'Men\'s Band', 'Engraved', 'Contour / Shaped', 'Stackable', 'Other'],
    metals: ['Platinum', '18K Gold', '14K Gold', '10K Gold', 'Silver', 'Other'],
  },
  'other': {
    title: 'Custom Piece',
    subtitle: 'Tell us about your dream piece — we\'ll bring it to life',
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
    Figaro: Circle, 'Box Chain': Square, 'Custom Design and/or Logo Design': Paintbrush, Other: HelpCircle,
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
// SEO landing page content per type
// ---------------------------------------------------------------------------

const landingContent: Record<string, {
  heroH1: string
  heroSub: string
  intro: string
  whyCards: { icon: LucideIcon; title: string; text: string }[]
  processNote: string
  budgetGuide: string
  stoneNote: string
  faq: { q: string; a: string }[]
  relatedPages: { name: string; path: string }[]
}> = {
  'engagement-rings': {
    heroH1: 'Custom Engagement Rings in Toronto',
    heroSub: 'Design a one-of-a-kind ring as unique as your love story — handcrafted in-house by Toronto\'s finest.',
    intro: 'At Al-Assali Jewelry, every custom engagement ring begins with your vision. Whether you dream of a classic solitaire, a vintage halo setting, or a bold modern design, our master craftspeople bring it to life entirely in-house in Toronto. Choose from ethically sourced natural and lab-grown diamonds, sapphires, rubies, and emeralds — set in platinum, 18K, or 14K gold. From the first sketch to the final presentation, your engagement ring is crafted with the care and precision your moment deserves. Couples across the GTA trust us because we don\'t outsource — every cut, setting, and polish happens under our roof.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every ring crafted entirely in-house at our Toronto studio — no outsourcing, no middlemen.' },
      { icon: Diamond, title: 'Ethically Sourced', text: 'Natural and lab-grown diamonds, conflict-free sapphires, rubies, and emeralds.' },
      { icon: MessageSquare, title: 'One-on-One Design', text: 'Personal consultation from concept to CAD rendering to finished piece.' },
      { icon: ShieldCheck, title: 'Craftsmanship Guarantee', text: 'Lifetime guarantee on every engagement ring we create.' },
    ],
    processNote: 'Most custom engagement rings take 4-6 weeks from design approval to completion. We start with a personal consultation to understand your vision, create detailed CAD renderings for your approval, then hand-select your stones before our master jewelers begin crafting. Rush orders are available when your timeline demands it.',
    budgetGuide: 'Custom engagement rings start at $1,000 and scale based on your choice of metal, stone type, carat weight, and design complexity. During consultation, we\'ll work within your budget to maximize brilliance — whether that means a stunning lab-grown diamond or a natural stone with exceptional cut quality.',
    stoneNote: 'Choose from natural diamonds, lab-grown diamonds, sapphires, rubies, and emeralds. We source every stone for maximum fire and brilliance, and we\'re happy to walk you through the 4Cs (cut, clarity, colour, carat) during your consultation. Lab-grown diamonds offer the same physical properties at a lower price point.',
    faq: [
      { q: 'How long does it take to make a custom engagement ring in Toronto?', a: 'Most custom engagement rings take 4-6 weeks from design approval to completion. Rush orders can be completed in 2-3 weeks for an additional fee, and we\'ll keep you updated at every stage.' },
      { q: 'How much does a custom engagement ring cost in Toronto?', a: 'Custom engagement rings start at $1,000 and scale with metal choice, diamond origin (lab-grown or natural), carat weight, and design complexity. Solitaires start around $1,800, halo rings around $3,500, and three-stone designs from $4,500. We quote every project up front with no hidden fees.' },
      { q: 'Can I design my own engagement ring?', a: 'Absolutely. Bring us sketches, Pinterest boards, or just a rough idea — our designers will create detailed 3D CAD renderings for your approval before any crafting begins. You can iterate as many times as you need.' },
      { q: 'Lab-grown vs natural diamonds — which is better for an engagement ring?', a: 'Both are real diamonds with identical physical, chemical, and optical properties. Natural diamonds hold long-term resale value better, while lab-grown diamonds offer 40-60% more carat for the same budget. We help you weigh both during consultation.' },
      { q: 'Do you provide GIA certification for diamonds?', a: 'Yes — every natural diamond over 0.50ct ships with a GIA grading report. Lab-grown diamonds ship with IGI or GCAL reports. You can also request certification for smaller stones on request.' },
      { q: 'Can I see my engagement ring before it\'s finished?', a: 'Yes — we share 3D CAD renderings within 5-7 business days of your consultation, plus a wax or resin model before we cast in precious metal. You\'ll know exactly what your ring will look like before we begin final crafting.' },
      { q: 'What engagement ring styles do you offer?', a: 'We create Classic, Modern, Vintage, Art Deco, Halo, Solitaire, Three-Stone, and Bridal engagement rings — or any fully custom design you can envision. Unusual settings like toi et moi, cluster, and bezel-set are all within scope.' },
      { q: 'Which diamond shape is best for me?', a: 'Round brilliant is the most popular for its fire, oval and pear look larger per carat, princess and emerald cuts suit modern tastes, and cushion and radiant offer vintage warmth. We walk through every shape in person with loose stones so you can compare on your finger.' },
      { q: 'Can I reset a family diamond into my new engagement ring?', a: 'Yes — heirloom resets are some of our most meaningful projects. We carefully remove your existing stone and design a new setting around it, preserving the sentiment while modernizing the look.' },
      { q: 'Do you offer financing for custom engagement rings?', a: 'Yes — we offer flexible payment plans and 0% financing options for qualified buyers. Ask during consultation and we\'ll walk you through what fits your timeline and budget.' },
      { q: 'Do you resize engagement rings for free?', a: 'Yes — every custom engagement ring we create includes free resizing within the first year, and free resizing for life if you have any significant finger-size change. Free cleanings and inspections for life as well.' },
      { q: 'Where in Toronto is your engagement ring studio?', a: 'Our studio is at 624 Vaughan Rd in Toronto (M6E 2Y3), in the Oakwood–Vaughan neighbourhood. We see clients by appointment from across the GTA — Mississauga, Etobicoke, North York, Vaughan, Markham, Oakville, and beyond.' },
    ],
    relatedPages: [
      { name: 'Custom Rings', path: '/custom/rings' },
      { name: 'Custom Pendants', path: '/custom/pendants' },
      { name: 'Custom Bracelets', path: '/custom/bracelets' },
    ],
  },
  'rings': {
    heroH1: 'Custom Rings in Toronto',
    heroSub: 'Signet rings, statement rings, wedding bands, and more — designed around your vision, handcrafted in Toronto.',
    intro: 'From bold signet rings to elegant wedding bands and one-of-a-kind statement pieces, Al-Assali Jewelry creates custom rings that are uniquely yours. Every ring is handcrafted in-house in Toronto using the finest gold, platinum, and silver, with optional diamond and gemstone settings. Whether you have a detailed sketch or just an idea, our craftspeople will bring your ring to life with precision and care.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Handcrafted in our Toronto studio — no outsourcing, no middlemen.' },
      { icon: Wrench, title: 'Any Style, Any Design', text: 'Signet, statement, band, stackable, or something entirely new.' },
      { icon: MessageSquare, title: 'Personal Consultation', text: 'Work directly with our designers from concept to finished piece.' },
      { icon: ShieldCheck, title: 'Premium Materials', text: '10K-18K gold, platinum, and sterling silver with optional gemstones.' },
    ],
    processNote: 'Custom rings typically take 3-5 weeks. We begin with a design consultation, create CAD renderings, and hand-select any stones before crafting begins. Whether it\'s a wedding band, a family signet ring, or a bold everyday statement piece, we treat every ring with the same level of detail.',
    budgetGuide: 'Custom rings start at $1,000 for simpler designs in 10K gold or silver, and scale with gold karat, platinum, stone settings, and design intricacy. Signet rings and wedding bands are among our most popular commissions.',
    stoneNote: 'Add diamonds (natural or lab-grown), sapphires, rubies, or emeralds to any custom ring. Stones can be flush-set, prong-set, or channel-set depending on your design and daily wear needs.',
    faq: [
      { q: 'What types of custom rings can you make in Toronto?', a: 'Signet rings, statement rings, wedding bands, stackable rings, cocktail rings, pinky rings, mens rings, promise rings, birthstone rings, everyday essentials, and fully custom designs in any style you can imagine.' },
      { q: 'How much does a custom ring cost in Toronto?', a: 'Custom rings start at $1,000 in 10K gold or silver for simpler designs. Signet rings start around $1,400, statement rings $1,800, and stackable sets from $2,500 for three bands. Final price depends on metal, gold weight, stone count, and engraving.' },
      { q: 'Can I bring my own design for a ring?', a: 'Yes — bring sketches, reference photos, or describe your idea verbally. Our designers create detailed 3D CAD renderings for your approval before any crafting begins. Revisions are included.' },
      { q: 'How do I determine my ring size?', a: 'We measure your ring size in-studio for free during consultation. If you can\'t come in, we can mail you a free ring sizer or walk you through measuring with string. Every custom ring also includes free resizing.' },
      { q: 'Can you make a custom signet ring with a family crest?', a: 'Yes — family-crest signet rings are one of our favourite commissions. Send us your crest, coat of arms, monogram, or initial design and we\'ll hand-engrave it into your ring.' },
      { q: 'Can I get a matching men\'s and women\'s ring set?', a: 'Absolutely — matching couples rings and promise rings are a regular request. We design them in proportional sizes and complementary finishes (often different widths in matching metal).' },
      { q: 'What metals are available for custom rings?', a: '10K gold, 14K gold, 18K gold in yellow, white, and rose, plus platinum and sterling silver. We\'ll recommend the right choice based on your daily wear, finger size, and budget.' },
      { q: 'Do you engrave custom rings?', a: 'Yes — we engrave inside or outside the band in any font, including Arabic calligraphy, dates, names, coordinates, fingerprints, and soundwaves. Engraving is free with most custom rings.' },
      { q: 'Can you set diamonds or gemstones in a custom ring?', a: 'Yes — natural or lab-grown diamonds, sapphires, rubies, emeralds, birthstones, and any gemstone you source. Prong, bezel, channel, pavé, flush, and tension settings all available.' },
      { q: 'How long does a custom ring take in Toronto?', a: 'Simpler rings take 3-4 weeks. Signet rings with engraving take 4-5 weeks. Diamond-set rings and complex designs take 5-6 weeks. Rush orders can be completed in 2-3 weeks for an additional fee.' },
    ],
    relatedPages: [
      { name: 'Custom Engagement Rings', path: '/custom/engagement-rings' },
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Bracelets', path: '/custom/bracelets' },
    ],
  },
  'pendants': {
    heroH1: 'Custom Pendants in Toronto',
    heroSub: 'Name pendants, photo pendants, diamond initials, and more — your story, beautifully told in gold and silver.',
    intro: 'Al-Assali Jewelry creates custom pendants that carry meaning. From diamond-encrusted name pendants and photo pendants to religious symbols and fully custom designs, every piece is handcrafted in-house in Toronto. Choose your metal, your stones, and your design — we\'ll create a pendant as unique as the story it tells. Our custom name chains and bubble letter pendants are among the most requested pieces in the GTA.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every pendant crafted in our Toronto studio with precision and care.' },
      { icon: Layers, title: 'Endless Designs', text: 'Name, initial, photo, religious, symbol — or bring your own concept.' },
      { icon: Diamond, title: 'Diamond Setting', text: 'Add natural or lab-grown diamonds, sapphires, and other precious stones.' },
      { icon: ShieldCheck, title: 'Premium Craftsmanship', text: '10K-18K gold, platinum, or sterling silver with lifetime quality guarantee.' },
    ],
    processNote: 'Custom pendants take 2-4 weeks depending on complexity. Name and initial pendants are on the faster end, while photo pendants and diamond-set pieces require additional crafting time. We create a detailed mockup for your approval before beginning work.',
    budgetGuide: 'Custom pendants start at $1,000. Simple name pendants in 10K gold are the most accessible, while diamond-set photo pendants and large statement pieces sit at the higher end. We\'ll help you find the right balance of size, metal, and stone work for your budget.',
    stoneNote: 'Pendants can be set with diamonds (natural or lab-grown), sapphires, rubies, or emeralds. Popular options include diamond-encrusted initials, pave-set name pendants, and bezel-set center stones.',
    faq: [
      { q: 'What types of custom pendants do you make in Toronto?', a: 'Name pendants, initial pendants, photo pendants, bubble letter pendants, script pendants, Old English pendants, religious symbols (Allah, Ayat al-Kursi, Bismillah, Cross, Hamsa, Om, Star of David), zodiac pendants, memorial pendants, company logos, and fully custom designs.' },
      { q: 'Can you make a photo pendant?', a: 'Yes — we create custom photo pendants where your image is laser-engraved onto gold or set behind a crystal dome. You can also add a diamond halo or pavé border for extra detail.' },
      { q: 'How much does a custom gold pendant cost in Toronto?', a: 'Custom gold pendants start around $1,000 in 10K gold, $1,500 in 14K gold, and $2,000 in 18K gold. Diamond-set pendants start from $2,500, with photo pendants from $1,800. Size, stone count, and gold weight drive final price.' },
      { q: 'Do you make Arabic calligraphy pendants in Toronto?', a: 'Yes — Arabic calligraphy pendants are one of our signature offerings. We craft Arabic name pendants in any font (Thuluth, Naskh, Diwani, modern script), Allah pendants, Ayat al-Kursi, Bismillah, Mashallah, and fully custom Arabic calligraphy in gold, platinum, or silver.' },
      { q: 'Can you make a bubble letter pendant?', a: 'Absolutely — bubble letter pendants are one of our most popular styles. Available in 10K, 14K, or 18K gold, with or without diamond pavé, in any size and name or word you want.' },
      { q: 'What chain comes with a custom pendant?', a: 'Chains are priced separately so you can choose the perfect pairing. We can craft a matching custom chain (cuban, rope, franco, box) in the same metal, or help you choose a stock chain from our collection.' },
      { q: 'Can I add diamonds to my pendant?', a: 'Yes — we set natural or lab-grown diamonds, as well as sapphires, rubies, emeralds, and birthstones. Popular options include diamond-encrusted initials, pavé-set name pendants, and bezel-set centre stones.' },
      { q: 'Can you make a memorial pendant?', a: 'Yes — we craft memorial pendants that incorporate fingerprints, handwriting, silhouette portraits, or small keepsakes. Cremation-ash pendants can also be arranged with advance notice.' },
      { q: 'How long does a custom pendant take in Toronto?', a: 'Simple name or initial pendants take 2-3 weeks. Diamond-set pendants and photo pendants take 3-4 weeks. Complex multi-stone pieces can take 4-6 weeks. Rush orders are available on request.' },
      { q: 'Can you make a custom logo or company pendant?', a: 'Yes — we frequently produce custom logo pendants for brands, companies, and sports teams. Send us a logo file and we\'ll translate it into a 3D CAD model for your approval before crafting.' },
      { q: 'Where do I pick up my custom pendant in Toronto?', a: 'Pickup is at our studio at 624 Vaughan Rd, Toronto M6E 2Y3, by appointment. We also ship securely across the GTA and anywhere in Canada.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Rings', path: '/custom/rings' },
      { name: 'Custom Earrings', path: '/custom/earrings' },
    ],
  },
  'chains': {
    heroH1: 'Custom Chains in Toronto',
    heroSub: 'Cuban links, rope chains, franco chains, and more — built to your exact specifications in gold, silver, or platinum.',
    intro: 'Al-Assali Jewelry is Toronto\'s destination for custom chains. Whether you want a heavyweight Miami Cuban link, a classic rope chain, or a sleek franco — every chain is handcrafted in-house to your exact length, width, and weight specifications. Choose from 10K, 14K, or 18K gold in yellow, white, or rose, as well as platinum and sterling silver. Our custom gold chains and name chains are among the most sought-after pieces in the GTA, built solid — never hollow.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every link crafted by hand in our Toronto workshop.' },
      { icon: Wrench, title: 'Custom Specifications', text: 'Choose your exact length, width, weight, and clasp style.' },
      { icon: Link, title: 'Every Style Available', text: 'Cuban link, rope, franco, figaro, box chain, and custom designs.' },
      { icon: ShieldCheck, title: 'Solid Construction', text: 'No hollow chains — solid gold and silver built to last a lifetime.' },
    ],
    processNote: 'Custom chains take 2-4 weeks depending on complexity and weight. Cuban links and heavier chains require more crafting time. We weigh and measure each chain to your exact specifications before finishing.',
    budgetGuide: 'Custom chain pricing depends primarily on gold weight. A lighter 10K gold box chain starts around $1,000, while a heavy 18K Cuban link can reach $10,000+. We quote based on current gold prices, karat, and your desired dimensions.',
    stoneNote: 'Chains can incorporate diamond-set clasps, diamond-cut links, or integrated diamond settings. We can also create matching chain-and-pendant combinations.',
    faq: [
      { q: 'What types of custom chains do you offer in Toronto?', a: 'Miami Cuban link, rope, franco, figaro, box, wheat, anchor, curb, herringbone, paperclip, byzantine, and fully custom link designs. Any style, any weight, any length.' },
      { q: 'How much does a custom Cuban link chain cost in Toronto?', a: 'A 22" 10K gold Cuban link starts around $2,500 at 5mm width and scales with width, length, and karat. A 22" 14K Cuban at 8mm typically runs $6,000-$8,000. Solid 18K heavyweight chains at 10mm+ can reach $12,000+. We quote by exact gram weight.' },
      { q: 'Solid gold vs hollow gold chains — what\'s the difference?', a: 'Hollow chains are lightweight and cheaper but dent, kink, and snap under everyday wear. We only make solid gold chains — they hold their shape, last a lifetime, and hold resale value. We\'ll walk you through the weight trade-offs during consultation.' },
      { q: 'How many grams is a 5mm Cuban chain?', a: 'A 22" 5mm solid Cuban chain is roughly 40-50 grams in 10K gold, 45-55 grams in 14K, and 50-60 grams in 18K. Exact weight varies slightly by link style. We weigh and measure to your spec before finishing.' },
      { q: 'What gold karats are available for chains?', a: '10K, 14K, and 18K gold in yellow, white, and rose, plus platinum and sterling silver. 14K is our most popular — a great balance of colour, durability, and price for everyday wear.' },
      { q: 'Can I customize the length and width of my chain?', a: 'Yes — every chain is made to your exact length, width, and gram weight specifications. Common lengths: 18", 20", 22", 24", 26", 28", 30". Widths from 2mm to 15mm+ depending on chain style.' },
      { q: 'Do you make chains with name plates or pendants integrated?', a: 'Yes — we can integrate custom name plates, ID bars, pendants, and diamond-set sections into any chain design. Matching chain-and-pendant sets are a signature offering.' },
      { q: 'Can you add diamonds to a chain clasp or links?', a: 'Yes — diamond-set clasps, diamond-cut facets, and fully diamond-embedded links (iced-out chains) are all available. Natural or lab-grown, any clarity tier.' },
      { q: 'How long does a custom chain take in Toronto?', a: 'Most chains take 2-4 weeks. Lightweight chains 2-3 weeks, heavyweight Cuban or franco chains 3-4 weeks, fully iced-out chains 5-6 weeks due to setting work. Rush production is available.' },
      { q: 'Do you repair or re-solder broken chains?', a: 'Yes — we repair, re-solder, and re-plate chains (even if they weren\'t made here). We also shorten and extend existing chains to your preferred length.' },
    ],
    relatedPages: [
      { name: 'Custom Pendants', path: '/custom/pendants' },
      { name: 'Custom Bracelets', path: '/custom/bracelets' },
      { name: 'Custom Grillz', path: '/custom/grillz' },
    ],
  },
  'earrings': {
    heroH1: 'Custom Earrings in Toronto',
    heroSub: 'Diamond studs, gold hoops, drop earrings, and more — handcrafted to your design in our Toronto studio.',
    intro: 'From elegant diamond studs to bold statement hoops, Al-Assali Jewelry designs and crafts custom earrings entirely in-house in Toronto. Choose your style, your metal, and your stones — whether you want a subtle everyday pair or a show-stopping set for a special occasion, we craft them to perfection. We also create matching earring-and-pendant sets for a cohesive look.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every pair handcrafted in our Toronto studio.' },
      { icon: CircleDot, title: 'Every Style', text: 'Studs, hoops, drops, chandeliers, and fully custom designs.' },
      { icon: Diamond, title: 'Stone Options', text: 'Diamonds, sapphires, rubies, emeralds — natural or lab-grown.' },
      { icon: ShieldCheck, title: 'Perfect Pairing', text: 'Create matching sets with pendants, rings, or bracelets.' },
    ],
    processNote: 'Custom earrings take 2-4 weeks. Stud earrings are quicker to produce, while complex chandelier designs with multiple stone settings require more time. We create a detailed design for your approval before crafting.',
    budgetGuide: 'Custom earrings start at $1,000. Diamond stud earrings are priced based on stone size and quality, while gold hoops depend on weight and karat. We\'ll find the best combination for your budget.',
    stoneNote: 'Earrings can feature diamonds (natural or lab-grown), sapphires, rubies, and emeralds. Popular choices include diamond stud earrings, pave-set hoops, and drop earrings with colored gemstones.',
    faq: [
      { q: 'What types of custom earrings can you make in Toronto?', a: 'Diamond studs, gold hoops, huggies, drop earrings, chandelier earrings, ear climbers, ear cuffs, threader earrings, cluster earrings, and fully custom designs — all handcrafted in our Toronto studio.' },
      { q: 'How much do custom diamond stud earrings cost in Toronto?', a: '0.5ctw lab-grown studs start around $1,000 in 14K gold. 1ctw studs $1,500-$2,500 (lab) or $3,500-$5,000 (natural). 2ctw studs $3,000-$6,000 (lab) or $8,000-$15,000 (natural). Premium VVS clarity adds 15-25% to each tier.' },
      { q: 'Lab-grown vs natural diamond studs — which should I choose?', a: 'Lab-grown studs deliver the same brilliance and hardness for roughly 50% less — ideal if you want bigger visible size. Natural diamonds hold long-term resale value and carry heirloom sentiment. Both are real diamonds; we\'ll show you loose stones of each to compare.' },
      { q: 'How much do custom gold hoops cost?', a: 'Plain 10K gold hoops start around $800, 14K from $1,100, 18K from $1,500. Diamond-set pavé hoops start from $2,500. Final price scales with diameter, width, and gold weight.' },
      { q: 'Can I design matching earrings, pendant, and ring?', a: 'Yes — matching sets are a signature offering. Design your earrings alongside a pendant, ring, or bracelet for a cohesive collection. We offer set discounts when ordered together.' },
      { q: 'Do you make huggies and small everyday earrings?', a: 'Yes — huggies, small hoops, and everyday studs are some of our most popular pieces. We make them in 10K, 14K, or 18K gold with optional diamond pavé.' },
      { q: 'What metals are available for earrings?', a: '10K, 14K, and 18K gold in yellow, white, and rose, plus platinum and sterling silver. Platinum is the most durable and hypoallergenic — ideal if you have sensitive ears.' },
      { q: 'What\'s the difference between push-back and screw-back studs?', a: 'Push-back (friction-back) is the standard — easy to wear daily. Screw-back is more secure for high-value diamonds you never want to lose. We offer both and will recommend based on stone size and how you\'ll wear them.' },
      { q: 'How long do custom earrings take in Toronto?', a: 'Diamond studs take 2-3 weeks, plain gold hoops 2-3 weeks, pavé hoops 3-4 weeks, chandelier and complex multi-stone designs 4-5 weeks. Rush production available.' },
      { q: 'Can I get earrings re-plated or diamonds tightened?', a: 'Yes — free rhodium re-plating and free diamond tightening for life on every pair we create. We also service earrings from other jewellers at competitive rates.' },
    ],
    relatedPages: [
      { name: 'Custom Pendants', path: '/custom/pendants' },
      { name: 'Custom Rings', path: '/custom/rings' },
      { name: 'Custom Bracelets', path: '/custom/bracelets' },
    ],
  },
  'bracelets': {
    heroH1: 'Custom Bracelets in Toronto',
    heroSub: 'Tennis bracelets, bangles, cuffs, and engraved pieces for men and women — designed and crafted in Toronto.',
    intro: 'Al-Assali Jewelry creates custom bracelets for every style and occasion. From diamond tennis bracelets and elegant bangles to bold cuffs and engraved pieces for men, every bracelet is handcrafted in-house in Toronto. Whether you want a personalized name bracelet, a custom charm bracelet, or a mens engraved bracelet in solid gold — we\'ll create a piece that fits your wrist and your vision perfectly.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every bracelet crafted in our Toronto workshop.' },
      { icon: Gem, title: 'Every Style', text: 'Tennis, chain, bangle, cuff, charm, and custom designs.' },
      { icon: Wrench, title: 'Men\'s & Women\'s', text: 'Custom bracelets and engraved pieces for every wrist.' },
      { icon: ShieldCheck, title: 'Perfect Fit', text: 'Measured and crafted to your exact wrist size.' },
    ],
    processNote: 'Custom bracelets take 3-5 weeks. Tennis bracelets with many individual stone settings require more time, while bangles and cuffs are quicker. We measure your wrist for a precise fit during consultation.',
    budgetGuide: 'Custom bracelets start at $1,000. Tennis bracelets are priced based on stone count and quality, while bangles and cuffs depend on metal weight. Engraved bracelets for men are among our most popular commissions.',
    stoneNote: 'Bracelets can feature diamonds, sapphires, and other gemstones. Tennis bracelets with round brilliant diamonds are our most popular stone-set bracelet style. We also offer diamond-accented cuffs and charm bracelets.',
    faq: [
      { q: 'What types of custom bracelets do you make in Toronto?', a: 'Tennis bracelets, chain bracelets (Cuban, rope, franco, figaro), bangles, cuffs, charm bracelets, ID bracelets, engraved mens bracelets, byzantine bracelets, and fully custom designs for men and women.' },
      { q: 'How much does a custom tennis bracelet cost in Toronto?', a: 'Lab-grown diamond tennis bracelets: 2ctw from $2,500, 3ctw from $3,800, 5ctw from $6,500, 7ctw from $9,500, 10ctw from $14,000. Natural diamond tennis bracelets typically cost 2.5-3x the lab-grown equivalent. All prices in 14K gold.' },
      { q: 'Can I get an engraved bracelet for men in Toronto?', a: 'Yes — engraved men\'s bracelets are one of our most requested pieces. ID bracelets, Cuban link with name plate, Figaro with engraved bar, or solid cuffs — all with custom engraving in any font including Arabic calligraphy, dates, names, or logos.' },
      { q: 'How do I measure my wrist for a bracelet?', a: 'We measure your wrist in-studio for a perfect fit. You can also wrap a flexible tape measure snugly around your wrist just below the wrist bone, then add 0.5" (loose) or 0.25" (snug). Standard men\'s: 7.5-8.5". Standard women\'s: 6.5-7".' },
      { q: 'What\'s the difference between a tennis bracelet and a diamond chain bracelet?', a: 'A tennis bracelet has prong-set diamonds in a continuous line, each stone visible front and side. A diamond chain bracelet has stones set into chain links. Tennis bracelets typically show more stone face-up and are the more formal style.' },
      { q: 'Do you make custom ID bracelets?', a: 'Yes — ID bracelets are a staple of our mens collection. Solid gold, platinum, or silver plates engraved with names, dates, Arabic calligraphy, or any custom design. Attached to Cuban, figaro, or rope link chains.' },
      { q: 'Can I add diamonds to a bangle or cuff?', a: 'Yes — pavé-set bangles, diamond-accent cuffs, and fully diamond-encrusted cuffs are all available. Natural or lab-grown, any clarity tier.' },
      { q: 'What metals are available for custom bracelets?', a: '10K, 14K, and 18K gold in yellow, white, and rose, plus platinum and sterling silver. 14K and 18K are our most popular for bracelets due to everyday durability.' },
      { q: 'Do you offer safety chains on tennis bracelets?', a: 'Yes — every tennis bracelet we make includes a safety chain and a double-lock box clasp as standard. Lost a stone from an older bracelet? We can repair and add safety chains to bracelets made elsewhere.' },
      { q: 'How long does a custom bracelet take in Toronto?', a: 'Tennis bracelets 4-5 weeks due to hand-setting each stone. Bangles and cuffs 3-4 weeks. Chain bracelets 2-3 weeks. Engraved ID bracelets 3-4 weeks. Rush production available.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Rings', path: '/custom/rings' },
      { name: 'Custom Pendants', path: '/custom/pendants' },
    ],
  },
  'grillz': {
    heroH1: 'Custom Grillz in Toronto',
    heroSub: 'Gold grillz, diamond grillz, and VVS sets — Toronto\'s premier custom grillz studio. In-house craftsmanship, competitive prices.',
    intro: 'Al-Assali Jewelry is Toronto\'s go-to destination for custom grillz. From single-tooth pieces to full diamond-set grillz, every set is handcrafted in-house using real gold and genuine diamonds — not plated, not CZ. We offer 10K, 14K, and 18K gold in yellow, white, and rose, with optional VVS diamond, diamond dust, and fully custom designs. Our mold process ensures a perfect fit every time, and our prices are explained upfront with no surprises. Whether you\'re looking for gold grillz, diamond grillz, or something entirely unique, we\'re the only shop in Toronto that does it all under one roof.',
    whyCards: [
      { icon: MapPin, title: 'Toronto\'s Best Grillz', text: 'Handcrafted in our Toronto studio — not mass-produced overseas.' },
      { icon: Flame, title: 'Real Gold & Diamonds', text: '10K-18K solid gold with genuine VVS diamonds, not plated or CZ.' },
      { icon: Wrench, title: 'Perfect Fit Guaranteed', text: 'Custom mold process ensures your grillz fit perfectly every time.' },
      { icon: DollarSign, title: 'Competitive Pricing', text: 'Fair pricing explained upfront — no hidden fees, no surprises.' },
    ],
    processNote: 'Custom grillz take 1-2 weeks after your mold appointment. We take a precise dental impression, design your grillz, and handcraft them in your chosen metal and stone configuration. Walk-in mold appointments are available.',
    budgetGuide: 'Grillz start at $500 for a single tooth in 10K gold. Top 6 or bottom 6 sets range from $2,000-$5,000 in solid gold. Full diamond-set VVS grillz start around $5,000 and scale with diamond quality and coverage.',
    stoneNote: 'We set genuine natural and lab-grown diamonds in grillz, including VVS clarity stones. Diamond dust finishes, channel-set diamonds, and fully iced-out options are all available. No cubic zirconia — ever.',
    faq: [
      { q: 'How much do custom grillz cost in Toronto?', a: 'Single tooth grillz start at $500 in 10K gold. Top 6 or bottom 6 sets range from $2,000-$5,000 in solid gold. Full diamond-set VVS grillz start around $5,000 and scale to $15,000+ for fully iced-out sets. Every quote is broken down up front by gold weight, karat, and stone count.' },
      { q: 'What types of grillz do you offer?', a: 'Full sets (top + bottom), top 6, bottom 6, top 8, bottom 8, single tooth, fangs, open-face, honeycomb, bar, diamond dust, and fully custom designs. We also create matching grillz for couples and teams.' },
      { q: 'Are your grillz removable?', a: 'Yes — every grillz we make is removable. We create a precise dental mold of your teeth for a snug, secure fit that clicks in and out without permanently altering your teeth.' },
      { q: 'Are removable grillz safe for your teeth?', a: 'Yes, when properly made. Because our grillz are custom-fit from your exact dental mold, they sit snugly without damaging enamel. We recommend removing them before eating and cleaning them with a soft brush daily.' },
      { q: 'VVS vs VS vs SI — which clarity should I pick for grillz?', a: 'VVS offers the cleanest, brightest look and is our premium tier. VS gives a near-identical visual face-up for about 20-30% less. SI stones look great in micro-pavé or dust settings. We\'ll walk through all three with loose stones during consultation.' },
      { q: 'Do you use real diamonds in grillz?', a: 'Yes — genuine natural and lab-grown diamonds only, including VVS clarity stones. No cubic zirconia, no moissanite substitutions, ever. Every stone is hand-set by our master jeweller in Toronto.' },
      { q: 'What gold karats are available for grillz?', a: '10K, 14K, and 18K gold in yellow, white, and rose gold. 10K is the most durable and affordable. 14K is our most popular — a great balance of colour and price. 18K delivers the deepest yellow but is softer and needs gentler care.' },
      { q: 'How long does it take to make custom grillz in Toronto?', a: 'Most custom grillz are completed in 1-2 weeks after your mold appointment. Full diamond-set VVS sets can take 3-4 weeks due to the setting work. Rush orders are available on request.' },
      { q: 'How does the grillz mold process work?', a: 'We take a precise dental-grade silicone impression of your teeth in-studio. The impression is cast into a stone model that we use to shape and fit your grillz exactly to your bite. The appointment takes about 20 minutes.' },
      { q: 'Can I eat or drink with grillz in?', a: 'We recommend removing grillz before eating to protect both the grillz and your teeth. Drinking water is fine. Avoid sugary drinks with grillz in to prevent buildup along the gum line.' },
      { q: 'Do you offer permanent grillz?', a: 'We specialize in removable custom grillz because they\'re safer for your long-term oral health. If you\'re looking for semi-permanent grillz, we\'ll discuss the pros, cons, and dental considerations during consultation.' },
      { q: 'Do you make matching grillz for couples?', a: 'Yes — matching couples grillz are one of our most requested orders. We can create mirrored designs, shared stones, or complementary styles between partners.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Pendants', path: '/custom/pendants' },
      { name: 'Custom Rings', path: '/custom/rings' },
    ],
  },
  'wedding-bands': {
    heroH1: 'Custom Wedding Bands in Toronto',
    heroSub: 'Bands as timeless as your vow — handcrafted in Toronto to match your ring, your finish, and your story.',
    intro: 'A wedding band is the piece you\'ll wear every single day for the rest of your life, so it deserves the same care as the engagement ring it sits beside. At Al-Assali Jewelry, every custom wedding band is designed and handcrafted in-house in Toronto — from classic comfort-fit bands and eternity rings to contour-shaped bands that nest perfectly against a halo or solitaire. Choose platinum, 18K, 14K, or 10K gold in yellow, white, or rose, with optional diamond or gemstone accents and any engraving you can imagine, including Arabic calligraphy, fingerprints, and soundwaves. We craft matching bridal sets for couples, modern men\'s bands in brushed or hammered finishes, and stackable anniversary bands — all with our lifetime craftsmanship guarantee.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every band crafted entirely in our Toronto studio — no outsourcing, no middlemen.' },
      { icon: Heart, title: 'Matching Bridal Sets', text: 'Contour and shaped bands designed to nest flush against your engagement ring.' },
      { icon: Pen, title: 'Any Engraving', text: 'Inside or outside engraving in any font — including Arabic calligraphy, fingerprints, and soundwaves.' },
      { icon: ShieldCheck, title: 'Lifetime Guarantee', text: 'Free polishing, rhodium re-plating, and resizing for life on every band we create.' },
    ],
    processNote: 'Custom wedding bands take 3-5 weeks from design approval to completion. We start with a free consultation to understand the fit, finish, and story you want, create CAD renderings for your approval, then hand-craft each band in your chosen metal. Matching bridal sets are designed alongside the engagement ring when possible to ensure a perfect nest. Rush orders can be completed in 2-3 weeks for an additional fee.',
    budgetGuide: 'Custom wedding bands start at $900 for plain 10K gold bands and scale with karat, width, eternity stone coverage, and engraving complexity. A solid platinum comfort-fit band typically starts around $1,800, a half-eternity diamond band around $3,500, and a full diamond eternity band from $6,000. We quote every band up front with no hidden fees.',
    stoneNote: 'Bands can be set with diamonds (natural or lab-grown), sapphires, rubies, or emeralds in channel, bead, or shared-prong settings. Eternity and half-eternity bands are our most popular stone-set options, with birthstone bands a close second for anniversary pieces.',
    faq: [
      { q: 'How much does a custom wedding band cost in Toronto?', a: 'Custom wedding bands start at $900 for plain 10K gold and scale with metal karat, width, diamond coverage, and engraving. Platinum bands start around $1,800, half-eternity diamond bands from $3,500.' },
      { q: 'Do you match wedding bands to engagement rings?', a: 'Yes — we specialize in contour and shaped bands that nest flush against halo, solitaire, and three-stone engagement rings. Bring in your engagement ring and we\'ll design a band to match.' },
      { q: 'What\'s the difference between comfort fit and standard fit?', a: 'Comfort-fit bands have a slightly domed interior, making them easier to slide over the knuckle and more comfortable for daily wear. Standard-fit bands have a flat interior and feel slightly more traditional.' },
      { q: 'Can you engrave Arabic calligraphy on a wedding band?', a: 'Absolutely — we engrave Arabic calligraphy, scripture, names, dates, fingerprints, soundwaves, and any custom design you envision, inside or outside the band.' },
      { q: 'Do you make men\'s wedding bands?', a: 'Yes — we craft men\'s wedding bands in widths from 4mm to 10mm with brushed, hammered, polished, or matte finishes. Popular options include tungsten-look platinum, two-tone gold, and diamond-accent bands.' },
      { q: 'How long does a custom wedding band take in Toronto?', a: 'Most bands take 3-5 weeks from design approval. Matching bridal sets take 4-6 weeks. Rush orders can be completed in 2-3 weeks for an additional fee.' },
      { q: 'Can I reset diamonds from a family ring into a new band?', a: 'Yes — heirloom resets are one of our most meaningful projects. We\'ll carefully remove the stones and reset them into your new custom band design.' },
      { q: 'Do you make stackable anniversary bands?', a: 'Yes — we love designing stackable sets that add a new band for every anniversary or milestone. Mix metals, karats, and stone colours for a truly personal stack.' },
      { q: 'Can you size my band precisely?', a: 'Yes — we measure your ring size during consultation at no charge, and every custom band includes free resizing for life if your size changes.' },
    ],
    relatedPages: [
      { name: 'Custom Engagement Rings', path: '/custom/engagement-rings' },
      { name: 'Custom Rings', path: '/custom/rings' },
      { name: 'Custom Pendants', path: '/custom/pendants' },
    ],
  },
}

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

function LandingPage({ type }: { type: string }) {
  const config = typeConfig[type]
  if (!config) return null

  const landing = landingContent[type]
  if (!landing) return null

  const styles = config.styles
  const metals = config.metals
  const icons = styleIcons[type] || {}
  const showStones = type !== 'grillz'
  const sizeInfo = sizeConfig[type] || sizeConfig['other']

  const pricing = servicePricing[type]
  const serviceSchema = pricing
    ? buildServiceSchema({
        slug: type,
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
    { name: 'Bespoke', url: `${SITE_CONFIG.url}/custom/general` },
    { name: config.title, url: `${SITE_CONFIG.url}/custom/${type}` },
  ])

  const faqSchema = buildFaqSchema(landing.faq)

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
              <NextLink href="/custom/general" className="inline-flex items-center gap-2 bg-glacier-grey text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl">
                Design Your {config.title.replace('Custom ', '')} <ArrowRight className="w-5 h-5" />
              </NextLink>
              <NextLink href="/portfolio" className="inline-flex items-center gap-2 bg-white/10 border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-soft-black transition-all duration-300">
                View Our Work
              </NextLink>
            </div>
          </motion.div>
        </section>

        {/* ===== WHY CHOOSE AL-ASSALI ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-5xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white text-center mb-14" style={{ fontFamily: 'var(--font-heading)' }}>
              Why Choose Al-Assali
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {landing.whyCards.map((card, i) => {
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
                  Available Styles
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
              <p className="text-stone">Crafted with the finest materials — choose your metal during consultation</p>
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
          <StoneShapeSection />
        )}

        {/* ===== NATURAL VS LAB-GROWN (diamond-centric types) ===== */}
        {['engagement-rings', 'earrings', 'bracelets', 'wedding-bands'].includes(type) && (
          <NaturalVsLabSection />
        )}

        {/* ===== GRILLZ: teeth config + clarity ladder ===== */}
        {type === 'grillz' && <GrillzConfigSection />}

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

        {/* ===== PRICING TABLE (real starting prices per style x metal) ===== */}
        <PricingTableSection type={type} />

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
          </div>
        </section>

        {/* ===== SIZING INFO ===== */}
        <section className="py-16 px-4 border-t border-glacier-grey/10">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{sizeInfo.label}</h3>
              <p className="text-stone text-sm leading-relaxed">
                Not sure of your {sizeInfo.label.toLowerCase().replace(' *', '').replace(' (optional)', '')}? Don&apos;t worry — we&apos;ll help determine the perfect fit during your free consultation. Just tell us <em className="text-glacier-grey">&ldquo;{sizeInfo.placeholder}&rdquo;</em> or let us measure in person.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== FAQ (Schema eligible) ===== */}
        <section className="py-20 px-4 border-t border-glacier-grey/10">
          <div className="max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-6">
              {landing.faq.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6">
                  <h3 className="text-white font-bold mb-2">{item.q}</h3>
                  <p className="text-stone text-sm leading-relaxed">{item.a}</p>
                </motion.div>
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
              <NextLink href="/custom/general" className="inline-flex items-center gap-2 bg-glacier-grey text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl mb-12">
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
            [serviceSchema, breadcrumbSchema, faqSchema].filter(Boolean),
          ),
        }}
      />
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

  // /custom/general → portal form above, hub SEO content below
  return (
    <>
      <PortalForm />
      <GeneralHub />
    </>
  )
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
    stoneShape: '',
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

// ---------------------------------------------------------------------------
// GeneralHub — SEO-rich hub content rendered below the PortalForm on /custom/general
// Targets "custom jeweller Toronto", "bespoke jewellery Toronto", "custom jewellery Toronto"
// ---------------------------------------------------------------------------

const hubBespokeCards: { name: string; path: string; icon: LucideIcon; blurb: string }[] = [
  { name: 'Custom Engagement Rings', path: '/custom/engagement-rings', icon: Diamond, blurb: 'Solitaire, halo, vintage, three-stone — designed around your love story.' },
  { name: 'Custom Wedding Bands', path: '/custom/wedding-bands', icon: Heart, blurb: 'Matching bridal sets, eternity bands, men\'s bands, and engraved pieces.' },
  { name: 'Custom Rings', path: '/custom/rings', icon: Circle, blurb: 'Signet, statement, stackable, everyday — in gold, platinum, or silver.' },
  { name: 'Custom Pendants', path: '/custom/pendants', icon: Layers, blurb: 'Name pendants, photo pendants, religious symbols, Arabic calligraphy.' },
  { name: 'Custom Chains', path: '/custom/chains', icon: Link, blurb: 'Miami Cuban, rope, franco, figaro — solid gold, never hollow.' },
  { name: 'Custom Earrings', path: '/custom/earrings', icon: CircleDot, blurb: 'Studs, hoops, drops, chandeliers — diamond and gold.' },
  { name: 'Custom Bracelets', path: '/custom/bracelets', icon: Gem, blurb: 'Tennis bracelets, bangles, cuffs, engraved men\'s ID bracelets.' },
  { name: 'Custom Grillz', path: '/custom/grillz', icon: Flame, blurb: 'Gold and VVS diamond grillz — single tooth to full sets.' },
]

const hubProcessSteps = [
  { icon: MessageSquare, title: 'Consultation', body: 'Free in-studio or virtual consultation to understand your vision, budget, and timeline.' },
  { icon: Pen, title: 'Design & CAD', body: 'Our designers produce detailed sketches and 3D CAD renderings for your approval before crafting begins.' },
  { icon: Diamond, title: 'Stone & Metal Selection', body: 'Hand-pick GIA-graded natural or lab-grown diamonds, coloured gems, and your choice of gold, platinum, or silver.' },
  { icon: Wrench, title: 'In-House Crafting', body: 'Every piece is cast, set, and finished entirely in our Toronto workshop by master jeweller Mohammad Al-Assali — no outsourcing.' },
  { icon: Gem, title: 'Presentation', body: 'Your finished piece is inspected, photographed, and presented in luxury packaging with a lifetime craftsmanship guarantee.' },
]

const hubFaq = [
  { q: 'Where is Al-Assali Jewelry located in Toronto?', a: 'Our studio is at 624 Vaughan Rd in Toronto (M6E 2Y3), in the Oakwood–Vaughan neighbourhood. We operate by appointment only to give every client our full attention.' },
  { q: 'Do I need an appointment to visit the Toronto studio?', a: 'Yes — we work by appointment only. Book a free consultation by phone, email, or through our custom inquiry form and we\'ll confirm a time that works for you.' },
  { q: 'What areas around Toronto do you serve?', a: 'Our studio is in Toronto, and we regularly work with clients from across the Greater Toronto Area including Mississauga, Etobicoke, North York, Scarborough, Vaughan, Markham, Oakville, Burlington, Brampton, and Milton.' },
  { q: 'How do I start a custom jewellery project?', a: 'Book a free consultation (virtual or in-studio). We\'ll discuss your vision, budget, and timeline, then produce CAD renderings for your approval before any crafting begins. Most projects take 2-6 weeks from design approval.' },
  { q: 'How much does custom jewellery cost in Toronto?', a: 'Most of our custom pieces start between $500 (single-tooth grillz) and $1,000 (custom rings, pendants, earrings, bracelets, chains), scaling with metal, stones, and design complexity. We quote every project up front with no hidden fees.' },
  { q: 'Do you offer lab-grown diamonds?', a: 'Yes — we offer both natural and lab-grown diamonds. Lab-grown stones are chemically and visually identical to natural diamonds and offer significant savings on carat-for-carat value.' },
  { q: 'Can you reset family diamonds into a new design?', a: 'Absolutely. Heirloom resets are some of our most meaningful projects. We\'ll carefully remove the stones from your existing piece and set them into your new custom design.' },
  { q: 'Do you offer Arabic calligraphy jewellery?', a: 'Yes — we specialize in Arabic calligraphy pendants, Allah pendants, Ayat al-Kursi pendants, Bismillah pendants, and engraved Arabic wedding bands. Our master jeweller is fluent in the art of Arabic calligraphy casting.' },
  { q: 'What is the typical timeline for custom jewellery?', a: 'Most pieces take 2-6 weeks: grillz 1-2 weeks, pendants 2-4 weeks, chains and earrings 2-4 weeks, rings and bracelets 3-5 weeks, engagement rings 4-6 weeks. Rush orders are available.' },
  { q: 'Do you ship outside of Toronto?', a: 'Yes — we ship securely across the GTA and anywhere in Canada. Finished pieces are always fully insured in transit.' },
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
            <span className="text-xs uppercase tracking-widest text-glacier-grey font-medium">Toronto&apos;s Custom Jewellery Studio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Toronto&apos;s Premier Custom Jeweller
          </h2>
          <p className="text-stone leading-relaxed text-base md:text-lg">
            Al-Assali Jewelry is a bespoke jewellery studio on Vaughan Road in Toronto. Master jeweller Mohammad Al-Assali and our team design and handcraft every custom engagement ring, wedding band, diamond pendant, gold chain, and grillz set entirely in-house — no outsourcing, no middlemen. From the first consultation to the final polish, every piece is crafted under one roof with a lifetime craftsmanship guarantee.
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
            Why Al-Assali Jewelry
          </h3>
          <p className="text-stone text-center mb-10 max-w-2xl mx-auto text-sm">
            We are a small, focused Toronto workshop. Every piece is crafted by a master jeweller — not a factory — and backed by a lifetime craftsmanship guarantee.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: 'Made in Toronto', body: 'Designed, cast, set, and finished entirely in our Vaughan Rd studio.' },
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

        {/* MASTER JEWELLER */}
        <div className="bg-charcoal/30 border border-glacier-grey/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-glacier-grey/20 border border-glacier-grey/40 mb-5">
            <Hammer className="w-6 h-6 text-glacier-grey" />
          </div>
          <div className="text-xs uppercase tracking-widest text-glacier-grey font-medium mb-2">Master Jeweller &amp; Founder</div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Mohammad Al-Assali
          </h3>
          <p className="text-stone leading-relaxed text-sm md:text-base">
            Mohammad is the founder and master jeweller behind Al-Assali Jewelry Studio. A George Brown College Jewellery Arts Program graduate practicing since 2017, he has designed and handcrafted hundreds of bespoke engagement rings, gold chains, diamond pendants, and custom grillz for clients across the Greater Toronto Area. Every piece that leaves our Toronto studio has been personally inspected and finished by Mohammad.
          </p>
        </div>

        {/* LOCATION */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Visit Our Toronto Studio
          </h3>
          <p className="text-stone leading-relaxed text-sm mb-6">
            Al-Assali Jewelry Studio is located at 624 Vaughan Rd in Toronto (M6E 2Y3), in the Oakwood–Vaughan neighbourhood. We work by appointment only — book a free consultation and we&apos;ll confirm a time that works for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="tel:+16475624340" className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light">
              <MessageSquare className="w-4 h-4" /> (647) 562-4340
            </a>
            <a href="mailto:contact@alassalijewellerystudio.com" className="inline-flex items-center gap-2 text-glacier-grey hover:text-glacier-grey-light">
              <Type className="w-4 h-4" /> contact@alassalijewellerystudio.com
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
          <div className="space-y-4">
            {hubFaq.map((item, i) => (
              <div key={i} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5">
                <h4 className="text-white font-bold text-sm mb-1.5">{item.q}</h4>
                <p className="text-stone text-sm leading-relaxed">{item.a}</p>
              </div>
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
