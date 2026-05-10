import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | Alasali Jewelry',
  description: 'Complete your purchase. Alasali Jewelry, Toronto.',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
