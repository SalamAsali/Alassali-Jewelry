import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@sanity/client'
import { currentUser } from '@clerk/nextjs/server'
import {
  findOrCreateCustomer,
  getNextOrderNumber,
  createOrderInNotion,
} from '@/lib/notion'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

const sanityWriteClient = process.env.SANITY_API_WRITE_TOKEN
  ? createClient({
      projectId: 'oh0jn4tt',
      dataset: 'production',
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    })
  : null

const FROM = 'Al-Asali Jewelry <inquiries@alasalicustomjewelry.ca>'
const NOTIFY = 'contact@alasalicustomjewelry.ca'

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
          ${body.inspirationImageUrls?.length ? `<div style="margin-top:20px"><p style="margin:0 0 12px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px">Inspiration Images</p><div style="display:flex;flex-wrap:wrap;gap:8px">${body.inspirationImageUrls.map((img: {url: string; filename: string}) => `<div style="margin-bottom:8px"><img src="${img.url}" alt="${img.filename}" style="max-width:280px;height:auto;border-radius:6px;border:1px solid #333" /><p style="margin:4px 0 0;color:#666;font-size:11px">${img.filename}</p></div>`).join('')}</div></div>` : ''}
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
    const category = (body.jewelryCategory || body.type || 'Inquiry').replace(/^\w/, (c: string) => c.toUpperCase())

    // If the user is logged in, use their account email for CRM linking
    // so the order shows up on their dashboard regardless of form email
    let crmEmail = body.email
    try {
      const user = await currentUser()
      if (user?.emailAddresses?.[0]?.emailAddress) {
        crmEmail = user.emailAddresses[0].emailAddress
      }
    } catch {
      // Not logged in — use form email
    }

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
    ])

    // Store inquiry in Sanity for CRM tracking (fire-and-forget)
    if (sanityWriteClient) {
      sanityWriteClient
        .create({
          _type: 'inquiry',
          name,
          email: body.email,
          phone: body.phone || '',
          jewelryCategory: body.jewelryCategory || body.type || '',
          pieceType: body.pieceType || '',
          metalType: body.metalType || '',
          goldColor: body.goldColor || '',
          diamondType: body.diamondType || '',
          stoneShape: body.stoneShape || '',
          stonePreferences: Array.isArray(body.stonePreferences)
            ? body.stonePreferences.join(', ')
            : body.stonePreferences || '',
          style: body.style || '',
          size: body.size || '',
          budget: body.budget || '',
          timeline: body.timeline || '',
          notes: body.notes || '',
          inspirationNames: body.inspirationNames || '',
          sourceUrl: body.sourceUrl || '',
          status: 'New',
        })
        .catch((err: unknown) => console.error('[inquiry] Sanity save failed:', err))
    }

    // Create customer + order in both Sanity and Notion at "Initial Inquiry" stage
    const crmSync = async () => {
      try {
        const orderNo = await getNextOrderNumber()

        // Build inquiry details for notes
        const details = [
          category !== 'Inquiry' ? `Type: ${category}` : '',
          body.style ? `Style: ${body.style}` : '',
          body.metalType ? `Metal: ${body.metalType}` : '',
          body.goldColor ? `Gold: ${body.goldColor}` : '',
          body.budget ? `Budget: ${body.budget}` : '',
          body.timeline ? `Timeline: ${body.timeline}` : '',
          body.size ? `Size: ${body.size}` : '',
          body.notes ? `Notes: ${body.notes}` : '',
        ].filter(Boolean).join(' | ')

        // 1. Find or create customer in Sanity (use logged-in email if available)
        let customerId: string | undefined
        if (sanityWriteClient) {
          const existing = await sanityWriteClient.fetch(
            `*[_type == "customer" && email == $email]{ _id }`,
            { email: crmEmail }
          )
          if (existing.length > 0) {
            customerId = existing[0]._id
          } else {
            const nameParts = name.split(' ')
            const newCustomer = await sanityWriteClient.create({
              _type: 'customer',
              firstName: nameParts[0] || '',
              lastName: nameParts.slice(1).join(' ') || '',
              email: crmEmail,
              phone: body.phone || '',
              marketingOptIn: false,
              firstSeenAt: new Date().toISOString(),
              tags: ['New'],
            })
            customerId = newCustomer._id
          }

          // 2. Create order in Sanity so it shows on account dashboard
          await sanityWriteClient.create({
            _type: 'order',
            orderNo,
            status: 'initial_inquiry',
            customer: customerId ? { _type: 'reference', _ref: customerId } : undefined,
            totalCad: 0,
            items: [],
            inquiryDetails: {
              _type: 'inquiryDetails',
              jewelryCategory: category,
              style: body.style || '',
              metalType: body.metalType || '',
              goldColor: body.goldColor || '',
              budget: body.budget || '',
              timeline: body.timeline || '',
              size: body.size || '',
              notes: body.notes || '',
              stonePreferences: Array.isArray(body.stonePreferences)
                ? body.stonePreferences.join(', ')
                : body.stonePreferences || '',
              diamondType: body.diamondType || '',
              stoneShape: body.stoneShape || '',
            },
          })
        }

        // 3. Find or create customer in Notion + create linked order
        const customerPageId = await findOrCreateCustomer({
          name,
          email: crmEmail,
          phone: body.phone || undefined,
        })

        const productMap: Record<string, string> = {
          'engagement-rings': 'Engagement Ring',
          'wedding-bands': 'Wedding Band',
          pendants: 'Pendant',
          earrings: 'earrings',
        }
        const product = productMap[body.jewelryCategory || body.type || '']

        await createOrderInNotion({
          orderNo,
          customerPageId,
          stage: 'Initial Inquiry',
          notes: details,
          products: product ? [product] : undefined,
        })

        console.log(`[inquiry] Order created: ${orderNo} for ${name} (Sanity + Notion)`)
      } catch (err) {
        console.error('[inquiry] CRM sync failed:', err)
      }
    }
    crmSync()

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
