// Creates every model in DATOCMS_MODELS.md, idempotently.
// Safe to re-run: existing models/fields are skipped.
import { getClient, findItemTypeByApiKey, findFieldByApiKey, log } from './_client.mjs'
import { MODEL_DEFS, slugField, linkField } from './_model-spec.mjs'

async function ensureItemType(client, def) {
  const existing = await findItemTypeByApiKey(client, def.api_key)
  if (existing) {
    log(`model ${def.api_key} — exists`)
    return existing
  }
  const created = await client.itemTypes.create({
    name: def.name,
    api_key: def.api_key,
    singleton: def.singleton,
    sortable: false,
    tree: false,
    modular_block: false,
  })
  log(`model ${def.api_key} — created`)
  return created
}

async function ensureField(client, itemType, fieldDef, titleFieldId) {
  // Expand deferred descriptors that need itemType resolution.
  let spec = fieldDef
  if (fieldDef.__slug) {
    spec = slugField(fieldDef.label, fieldDef.api_key, titleFieldId)
  } else if (fieldDef.__link) {
    const target = await findItemTypeByApiKey(client, fieldDef.target)
    if (!target) {
      throw new Error(
        `Cannot create link field "${fieldDef.api_key}" on ${itemType.api_key}: ` +
          `target model "${fieldDef.target}" not found. Create target first.`,
      )
    }
    spec = linkField(fieldDef.label, fieldDef.api_key, target.id)
  }

  const existing = await findFieldByApiKey(client, itemType.id, spec.api_key)
  if (existing) {
    log(`  field ${itemType.api_key}.${spec.api_key} — exists`)
    return existing
  }
  const created = await client.fields.create(itemType.id, spec)
  log(`  field ${itemType.api_key}.${spec.api_key} — created`)
  return created
}

async function ensureSingletonInstance(client, itemType) {
  if (!itemType.singleton) return
  try {
    await client.items.list({
      filter: { type: itemType.api_key },
      page: { limit: 1 },
    })
  } catch {
    /* ignore */
  }
  // Creating a singleton instance is optional — DatoCMS auto-creates on first
  // edit in the UI. 03-records will ensure instances exist with real data.
}

async function run() {
  const client = getClient()
  log('Starting model migration…')

  for (const def of MODEL_DEFS) {
    const itemType = await ensureItemType(client, def)

    // Ensure title-bearing field exists first so slug fields can reference it.
    let titleFieldId = null
    if (def.titleApiKey) {
      const titleDef = def.fields.find((f) => f.api_key === def.titleApiKey)
      if (!titleDef) {
        throw new Error(
          `Model ${def.api_key} declares titleApiKey="${def.titleApiKey}" but no matching field.`,
        )
      }
      const titleField = await ensureField(client, itemType, titleDef, null)
      titleFieldId = titleField.id
    }

    for (const fieldDef of def.fields) {
      if (fieldDef.api_key === def.titleApiKey) continue // already created above
      await ensureField(client, itemType, fieldDef, titleFieldId)
    }

    await ensureSingletonInstance(client, itemType)
  }

  log('Model migration complete.')
}

run().catch((err) => {
  console.error('[migrate] failed:', err?.message || err)
  if (err?.response?.body) {
    console.error(JSON.stringify(err.response.body, null, 2))
  }
  process.exit(1)
})
