'use client'

import { Chat } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'

import { state } from '@/app/actions'

import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'

interface SidebarItemsProps {
  chats?: Chat[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  const removeChat = state(
    (s: any) => s.removeChat,
    (prev: any, next: any) => prev.length == next.length
  )
  if (!chats?.length) return null

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              exit={{
                opacity: 0,
                height: 0
              }}
            >
              <SidebarItem index={index} chat={chat}>
                <SidebarActions chat={chat} removeChat={removeChat} />
              </SidebarItem>
            </motion.div>
          )
      )}
    </AnimatePresence>
  )
}
