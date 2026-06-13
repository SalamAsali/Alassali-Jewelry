import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AddressesPage() {
  const { userId } = await auth()
  if (!userId) redirect('/account/login')

  const user = await currentUser()

  return (
    <div className="section-container py-16">
      <Link href="/account" className="text-sm text-glacier-grey hover:text-glacier-grey-light transition-colors mb-6 inline-block">
        ← Back to Account
      </Link>
      <h1 className="heading-section text-deep-charcoal mb-8">Address Book</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg border-2 border-soft-black p-6">
          <h2 className="heading-subsection text-deep-charcoal mb-4">Default Shipping Address</h2>
          <p className="text-sm text-taupe">
            Address management is handled through your account profile.
          </p>
          <Link
            href="/account/information"
            className="inline-block mt-4 text-sm font-semibold text-glacier-grey hover:text-glacier-grey-light transition-colors"
          >
            Edit in Profile →
          </Link>
        </div>

        <div className="rounded-lg border-2 border-soft-black p-6">
          <h2 className="heading-subsection text-deep-charcoal mb-4">Default Billing Address</h2>
          <p className="text-sm text-taupe">
            Billing address is set during checkout via Stripe.
          </p>
        </div>
      </div>
    </div>
  )
}
