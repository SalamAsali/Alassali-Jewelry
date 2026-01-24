import { getFooter, logoUrl } from '@/lib/getGlobals'
import FooterClient from '@/components/Footer'

export async function Footer() {
  const data = await getFooter()
  const logo = data ? logoUrl(data.logo) : null
  return (
    <FooterClient
      logoUrl={logo}
      tagline={data?.tagline}
      phone={data?.phone}
      email={data?.email}
      location={data?.location}
    />
  )
}
