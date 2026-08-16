import 'server-only'

import { sanityFetch } from '@/lib/sanity'
import { resolveLanding, withoutChainReferences, type LandingEntry } from '@/lib/bespoke/content'
import { bespokePath, type City } from '@/lib/locations'

/**
 * Shape of the `bespoke` object on a Sanity `page` document. Everything is
 * optional — the CMS only ever *overrides* the built-in copy.
 */
type SanityBespoke = {
  heroH1?: string | null
  heroSub?: string | null
  intro?: string | null
  processNote?: string | null
  budgetGuide?: string | null
  stoneNote?: string | null
  differentiator?: string | null
  faq?: Array<{ question?: string | null; answer?: string | null }> | null
  shapeBlurbs?: Array<{ shape?: string | null; blurb?: string | null }> | null
  crossLink?: Array<{ text?: string | null; path?: string | null }> | null
  relatedPages?: Array<{ name?: string | null; path?: string | null }> | null
}

type SanityPage = { bespoke?: SanityBespoke | null; seo?: { title?: string | null; description?: string | null } | null }

/** Treat blank strings as "not set" so an empty CMS field falls back rather than blanking the page. */
const text = (v?: string | null) => {
  const t = (v ?? '').trim()
  return t.length > 0 ? t : undefined
}

async function fetchPage(slug: string): Promise<SanityPage | null> {
  try {
    return await sanityFetch<SanityPage | null>({
      query: `*[_type == "page" && slug.current == $slug][0]{ seo, bespoke }`,
      params: { slug },
      tags: ['page', `page:${slug}`],
    })
  } catch {
    // CMS unavailable — the page still renders from its built-in copy.
    return null
  }
}

/**
 * Built-in copy with any Sanity overrides layered on top, field by field.
 *
 * Falling back per field (rather than per document) is deliberate: a partly
 * filled CMS entry can never produce a partly blank page, and if Sanity is
 * unreachable the page renders exactly as it does today.
 */
export async function getBespokeLanding(
  type: string,
  city: City
): Promise<{ landing: LandingEntry | null; seo: { title?: string; description?: string } }> {
  const base = resolveLanding(type, city)
  if (!base) return { landing: null, seo: {} }

  const slug = bespokePath(type, city).replace(/^\//, '')
  const doc = await fetchPage(slug)
  const b = doc?.bespoke
  const seo = {
    title: text(doc?.seo?.title),
    description: text(doc?.seo?.description),
  }
  if (!b) return { landing: base, seo }

  const faq = (b.faq ?? [])
    .map((x) => ({ q: text(x.question), a: text(x.answer) }))
    .filter((x): x is { q: string; a: string } => Boolean(x.q && x.a))

  const shapeBlurbs = (b.shapeBlurbs ?? []).reduce<Record<string, string>>((acc, x) => {
    const shape = text(x.shape)
    const blurb = text(x.blurb)
    if (shape && blurb) acc[shape] = blurb
    return acc
  }, {})

  const crossLink = (b.crossLink ?? [])
    .map((p) => {
      const t = p.text ?? ''
      const path = text(p.path)
      return path ? { anchor: t, path } : t
    })
    .filter((p) => (typeof p === 'string' ? p.length > 0 : Boolean(p.anchor)))

  const relatedPages = (b.relatedPages ?? [])
    .map((r) => ({ name: text(r.name), path: text(r.path) }))
    .filter((r): r is { name: string; path: string } => Boolean(r.name && r.path))

  return {
    // Re-filter after the merge: CMS-managed relatedPages/crossLink can link
    // to custom-chains, which must stay hidden while chains are paused.
    landing: withoutChainReferences({
      ...base,
      heroH1: text(b.heroH1) ?? base.heroH1,
      heroSub: text(b.heroSub) ?? base.heroSub,
      intro: text(b.intro) ?? base.intro,
      processNote: text(b.processNote) ?? base.processNote,
      budgetGuide: text(b.budgetGuide) ?? base.budgetGuide,
      stoneNote: text(b.stoneNote) ?? base.stoneNote,
      differentiator: text(b.differentiator) ?? base.differentiator,
      faq: faq.length > 0 ? faq : base.faq,
      shapeBlurbs: Object.keys(shapeBlurbs).length > 0 ? shapeBlurbs : base.shapeBlurbs,
      crossLink: crossLink.length > 0 ? crossLink : base.crossLink,
      relatedPages: relatedPages.length > 0 ? relatedPages : base.relatedPages,
    }),
    seo,
  }
}
