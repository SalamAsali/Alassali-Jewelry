import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'
import config from '@/payload.config'
import { getPayload } from 'payload'

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
    
    // For Payload 3.0, try using getPayload with the request directly
    // This might be the correct pattern for Next.js App Router
    try {
      const payload = await getPayload({ config })
      // Check if payload has a router or handler
      if (payload.router) {
        return payload.router(request, { params: { slug } })
      }
      if (payload.handler) {
        return payload.handler(request, { params: { slug } })
      }
    } catch (routerError) {
      console.error('Error trying alternative router method:', routerError)
    }
    
    return NextResponse.json(
      { 
        error: 'Payload handler method not available',
        details: `Available methods: ${availableMethods.join(', ')}. Please check Vercel logs for full Payload instance structure.`
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
