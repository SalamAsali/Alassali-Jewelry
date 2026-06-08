/**
 * PageBlocks — renderers for every block type stored in Dato's Page model.
 *
 * Block types are matched by GraphQL __typename. Each renderer is a small,
 * self-contained Tailwind component using the site's dark palette
 * (bg-black, charcoal, glacier-grey, stone). Drop-in replacements for any
 * hardcoded section.
 *
 * Usage:
 *   import { PageBlockRenderer } from '@/components/blocks/PageBlocks'
 *   <PageBlockRenderer blocks={page.contentBlocks} />
 *
 * Where `page` comes from `getPageBySlug(slug)` in @/lib/dato/page.
 */
import Image from 'next/image'
import Link from 'next/link'
import { StructuredText } from 'react-datocms/structured-text'
import type { PageBlock } from '@/lib/dato/page'
import ClientLiveReviewsStrip from '@/components/reviews/ClientLiveReviewsStrip'
import dynamic from 'next/dynamic'
import {
  Diamond, Heart, Circle, Layers, Link2, CircleDot, Gem, Flame,
  MapPin, Shield, Star, Leaf, HandHeart, Sparkles, type LucideIcon,
} from 'lucide-react'

// Maps the icon-string fields editors store on category tiles and value
// props to actual Lucide icon components. Add more entries as new icon
// names are introduced.
const ICON_MAP: Record<string, LucideIcon> = {
  // Category tiles (match the original hardcoded component icon choices)
  'engagement-rings': Diamond,
  'bridal-bands': Heart,
  'wedding-bands': Heart,
  'rings': Circle,
  'pendants': Layers,
  'chains': Link2,
  'earrings': CircleDot,
  'bracelets': Gem,
  'grillz': Flame,
  // Value props
  'map-pin': MapPin,
  'shield': Shield,
  'gem': Gem,
  'star': Star,
  'leaf': Leaf,
  'heart-handshake': HandHeart,
  'diamond': Diamond,
  'sparkles': Sparkles,
}

function IconFromName({ name, className = 'w-6 h-6' }: { name?: string | null; className?: string }) {
  if (!name) return null
  const I = ICON_MAP[name.toLowerCase()]
  if (!I) return null
  return <I className={className} aria-hidden />
}

// Lazy-load the heavy bespoke sections so they only ship when an embedded
// component block actually appears on a page.
const StoneShapeSection = dynamic(() => import('@/components/bespoke/StoneShapeSection'))
const NaturalVsLabSection = dynamic(() => import('@/components/bespoke/NaturalVsLabSection'))
const GrillzConfigSection = dynamic(() => import('@/components/bespoke/GrillzConfigSection'))
const PendantsHeritageSection = dynamic(() => import('@/components/bespoke/PendantsHeritageSection'))
const LocationSection = dynamic(() => import('@/components/bespoke/LocationSection'))

// ---------- shared atoms ----------

