import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

async function handleRequest(
  request: NextRequest,
  params: Promise<{ segments?: string[] }>
) {
  try {
    const { segments } = await params
    // For admin routes, Payload expects 'admin' as the first segment
    const slug = ['admin', ...(segments || [])]
    
    // Import and use the API route handlers directly
    // This is the same pattern as /api/payload/[...slug]/route.ts
    const apiRoute = await import('@/app/api/payload/[...slug]/route')
    
    // Create params object matching the API route signature
    const apiParams = { params: Promise.resolve({ slug }) }
    
    // Call the appropriate method based on request method
    switch (request.method) {
      case 'GET':
        return apiRoute.GET(request, apiParams as any)
      case 'POST':
        return apiRoute.POST(request, apiParams as any)
      case 'PUT':
        return apiRoute.PUT(request, apiParams as any)
      case 'PATCH':
        return apiRoute.PATCH(request, apiParams as any)
      case 'DELETE':
        return apiRoute.DELETE(request, apiParams as any)
      default:
        return NextResponse.json(
          { error: 'Method not supported' },
          { status: 405 }
        )
    }
  } catch (error) {
    console.error('Payload CMS route error:', error)
    console.error('Error details:', error instanceof Error ? error.stack : error)
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
