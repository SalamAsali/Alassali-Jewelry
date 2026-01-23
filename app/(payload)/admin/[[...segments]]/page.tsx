/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { AdminPanel } from '@payloadcms/next/views'
import { importMap } from './importMap'

type Args = {
  params: Promise<{ segments: string[] }>
}

const Page = async ({ params }: Args) => {
  const { segments } = await params
  return <AdminPanel config={config} importMap={importMap} segments={segments} />
}

export default Page
