import { redirect } from 'next/navigation'

// Payload 3.0 admin UI should be accessible
// For now, redirect to the admin API endpoint which will serve the UI
export default function AdminPage() {
  // Payload 3.0 admin is served through /api/payload/admin
  // The admin UI is a React app that Payload serves
  redirect('/api/payload/admin')
}
