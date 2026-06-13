import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// Upsert a chain to the Chains portal DB (if NOTION_CHAINS_DB_ID is set)
export async function upsertChainToNotion(chain: {
  datoItemId: string
  name: string
  chainType: string
  widthMm: number
  construction: string
  availableKarats: string[]
  availableMetals: string[]
  active: boolean
  supplierSku?: string
}) {
  const dbId = process.env.NOTION_CHAINS_DB_ID
  if (!dbId) return null

  // Search for existing page by datoItemId
  const existing = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: 'Dato Item ID',
      rich_text: { equals: chain.datoItemId },
    },
  })

  const properties: Record<string, any> = {
    'Name': { title: [{ text: { content: chain.name } }] },
    'Chain Type': { select: { name: chain.chainType } },
    'Width (mm)': { number: chain.widthMm },
    'Construction': { select: { name: chain.construction } },
    'Active': { checkbox: chain.active },
    'Dato Item ID': { rich_text: [{ text: { content: chain.datoItemId } }] },
  }

  if (chain.supplierSku) {
    properties['Supplier SKU'] = { rich_text: [{ text: { content: chain.supplierSku } }] }
  }

  if (existing.results.length > 0) {
    return notion.pages.update({
      page_id: existing.results[0].id,
      properties,
    })
  }

  return notion.pages.create({
    parent: { database_id: dbId },
    properties,
  })
}

// Upsert an order to Notion CRM Orders DB
export async function upsertOrderToNotion(order: {
  datoItemId: string
  orderNo: string
  customerName: string
  status: string
  totalCad: number
  itemsCount: number
  createdAt: string
  shippingMethod?: string
  trackingNumber?: string
  itemsJson?: string
  stripePiId?: string
}) {
  const dbId = process.env.NOTION_ORDERS_DB_ID
  if (!dbId) return null

  const existing = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: 'Dato Item ID',
      rich_text: { equals: order.datoItemId },
    },
  })

  const properties: Record<string, any> = {
    'Order': { title: [{ text: { content: order.orderNo } }] },
    'Stage': { status: { name: order.status } },
    'Order total': { number: order.totalCad },
    'Source': { select: { name: 'Website' } },
    'Dato Item ID': { rich_text: [{ text: { content: order.datoItemId } }] },
  }

  if (order.orderNo) {
    properties['Order #'] = { rich_text: [{ text: { content: order.orderNo } }] }
  }
  if (order.trackingNumber) {
    properties['Tracking Number'] = { rich_text: [{ text: { content: order.trackingNumber } }] }
  }
  if (order.shippingMethod) {
    properties['Carrier'] = { select: { name: order.shippingMethod } }
  }
  if (order.stripePiId) {
    properties['Stripe PI ID'] = { rich_text: [{ text: { content: order.stripePiId } }] }
  }
  if (order.itemsJson) {
    properties['Items JSON'] = { rich_text: [{ text: { content: order.itemsJson.substring(0, 2000) } }] }
  }

  if (existing.results.length > 0) {
    return notion.pages.update({
      page_id: existing.results[0].id,
      properties,
    })
  }

  return notion.pages.create({
    parent: { database_id: dbId },
    properties,
  })
}

// Upsert a customer to Notion CRM Customers DB
export async function upsertCustomerToNotion(customer: {
  datoItemId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  stripeCustomerId?: string
  marketingOptIn?: boolean
}) {
  const dbId = process.env.NOTION_CUSTOMERS_DB_ID
  if (!dbId) return null

  const existing = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: 'Dato Item ID',
      rich_text: { equals: customer.datoItemId },
    },
  })

  const properties: Record<string, any> = {
    'Customer': { title: [{ text: { content: `${customer.firstName} ${customer.lastName}` } }] },
    'Email': { email: customer.email },
    'Dato Item ID': { rich_text: [{ text: { content: customer.datoItemId } }] },
  }

  if (customer.phone) {
    properties['Phone'] = { phone_number: customer.phone }
  }
  if (customer.firstName) {
    properties['First Name'] = { rich_text: [{ text: { content: customer.firstName } }] }
  }
  if (customer.lastName) {
    properties['Last Name'] = { rich_text: [{ text: { content: customer.lastName } }] }
  }
  if (customer.stripeCustomerId) {
    properties['Stripe Customer ID'] = { rich_text: [{ text: { content: customer.stripeCustomerId } }] }
  }
  if (customer.marketingOptIn !== undefined) {
    properties['Marketing Opt-In'] = { checkbox: customer.marketingOptIn }
  }

  if (existing.results.length > 0) {
    return notion.pages.update({
      page_id: existing.results[0].id,
      properties,
    })
  }

  return notion.pages.create({
    parent: { database_id: dbId },
    properties,
  })
}

// Log a spot price entry
export async function logSpotPrice(price: {
  spot24kCad: number
  fetchedAt: string
  source: string
}) {
  const dbId = process.env.NOTION_SPOT_LOG_DB_ID
  if (!dbId) return null

  return notion.pages.create({
    parent: { database_id: dbId },
    properties: {
      'Date': { title: [{ text: { content: price.fetchedAt } }] },
      'Spot 24k CAD/g': { number: price.spot24kCad },
      'Source': { select: { name: price.source } },
    },
  })
}
