import { createClient } from '@sanity/client'
import { normalizeEmail } from '@/lib/email'

const sanityWriteClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

/**
 * Resolve a customer document id from an email address, tolerating the
 * mixed-case records written before emails were normalized. The fast path is an
 * exact match on the normalized address; the fallback scan only runs when that
 * misses, so it costs nothing for correctly-stored customers.
 */
async function findCustomerIdByEmail(email: string): Promise<string | null> {
  const normalized = normalizeEmail(email)
  if (!normalized) return null

  const exact = await sanityWriteClient.fetch(
    `*[_type == "customer" && email == $email]{ _id }`,
    { email: normalized }
  )
  if (exact.length > 0) return exact[0]._id

  // Legacy records stored with the visitor's original capitalization.
  const candidates = await sanityWriteClient.fetch(
    `*[_type == "customer" && defined(email)]{ _id, email }`
  )
  const match = candidates.find(
    (c: { email?: string }) => normalizeEmail(c.email) === normalized
  )
  return match?._id ?? null
}

export async function getOrdersByCustomerEmail(email: string) {
  const customerId = await findCustomerIdByEmail(email)
  if (!customerId) return []

  return sanityWriteClient.fetch(
    `*[_type == "order" && customer._ref == $customerId] | order(_createdAt desc)`,
    { customerId }
  )
}

/**
 * Fetch a single order ONLY if it belongs to the given customer.
 *
 * Order numbers are sequential, so fetching by number alone let any signed-in
 * visitor read any other customer's order (name, address, budget, notes) just
 * by editing the URL. Ownership is enforced here rather than in the page so no
 * future caller can forget it.
 */
export async function getOrderForCustomerEmail(orderNo: string, email: string) {
  const customerId = await findCustomerIdByEmail(email)
  if (!customerId) return null

  return sanityWriteClient.fetch(
    `*[_type == "order" && orderNo == $orderNo && customer._ref == $customerId][0]`,
    { orderNo, customerId }
  )
}
