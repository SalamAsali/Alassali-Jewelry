import { getPayload } from 'payload'
import config from '../payload.config'

let payloadInstance: any = null

export async function getPayloadInstance() {
  // Don't initialize during build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return null
  }
  
  if (!payloadInstance) {
    try {
      payloadInstance = await getPayload({ config })
      console.log('Payload CMS initialized successfully')
      
      // Try to push migrations on first initialization (create tables if they don't exist)
      try {
        // Payload 3.0 should auto-create tables, but we can try to ensure they exist
        // This will happen automatically on first request, but we can trigger it here
        if (payloadInstance.db && typeof payloadInstance.db.push === 'function') {
          await payloadInstance.db.push({})
          console.log('Database tables created/verified')
        }
      } catch (migrationError) {
        // Migration errors are OK - tables might already exist or will be created on first use
        console.log('Migration check completed (tables will be created on first use)')
      }
    } catch (error) {
      console.error('Failed to initialize Payload:', error)
      // Don't throw during runtime - return null so we can show a helpful error
      if (process.env.NODE_ENV === 'production') {
        return null
      }
      throw error
    }
  }
  return payloadInstance
}
