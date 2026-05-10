import Image from 'next/image'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import PortfolioGrid, { PortfolioGridItem } from '@/components/portfolio/PortfolioGrid'
import { getPortfolio } from '@/lib/getPortfolio'

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

const FALLBACK_HEADING = 'PORTFOLIO'

const FALLBACK_CATEGORIES = [
  'Rings',
  'Pendants',
  'Chains',
  'Grillz',
  'Bracelets',
  'Glasses',
  'Engagement Rings',
]

const FALLBACK_ITEMS: PortfolioGridItem[] = [
  { id: 'bracelets-1', name: 'Gold Cuban Link Bracelet with Pave Diamond Clasp', category: 'Bracelets', image: '/images/portfolio/bracelets-cuban-link-bracelet.jpg' },
  { id: 'chains-1', name: 'Sterling Silver Heavy Cuban Link Chain', category: 'Chains', image: '/images/portfolio/chains-silver-cuban-link.jpg' },
  { id: 'chains-2', name: 'Sterling Silver Miami Cuban Link Choker', category: 'Chains', image: '/images/portfolio/chains-cuban-link-choker.jpg' },
  { id: 'engagement-1', name: 'Oval Diamond Halo Engagement Ring with Pave Band', category: 'Engagement Rings', image: '/images/portfolio/engagement-oval-halo-ring.jpg' },
  { id: 'glasses-1', name: 'Rimless Diamond-Bridge Sunglasses in Gold', category: 'Glasses', image: '/images/portfolio/glasses-diamond-bridge.jpg' },
  { id: 'glasses-2', name: 'Diamond-Accented Rimless Sunglasses Duo', category: 'Glasses', image: '/images/portfolio/glasses-rimless-duo.jpg' },
  { id: 'grillz-1', name: 'Sterling Silver Full Set Grillz', category: 'Grillz', image: '/images/portfolio/grillz-silver-full-set.jpg' },
  { id: 'grillz-2', name: 'White Gold Single-Tooth Open-Face Grill', category: 'Grillz', image: '/images/portfolio/grillz-single-open-face.jpg' },
  { id: 'grillz-3', name: 'Gold Open-Face Fang Grillz Set', category: 'Grillz', image: '/images/portfolio/grillz-gold-fang-set.jpg' },
  { id: 'grillz-4', name: 'Gold Single-Tooth Canine Grill', category: 'Grillz', image: '/images/portfolio/grillz-gold-single-canine.jpg' },
  { id: 'grillz-5', name: 'Gold 6-Piece Bottom Grillz Set', category: 'Grillz', image: '/images/portfolio/grillz-gold-bottom-set.png' },
  { id: 'pendants-1', name: 'Rose Gold Khanda Medallion Pendant', category: 'Pendants', image: '/images/portfolio/pendants-khanda-medallion.jpg' },
  { id: 'pendants-2', name: 'Gold Script "Dima" Custom Name Necklace', category: 'Pendants', image: '/images/portfolio/pendants-dima-name-necklace.png' },
  { id: 'pendants-3', name: 'Gold Iced-Out Photo Medallion Pendants', category: 'Pendants', image: '/images/portfolio/pendants-photo-medallions.jpg' },
  { id: 'pendants-4', name: 'Gold Script "Zayden" Custom Name Necklace', category: 'Pendants', image: '/images/portfolio/pendants-zayden-name-necklace.jpg' },
  { id: 'pendants-5', name: 'Sterling Silver "Demons" Custom Pendant', category: 'Pendants', image: '/images/portfolio/pendants-demons-custom.jpg' },
  { id: 'pendants-6', name: 'Gold Diamond-Pave "G" Initial Pendant', category: 'Pendants', image: '/images/portfolio/pendants-g-initial.jpg' },
  { id: 'rings-1', name: 'Gold Anchor Chain-Link Band Ring', category: 'Rings', image: '/images/portfolio/rings-anchor-chain-band.jpg' },
  { id: 'rings-2', name: 'Sterling Silver "SA" Monogram Signet Ring', category: 'Rings', image: '/images/portfolio/rings-sa-signet.jpg' },
  { id: 'rings-3', name: 'Sterling Silver Crown of Thorns Band', category: 'Rings', image: '/images/portfolio/rings-crown-thorns-band.jpg' },
  { id: 'rings-4', name: 'Gold Butterfly Wrap Ring', category: 'Rings', image: '/images/portfolio/rings-butterfly-wrap.jpg' },
  { id: 'rings-5', name: 'Full Pave Diamond Dome Pinky Ring Duo', category: 'Rings', image: '/images/portfolio/rings-pave-dome-duo.png' },
  { id: 'rings-6', name: 'Iced-Out Gothic "03" Number Ring', category: 'Rings', image: '/images/portfolio/rings-03-number.jpg' },
]

export default async function PortfolioPage() {
  const cms = await getPortfolio()

  const heading = cms?.page?.heading?.trim() || FALLBACK_HEADING
  const intro = cms?.page?.intro?.trim() || null

  const categoryNames =
    cms && cms.categories.length > 0
      ? cms.categories.map((c) => c.name)
      : FALLBACK_CATEGORIES

  const items: PortfolioGridItem[] =
    cms && cms.items.length > 0
      ? cms.items.map((it) => ({
          id: it.id,
          name: it.name,
          category: it.category?.name ?? 'Uncategorized',
          image: it.image?.url ?? '/images/icon-transparent.png',
        }))
      : FALLBACK_ITEMS

  const categories = ['All', ...categoryNames]

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center bg-soft-black text-white overflow-hidden">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <FloatingDiamonds />
        <div className="section-container py-20 relative z-10 text-center">
          <h1
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {heading}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-warm-gray whitespace-pre-line">
              {intro}
            </p>
          ) : null}
        </div>
      </section>

      <PortfolioGrid items={items} categories={categories} />
    </>
  )
}
