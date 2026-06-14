const customSlugs = [
  'engagement-rings',
  'wedding-bands',
  'rings',
  'pendants',
  'earrings',
  'bracelets',
  'grillz',
]

// "chains" conflicts with the /chains collection route, so custom chains uses /chains-custom
const CHAINS_CUSTOM_PUBLIC = '/chains-custom'
const CHAINS_CUSTOM_INTERNAL = '/custom/chains'

const FORM_PUBLIC = '/custom-form'
const FORM_INTERNAL = '/custom/general'
const FORM_LEGACY = '/custom-general'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.datocms-assets.com' },
      { protocol: 'https', hostname: '*.datocms-assets.com' },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: { reactCompiler: false },

  async rewrites() {
    return [
      // Clean URLs → internal /custom/[type] routes
      ...customSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/custom/${slug}`,
      })),
      // /chains-custom → /custom/chains (avoid conflict with /chains collection)
      { source: CHAINS_CUSTOM_PUBLIC, destination: CHAINS_CUSTOM_INTERNAL },
      // /custom-form → /custom/general
      { source: FORM_PUBLIC, destination: FORM_INTERNAL },
    ]
  },

  async redirects() {
    return [
      // === CLEAN URL REDIRECTS ===
      // /custom/X → /X (remove /custom prefix from URLs)
      ...customSlugs.map((slug) => ({
        source: `/custom/${slug}`,
        destination: `/${slug}`,
        permanent: true,
      })),
      // /custom/chains → /chains-custom
      { source: '/custom/chains', destination: CHAINS_CUSTOM_PUBLIC, permanent: true },

      // === OLD FLAT URLs → clean URLs ===
      ...customSlugs.map((slug) => ({
        source: `/custom-${slug}`,
        destination: `/${slug}`,
        permanent: true,
      })),
      // /custom-chains → /chains-custom
      { source: '/custom-chains', destination: CHAINS_CUSTOM_PUBLIC, permanent: true },

      // === TORONTO LOCATION REDIRECTS ===
      // /custom-X-toronto → /toronto/custom-X
      ...customSlugs.map((slug) => ({
        source: `/custom-${slug}-toronto`,
        destination: `/toronto/custom-${slug}`,
        permanent: true,
      })),
      { source: '/custom-chains-toronto', destination: '/toronto/custom-chains', permanent: true },

      // === FORM REDIRECTS ===
      { source: FORM_INTERNAL, destination: FORM_PUBLIC, permanent: true },
      { source: FORM_LEGACY, destination: FORM_PUBLIC, permanent: true },

      // === SPELLING FIXES ===
      {
        source: '/about/master-jeweler/:path*',
        destination: '/about/master-jeweller/:path*',
        permanent: true,
      },
      {
        source: '/blog/arabic-calligraphy-jewelry-toronto',
        destination: '/blog/arabic-calligraphy-jewellery-toronto',
        permanent: true,
      },

      // === OLD SERVICE AREA PAGES ===
      { source: '/service-areas', destination: '/', permanent: true },
      { source: '/toronto/oakwood-vaughan', destination: '/toronto', permanent: true },
      { source: '/toronto/yorkville', destination: '/toronto', permanent: true },
      { source: '/toronto/north-york', destination: '/toronto', permanent: true },
      { source: '/toronto/etobicoke', destination: '/toronto', permanent: true },
      { source: '/toronto/scarborough', destination: '/toronto', permanent: true },
      { source: '/toronto/wychwood', destination: '/toronto', permanent: true },
      { source: '/toronto/forest-hill', destination: '/toronto', permanent: true },
      { source: '/toronto/bathurst-st-clair', destination: '/toronto', permanent: true },
      { source: '/gta/mississauga', destination: '/toronto', permanent: true },
      { source: '/gta/vaughan', destination: '/toronto', permanent: true },
      { source: '/gta/markham', destination: '/toronto', permanent: true },
    ]
  },
}

export default nextConfig
