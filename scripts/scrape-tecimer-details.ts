/**
 * Tecimer Jewellery full catalog scraper.
 * Run: npx tsx scripts/scrape-tecimer-details.ts
 *
 * Requires: TECIMER_PHPSESSID, TECIMER_FORM_KEY, TECIMER_PRIVATE_CONTENT_VERSION in .env.local
 * Requires: Playwright chromium installed (npx playwright install chromium)
 *
 * Outputs:
 *   data/tecimer-urls.json    — all product URLs
 *   data/chains-import.json   — full import-ready chain data
 */

import { chromium, type BrowserContext } from 'playwright'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Today's approximate spot prices CAD/g (June 13 2026 baseline — used for weight back-calculation)
const SPOT_PER_GRAM: Record<string, number> = {
  '10k': 76.82,
  '14k': 107.34,
  '18k': 138.10,
}

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

function parseChainType(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('cuban')) return 'cuban'
  if (n.includes('domed cuban') || n.includes('domed-cuban')) return 'domed-cuban'
  if (n.includes('figaro')) return 'figaro'
  if (n.includes('rope')) return 'rope'
  if (n.includes('box')) return 'box'
  if (n.includes('byzantine')) return 'byzantine'
  if (n.includes('snake')) return 'snake'
  if (n.includes('herringbone')) return 'herringbone'
  if (n.includes('mariner')) return 'mariner'
  if (n.includes('wheat')) return 'wheat'
  if (n.includes('bead')) return 'bead'
  if (n.includes('paper') && n.includes('clip')) return 'paperclip'
  if (n.includes('curb')) return 'curb'
  if (n.includes('cable')) return 'cable'
  if (n.includes('franco')) return 'franco'
  if (n.includes('round') && n.includes('link')) return 'round-link'
  if (n.includes('anchor')) return 'anchor'
  if (n.includes('singapore')) return 'singapore'
  if (n.includes('oval') && n.includes('link')) return 'oval-link'
  return 'curb' // fallback
}

function parseWidth(name: string): number {
  // Look for patterns like "4MM", "4.0MM", "4mm", "-4mm"
  const match = name.match(/(\d+\.?\d*)\s*mm/i)
  if (match) return parseFloat(match[1])
  return 2.0 // default
}

function parseConstruction(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('hollow')) return 'hollow'
  if (n.includes('lightly plated') || n.includes('lightly-plated')) return 'hollow'
  if (n.includes('semi-solid') || n.includes('semi solid')) return 'semi-solid'
  return 'solid'
}

function parseColor(name: string): string[] {
  const n = name.toLowerCase()
  const colors: string[] = []
  if (n.includes('two tone') || n.includes('two-tone')) {
    colors.push('two-tone')
  }
  if (n.includes('pink') || n.includes('rose')) {
    colors.push('rose-gold')
  }
  if (n.includes('white')) {
    colors.push('white-gold')
  }
  // Default to yellow-gold if no specific color mentioned or if "yellow" is in the name
  if (colors.length === 0 || n.includes('yellow')) {
    colors.push('yellow-gold')
  }
  return [...new Set(colors)]
}

function parseLengthInches(label: string): number {
  // "20\"" or "20"" or "20 in" or just "20"
  const match = label.match(/([\d.]+)/)
  return match ? parseFloat(match[1]) : 0
}

