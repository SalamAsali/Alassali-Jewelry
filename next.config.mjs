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
      { source: FORM_PUBLIC, destination: FORM_INTERNAL },
    ]
  },

  async redirects() {
    return [
      // === LOCATION PAGE REDIRECTS ===
      // Old /custom-X-toronto → /toronto/custom-X (preserve backlink equity)
      ...customSlugs.map((slug) => ({
        source: `/custom-${slug}-toronto`,
        destination: `/toronto/custom-${slug}`,
        permanent: true,
      })),
      // Old flat /custom-X → general /custom/X (restore general pages)
      ...customSlugs.map((slug) => ({
        source: `/custom-${slug}`,
        destination: `/custom/${slug}`,
        permanent: true,
      })),

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
