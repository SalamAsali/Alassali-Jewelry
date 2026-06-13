/**
 * Create all DatoCMS models needed for the Chains Launch.
 * Run: npx tsx scripts/create-dato-models.ts
 *
 * Creates: chain, pricingConfig, chainsLanding, customer, order
 * Idempotent — skips models that already exist.
 */

import { buildClient } from '@datocms/cma-client-node'

async function main() {
  const token = process.env.DATOCMS_CMA_TOKEN
  if (!token) {
    console.error('Missing DATOCMS_CMA_TOKEN')
    process.exit(1)
  }

  const client = buildClient({ apiToken: token })
  const existingModels = await client.itemTypes.list()
  const existingKeys = new Set(existingModels.map((m) => m.api_key))

  // Helper to skip if exists
  async function createModel(apiKey: string, name: string, opts: Record<string, unknown> = {}) {
    if (existingKeys.has(apiKey)) {
      console.log(`  ⏭  Model "${apiKey}" already exists — skipping`)
      return existingModels.find((m) => m.api_key === apiKey)!
    }
    const model = await client.itemTypes.create({
      name,
      api_key: apiKey,
      ...opts,
    })
    console.log(`  ✓  Created model "${apiKey}" (ID: ${model.id})`)
    return model
  }

  // ═══════════════════════════════════════════════
  // 1. chain (collection)
  // ═══════════════════════════════════════════════
  console.log('\n1/5 — chain')
  const chain = await createModel('chain', 'Chain', { sortable: true })

  if (!existingKeys.has('chain')) {
    const fields = [
      { label: 'Name', api_key: 'name', field_type: 'string', validators: { required: {} } },
      { label: 'Slug', api_key: 'slug', field_type: 'slug', validators: { required: {}, slug_title_field: { title_field_id: '' } } },
      { label: 'Chain Type', api_key: 'chain_type', field_type: 'string', validators: { required: {}, enum: { values: ['cuban','figaro','rope','box','byzantine','snake','herringbone','mariner','wheat','bead','paperclip','curb','cable','franco','round-link','anchor','singapore','oval-link','domed-cuban'] } } },
      { label: 'Width (mm)', api_key: 'width_mm', field_type: 'float', validators: { required: {} } },
      { label: 'Available Metals', api_key: 'available_metals', field_type: 'json' },
      { label: 'Available Karats', api_key: 'available_karats', field_type: 'json' },
      { label: 'Available Lengths', api_key: 'available_lengths', field_type: 'json' },
      { label: 'Construction', api_key: 'construction', field_type: 'string', validators: { enum: { values: ['hollow','semi-solid','solid'] } } },
      { label: 'Weight Per Inch (g)', api_key: 'weight_per_inch_g', field_type: 'float', validators: { required: {} } },
      { label: 'Hero Image', api_key: 'hero_image', field_type: 'file' },
      { label: 'Gallery Images', api_key: 'gallery_images', field_type: 'gallery' },
      { label: 'Default Karat', api_key: 'default_karat', field_type: 'string', validators: { enum: { values: ['10k','14k','18k'] } } },
      { label: 'Default Metal', api_key: 'default_metal', field_type: 'string', validators: { enum: { values: ['yellow-gold','white-gold','rose-gold','two-tone'] } } },
      { label: 'Default Length (in)', api_key: 'default_length_in', field_type: 'integer' },
      { label: 'Description', api_key: 'description', field_type: 'text' },
      { label: 'Specifications', api_key: 'specifications', field_type: 'text' },
      { label: 'SEO Title', api_key: 'seo_title', field_type: 'string' },
      { label: 'SEO Description', api_key: 'seo_description', field_type: 'text' },
      { label: 'Featured', api_key: 'featured', field_type: 'boolean' },
      { label: 'Order', api_key: 'order', field_type: 'integer' },
      { label: 'Supplier SKU', api_key: 'supplier_sku', field_type: 'string' },
      { label: 'Active', api_key: 'active', field_type: 'boolean' },
    ]

    // Create name field first to get its ID for slug
    let nameFieldId = ''
    for (const f of fields) {
      const fieldData: Record<string, unknown> = {
        label: f.label,
        api_key: f.api_key,
        field_type: f.field_type,
        item_type: { type: 'item_type', id: chain.id },
      }

      // Handle slug field — link to name field
      if (f.api_key === 'slug' && nameFieldId) {
        fieldData.validators = { required: {}, slug_title_field: { title_field_id: nameFieldId } }
      } else if (f.validators) {
        fieldData.validators = f.validators
      }

      try {
        const field = await client.fields.create(chain.id, fieldData as any)
        if (f.api_key === 'name') nameFieldId = field.id
        process.stdout.write('.')
      } catch (err: any) {
        if (err?.message?.includes('already exists') || err?.body?.data?.[0]?.attributes?.details?.code === 'VALIDATION_UNIQUE') {
          process.stdout.write('s')
        } else {
          console.error(`\n    ✗ Field "${f.api_key}":`, err?.message || err)
        }
      }
    }
    console.log(' done')
  }

  // ═══════════════════════════════════════════════
  // 2. pricingConfig (singleton)
  // ═══════════════════════════════════════════════
  console.log('\n2/5 — pricingConfig')
  const pricing = await createModel('pricing_config', 'Pricing Config', { singleton: true })

  if (!existingKeys.has('pricing_config')) {
    const fields = [
      { label: 'Markup 18k', api_key: 'markup_18k', field_type: 'float' },
      { label: 'Markup 14k', api_key: 'markup_14k', field_type: 'float' },
      { label: 'Markup 10k', api_key: 'markup_10k', field_type: 'float' },
      { label: 'Making Charge Per Gram', api_key: 'making_charge_per_gram', field_type: 'float' },
      { label: 'Heavy Chain Surcharge Per Gram', api_key: 'heavy_chain_surcharge_per_gram', field_type: 'float' },
      { label: 'Clasp Charge CAD', api_key: 'clasp_charge_cad', field_type: 'float' },
      { label: 'Spot Price Source', api_key: 'spot_price_source', field_type: 'string' },
      { label: 'Last Spot 24k', api_key: 'last_spot_24k', field_type: 'float' },
      { label: 'Spot Updated At', api_key: 'spot_updated_at', field_type: 'date_time' },
      { label: 'Manual Override Active', api_key: 'manual_override_active', field_type: 'boolean' },
    ]
    for (const f of fields) {
      try {
        await client.fields.create(pricing.id, {
          label: f.label,
          api_key: f.api_key,
          field_type: f.field_type,
          item_type: { type: 'item_type', id: pricing.id },
        } as any)
        process.stdout.write('.')
      } catch (err: any) {
        process.stdout.write('s')
      }
    }
    console.log(' done')
  }

  // ═══════════════════════════════════════════════
  // 3. chainsLanding (singleton)
  // ═══════════════════════════════════════════════
  console.log('\n3/5 — chainsLanding')
  const landing = await createModel('chains_landing', 'Chains Landing', { singleton: true })

  if (!existingKeys.has('chains_landing')) {
    const fields = [
      { label: 'Hero Title', api_key: 'hero_title', field_type: 'string' },
      { label: 'Hero Subtitle', api_key: 'hero_subtitle', field_type: 'text' },
      { label: 'Hero Image', api_key: 'hero_image', field_type: 'file' },
      { label: 'Metal Picker Yellow Image', api_key: 'metal_picker_yellow_image', field_type: 'file' },
      { label: 'Metal Picker White Image', api_key: 'metal_picker_white_image', field_type: 'file' },
      { label: 'FAQ Items', api_key: 'faq_items', field_type: 'json' },
    ]
    for (const f of fields) {
      try {
        await client.fields.create(landing.id, {
          label: f.label,
          api_key: f.api_key,
          field_type: f.field_type,
          item_type: { type: 'item_type', id: landing.id },
        } as any)
        process.stdout.write('.')
      } catch { process.stdout.write('s') }
    }
    console.log(' done')
  }

  // ═══════════════════════════════════════════════
  // 4. customer (collection)
  // ═══════════════════════════════════════════════
  console.log('\n4/5 — customer')
  const customer = await createModel('customer', 'Customer')

  if (!existingKeys.has('customer')) {
    const fields = [
      { label: 'First Name', api_key: 'first_name', field_type: 'string' },
      { label: 'Last Name', api_key: 'last_name', field_type: 'string' },
      { label: 'Email', api_key: 'email', field_type: 'string', validators: { required: {}, unique: {} } },
      { label: 'Phone', api_key: 'phone', field_type: 'string' },
      { label: 'Business Name', api_key: 'business_name', field_type: 'string' },
      { label: 'Shipping Address', api_key: 'shipping_address', field_type: 'json' },
      { label: 'Billing Address', api_key: 'billing_address', field_type: 'json' },
      { label: 'Stripe Customer ID', api_key: 'stripe_customer_id', field_type: 'string' },
      { label: 'Marketing Opt-In', api_key: 'marketing_opt_in', field_type: 'boolean' },
      { label: 'Notion Page ID', api_key: 'notion_page_id', field_type: 'string' },
      { label: 'First Seen At', api_key: 'first_seen_at', field_type: 'date_time' },
      { label: 'Lifetime Value CAD', api_key: 'lifetime_value_cad', field_type: 'float' },
      { label: 'Tags', api_key: 'tags', field_type: 'json' },
      { label: 'Internal Notes', api_key: 'internal_notes', field_type: 'text' },
    ]
    for (const f of fields) {
      try {
        await client.fields.create(customer.id, {
          label: f.label,
          api_key: f.api_key,
          field_type: f.field_type,
          item_type: { type: 'item_type', id: customer.id },
          ...(f.validators ? { validators: f.validators } : {}),
        } as any)
        process.stdout.write('.')
      } catch { process.stdout.write('s') }
    }
    console.log(' done')
  }

  // ═══════════════════════════════════════════════
  // 5. order (collection)
  // ═══════════════════════════════════════════════
  console.log('\n5/5 — order')
  const order = await createModel('order', 'Order')

  if (!existingKeys.has('order')) {
    const fields = [
      { label: 'Order Number', api_key: 'order_no', field_type: 'string', validators: { required: {}, unique: {} } },
      { label: 'Customer', api_key: 'customer', field_type: 'link', validators: { item_item_type: { on_publish_with_unpublished_references_strategy: 'fail', on_reference_unpublish_strategy: 'delete_references', on_reference_delete_strategy: 'delete_references', item_types: [customer.id] } } },
      { label: 'Status', api_key: 'status', field_type: 'string', validators: { enum: { values: ['pending','confirmed','in_production','shipped','delivered','cancelled','refunded'] } } },
      { label: 'Items', api_key: 'items', field_type: 'json' },
      { label: 'Subtotal CAD', api_key: 'subtotal_cad', field_type: 'float' },
      { label: 'Tax CAD', api_key: 'tax_cad', field_type: 'float' },
      { label: 'Shipping CAD', api_key: 'shipping_cad', field_type: 'float' },
      { label: 'Total CAD', api_key: 'total_cad', field_type: 'float' },
      { label: 'Shipping Address', api_key: 'shipping_address', field_type: 'json' },
      { label: 'Billing Address', api_key: 'billing_address', field_type: 'json' },
      { label: 'Stripe PI ID', api_key: 'stripe_pi_id', field_type: 'string' },
      { label: 'Stripe Charge ID', api_key: 'stripe_charge_id', field_type: 'string' },
      { label: 'Shipping Method', api_key: 'shipping_method', field_type: 'string', validators: { enum: { values: ['pickup','canada-post','fedex','ups'] } } },
      { label: 'Tracking Number', api_key: 'tracking_number', field_type: 'string' },
      { label: 'Tracking URL', api_key: 'tracking_url', field_type: 'string' },
      { label: 'Estimated Ship Date', api_key: 'estimated_ship_date', field_type: 'date' },
      { label: 'Actual Ship Date', api_key: 'actual_ship_date', field_type: 'date' },
      { label: 'Notion Page ID', api_key: 'notion_page_id', field_type: 'string' },
      { label: 'Internal Notes', api_key: 'internal_notes', field_type: 'text' },
      { label: 'Fulfilment Notes', api_key: 'fulfilment_notes', field_type: 'text' },
      { label: 'Created At', api_key: 'created_at', field_type: 'date_time' },
    ]
    for (const f of fields) {
      try {
        await client.fields.create(order.id, {
          label: f.label,
          api_key: f.api_key,
          field_type: f.field_type,
          item_type: { type: 'item_type', id: order.id },
          ...(f.validators ? { validators: f.validators } : {}),
        } as any)
        process.stdout.write('.')
      } catch (err: any) {
        process.stdout.write('s')
      }
    }
    console.log(' done')
  }

  // ═══════════════════════════════════════════════
  // Register DatoCMS webhook
  // ═══════════════════════════════════════════════
  console.log('\n— Registering DatoCMS webhook')
  try {
    const existingWebhooks = await client.webhooks.list()
    const alreadyExists = existingWebhooks.some(
      (w) => w.url === 'https://www.alasalicustomjewelry.ca/api/sync/dato-to-notion'
    )
    if (alreadyExists) {
      console.log('  ⏭  Webhook already registered')
    } else {
      await client.webhooks.create({
        name: 'Dato → Notion Sync',
        url: 'https://www.alasalicustomjewelry.ca/api/sync/dato-to-notion',
        custom_payload: null,
        headers: {
          'x-dato-webhook-secret': process.env.DATO_WEBHOOK_SECRET || '',
        },
        events: [
          { entity_type: 'item', event_types: ['create', 'update', 'delete'] },
        ],
        http_basic_user: null,
        http_basic_password: null,
        enabled: true,
      } as any)
      console.log('  ✓  Webhook registered')
    }
  } catch (err: any) {
    console.error('  ✗  Webhook registration failed:', err?.message || err)
  }

  console.log('\n✅ All models created. Now run: npx tsx scripts/seed-pricing-config.ts')
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
