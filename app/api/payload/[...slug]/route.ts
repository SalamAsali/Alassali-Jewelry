import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export const dynamic = 'force-dynamic'

// Handle Payload API routes manually using available methods
async function handlePayloadRequest(
  request: NextRequest,
  params: Promise<{ slug: string[] }>
) {
  const payloadInstance = await getPayloadInstance()
  if (!payloadInstance) {
    return NextResponse.json({ error: 'Payload not initialized' }, { status: 503 })
  }

  const { slug } = await params
  const [collection, ...rest] = slug || []
  const method = request.method

  // Handle admin routes - Payload 3.0 admin UI
  if (collection === 'admin') {
    // For admin panel access, we need to serve Payload's admin UI
    // Payload 3.0 admin is a React app that needs to be served
    // For now, return instructions or redirect
    const adminPath = rest.join('/') || ''
    
    // Admin UI static files would be served here
    // For the main admin page, return a response
    if (adminPath === '' || !adminPath.includes('.')) {
      return NextResponse.json({
        message: 'Payload Admin UI',
        adminURL: payloadInstance.getAdminURL?.() || '/cms',
        note: 'Admin UI should be accessible at /cms'
      })
    }
    
    return NextResponse.json({ error: 'Admin resource not found' }, { status: 404 })
  }

  // Handle authentication routes
  if (collection === 'login') {
    if (method === 'POST') {
      try {
        const body = await request.json()
        const result = await payloadInstance.login({
          collection: 'users',
          data: {
            email: body.email,
            password: body.password,
          },
          req: request as any,
        })
        return NextResponse.json(result)
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : 'Login failed' },
          { status: 401 }
        )
      }
    }
  }

  // Handle collection routes (e.g., /api/payload/gallery, /api/payload/users)
  if (!collection) {
    return NextResponse.json({ error: 'Collection not specified' }, { status: 400 })
  }

  // Validate collection exists
  const validCollections = ['users', 'gallery', 'media', 'form-fields', 'inquiries']
  if (!validCollections.includes(collection)) {
    return NextResponse.json(
      { error: `Collection '${collection}' not found` },
      { status: 404 }
    )
  }

  // Handle standard CRUD operations
  if (rest.length === 0) {
    // GET /api/payload/gallery - list items
    if (method === 'GET') {
      try {
        const { searchParams } = new URL(request.url)
        const where: any = {}
        
        // Parse query parameters
        if (searchParams.get('where')) {
          try {
            Object.assign(where, JSON.parse(searchParams.get('where') || '{}'))
          } catch {
            // Invalid JSON, ignore
          }
        }

        // Handle individual where conditions
        searchParams.forEach((value, key) => {
          if (key.startsWith('where.')) {
            const field = key.replace('where.', '')
            where[field] = { equals: value }
          }
        })

        const result = await payloadInstance.find({
          collection: collection as any,
          where: Object.keys(where).length > 0 ? where : undefined,
          limit: parseInt(searchParams.get('limit') || '10'),
          page: parseInt(searchParams.get('page') || '1'),
          sort: searchParams.get('sort') || '-createdAt',
        })
        return NextResponse.json(result)
      } catch (error) {
        console.error('Payload find error:', error)
        return NextResponse.json(
          { error: error instanceof Error ? error.message : 'Failed to fetch' },
          { status: 500 }
        )
      }
    }

    // POST /api/payload/gallery - create item
    if (method === 'POST') {
      try {
        const body = await request.json()
        const result = await payloadInstance.create({
          collection: collection as any,
          data: body,
        })
        return NextResponse.json(result, { status: 201 })
      } catch (error) {
        console.error('Payload create error:', error)
        return NextResponse.json(
          { error: error instanceof Error ? error.message : 'Failed to create' },
          { status: 500 }
        )
      }
    }
  }

  // Handle item routes (e.g., /api/payload/gallery/123)
  if (rest.length === 1) {
    const id = rest[0]

    // GET /api/payload/gallery/123 - get item
    if (method === 'GET') {
      try {
        const result = await payloadInstance.findByID({
          collection: collection as any,
          id,
        })
        return NextResponse.json(result)
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : 'Not found' },
          { status: 404 }
        )
      }
    }

    // PATCH /api/payload/gallery/123 - update item
    if (method === 'PATCH' || method === 'PUT') {
      try {
        const body = await request.json()
        const result = await payloadInstance.update({
          collection: collection as any,
          id,
          data: body,
        })
        return NextResponse.json(result)
      } catch (error) {
        console.error('Payload update error:', error)
        return NextResponse.json(
          { error: error instanceof Error ? error.message : 'Failed to update' },
          { status: 500 }
        )
      }
    }

    // DELETE /api/payload/gallery/123 - delete item
    if (method === 'DELETE') {
      try {
        const result = await payloadInstance.delete({
          collection: collection as any,
          id,
        })
        return NextResponse.json(result)
      } catch (error) {
        console.error('Payload delete error:', error)
        return NextResponse.json(
          { error: error instanceof Error ? error.message : 'Failed to delete' },
          { status: 500 }
        )
      }
    }
  }

  return NextResponse.json(
    { error: 'Route not found' },
    { status: 404 }
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    return handlePayloadRequest(request, params)
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
    return handlePayloadRequest(request, params)
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
    return handlePayloadRequest(request, params)
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
    return handlePayloadRequest(request, params)
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
    return handlePayloadRequest(request, params)
  } catch (error) {
    console.error('Payload DELETE error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
