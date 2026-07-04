import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const SANITY_TOKEN = process.env.SANITY_TOKEN
const client = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
})

const CHAINS_DIR = path.join(
  process.env.HOME,
  'Library/CloudStorage/GoogleDrive-salamalasali03@gmail.com/My Drive/agency-hub/clients/Al-assali Jewelry/deliverables/GBP Products - Images/chains'
)

const CHAIN_TYPES = ['cuban', 'rope', 'franco', 'figaro', 'box', 'tennis']
const LENGTHS = [18, 20, 22, 24, 26, 28, 30]

async function uploadImage(filePath, filename) {
  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/png',
  })
  console.log(`  Uploaded: ${filename} -> ${asset._id}`)
  return asset
}

async function main() {
  // Step 1: Upload all images to Sanity
  console.log('=== Uploading chain images to Sanity ===\n')
  const assetsByType = {}

  for (const type of CHAIN_TYPES) {
    assetsByType[type] = []
    console.log(`\n${type.toUpperCase()}:`)

    for (const len of LENGTHS) {
      const filename = `${type}-${len}in.png`
      const filePath = path.join(CHAINS_DIR, filename)

      if (!fs.existsSync(filePath)) {
        // Check chain-tests for earlier Cuban images
        const altPath = path.join(CHAINS_DIR, '..', 'chain-tests', filename)
        if (fs.existsSync(altPath)) {
          const asset = await uploadImage(altPath, filename)
          assetsByType[type].push({ length: len, asset })
        } else {
          console.log(`  SKIP: ${filename} not found`)
        }
        continue
      }

      const asset = await uploadImage(filePath, filename)
      assetsByType[type].push({ length: len, asset })
    }
  }

  // Step 2: Get all chain documents grouped by type
  console.log('\n\n=== Updating chain documents ===\n')

  for (const type of CHAIN_TYPES) {
    const images = assetsByType[type]
    if (!images.length) {
      console.log(`${type}: no images to assign, skipping`)
      continue
    }

    const chains = await client.fetch(
      `*[_type == "chain" && chainType == $type]{_id, name}`,
      { type }
    )

    console.log(`\n${type.toUpperCase()}: ${chains.length} chains, ${images.length} images`)

    const galleryImages = images.map(({ length, asset }) => ({
      _type: 'image',
      _key: `len-${length}`,
      alt: `${type} chain ${length} inch`,
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }))

    for (const chain of chains) {
      try {
        await client
          .patch(chain._id)
          .setIfMissing({ galleryImages: [] })
          .append('galleryImages', galleryImages)
          .commit()
        console.log(`  Updated: ${chain.name}`)
      } catch (err) {
        console.error(`  ERROR on ${chain.name}: ${err.message}`)
      }
    }
  }

  console.log('\n=== Done! ===')
}

main().catch(console.error)
