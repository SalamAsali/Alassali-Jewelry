// Record-level idempotency helpers used by 03-records.mjs.
import { existsSync, readFileSync } from 'node:fs'

export function loadUploadMap(mapPath) {
  if (!existsSync(mapPath)) {
    throw new Error(
      `Missing upload map at ${mapPath}. Run 02-uploads.mjs first.`,
    )
  }
  return JSON.parse(readFileSync(mapPath, 'utf8'))
}

// Find first collection record matching a field value.
// Handles localized and non-localized string fields uniformly.
function extractStringField(record, apiKey) {
  const val = record[apiKey]
  if (val == null) return null
  if (typeof val === 'string') return val
  if (typeof val === 'object') {
    // Localized: { en: "..." }
    const first = Object.values(val).find((v) => typeof v === 'string')
    return first ?? null
  }
  return null
}

export async function findRecordByField(client, itemTypeApiKey, apiKey, value) {
  const iter = client.items.listPagedIterator({
    filter: { type: itemTypeApiKey, fields: { [apiKey]: { eq: value } } },
    page: { limit: 1 },
  })
  for await (const rec of iter) return rec
  return null
}

// Scan fallback: used when the filter-by-field path isn't supported for
// the field type (e.g. text). Returns first match by substring/equality.
export async function findRecordByScan(client, itemTypeApiKey, apiKey, value) {
  const iter = client.items.listPagedIterator({
    filter: { type: itemTypeApiKey },
    page: { limit: 500 },
  })
  for await (const rec of iter) {
    const got = extractStringField(rec, apiKey)
    if (got === value) return rec
  }
  return null
}

export async function getSingleton(client, itemTypeApiKey) {
  const iter = client.items.listPagedIterator({
    filter: { type: itemTypeApiKey },
    page: { limit: 1 },
  })
  for await (const rec of iter) return rec
  return null
}
