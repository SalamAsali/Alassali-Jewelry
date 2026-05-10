import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart | Alasali Jewelry',
  description: 'Your shopping cart. Alasali Jewelry, Toronto.',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
