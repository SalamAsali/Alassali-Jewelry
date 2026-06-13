import { buildClient } from '@datocms/cma-client-node'
import { upsertOrderToNotion, upsertCustomerToNotion } from '@/lib/notion'

function getDatoClient() {
  return buildClient({ apiToken: process.env.DATOCMS_CMA_TOKEN! })
}

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
  const client = getDatoClient()

  // 1. Find or create customer
  const existingCustomers = await client.items.list({
    filter: {
      type: 'customer',
      fields: { email: { eq: input.customerEmail } },
    },
  })

  let customerId: string
  if (existingCustomers.length > 0) {
    customerId = existingCustomers[0].id
  } else {
    const models = await client.itemTypes.list()
    const customerModel = models.find((m) => m.api_key === 'customer')
    if (!customerModel) throw new Error('Customer model not found in DatoCMS')

    const newCustomer = await client.items.create({
      item_type: { type: 'item_type', id: customerModel.id },
      first_name: input.customerFirstName,
      last_name: input.customerLastName,
      email: input.customerEmail,
      phone: input.customerPhone || '',
      shipping_address: JSON.stringify(input.shippingAddress),
      billing_address: JSON.stringify(input.billingAddress),
      stripe_customer_id: input.stripeCustomerId || '',
      marketing_opt_in: false,
      first_seen_at: new Date().toISOString(),
      lifetime_value_cad: input.totalCad,
      tags: ['New'],
    })
    customerId = newCustomer.id

    // Sync to Notion
    await upsertCustomerToNotion({
      datoItemId: newCustomer.id,
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
  const models = await client.itemTypes.list()
  const orderModel = models.find((m) => m.api_key === 'order')
  if (!orderModel) throw new Error('Order model not found in DatoCMS')

  const order = await client.items.create({
    item_type: { type: 'item_type', id: orderModel.id },
    order_no: orderNo,
    customer: customerId,
    status: 'confirmed',
    items: JSON.stringify(input.items),
    subtotal_cad: input.subtotalCad,
    tax_cad: input.taxCad,
    shipping_cad: input.shippingCad,
    total_cad: input.totalCad,
    shipping_address: JSON.stringify(input.shippingAddress),
    billing_address: JSON.stringify(input.billingAddress),
    stripe_pi_id: input.stripePiId,
    stripe_charge_id: input.stripeChargeId || '',
    shipping_method: input.shippingMethod,
    created_at: new Date().toISOString(),
  })

  // 3. Sync to Notion (fire-and-forget)
  upsertOrderToNotion({
    datoItemId: order.id,
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

  return { orderNo, orderId: order.id, customerId }
}

export async function getOrdersByCustomerEmail(email: string) {
  const client = getDatoClient()

  const customers = await client.items.list({
    filter: {
      type: 'customer',
      fields: { email: { eq: email } },
    },
  })

  if (customers.length === 0) return []

  const orders = await client.items.list({
    filter: {
      type: 'order',
      fields: { customer: { eq: customers[0].id } },
    },
    order_by: 'created_at_DESC',
  })

  return orders
}

export async function getOrderByNumber(orderNo: string) {
  const client = getDatoClient()

  const orders = await client.items.list({
    filter: {
      type: 'order',
      fields: { order_no: { eq: orderNo } },
    },
  })

  return orders[0] || null
}
