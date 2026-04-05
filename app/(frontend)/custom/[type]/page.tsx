'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import NextLink from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Upload, Sparkles, ArrowDown,
  Heart, Zap, Clock, Hexagon, Sun, Diamond, HelpCircle,
  LayoutGrid, ChevronUp, ChevronDown, Square, Flame,
  Link, Waves, Shield, Type, Pen, Star,
  Paintbrush, Crown, Circle, Layers,
  CircleDot, Droplet, Gem, MapPin, Wrench, ShieldCheck, MessageSquare,
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
// SEO Landing page content per type
// ---------------------------------------------------------------------------

const landingContent: Record<string, {
  heroHeadline: string
  heroSub: string
  intro: string
  whyCards: { icon: LucideIcon; title: string; text: string }[]
  faq: { q: string; a: string }[]
  relatedPages: { name: string; path: string }[]
}> = {
  'engagement-rings': {
    heroHeadline: 'Custom Engagement Rings in Toronto',
    heroSub: 'Design a one-of-a-kind ring as unique as your love story — handcrafted in-house by Toronto\'s finest.',
    intro: 'At Al-Assali Jewelry, every custom engagement ring begins with your vision. Whether you dream of a classic solitaire, a vintage halo setting, or a bold modern design, our master craftspeople bring it to life entirely in-house in Toronto. Choose from ethically sourced natural and lab-grown diamonds, sapphires, rubies, and emeralds — set in platinum, 18K, or 14K gold. From first sketch to final presentation, your ring is crafted with the care and precision your moment deserves.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every ring crafted entirely in-house at our Toronto studio — no outsourcing.' },
      { icon: Diamond, title: 'Ethically Sourced', text: 'Natural and lab-grown diamonds, conflict-free sapphires, rubies, and emeralds.' },
      { icon: MessageSquare, title: 'One-on-One Design', text: 'Personal consultation from concept to CAD rendering to finished piece.' },
      { icon: ShieldCheck, title: 'Craftsmanship Guarantee', text: 'Lifetime guarantee on every engagement ring we create.' },
    ],
    faq: [
      { q: 'How long does it take to make a custom engagement ring?', a: 'Most custom engagement rings take 4-6 weeks from design approval to completion. Rush orders are available for an additional fee.' },
      { q: 'How much does a custom engagement ring cost in Toronto?', a: 'Custom engagement rings start at $1,000 and vary based on materials, stones, and complexity. We work within your budget during consultation.' },
      { q: 'Can I design my own engagement ring?', a: 'Absolutely. Bring us your sketches, photos, or just an idea — our designers will create detailed CAD renderings for your approval before crafting begins.' },
      { q: 'Do you offer lab-grown diamonds?', a: 'Yes. We offer both natural and lab-grown diamonds, giving you the choice of origin without compromising on brilliance or quality.' },
      { q: 'Can I see the ring before it\'s finished?', a: 'Yes — we share CAD renderings and 3D models for your approval before any manufacturing begins.' },
    ],
    relatedPages: [
      { name: 'Custom Rings', path: '/custom/rings' },
      { name: 'Custom Pendants', path: '/custom/pendants' },
      { name: 'Custom Bracelets', path: '/custom/bracelets' },
    ],
  },
  'rings': {
    heroHeadline: 'Custom Rings in Toronto',
    heroSub: 'Signet rings, statement rings, wedding bands, and more — designed around your vision, handcrafted in Toronto.',
    intro: 'From bold signet rings to elegant wedding bands and one-of-a-kind statement pieces, Al-Assali Jewelry creates custom rings that are uniquely yours. Every ring is handcrafted in-house in Toronto using the finest gold, platinum, and silver, with optional diamond and gemstone settings. Whether you have a detailed sketch or just an idea, our craftspeople will bring your ring to life.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Handcrafted in our Toronto studio — no outsourcing, no middlemen.' },
      { icon: Wrench, title: 'Any Style, Any Design', text: 'Signet, statement, band, stackable, or something entirely new.' },
      { icon: MessageSquare, title: 'Personal Consultation', text: 'Work directly with our designers from concept to finished piece.' },
      { icon: ShieldCheck, title: 'Premium Materials', text: '10K-18K gold, platinum, and sterling silver with optional gemstones.' },
    ],
    faq: [
      { q: 'What types of custom rings can you make?', a: 'We craft signet rings, statement rings, wedding bands, stackable rings, and fully custom designs in any style.' },
      { q: 'How much does a custom ring cost?', a: 'Custom rings start at $1,000 and vary based on metal, stones, and design complexity.' },
      { q: 'Can I bring my own design for a ring?', a: 'Yes — bring sketches, reference photos, or describe your idea. We\'ll create CAD renderings for your approval.' },
      { q: 'How do I determine my ring size?', a: 'We can measure your ring size during consultation, or you can visit us for a quick free sizing.' },
    ],
    relatedPages: [
      { name: 'Custom Engagement Rings', path: '/custom/engagement-rings' },
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Bracelets', path: '/custom/bracelets' },
    ],
  },
  'pendants': {
    heroHeadline: 'Custom Pendants in Toronto',
    heroSub: 'Name pendants, photo pendants, diamond initials, and more — your story, beautifully told in gold and silver.',
    intro: 'Al-Assali Jewelry creates custom pendants that carry meaning. From diamond-encrusted name pendants and photo pendants to religious symbols and custom designs, every piece is handcrafted in-house in Toronto. Choose your metal, your stones, and your design — we\'ll create a pendant that\'s as unique as the story it tells.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every pendant crafted in our Toronto studio with precision and care.' },
      { icon: Layers, title: 'Endless Designs', text: 'Name, initial, photo, religious, symbol — or bring your own concept.' },
      { icon: Diamond, title: 'Diamond Setting', text: 'Add natural or lab-grown diamonds, sapphires, and other precious stones.' },
      { icon: ShieldCheck, title: 'Premium Craftsmanship', text: '10K-18K gold, platinum, or sterling silver with lifetime quality guarantee.' },
    ],
    faq: [
      { q: 'What types of custom pendants do you make?', a: 'We create name pendants, initial pendants, photo pendants, religious symbols, custom logos, and any design you can imagine.' },
      { q: 'Can you make a photo pendant?', a: 'Yes — we create custom photo pendants where your image is set behind crystal or surrounded by diamonds.' },
      { q: 'How much does a custom gold pendant cost?', a: 'Custom gold pendants start around $1,000 depending on size, gold karat, and stone settings.' },
      { q: 'What chain comes with a custom pendant?', a: 'Chains are crafted or selected separately. We can create a matching custom chain or help you choose the perfect pairing.' },
      { q: 'Can I add diamonds to my pendant?', a: 'Absolutely — we can set natural or lab-grown diamonds, as well as sapphires, rubies, and emeralds.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Rings', path: '/custom/rings' },
      { name: 'Custom Earrings', path: '/custom/earrings' },
    ],
  },
  'chains': {
    heroHeadline: 'Custom Chains in Toronto',
    heroSub: 'Cuban links, rope chains, franco chains, and more — built to your exact specifications in gold, silver, or platinum.',
    intro: 'Al-Assali Jewelry is Toronto\'s destination for custom chains. Whether you want a heavyweight Miami Cuban link, a classic rope chain, or a sleek franco — every chain is handcrafted in-house to your exact length, width, and weight specifications. Choose from 10K, 14K, or 18K gold in yellow, white, or rose, as well as platinum and sterling silver.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every link crafted by hand in our Toronto workshop.' },
      { icon: Wrench, title: 'Custom Specifications', text: 'Choose your exact length, width, weight, and clasp style.' },
      { icon: Link, title: 'Every Style Available', text: 'Cuban link, rope, franco, figaro, box chain, and custom designs.' },
      { icon: ShieldCheck, title: 'Solid Construction', text: 'No hollow chains — solid gold and silver built to last a lifetime.' },
    ],
    faq: [
      { q: 'What types of custom chains do you offer?', a: 'Miami Cuban link, rope, franco, figaro, box chain, and fully custom designs. Any style, any weight.' },
      { q: 'How much does a custom Cuban link chain cost?', a: 'Custom Cuban link chains start at $1,000 and vary based on gold karat, weight, and dimensions.' },
      { q: 'What gold karats are available for chains?', a: 'We offer 10K, 14K, and 18K gold in yellow, white, and rose, plus platinum and sterling silver.' },
      { q: 'Can I customize the length and width?', a: 'Yes — every chain is made to your exact specifications. Choose your length, width, and weight.' },
      { q: 'Do you make chains with name plates?', a: 'Yes — we can integrate custom name plates, pendants, and diamond settings into your chain design.' },
    ],
    relatedPages: [
      { name: 'Custom Pendants', path: '/custom/pendants' },
      { name: 'Custom Bracelets', path: '/custom/bracelets' },
      { name: 'Custom Grillz', path: '/custom/grillz' },
    ],
  },
  'earrings': {
    heroHeadline: 'Custom Earrings in Toronto',
    heroSub: 'Diamond studs, gold hoops, drop earrings, and more — handcrafted to your design in our Toronto studio.',
    intro: 'From elegant diamond studs to bold statement hoops, Al-Assali Jewelry designs and crafts custom earrings entirely in-house in Toronto. Choose your style, your metal, and your stones — whether you want a matching pair for a special occasion or everyday signature pieces, we\'ll craft them to perfection.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every pair handcrafted in our Toronto studio.' },
      { icon: CircleDot, title: 'Every Style', text: 'Studs, hoops, drops, chandeliers, and fully custom designs.' },
      { icon: Diamond, title: 'Stone Options', text: 'Diamonds, sapphires, rubies, emeralds — natural or lab-grown.' },
      { icon: ShieldCheck, title: 'Perfect Pairing', text: 'Create matching sets with pendants, rings, or bracelets.' },
    ],
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
    heroHeadline: 'Custom Bracelets in Toronto',
    heroSub: 'Tennis bracelets, bangles, cuffs, and engraved pieces for men and women — designed and crafted in Toronto.',
    intro: 'Al-Assali Jewelry creates custom bracelets for every style and occasion. From diamond tennis bracelets and elegant bangles to bold cuffs and engraved pieces for men, every bracelet is handcrafted in-house in Toronto. Choose your metal, your stones, and your design — we\'ll create a bracelet that fits your wrist and your vision perfectly.',
    whyCards: [
      { icon: MapPin, title: 'Made in Toronto', text: 'Every bracelet crafted in our Toronto workshop.' },
      { icon: Gem, title: 'Every Style', text: 'Tennis, chain, bangle, cuff, charm, and custom designs.' },
      { icon: Wrench, title: 'Men\'s & Women\'s', text: 'Custom bracelets and engraved pieces for every wrist.' },
      { icon: ShieldCheck, title: 'Perfect Fit', text: 'Measured and crafted to your exact wrist size.' },
    ],
    faq: [
      { q: 'What types of custom bracelets do you make?', a: 'Tennis bracelets, chain bracelets, bangles, cuffs, charm bracelets, and fully custom designs.' },
      { q: 'How much does a custom tennis bracelet cost?', a: 'Custom tennis bracelets start at $2,500 depending on stone quality, size, and metal choice.' },
      { q: 'Can I get an engraved bracelet for men?', a: 'Yes — we create engraved bracelets for men in gold, platinum, and silver with custom text or designs.' },
      { q: 'How do I measure my wrist for a bracelet?', a: 'We measure your wrist during consultation for a perfect fit. You can also visit us for a quick free measurement.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Rings', path: '/custom/rings' },
      { name: 'Custom Pendants', path: '/custom/pendants' },
    ],
  },
  'grillz': {
    heroHeadline: 'Custom Grillz in Toronto',
    heroSub: 'Gold grillz, diamond grillz, and VVS sets — Toronto\'s premier custom grillz studio. In-house craftsmanship, competitive prices.',
    intro: 'Al-Assali Jewelry is Toronto\'s go-to for custom grillz. From single-tooth pieces to full diamond-set grillz, every set is handcrafted in-house using real gold and genuine diamonds. We offer 10K, 14K, and 18K gold in yellow, white, and rose, with optional VVS diamond, diamond dust, and custom designs. Our mold process ensures a perfect fit every time.',
    whyCards: [
      { icon: MapPin, title: 'Toronto\'s Best Grillz', text: 'Handcrafted in our Toronto studio — not mass-produced overseas.' },
      { icon: Flame, title: 'Real Gold & Diamonds', text: '10K-18K solid gold with genuine VVS diamonds, not plated or CZ.' },
      { icon: Wrench, title: 'Perfect Fit Guaranteed', text: 'Custom mold process ensures your grillz fit perfectly every time.' },
      { icon: DollarSign, title: 'Competitive Pricing', text: 'Fair pricing explained upfront — no hidden fees, no surprises.' },
    ],
    faq: [
      { q: 'How much do custom grillz cost in Toronto?', a: 'Custom grillz start at $500 for a single tooth in 10K gold. Full sets with diamonds range from $2,000-$10,000+ depending on gold karat and stone quality.' },
      { q: 'What types of grillz do you offer?', a: 'Full sets (top & bottom), top 6, bottom 6, single tooth, fangs, open-face, diamond dust, and fully custom designs.' },
      { q: 'Are your grillz removable?', a: 'Yes — all our grillz are removable. We create a custom mold of your teeth for a snug, secure fit.' },
      { q: 'What gold karats are available for grillz?', a: '10K, 14K, and 18K gold in yellow, white, and rose gold options.' },
      { q: 'Do you use real diamonds in grillz?', a: 'Yes — we use genuine natural and lab-grown diamonds including VVS clarity stones. No cubic zirconia.' },
      { q: 'How long does it take to make custom grillz?', a: 'Most custom grillz are completed in 1-2 weeks after your mold appointment. Rush orders available.' },
    ],
    relatedPages: [
      { name: 'Custom Chains', path: '/custom/chains' },
      { name: 'Custom Pendants', path: '/custom/pendants' },
      { name: 'Custom Rings', path: '/custom/rings' },
    ],
  },
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
// Section wrapper — each form section with a title and divider
// ---------------------------------------------------------------------------

