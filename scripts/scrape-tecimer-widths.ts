/**
 * Re-scrape ONLY the width field from Tecimer product pages.
 * Reads data/chains-import.with-images.json, visits each product URL,
 * extracts width from Additional Information table or page content,
 * updates widthMm in place, writes back.
 *
 * Run: npx tsx scripts/scrape-tecimer-widths.ts
 */

import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

interface ChainRow {
  supplierSku: string
  name: string
  widthMm: number
  [key: string]: unknown
}

async function main() {
  const phpsessid = process.env.TECIMER_PHPSESSID
  const formKey = process.env.TECIMER_FORM_KEY
  const privateContent = process.env.TECIMER_PRIVATE_CONTENT_VERSION
  const magentoVary = process.env.TECIMER_X_MAGENTO_VARY

  if (!phpsessid || !formKey || !privateContent || !magentoVary) {
    console.error('Missing Tecimer cookies')
    process.exit(1)
  }

  // Load URLs and chains
  const urlsFile = resolve(process.cwd(), 'data/tecimer-urls.json')
  const chainsFile = resolve(process.cwd(), 'data/chains-import.with-images.json')
  const urls: string[] = JSON.parse(readFileSync(urlsFile, 'utf-8'))
  const chains: ChainRow[] = JSON.parse(readFileSync(chainsFile, 'utf-8'))

  // Build SKU → chain index map
  // Also build URL → SKU map from the original scrape
  // The chains were scraped in URL order, so index matches
  console.log(`Loaded ${chains.length} chains, ${urls.length} URLs`)

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

  // Verify session
  const verifyPage = await context.newPage()
  await verifyPage.goto('https://www.tecimerjewellery.com/n209-flat-beveled-curb.html', { waitUntil: 'domcontentloaded', timeout: 15000 })
  await verifyPage.waitForTimeout(2000)
  const priceCheck = await verifyPage.locator('.price').count()
  if (priceCheck === 0) {
    console.error('Session invalid — no prices visible')
    await browser.close()
    process.exit(1)
  }
  console.log('Session valid\n')
  await verifyPage.close()

  // Only process chains that defaulted to 2mm
  const needsWidth = chains.filter(c => c.widthMm === 2.0)
  console.log(`${needsWidth.length} chains need width extraction (currently 2mm default)`)

  // Build a map from name/sku to URL
  // Since chains were scraped in URL order, we can rebuild the mapping
  // But it's easier to just visit every URL and match by SKU
  const skuToUrl = new Map<string, string>()
  for (const url of urls) {
    // Extract potential SKU from URL: /n209-flat-beveled-curb.html → n209
    const match = url.match(/\/([^/]+)\.html$/)
    if (match) {
      const urlSlug = match[1]
      // Find matching chain
      for (const chain of needsWidth) {
        const skuLower = chain.supplierSku.toLowerCase().replace(/[^a-z0-9]/g, '-')
        if (urlSlug.startsWith(skuLower) || urlSlug.includes(skuLower)) {
          skuToUrl.set(chain.supplierSku, url)
          break
        }
      }
    }
  }

  // For chains we couldn't match by SKU, just use all URLs in order
  // Actually, simpler approach: visit every URL, extract SKU + width, update matching chain
  const page = await context.newPage()
  let updated = 0
  let noWidth = 0

  // Create a map for quick lookup
  const skuMap = new Map<string, ChainRow>()
  for (const chain of chains) {
    skuMap.set(chain.supplierSku, chain)
  }

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const progress = `[${i + 1}/${urls.length}]`

    try {
      await page.waitForTimeout(800)
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
      await page.waitForTimeout(1500)

      // Extract width from multiple sources on the page
      const widthData = await page.evaluate(() => {
        let width: number | null = null

        // 1. Check "Additional Information" table
        const rows = document.querySelectorAll('#product-attribute-specs-table tr, .additional-attributes tr, table.data tr')
        for (const row of rows) {
          const label = row.querySelector('th, td:first-child')?.textContent?.toLowerCase() || ''
          const value = row.querySelector('td:last-child, td:nth-child(2)')?.textContent?.trim() || ''
          if (label.includes('width') || label.includes('thickness') || label.includes('gauge')) {
            const match = value.match(/([\d.]+)\s*mm/i)
            if (match) {
              width = parseFloat(match[1])
              break
            }
          }
        }

        // 2. Check product description / overview for width mention
        if (!width) {
          const descEl = document.querySelector('.product.attribute.description, .product-description, .product.attribute.overview')
          const desc = descEl?.textContent || ''
          const match = desc.match(/(\d+\.?\d*)\s*mm/i)
          if (match) width = parseFloat(match[1])
        }

        // 3. Check the full page title / h1 for mm
        if (!width) {
          const title = document.querySelector('h1')?.textContent || ''
          const match = title.match(/(\d+\.?\d*)\s*mm/i)
          if (match) width = parseFloat(match[1])
        }

        // 4. Check any specs/details section
        if (!width) {
          const allText = document.querySelector('.product-info-main, .product.info.detailed')?.textContent || ''
          const matches = allText.match(/(\d+\.?\d*)\s*mm/gi)
          if (matches) {
            // Take the first mm value that's a reasonable chain width (0.5-15mm)
            for (const m of matches) {
              const val = parseFloat(m)
              if (val >= 0.5 && val <= 15) {
                width = val
                break
              }
            }
          }
        }

        // Get SKU for matching
        const skuEl = document.querySelector('.product.attribute.sku .value, [itemprop="sku"]')
        const sku = skuEl?.textContent?.trim() || ''

        // Get the h1 name
        const name = document.querySelector('h1')?.textContent?.trim() || ''

        return { width, sku, name }
      })

      // Find matching chain and update width
      if (widthData.width && widthData.width >= 0.5 && widthData.width <= 15) {
        // Match by SKU
        const chain = skuMap.get(widthData.sku) ||
          // Fallback: match by index (chains were scraped in URL order)
          (i < chains.length ? chains[i] : null)

        if (chain && chain.widthMm === 2.0) {
          chain.widthMm = widthData.width
          updated++
          console.log(`  ${progress} ✓ ${widthData.sku || '?'} → ${widthData.width}mm (${widthData.name?.substring(0, 40)})`)
        } else {
          process.stdout.write('.')
        }
      } else {
        noWidth++
        if (i < chains.length && chains[i]?.widthMm === 2.0) {
          process.stdout.write('x')
        } else {
          process.stdout.write('.')
        }
      }
    } catch {
      process.stdout.write('!')
    }
  }

  await browser.close()

  // Save updated chains
  writeFileSync(chainsFile, JSON.stringify(chains, null, 2))
  console.log(`\n\n✅ Width extraction complete`)
  console.log(`   Updated: ${updated}`)
  console.log(`   No width found: ${noWidth}`)

  // Stats
  const widthCounts: Record<number, number> = {}
  chains.forEach(c => { widthCounts[c.widthMm] = (widthCounts[c.widthMm] || 0) + 1 })
  console.log('\n  Width distribution:')
  Object.entries(widthCounts)
    .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
    .forEach(([w, count]) => console.log(`    ${w}mm: ${count}`))

  // Clean up cookies
  console.log('\nRemember to remove TECIMER_* from .env.local')
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
