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

    // Try to access Drizzle's push method through the adapter
    let migrationSuccess = false
    let migrationError: any = null
    let migrationMethod = ''

    if (payloadInstance.db) {
      try {
        // Method 1: Direct db.push (if available)
        if (typeof (payloadInstance.db as any).push === 'function') {
          await (payloadInstance.db as any).push({})
          migrationSuccess = true
          migrationMethod = 'db.push()'
        }
        // Method 2: Access through drizzle property
        else if ((payloadInstance.db as any).drizzle && typeof (payloadInstance.db as any).drizzle.push === 'function') {
          await (payloadInstance.db as any).drizzle.push({})
          migrationSuccess = true
          migrationMethod = 'db.drizzle.push()'
        }
        // Method 3: Try to get the adapter and call push
        else {
          const dbAny = payloadInstance.db as any
          // Payload 3.0 might expose push differently
          if (dbAny.adapter && dbAny.adapter.push) {
            await dbAny.adapter.push({})
            migrationSuccess = true
            migrationMethod = 'db.adapter.push()'
          } else if (dbAny.schema && dbAny.schema.push) {
            await dbAny.schema.push({})
            migrationSuccess = true
            migrationMethod = 'db.schema.push()'
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
        method: migrationMethod,
        note: 'All collections (gallery, pages, homepage, media, inquiries, users, form-fields) are now available. Refresh the admin UI.'
      })
    }

    // If push didn't work, provide detailed diagnostics
    const dbInfo: any = {
      hasDb: !!payloadInstance.db,
      dbType: typeof payloadInstance.db,
      dbKeys: payloadInstance.db ? Object.keys(payloadInstance.db).slice(0, 10) : [],
      enablePush: process.env.ENABLE_PUSH_MIGRATIONS,
      nodeEnv: process.env.NODE_ENV,
    }

    return NextResponse.json({ 
      success: false,
      error: 'Push migrations not available',
      message: migrationError instanceof Error ? migrationError.message : 'Migration method not found',
      diagnostics: dbInfo,
      note: 'Tables will be created automatically when you create your first item. Go to /admin → Gallery → Create New and save an item.'
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
