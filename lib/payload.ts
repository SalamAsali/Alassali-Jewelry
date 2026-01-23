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
      
      // Try to push migrations (create tables) if enabled
      if (process.env.ENABLE_PUSH_MIGRATIONS === 'true' || process.env.NODE_ENV === 'development') {
        try {
          // Access the database adapter and push migrations
          if (payloadInstance.db && payloadInstance.db.push) {
            await payloadInstance.db.push({})
            console.log('Database migrations pushed - tables created/verified')
          }
        } catch (migrationError) {
          // Migration errors are OK - tables might already exist
          console.log('Migration check:', migrationError instanceof Error ? migrationError.message : 'Completed')
        }
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
