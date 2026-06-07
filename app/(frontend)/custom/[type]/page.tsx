/**
 * /custom/[type] router.
 *
 * Rewrites in next.config.mjs map public URLs to this route:
 *   /custom-engagement-rings-toronto  → /custom/engagement-rings
 *   /custom-wedding-bands-toronto     → /custom/wedding-bands
 *   /custom-rings-toronto             → /custom/rings
 *   /custom-pendants-toronto          → /custom/pendants
 *   /custom-chains-toronto            → /custom/chains
 *   /custom-earrings-toronto          → /custom/earrings
 *   /custom-bracelets-toronto         → /custom/bracelets
 *   /custom-grillz-toronto            → /custom/grillz
 *   /custom-form                      → /custom/general  (multi-step inquiry form)
 *
 * Resolution order for category slugs:
 *   1. Look up Dato Page(slug=custom-<type>-toronto).
 *      Found → render via PageBlockRenderer (editor-controlled).
 *   2. Otherwise fall back to the original hardcoded React layout
 *      (CustomTypeClient) — preserves animations, FAQ accordions, Google
 *      reviews carousel, and the StoneShape / NaturalVsLab / Grillz /
 *      Pendants sections that the renderer does not yet model.
 *
 * /custom/general is the multi-step inquiry form — it is never diverted
 * to Dato (no Page record exists for it).
 */
import { getPageBySlug } from '@/lib/dato/page'
import { PageBlockRenderer } from '@/components/blocks/PageBlocks'
import CustomTypeClient from './CustomTypeClient'

export const dynamic = 'force-dynamic'

const CATEGORY_TYPES = new Set([
  'engagement-rings',
  'wedding-bands',
  'rings',
  'pendants',
  'chains',
  'earrings',
  'bracelets',
  'grillz',
])

export default async function CustomTypePage({
  params,
}: {
  params: { type: string }
}) {
  const type = params?.type

  if (type && CATEGORY_TYPES.has(type)) {
    const page = await getPageBySlug(`custom-${type}-toronto`)
    if (page && page.contentBlocks && page.contentBlocks.length > 0) {
      return (
        <main className="bg-black min-h-screen">
          <PageBlockRenderer blocks={page.contentBlocks} />
        </main>
      )
    }
  }

  // Fallback: original hardcoded experience (form route, missing Dato record,
  // or unknown type — CustomTypeClient handles its own routing internally).
  return <CustomTypeClient />
}
