import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }
    const { slug } = await params
    
    // Try different methods that Payload 3.0 might use
    if (payloadInstance.handler && typeof payloadInstance.handler === 'function') {
      return payloadInstance.handler(request, { params: { slug } })
    }
    
    // Try router if it exists
    if (payloadInstance.router && typeof payloadInstance.router === 'function') {
      return payloadInstance.router(request, { params: { slug } })
    }
    
    // Try handleRequest if it exists
    if (payloadInstance.handleRequest && typeof payloadInstance.handleRequest === 'function') {
      return payloadInstance.handleRequest(request, { params: { slug } })
    }
    
    // Log available methods for debugging
    const availableMethods = Object.keys(payloadInstance).filter(
      key => typeof payloadInstance[key] === 'function'
    )
    console.error('Payload instance methods:', availableMethods.slice(0, 10))
    console.error('Payload instance type:', typeof payloadInstance)
    
    // For Payload 3.0, we might need to use the Local API differently
    // Let's try importing and using the router from Payload directly
    const { router } = await import('payload')
    if (router && typeof router === 'function') {
      return router(request, { params: { slug } })
    }
    
    return NextResponse.json(
      { 
        error: 'Payload handler method not available',
        details: `Available methods: ${availableMethods.join(', ')}`
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('Payload GET error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }
    const { slug } = await params
    return payloadInstance.handler(request, { params: { slug } })
  } catch (error) {
    console.error('Payload POST error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }
    const { slug } = await params
    return payloadInstance.handler(request, { params: { slug } })
  } catch (error) {
    console.error('Payload PUT error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }
    const { slug } = await params
    return payloadInstance.handler(request, { params: { slug } })
  } catch (error) {
    console.error('Payload PATCH error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const payloadInstance = await getPayloadInstance()
    if (!payloadInstance) {
      return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
    }
    const { slug } = await params
    return payloadInstance.handler(request, { params: { slug } })
  } catch (error) {
    console.error('Payload DELETE error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
