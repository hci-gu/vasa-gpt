import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const headers = req.headers
  const json = await req.json()

  console.log('userId', headers.get('x-user-id'))

  const { messages } = json

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}
