import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

import { Users } from './collections/Users'
import { Gallery } from './collections/Gallery'
import { FormFields } from './collections/FormFields'
import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'

// Get the server URL from environment or Vercel
function getServerURL() {
  if (process.env.PAYLOAD_PUBLIC_SERVER_URL) {
    return process.env.PAYLOAD_PUBLIC_SERVER_URL
  }
  if (process.env.NEXT_PUBLIC_CMS_URL) {
    // Support NEXT_PUBLIC_CMS_URL but ensure it has https://
    const url = process.env.NEXT_PUBLIC_CMS_URL
    return url.startsWith('http') ? url : `https://${url}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  return 'http://localhost:3000'
}

const serverURL = getServerURL()

const config = buildConfig({
  admin: {
    user: Users.slug,
    baseURL: serverURL,
    meta: {
      titleSuffix: '- Alassali Jewelry CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
    disable: false,
  },
  collections: [
    Users,
    Media,
    Gallery,
    FormFields,
    Inquiries,
  ],
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/jewelry',
    },
  }),
  serverURL: serverURL,
  routes: {
    admin: '/cms',
    api: '/api/payload',
  },
})

export default config
