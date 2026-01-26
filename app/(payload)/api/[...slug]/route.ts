import { NextRequest, NextResponse } from 'next/server'

/**
 * Legacy Payload API route
 * This route is deprecated - content is now served via DatoCMS.
 * See /api/gallery, /api/homepage, /api/pages for the new API routes.
 */

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'This API endpoint has been migrated to DatoCMS',
    note: 'Use /api/gallery, /api/homepage, or /api/pages instead',
    cms: 'DatoCMS',
  }, { status: 410 }) // 410 Gone
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: 'This API endpoint has been migrated to DatoCMS',
    note: 'Content management is now done through DatoCMS dashboard',
    cms: 'DatoCMS',
  }, { status: 410 })
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({
    message: 'This API endpoint has been migrated to DatoCMS',
    cms: 'DatoCMS',
  }, { status: 410 })
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json({
    message: 'This API endpoint has been migrated to DatoCMS',
    cms: 'DatoCMS',
  }, { status: 410 })
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    message: 'This API endpoint has been migrated to DatoCMS',
    cms: 'DatoCMS',
  }, { status: 410 })
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({ methods: ['GET'] }, { status: 200 })
}
