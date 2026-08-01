import { NextRequest, NextResponse } from 'next/server'

const INDEXNOW_KEY = 'd803f46893352bb0d66d09030746025c'
const HOST = 'www.alasalicustomjewelry.ca'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${INDEXNOW_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { urls?: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const urls = body.urls
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: 'urls array required' }, { status: 400 })
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10000),
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  return NextResponse.json({
    submitted: urls.length,
    status: res.status,
    ok: res.ok,
  })
}

export async function GET() {
  return NextResponse.json({ key: INDEXNOW_KEY, status: 'active' })
}
