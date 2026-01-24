/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

/** Next.js 15: params/searchParams are Promises and must be awaited. */
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  return generatePageMetadata({ config, params })
}

export default async function Page({ params, searchParams }: Args) {
  const resolved = await params
  const normalizedParams = Promise.resolve({ segments: resolved?.segments ?? [] })
  return RootPage({ config, params: normalizedParams, searchParams, importMap })
}
