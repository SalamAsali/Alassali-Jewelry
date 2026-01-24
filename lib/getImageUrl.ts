const PLACEHOLDER = 'https://via.placeholder.com/400'

type ImageLike =
  | string
  | { url?: string; filename?: string; sizes?: { card?: { url?: string }; thumbnail?: { url?: string } } }
  | null
  | undefined

export function getImageUrl(image: ImageLike): string {
  if (typeof image === 'string') return image
  if (!image || typeof image !== 'object') return PLACEHOLDER
  if (image.url) return image.url
  const img = image as { sizes?: { card?: { url?: string }; thumbnail?: { url?: string } } }
  if (img.sizes?.card?.url) return img.sizes.card.url
  if (img.sizes?.thumbnail?.url) return img.sizes.thumbnail.url
  return PLACEHOLDER
}
