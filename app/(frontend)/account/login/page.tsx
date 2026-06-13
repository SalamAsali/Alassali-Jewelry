'use client'

import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="section-container py-20 flex justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'rounded-lg border-2 border-soft-black shadow-xl',
          },
        }}
        redirectUrl="/account"
      />
    </div>
  )
}
