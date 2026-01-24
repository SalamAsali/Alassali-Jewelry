import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'
import './globals.css'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
