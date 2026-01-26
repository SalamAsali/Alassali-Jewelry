import type { Metadata } from 'next'
import { getGalleryItemById, isDatoCMSConfigured } from '@/lib/datocms'
import { getImageUrl } from '@/lib/getImageUrl'
import { getServerSideURL } from '@/lib/getURL'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

type Props = { children: React.ReactNode; params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  
  if (!isDatoCMSConfigured()) {
    return {}
  }

  try {
    const doc = await getGalleryItemById(id)
    if (!doc) return {}
    
    const title = doc.title ? `${doc.title} | Alassali Jewelry` : 'Alassali Jewelry'
    const description = doc.description || 'Custom jewelry by Alassali Jewelry, Toronto.'
    const img = doc.image ? getImageUrl(doc.image) : null
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
