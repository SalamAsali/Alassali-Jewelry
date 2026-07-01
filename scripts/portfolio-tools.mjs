// Portfolio maintenance tools for the Sanity CMS.
//
// The /portfolio page filters items by an exact match against their linked
// `portfolioCategory` name (see components/portfolio/PortfolioGrid.tsx). Any
// portfolio item WITHOUT a category is bucketed as "Uncategorized", which has
// no filter button — so it only ever appears under "All", never under a
// specific category. This script finds those items so they can be fixed, and
// can also remove the first (primary) image from a named item.
//
// Reads are public (no token). Writes require a Sanity token with Editor role:
//   manage.sanity.io -> Project -> API -> Tokens -> Add token (Editor)
// Put it in .env.local as SANITY_API_WRITE_TOKEN=...
//
// Usage:
//   node scripts/portfolio-tools.mjs audit
//   node scripts/portfolio-tools.mjs remove-first-image "Custom Diamond Pave Cartier Accent Set"
//   node scripts/portfolio-tools.mjs remove-first-image "Custom Diamond Pave Cartier Accent Set" --apply
//
// `remove-first-image` is a DRY RUN by default. Pass --apply to actually write.

import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..')

function loadEnvLocal() {
  const envPath = resolve(repoRoot, '.env.local')
  if (!existsSync(envPath)) return
  const raw = readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvLocal()

const PROJECT_ID = 'oh0jn4tt'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

function readClient() {
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: false,
  })
}

function writeClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    console.error(
      'Missing SANITY_API_WRITE_TOKEN. Add it to .env.local (Editor-role token from\n' +
        'manage.sanity.io -> Project -> API -> Tokens) to make changes.',
    )
    process.exit(1)
  }
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    token,
    useCdn: false,
  })
}

async function audit() {
  const client = readClient()
  const items = await client.fetch(
    `*[_type == "portfolioItem"] | order(coalesce(category->name, "~~~") asc, name asc) {
      _id,
      name,
      "category": category->name,
      "hasImage": defined(image),
      "extraCount": count(additionalImages)
    }`,
  )

  const uncategorized = items.filter((it) => !it.category)
  const categorized = items.filter((it) => it.category)

  console.log(`\nPortfolio items: ${items.length} total`)
  console.log(`  categorized:   ${categorized.length}`)
  console.log(`  UNCATEGORIZED: ${uncategorized.length}\n`)

  if (uncategorized.length) {
    console.log('These items have NO category, so they only show under "All":\n')
    for (const it of uncategorized) {
      const imgs = (it.hasImage ? 1 : 0) + (it.extraCount ?? 0)
      console.log(`  • ${it.name}   (${imgs} image${imgs === 1 ? '' : 's'}, ${it._id})`)
    }
    console.log(
      '\nFix: open each in Sanity Studio -> set its Category field. Or bulk-set\n' +
        'them with the Studio, then re-run this audit to confirm 0 uncategorized.\n',
    )
  } else {
    console.log('✓ Every portfolio item has a category. No filtering gaps.\n')
  }

  // Per-category counts, to sanity-check the buttons match expectations.
  const byCat = {}
  for (const it of categorized) byCat[it.category] = (byCat[it.category] ?? 0) + 1
  console.log('Items per category:')
  for (const [cat, n] of Object.entries(byCat).sort()) {
    console.log(`  ${cat}: ${n}`)
  }
  console.log('')
}

async function removeFirstImage(name, apply) {
  const client = apply ? writeClient() : readClient()

  const item = await client.fetch(
    `*[_type == "portfolioItem" && lower(name) == lower($name)][0]{
      _id, name, image, additionalImages
    }`,
    { name },
  )

  if (!item) {
    console.error(
      `No portfolio item found with name "${name}". Run "audit" to see exact names.`,
    )
    process.exit(1)
  }

  const extras = Array.isArray(item.additionalImages) ? item.additionalImages : []
  const totalImages = (item.image ? 1 : 0) + extras.length

  console.log(`\nItem: ${item.name}  (${item._id})`)
  console.log(`  displayed images: ${totalImages}`)
  console.log(`  1 (primary): ${item.image?.asset?._ref ?? '(none)'}`)
  extras.forEach((img, i) => {
    console.log(`  ${i + 2} (extra):   ${img?.asset?._ref ?? '(none)'}`)
  })

  if (!item.image) {
    console.error('\nThis item has no primary image to remove. Nothing to do.\n')
    process.exit(1)
  }
  if (extras.length === 0) {
    console.error(
      '\nThis item has only ONE image. Removing it would leave the card with no\n' +
        'picture. Add a replacement image first, or delete the item instead.\n',
    )
    process.exit(1)
  }

  // The card renders [image, ...additionalImages]. Removing the first picture
  // = promote the first extra to primary and drop it from the extras list.
  const [promoted, ...rest] = extras
  const newImage = { ...promoted }
  delete newImage._key // _key is only meaningful for array members

  console.log('\nAfter removal the primary image becomes:')
  console.log(`  ${newImage.asset?._ref}`)
  console.log(`  remaining extras: ${rest.length}`)

  if (!apply) {
    console.log('\n[dry run] No changes written. Re-run with --apply to commit.\n')
    return
  }

  await client
    .patch(item._id)
    .set({ image: newImage, additionalImages: rest })
    .commit()

  console.log('\n✓ Removed the first image and re-published the item.\n')
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2)
  const apply = rest.includes('--apply')
  const positional = rest.filter((a) => !a.startsWith('--'))

  switch (cmd) {
    case 'audit':
      await audit()
      break
    case 'remove-first-image': {
      const name = positional[0]
      if (!name) {
        console.error(
          'Usage: node scripts/portfolio-tools.mjs remove-first-image "<item name>" [--apply]',
        )
        process.exit(1)
      }
      await removeFirstImage(name, apply)
      break
    }
    default:
      console.log(
        'Portfolio tools\n\n' +
          '  node scripts/portfolio-tools.mjs audit\n' +
          '      List portfolio items and flag any missing a category.\n\n' +
          '  node scripts/portfolio-tools.mjs remove-first-image "<name>" [--apply]\n' +
          '      Remove the first (primary) image from a named item. Dry run\n' +
          '      unless --apply is passed. Requires SANITY_API_WRITE_TOKEN.\n',
      )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
