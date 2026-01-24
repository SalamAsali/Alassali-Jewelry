import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Jewelry | Alassali Jewelry',
  description: 'Start your custom jewelry journey. Engagement rings, grillz, chains, pendants, and more. Toronto.',
}

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