function Section({ id, title, subtitle, children, refProp }: {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  refProp?: React.Ref<HTMLDivElement>
}) {
  return (
    <motion.section
      id={id}
      ref={refProp}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-8"
    >
      <div className="border-t border-glacier-grey/15 pt-10 mt-10 first:border-t-0 first:pt-0 first:mt-0">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          {title}
        </h2>
        {subtitle && <p className="text-stone mb-8">{subtitle}</p>}
        {!subtitle && <div className="mb-8" />}
        {children}
      </div>
    </motion.section>
  )
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function CustomJewelryPage() {
  const params = useParams()
  const router = useRouter()
  const urlType = (params?.type as string) || 'general'

  // If user came via a direct link like /custom/chains, pre-select that type
  const isDirectType = urlType !== 'general' && urlType in typeConfig

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
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Refs for scroll-to behavior
  const styleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // Derived config
  const activeType = formData.pieceType || ''
  const config = typeConfig[activeType] || null
  const activeSizeConfig = sizeConfig[activeType] || sizeConfig['other']
  const showStyle = activeType !== '' && activeType !== 'other' && config && config.styles.length > 0
  const showStones = activeType !== '' && activeType !== 'grillz'
  const pieceTypeLabel = pieceTypeOptions.find(p => p.value === formData.pieceType)?.label || formData.pieceType

  // Header adapts to selection
  const headerTitle = config ? config.title : 'Start Your Journey'
  const headerSubtitle = config ? config.subtitle : 'Tell us about your dream piece — we\'ll bring it to life'

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectPieceType = (pieceType: string) => {
    setFormData(prev => ({
      ...prev,
      pieceType,
      style: '',
      metalType: '',
      goldColor: '',
      stonePreferences: [],
      diamondType: '',
      size: '',
    }))
    // Scroll to the next section after selection
    setTimeout(() => {
      styleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
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
          type: formData.pieceType || 'general',
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          jewelryCategory: formData.pieceType || 'general',
          inspirationNames: formData.inspirationImages.join(', '),
        }),
      })
      if (response.ok) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        alert('Error submitting inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Error submitting inquiry. Please try again.')
    }
  }

  // ---------------------------------------------------------------------------
  // Shared style helpers
  // ---------------------------------------------------------------------------

  const cardBase = 'flex flex-col items-center justify-center rounded-xl border-2 transition-all cursor-pointer'
  const cardSelected = 'bg-glacier-grey/20 border-glacier-grey shadow-lg shadow-glacier-grey/20'
  const cardUnselected = 'bg-charcoal/50 border-glacier-grey/20 hover:border-glacier-grey/50 hover:bg-charcoal'
  const inputClass = 'w-full px-4 py-3 rounded-lg bg-charcoal border-2 border-glacier-grey/50 text-white placeholder-stone focus:border-glacier-grey focus:ring-2 focus:ring-glacier-grey/40 transition-all outline-none'

  // =========================================================================
  // SUBMITTED — Thank you screen
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
            Your custom {pieceTypeLabel.toLowerCase() || 'jewelry'} inquiry has been received.
          </p>
          <p className="text-stone mb-12 max-w-2xl mx-auto">
            Our master craftspeople will review your request and contact you within 24-48 hours
            to begin bringing your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/')} className="bg-white/10 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-soft-black transition-all">
              Return Home
            </button>
            <button onClick={() => router.push('/catalog')} className="bg-glacier-grey text-white px-8 py-3 rounded-lg font-semibold hover:bg-glacier-grey-light transition-all">
              Browse Collection
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // =========================================================================
  // Landing page content (only for direct type URLs, not /custom/general)
  // =========================================================================

  const landing = isDirectType ? landingContent[urlType] : null
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  // =========================================================================
  // MAIN PAGE — Landing content + form
  // =========================================================================

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden" data-testid="custom-form-hero">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <div className="relative z-10">

        {/* ===== SEO LANDING PAGE SECTIONS (only for product pages, not general) ===== */}
        {landing && (
          <>
            {/* HERO */}
            <section className="relative py-24 md:py-32 overflow-hidden">
              <div className="section-container relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    {landing.heroHeadline}
                  </h1>
                  <p className="text-xl md:text-2xl text-stone font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                    {landing.heroSub}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-glacier-grey text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl">
                      Design Your {config?.title.replace('Custom ', '') || 'Piece'}
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <NextLink href="/portfolio" className="inline-block bg-white/10 border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-soft-black transition-all duration-300">
                      View Our Work
                    </NextLink>
                  </div>
                </motion.div>
                {/* 📸 IMAGE SLOT 1: Hero image placeholder — replace with real product photography */}
              </div>
            </section>

            {/* WHY CHOOSE AL-ASSALI */}
            <section className="py-20 border-t border-glacier-grey/10">
              <div className="section-container">
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

            {/* INTRO + STYLES AVAILABLE */}
            <section className="py-20 border-t border-glacier-grey/10">
              <div className="section-container">
                <div className="max-w-4xl mx-auto">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <p className="text-lg text-stone leading-relaxed mb-12">{landing.intro}</p>
                  </motion.div>
                  {/* 📸 IMAGE SLOT 2: Style showcase grid — replace with real product photography */}
                  {config && config.styles.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                        Available Styles
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {config.styles.filter(s => s !== 'Not Sure').map((style) => {
                          const StyleIcon = styleIcons[urlType]?.[style] || HelpCircle
                          return (
                            <div key={style} className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-5 text-center hover:border-glacier-grey/40 transition-all">
                              <StyleIcon className="w-8 h-8 text-glacier-grey mx-auto mb-3" />
                              <span className="text-white font-medium text-sm">{style}</span>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </section>

            {/* MATERIALS */}
            <section className="py-20 border-t border-glacier-grey/10">
              <div className="section-container">
                <div className="max-w-4xl mx-auto">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                      Materials &amp; Craftsmanship
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {config?.metals.map((metal) => (
                        <div key={metal} className="flex items-center gap-3 bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-4">
                          <div className="w-8 h-8 rounded-full border border-white/20 flex-shrink-0" style={{ background: metalSwatches[metal] || metalSwatches['Silver'] }} />
                          <span className="text-white font-medium text-sm">{metal}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-stone text-sm leading-relaxed">
                      Gold pieces are available in yellow, white, and rose gold. Every piece is crafted entirely in-house in Toronto using traditional techniques and modern precision.
                    </p>
                    {/* 📸 IMAGE SLOT 3: Portfolio / craftsmanship images */}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* FAQ — Schema eligible */}
            <section className="py-20 border-t border-glacier-grey/10">
              <div className="section-container">
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
              </div>
            </section>

            {/* EXPLORE MORE + CTA */}
            <section className="py-20 border-t border-glacier-grey/10">
              <div className="section-container">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    Ready to Start?
                  </h2>
                  <p className="text-stone text-lg mb-8">Fill out the form below to begin your custom {config?.title.replace('Custom ', '').toLowerCase() || 'piece'} journey.</p>
                  <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-glacier-grey text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-glacier-grey-light transition-all duration-300 shadow-xl hover:shadow-2xl mb-12">
                    Start Your Design <ArrowDown className="w-4 h-4" />
                  </button>
                  <div className="flex flex-wrap justify-center gap-4">
                    {landing.relatedPages.map((page) => (
                      <NextLink key={page.path} href={page.path} className="text-glacier-grey text-sm font-medium hover:text-glacier-grey-light hover:underline transition-all">
                        {page.name} →
                      </NextLink>
                    ))}
                  </div>
                </div>
              </div>
            </section>

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
          </>
        )}

        {/* ===== INQUIRY FORM ===== */}
        <div ref={formRef}>
        {/* Header */}
        <div className="border-b border-glacier-grey/20 bg-deep-charcoal/50 backdrop-blur-sm">
          <div className="section-container py-12">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-glacier-grey" />
                <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {landing ? 'Start Your Inquiry' : headerTitle}
                </h2>
              </div>
              <p className="text-xl text-stone font-light max-w-3xl mx-auto">{landing ? 'Fill out the details below and we\'ll get back to you within 24-48 hours.' : headerSubtitle}</p>
            </motion.div>
          </div>
        </div>

        {/* Form body — single scroll */}
        <div className="section-container py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
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
                <form onSubmit={handleSubmit} className="space-y-0">

                  {/* ===== 1. CONTACT ===== */}
                  <Section id="contact" title="Let's Get Started" subtitle="Tell us a bit about yourself">
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
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="john@example.com" />
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="+1 (416) 555-1234" />
                    </div>
                  </Section>

                  {/* ===== 2. BUDGET ===== */}
                  <Section id="budget" title="Your Budget" subtitle="Select the range that fits your vision">
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
                  </Section>

                  {/* ===== 3. PIECE TYPE (only if coming from /custom/general) ===== */}
                  {!isDirectType && (
                    <Section id="piece-type" title="What Are You Looking For?" subtitle="Select the type of custom piece you'd like us to create">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {pieceTypeOptions.map(({ value, label, icon: PIcon, subtitle: sub }) => {
                          const selected = formData.pieceType === value
                          return (
                            <button key={value} type="button" onClick={() => selectPieceType(value)} className={`${cardBase} p-6 min-h-[160px] ${selected ? cardSelected : cardUnselected}`}>
                              <PIcon className={`w-10 h-10 mb-3 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                              <span className="text-white font-semibold text-sm mb-1">{label}</span>
                              <span className="text-stone text-xs text-center leading-tight">{sub}</span>
                            </button>
                          )
                        })}
                      </div>
                    </Section>
                  )}

                  {/* ===== Everything below only renders once a piece type is selected ===== */}
                  <AnimatePresence>
                    {formData.pieceType && (
                      <motion.div
                        key={formData.pieceType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                      >

                        {/* ===== 4. STYLE (conditional — hidden for 'other') ===== */}
                        {showStyle && (
                          <Section id="style" title="Choose Your Style" subtitle="Select the style that speaks to you" refProp={styleRef}>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {config!.styles.map((style: string) => {
                                const Icon = styleIcons[activeType]?.[style] || HelpCircle
                                const selected = formData.style === style
                                return (
                                  <button key={style} type="button" onClick={() => setFormData(prev => ({ ...prev, style }))} className={`${cardBase} p-6 min-h-[140px] ${selected ? cardSelected : cardUnselected}`}>
                                    <Icon className={`w-10 h-10 mb-3 ${selected ? 'text-glacier-grey' : 'text-glacier-grey/60'}`} />
                                    <span className="text-white font-medium text-sm text-center">{style}</span>
                                  </button>
                                )
                              })}
                            </div>
                          </Section>
                        )}

                        {/* For 'other' — style ref target so scroll still works */}
                        {!showStyle && <div ref={styleRef} />}

                        {/* ===== 5. METAL + GOLD COLOUR ===== */}
                        <Section id="metal" title="Select Your Metal" subtitle="Choose your preferred metal type">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {config!.metals.map((metal: string) => {
                              const selected = formData.metalType === metal
                              return (
                                <button key={metal} type="button" onClick={() => selectMetal(metal)} className={`${cardBase} p-6 min-h-[130px] ${selected ? cardSelected : cardUnselected}`}>
                                  <div className="w-10 h-10 rounded-full mb-3 border border-white/20" style={{ background: metalSwatches[metal] || metalSwatches['Silver'], boxShadow: selected ? '0 0 14px rgba(200,170,80,0.3)' : 'none' }} />
                                  <span className="text-white font-medium text-sm text-center">{metal}</span>
                                </button>
                              )
                            })}
                          </div>
                          {formData.metalType.includes('Gold') && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
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
                        </Section>

                        {/* ===== 6. STONES (hidden for grillz) ===== */}
                        {showStones && (
                          <Section id="stones" title="Stone Preferences" subtitle="Select one or more stones for your piece">
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
                            {formData.stonePreferences.includes('Diamond') && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
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
                          </Section>
                        )}

                        {/* ===== 7. INSPIRATION PHOTOS ===== */}
                        <Section id="photos" title="Share Your Inspiration" subtitle="Upload images that inspire you. This helps us understand your vision better.">
                          <div className="relative border-2 border-dashed border-glacier-grey/30 rounded-xl p-12 text-center bg-white/5 hover:bg-white/10 transition-all">
                            <Upload className="w-16 h-16 text-glacier-grey mx-auto mb-4" />
                            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" disabled={uploading} />
                            <label htmlFor="file-upload" className="inline-block bg-glacier-grey text-white px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-glacier-grey-light transition-all">
                              {uploading ? 'Uploading...' : 'Choose Images'}
                            </label>
                            <p className="text-sm text-stone mt-3">PNG, JPG up to 10MB each</p>
                          </div>
                          {formData.inspirationImages.length > 0 && (
                            <div className="mt-6">
                              <p className="text-white">{formData.inspirationImages.length} image(s) selected</p>
                            </div>
                          )}
                        </Section>

                        {/* ===== 8. SIZE (conditional label) ===== */}
                        <Section id="size" title="Size & Dimensions" subtitle="Tell us your measurements so we can craft a perfect fit">
                          <div>
                            <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">{activeSizeConfig.label}</label>
                            <input type="text" name="size" value={formData.size} onChange={handleInputChange} className={inputClass} placeholder={activeSizeConfig.placeholder} />
                          </div>
                          <div className="mt-6 p-5 bg-white/5 rounded-xl border border-glacier-grey/10">
                            <p className="text-stone text-sm leading-relaxed">Not sure of your size? Don&apos;t worry — we can help determine the perfect fit during your consultation.</p>
                          </div>
                        </Section>

                        {/* ===== 9. TIMELINE ===== */}
                        <Section id="timeline" title="Your Timeline" subtitle="When do you need your piece?">
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
                        </Section>

                        {/* ===== 10. NOTES ===== */}
                        <Section id="notes" title="Anything Else?" subtitle="Share any additional details, special engravings, or references that will help bring your vision to life">
                          <div>
                            <label className="block text-sm font-medium text-glacier-grey mb-2 uppercase tracking-wide">Additional Notes</label>
                            <textarea
                              name="notes"
                              value={formData.notes}
                              onChange={handleInputChange}
                              rows={5}
                              className={inputClass}
                              placeholder="Tell us more about your vision..."
                            />
                          </div>
                        </Section>

                        {/* ===== SUBMIT ===== */}
                        <div className="border-t border-glacier-grey/15 pt-10 mt-10">
                          <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-glacier-grey text-white text-lg font-semibold hover:bg-glacier-grey-light transition-all shadow-lg hover:shadow-xl"
                          >
                            Submit Your Inquiry
                          </button>
                          <p className="text-center text-stone text-sm mt-4">
                            We&apos;ll review your request and get back to you within 24-48 hours.
                          </p>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>
              </div>
            </motion.div>
          </div>
        </div>
        </div>{/* end formRef */}
      </div>
    </div>
  )
}
