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
  'general',
]

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
    return customSlugs.map((slug) => ({
      source: `/custom-${slug}`,
      destination: `/custom/${slug}`,
    }))
  },

  // 301 the old hierarchical URLs to the new flat slugs to preserve SEO equity.
  async redirects() {
    return customSlugs.map((slug) => ({
      source: `/custom/${slug}`,
      destination: `/custom-${slug}`,
      permanent: true,
    }))
  },
}

export default nextConfig
