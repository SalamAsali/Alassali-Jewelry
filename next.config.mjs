/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'payload',
    '@payloadcms/db-postgres',
    '@payloadcms/richtext-slate',
  ],
  experimental: {
    serverComponentsExternalPackages: [
      'payload',
      '@payloadcms/db-postgres',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prevent Payload from initializing during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        'payload': 'commonjs payload',
        '@payloadcms/db-postgres': 'commonjs @payloadcms/db-postgres',
      })
    }
    return config
  },
}

export default nextConfig
