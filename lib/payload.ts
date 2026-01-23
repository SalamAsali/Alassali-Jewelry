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
