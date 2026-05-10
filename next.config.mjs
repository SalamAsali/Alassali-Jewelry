// Bespoke category slugs — keep in sync with app/sitemap.ts and the
// dynamic route at app/(frontend)/custom/[type]/page.tsx
const customSlugs = [
  'engagement-rings',
  'wedding-bands',
  'rings',
  'pendants',
  'chains',
  'earrings',
  'bracelets',
  'grillz',
]

// The conversion form is the only page where the public slug diverges from
// the file-system route segment. Internally the route is /custom/general
// (and the form's pieceType state defaults to 'general'); externally the
// page lives at /custom-form, which reads better as a form-only utility.
const FORM_PUBLIC = '/custom-form'
const FORM_INTERNAL = '/custom/general'
const FORM_LEGACY = '/custom-general' // first iteration of the flat URL

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow DatoCMS image CDN
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: '*.datocms-assets.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    reactCompiler: false,
  },

  // Flat slug pattern: visitors hit /custom-<slug>; Next.js serves the
  // existing /custom/<slug> route internally. The address bar shows the
  // new URL, while the page component still reads `params.type` correctly.
  async rewrites() {
    return [
      ...customSlugs.map((slug) => ({
        source: `/custom-${slug}`,
        destination: `/custom/${slug}`,
      })),
      // /custom-form is the public-facing inquiry form URL; it's served by
      // the existing /custom/general route file.
      { source: FORM_PUBLIC, destination: FORM_INTERNAL },
    ]
  },

  // 301 the old hierarchical URLs to the new flat slugs to preserve SEO equity.
  async redirects() {
    return [
      ...customSlugs.map((slug) => ({
        source: `/custom/${slug}`,
        destination: `/custom-${slug}`,
        permanent: true,
      })),
      // Old internal route for the form → the public form URL.
      { source: FORM_INTERNAL, destination: FORM_PUBLIC, permanent: true },
      // First iteration of the flat URL (briefly indexable) → final URL.
      { source: FORM_LEGACY, destination: FORM_PUBLIC, permanent: true },
    ]
  },
}

export default nextConfig
