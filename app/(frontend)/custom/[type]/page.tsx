import { parseTypeSegment } from '@/lib/locations'
import { getBespokeLanding } from '@/lib/bespoke/getBespoke'
import CustomJewelryClient from './_client'

/**
 * Server entry for the bespoke pages.
 *
 * Copy is resolved here rather than in the client component so the CMS text
 * lands in the initial HTML — these pages are the site's main organic
 * entry points, so the content has to be present for crawlers, not painted
 * in after hydration.
 */
export default async function CustomJewelryPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type: segment } = await params
  const { type, city } = parseTypeSegment(segment || 'general')
  const { landing } = await getBespokeLanding(type, city)

  return <CustomJewelryClient type={type} city={city} landing={landing} />
}