async function main() {
  const phpsessid = process.env.TECIMER_PHPSESSID
  const formKey = process.env.TECIMER_FORM_KEY
  const privateContent = process.env.TECIMER_PRIVATE_CONTENT_VERSION
  const magentoVary = process.env.TECIMER_X_MAGENTO_VARY

  if (!phpsessid || !formKey || !privateContent || !magentoVary) {
    console.error('Missing Tecimer cookies in env. Set TECIMER_PHPSESSID, TECIMER_FORM_KEY, TECIMER_PRIVATE_CONTENT_VERSION, TECIMER_X_MAGENTO_VARY')
    process.exit(1)
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  })

  await context.addCookies([
    { name: 'PHPSESSID', value: phpsessid, domain: '.tecimerjewellery.com', path: '/', httpOnly: true, secure: true, sameSite: 'Lax' },
    { name: 'form_key', value: formKey, domain: '.tecimerjewellery.com', path: '/', secure: true, sameSite: 'Lax' },
    { name: 'private_content_version', value: privateContent, domain: 'www.tecimerjewellery.com', path: '/', secure: true, sameSite: 'Lax' },
    { name: 'X-Magento-Vary', value: magentoVary, domain: 'www.tecimerjewellery.com', path: '/', httpOnly: true, secure: true, sameSite: 'Lax' },
  ])

  // ── Step 0: Verify login via product price check ──
  console.log('Step 0: Verifying Tecimer session (price check on N209)...')
  const verifyPage = await context.newPage()
  await verifyPage.goto('https://www.tecimerjewellery.com/n209-flat-beveled-curb.html', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await verifyPage.waitForTimeout(3000)
  const priceCheck = await verifyPage.evaluate(() => {
    try {
      const jq = (window as any).jQuery
      if (!jq) return null
      const data = jq('#product_addtocart_form').data('mage-configurable')
      return data?.options?.spConfig?.optionPrices ? Object.keys(data.options.spConfig.optionPrices).length : 0
    } catch { return null }
  })
  if (!priceCheck || priceCheck === 0) {
    console.error('❌ Login verification failed — no prices visible on product page.')
    console.error('Session may have expired. Get fresh cookies and try again.')
    await browser.close()
    process.exit(1)
  }
  console.log(`✓ Session valid — ${priceCheck} price variants detected on N209`)
  await verifyPage.close()

  // ── Step 1: Collect all product URLs ──
  console.log('\nStep 1: Collecting product URLs from pages 1-8...')
  const urlsFile = resolve(process.cwd(), 'data/tecimer-urls.json')
  let allUrls: string[] = []

  if (existsSync(urlsFile)) {
    allUrls = JSON.parse(readFileSync(urlsFile, 'utf-8'))
    console.log(`  Found existing ${urlsFile} with ${allUrls.length} URLs — skipping collection`)
  } else {
    const listPage = await context.newPage()
    for (let p = 1; p <= 8; p++) {
      const url = `https://www.tecimerjewellery.com/gold-jewellery/chains.html?product_list_limit=36&p=${p}`
      console.log(`  Page ${p}/8...`)
      await listPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await listPage.waitForTimeout(2000)

      const pageUrls = await listPage.evaluate(() => {
        const links = document.querySelectorAll('a.product-item-link, .product-item-info a')
        const urls = new Set<string>()
        links.forEach(a => {
          const href = (a as HTMLAnchorElement).href
          if (href && href.includes('tecimerjewellery.com') && !href.includes('chains.html') && !href.includes('?')) {
            urls.add(href)
          }
        })
        return [...urls]
      })
      allUrls.push(...pageUrls)
      console.log(`    Found ${pageUrls.length} products on page ${p}`)
    }
    await listPage.close()

    // Deduplicate
    allUrls = [...new Set(allUrls)]
    writeFileSync(urlsFile, JSON.stringify(allUrls, null, 2))
    console.log(`  Total unique URLs: ${allUrls.length}`)
  }

  // ── Step 2: Scrape each product detail ──
  console.log(`\nStep 2: Scraping ${allUrls.length} product details...`)
  const chains: ChainImportRow[] = []
  const page = await context.newPage()
  let scraped = 0
  let failed = 0

  for (const productUrl of allUrls) {
    scraped++
    const progress = `[${scraped}/${allUrls.length}]`
    try {
      await page.waitForTimeout(1000) // polite delay between requests
      await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForTimeout(2000) // wait for JS to hydrate

      // Get product name from page title
      const titleEl = await page.$('h1.page-title span, .page-title-wrapper h1')
      const rawName = titleEl ? (await titleEl.textContent())?.trim() || '' : ''

      if (!rawName) {
        console.log(`  ${progress} SKIP (no title): ${productUrl}`)
        failed++
        continue
      }

      // Try to extract spConfig
      const spConfig = await page.evaluate(() => {
        try {
          const form = document.querySelector('#product_addtocart_form')
          if (!form) return null
          // @ts-ignore
          const jq = (window as any).jQuery
          if (!jq) return null
          const data = jq('#product_addtocart_form').data('mage-configurable')
          if (!data?.options?.spConfig) return null
          return data.options.spConfig
        } catch { return null }
      })

      // Extract images
      const images = await page.evaluate(() => {
        const imgs: string[] = []
        // Try gallery images
        document.querySelectorAll('.fotorama__stage__shaft img, .gallery-placeholder img, [data-gallery-role="gallery"] img').forEach(img => {
          const src = (img as HTMLImageElement).src || (img as HTMLImageElement).getAttribute('data-src') || ''
          if (src && !src.includes('placeholder') && !src.includes('data:image')) {
            imgs.push(src.split('?')[0]) // remove query params
          }
        })
        // Fallback: product image
        if (imgs.length === 0) {
          document.querySelectorAll('.product.media img').forEach(img => {
            const src = (img as HTMLImageElement).src || ''
            if (src && !src.includes('placeholder')) imgs.push(src.split('?')[0])
          })
        }
        return [...new Set(imgs)]
      })

      // Extract SKU
      const skuEl = await page.$('.product.attribute.sku .value, [itemprop="sku"]')
      const sku = skuEl ? (await skuEl.textContent())?.trim() || '' : ''
      const supplierSku = sku || rawName.split(' ')[0].replace(/[^A-Z0-9-]/gi, '')

      // Parse product attributes from name
      const chainType = parseChainType(rawName)
      const widthMm = parseWidth(rawName)
      const construction = parseConstruction(rawName)
      const defaultColors = parseColor(rawName)

      // Extract available karats, metals, lengths from spConfig
      let availableKarats: string[] = []
      let availableMetals: string[] = defaultColors
      let availableLengths: number[] = []
      let weightPerInchG = 1.0 // default

      if (spConfig) {
        // Parse attributes
        const attrs = spConfig.attributes || {}
        for (const attrId of Object.keys(attrs)) {
          const attr = attrs[attrId]
          if (attr.code === 'gf_metal_type') {
            availableKarats = (attr.options || []).map((o: any) => o.label?.toLowerCase()).filter(Boolean)
          } else if (attr.code === 'dimensions' || attr.code === 'gf_length' || attr.label?.toLowerCase().includes('length')) {
            availableLengths = (attr.options || []).map((o: any) => parseLengthInches(o.label || '')).filter((l: number) => l > 0)
          } else if (attr.code === 'gf_color' || attr.label?.toLowerCase().includes('color') || attr.label?.toLowerCase().includes('metal color')) {
            const colors = (attr.options || []).map((o: any) => {
              const lbl = (o.label || '').toLowerCase()
              if (lbl.includes('yellow')) return 'yellow-gold'
              if (lbl.includes('white')) return 'white-gold'
              if (lbl.includes('pink') || lbl.includes('rose')) return 'rose-gold'
              if (lbl.includes('two')) return 'two-tone'
              return null
            }).filter(Boolean) as string[]
            if (colors.length > 0) availableMetals = [...new Set(colors)]
          }
        }

        // Back-calculate weight per inch from variant prices
        const optionPrices = spConfig.optionPrices || {}
        const index = spConfig.index || {}
        const attrMap = spConfig.attributes || {}

        // Find a variant with known karat and length to derive weight
        for (const childId of Object.keys(optionPrices)) {
          const price = optionPrices[childId]?.finalPrice?.amount
          if (!price || price <= 0) continue

          const childIdx = index[childId]
          if (!childIdx) continue

          let karat = ''
          let lengthIn = 0
          for (const attrId of Object.keys(childIdx)) {
            const optionId = childIdx[attrId]
            const attr = attrMap[attrId]
            if (!attr) continue
            const option = (attr.options || []).find((o: any) => String(o.id) === String(optionId))
            if (!option) continue

            if (attr.code === 'gf_metal_type') {
              karat = option.label?.toLowerCase() || ''
            } else if (attr.code === 'dimensions' || attr.label?.toLowerCase().includes('length')) {
              lengthIn = parseLengthInches(option.label || '')
            }
          }

          if (karat && lengthIn > 0 && SPOT_PER_GRAM[karat]) {
            const spotPerGram = SPOT_PER_GRAM[karat]
            const impliedWeight = price / spotPerGram
            const wpi = impliedWeight / lengthIn
            if (wpi > 0.05 && wpi < 50) { // sanity check
              weightPerInchG = Math.round(wpi * 100) / 100
              break
            }
          }
        }
      }

      // Fallback karats if none detected
      if (availableKarats.length === 0) availableKarats = ['10k', '14k', '18k']
      // Fallback lengths if none detected
      if (availableLengths.length === 0) availableLengths = [18, 20, 22, 24]

      const chain: ChainImportRow = {
        supplierSku,
        name: rawName.replace(/\s+/g, ' ').trim(),
        chainType,
        widthMm,
        availableKarats,
        availableMetals,
        availableLengths,
        construction,
        weightPerInchG,
        heroImageUrl: images[0] || undefined,
        galleryImageUrls: images.slice(1),
        description: '',
      }

      chains.push(chain)
      console.log(`  ${progress} ✓ ${supplierSku} — ${rawName.substring(0, 50)} (${chainType}, ${widthMm}mm, ${availableKarats.join('/')}, wpi=${weightPerInchG})`)
    } catch (err) {
      console.log(`  ${progress} ✗ FAILED: ${productUrl} — ${(err as Error).message?.substring(0, 80)}`)
      failed++
    }
  }

  await page.close()
  await browser.close()

  // Write output
  const outputFile = resolve(process.cwd(), 'data/chains-import.json')
  writeFileSync(outputFile, JSON.stringify(chains, null, 2))
  console.log(`\n✅ Scrape complete: ${chains.length} chains scraped, ${failed} failed`)
  console.log(`   Output: ${outputFile}`)

  // Stats
  const typeCount: Record<string, number> = {}
  chains.forEach(c => { typeCount[c.chainType] = (typeCount[c.chainType] || 0) + 1 })
  console.log('\n  Chain types:')
  Object.entries(typeCount).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`    ${type}: ${count}`)
  })
  console.log(`  With images: ${chains.filter(c => c.heroImageUrl).length}`)
  console.log(`  Unique metals: ${[...new Set(chains.flatMap(c => c.availableMetals))].join(', ')}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
