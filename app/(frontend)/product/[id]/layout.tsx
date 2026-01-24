import type { Metadata } from 'next'
import { getPayloadInstance } from '@/lib/payload'
import { getImageUrl } from '@/lib/getImageUrl'
import { getServerSideURL } from '@/lib/getURL'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

type Props = { children: React.ReactNode; params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayloadInstance()
  if (!payload) return {}

  try {
    const doc = await payload.findByID({ collection: 'gallery', id, depth: 1 })
    if (!doc) return {}
    const title = doc.title ? `${doc.title} | Alassali Jewelry` : 'Alassali Jewelry'
    const description = (doc.description as string) || 'Custom jewelry by Alassali Jewelry, Toronto.'
    const img = doc.image && typeof doc.image === 'object' ? getImageUrl(doc.image as any) : null
    const ogImage = img && !img.includes('placeholder') ? (img.startsWith('http') ? img : `${getServerSideURL()}${img}`) : undefined
    return {
      title,
      description,
      openGraph: mergeOpenGraph({
        title,
        description,
        images: ogImage ? [{ url: ogImage }] : undefined,
      }),
    }
  } catch {
    return {}
  }
}

export default function ProductLayout({ children }: Props) {
  return <>{children}</>
}
