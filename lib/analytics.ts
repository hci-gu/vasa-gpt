const API_KEY = process.env.ANALYTICS_API_KEY ?? ''
const ANALYTICS_API = process.env.ANALYTICS_API ?? 'http://localhost:3000'

interface AnalyticsPayload {
  role: string
  message: string
  userId: string
  chatId: string
}

export async function sendAnalytics(payload: AnalyticsPayload): Promise<void> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    }
    console.log(`${ANALYTICS_API}/vasagpt/chats/data`)
    await fetch(`${ANALYTICS_API}/vasagpt/chats/data`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...payload, timestamp: new Date() })
    })
    console.log('Analytics payload sent successfully')
  } catch (error) {
    console.error('Failed to send analytics payload:', error)
  }
}
