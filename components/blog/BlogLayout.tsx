import { ReactNode } from 'react'
import NextLink from 'next/link'
import { ArrowRight, Calendar, Hammer } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import { MASTER_JEWELLER } from '@/lib/seo/siteConfig'

type Props = {
  title: string
  subtitle?: string
  datePublished: string
  readingMinutes?: number
  children: ReactNode
  relatedLinks?: { label: string; href: string }[]
}

export default function BlogLayout({
  title,
  subtitle,
  datePublished,
  readingMinutes,
  children,
  relatedLinks,
}: Props) {
  const formattedDate = new Date(datePublished).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden">
      <DotPattern />
      <DiamondPattern className="text-white" />

      <article className="relative z-10 max-w-3xl mx-auto px-4 py-20 md:py-24">
        <header className="mb-10 border-b border-glacier-grey/20 pb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-glacier-grey mb-5">
            <NextLink href="/" className="hover:text-white transition-colors">Home</NextLink>
            <span>·</span>
            <span className="uppercase tracking-widest">Blog</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-stone leading-relaxed mb-6">{subtitle}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone">
            <span className="inline-flex items-center gap-1.5">
              <Hammer className="w-3.5 h-3.5 text-glacier-grey" />
              By {MASTER_JEWELLER.name}, Master Jeweller
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-glacier-grey" />
              {formattedDate}
            </span>
            {readingMinutes != null && (
              <>
                <span>·</span>
                <span>{readingMinutes} min read</span>
              </>
            )}
          </div>
        </header>

        <div className="prose-blog text-stone leading-relaxed space-y-6">
          {children}
        </div>

        {relatedLinks && relatedLinks.length > 0 && (
          <aside className="mt-14 pt-10 border-t border-glacier-grey/20">
            <h2 className="text-sm uppercase tracking-widest text-glacier-grey font-medium mb-5">Related</h2>
            <ul className="space-y-2">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <NextLink
                    href={link.href}
                    className="inline-flex items-center gap-2 text-white hover:text-glacier-grey transition-colors"
                  >
                    {link.label} <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mt-14 pt-10 border-t border-glacier-grey/20 text-center">
          <NextLink
            href="/custom/general"
            className="inline-flex items-center gap-2 bg-glacier-grey text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-glacier-grey-light transition-all"
          >
            Start Your Custom Project <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>
      </article>
    </div>
  )
}
