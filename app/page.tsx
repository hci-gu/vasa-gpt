'use client'

import {
  TypewriterEffect,
  TypewriterEffectSmooth
} from '@/components/ui/typewriter-effect'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function Line() {
  return (
    <div
      style={{
        width: '90vw',
        padding: 0,
        zIndex: 1
      }}
    >
      <motion.svg viewBox="0 -10 2198 383" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          initial={{ pathLength: 1, pathOffset: 1 }}
          animate={{ pathOffset: 0 }}
          transition={{
            duration: 5,
            ease: 'easeInOut'
          }}
          strokeWidth={8}
          //   stroke="rgba(0,0,0,0.8)"
          stroke="#2772b6"
          strokeDasharray="0 1"
          d="M2177.23 342.742L2152.23 348.742L2138.73 335.242L2122.73 348.742L2099.23 361.742L2083.23 360.242L2068.73 368.742L2045.23 367.242L2008.73 355.742L1991.73 358.242L1963.23 340.742L1931.73 340.742L1914.23 330.742L1897.73 325.742L1878.73 298.242L1859.23 252.742L1829.73 232.242L1808.73 197.242L1815.73 183.742L1800.73 171.742L1779.73 157.242L1759.73 152.742L1735.73 154.742L1710.23 154.742L1672.23 118.242L1633.23 92.7424L1601.73 91.2425L1571.23 71.2424L1543.23 57.2424L1519.73 45.7424L1497.73 39.7425L1482.73 48.7425L1464.23 41.7424L1444.73 45.7424L1431.23 54.7425L1416.73 51.2425L1402.73 51.2426L1375.73 61.2425L1359.73 49.7425L1342.73 47.7425L1329.23 54.7425L1312.23 51.2425L1301.23 51.2425L1296.23 35.7425L1282.23 32.2425L1246.23 32.2425L1205.73 26.2425L1186.73 11.7424L1158.73 3.74247L1110.73 1.24243L1083.73 6.74244L1057.23 19.2424L1050.73 34.2425L1040.23 41.7425L1030.23 64.2427L1021.23 93.7428L994.228 103.743L964.228 113.243L933.228 122.243L921.228 134.743L906.728 134.743L894.728 149.243L888.728 177.743L865.728 199.243L830.228 212.743L815.228 225.242H795.728L757.728 230.742L723.728 248.742L702.228 252.242L681.229 262.742L656.729 283.242L627.729 298.242L584.229 283.242L568.729 275.742L558.729 257.242L543.229 259.742L519.228 266.742L498.228 252.242L482.728 259.742L464.728 258.242L439.728 262.742L430.228 257.242L419.228 257.242L397.728 246.242L385.228 248.742L372.228 240.242L360.228 237.742L317.228 205.742L287.728 209.742L277.228 197.242L270.728 180.742L252.229 161.742L231.728 167.242L215.728 175.242L199.228 171.242L179.728 173.242L167.728 185.242L150.728 188.742L129.228 188.742L117.228 194.742L110.728 211.742L89.2283 229.743L64.7283 246.243L51.2291 242.243L43.2283 253.243L19.2291 242.243L0.728271 229.743"
          fill="none"
        />
      </motion.svg>
    </div>
  )
}

const Message = ({
  className,
  style,
  text,
  delay,
  zIndex = 10
}: {
  className?: string
  style: any
  text: string
  delay: number
  zIndex?: number
}) => {
  const [completed, setCompleted] = useState(false)
  const sameLengthBlank = ' '.repeat(text.length)

  return (
    <motion.div
      className={`${className} absolute rounded-lg border bg-background p-4 drop-shadow z-${zIndex}`}
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay, curve: 'easeInOut' }}
      onAnimationComplete={() => setCompleted(true)}
    >
      {completed ? (
        <TypewriterEffect
          className="text-xs h-5"
          words={text
            .split(' ')
            .map(text => ({ text, className: 'text-base h-10' }))}
          cursorClassName="invisible"
        />
      ) : (
        <span>
          {/* {Array.from({ length: text.length / 2 }).map(_ => (
            <>&nbsp;</>
          ))} */}
        </span>
      )}
    </motion.div>
  )
}

const ScrollForMoreArrow = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop === 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  )
}

export default function IndexPage() {
  // const id = nanoid() // Remove this line

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-muted/50">
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50">
          <div className="flex flex-col items-center justify-center relative">
            <Message
              className="invisible lg:visible"
              style={{ left: '3%', top: '24%' }}
              text="Hur känns första milen?"
              delay={0.4}
              zIndex={0}
            />
            <Message
              className="invisible lg:visible"
              style={{ left: '30%', top: '68%' }}
              text="Vad gör man om en stav bryts?"
              delay={2}
            />
            <Message
              className="invisible lg:visible"
              style={{ left: '50%', top: '15%' }}
              text="Hur ger jag inte upp halvvägs?"
              delay={2.7}
              zIndex={0}
            />
            <Message
              className="invisible lg:visible"
              style={{ left: '80%', top: '30%' }}
              text="Slangbälte eller flaskbälte?"
              delay={4.2}
            />
            <Message
              className="lg:invisible"
              style={{ left: '15%', top: '100%' }}
              text="Hur ger jag inte upp halvvägs?"
              delay={2}
            />
            <Line />
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
