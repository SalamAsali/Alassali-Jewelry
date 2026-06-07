import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Al-Asali Jewelry <inquiries@alasalicustomjewelry.ca>'
const NOTIFY = 'contact@alasalicustomjewelry.ca'

// Inquiry model id in DatoCMS (api_key=inquiry). Set on the
// migration-content-polish env.
const INQUIRY_ITEM_TYPE_ID = 'R73j7-W_Rae5EXDiB0KkBQ'

/**
 * Persist a submission to DatoCMS so it appears under the Inquiry collection
 * in the admin. Best-effort: if it fails (missing CMA token, network, schema
 * drift) we log and move on — the Resend email path is the source of truth.
 */
async function saveInquiryToDato(body: Record<string, any>, sourceUrl?: string) {
  const token = process.env.DATOCMS_CMA_TOKEN || process.env.DATOCMS_API_TOKEN
  if (!token) {
    console.warn('[inquiries] no DATOCMS_CMA_TOKEN — skipping Dato save')
    return
  }
  const name = body.name || `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim()
  const stonePrefs = Array.isArray(body.stonePreferences)
    ? body.stonePreferences.join(', ')
    : body.stonePreferences
  const inspNames = Array.isArray(body.inspirationNames)
    ? body.inspirationNames.join(', ')
    : body.inspirationNames
  try {
    const res = await fetch('https://site-api.datocms.com/items', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Version': '3',
        Accept: 'application/json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'item',
          attributes: {
            name: name || '(no name)',
            email: body.email || '',
            phone: body.phone || null,
            piece_type: body.pieceType || body.type || null,
            jewelry_category: body.jewelryCategory || null,
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
            inspiration_names: inspNames || null,
            source_url: sourceUrl || null,
            status: 'new',
          },
          relationships: {
            item_type: { data: { type: 'item_type', id: INQUIRY_ITEM_TYPE_ID } },
          },
        },
      }),
    })
    if (!res.ok) {
      console.warn('[inquiries] Dato save failed:', res.status, await res.text())
    }
  } catch (err) {
    console.warn('[inquiries] Dato save threw:', err)
  }
}

function row(label: string, value: string | undefined) {
  if (!value) return ''
  return `<tr><td style="padding:6px 12px;color:#999;font-size:13px;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#fff;font-size:13px">${value}</td></tr>`
}

function notificationHtml(body: Record<string, string>) {
  const name = body.name || `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim()
  const category = (body.jewelryCategory || body.type || 'General').replace(/^\w/, c => c.toUpperCase())
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
            ${row('Inspiration Files', body.inspirationNames)}
          </table>
          ${body.notes ? `<div style="margin-top:20px;padding:16px;background:#111;border-radius:6px;border-left:3px solid #b8975a"><p style="margin:0 0 4px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px">Notes</p><p style="margin:0;color:#fff;font-size:14px;line-height:1.6">${body.notes}</p></div>` : ''}
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
    const category = (body.jewelryCategory || body.type || 'Inquiry').replace(/^\w/, c => c.toUpperCase())

    const sourceUrl =
      request.headers.get('referer') || request.headers.get('origin') || undefined

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: NOTIFY,
        reply_to: body.email,
        subject: `New ${category} Inquiry — ${name}`,
        html: notificationHtml({ ...body, name }),
      }),
      resend.emails.send({
        from: FROM,
        to: body.email,
        reply_to: NOTIFY,
        subject: 'We received your inquiry — Al-Asali Custom Jewelry',
        html: confirmationHtml(firstName),
      }),
      // Best-effort archive to Dato. Does not block or fail the request.
      saveInquiryToDato(body, sourceUrl),
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
      { status: 500 }
    )
  }
}
