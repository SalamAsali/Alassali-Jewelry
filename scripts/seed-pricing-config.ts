/**
 * Seed the DatoCMS pricingConfig singleton with Option 2 (Balanced) defaults.
 * Run once: npx tsx scripts/seed-pricing-config.ts
 *
 * Requires: DATOCMS_CMA_TOKEN env var
 */

import { buildClient } from '@datocms/cma-client-node'

async function main() {
  const token = process.env.DATOCMS_CMA_TOKEN
  if (!token) {
    console.error('Missing DATOCMS_CMA_TOKEN env var')
    process.exit(1)
  }

  const client = buildClient({ apiToken: token })

  // Check if pricingConfig record already exists
  const existing = await client.items.list({
    filter: { type: 'pricing_config' },
  })

  const defaults = {
    markup_eighteen_k: 0.60,
    markup_fourteen_k: 0.80,
    markup_ten_k: 0.95,
    making_charge_per_gram: 10.0,
    heavy_chain_surcharge_per_gram: 7.0,
    clasp_charge_cad: 50.0,
    spot_price_source: 'goldapi.io',
    last_spot_twentyfour_k: 184.13, // June 13, 2026 baseline
    spot_updated_at: new Date().toISOString(),
    manual_override_active: false,
  }

  if (existing.length > 0) {
    console.log(`pricingConfig already exists (ID: ${existing[0].id}). Updating...`)
    await client.items.update(existing[0].id, defaults)
    console.log('Updated pricingConfig with Option 2 defaults.')
  } else {
    // Get the model ID for pricing_config
    const models = await client.itemTypes.list()
    const model = models.find((m) => m.api_key === 'pricing_config')
    if (!model) {
      console.error('Model "pricing_config" not found in DatoCMS. Create it first.')
      process.exit(1)
    }

    await client.items.create({
      item_type: { type: 'item_type', id: model.id },
      ...defaults,
    })
    console.log('Created pricingConfig singleton with Option 2 defaults.')
  }

  console.log('\nDefaults seeded:')
  console.log('  18k markup: 60%')
  console.log('  14k markup: 80%')
  console.log('  10k markup: 95%')
  console.log('  Making charge: $10/g')
  console.log('  Heavy chain surcharge: $7/g (width > 6mm)')
  console.log('  Clasp/finishing charge: $50')
  console.log('  Spot source: goldapi.io')
  console.log('  Baseline spot 24k: $184.13 CAD/g')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
