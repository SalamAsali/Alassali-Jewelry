import { getPayload } from 'payload'
import config from '../payload.config'

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadInstance() {
  if (!payloadInstance) {
    try {
      payloadInstance = await getPayload({ config })
    } catch (error) {
      console.error('Failed to initialize Payload:', error)
      // Don't throw in build - let it fail gracefully
      if (process.env.NODE_ENV === 'production') {
        throw error
      }
    }
  }
  return payloadInstance
}
