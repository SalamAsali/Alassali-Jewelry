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
    // For admin routes, Payload expects 'admin' as the first segment
    const slug = ['admin', ...(segments || [])]
    
    // Check what methods are available on the payload instance
    console.log('Payload instance type:', typeof payloadInstance)
    console.log('Payload instance keys:', Object.keys(payloadInstance).slice(0, 10))
    
    // Try to use the handler if it exists
    if (payloadInstance.handler && typeof payloadInstance.handler === 'function') {
      const response = await payloadInstance.handler(request, { params: { slug } })
      return response
    }
    
    // If handler doesn't exist, try to use the router or other methods
    // For Payload 3.0, we might need to use a different approach
    // Let's try importing the handler from the API route
    const { GET: apiGET, POST: apiPOST } = await import('@/app/api/payload/[...slug]/route')
    
    // Create a mock params object for the API route
    const apiParams = { params: Promise.resolve({ slug }) }
    
    // Call the appropriate method based on request method
    if (request.method === 'GET') {
      return apiGET(request, apiParams as any)
    } else if (request.method === 'POST') {
      return apiPOST(request, apiParams as any)
    }
    
    return NextResponse.json(
      { error: 'Method not supported for admin panel' },
      { status: 405 }
    )
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
