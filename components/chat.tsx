'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { state } from '@/app/actions'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const path = usePathname()
  const saveChat = state((s: any) => s.saveChat)
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id
      },
      headers: {
        'x-user-id': '1234'
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish() {
        if (!path.includes('chat')) {
          window.history.pushState({}, '', `/chat/${id}`)
        }
      }
    })

  useEffect(() => {
    if (!messages.length) return
    const title = messages[0].content.substring(0, 100)
    const createdAt = Date.now()
    const path = `/chat/${id}`
    const payload = {
      id,
      title,
      createdAt,
      path,
      messages
    }
    saveChat(payload)
  }, [messages])
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}
