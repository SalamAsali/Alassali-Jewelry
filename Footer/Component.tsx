import { getFooter } from '@/lib/getGlobals'
import FooterClient from '@/components/Footer'

export async function Footer() {
  const data = await getFooter()
  return (
    <FooterClient
      tagline={data?.tagline}
      phone={data?.phone}
      email={data?.email}
      location={data?.location}
    />
  )
}
