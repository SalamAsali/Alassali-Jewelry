import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

import { Users } from './collections/Users.ts'
import { Gallery } from './collections/Gallery.ts'
import { FormFields } from './collections/FormFields.ts'
import { Inquiries } from './collections/Inquiries.ts'
import { Media } from './collections/Media.ts'
import { Pages } from './collections/Pages.ts'
import { Homepage } from './collections/Homepage.ts'
import { sanitizeDatabaseUrl } from './lib/db.ts'

const PRODUCTION_ORIGIN = 'https://alassali-jewelry.vercel.app'
const LOCAL_ORIGIN = 'http://localhost:3000'

function getServerURL(): string {
  const env = process.env
  const url =
    env.PAYLOAD_PUBLIC_SERVER_URL ||
    env.NEXT_PUBLIC_SERVER_URL ||
    env.NEXT_PUBLIC_CMS_URL ||
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : null) ||
    env.NEXT_PUBLIC_SITE_URL ||
    LOCAL_ORIGIN
  return url.startsWith('http') ? url : `https://${url}`
}

function getSecret(): string {
  const secret = process.env.PAYLOAD_SECRET || ''
  if (process.env.NODE_ENV === 'production' && !secret) {
    console.warn(
      '[payload] PAYLOAD_SECRET is missing in production. Set it in Vercel environment variables.'
    )
  }
  return secret
}

const serverURL = getServerURL()
const connectionString = sanitizeDatabaseUrl(process.env.DATABASE_URL)

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
  cors: [PRODUCTION_ORIGIN, serverURL, LOCAL_ORIGIN].filter(
    (u, i, a) => a.indexOf(u) === i
  ),
  csrf: [PRODUCTION_ORIGIN, serverURL, LOCAL_ORIGIN].filter(
    (u, i, a) => a.indexOf(u) === i
  ),
  editor: slateEditor({}),
  secret: getSecret(),
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString },
    migrationDir: path.resolve(process.cwd(), 'migrations'),
    // Temporary: force sync schema (bootstrap tables). Disable after /admin works.
    push: true,
  }),
  serverURL,
  routes: {
    admin: '/admin',
    api: '/api/payload',
  },
})

export default config
