import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityWriteClient = createClient({
  projectId: 'oh0jn4tt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploaded: { url: string; filename: string }[] = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const asset = await sanityWriteClient.assets.upload('image', buffer, {
        filename: file.name,
        contentType: file.type,
      })

      // Build a CDN URL with reasonable dimensions for email display
      const cdnUrl = `https://cdn.sanity.io/images/oh0jn4tt/production/${asset._id.replace('image-', '').replace(/-([a-z]+)$/, '.$1')}?w=800&q=80`

      uploaded.push({
        url: cdnUrl,
        filename: file.name,
      })
    }

    return NextResponse.json({ success: true, images: uploaded })
  } catch (error) {
    console.error('[inquiry-upload] Failed:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: String(error) },
      { status: 500 }
    )
  }
}
