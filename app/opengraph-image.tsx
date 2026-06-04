import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          padding: '80px',
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.alasalicustomjewelry.ca/images/logo.png"
          alt="Al-Asali Jewelry Studio"
          width={600}
          height={211}
          style={{ objectFit: 'contain', marginBottom: '48px' }}
        />

        {/* Tagline */}
        <p
          style={{
            color: '#8E9196',
            fontSize: '28px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            margin: 0,
          }}
        >
          Custom Jeweler · Toronto
        </p>

        {/* Subtle bottom border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#8E9196',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
