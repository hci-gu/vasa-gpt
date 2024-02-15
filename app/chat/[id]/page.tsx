'use client'

import { notFound } from 'next/navigation'
import { Chat } from '@/components/chat'
import { state } from '@/app/actions'
import { useChat } from '@/lib/hooks/use-users'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const chat = useChat(params.id)

  if (!chat) {
    return <div>laddar...</div>
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
