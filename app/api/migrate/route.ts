import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

// Endpoint to manually trigger database migrations
export async function POST(request: NextRequest) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }

    // Try multiple methods to create tables
    let migrationSuccess = false
    let migrationError: any = null

    // Method 1: Try db.push (Drizzle push migrations)
    if (payloadInstance.db) {
      try {
        // Check if push method exists
        if (typeof payloadInstance.db.push === 'function') {
          await payloadInstance.db.push({})
          migrationSuccess = true
          console.log('Tables created via db.push()')
        } else if (payloadInstance.db.drizzle && typeof payloadInstance.db.drizzle.push === 'function') {
          // Try accessing drizzle directly
          await payloadInstance.db.drizzle.push({})
          migrationSuccess = true
          console.log('Tables created via db.drizzle.push()')
        } else {
          // Try to access the adapter's push method
          const adapter = (payloadInstance.db as any).adapter
          if (adapter && typeof adapter.push === 'function') {
            await adapter.push({})
            migrationSuccess = true
            console.log('Tables created via adapter.push()')
          }
        }
      } catch (error) {
        migrationError = error
        console.error('Migration attempt failed:', error)
      }
    }

    if (migrationSuccess) {
      return NextResponse.json({ 
        success: true,
        message: 'Database tables created successfully',
        note: 'All collections (gallery, pages, homepage, media, inquiries, users, form-fields) are now available. Refresh the admin UI.'
      })
    }

    // If push didn't work, return helpful error
    return NextResponse.json({ 
      success: false,
      error: 'Push migrations not available or failed',
      message: migrationError instanceof Error ? migrationError.message : 'Migration method not found',
      details: {
        hasDb: !!payloadInstance.db,
        hasPush: typeof (payloadInstance.db as any)?.push === 'function',
        enablePush: process.env.ENABLE_PUSH_MIGRATIONS,
        nodeEnv: process.env.NODE_ENV,
      },
      note: 'Ensure ENABLE_PUSH_MIGRATIONS=true is set in Vercel. Tables may be created automatically on first item creation.'
    }, { status: 400 })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { 
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Use POST to trigger migrations',
    note: 'This will create all database tables if they don\'t exist'
  })
}
