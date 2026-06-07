/**
 * Fetches Page records from the new Page model (api_key=page) with
 * content_blocks expanded for every block type defined in Dato.
 *
 * Models referenced (api_key → GraphQL type):
 *   hero_block            → HeroBlockRecord
 *   rich_text_block       → RichTextBlockRecord
 *   gallery_block         → GalleryBlockRecord
 *   image_text_block      → ImageTextBlockRecord
 *   cta_banner_block      → CtaBannerBlockRecord
 *   faq_embed_block       → FaqEmbedBlockRecord
 *   form_embed_block      → FormEmbedBlockRecord
 *   testimonials_block    → TestimonialsBlockRecord
 *   process_steps_block   → ProcessStepsBlockRecord
 *   value_props_block     → ValuePropsBlockRecord
 *   category_grid_block   → CategoryGridBlockRecord
 *   image_strip_block     → ImageStripBlockRecord
 * Sub-blocks (cta_button, value_prop_item, category_tile, process_step,
 * form_step, form_field) are returned via their *Record types.
 */
import { datocmsRequest } from '@/lib/datocms'

export type PageBlock = { id: string; __typename: string; [k: string]: any }

export interface PageRecord {
  id: string
  title: string
  slug: string
  hideFromNavigation?: boolean | null
  seo?: { title?: string | null; description?: string | null } | null
  contentBlocks: PageBlock[]
}

const PAGE_BY_SLUG_QUERY = /* GraphQL */ `
  query PageBySlug($slug: String!) {
    page(filter: { slug: { eq: $slug } }) {
      id
      title
      slug
      hideFromNavigation
      seo { title description }
      contentBlocks {
        __typename
        ... on HeroBlockRecord {
          id eyebrow heading subheading body
          backgroundImage { url alt width height }
          ctas { ... on CtaButtonRecord { id label url style } }
        }
        ... on RichTextBlockRecord {
          id
          content { value }
        }
        ... on GalleryBlockRecord {
          id heading layout
          images { url alt width height }
        }
        ... on ImageTextBlockRecord {
          id heading body side
          image { url alt width height }
          ctas { ... on CtaButtonRecord { id label url style } }
        }
        ... on CtaBannerBlockRecord {
          id heading body
          backgroundImage { url alt }
          ctas { ... on CtaButtonRecord { id label url style } }
        }
        ... on FaqEmbedBlockRecord {
          id heading description
          category {
            id name
          }
        }
        ... on FormEmbedBlockRecord {
          id heading description
          form { id slug name }
        }
        ... on TestimonialsBlockRecord {
          id heading description
          testimonials {
            id author quote rating source location
            image { url alt }
          }
        }
        ... on ProcessStepsBlockRecord {
          id heading description
          steps {
            ... on ProcessStepRecord {
              id label description
              icon { url alt }
            }
          }
        }
        ... on ValuePropsBlockRecord {
          id heading description
          props {
            ... on ValuePropItemRecord {
              id title description icon
            }
          }
        }
        ... on CategoryGridBlockRecord {
          id heading
          tiles {
            ... on CategoryTileRecord {
              id title description icon url
            }
          }
        }
        ... on ImageStripBlockRecord {
          id heading
          images { url alt width height }
        }
        ... on FaqListBlockRecord {
          id heading description
          items {
            ... on FaqQARecord {
              id question answer
            }
          }
        }
      }
    }
  }
`

export async function getPageBySlug(slug: string): Promise<PageRecord | null> {
  try {
    const data = await datocmsRequest<{ page: PageRecord | null }>({
      query: PAGE_BY_SLUG_QUERY,
      variables: { slug },
    })
    return data?.page ?? null
  } catch (err) {
    console.error('[dato/page] getPageBySlug failed:', err)
    return null
  }
}
