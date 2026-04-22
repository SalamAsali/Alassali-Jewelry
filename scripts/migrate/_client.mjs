// Shared CMA client factory + helpers. Loaded by every migrate step.
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildClient } from '@datocms/cma-client-node'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..', '..')

function loadEnvLocal() {
  const envPath = resolve(repoRoot, '.env.local')
  if (!existsSync(envPath)) return
  const raw = readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

export function getClient() {
  loadEnvLocal()
  const apiToken =
    process.env.DATOCMS_CMA_TOKEN ||
    process.env.DATOCMS_FULL_ACCESS_TOKEN ||
    process.env.DATOCMS_MANAGEMENT_TOKEN
  if (!apiToken) {
    console.error(
      '[migrate] Missing CMA token. Set DATOCMS_CMA_TOKEN in .env.local ' +
        '(DatoCMS → Settings → API Tokens → create a token with write access).',
    )
    process.exit(1)
  }
  return buildClient({
    apiToken,
    environment: process.env.DATOCMS_ENVIRONMENT || undefined,
  })
}

export const repoPath = (...p) => resolve(repoRoot, ...p)

export async function findItemTypeByApiKey(client, apiKey) {
  const types = await client.itemTypes.list()
  return types.find((t) => t.api_key === apiKey) || null
}

export async function findFieldByApiKey(client, itemTypeId, apiKey) {
  const fields = await client.fields.list(itemTypeId)
  return fields.find((f) => f.api_key === apiKey) || null
}

export function log(...args) {
  console.log('[migrate]', ...args)
}
