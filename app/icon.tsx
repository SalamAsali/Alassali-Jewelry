import { ImageResponse } from 'next/og'

export const size = { width: 192, height: 192 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.alasalicustomjewelry.ca/images/icon-dark.png"
          alt=""
          width={160}
          height={160}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  )
}
