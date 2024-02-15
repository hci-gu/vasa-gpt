'use client'

import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AnimatedMessage({
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
}) {
  const [completed, setCompleted] = useState(false)

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
        <span></span>
      )}
    </motion.div>
  )
}
