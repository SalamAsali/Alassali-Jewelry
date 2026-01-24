/**
 * Sanitize PostgreSQL connection string for Payload/Neon.
 * - Fixes duplicate ?sslmode=require (e.g. ?sslmode=require?sslmode=require)
 * - Ensures sslmode=require for Neon (parsed correctly by pg/postgres adapter)
 */
export function sanitizeDatabaseUrl(url: string | undefined): string {
  const fallback = 'postgresql://localhost:5432/jewelry'
  if (!url || typeof url !== 'string') return fallback

  let u = url.trim()
  // Fix duplicate ?sslmode=require (invalid; breaks pg parser)
  while (u.includes('?sslmode=require?sslmode=require')) {
    u = u.replace('?sslmode=require?sslmode=require', '?sslmode=require')
  }
  return u
}
