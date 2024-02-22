import { OpenAIStream, StreamingTextResponse } from 'ai'
import { OpenAIClient, AzureKeyCredential } from '@azure/openai'
import { sendAnalytics } from '@/lib/analytics'

const { AZURE_OPENAI_API_KEY, AZURE_ENDPOINT, AZURE_SEARCH_KEY } = process.env

export const runtime = 'edge'

const openai = new OpenAIClient(
  AZURE_ENDPOINT ?? 'https://gu-ai-006.openai.azure.com/',
  new AzureKeyCredential(AZURE_OPENAI_API_KEY ?? '')
)

export async function POST(req: Request) {
  const { messages } = await req.json()
  const userId = req.headers.get('x-user-id') ?? ''
  const chatId = req.headers.get('x-chat-id') ?? ''
  const lastMessage = messages.length ? messages[messages.length - 1] : null
  sendAnalytics({ ...lastMessage, userId, chatId })

  const response = await openai.streamChatCompletions(
    'GPT-4-Turbo-preview-gu-ai-006',
    messages,
    {
      azureExtensionOptions: {
        extensions: [
          {
            type: 'AzureCognitiveSearch',
            endpoint: 'https://vasagpt.search.windows.net',
            indexName: 'vasagpt-2',
            key: AZURE_SEARCH_KEY,
            semanticConfiguration: 'default',
            queryType: 'vector',
            inScope: true,
            roleInformation:
              'Prata med ett direkt tilltal som en tränare för längdskidåkare. Var positiv och uppmuntrande. Ge korta svar i flödande text. Använd inte punktlistor.\n\nAnvänd informationen från de bifogade lopprapporterna från Erik Wickström från år 2013 till år 2023 som kunskapsbas i alla dialoger. Använd alltid specifika berättelser från Erik Wickströms lopprapporter för att ge svar. Berätta hur Erik tänker. Använd ortsnamn eller namn på platser längs banan för att ge ditt svar mer kontext.\n\nAnvänd gärna exempel från Smågan, Mångsbodarna, Risberg, Evertsberg, Hökberg, Hemus, eller Eldris.',
            strictness: 3,
            topNDocuments: 5,
            embeddingDependency: {
              type: 'DeploymentName',
              deploymentName: 'vasagpt-embedding-model'
            }
          }
        ]
      }
    }
  )

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onFinal(completion) {
      sendAnalytics({
        role: 'assistant',
        message: completion,
        userId,
        chatId
      })
    }
  })
  //   Respond with the stream
  return new StreamingTextResponse(stream)
}
