import { getMasterJeweller } from './sanity'

export type MasterJewelerData = {
  slug: string
  name?: string | null
  title?: string | null
  tagline?: string | null
  bio?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
}

export async function getMasterJeweler(_slug: string): Promise<MasterJewelerData | null> {
  try {
    const data = await getMasterJeweller()
    if (!data) return null
    return {
      slug: data.slug?.current ?? _slug,
      name: data.name,
      title: data.title,
      tagline: data.tagline,
      bio: data.bio,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
    }
  } catch {
    return null
  }
}
