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
    } catch (error) {
      console.error('Failed to initialize Payload:', error)
      throw error
    }
  }
  return payloadInstance
}
