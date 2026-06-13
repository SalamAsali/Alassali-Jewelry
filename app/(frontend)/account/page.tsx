import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, MapPin, User, LogOut } from 'lucide-react'

export default async function AccountDashboard() {
  const { userId } = await auth()
  if (!userId) redirect('/account/login')

  const user = await currentUser()

  return (
    <div className="section-container py-16">
      <h1 className="heading-section text-deep-charcoal mb-2">My Account</h1>
      <p className="text-taupe mb-10">
        Welcome back, {user?.firstName || 'there'}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="group rounded-lg border-2 border-soft-black hover:border-glacier-grey p-8 transition-all duration-300 hover:scale-[1.02]"
        >
          <Package className="w-8 h-8 text-glacier-grey mb-4" />
          <h2 className="text-xl font-semibold text-deep-charcoal group-hover:text-glacier-grey mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            My Orders
          </h2>
          <p className="text-sm text-taupe">View order history and track shipments</p>
        </Link>

        <Link
          href="/account/addresses"
          className="group rounded-lg border-2 border-soft-black hover:border-glacier-grey p-8 transition-all duration-300 hover:scale-[1.02]"
        >
          <MapPin className="w-8 h-8 text-glacier-grey mb-4" />
          <h2 className="text-xl font-semibold text-deep-charcoal group-hover:text-glacier-grey mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Address Book
          </h2>
          <p className="text-sm text-taupe">Manage shipping and billing addresses</p>
        </Link>

        <Link
          href="/account/information"
          className="group rounded-lg border-2 border-soft-black hover:border-glacier-grey p-8 transition-all duration-300 hover:scale-[1.02]"
        >
          <User className="w-8 h-8 text-glacier-grey mb-4" />
          <h2 className="text-xl font-semibold text-deep-charcoal group-hover:text-glacier-grey mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Account Information
          </h2>
          <p className="text-sm text-taupe">Update your name, email, and preferences</p>
        </Link>
      </div>
    </div>
  )
}
