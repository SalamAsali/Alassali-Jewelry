import { NextRequest, NextResponse } from 'next/server'
import { pushDevSchema } from '@payloadcms/drizzle'
import { getPayloadInstance } from '@/lib/payload'

// Force Next.js to bundle drizzle-kit/api (required by pushDevSchema / requireDrizzleKit)
import 'drizzle-kit/api'

export const dynamic = 'force-dynamic'

function diagnostics() {
  return {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    enablePushMigrations: process.env.ENABLE_PUSH_MIGRATIONS === 'true',
    nodeEnv: process.env.NODE_ENV,
  }
}

async function runPush(adapter: any): Promise<{ ok: boolean; method: string; error?: string; stack?: string }> {
  if (!adapter) return { ok: false, method: '' }
  const db = adapter as any
  if (typeof db.push === 'function') {
    await db.push({})
    return { ok: true, method: 'db.push()' }
  }
  if (db.drizzle?.push && typeof db.drizzle.push === 'function') {
    await db.drizzle.push({})
    return { ok: true, method: 'db.drizzle.push()' }
  }
  try {
    await pushDevSchema(adapter)
    return { ok: true, method: 'pushDevSchema(adapter)' }
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    console.error('[migrate] pushDevSchema failed:', err.message, err.stack)
    return { ok: false, method: '', error: err.message, stack: err.stack }
  }
}

export async function POST(request: NextRequest) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json(
        { error: 'Payload not initialized', diagnostics: diagnostics() },
        { status: 503 }
      )
    }

    const result = await runPush(payloadInstance.db)
    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Database tables created successfully',
        method: result.method,
        note: 'Go to /admin to create your first user.',
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Push migrations not available',
      pushError: result.error,
      pushStack: result.stack,
      diagnostics: diagnostics(),
      note: 'In Vercel: set DATABASE_URL and ENABLE_PUSH_MIGRATIONS=true. DATABASE_URL must end with ?sslmode=require (once).',
    }, { status: 400 })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: 'Migration failed', details: error instanceof Error ? error.message : 'Unknown', diagnostics: diagnostics() },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const run = new URL(request.url).searchParams.get('run') === '1'
  if (!run) {
    return NextResponse.json({
      message: 'Use POST to trigger migrations, or GET ?run=1 to run now',
      note: 'Creates all DB tables. Requires DATABASE_URL and ENABLE_PUSH_MIGRATIONS=true in Vercel.',
      url: '/api/migrate?run=1',
    })
  }

  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json(
        { error: 'Payload not initialized', diagnostics: diagnostics() },
        { status: 503 }
      )
    }

    const result = await runPush(payloadInstance.db)
    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Database tables created successfully',
        method: result.method,
        note: 'Go to /admin to create your first user.',
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Push not available',
      pushError: result.error,
      pushStack: result.stack,
      diagnostics: diagnostics(),
      note: 'In Vercel: set DATABASE_URL and ENABLE_PUSH_MIGRATIONS=true. DATABASE_URL must end with ?sslmode=require (once).',
    }, { status: 400 })
  } catch (e) {
    console.error('Migration error:', e)
    return NextResponse.json(
      { error: 'Migration failed', details: e instanceof Error ? e.message : 'Unknown', diagnostics: diagnostics() },
      { status: 500 }
    )
  }
}
