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
    const adminPath = rest.join('/') || ''
    const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
    const apiURL = payloadInstance.getAPIURL?.() || '/api/payload'
    const adminBaseURL = payloadInstance.getAdminURL?.() || '/cms'
    
    // For admin API requests (config, etc.)
    if (adminPath === 'config') {
      return NextResponse.json({
        apiURL,
        adminURL: adminBaseURL,
        serverURL,
        collections: ['users', 'gallery', 'media', 'form-fields', 'inquiries'],
      })
    }
    
    // For the main admin page, serve Payload's admin UI
    // Payload 3.0 admin UI is a React app
    // We need to serve an HTML page that loads the admin bundle
    if (adminPath === '' || adminPath === 'index.html' || !adminPath.includes('.')) {
      // Payload 3.0 admin UI should be available at /admin in the Payload package
      // For now, return a page that tries to load it
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payload CMS Admin - Alassali Jewelry</title>
  <script>
    window.PAYLOAD_CONFIG = {
      apiURL: '${apiURL}',
      adminURL: '${adminBaseURL}',
      serverURL: '${serverURL}'
    };
  </script>
</head>
<body>
  <div id="payload-admin-root"></div>
  <script type="module">
    // Payload 3.0 admin UI should be loaded here
    // The admin UI is typically served from Payload's static files
    // For Next.js integration, we may need to import and render the admin component
    console.log('Payload Admin UI should load here');
    console.log('Config:', window.PAYLOAD_CONFIG);
    
    // Try to load admin UI
    // Note: Payload 3.0 admin UI might need to be embedded differently
    document.getElementById('payload-admin-root').innerHTML = 
      '<div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #1a1a1a; color: #fff; font-family: system-ui;">' +
      '<div style="text-align: center;">' +
      '<div style="border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid #fff; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>' +
      '<p>Payload CMS Admin UI</p>' +
      '<p style="font-size: 12px; opacity: 0.7; margin-top: 20px;">' +
      'The admin UI may need to be embedded as a React component.<br>' +
      'API is working at: <a href="${apiURL}/gallery" style="color: #4CAF50;">${apiURL}/gallery</a>' +
      '</p>' +
      '</div>' +
      '<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>' +
      '</div>';
  </script>
</body>
</html>`,
        {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        }
      )
    }
    
    // For other admin paths (static files, etc.), return 404 for now
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
