'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Payload 3.0 admin UI needs to be embedded
// For now, we'll try to load it from the API route
export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Try to load Payload admin UI
    // The admin UI should be served from /api/payload/admin
    const loadAdmin = async () => {
      try {
        const response = await fetch('/api/payload/admin/config')
        if (response.ok) {
          const config = await response.json()
          // Admin UI would be initialized here
          // For Payload 3.0, we might need to use a different approach
        }
      } catch (error) {
        console.error('Failed to load admin config:', error)
      }
    }
    loadAdmin()
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#1a1a1a',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTop: '3px solid #fff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <p>Loading Payload CMS Admin...</p>
        <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '20px' }}>
          If the admin panel doesn't load, Payload 3.0 may require<br />
          the admin UI to be embedded as a React component.<br />
          Check the Payload 3.0 documentation for the correct setup.
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
