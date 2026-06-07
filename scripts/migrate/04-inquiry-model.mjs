// Creates the Inquiry model in DatoCMS for storing customer form submissions.
// Safe to re-run: existing models/fields are skipped.
import { getClient, findItemTypeByApiKey, findFieldByApiKey, log } from './_client.mjs'

const textField = (label, apiKey, required = false) => ({
  label,
  api_key: apiKey,
  field_type: 'string',
  validators: required ? { required: {} } : {},
  appearance: { editor: 'single_line', parameters: { heading: false }, addons: [] },
})

const multiText = (label, apiKey) => ({
  label,
  api_key: apiKey,
  field_type: 'text',
  validators: {},
  appearance: { editor: 'textarea', parameters: {}, addons: [] },
})

const galleryField = (label, apiKey) => ({
  label,
  api_key: apiKey,
  field_type: 'gallery',
  validators: {},
  appearance: { editor: 'gallery', parameters: {}, addons: [] },
})

const dateTimeField = (label, apiKey) => ({
  label,
  api_key: apiKey,
  field_type: 'date_time',
  validators: {},
  appearance: { editor: 'date_time_picker', parameters: {}, addons: [] },
})

const INQUIRY_FIELDS = [
  textField('Name', 'name', true),
  textField('Email', 'email', true),
  textField('Phone', 'phone'),
  textField('Piece Type', 'piece_type'),
  textField('Style', 'style'),
  textField('Budget', 'budget'),
  textField('Metal', 'metal_type'),
  textField('Gold Colour', 'gold_color'),
  textField('Stone Preference', 'stone_preferences'),
  textField('Stone Shape', 'stone_shape'),
  textField('Diamond Type', 'diamond_type'),
  textField('Size', 'size'),
  textField('Timeline', 'timeline'),
  textField('Status', 'status'),
  multiText('Notes', 'notes'),
  galleryField('Inspiration Images', 'inspiration_images'),
  dateTimeField('Submitted At', 'submitted_at'),
]

async function run() {
  const client = getClient()

  let model = await findItemTypeByApiKey(client, 'inquiry')
  if (model) {
    log('model inquiry — already exists')
  } else {
    model = await client.itemTypes.create({
      name: 'Inquiry',
      api_key: 'inquiry',
      singleton: false,
      sortable: false,
      tree: false,
      modular_block: false,
    })
    log('model inquiry — created')
  }

  for (const fieldDef of INQUIRY_FIELDS) {
    const existing = await findFieldByApiKey(client, model.id, fieldDef.api_key)
    if (existing) {
      log(`  field inquiry.${fieldDef.api_key} — exists`)
    } else {
      await client.fields.create(model.id, fieldDef)
      log(`  field inquiry.${fieldDef.api_key} — created`)
    }
  }

  log('Done — Inquiry model is ready in DatoCMS.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
