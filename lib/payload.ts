import { getPayload } from 'payload'
import config from '../payload.config'

let payloadInstance: any = null

export async function getPayloadInstance() {
  if (!payloadInstance) {
    try {
      payloadInstance = await getPayload({ config })
    } catch (error) {
      console.error('Failed to initialize Payload:', error)
      // In build time, return null to avoid blocking
      if (process.env.NEXT_PHASE === 'phase-production-build') {
        return null
      }
      throw error
    }
  }
  return payloadInstance
}
