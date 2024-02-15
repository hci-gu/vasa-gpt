'use client'

import { nanoid } from 'nanoid'
import { Chat } from './chat'
import { userHasAcceptedLogging } from '@/app/actions'
import { AcceptLogging } from './accept-logging'

export default function ChatPage() {
  const id = nanoid()

  if (!userHasAcceptedLogging()) {
    return <AcceptLogging />
  }

  return <Chat id={id} />
}
