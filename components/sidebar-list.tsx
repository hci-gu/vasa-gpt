'use client'

import { state } from '@/app/actions'
import { ClearHistory } from '@/components/clear-history'
import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { User, getChats } from '@/lib/analytics'
import useUsers from '@/lib/hooks/use-users'
import { cache, useEffect, useState } from 'react'

interface SidebarListProps {
  userId?: string
  users: User[]
  children?: React.ReactNode
}

// export const getServerSideProps = async () => {
//   const users = await getChats()

//   return {
//     props: {
//       users
//     }
//   }
// }

export async function SidebarList({ userId }: SidebarListProps) {
  const users = useUsers()
  console.log(users)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Users - {users.length}</h2>
      </div>

      {users.map((user, index) => (
        <SidebarItems user={user} key={`User_${user.id}`} />
      ))}

      <div className="flex-1 overflow-auto"></div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
      </div>
    </div>
  )
}
