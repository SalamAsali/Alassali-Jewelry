/**
 * Homepage router.
 *
 * Resolution order:
 *   1. Look up Dato Page(slug=home).
 *      Found AND has at least 3 content blocks → render via PageBlockRenderer
 *      (editor-controlled). 3 is a sanity floor: it ensures the editor has
 *      actually built a real layout and didn't accidentally publish an empty
 *      page that would replace the live homepage with a blank screen.
 *   2. Otherwise fall back to the original HomePageClient (with Google
 *      reviews fetched server-side and passed down).
 *
 * To force the hardcoded fallback during incident response: unpublish
 * Page(slug=home) in Dato. The route auto-reverts on the next render.
 */
import HomePageClient from './HomePageClient'
import { fetchGoogleReviews } from '@/lib/reviews/googlePlaces'
import { getPageBySlug } from '@/lib/dato/page'
import { PageBlockRenderer } from '@/components/blocks/PageBlocks'

export const dynamic = 'force-dynamic'

const MIN_BLOCKS_TO_USE_DATO = 3

export default async function Home() {
  const datoPage = await getPageBySlug('home')
  if (
    datoPage &&
    Array.isArray(datoPage.contentBlocks) &&
    datoPage.contentBlocks.length >= MIN_BLOCKS_TO_USE_DATO
  ) {
    return (
      <main className="bg-black min-h-screen">
        <PageBlockRenderer blocks={datoPage.contentBlocks} />
      </main>
    )
  }

  // Fallback — original hardcoded homepage with Google reviews
  const { reviews, rating, totalReviews, source } = await fetchGoogleReviews()
  const liveReviews =
    source === 'live' && reviews.length > 0 ? reviews : undefined
  return (
    <HomePageClient
      liveReviews={liveReviews}
      liveRating={rating}
      liveReviewCount={totalReviews}
    />
  )
}
