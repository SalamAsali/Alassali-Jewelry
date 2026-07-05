import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { currentUser } from '@clerk/nextjs/server'
import {
  findOrCreateCustomer,
  findCustomerByEmail,
  getNextOrderNumber,
  createOrderInNotion,
} from '@/lib/notion'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Al-Asali Jewelry <inquiries@alasalicustomjewelry.ca>'
const NOTIFY = 'contact@alasalicustomjewelry.ca'

function notificationHtml(data: {
  name: string
  email: string
  phone: string
  chainName: string
  karat: string
  metal: string
  lengthIn: number
  widthMm: number
  weightG: number
  priceCad: number
  orderNo: string
}) {
  const metalLabel = data.metal.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#111;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:8px;overflow:hidden">
        <tr><td style="background:#b8975a;padding:20px 32px">
          <p style="margin:0;color:#fff;font-size:11px;letter-spacing:2px;text-transform:uppercase">New Chain Inquiry</p>
          <h1 style="margin:4px 0 0;color:#fff;font-size:22px">${data.chainName}</h1>
        </td></tr>
        <tr><td style="padding:24px 32px">
          <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Order</td><td style="padding:6px 12px;color:#fff;font-size:13px;font-weight:bold">${data.orderNo}</td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Name</td><td style="padding:6px 12px;color:#fff;font-size:13px">${data.name}</td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Email</td><td style="padding:6px 12px;color:#fff;font-size:13px">${data.email}</td></tr>
            ${data.phone ? `<tr><td style="padding:6px 12px;color:#999;font-size:13px">Phone</td><td style="padding:6px 12px;color:#fff;font-size:13px">${data.phone}</td></tr>` : ''}
            <tr><td colspan="2" style="padding:12px;border-top:1px solid #333"></td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Chain</td><td style="padding:6px 12px;color:#fff;font-size:13px">${data.chainName}</td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Karat</td><td style="padding:6px 12px;color:#fff;font-size:13px">${data.karat.toUpperCase()}</td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Metal</td><td style="padding:6px 12px;color:#fff;font-size:13px">${metalLabel}</td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Length</td><td style="padding:6px 12px;color:#fff;font-size:13px">${data.lengthIn}"</td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Width</td><td style="padding:6px 12px;color:#fff;font-size:13px">${data.widthMm}mm</td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Weight</td><td style="padding:6px 12px;color:#fff;font-size:13px">${data.weightG.toFixed(1)}g</td></tr>
            <tr><td style="padding:6px 12px;color:#999;font-size:13px">Est. Price</td><td style="padding:6px 12px;color:#fff;font-size:13px">$${data.priceCad.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:16px 32px 24px;border-top:1px solid #333">
          <p style="margin:0;color:#666;font-size:12px">Reply directly to this email to respond to ${data.name}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function confirmationHtml(firstName: string, orderNo: string, chainName: string) {
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
          <p style="margin:0 0 16px;color:#ccc;font-size:15px;line-height:1.7">Thank you for your interest in the <strong style="color:#fff">${chainName}</strong>. Your inquiry <strong style="color:#b8975a">${orderNo}</strong> has been received.</p>
          <p style="margin:0 0 16px;color:#ccc;font-size:15px;line-height:1.7">Our team will review the details and reach out within 1-2 business days to discuss next steps.</p>
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

    if (!body.firstName) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    }
    if (!body.email && !body.phone) {
      return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 })
    }

    const name = `${body.firstName} ${body.lastName || ''}`.trim()
    const email = body.email || ''
    const phone = body.phone || ''

    // Check if a logged-in user is making this request
    let crmEmail = email
    let isLoggedIn = false
    try {
      const clerkUser = await currentUser()
      if (clerkUser?.emailAddresses?.[0]?.emailAddress) {
        crmEmail = clerkUser.emailAddresses[0].emailAddress
        isLoggedIn = true
      }
    } catch {
      // Not logged in
    }

    // Check if this email/phone matches an existing customer in Notion
    let existingCustomerId: string | null = null
    let isNewAccount = false

    if (crmEmail) {
      existingCustomerId = await findCustomerByEmail(crmEmail)
    }

    // Generate order number
    const orderNo = await getNextOrderNumber()

    // Build notes for the order
    const metalLabel = (body.metal || '').replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
    const details = [
      `Chain: ${body.chainName}`,
      `${(body.karat || '').toUpperCase()} ${metalLabel}`,
      `${body.lengthIn}" · ${body.widthMm}mm · ${Number(body.weightG).toFixed(1)}g`,
      `Est. $${Number(body.priceCad).toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD`,
    ].join(' | ')

    // Find or create customer in Notion
    const customerPageId = await findOrCreateCustomer({
      name,
      email: crmEmail || email,
      phone: phone || undefined,
    })

    // If we created a new customer (wasn't existing) and user isn't logged in
    if (!existingCustomerId && !isLoggedIn) {
      isNewAccount = true
    }

    // Create order in Notion at "Initial Inquiry" stage
    await createOrderInNotion({
      orderNo,
      customerPageId,
      stage: 'Initial Inquiry',
      notes: details,
      products: ['Chain'],
    })

    // Send emails (fire-and-forget, don't block response)
    const emailPromises: Promise<unknown>[] = []

    if (email) {
      emailPromises.push(
        resend.emails.send({
          from: FROM,
          to: email,
          reply_to: NOTIFY,
          subject: `We received your inquiry — ${orderNo}`,
          html: confirmationHtml(body.firstName, orderNo, body.chainName),
        })
      )
    }

    emailPromises.push(
      resend.emails.send({
        from: FROM,
        to: NOTIFY,
        reply_to: email || undefined,
        subject: `Chain Inquiry: ${body.chainName} — ${name} — ${orderNo}`,
        html: notificationHtml({
          name,
          email,
          phone,
          chainName: body.chainName,
          karat: body.karat || '',
          metal: body.metal || '',
          lengthIn: body.lengthIn || 0,
          widthMm: body.widthMm || 0,
          weightG: body.weightG || 0,
          priceCad: body.priceCad || 0,
          orderNo,
        }),
      })
    )

    await Promise.allSettled(emailPromises)

    console.log(`[chain-inquiry] Order created: ${orderNo} for ${name}`)

    return NextResponse.json({
      success: true,
      orderNo,
      isNewAccount,
      passwordUrl: isNewAccount ? '/account/login' : undefined,
    })
  } catch (error) {
    console.error('[chain-inquiry] Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
