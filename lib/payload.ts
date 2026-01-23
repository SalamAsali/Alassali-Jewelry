import { getPayload } from 'payload'
import config from '../payload.config'

let payloadInstance: any = null

export async function getPayloadInstance() {
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
