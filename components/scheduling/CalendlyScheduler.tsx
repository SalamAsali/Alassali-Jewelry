'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { buildCalendlyUrl } from '@/lib/calendly'

const CALENDLY_ORIGIN = 'https://calendly.com'
const DEFAULT_HEIGHT = 700
const MAX_HEIGHT = 1400

type CalendlySchedulerProps = {
  name?: string
  email?: string
  /** Correlation token (order number / inquiry id) stored on the booking as utm_content. */
  utmContent?: string
  /** Fired once when the invitee completes a booking inside the embed. */
  onScheduled?: () => void
  className?: string
}

/**
 * Inline Calendly embed rendered as a plain iframe — no third-party script,
 * so no CSP loosening and less ad-blocker surface. The iframe URL carries
 * prefill/UTM params plus embed_domain, which Calendly requires before it
 * will postMessage events (calendly.event_scheduled, calendly.page_height)
 * back to the page.
 *
 * Renders nothing while no Calendly URL is configured (see lib/calendly.ts).
 */
export default function CalendlyScheduler({
  name,
  email,
  utmContent,
  onScheduled,
  className,
}: CalendlySchedulerProps) {
  const [src, setSrc] = useState('')
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [loaded, setLoaded] = useState(false)

  // The URL needs window.location.host, so build it after mount.
  useEffect(() => {
    setSrc(buildCalendlyUrl({ name, email, utmContent, embedDomain: window.location.host }))
  }, [name, email, utmContent])

  useEffect(() => {
    if (!src) return
    const onMessage = (e: MessageEvent) => {
      // Only trust calendly.com — postMessage handlers are a spoofing target.
      if (e.origin !== CALENDLY_ORIGIN) return
      const data = e.data as { event?: unknown; payload?: { height?: unknown } } | null
      if (typeof data?.event !== 'string' || !data.event.startsWith('calendly.')) return

      if (data.event === 'calendly.page_height') {
        const h = parseInt(String(data.payload?.height ?? ''), 10)
        if (h > 0) setHeight(Math.min(h, MAX_HEIGHT))
      }
      if (data.event === 'calendly.event_scheduled') {
        onScheduled?.()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [src, onScheduled])

  if (!src) return null

  const fallbackUrl = buildCalendlyUrl({ name, email, utmContent })

  return (
    <div className={className}>
      <div
        className="relative w-full min-w-[320px] overflow-hidden rounded-xl border border-glacier-grey/30 bg-deep-charcoal"
        style={{ height }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-stone">
            <Loader2 className="h-8 w-8 animate-spin text-glacier-grey" />
            <span className="text-sm">Loading available times…</span>
          </div>
        )}
        <iframe
          src={src}
          title="Schedule your consultation"
          onLoad={() => setLoaded(true)}
          className="relative z-10 h-full w-full border-0"
        />
      </div>
      <p className="mt-3 text-center text-xs text-stone">
        Trouble seeing the calendar?{' '}
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-glacier-grey underline underline-offset-2 hover:text-glacier-grey-light"
        >
          Open the scheduling page
        </a>
      </p>
    </div>
  )
}
