'use client'

import { useChat, experimental_useAssistant, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { getUserId, state } from '@/app/actions'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

const roleToColorMap: Record<Message['role'], string> = {
  system: 'red',
  user: 'black',
  function: 'blue',
  assistant: 'green',
  data: 'orange',
  tool: 'purple'
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  // const { status, messages, input, submitMessage, handleInputChange } =
  //   experimental_useAssistant({ api: '/api/assistant' })
  // console.log('messages', messages, 'status', status)

  // return (
  //   <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
  //     {messages.map((m: Message) => (
  //       <div
  //         key={m.id}
  //         className="whitespace-pre-wrap"
  //         style={{ color: roleToColorMap[m.role] }}
  //       >
  //         <strong>{`${m.role}: `}</strong>
  //         {m.role !== 'data' && m.content}
  //         {m.role === 'data' && (
  //           <>
  //             {/* here you would provide a custom display for your app-specific data:*/}
  //             {(m.data as any).description}
  //             <br />
  //             <pre className={'bg-gray-200'}>
  //               {JSON.stringify(m.data, null, 2)}
  //             </pre>
  //           </>
  //         )}
  //         <br />
  //         <br />
  //       </div>
  //     ))}

  //     {status === 'in_progress' && (
  //       <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
  //     )}

  //     <form onSubmit={submitMessage}>
  //       <input
  //         disabled={status !== 'awaiting_message'}
  //         className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
  //         value={input}
  //         placeholder="What is the temperature in the living room?"
  //         onChange={handleInputChange}
  //       />
  //     </form>
  //   </div>
  // )

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
        'x-user-id': getUserId(),
        'x-chat-id': id ?? ''
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish() {
        if (!path.includes('chat/')) {
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
            <ChatList messages={messages} isLoading={isLoading} />
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
