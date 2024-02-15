import { sendPageLoad } from '@/lib/analytics'
import ChatPage from '@/components/chat-page'

export default function IndexPage() {
  sendPageLoad('/chat')

  return <ChatPage />
}
