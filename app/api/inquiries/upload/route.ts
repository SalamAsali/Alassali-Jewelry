import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const DATO_CMA_BASE = 'https://site-api.datocms.com'

async function cmaFetch(path: string, options: RequestInit = {}) {
  const token = process.env.DATOCMS_CMA_TOKEN
  if (!token) throw new Error('DATOCMS_CMA_TOKEN is not configured')
  const res = await fetch(`${DATO_CMA_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'X-Api-Version': '3',
      ...(options.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`DatoCMS CMA error ${res.status}: ${text}`)
  }
  return res.json()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadIds: string[] = []

    for (const file of files) {
      // Step 1: Request an upload URL from DatoCMS
      const { data: uploadRequest } = await cmaFetch('/upload-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { type: 'upload_request', attributes: { filename: file.name } } }),
      })

      const { id: uploadId, url: putUrl } = uploadRequest.attributes

      // Step 2: PUT the file to the signed S3 URL
      const arrayBuffer = await file.arrayBuffer()
      const putRes = await fetch(putUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: arrayBuffer,
      })
      if (!putRes.ok) throw new Error(`S3 upload failed: ${putRes.status}`)

      // Step 3: Create the upload record in DatoCMS
      const { data: upload } = await cmaFetch('/uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            type: 'upload',
            attributes: {
              path: uploadId,
              default_field_metadata: {
                en: { alt: file.name, title: '', custom_data: {} },
              },
            },
          },
        }),
      })

      uploadIds.push(upload.id)
    }

    return NextResponse.json({ success: true, uploadIds })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
