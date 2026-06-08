/**
 * /_dato-preview/[slug] — preview route for the new Dato-driven Page model.
 *
 * Visit, for example:
 *   /_dato-preview/home
 *   /_dato-preview/custom-engagement-rings-toronto
 *   /_dato-preview/custom-grillz-toronto
 *
 * This route is intentionally outside the public sitemap (the `_dato-preview`
 * prefix). It exists so the new block-renderer can be reviewed against real
 * Dato content before any production page is rewired.
 *
 * When ready, copy the pattern below into the production routes (e.g.
 * app/(frontend)/custom/[type]/page.tsx) and delete this file.
 */
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/dato/page'
import { PageBlockRenderer } from '@/components/blocks/PageBlocks'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)
  if (!page) return { title: 'Preview · Not found' }
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || undefined,
    robots: { index: false, follow: false },
  }
}

export default async function DatoPreviewPage({
  params,
}: {
  params: { slug: string }
}) {
  const page = await getPageBySlug(params.slug)
  if (!page) notFound()
  return (
    <main className="bg-black min-h-screen">
      <div className="border-y border-yellow-500/40 bg-yellow-500/10 text-yellow-200 py-2 text-center text-xs tracking-wider">
        DATO PREVIEW · /{page.slug} · {page.contentBlocks?.length || 0} blocks · noindex
      </div>
      <PageBlockRenderer blocks={page.contentBlocks || []} />
    </main>
  )
}
