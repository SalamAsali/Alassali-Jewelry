import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// ---------------------------------------------------------------------------
// Order stages (unified for custom + chain orders)
// ---------------------------------------------------------------------------
export const ORDER_STAGES = [
  'Initial Inquiry',
  'Payment Made',
  'In Progress',
  'Shipped',
  'Completed',
] as const

export type OrderStage = (typeof ORDER_STAGES)[number]

// Map Sanity status values to Notion stages
export const SANITY_TO_NOTION_STAGE: Record<string, OrderStage> = {
  initial_inquiry: 'Initial Inquiry',
  payment_made: 'Payment Made',
  in_progress: 'In Progress',
  shipped: 'Shipped',
  completed: 'Completed',
  // legacy mappings
  pending: 'Initial Inquiry',
  confirmed: 'Payment Made',
  in_production: 'In Progress',
  delivered: 'Completed',
}

// Map Notion stages to Sanity status values
export const NOTION_TO_SANITY_STATUS: Record<string, string> = {
  'Initial Inquiry': 'initial_inquiry',
  'Payment Made': 'payment_made',
  'In Progress': 'in_progress',
  'Shipped': 'shipped',
  'Completed': 'completed',
  // legacy Notion stages
  '1. Initial inquiry': 'initial_inquiry',
  '2. Send deposit for design': 'payment_made',
  '3. Finalize & manufacture': 'in_progress',
}

// ---------------------------------------------------------------------------
// Helpers — v5.22 uses dataSources.query instead of databases.query
// ---------------------------------------------------------------------------

async function queryDataSource(
  dataSourceId: string,
  options: { filter?: any; sorts?: any[]; page_size?: number }
) {
  return notion.dataSources.query({
    data_source_id: dataSourceId,
    ...options,
  } as any)
}

// ---------------------------------------------------------------------------
// Customers
// ---------------------------------------------------------------------------

/** Find a customer in Notion by email. Returns the page ID or null. */
export async function findCustomerByEmail(email: string): Promise<string | null> {
  const dsId = process.env.NOTION_CUSTOMERS_DATA_SOURCE_ID
  if (!dsId) return null

  const result = await queryDataSource(dsId, {
    filter: { property: 'Email', email: { equals: email } },
    page_size: 1,
  })

  return result.results.length > 0 ? result.results[0].id : null
}

/**
 * Find or create a customer in Notion, deduplicating by email.
 * Returns the Notion page ID.
 */
export async function findOrCreateCustomer(customer: {
  name: string
  email: string
  phone?: string
  address?: string
}): Promise<string | null> {
  const dbId = process.env.NOTION_CUSTOMERS_DB_ID
  if (!dbId) return null

  const existing = await findCustomerByEmail(customer.email)
  if (existing) return existing

  const properties: Record<string, any> = {
    Customer: { title: [{ text: { content: customer.name } }] },
    Email: { email: customer.email },
  }
  if (customer.phone) {
    properties.Phone = { phone_number: customer.phone }
  }
  if (customer.address) {
    properties.address = { rich_text: [{ text: { content: customer.address } }] }
  }

  const page = await notion.pages.create({
    parent: { database_id: dbId },
    properties,
  })

  return page.id
}

// ---------------------------------------------------------------------------
// Order numbers — alternating dual-sequence (0199xxxx / 8703xxxx)
// ---------------------------------------------------------------------------

const SEQ_A_PREFIX = '0199'
const SEQ_B_PREFIX = '8703'

