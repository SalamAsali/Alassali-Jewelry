import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Al-Asali Jewelry <inquiries@alasalicustomjewelry.ca>'
const NOTIFY = 'contact@alasalicustomjewelry.ca'
const DATO_CMA_BASE = 'https://site-api.datocms.com'

function row(label: string, value: string | undefined) {
  if (!value) return ''
  return `<tr><td style="padding:6px 12px;color:#999;font-size:13px;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#fff;font-size:13px">${value}</td></tr>`
}

function imageGrid(urls: string[]) {
  if (urls.length === 0) return ''
  const imgs = urls
    .map(
      (url) =>
        `<a href="${url}" target="_blank" style="display:inline-block;margin:4px"><img src="${url}" width="180" height="180" style="object-fit:cover;border-radius:6px;border:1px solid #333" alt="Inspiration image"></a>`,
    )
    .join('')
  return `<div style="margin-top:20px"><p style="margin:0 0 8px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px">Inspiration Images</p><div>${imgs}</div></div>`
}

function notificationHtml(body: Record<string, string>, imageUrls: string[]) {
  const name = body.name || `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim()
  const category = (body.jewelryCategory || body.type || 'General').replace(/^\w/, (c) =>
    c.toUpperCase(),
  )
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#111;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:8px;overflow:hidden">
        <tr><td style="background:#b8975a;padding:20px 32px">
          <p style="margin:0;color:#fff;font-size:11px;letter-spacing:2px;text-transform:uppercase">New Inquiry</p>
          <h1 style="margin:4px 0 0;color:#fff;font-size:22px">${category}</h1>
        </td></tr>
        <tr><td style="padding:24px 32px">
          <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
            ${row('Name', name)}
            ${row('Email', body.email)}
            ${row('Phone', body.phone)}
            ${row('Piece Type', category)}
            ${row('Style', body.style)}
            ${row('Budget', body.budget)}
            ${row('Metal', body.metalType)}
            ${row('Gold Colour', body.goldColor)}
            ${row('Stone Preference', Array.isArray(body.stonePreferences) ? body.stonePreferences.join(', ') : body.stonePreferences)}
            ${row('Stone Shape', body.stoneShape)}
            ${row('Diamond Type', body.diamondType)}
            ${row('Size', body.size)}
            ${row('Timeline', body.timeline)}
          </table>
          ${body.notes ? `<div style="margin-top:20px;padding:16px;background:#111;border-radius:6px;border-left:3px solid #b8975a"><p style="margin:0 0 4px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px">Notes</p><p style="margin:0;color:#fff;font-size:14px;line-height:1.6">${body.notes}</p></div>` : ''}
          ${imageGrid(imageUrls)}
        </td></tr>
        <tr><td style="padding:16px 32px 24px;border-top:1px solid #333">
          <p style="margin:0;color:#666;font-size:12px">Reply directly to this email to respond to ${name}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function confirmationHtml(firstName: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#111;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:8px;overflow:hidden">
        <tr><td style="background:#b8975a;padding:20px 32px">
          <h1 style="margin:0;color:#fff;font-size:22px">We received your inquiry</h1>
        </td></tr>
        <tr><td style="padding:32px">
          <p style="margin:0 0 16px;color:#ccc;font-size:15px;line-height:1.7">Hi ${firstName},</p>
          <p style="margin:0 0 16px;color:#ccc;font-size:15px;line-height:1.7">Thank you for reaching out to Al-Asali Custom Jewelry. We've received your inquiry and will be in touch within 1–2 business days to discuss your piece.</p>
          <p style="margin:0 0 24px;color:#ccc;font-size:15px;line-height:1.7">In the meantime, feel free to browse our <a href="https://www.alasalicustomjewelry.ca/portfolio" style="color:#b8975a">portfolio</a> for inspiration.</p>
          <p style="margin:0;color:#ccc;font-size:15px;line-height:1.7">— Mohammad Al-Asali<br><span style="color:#666;font-size:13px">Master Jeweler & Founder, Al-Asali Custom Jewelry</span></p>
        </td></tr>
        <tr><td style="padding:16px 32px 24px;border-top:1px solid #333">
          <p style="margin:0;color:#555;font-size:12px">Al-Asali Custom Jewelry · 624 Vaughan Rd, Toronto, ON · <a href="tel:+16475624340" style="color:#666">(647) 562-4340</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

async function saveInquiryToDatoCMS(
  body: Record<string, string>,
  uploadIds: string[],
  name: string,
  category: string,
): Promise<void> {
  const token = process.env.DATOCMS_CMA_TOKEN
  if (!token) {
    console.warn('[Inquiries] DATOCMS_CMA_TOKEN not set — skipping DatoCMS save')
    return
  }

  const stonePrefs = Array.isArray(body.stonePreferences)
    ? body.stonePreferences.join(', ')
    : body.stonePreferences

  const inspirationImages = uploadIds.map((id) => ({
    upload_id: id,
    alt: null,
    title: null,
    custom_data: {},
  }))

  const payload = {
    data: {
      type: 'item',
      attributes: {
        name,
        email: body.email || null,
        phone: body.phone || null,
        piece_type: category || null,
        style: body.style || null,
        budget: body.budget || null,
        metal_type: body.metalType || null,
        gold_color: body.goldColor || null,
        stone_preferences: stonePrefs || null,
        stone_shape: body.stoneShape || null,
        diamond_type: body.diamondType || null,
        size: body.size || null,
        timeline: body.timeline || null,
        notes: body.notes || null,
        status: 'new',
        inspiration_images: inspirationImages,
        submitted_at: new Date().toISOString(),
      },
      relationships: {
        item_type: { data: { type: 'item_type', id: 'inquiry' } },
      },
    },
  }

  // Resolve model ID from api_key
  const typesRes = await fetch(`${DATO_CMA_BASE}/item-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'X-Api-Version': '3',
    },
  })
  const typesJson = await typesRes.json()
  const inquiryType = typesJson.data?.find((t: { attributes: { api_key: string } }) => t.attributes.api_key === 'inquiry')
  if (!inquiryType) {
    console.warn('[Inquiries] Inquiry model not found in DatoCMS — run the migration script first')
    return
  }

  payload.data.relationships.item_type.data.id = inquiryType.id

  const res = await fetch(`${DATO_CMA_BASE}/items`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Api-Version': '3',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[Inquiries] DatoCMS save failed:', text)
  }
}

