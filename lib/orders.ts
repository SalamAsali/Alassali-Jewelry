import { createClient } from '@sanity/client'
import { upsertOrderToNotion, upsertCustomerToNotion } from '@/lib/notion'

const sanityWriteClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

function generateOrderNumber(): string {
  const seq = Date.now().toString().slice(-9).padStart(9, '0')
  return `AL-${seq}`
}

interface LineItem {
  chainId?: string
  sku: string
  name: string
  metal: string
  karat: string
  lengthIn: number
  weightG: number
  unitPriceCad: number
  qty: number
  lineSubtotal: number
}

interface CreateOrderInput {
  customerEmail: string
  customerFirstName: string
  customerLastName: string
  customerPhone?: string
  items: LineItem[]
  subtotalCad: number
  taxCad: number
  shippingCad: number
  totalCad: number
  shippingAddress: Record<string, string>
  billingAddress: Record<string, string>
  stripePiId: string
  stripeChargeId?: string
  shippingMethod: string
  stripeCustomerId?: string
}

export async function createOrderFromStripeEvent(input: CreateOrderInput) {
  // 1. Find or create customer
  const existingCustomers = await sanityWriteClient.fetch(
    `*[_type == "customer" && email == $email]{ _id }`,
    { email: input.customerEmail }
  )

  let customerId: string
  if (existingCustomers.length > 0) {
    customerId = existingCustomers[0]._id
  } else {
    const newCustomer = await sanityWriteClient.create({
      _type: 'customer',
      firstName: input.customerFirstName,
      lastName: input.customerLastName,
      email: input.customerEmail,
      phone: input.customerPhone || '',
      shippingAddress: { _type: 'address', ...input.shippingAddress },
      billingAddress: { _type: 'address', ...input.billingAddress },
      stripeCustomerId: input.stripeCustomerId || '',
      marketingOptIn: false,
      firstSeenAt: new Date().toISOString(),
      lifetimeValueCad: input.totalCad,
      tags: ['New'],
    })
    customerId = newCustomer._id

    await upsertCustomerToNotion({
      datoItemId: newCustomer._id,
      firstName: input.customerFirstName,
      lastName: input.customerLastName,
      email: input.customerEmail,
      phone: input.customerPhone,
      stripeCustomerId: input.stripeCustomerId,
      marketingOptIn: false,
    }).catch((err) => console.error('[orders] Notion customer sync failed:', err))
  }

  // 2. Create order
  const orderNo = generateOrderNumber()
  const order = await sanityWriteClient.create({
    _type: 'order',
    orderNo,
    customer: { _type: 'reference', _ref: customerId },
    items: input.items.map((item, i) => ({
      _type: 'orderItem',
      _key: `item${i}`,
      name: item.name,
      quantity: item.qty,
      unitPrice: item.unitPriceCad,
      karat: item.karat,
      metal: item.metal,
      length: item.lengthIn,
    })),
    subtotalCad: input.subtotalCad,
    taxCad: input.taxCad,
    shippingCad: input.shippingCad,
    totalCad: input.totalCad,
    shippingAddress: { _type: 'address', ...input.shippingAddress },
    billingAddress: { _type: 'address', ...input.billingAddress },
    stripePiId: input.stripePiId,
    stripeChargeId: input.stripeChargeId || '',
    shippingMethod: input.shippingMethod,
  })

  // 3. Sync to Notion (fire-and-forget)
  upsertOrderToNotion({
    datoItemId: order._id,
    orderNo,
    customerName: `${input.customerFirstName} ${input.customerLastName}`,
    status: 'Confirmed',
    totalCad: input.totalCad,
    itemsCount: input.items.length,
    createdAt: new Date().toISOString(),
    shippingMethod: input.shippingMethod,
    stripePiId: input.stripePiId,
    itemsJson: JSON.stringify(input.items),
  }).catch((err) => console.error('[orders] Notion order sync failed:', err))

  return { orderNo, orderId: order._id, customerId }
}

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
