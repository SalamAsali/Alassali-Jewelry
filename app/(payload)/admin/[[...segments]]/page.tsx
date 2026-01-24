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

export const generateMetadata = ({ params }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params })

const Page = async ({ params, searchParams }: Args) => {
  const resolved = await params
  const normalizedParams = Promise.resolve({ segments: resolved?.segments ?? [] })
  return RootPage({ config, params: normalizedParams, searchParams, importMap })
}

export default Page