async function getImageUrls(uploadIds: string[]): Promise<string[]> {
  if (uploadIds.length === 0) return []
  const token = process.env.DATOCMS_CMA_TOKEN
  if (!token) return []

  const urls: string[] = []
  for (const id of uploadIds) {
    try {
      const res = await fetch(`${DATO_CMA_BASE}/uploads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'X-Api-Version': '3',
        },
      })
      const json = await res.json()
      const url = json.data?.attributes?.url
      if (url) urls.push(url)
    } catch {
      // skip failed lookups
    }
  }
  return urls
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name && !body.firstName) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const name = body.name || `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim()
    const firstName = body.firstName || name.split(' ')[0]
    const category = (body.jewelryCategory || body.type || 'Inquiry').replace(/^\w/, (c) =>
      c.toUpperCase(),
    )

    // uploadIds are sent by the form after images are uploaded via /api/inquiries/upload
    const uploadIds: string[] = Array.isArray(body.uploadIds) ? body.uploadIds : []

    const [imageUrls] = await Promise.all([
      getImageUrls(uploadIds),
      saveInquiryToDatoCMS(body, uploadIds, name, category),
    ])

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: NOTIFY,
        reply_to: body.email,
        subject: `New ${category} Inquiry — ${name}`,
        html: notificationHtml({ ...body, name }, imageUrls),
      }),
      resend.emails.send({
        from: FROM,
        to: body.email,
        reply_to: NOTIFY,
        subject: 'We received your inquiry — Al-Asali Custom Jewelry',
        html: confirmationHtml(firstName),
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      id: `inq_${Date.now()}`,
    })
  } catch (error) {
    console.error('Inquiry API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    )
  }
}
