import { redirect } from 'next/navigation'

// Redirect /cms to /admin (standard Payload route)
export default function CMSPage() {
  redirect('/admin')
}
