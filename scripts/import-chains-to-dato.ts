/**
 * Import chains from data/chains-import.json into DatoCMS.
 * Idempotent — matches on supplierSku to avoid duplicates.
 *
 * Run: npx tsx scripts/import-chains-to-dato.ts
 * Or with a custom file: npx tsx scripts/import-chains-to-dato.ts data/chains-import.json
 *
 * Requires: DATOCMS_CMA_TOKEN env var
 */

import { buildClient } from '@datocms/cma-client-node'
import { readFileSync } from 'fs'
import { resolve } from 'path'

interface ChainImportRow {
  supplierSku: string
  name: string
  chainType: string
  widthMm: number
  availableKarats: string[]
  availableMetals: string[]
  availableLengths: number[]
  construction: string
  weightPerInchG: number
  heroImageUrl?: string
  galleryImageUrls?: string[]
  description?: string
}

async function main() {
  const token = process.env.DATOCMS_CMA_TOKEN
  if (!token) {
    console.error('Missing DATOCMS_CMA_TOKEN env var')
    process.exit(1)
  }

  const filePath = process.argv[2] || 'data/chains-import.json'
  const fullPath = resolve(process.cwd(), filePath)

  let chains: ChainImportRow[]
  try {
    const raw = readFileSync(fullPath, 'utf-8')
    chains = JSON.parse(raw)
  } catch (err) {
    console.error(`Failed to read ${fullPath}:`, err)
    console.error('\nThis file is produced by scripts/scrape-tecimer-details.ts.')
    console.error('If it doesn\'t exist yet, run the scraper first or create a manual seed file.')
    process.exit(1)
  }

  console.log(`Loaded ${chains.length} chains from ${filePath}`)

  const client = buildClient({ apiToken: token })

  // Get the chain model
  const models = await client.itemTypes.list()
  const chainModel = models.find((m) => m.api_key === 'chain')
  if (!chainModel) {
    console.error('Model "chain" not found in DatoCMS. Create it first (see CHAINS_LAUNCH_PLAN.md §5).')
    process.exit(1)
  }

  // Get existing chains to check for duplicates
  const existingItems = await client.items.list({
    filter: { type: 'chain' },
    page: { limit: 500 },
  })
  const existingSkus = new Map(
    existingItems.map((item) => [item.supplier_sku as string, item.id])
  )

  let created = 0
  let updated = 0
  let skipped = 0

  for (const chain of chains) {
    const slug = chain.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const record = {
      name: chain.name,
      slug,
      chain_type: chain.chainType,
      width_mm: chain.widthMm,
      available_metals: JSON.stringify(chain.availableMetals),
      available_karats: JSON.stringify(chain.availableKarats),
      available_lengths: JSON.stringify(chain.availableLengths),
      construction: chain.construction,
      weight_per_inch_g: chain.weightPerInchG,
      default_karat: chain.availableKarats.includes('14k') ? '14k' : chain.availableKarats[0],
      default_metal: chain.availableMetals.includes('yellow-gold') ? 'yellow-gold' : chain.availableMetals[0],
      default_length_in: chain.availableLengths.includes(20) ? 20 : chain.availableLengths[0],
      description: chain.description || '',
      supplier_sku: chain.supplierSku,
      featured: false,
      order: 0,
      active: true,
    }

    const existingId = existingSkus.get(chain.supplierSku)

    if (existingId) {
      try {
        await client.items.update(existingId, record)
        updated++
        console.log(`  ✓ Updated: ${chain.name} (${chain.supplierSku})`)
      } catch (err) {
        console.error(`  ✗ Failed to update ${chain.supplierSku}:`, err)
        skipped++
      }
    } else {
      try {
        await client.items.create({
          item_type: { type: 'item_type', id: chainModel.id },
          ...record,
        })
        created++
        console.log(`  + Created: ${chain.name} (${chain.supplierSku})`)
      } catch (err) {
        console.error(`  ✗ Failed to create ${chain.supplierSku}:`, err)
        skipped++
      }
    }
  }

  console.log(`\nDone: ${created} created, ${updated} updated, ${skipped} skipped`)
  console.log('\nNote: Images are not uploaded in this script.')
  console.log('Run scripts/upload-images-to-dato.ts separately to handle image assets.')
}

main().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
