'use client'

import { type Chat } from '@/lib/types'
import { nanoid } from 'nanoid'
import { create } from 'zustand'

export function getUserId() {
  let userId = localStorage.getItem('userId')

  if (!userId) {
    userId = nanoid()
    localStorage.setItem('userId', userId)
  }

  return userId
}

export function userHasAcceptedLogging() {
  const hasAccepted = localStorage.getItem('loggingAccepted')

  return hasAccepted === 'true'
}

export function setLoggingAccepted() {
  localStorage.setItem('loggingAccepted', 'true')
}

export function getChatsFromLocalStorage() {
  const data = localStorage.getItem('chats')

  return data ? JSON.parse(data) : []
}

export const state = create(set => ({
  chats: getChatsFromLocalStorage(),
  saveChat: (chat: Chat) => {
    const chats = getChatsFromLocalStorage()

    const exists = chats.some((c: Chat) => c.id === chat.id)

    if (exists) {
      const updated = chats.map((c: Chat) => {
        if (c.id === chat.id) {
          return chat
        }
        return c
      })

      localStorage.setItem('chats', JSON.stringify(updated))
    } else {
      localStorage.setItem('chats', JSON.stringify([...chats, chat]))
    }
    set({ chats: getChatsFromLocalStorage() })
  },
  removeChat: ({ id }: { id: string }) => {
    const chats = getChatsFromLocalStorage()

    const filtered = chats.filter((chat: Chat) => chat.id !== id)

    localStorage.setItem('chats', JSON.stringify(filtered))
    set({ chats: filtered })
  },
  clearChats: () => {
    localStorage.removeItem('chats')
    set({ chats: [] })
  }
}))
