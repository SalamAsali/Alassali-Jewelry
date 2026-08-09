import { getMasterJeweller } from './sanity'
import { normalizeCmsText } from './normalizeCms'

export type MasterJewelerData = {
  slug: string
  name?: string | null
  title?: string | null
  tagline?: string | null
  bio?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
}

// Sanity CMS stores British spellings and "Al-Assali" (double-s);
// normalizeCmsText corrects spelling, brand name, and stray dashes.
const fix = (s: string | null | undefined) => normalizeCmsText(s) ?? null

export async function getMasterJeweler(_slug: string): Promise<MasterJewelerData | null> {
  try {
    const data = await getMasterJeweller()
    if (!data) return null
    return {
      slug: data.slug?.current ?? _slug,
      name: fix(data.name),
      title: fix(data.title),
      tagline: fix(data.tagline),
      bio: fix(data.bio),
      seoTitle: fix(data.seoTitle),
      seoDescription: fix(data.seoDescription),
    }
  } catch {
    return null
  }
}
