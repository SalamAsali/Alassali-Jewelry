import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

import { Users } from './collections/Users'
import { Gallery } from './collections/Gallery'
import { FormFields } from './collections/FormFields'
import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Homepage } from './collections/Homepage'

// Get the server URL from environment or Vercel
function getServerURL() {
  const env = process.env
  const url =
    env.PAYLOAD_PUBLIC_SERVER_URL ||
    env.NEXT_PUBLIC_SERVER_URL ||
    env.NEXT_PUBLIC_CMS_URL ||
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : null) ||
    env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'
  return url.startsWith('http') ? url : `https://${url}`
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
    Pages,
    Homepage,
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
    // Always enable push when we have a DB (dev or prod) so tables are created
    push:
      process.env.NODE_ENV === 'development' ||
      process.env.ENABLE_PUSH_MIGRATIONS === 'true' ||
      Boolean(process.env.DATABASE_URL),
  }),
  serverURL: serverURL,
  routes: {
    admin: '/admin',
    api: '/api/payload',
  },
})

export default config
