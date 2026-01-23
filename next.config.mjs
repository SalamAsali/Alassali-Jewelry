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
}

export default nextConfig
