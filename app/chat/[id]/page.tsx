'use client'

import { notFound } from 'next/navigation'
import { Chat } from '@/components/chat'
import { state } from '@/app/actions'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const chats = state(
    (s: any) => s.chats,
    (prev: any, next: any) => prev.chats?.length === next.chats?.length
  )
  const chat = chats?.find((chat: any) => chat.id === params.id)

  if (!chat) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
