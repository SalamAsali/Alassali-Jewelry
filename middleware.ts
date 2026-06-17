import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/account(.*)'])
// The login page lives under /account but must stay public, otherwise
// redirecting unauthenticated users to it would loop.
const isAuthPage = createRouteMatcher(['/account/login(.*)'])

export default clerkMiddleware(async (auth, req) => {
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
