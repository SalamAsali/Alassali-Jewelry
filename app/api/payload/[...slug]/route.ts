import { NextRequest } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const payloadInstance = await getPayloadInstance()
  const { slug } = await params
  return payloadInstance.handler(request, { params: { slug } })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const payloadInstance = await getPayloadInstance()
  const { slug } = await params
  return payloadInstance.handler(request, { params: { slug } })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const payloadInstance = await getPayloadInstance()
  const { slug } = await params
  return payloadInstance.handler(request, { params: { slug } })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const payloadInstance = await getPayloadInstance()
  const { slug } = await params
  return payloadInstance.handler(request, { params: { slug } })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const payloadInstance = await getPayloadInstance()
  const { slug } = await params
  return payloadInstance.handler(request, { params: { slug } })
}
