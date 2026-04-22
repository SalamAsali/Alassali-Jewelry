import Navigation from '@/components/Navigation'
import { getHeader, logoUrl } from '@/lib/getGlobals'

export async function Header() {
  const data = await getHeader()
  return <Navigation logoUrl={logoUrl(data?.logo)} />
}
