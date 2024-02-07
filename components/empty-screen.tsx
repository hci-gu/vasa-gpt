import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Hur laddar jag upp inför loppet?',
    message: 'Hur laddar jag upp inför loppet?'
  },
  {
    heading: 'Vad ska jag äta innan Vasaloppet?',
    message: 'Vad ska jag äta innan?'
  },
  {
    heading: 'Vad för utrustning behöver jag?',
    message: `Vilken utrustning behöver jag?`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">Välkommen till VasaGPT</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Här kan du föruppleva{' '}
          <ExternalLink href="https://www.vasaloppet.se/">
            Vasaloppet
          </ExternalLink>{' '}
          genom att prata med en AI.
        </p>
        <p className="leading-normal text-muted-foreground">
          Du kan börja din konversation genom att skriva ett meddelande nedan,
          eller testa ett av våra exempel.
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
