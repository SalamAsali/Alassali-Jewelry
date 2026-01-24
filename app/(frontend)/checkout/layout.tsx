import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | Alassali Jewelry',
  description: 'Complete your purchase. Alassali Jewelry, Toronto.',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
