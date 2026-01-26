import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Inquiry submissions - these can be handled via:
 * 1. Email notifications (using Resend or similar)
 * 2. External form services (like Formspree, Typeform)
 * 3. A separate database
 * 
 * DatoCMS is primarily for content delivery, not form submissions.
 * For production, consider integrating with a form handling service.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Log the inquiry for now (in production, send to email service or external form handler)
    console.log('[Inquiry Received]', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      type: body.jewelryCategory || body.type,
      budget: body.budget,
      style: body.style,
      metalType: body.metalType || body.metal_type,
      size: body.size,
      timeline: body.timeline,
      notes: body.notes,
      source: body.source || 'website',
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate with email service (Resend) to send notification
    // Example:
    // await resend.emails.send({
    //   from: 'noreply@alassali.com',
    //   to: 'inquiries@alassali.com',
    //   subject: `New Inquiry from ${body.name}`,
    //   html: `...`
    // })

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
