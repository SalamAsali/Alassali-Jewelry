import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

const TITLE = 'FAQ — Custom Jewelry Process, Pricing & Care'
const DESCRIPTION =
  'Frequently asked questions about custom jewelry — payments, shipping, custom orders, care, and warranty. Al-Asali Jewelry, Toronto.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/faq' },
  openGraph: mergeOpenGraph({ title: `${TITLE} | Al-Asali Jewelry`, description: DESCRIPTION, url: '/faq' }),
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
