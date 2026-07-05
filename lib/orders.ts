import { createClient } from '@sanity/client'

const sanityWriteClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function getOrdersByCustomerEmail(email: string) {
  const customers = await sanityWriteClient.fetch(
    `*[_type == "customer" && email == $email]{ _id }`,
    { email }
  )
  if (customers.length === 0) return []

  return sanityWriteClient.fetch(
    `*[_type == "order" && customer._ref == $customerId] | order(_createdAt desc)`,
    { customerId: customers[0]._id }
  )
}

export async function getOrderByNumber(orderNo: string) {
  return sanityWriteClient.fetch(
    `*[_type == "order" && orderNo == $orderNo][0]`,
    { orderNo }
  )
}
