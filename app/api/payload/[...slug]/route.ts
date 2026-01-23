import { getPayloadInstance } from '@/lib/payload'
import { NextRequest } from 'next/server'

async function handler(req: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.router.handleRequest(req)
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
