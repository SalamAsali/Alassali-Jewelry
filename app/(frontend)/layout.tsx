import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'
import { CartProvider } from '@/lib/cart'
import MiniCart from '@/components/MiniCart'
import './globals.css'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MiniCart />
      </div>
    </CartProvider>
  )
}
