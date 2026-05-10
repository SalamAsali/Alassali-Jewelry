import { datocmsRequest, isDatoCMSConfigured } from './datocms'

export type MasterJewelerData = {
  slug: string
  name?: string | null
  title?: string | null
  tagline?: string | null
  bio?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
}

const MASTER_JEWELER_QUERY = `
  query MasterJeweler($slug: String!) {
    masterJeweler(filter: { slug: { eq: $slug } }) {
      slug
      name
      title
      tagline
      bio
      seoTitle
      seoDescription
    }
  }
`

type MasterJewelerQueryResult = {
  masterJeweler: MasterJewelerData | null
}

export async function getMasterJeweler(slug: string): Promise<MasterJewelerData | null> {
  if (!isDatoCMSConfigured()) return null
  try {
    const data = await datocmsRequest<MasterJewelerQueryResult>({
      query: MASTER_JEWELER_QUERY,
      variables: { slug },
    })
    return data.masterJeweler
  } catch {
    return null
  }
}
