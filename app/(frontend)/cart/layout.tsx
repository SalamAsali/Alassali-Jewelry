import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart | Alassali Jewelry',
  description: 'Your shopping cart. Alassali Jewelry, Toronto.',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
