/**
 * Upload chain images from Tecimer URLs to DatoCMS.
 * Reads data/chains-import.json, uploads hero + gallery images via createFromUrl,
 * writes data/chains-import.with-images.json with Dato upload IDs.
 *
 * Run: npx tsx scripts/upload-images-to-dato.ts
 * Requires: DATOCMS_CMA_TOKEN
 */

import { buildClient } from '@datocms/cma-client-node'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

interface ChainRow {
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
  heroImageUploadId?: string
  galleryImageUrls?: string[]
  galleryImageUploadIds?: string[]
  description?: string
}

async function uploadUrl(client: ReturnType<typeof buildClient>, url: string, filename: string): Promise<string | null> {
  try {
    const upload = await client.uploads.createFromUrl({
      url,
      filename,
      skipCreationIfAlreadyExists: true,
    })
    return upload.id
  } catch (err) {
    console.error(`    Failed to upload ${url}: ${(err as Error).message?.substring(0, 80)}`)
    return null
  }
}

async function main() {
  const token = process.env.DATOCMS_CMA_TOKEN
  if (!token) {
    console.error('Missing DATOCMS_CMA_TOKEN')
    process.exit(1)
  }

  const inputFile = resolve(process.cwd(), 'data/chains-import.json')
  const outputFile = resolve(process.cwd(), 'data/chains-import.with-images.json')

  const chains: ChainRow[] = JSON.parse(readFileSync(inputFile, 'utf-8'))
  console.log(`Loaded ${chains.length} chains`)

  const client = buildClient({ apiToken: token })

  let uploaded = 0
  let skipped = 0
  const CONCURRENCY = 4 // parallel uploads

  for (let i = 0; i < chains.length; i += CONCURRENCY) {
    const batch = chains.slice(i, i + CONCURRENCY)
    await Promise.all(batch.map(async (chain, batchIdx) => {
      const idx = i + batchIdx
      const progress = `[${idx + 1}/${chains.length}]`

      // Upload hero image
      if (chain.heroImageUrl && !chain.heroImageUploadId) {
        const filename = `${chain.supplierSku}-hero.jpg`
        const uploadId = await uploadUrl(client, chain.heroImageUrl, filename)
        if (uploadId) {
          chain.heroImageUploadId = uploadId
          uploaded++
          process.stdout.write('.')
        } else {
          skipped++
          process.stdout.write('x')
        }
      }

      // Upload gallery images
      if (chain.galleryImageUrls && chain.galleryImageUrls.length > 0 && !chain.galleryImageUploadIds) {
        chain.galleryImageUploadIds = []
        for (let g = 0; g < chain.galleryImageUrls.length; g++) {
          const gUrl = chain.galleryImageUrls[g]
          const filename = `${chain.supplierSku}-gallery-${g}.jpg`
          const uploadId = await uploadUrl(client, gUrl, filename)
          if (uploadId) {
            chain.galleryImageUploadIds.push(uploadId)
            uploaded++
          } else {
            skipped++
          }
        }
      }

      if (!chain.heroImageUrl && !chain.galleryImageUrls?.length) {
        process.stdout.write('s')
        skipped++
      }
    }))

    // Save progress every batch in case of interruption
    if ((i + CONCURRENCY) % 20 === 0 || i + CONCURRENCY >= chains.length) {
      writeFileSync(outputFile, JSON.stringify(chains, null, 2))
    }
  }

  writeFileSync(outputFile, JSON.stringify(chains, null, 2))
  console.log(`\n\n✅ Image upload complete: ${uploaded} uploaded, ${skipped} skipped/failed`)
  console.log(`   Output: ${outputFile}`)

  const withHero = chains.filter(c => c.heroImageUploadId).length
  const withGallery = chains.filter(c => c.galleryImageUploadIds && c.galleryImageUploadIds.length > 0).length
  console.log(`   Chains with hero image: ${withHero}/${chains.length}`)
  console.log(`   Chains with gallery images: ${withGallery}/${chains.length}`)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
