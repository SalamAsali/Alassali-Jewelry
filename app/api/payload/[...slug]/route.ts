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
        collections: ['users', 'gallery', 'media', 'form-fields', 'inquiries', 'pages', 'homepage'],
      })
    }
    
    // For the main admin page, serve Payload's admin UI
    // Payload 3.0 admin UI needs to be served properly
    if (adminPath === '' || adminPath === 'index.html' || !adminPath.includes('.')) {
      // Try to serve Payload's admin UI
      // Payload 3.0 admin is a React SPA that should be accessible
      const adminHTML = `<!DOCTYPE html>
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
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0a0a0a;
      color: #fff;
      overflow: hidden;
    }
    #payload-admin-root {
      width: 100vw;
      height: 100vh;
    }
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      flex-direction: column;
    }
    .spinner {
      border: 3px solid rgba(255,255,255,0.1);
      border-top: 3px solid #fff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div id="payload-admin-root">
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading Payload CMS Admin...</p>
    </div>
  </div>
  <script type="module">
    // Load Payload admin UI
    // The admin UI should be available from Payload's package
    import('/api/payload/admin/init.js').catch(() => {
      // If admin UI module not found, show API access info
      document.getElementById('payload-admin-root').innerHTML = 
        '<div class="loading" style="text-align: center; padding: 40px;">' +
        '<h1 style="margin-bottom: 20px;">Payload CMS Admin</h1>' +
        '<p style="margin-bottom: 20px; opacity: 0.8;">Admin UI is loading. If this persists, use the API directly:</p>' +
        '<div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 600px;">' +
        '<p style="margin-bottom: 10px;"><strong>API Endpoint:</strong> <code style="background: #2a2a2a; padding: 4px 8px; border-radius: 4px;">${apiURL}</code></p>' +
        '<p style="margin-bottom: 10px;"><strong>Collections:</strong></p>' +
        '<ul style="list-style: none; text-align: left; margin-left: 20px;">' +
        '<li>• <a href="${apiURL}/gallery" style="color: #4CAF50;">Gallery</a> - Manage jewelry items</li>' +
        '<li>• <a href="${apiURL}/pages" style="color: #4CAF50;">Pages</a> - Manage custom pages</li>' +
        '<li>• <a href="${apiURL}/homepage" style="color: #4CAF50;">Homepage</a> - Manage homepage content</li>' +
        '<li>• <a href="${apiURL}/media" style="color: #4CAF50;">Media</a> - Manage files</li>' +
        '<li>• <a href="${apiURL}/inquiries" style="color: #4CAF50;">Inquiries</a> - View customer inquiries</li>' +
        '</ul>' +
        '</div>' +
        '</div>';
    });
  </script>
</body>
</html>`
      
      return new NextResponse(adminHTML, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      })
    }
    
    // Try to serve admin static files (JS, CSS, etc.)
    // These would typically come from Payload's admin build
    if (adminPath.includes('.js') || adminPath.includes('.css') || adminPath.includes('.json')) {
      // For now, return 404 - these files need to be served from Payload's build
      return NextResponse.json({ error: 'Admin static file not found' }, { status: 404 })
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

  // Validate collection exists (including new collections)
  const validCollections = ['users', 'gallery', 'media', 'form-fields', 'inquiries', 'pages', 'homepage']
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
            const whereParam = searchParams.get('where')
            if (whereParam) {
              Object.assign(where, JSON.parse(whereParam))
            }
          } catch {
            // Invalid JSON, ignore
          }
        }

        // Handle individual where conditions
        searchParams.forEach((value, key) => {
          if (key.startsWith('where.')) {
            const field = key.replace('where.', '')
            try {
              // Try to parse as JSON for complex queries
              const parsed = JSON.parse(value)
              where[field] = parsed
            } catch {
              // Simple equals query
              where[field] = { equals: value }
            }
          }
        })

        // Handle count query (used by admin UI)
        // Payload admin UI sends limit=0 to get count
        const limitParam = searchParams.get('limit')
        if (limitParam === '0') {
          try {
            const count = await payloadInstance.count({
              collection: collection as any,
              where: Object.keys(where).length > 0 ? where : undefined,
            })
            return NextResponse.json({ totalDocs: count })
          } catch (error) {
            console.error('Count query error:', error)
            // If count fails (table might not exist), return 0
            // This allows admin UI to load even if tables don't exist yet
            return NextResponse.json({ totalDocs: 0 })
          }
        }

        try {
          const result = await payloadInstance.find({
            collection: collection as any,
            where: Object.keys(where).length > 0 ? where : undefined,
            limit: parseInt(searchParams.get('limit') || '10'),
            page: parseInt(searchParams.get('page') || '1'),
            sort: searchParams.get('sort') || '-createdAt',
          })
          
          // Return in Payload's expected format
          return NextResponse.json({
            docs: result.docs || [],
            totalDocs: result.totalDocs || 0,
            limit: result.limit || 10,
            totalPages: result.totalPages || 1,
            page: result.page || 1,
            hasNextPage: result.hasNextPage || false,
            hasPrevPage: result.hasPrevPage || false,
            nextPage: result.nextPage || null,
            prevPage: result.prevPage || null,
          })
        } catch (dbError) {
          // If database query fails (table might not exist), return empty result
          console.error('Database query error:', dbError)
          if (dbError instanceof Error && dbError.message.includes('does not exist')) {
            // Table doesn't exist - return empty result
            return NextResponse.json({
              docs: [],
              totalDocs: 0,
              limit: parseInt(searchParams.get('limit') || '10'),
              totalPages: 0,
              page: 1,
              hasNextPage: false,
              hasPrevPage: false,
              nextPage: null,
              prevPage: null,
            })
          }
          throw dbError // Re-throw other errors
        }
      } catch (error) {
        console.error('Payload find error:', error)
        console.error('Error details:', error instanceof Error ? error.stack : error)
        return NextResponse.json(
          { 
            error: error instanceof Error ? error.message : 'Failed to fetch',
            details: error instanceof Error ? error.stack : 'Unknown error'
          },
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
