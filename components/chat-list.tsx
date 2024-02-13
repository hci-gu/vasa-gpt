import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage, ChatMessageLoading } from '@/components/chat-message'

export interface ChatList {
  messages: Message[]
  isLoading: boolean
}

function lastMessageIsFromUser(messages: Message[]) {
  if (messages.length === 0) {
    return false
  }

  const lastMessage = messages[messages.length - 1]
  return lastMessage.role === 'user'
}

export function ChatList({ messages, isLoading }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
      {isLoading && lastMessageIsFromUser(messages) && (
        <div>
          <Separator className="my-4 md:my-8" />
          <ChatMessageLoading />
        </div>
      )}
    </div>
  )
}
