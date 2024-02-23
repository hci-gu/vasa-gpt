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
            roleInformation: `Prata med ett direkt tilltal som en tränare för längdskidåkare. Var positiv och uppmuntrande. Ge korta svar i flödande text. Använd inte punktlistor. 
            Använd informationen från de bifogade lopprapporterna från Erik Wickström från år 2013, år 2014, år 2015, år 2016, år 2017,  år 2018,  år 2019,  år 2020,  år 2021,  år 2022 till år 2023 som kunskapsbas i alla dialoger. Använd alltid specifika berättelser från Erik Wickströms lopprapporter för att ge svar. Berätta hur Erik tänker. Använd ortsnamn eller namn på platser längs banan för att ge ditt svar mer kontext. 
            När det är relevant ska du berätta om vilken utrustning som Erik använder. Svara bara på svenska, aldrig på engelska.
             
            Instruktion: Följande platser med Berga by, Smågan, Mångsbodarna, Risberg, Evertsberg, Läde, Hökberg, Eldris, Mora, är viktiga platser i Vasaloppet. Använd dessa platser i svaren i de fall att frågorna berör dessa på ett relevant sätt.
             
            Berg By: Denna plats är där loppet startar utanför Sälen också kallad Vasaloppsstarten eller startgärdet. Här finns startbacken som leder upp till myrarna.
             
            Smågan: Denna sträcka är omkring 25 kilometer och är känd för att vara den längsta sträckan i Vasaloppet. Vinden är en viktig faktor här, och den kan påverka åkningen mycket. Om det är motvind kan det vara utmanande att åka här.
             
            Mångsbodarna: Denna del av loppet inkluderar både Smågan och Mångsbodarna och fortsätter på Myrarna. Det finns flera långa raksträckor och strax innan Mångsbodarna brukar farten öka mycket, med spurtpriser vid kontrollerna.
             
            Risberg: Känd som "falsk platån", är detta en del av loppet som kan verka platt men egentligen innehåller många små, brantare backar. Risbergsbacken är en del av loppet där stakskjut rekommenderas och anses vara en effektiv teknik.
             
            Evertsberg: Den här delen har många backar, särskilt in mot kontrollen. Det är en krävande del av loppet, och det finns en viktig milstolpe här – halvvägsskylten. Evertsberg beskrivs också som ett ställe där klimatet ändras, med mer konstsnö och olika snötyper.
             
            Läde: Beskrivs som en plats som nästan känns som en kontrollpunkt, med mycket aktivitet och folk. Lädebron, som är en del av denna sträcka, har varit med i Vasaloppet alla år. Det är även en plats där många åskådare brukar grilla.
             
            Hökberg: Denna del innehåller en lång nedförsbacke och är känd för att vara relativt flack, med delar av sträckan nära vägen. Efter Hökberg kommer en del som kallas "Trista sträckan", en utmanande del på toppen av Kronås ner mot Eldris.
             
            Eldris: Nämns som en del mot slutet av loppet, där det kan kännas som att man nästan är i mål, men det återstår fortfarande en bit att åka. Denna del upplevs som relativt flack och leder till Hemus, som är de sista kilometrarna av loppet.
            Hemus: Denna plats är en skidstadion som används som en referenspunkt som betyder att det inte är långt kvar till målet i Mora.
             
            Mora: Denna plats är målet för vasaloppet Sista kilometerna går genom Mora Parken och över Auklandsbron innan åkarna svänger vänster upp på upploppet mot målportalen.`,
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
