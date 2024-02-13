import { experimental_AssistantResponse } from 'ai'
import OpenAI from 'openai'
import { MessageContentText } from 'openai/resources/beta/threads/messages/messages'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})
const ASSISTANT_ID = process.env.ASSISTANT_ID || 'asst_wdwp7uNfLQnJqOZ34MnBDuTT'

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

const homeTemperatures = {
  bedroom: 20,
  'home office': 21,
  'living room': 21,
  kitchen: 22,
  bathroom: 23
}

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null
    message: string
  } = await req.json()

  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message
  })

  return experimental_AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ threadId, sendMessage }) => {
      // Run the assistant on the thread
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: ASSISTANT_ID
      })

      async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
        // Poll for status change
        while (run.status === 'queued' || run.status === 'in_progress') {
          // delay for 500ms:
          await new Promise(resolve => setTimeout(resolve, 250))

          run = await openai.beta.threads.runs.retrieve(threadId!, run.id)
        }

        // Check the run status
        if (
          run.status === 'cancelled' ||
          run.status === 'cancelling' ||
          run.status === 'failed' ||
          run.status === 'expired'
        ) {
          throw new Error(run.status)
        }
      }

      await waitForRun(run)

      // Get new thread messages (after our message)
      const responseMessages = (
        await openai.beta.threads.messages.list(threadId, {
          after: createdMessage.id,
          order: 'asc'
        })
      ).data

      // Send the messages
      for (const message of responseMessages) {
        // TODO: LOG here
        sendMessage({
          id: message.id,
          role: 'assistant',
          content: message.content.filter(
            content => content.type === 'text'
          ) as Array<MessageContentText>
        })
      }
    }
  )
}
