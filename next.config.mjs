/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'payload',
    '@payloadcms/db-postgres',
    '@payloadcms/richtext-slate',
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
