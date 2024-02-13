'use client'

import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { userHasAcceptedLogging } from '../actions'
import { AcceptLogging } from '@/components/accept-logging'

export default function IndexPage() {
  const id = nanoid()

  if (!userHasAcceptedLogging()) {
    return <AcceptLogging />
  }

  return <Chat id={id} />
}
