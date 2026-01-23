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

    // Try to push migrations
    if (payloadInstance.db && typeof payloadInstance.db.push === 'function') {
      try {
        await payloadInstance.db.push({})
        return NextResponse.json({ 
          success: true,
          message: 'Database tables created successfully',
          note: 'All collections (gallery, pages, homepage, media, inquiries, users, form-fields) are now available'
        })
      } catch (pushError) {
        return NextResponse.json({
          success: false,
          error: 'Migration failed',
          details: pushError instanceof Error ? pushError.message : 'Unknown error',
          note: 'Check Vercel logs for more details. Ensure ENABLE_PUSH_MIGRATIONS=true is set.'
        }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      error: 'Push migrations not available',
      message: 'Set ENABLE_PUSH_MIGRATIONS=true in Vercel environment variables',
      note: 'The db.push method is not available. Check Payload configuration.'
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