function Cta({ label, url, style }: { label: string; url: string; style?: string }) {
  const cls =
    style === 'secondary'
      ? 'border border-glacier-grey/40 text-white hover:bg-white/5'
      : style === 'ghost'
      ? 'text-white hover:underline'
      : 'bg-white text-black hover:bg-stone'
  return (
    <Link
      href={url}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-bold tracking-widest uppercase transition ${cls}`}
    >
      {label}
    </Link>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">{children}</h2>
  )
}

function SectionLead({ children }: { children: React.ReactNode }) {
  return <p className="text-stone text-center max-w-2xl mx-auto mb-10">{children}</p>
}

// ---------- block renderers ----------

function HeroBlock({ b }: { b: PageBlock }) {
  return (
    <section className="relative overflow-hidden bg-black text-white py-20 md:py-32">
      {b.backgroundImage?.url && (
        <Image
          src={b.backgroundImage.url}
          alt={b.backgroundImage.alt || ''}
          fill
          priority
          className="object-cover opacity-25"
        />
      )}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {b.eyebrow && (
          <p className="text-glacier-grey text-xs tracking-[0.25em] uppercase mb-4">{b.eyebrow}</p>
        )}
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">{b.heading}</h1>
        {b.subheading && (
          <p className="text-xl md:text-2xl text-stone mb-6">{b.subheading}</p>
        )}
        {b.body && <p className="text-stone max-w-3xl mx-auto mb-8 leading-relaxed">{b.body}</p>}
        {b.ctas?.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {b.ctas.map((c: any) => (
              <Cta key={c.id} label={c.label} url={c.url} style={c.style} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function RichTextBlock({ b }: { b: PageBlock }) {
  return (
    <section className="bg-charcoal/30 py-12">
      <div className="max-w-3xl mx-auto px-6 prose prose-invert prose-headings:text-white prose-li:text-stone prose-p:text-stone">
        {b.content?.value && <StructuredText data={b.content} />}
      </div>
    </section>
  )
}

function GalleryBlock({ b }: { b: PageBlock }) {
  const layout = b.layout || 'grid'
  return (
    <section className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        {b.heading && <SectionHeading>{b.heading}</SectionHeading>}
        <div
          className={
            layout === 'masonry'
              ? 'columns-2 md:columns-3 gap-4 space-y-4'
              : layout === 'carousel'
              ? 'flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2'
              : 'grid grid-cols-2 md:grid-cols-4 gap-4'
          }
        >
          {(b.galleryImages || b.images || []).map((img: any, i: number) => (
            <div
              key={i}
              className={layout === 'carousel' ? 'flex-none w-72 snap-start' : ''}
            >
              <Image
                src={img.url}
                alt={img.alt || ''}
                width={img.width || 600}
                height={img.height || 600}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImageTextBlock({ b }: { b: PageBlock }) {
  const right = b.side === 'right'
  return (
    <section className="bg-charcoal/30 py-16">
      <div
        className={`max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center ${
          right ? 'md:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div>
          {b.image?.url && (
            <Image
              src={b.image.url}
              alt={b.image.alt || ''}
              width={b.image.width || 800}
              height={b.image.height || 600}
              className="w-full h-auto rounded-lg object-cover"
            />
          )}
        </div>
        <div>
          {b.heading && (
            <h2 className="text-3xl font-bold text-white mb-4">{b.heading}</h2>
          )}
          {b.body && <p className="text-stone leading-relaxed mb-6">{b.body}</p>}
          {b.ctas?.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {b.ctas.map((c: any) => (
                <Cta key={c.id} label={c.label} url={c.url} style={c.style} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CtaBannerBlock({ b }: { b: PageBlock }) {
  return (
    <section className="relative bg-black py-20 overflow-hidden">
      {b.backgroundImage?.url && (
        <Image
          src={b.backgroundImage.url}
          alt={b.backgroundImage.alt || ''}
          fill
          className="object-cover opacity-30"
        />
      )}
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{b.heading}</h2>
        {b.body && <p className="text-stone mb-8">{b.body}</p>}
        {b.ctas?.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {b.ctas.map((c: any) => (
              <Cta key={c.id} label={c.label} url={c.url} style={c.style} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function FaqEmbedBlock({ b }: { b: PageBlock }) {
  // FAQs aren't expanded in this query; only the linked category is present.
  // A future pass can fetch FAQs by category. For now, render as a link.
  return (
    <section className="bg-charcoal/30 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {b.heading && <SectionHeading>{b.heading}</SectionHeading>}
        {b.description && <SectionLead>{b.description}</SectionLead>}
        {b.category && (
          <Link
            href="/faq"
            className="inline-block text-glacier-grey hover:text-white underline underline-offset-4"
          >
            See all FAQs ({b.category.name}) →
          </Link>
        )}
      </div>
    </section>
  )
}

function FormEmbedBlock({ b }: { b: PageBlock }) {
  return (
    <section className="bg-black py-16 text-center">
      <div className="max-w-3xl mx-auto px-6">
        {b.heading && <SectionHeading>{b.heading}</SectionHeading>}
        {b.description && <SectionLead>{b.description}</SectionLead>}
        {b.form?.slug && (
          <Link
            href={`/custom-form?form=${b.form.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-stone"
          >
            Open form
          </Link>
        )}
      </div>
    </section>
  )
}

function TestimonialsBlock({ b }: { b: PageBlock }) {
  return (
    <section className="bg-charcoal/30 py-16">
      <div className="max-w-5xl mx-auto px-6">
        {b.heading && <SectionHeading>{b.heading}</SectionHeading>}
        {b.description && <SectionLead>{b.description}</SectionLead>}
        <div className="grid md:grid-cols-3 gap-6">
          {(b.testimonials || []).map((t: any) => (
            <blockquote
              key={t.id}
              className="bg-black/40 border border-glacier-grey/20 p-6 rounded-xl text-stone"
            >
              <p className="mb-4">"{t.quote}"</p>
              <footer className="text-white text-sm font-semibold">
                — {t.author}
                {t.source && <span className="text-glacier-grey font-normal"> · {t.source}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessStepsBlock({ b }: { b: PageBlock }) {
  const steps = (b.steps || []) as Array<{ id?: string; label?: string; description?: string; icon?: { url?: string } | null }>
  // If every step has the SAME icon URL, treat it as a placeholder copy-paste
  // and ignore icons entirely. The Dato `homepage` singleton ships with the
  // same icon.jpeg pasted onto all six steps — rendering it 6× looks like a
  // bug. The numbered chip below is the desired fallback in that case.
  const iconUrls = steps.map((s) => s.icon?.url).filter(Boolean)
  const allSameIcon = iconUrls.length > 1 && new Set(iconUrls).size === 1
  const useIcons = !allSameIcon
  return (
    <section className="bg-black py-16">
      <div className="max-w-5xl mx-auto px-6">
        {b.heading && <SectionHeading>{b.heading}</SectionHeading>}
        {b.description && <SectionLead>{b.description}</SectionLead>}
        <ol className="grid md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <li
              key={s.id || i}
              className="bg-charcoal/50 border border-glacier-grey/20 rounded-xl p-6"
            >
              {useIcons && s.icon?.url ? (
                <div className="mb-3">
                  <Image
                    src={s.icon.url}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              ) : (
                <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-glacier-grey/20 border border-glacier-grey/40 text-white text-sm font-bold">
                  {i + 1}
                </div>
              )}
              <div className="text-glacier-grey text-xs tracking-widest mb-2">
                STEP {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.label}</h3>
              <p className="text-stone text-sm leading-relaxed">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ValuePropsBlock({ b }: { b: PageBlock }) {
  return (
    <section className="bg-charcoal/30 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {b.heading && <SectionHeading>{b.heading}</SectionHeading>}
        {b.description && <SectionLead>{b.description}</SectionLead>}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(b.props || []).map((p: any) => (
            <div
              key={p.id}
              className="bg-black/40 border border-glacier-grey/20 p-6 rounded-xl text-center"
            >
              {p.icon && (
                <div className="mb-3 flex justify-center text-glacier-grey">
                  <IconFromName name={p.icon} className="w-7 h-7" />
                </div>
              )}
              <h3 className="text-white font-bold mb-2">{p.title}</h3>
              <p className="text-stone text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryGridBlock({ b }: { b: PageBlock }) {
  return (
    <section className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        {b.heading && <SectionHeading>{b.heading}</SectionHeading>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(b.tiles || []).map((t: any) => (
            <Link
              key={t.id}
              href={t.url}
              className="group bg-charcoal/50 border border-glacier-grey/20 p-5 rounded-xl hover:border-white/40 transition"
            >
              {t.icon && (
                <div className="mb-3 text-glacier-grey group-hover:text-white transition">
                  <IconFromName name={t.icon} className="w-8 h-8" />
                </div>
              )}
              <h3 className="text-white font-bold text-base mb-1">{t.title}</h3>
              <p className="text-stone text-xs leading-relaxed">{t.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImageStripBlock({ b }: { b: PageBlock }) {
  return (
    <section className="bg-charcoal/30 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {b.heading && (
          <h2 className="text-glacier-grey text-xs tracking-[0.25em] uppercase text-center mb-6">
            {b.heading}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(b.galleryImages || b.images || []).map((img: any, i: number) => (
            <Image
              key={i}
              src={img.url}
              alt={img.alt || ''}
              width={img.width || 400}
              height={img.height || 600}
              className="w-full h-auto rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function EmbeddedComponentBlock({ b }: { b: PageBlock }) {
  switch (b.component) {
    case 'stone-shape':
      return (
        <StoneShapeSection heading={b.heading || 'Diamond & Stone Shapes'} />
      )
    case 'natural-vs-lab':
      return <NaturalVsLabSection />
    case 'grillz-config':
      return <GrillzConfigSection />
    case 'pendants-heritage':
      return <PendantsHeritageSection />
    case 'location':
      return <LocationSection />
    default:
      if (process.env.NODE_ENV !== 'production') {
        return (
          <div className="bg-red-900/20 text-red-200 p-4 text-xs">
            Unknown embedded component: {b.component}
          </div>
        )
      }
      return null
  }
}

function GoogleReviewsBlock({ b }: { b: PageBlock }) {
  return (
    <section className="bg-charcoal/30 py-12">
      <ClientLiveReviewsStrip
        heading={b.heading || 'What Our Toronto Clients Say'}
        variant={b.variant === 'light' ? 'light' : 'dark'}
      />
    </section>
  )
}

function FaqListBlock({ b }: { b: PageBlock }) {
  return (
    <section className="bg-charcoal/30 py-16">
      <div className="max-w-3xl mx-auto px-6">
        {b.heading && <SectionHeading>{b.heading}</SectionHeading>}
        {b.description && <SectionLead>{b.description}</SectionLead>}
        <div className="space-y-3">
          {(b.items || []).map((qa: any, i: number) => (
            <details
              key={qa.id || i}
              className="group bg-charcoal/50 border border-glacier-grey/20 rounded-xl overflow-hidden hover:border-glacier-grey/40 transition"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                <h4 className="text-white font-bold text-sm md:text-base">
                  {qa.question}
                </h4>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-glacier-grey flex items-center justify-center text-white group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-stone text-sm leading-relaxed whitespace-pre-line">
                {qa.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- router ----------

const REGISTRY: Record<string, (props: { b: PageBlock }) => React.ReactNode> = {
  HeroBlockRecord: HeroBlock,
  RichTextBlockRecord: RichTextBlock,
  GalleryBlockRecord: GalleryBlock,
  ImageTextBlockRecord: ImageTextBlock,
  CtaBannerBlockRecord: CtaBannerBlock,
  FaqEmbedBlockRecord: FaqEmbedBlock,
  FaqListBlockRecord: FaqListBlock,
  GoogleReviewsBlockRecord: GoogleReviewsBlock,
  EmbeddedComponentBlockRecord: EmbeddedComponentBlock,
  FormEmbedBlockRecord: FormEmbedBlock,
  TestimonialsBlockRecord: TestimonialsBlock,
  ProcessStepsBlockRecord: ProcessStepsBlock,
  ValuePropsBlockRecord: ValuePropsBlock,
  CategoryGridBlockRecord: CategoryGridBlock,
  ImageStripBlockRecord: ImageStripBlock,
}

export function PageBlockRenderer({ blocks }: { blocks: PageBlock[] }) {
  return (
    <>
      {blocks.map((b) => {
        const Comp = REGISTRY[b.__typename]
        if (!Comp) {
          if (process.env.NODE_ENV !== 'production') {
            return (
              <div key={b.id} className="bg-red-900/20 text-red-200 p-4 text-xs">
                Unknown block type: {b.__typename}
              </div>
            )
          }
          return null
        }
        return <Comp key={b.id} b={b} />
      })}
    </>
  )
}
