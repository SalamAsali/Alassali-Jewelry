'use client'

import { useClerk } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  const { signOut } = useClerk()

  return (
    <button
      onClick={() => signOut({ redirectUrl: '/' })}
      className="inline-flex items-center gap-2 text-sm text-taupe hover:text-red-600 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  )
}
