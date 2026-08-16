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

// Cities with their own bespoke landing pages, beyond the default Toronto.
// Keep in sync with GEO_CITIES in lib/locations.ts and app/sitemap.ts.
const geoCities = ['oakville']

// TEMPORARY — the ready-made chain CATALOG is paused (the bespoke
// /custom-chains-* pages stay live). Keep in sync with lib/featureFlags.ts
// (next.config cannot import TS). While false, the catalog URLs 307 to the
// homepage; flip both flags to true to restore them. Deliberately temporary
// (307, not 308/301) so search engines keep the URLs indexed for the return.
const CHAIN_CATALOG_ENABLED = false

// The conversion form is the only page where the public slug diverges from
// the file-system route segment. Internally the route is /custom/general
// (and the form's pieceType state defaults to 'general'); externally the
// page lives at /custom-form, which reads better as a form-only utility.
const FORM_PUBLIC = '/custom-form'
const FORM_INTERNAL = '/custom/general'
const FORM_LEGACY = '/custom-general' // first iteration of the flat URL

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
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
        source: `/custom-${slug}-toronto`,
        destination: `/custom/${slug}`,
      })),
      // Geo variants. The city rides along on the [type] segment (no bespoke
      // slug ends in a city name, so parseTypeSegment can split it back out),
      // which keeps every city on the one landing page component.
      ...geoCities.flatMap((city) =>
        customSlugs.map((slug) => ({
          source: `/custom-${slug}-${city}`,
          destination: `/custom/${slug}-${city}`,
        }))
      ),
      // /custom-form is the public-facing inquiry form URL; it's served by
      // the existing /custom/general route file.
      { source: FORM_PUBLIC, destination: FORM_INTERNAL },
    ]
  },

  // 301 the old hierarchical URLs to the new flat slugs to preserve SEO equity.
  async redirects() {
    return [
      // TEMPORARY — ready-made chain catalog paused (see CHAIN_CATALOG_ENABLED
      // above). Only the catalog routes redirect; the bespoke /custom-chains-*
      // pages stay live. Delete this block (or flip the flag) when the
      // catalog returns.
      ...(CHAIN_CATALOG_ENABLED
        ? []
        : [
            { source: '/chains', destination: '/', permanent: false },
            { source: '/chains/:path*', destination: '/', permanent: false },
            { source: '/chain/:path*', destination: '/', permanent: false },
          ]),
      // Old hierarchical routes → new flat -toronto URLs
      ...customSlugs.map((slug) => ({
        source: `/custom/${slug}`,
        destination: `/custom-${slug}-toronto`,
        permanent: true,
      })),
      // Old flat URLs (without -toronto) → new -toronto URLs
      ...customSlugs.map((slug) => ({
        source: `/custom-${slug}`,
        destination: `/custom-${slug}-toronto`,
        permanent: true,
      })),
      // Hierarchical geo routes → the flat geo URLs they now have pages for.
      ...geoCities.flatMap((city) =>
        customSlugs.map((slug) => ({
          source: `/${city}/custom-${slug}`,
          destination: `/custom-${slug}-${city}`,
          permanent: true,
        }))
      ),
      // Old internal route for the form → the public form URL.
      { source: FORM_INTERNAL, destination: FORM_PUBLIC, permanent: true },
      // First iteration of the flat URL (briefly indexable) → final URL.
      { source: FORM_LEGACY, destination: FORM_PUBLIC, permanent: true },
      // Redirect old British spellings to the canonical American-spelling routes.
      // The brand slug also loses a double-s: mohammad-al-assali → mohammad-al-asali.
      // These two must stay ahead of the /master-jeweller/:path* rule below: matching
      // is first-wins, so listing the fully-old URL here resolves it in a single hop
      // instead of chaining /master-jeweller/…-assali → /master-jeweler/…-assali → final.
      {
        source: '/about/master-jeweller/mohammad-al-assali',
        destination: '/about/master-jeweler/mohammad-al-asali',
        statusCode: 301,
      },
      {
        source: '/about/master-jeweler/mohammad-al-assali',
        destination: '/about/master-jeweler/mohammad-al-asali',
        statusCode: 301,
      },
      {
        source: '/about/master-jeweller/:path*',
        destination: '/about/master-jeweler/:path*',
        permanent: true,
      },
      // 301 rather than `permanent: true`, which Next.js emits as a 308. Both are
      // permanent to crawlers, but this URL is indexed and gets reported on, so the
      // status code auditors expect to see is the one worth sending.
      {
        source: '/blog/arabic-calligraphy-jewellery-toronto',
        destination: '/blog/arabic-calligraphy-jewelry-toronto',
        statusCode: 301,
      },
      // Removed service-area pages → homepage
      { source: '/service-areas', destination: '/', permanent: true },
      { source: '/toronto/oakwood-vaughan', destination: '/', permanent: true },
      { source: '/toronto/yorkville', destination: '/', permanent: true },
      { source: '/toronto/north-york', destination: '/', permanent: true },
      { source: '/toronto/etobicoke', destination: '/', permanent: true },
      { source: '/toronto/scarborough', destination: '/', permanent: true },
      { source: '/toronto/wychwood', destination: '/', permanent: true },
      { source: '/toronto/forest-hill', destination: '/', permanent: true },
      { source: '/toronto/bathurst-st-clair', destination: '/', permanent: true },
      { source: '/gta/mississauga', destination: '/', permanent: true },
      { source: '/gta/vaughan', destination: '/', permanent: true },
      { source: '/gta/markham', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
