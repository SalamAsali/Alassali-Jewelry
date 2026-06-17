import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your shopping cart. Al-Asali Jewelry, Toronto.',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
