import { redirect } from 'next/navigation'

// Redirect /cms to /admin
export default function CMSPage() {
  redirect('/admin')
}
