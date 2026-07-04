import { createClient } from '@sanity/client'
import https from 'https'
import fs from 'fs'
import path from 'path'

const SANITY_TOKEN = process.env.SANITY_TOKEN
if (!SANITY_TOKEN) { console.error('Set SANITY_TOKEN env var'); process.exit(1) }

const client = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
})

const DRIVE_DIR = path.join(
  process.env.HOME,
  'Library/CloudStorage/GoogleDrive-salamalasali03@gmail.com/My Drive/agency-hub/clients/Al-assali Jewelry/deliverables/GBP Products - Images/chains'
)

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve, reject)
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`))
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function main() {
  const dataPath = path.join(import.meta.dirname, 'remake-upload-data.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  let totalUploaded = 0, totalChains = 0

  // Upload gallery images
  for (const set of data.sets) {
    const { chainType, metal, images } = set
    if (!images || Object.keys(images).length < 7) {
      console.log(`SKIP ${chainType}-${metal}: only ${Object.keys(images || {}).length} images`)
      continue
    }

    console.log(`\n=== ${chainType} ${metal} ===`)
    const galleryImages = []

    for (const [len, url] of Object.entries(images).sort((a, b) => +a[0] - +b[0])) {
      const filename = `${chainType}-${metal}-${len}in.png`
      console.log(`  Downloading: ${filename}...`)
      const buffer = await downloadBuffer(url)

      // Save to Google Drive
      const driveSubdir = path.join(DRIVE_DIR, `${chainType}-${metal}`)
      if (!fs.existsSync(driveSubdir)) fs.mkdirSync(driveSubdir, { recursive: true })
      fs.writeFileSync(path.join(driveSubdir, filename), buffer)

      console.log(`  Uploading to Sanity: ${filename}...`)
      const asset = await client.assets.upload('image', buffer, { filename, contentType: 'image/png' })
      console.log(`  -> ${asset._id}`)

      galleryImages.push({
        _type: 'image',
        _key: `len-${len}`,
        alt: `${chainType} ${metal} chain ${len} inch`,
        asset: { _type: 'reference', _ref: asset._id },
      })
      totalUploaded++
    }

    // Find ALL chains of this type + metal and REPLACE their gallery images
    const chains = await client.fetch(
      `*[_type == "chain" && chainType == $type && defaultMetal == $metal]{_id, name}`,
      { type: chainType, metal }
    )
    console.log(`  Found ${chains.length} chains to update`)

    for (const chain of chains) {
      try {
        await client.patch(chain._id).set({ galleryImages }).commit()
        console.log(`  Updated: ${chain.name}`)
        totalChains++
      } catch (err) {
        console.error(`  ERROR on ${chain.name}: ${err.message}`)
      }
    }
  }

  // Upload hero images
  console.log('\n=== HERO IMAGES ===')
  for (const hero of data.hero_images || []) {
    const { chainId, url } = hero
    console.log(`  Downloading hero for ${chainId}...`)
    const buffer = await downloadBuffer(url)
    const filename = `hero-${chainId}.png`
    const asset = await client.assets.upload('image', buffer, { filename, contentType: 'image/png' })
    console.log(`  -> ${asset._id}`)

    await client.patch(chainId)
      .set({ heroImage: { _type: 'image', alt: 'Chain hero image', asset: { _type: 'reference', _ref: asset._id } } })
      .commit()
    console.log(`  Updated hero: ${chainId}`)
    totalUploaded++
    totalChains++
  }

  console.log(`\n=== Upload Complete ===`)
  console.log(`Uploaded ${totalUploaded} images, updated ${totalChains} chains`)
}

main().catch(console.error)
