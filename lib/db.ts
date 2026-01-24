/**
 * Sanitize PostgreSQL connection string for Payload/Neon.
 * - Uses only DATABASE_URL (strips channel_binding and other terminal-only flags).
 * - Fixes duplicate ?sslmode=require. Ensures single ?sslmode=require for Neon.
 */
export function sanitizeDatabaseUrl(url: string | undefined): string {
  const fallback = 'postgresql://localhost:5432/jewelry'
  if (!url || typeof url !== 'string') return fallback

  let u = url.trim()
  // Fix duplicate ?sslmode=require (invalid)
  while (u.includes('?sslmode=require?sslmode=require')) {
    u = u.replace('?sslmode=require?sslmode=require', '?sslmode=require')
  }
  const idx = u.indexOf('?')
  if (idx === -1) return u
  const base = u.slice(0, idx)
  const qs = u.slice(idx + 1)
  try {
    const params = new URLSearchParams(qs)
    params.delete('channel_binding')
    if (!params.has('sslmode')) params.set('sslmode', 'require')
    const clean = params.toString()
    return clean ? `${base}?${clean}` : base
  } catch {
    return u
  }
}
