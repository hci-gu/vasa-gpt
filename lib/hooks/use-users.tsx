import { useEffect, useState } from 'react'
import { User, getChats } from '../analytics'
import { Chat } from '../types'

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([])

  async function fetchUsers() {
    const users = await getChats()
    setUsers(users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return users
}

export function useChat(id: string) {
  const users = useUsers()

  let chats: Chat[] = []

  for (const user of users) {
    chats = chats.concat(user.chats)
  }

  return chats.find(chat => chat.id === id)
}
