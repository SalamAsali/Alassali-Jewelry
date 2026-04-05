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
  CircleDot, Droplet, Gem,
  MinusCircle, Leaf, FlaskConical,
  DollarSign, Calendar, CalendarDays, CalendarCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'

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
      { q: 'How long does it take to make a custom engagement ring in Toronto?', a: 'Most custom engagement rings take 4-6 weeks from design approval to completion. Rush orders can be completed in 2-3 weeks for an additional fee.' },
      { q: 'How much does a custom engagement ring cost?', a: 'Custom engagement rings start at $1,000 and vary based on materials, stone selection, and design complexity. We work within your budget during our consultation.' },
      { q: 'Can I design my own engagement ring?', a: 'Absolutely. Bring us your sketches, Pinterest boards, or just a rough idea — our designers will create detailed CAD renderings for your approval before any crafting begins.' },
      { q: 'Do you offer lab-grown diamonds for engagement rings?', a: 'Yes. We offer both natural and lab-grown diamonds. Lab-grown stones are chemically identical and offer exceptional value without compromising brilliance.' },
      { q: 'Can I see my engagement ring before it\'s finished?', a: 'Yes — we share 3D CAD renderings and models for your approval before manufacturing begins. You\'ll know exactly what your ring will look like.' },
      { q: 'What engagement ring styles do you offer?', a: 'We create Classic, Modern, Vintage, Art Deco, Halo, and Solitaire engagement rings — or any fully custom design you envision.' },
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
      { q: 'What types of custom rings can you make?', a: 'We craft signet rings, statement rings, wedding bands, stackable rings, and fully custom designs in any style you can imagine.' },
      { q: 'How much does a custom ring cost in Toronto?', a: 'Custom rings start at $1,000 and vary based on metal, stones, and design complexity. We work within your budget.' },
      { q: 'Can I bring my own design for a ring?', a: 'Yes — bring sketches, reference photos, or describe your idea. We create CAD renderings for approval before crafting.' },
      { q: 'How do I determine my ring size?', a: 'We measure your ring size during consultation for free, or you can visit us anytime for a quick sizing.' },
      { q: 'What metals are available for custom rings?', a: '10K gold, 14K gold, 18K gold (yellow, white, rose), platinum, and sterling silver.' },
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
      { q: 'What types of custom pendants do you make?', a: 'We create name pendants, initial pendants, photo pendants, bubble letter pendants, religious symbols, custom logos, and any design you can imagine.' },
      { q: 'Can you make a photo pendant?', a: 'Yes — we create custom photo pendants where your image is set behind crystal or surrounded by diamonds in gold or silver.' },
      { q: 'How much does a custom gold pendant cost?', a: 'Custom gold pendants start around $1,000 depending on size, gold karat, and stone settings.' },
      { q: 'What chain comes with a custom pendant?', a: 'Chains are crafted or selected separately. We can create a matching custom chain or help you choose the perfect pairing.' },
      { q: 'Can I add diamonds to my pendant?', a: 'Absolutely — we can set natural or lab-grown diamonds, as well as sapphires, rubies, and emeralds in any pendant design.' },
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
      { q: 'What types of custom chains do you offer?', a: 'Miami Cuban link, rope, franco, figaro, box chain, and fully custom link designs. Any style, any weight.' },
      { q: 'How much does a custom Cuban link chain cost in Toronto?', a: 'Custom Cuban link chains start at $1,000 and vary based on gold karat, total weight, and dimensions.' },
      { q: 'What gold karats are available for chains?', a: '10K, 14K, and 18K gold in yellow, white, and rose, plus platinum and sterling silver.' },
      { q: 'Can I customize the length and width of my chain?', a: 'Yes — every chain is made to your exact length, width, and weight specifications.' },
      { q: 'Do you make chains with name plates?', a: 'Yes — we can integrate custom name plates, pendants, and diamond settings into any chain design.' },
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
      { q: 'What types of custom earrings can you make?', a: 'We create studs, hoops, drop earrings, chandeliers, and fully custom designs in any style.' },
      { q: 'How much do custom diamond earrings cost?', a: 'Custom diamond earrings start at $1,000 depending on stone size, quality, and metal choice.' },
      { q: 'Can I design matching earrings and pendant?', a: 'Yes — we love creating matching sets. Design your earrings and pendant together for a cohesive look.' },
      { q: 'What metals are available for earrings?', a: '10K-18K gold (yellow, white, rose), platinum, and sterling silver.' },
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
      { q: 'What types of custom bracelets do you make?', a: 'Tennis bracelets, chain bracelets, bangles, cuffs, charm bracelets, and fully custom designs for men and women.' },
      { q: 'How much does a custom tennis bracelet cost in Toronto?', a: 'Custom tennis bracelets start at $2,500 depending on stone quality, total carat weight, and metal choice.' },
      { q: 'Can I get an engraved bracelet for men?', a: 'Yes — we create engraved bracelets for men in gold, platinum, and silver with custom text, dates, or designs.' },
      { q: 'How do I measure my wrist for a bracelet?', a: 'We measure your wrist during consultation for a perfect fit. You can also visit us anytime for a quick free measurement.' },
      { q: 'What metals are available for custom bracelets?', a: '10K gold, 14K gold, 18K gold (yellow, white, rose), platinum, and sterling silver.' },
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
      { q: 'How much do custom grillz cost in Toronto?', a: 'Custom grillz start at $500 for a single tooth in 10K gold. Full sets with diamonds range from $2,000-$10,000+ depending on gold karat and stone quality.' },
      { q: 'What types of grillz do you offer?', a: 'Full sets (top & bottom), top 6, bottom 6, single tooth, fangs, open-face, diamond dust, and fully custom designs.' },
      { q: 'Are your grillz removable?', a: 'Yes — all our grillz are removable. We create a custom mold of your teeth for a snug, secure fit that clicks in and out.' },
      { q: 'What gold karats are available for grillz?', a: '10K, 14K, and 18K gold in yellow, white, and rose gold options.' },
      { q: 'Do you use real diamonds in grillz?', a: 'Yes — we use genuine natural and lab-grown diamonds including VVS clarity stones. No cubic zirconia, no moissanite substitutions.' },
      { q: 'How long does it take to make custom grillz in Toronto?', a: 'Most custom grillz are completed in 1-2 weeks after your mold appointment. Rush orders can be accommodated.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Pendants', path: '/custom/pendants' },
      { name: 'Custom Rings', path: '/custom/rings' },
    ],
  },
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

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: landing.faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
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
    <div className="h-[calc(100dvh-56px)] md:h-[calc(100dvh-72px)] lg:h-[calc(100dvh-80px)] -mb-24 bg-soft-black relative overflow-hidden flex flex-col" data-testid="custom-form-hero">
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
