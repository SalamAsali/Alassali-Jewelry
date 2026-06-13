import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { UserProfile } from '@clerk/nextjs'
import Link from 'next/link'

export default async function AccountInformationPage() {
  const { userId } = await auth()
  if (!userId) redirect('/account/login')

  return (
    <div className="section-container py-16">
      <Link href="/account" className="text-sm text-glacier-grey hover:text-glacier-grey-light transition-colors mb-6 inline-block">
        ← Back to Account
      </Link>
      <h1 className="heading-section text-deep-charcoal mb-8">Account Information</h1>
      <UserProfile
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'rounded-lg border-2 border-soft-black shadow-none',
          },
        }}
      />
    </div>
  )
}
