import { getHeader, logoUrl } from '@/lib/getGlobals'
import Navigation from '@/components/Navigation'

export async function Header() {
  const data = await getHeader()
  const logo = data ? logoUrl(data.logo) : null
  return <Navigation logoUrl={logo} />
}
