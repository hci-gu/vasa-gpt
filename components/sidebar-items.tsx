'use client'

import { Chat } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'

import { state } from '@/app/actions'

import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'
import { User } from '@/lib/analytics'
import { IconUser } from './ui/icons'

interface SidebarItemsProps {
  user?: User
}

function formatDateString(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

export function SidebarItems({ user }: SidebarItemsProps) {
  if (!user) return null

  return (
    <AnimatePresence>
      <div className="flex p-2">
        <IconUser className="mr-2" />
        <div className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all">
          User with {user.chats.length} chats
        </div>
      </div>
      {user.chats.map(
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
                <div>
                  {formatDateString(
                    chat.messages[
                      chat.messages.length - 1
                    ]?.createdAt?.toString()
                  )}
                </div>
              </SidebarItem>
            </motion.div>
          )
      )}
    </AnimatePresence>
  )
}
