import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// --- Prism (Trakkr) AI-crawler optimization ---------------------------------
// When an AI crawler (GPTBot, ClaudeBot, PerplexityBot, …) requests a page we
// ask Prism for an optimized HTML rendering and serve that instead. The call
// is best-effort: any error/timeout falls through to the normal response so a
// Prism outage can never take the site down. Values are overridable via env so
// the key can be rotated in Vercel without a code change.
const PRISM_API_KEY = process.env.PRISM_API_KEY || 'prism_93Pvs7mgqeaM7rUzDoz4IU9LxSsxRFry'
const PRISM_ENDPOINT = process.env.PRISM_ENDPOINT || 'https://prism.trakkr.ai'
const PRISM_TIMEOUT = 1500 // ms

const AI_CRAWLERS = [
  'gptbot',
  'chatgpt-user',
  'oai-searchbot',
  'claudebot',
  'claude-user',
  'claude-searchbot',
  'perplexitybot',
  'meta-externalagent',
  'google-extended',
  'google-agent',
  'cohere-ai',
  'applebot-extended',
  'amazonbot',
  'mistral',
  'deepseekbot',
  'grok',
  'bingbot',
]

const SKIP_EXT = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webp|avif|mp4|pdf|zip|json|xml|txt)$/i

// Returns an optimized-HTML response when the request is from a known AI
// crawler and Prism has content for it; otherwise returns null so the caller
// continues with normal request handling.
async function prismOptimize(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl

  // Skip static assets and internal paths.
  if (SKIP_EXT.test(pathname) || pathname.startsWith('/_next/') || pathname.startsWith('/api/')) {
    return null
  }

  const ua = (request.headers.get('user-agent') || '').toLowerCase()
  const crawlerType = AI_CRAWLERS.find((bot) => ua.includes(bot))
  if (!crawlerType) {
    return null
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), PRISM_TIMEOUT)

    const res = await fetch(PRISM_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-API-Key': PRISM_API_KEY,
        'X-Crawler-UA': ua.substring(0, 200),
        'X-Target-URL': request.url,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: request.url,
        pathname,
        crawler: crawlerType,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (res.ok) {
      const data = await res.json()
      if (data.optimizedHTML) {
        return new NextResponse(data.optimizedHTML, {
          status: 200,
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'X-Prism-Optimized': 'true',
            'X-Prism-Cache': data.cache || 'MISS',
          },
        })
      }
    }
  } catch {
    // Timeout or error — serve the original response.
  }

  return null
}

// --- Clerk authentication ----------------------------------------------------
const isProtectedRoute = createRouteMatcher(['/account(.*)'])
// The login page lives under /account but must stay public, otherwise
// redirecting unauthenticated users to it would loop.
const isAuthPage = createRouteMatcher(['/account/login(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // AI-crawler optimization runs first, but only on public pages — protected
  // /account routes have no crawlable content and should go straight to auth.
  if (!isProtectedRoute(req)) {
    const optimized = await prismOptimize(req)
    if (optimized) {
      return optimized
    }
  }

  if (isProtectedRoute(req) && !isAuthPage(req)) {
    const { userId } = await auth()
    // Redirect logged-out visitors (and crawlers) to the sign-in page with a
    // clean 307 instead of auth.protect()'s 404 — the "My Account" link is
    // crawled heavily, so a 404 there hurts the technical SEO score.
    if (!userId) {
      return NextResponse.redirect(new URL('/account/login', req.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
}
