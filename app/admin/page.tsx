import { redirect } from 'next/navigation'

// Redirect to Payload admin (handled by (payload) route group)
export default function AdminPage() {
  redirect('/admin')
}
