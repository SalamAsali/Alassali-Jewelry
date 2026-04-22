// Uploads every public/images/portfolio/* image to DatoCMS, idempotently.
// Writes scripts/migrate/.uploads.json — a filename → upload_id map that
// 03-records.mjs consumes to attach images to portfolio_item records.
//
// Idempotency: uses md5 of file contents to detect existing uploads. If an
// upload with the same md5 already exists in DatoCMS, we reuse its ID.

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { extname } from 'node:path'
import { getClient, repoPath, log } from './_client.mjs'

const PORTFOLIO_DIR = repoPath('public', 'images', 'portfolio')
const MAP_PATH = repoPath('scripts', 'migrate', '.uploads.json')

function md5(buf) {
  return createHash('md5').update(buf).digest('hex')
}

function loadExistingMap() {
  if (!existsSync(MAP_PATH)) return {}
  try {
    return JSON.parse(readFileSync(MAP_PATH, 'utf8'))
  } catch {
    return {}
  }
}

async function findUploadByMd5(client, hash) {
  // DatoCMS supports filtering uploads by md5 via the CMA.
  try {
    const iter = client.uploads.listPagedIterator({
      filter: { fields: { md5: { eq: hash } } },
      page: { limit: 1 },
    })
    for await (const upload of iter) {
      return upload
    }
  } catch (err) {
    // Fall through to returning null; caller will upload fresh.
    log(`  (md5 lookup failed: ${err?.message || err})`)
  }
  return null
}

async function uploadFile(client, filename, filePath) {
  const buf = readFileSync(filePath)
  const hash = md5(buf)

  const existing = await findUploadByMd5(client, hash)
  if (existing) {
    log(`  ${filename} — exists (upload ${existing.id})`)
    return existing.id
  }

  const ext = extname(filename).toLowerCase()
  const mimeType =
    ext === '.png' ? 'image/png' :
    ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
    ext === '.webp' ? 'image/webp' :
    ext === '.gif' ? 'image/gif' :
    'application/octet-stream'

  const upload = await client.uploads.createFromLocalFile({
    localPath: filePath,
    filename,
    default_field_metadata: {
      en: {
        alt: filename.replace(/\.[^.]+$/, '').replace(/-/g, ' '),
        title: null,
        custom_data: {},
        focal_point: null,
      },
    },
  })
  log(`  ${filename} — uploaded (${upload.id}, ${mimeType})`)
  return upload.id
}

async function run() {
  const client = getClient()
  log('Starting uploads…')

  const files = readdirSync(PORTFOLIO_DIR).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f),
  )
  log(`Found ${files.length} portfolio images to process.`)

  const map = loadExistingMap()

  for (const filename of files) {
    if (map[filename]) {
      log(`  ${filename} — cached (${map[filename]})`)
      continue
    }
    const id = await uploadFile(client, filename, repoPath(PORTFOLIO_DIR, filename))
    map[filename] = id
    // Persist incrementally so a crash mid-run doesn't lose progress.
    writeFileSync(MAP_PATH, JSON.stringify(map, null, 2) + '\n')
  }

  log(`Uploads complete. Map saved to ${MAP_PATH}`)
}

run().catch((err) => {
  console.error('[migrate] failed:', err?.message || err)
  if (err?.response?.body) {
    console.error(JSON.stringify(err.response.body, null, 2))
  }
  process.exit(1)
})
