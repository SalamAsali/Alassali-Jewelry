import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Alasali Jewelry',
  description: 'Frequently asked questions about custom jewelry, payments, shipping, and care. Alasali Jewelry, Toronto.',
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
