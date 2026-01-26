const PLACEHOLDER = 'https://via.placeholder.com/400'

type ImageLike =
  | string
  | { 
      url?: string
      filename?: string
      // Payload CMS format
      sizes?: { card?: { url?: string }; thumbnail?: { url?: string } }
      // DatoCMS format
      responsiveImage?: { src?: string; base64?: string }
    }
  | null
  | undefined

export function getImageUrl(image: ImageLike): string {
  if (typeof image === 'string') return image
  if (!image || typeof image !== 'object') return PLACEHOLDER
  
  // Check for direct URL first (works for both Payload and DatoCMS)
  if (image.url) return image.url
  
  // DatoCMS responsive image
  const datoImg = image as { responsiveImage?: { src?: string } }
  if (datoImg.responsiveImage?.src) return datoImg.responsiveImage.src
  
  // Payload CMS sizes
  const payloadImg = image as { sizes?: { card?: { url?: string }; thumbnail?: { url?: string } } }
  if (payloadImg.sizes?.card?.url) return payloadImg.sizes.card.url
  if (payloadImg.sizes?.thumbnail?.url) return payloadImg.sizes.thumbnail.url
  
  return PLACEHOLDER
}
