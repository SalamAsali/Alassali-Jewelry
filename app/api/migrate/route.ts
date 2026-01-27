import { NextRequest, NextResponse } from 'next/server'
import { isDatoCMSConfigured } from '@/lib/datocms'

export const dynamic = 'force-dynamic'

/**
 * Migration endpoint - No longer needed for DatoCMS
 * DatoCMS handles content management through its dashboard.
 * This endpoint now provides status information.
 */
export async function GET(request: NextRequest) {
  const isConfigured = isDatoCMSConfigured()
  
  return NextResponse.json({
    cms: 'DatoCMS',
    configured: isConfigured,
    message: isConfigured 
      ? 'DatoCMS is configured. Manage content at https://datocms.com'
      : 'DatoCMS is not configured. Add DATOCMS_API_TOKEN to environment variables.',
    adminUrl: 'https://datocms.com',
    note: 'DatoCMS manages content through its web dashboard. No migrations needed.',
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: 'Migrations are not needed for DatoCMS',
    note: 'DatoCMS handles schema and content through its web dashboard',
    adminUrl: 'https://datocms.com',
  })
}
