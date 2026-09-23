/**
 * Canonical form of an email address for customer matching.
 *
 * Every customer lookup in this codebase keys on email, and the two sources
 * disagree on case: Clerk stores addresses lowercased, while the inquiry form
 * stores exactly what the visitor typed. Without normalizing, "John@Gmail.com"
 * from the form and "john@gmail.com" from Clerk create two separate customer
 * records, and the order never appears on the account dashboard.
 *
 * Normalize on every write AND every read so the two always meet.
 */
export function normalizeEmail(email: string | null | undefined): string {
  return (email ?? '').trim().toLowerCase()
}
