import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-black text-white px-4">
      <div className="text-center max-w-md">
        <h1
          className="text-7xl md:text-8xl font-bold mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>
        <p className="text-lg text-stone mb-8">
          This page doesn&rsquo;t exist. Let&rsquo;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-glacier-grey text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-glacier-grey-light transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/custom-form"
            className="inline-block border border-glacier-grey/40 text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-charcoal transition-all"
          >
            Start a Custom Project
          </Link>
        </div>
      </div>
    </div>
  )
}