function parseOrderNumber(title: string): { prefix: string; seq: number } | null {
  const match = title.match(/Job #(\d{4})(\d{4})/)
  if (!match) return null
  return { prefix: match[1], seq: parseInt(match[2], 10) }
}

/**
 * Query all orders from Notion, find the highest number in each sequence,
 * and return the next one from whichever sequence was used less recently.
 */
export async function getNextOrderNumber(): Promise<string> {
  const dsId = process.env.NOTION_ORDERS_DATA_SOURCE_ID
  if (!dsId) return `Job #${SEQ_A_PREFIX}0001`

  const result = await queryDataSource(dsId, {
    sorts: [{ property: 'Created', direction: 'descending' }],
    page_size: 100,
  })

  let maxA = 0
  let maxB = 0
  let lastUsed: 'A' | 'B' | null = null

  for (const page of result.results) {
    if (!('properties' in page)) continue
    const titleProp = (page as any).properties?.Order
    if (!titleProp || titleProp.type !== 'title') continue
    const title = titleProp.title?.[0]?.plain_text || ''
    const parsed = parseOrderNumber(title)
    if (!parsed) continue

    if (parsed.prefix === SEQ_A_PREFIX) {
      if (parsed.seq > maxA) maxA = parsed.seq
      if (!lastUsed) lastUsed = 'A'
    } else if (parsed.prefix === SEQ_B_PREFIX) {
      if (parsed.seq > maxB) maxB = parsed.seq
      if (!lastUsed) lastUsed = 'B'
    }
  }

  // Pick the sequence that was NOT used most recently
  if (lastUsed === 'A' || lastUsed === null) {
    const next = maxB + 1
    return `Job #${SEQ_B_PREFIX}${next.toString().padStart(4, '0')}`
  } else {
    const next = maxA + 1
    return `Job #${SEQ_A_PREFIX}${next.toString().padStart(4, '0')}`
  }
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

/** Create an order in Notion linked to a customer via the relation. */
export async function createOrderInNotion(order: {
  orderNo: string
  customerPageId: string | null
  stage: OrderStage
  totalCad?: number
  notes?: string
  products?: string[]
  paymentType?: 'Cash' | 'E-transfer' | 'Credit Card'
}): Promise<string | null> {
  const dbId = process.env.NOTION_ORDERS_DB_ID
  if (!dbId) return null

  const properties: Record<string, any> = {
    Order: { title: [{ text: { content: order.orderNo } }] },
    Stage: { status: { name: order.stage } },
  }

  if (order.customerPageId) {
    properties['Customer (synced)'] = {
      relation: [{ id: order.customerPageId }],
    }
  }
  if (order.totalCad !== undefined) {
    properties['Order total'] = { number: order.totalCad }
  }
  if (order.notes) {
    properties.Notes = { rich_text: [{ text: { content: order.notes.substring(0, 2000) } }] }
  }
  if (order.products && order.products.length > 0) {
    properties.Products = {
      multi_select: order.products.map((p: string) => ({ name: p })),
    }
  }
  if (order.paymentType) {
    properties['Payment Type'] = { select: { name: order.paymentType } }
  }

  const page = await notion.pages.create({
    parent: { database_id: dbId },
    properties,
  })

  return page.id
}

/** Update an existing order's stage in Notion by order number. */
export async function updateOrderStageByNumber(
  orderNo: string,
  stage: OrderStage
): Promise<void> {
  const pageId = await findOrderByNumber(orderNo)
  if (!pageId) return

  await notion.pages.update({
    page_id: pageId,
    properties: { Stage: { status: { name: stage } } } as any,
  })
}

/** Find an order in Notion by its order number (title). */
export async function findOrderByNumber(orderNo: string): Promise<string | null> {
  const dsId = process.env.NOTION_ORDERS_DATA_SOURCE_ID
  if (!dsId) return null

  const result = await queryDataSource(dsId, {
    filter: { property: 'Order', title: { equals: orderNo } },
    page_size: 1,
  })

  return result.results.length > 0 ? result.results[0].id : null
}

// ---------------------------------------------------------------------------
// Chains (unchanged — different DB)
// ---------------------------------------------------------------------------

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

  // Chains DB may use a separate data source ID, fall back to DB ID for query
  const dsId = process.env.NOTION_CHAINS_DATA_SOURCE_ID || dbId

  let existing: any = { results: [] }
  try {
    existing = await queryDataSource(dsId, {
      filter: {
        property: 'Dato Item ID',
        rich_text: { equals: chain.datoItemId },
      },
    })
  } catch {
    // If data source query fails, skip dedup
  }

  const properties: Record<string, any> = {
    Name: { title: [{ text: { content: chain.name } }] },
    'Chain Type': { select: { name: chain.chainType } },
    'Width (mm)': { number: chain.widthMm },
    Construction: { select: { name: chain.construction } },
    Active: { checkbox: chain.active },
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

// ---------------------------------------------------------------------------
// Spot price logging
// ---------------------------------------------------------------------------

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
      Date: { title: [{ text: { content: price.fetchedAt } }] },
      'Spot 24k CAD/g': { number: price.spot24kCad },
      Source: { select: { name: price.source } },
    },
  })
}
