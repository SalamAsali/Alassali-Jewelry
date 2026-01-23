import { redirect } from 'next/navigation'

// Payload 3.0 admin is served through /api/payload/admin
export default function AdminPage() {
  redirect('/api/payload/admin')
}
