import { datocmsRequest, isDatoCMSConfigured } from './datocms'

export type MasterJewellerData = {
  slug: string
  name?: string | null
  title?: string | null
  tagline?: string | null
  bio?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
}

const MASTER_JEWELLER_QUERY = `
  query MasterJeweller($slug: String!) {
    masterJeweller(filter: { slug: { eq: $slug } }) {
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

type MasterJewellerQueryResult = {
  masterJeweller: MasterJewellerData | null
}

export async function getMasterJeweller(slug: string): Promise<MasterJewellerData | null> {
  if (!isDatoCMSConfigured()) return null
  try {
    const data = await datocmsRequest<MasterJewellerQueryResult>({
      query: MASTER_JEWELLER_QUERY,
      variables: { slug },
    })
    return data.masterJeweller
  } catch {
    return null
  }
}
