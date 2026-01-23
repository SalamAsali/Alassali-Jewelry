import { withPayload } from '@payloadcms/next/withPayload'

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
  experimental: {
    reactCompiler: false,
  },
}

// Wrap withPayload plugin - REQUIRED for Payload 3.0
export default withPayload(nextConfig)
