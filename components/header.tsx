import * as React from 'react'
import { SidebarToggle } from './sidebar-toggle'
import { SidebarMobile } from './sidebar-mobile'
import { ChatHistory } from './chat-history'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <SidebarMobile>
          <ChatHistory />
        </SidebarMobile>
        <SidebarToggle />
      </div>
      <div className="w-full flex justify-center">
        <span className="text-3xl font-extrabold text-primary">VasaGPT</span>
      </div>
    </header>
  )
}
