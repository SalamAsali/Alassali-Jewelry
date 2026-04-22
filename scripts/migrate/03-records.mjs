// Seeds every record from _seed-data.mjs, idempotently.
// Assumes 01-models.mjs and 02-uploads.mjs have already run successfully.
import { getClient, findItemTypeByApiKey, repoPath, log } from './_client.mjs'
import {
  loadUploadMap,
  findRecordByField,
  findRecordByScan,
  getSingleton,
} from './_record-helpers.mjs'
import {
  PORTFOLIO_PAGE,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  FAQ_PAGE,
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  BLOG_INDEX,
  BLOG_POSTS,
  MASTER_JEWELLER,
  FOOTER,
} from './_seed-data.mjs'

const UPLOAD_MAP = loadUploadMap(repoPath('scripts', 'migrate', '.uploads.json'))

// ---------- Generic record create/update helpers ----------

async function upsertSingleton(client, itemTypeApiKey, payload) {
  const itemType = await findItemTypeByApiKey(client, itemTypeApiKey)
  if (!itemType) throw new Error(`Model ${itemTypeApiKey} not found (run 01-models first)`)

  const existing = await getSingleton(client, itemTypeApiKey)
  if (existing) {
    await client.items.update(existing.id, payload)
    await client.items.publish(existing.id).catch(() => {})
    log(`singleton ${itemTypeApiKey} — updated`)
    return existing
  }
  const created = await client.items.create({ item_type: { type: 'item_type', id: itemType.id }, ...payload })
  await client.items.publish(created.id).catch(() => {})
  log(`singleton ${itemTypeApiKey} — created`)
  return created
}

async function upsertByField(client, itemTypeApiKey, matchField, matchValue, payload, { scan = false } = {}) {
  const itemType = await findItemTypeByApiKey(client, itemTypeApiKey)
  if (!itemType) throw new Error(`Model ${itemTypeApiKey} not found`)

  const existing = scan
    ? await findRecordByScan(client, itemTypeApiKey, matchField, matchValue)
    : await findRecordByField(client, itemTypeApiKey, matchField, matchValue)

  if (existing) {
    await client.items.update(existing.id, payload)
    await client.items.publish(existing.id).catch(() => {})
    return { record: existing, created: false }
  }
  const created = await client.items.create({
    item_type: { type: 'item_type', id: itemType.id },
    ...payload,
  })
  await client.items.publish(created.id).catch(() => {})
  return { record: created, created: true }
}

// ---------- Phase runners ----------

async function seedPortfolio(client) {
  log('— Portfolio —')
  await upsertSingleton(client, 'portfolio_page', {
    heading: PORTFOLIO_PAGE.heading,
    intro: PORTFOLIO_PAGE.intro,
  })

  const categoryIdBySlug = {}
  for (const cat of PORTFOLIO_CATEGORIES) {
    const { record, created } = await upsertByField(
      client,
      'portfolio_category',
      'slug',
      cat.slug,
      { name: cat.name, slug: cat.slug, order: cat.order },
    )
    categoryIdBySlug[cat.slug] = record.id
    log(`  category ${cat.slug} — ${created ? 'created' : 'updated'}`)
  }

  for (const item of PORTFOLIO_ITEMS) {
    const uploadId = UPLOAD_MAP[item.image]
    if (!uploadId) {
      log(`  skip "${item.name}" — no upload for ${item.image}`)
      continue
    }
    const categoryId = categoryIdBySlug[item.categorySlug]
    const payload = {
      name: item.name,
      category: categoryId,
      image: { upload_id: uploadId },
      order: item.order,
    }
    const { created } = await upsertByField(
      client,
      'portfolio_item',
      'name',
      item.name,
      payload,
      { scan: true },
    )
    log(`  item "${item.name.slice(0, 48)}" — ${created ? 'created' : 'updated'}`)
  }
}

async function seedFaq(client) {
  log('— FAQ —')
  await upsertSingleton(client, 'faq_page', {
    heading: FAQ_PAGE.heading,
    intro: FAQ_PAGE.intro,
  })

  const categoryIdByName = {}
  for (const cat of FAQ_CATEGORIES) {
    const { record, created } = await upsertByField(
      client,
      'faq_category',
      'name',
      cat.name,
      { name: cat.name, order: cat.order },
      { scan: true },
    )
    categoryIdByName[cat.name] = record.id
    log(`  category "${cat.name}" — ${created ? 'created' : 'updated'}`)
  }

  for (const item of FAQ_ITEMS) {
    const categoryId = categoryIdByName[item.category]
    const { created } = await upsertByField(
      client,
      'faq_item',
      'question',
      item.question,
      { question: item.question, answer: item.answer, category: categoryId, order: item.order },
      { scan: true },
    )
    log(`  item "${item.question.slice(0, 48)}" — ${created ? 'created' : 'updated'}`)
  }
}

async function seedBlog(client) {
  log('— Blog —')
  await upsertSingleton(client, 'blog_index', {
    heading: BLOG_INDEX.heading,
    intro: BLOG_INDEX.intro,
    seo_title: BLOG_INDEX.seo_title,
    seo_description: BLOG_INDEX.seo_description,
  })

  for (const post of BLOG_POSTS) {
    const { created } = await upsertByField(client, 'blog_post', 'slug', post.slug, {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      reading_minutes: post.reading_minutes,
      tag: post.tag,
    })
    log(`  post "${post.slug}" — ${created ? 'created' : 'updated'}`)
  }
}

async function seedMasterJeweller(client) {
  log('— Master jeweller —')
  const { created } = await upsertByField(client, 'master_jeweller', 'slug', MASTER_JEWELLER.slug, {
    slug: MASTER_JEWELLER.slug,
    name: MASTER_JEWELLER.name,
    title: MASTER_JEWELLER.title,
    tagline: MASTER_JEWELLER.tagline,
    bio: MASTER_JEWELLER.bio,
    seo_title: MASTER_JEWELLER.seo_title,
    seo_description: MASTER_JEWELLER.seo_description,
  })
  log(`  master_jeweller "${MASTER_JEWELLER.slug}" — ${created ? 'created' : 'updated'}`)
}

async function seedFooter(client) {
  log('— Footer —')
  await upsertSingleton(client, 'footer', {
    tagline: FOOTER.tagline,
    phone: FOOTER.phone,
    email: FOOTER.email,
    location: FOOTER.location,
  })
}

async function run() {
  const client = getClient()
  log('Starting record seeding…')
  await seedPortfolio(client)
  await seedFaq(client)
  await seedBlog(client)
  await seedMasterJeweller(client)
  await seedFooter(client)
  log('Seeding complete.')
}

run().catch((err) => {
  console.error('[migrate] failed:', err?.message || err)
  if (err?.response?.body) {
    console.error(JSON.stringify(err.response.body, null, 2))
  }
  process.exit(1)
})
