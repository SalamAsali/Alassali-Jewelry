const PLACEHOLDER = 'https://via.placeholder.com/400'

type ImageLike =
  | string
  | {
      url?: string
      filename?: string
      responsiveImage?: { src?: string; base64?: string }
    }
  | null
  | undefined

export function getImageUrl(image: ImageLike): string {
  if (typeof image === 'string') return image
  if (!image || typeof image !== 'object') return PLACEHOLDER

  if (image.url) return image.url

  const datoImg = image as { responsiveImage?: { src?: string } }
  if (datoImg.responsiveImage?.src) return datoImg.responsiveImage.src

  return PLACEHOLDER
}
