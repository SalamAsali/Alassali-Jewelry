/**
 * Calendly scheduling integration.
 *
 * CALENDLY_URL is the booking link for the initial-consultation event type,
 * e.g. https://calendly.com/alassalijewelry/initial-consultation
 *
 * Configure it via NEXT_PUBLIC_CALENDLY_URL in Vercel (preferred) or by
 * filling in the fallback string below. While it is empty, every scheduling
 * step stays hidden and the forms behave exactly as before.
 */
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

export type CalendlyLinkOptions = {
  /** Invitee full name, prefilled into the booking form. */
  name?: string
  /** Invitee email, prefilled into the booking form. */
  email?: string
  /**
   * Correlation token stored invisibly on the booking (order number or
   * inquiry id). Comes back as utm_content in Calendly's webhooks, exports,
   * and the event's invitee record, so a booking can be matched to the
   * inquiry that produced it.
   */
  utmContent?: string
  /**
   * Host domain of the page embedding the widget. Required for the iframe to
   * postMessage its events (calendly.event_scheduled etc.) back to the page.
   * Omit for plain links opened in a new tab.
   */
  embedDomain?: string
}

/**
 * Build a Calendly URL with prefill, tracking, and embed styling params.
 * Returns '' when no Calendly URL is configured or the configured value is
 * not a valid URL.
 */
export function buildCalendlyUrl(opts: CalendlyLinkOptions = {}): string {
  if (!CALENDLY_URL) return ''
  let url: URL
  try {
    url = new URL(CALENDLY_URL)
  } catch {
    return ''
  }

  if (opts.embedDomain) {
    url.searchParams.set('embed_domain', opts.embedDomain)
    url.searchParams.set('embed_type', 'Inline')
  }
  if (opts.name) url.searchParams.set('name', opts.name)
  if (opts.email) url.searchParams.set('email', opts.email)

  url.searchParams.set('utm_source', 'website')
  url.searchParams.set('utm_medium', 'inquiry_form')
  if (opts.utmContent) url.searchParams.set('utm_content', opts.utmContent)

  // Match the dark form pages. Hex without '#' — a literal '#' breaks the
  // query string. Colors apply on paid Calendly plans and are ignored on free.
  url.searchParams.set('hide_gdpr_banner', '1')
  url.searchParams.set('background_color', '1a1a1a')
  url.searchParams.set('text_color', 'f5f5f0')
  url.searchParams.set('primary_color', '8e9196')

  return url.toString()
}
