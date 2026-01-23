import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

async function handleRequest(
  request: NextRequest,
  params: Promise<{ segments?: string[] }>
) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json(
        { error: 'Payload CMS not initialized. Check server logs and environment variables.' },
        { status: 503 }
      )
    }
    
    const { segments } = await params
    // For /cms routes, we need to pass the segments to Payload
    // Payload expects the route path relative to the admin baseURL
    const slug = segments || []
    
    // Forward the request to Payload's handler
    const response = await payloadInstance.handler(request, { params: { slug } })
    return response
  } catch (error) {
    console.error('Payload CMS route error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to handle Payload CMS request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ segments?: string[] }> }
) {
  return handleRequest(request, params)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ segments?: string[] }> }
) {
  return handleRequest(request, params)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ segments?: string[] }> }
) {
  return handleRequest(request, params)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ segments?: string[] }> }
) {
  return handleRequest(request, params)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ segments?: string[] }> }
) {
  return handleRequest(request, params)
}
