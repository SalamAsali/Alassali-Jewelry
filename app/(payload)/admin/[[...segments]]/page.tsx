import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Alassali Jewelry',
  description: 'Content management for Alassali Jewelry',
}

type Args = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

/**
 * Admin route - Redirects to DatoCMS dashboard
 * 
 * Content is now managed through DatoCMS at https://datocms.com
 * Users will be redirected to the DatoCMS login/dashboard page.
 */
export default async function AdminPage({ params, searchParams }: Args) {
  // Redirect to DatoCMS dashboard
  // Users can log in with their DatoCMS credentials
  redirect('https://datocms.com/dashboard')
}
