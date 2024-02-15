import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import Link from 'next/link'
import ScrollForMoreArrow from '@/components/scroll-arrow'
import AnimatedMessage from '@/components/animated-message'
import VasaLine from '@/components/animated-line'
import { sendPageLoad } from '@/lib/analytics'

export default function IndexPage() {
  sendPageLoad('/')

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-muted/50">
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50">
          <div className="flex flex-col items-center justify-center relative">
            <AnimatedMessage
              className="invisible lg:visible"
              style={{ left: '3%', top: '24%' }}
              text="Hur känns första milen?"
              delay={0.4}
              zIndex={0}
            />
            <AnimatedMessage
              className="invisible lg:visible"
              style={{ left: '30%', top: '68%' }}
              text="Vad gör man om en stav bryts?"
              delay={2}
            />
            <AnimatedMessage
              className="invisible lg:visible"
              style={{ left: '50%', top: '15%' }}
              text="Hur ger jag inte upp halvvägs?"
              delay={2.7}
              zIndex={0}
            />
            <AnimatedMessage
              className="invisible lg:visible"
              style={{ left: '80%', top: '30%' }}
              text="Slangbälte eller flaskbälte?"
              delay={4.2}
            />
            <AnimatedMessage
              className="lg:invisible"
              style={{ left: '15%', top: '100%' }}
              text="Hur ger jag inte upp halvvägs?"
              delay={2}
            />
            <VasaLine />
          </div>
          <TypewriterEffect
            className="mt-24"
            duration={0.4}
            delay={0.2}
            words={[
              { text: 'VasaGPT', className: 'text-6xl font-black text-primary' }
            ]}
          />
          <p className="px-4 text-gray-500 text-center">
            Förupplev Vasaloppet genom att chatta med en AI.
          </p>
          <Link href="/chat" className="mt-8">
            <span className="bg-primary text-white font-bold py-2 px-4 rounded">
              Börja chatta
            </span>
          </Link>
          <ScrollForMoreArrow />
        </div>
      </div>
      <div className="mt-24 pb-64 mx-auto w-5/6 lg:w-1/2">
        <h2 className="text-2xl font-bold">Om</h2>
        <p className="text-gray-500 mt-2 text-justify">
          VasaGPT är en forskningsprototyp där användaren kan ha en dialog om
          frågor, funderingar och förväntningar inför att åka Vasaloppet 90km.
          VasaGPT baserar sina svar på berättelserna från Erik Wickström och
          Niklas Berghs lopprapporter. Forskningsprototypen sparar de frågor som
          du ställer. Skriv därför inte in personuppgifter, eller annan känslig
          information.
        </p>
        <p className="text-gray-500 mt-4 text-justify">
          Hör gärna av dig om du har frågor:{' '}
          <a href="mailto:jonas.landgren@gu.se" className="text-blue-500">
            jonas.landgren@gu.se
          </a>{' '}
          : Göteborgs universitet, 2024
        </p>
        <p className="text-gray-500 mt-4 text-justify">
          Skapad av{' '}
          <a href="https://hci.gu.se/appademin" className="text-blue-500">
            Appademin
          </a>
        </p>
      </div>
    </div>
  )
}
