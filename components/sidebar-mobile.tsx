'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'

import { IconSidebar } from '@/components/ui/icons'

interface SidebarMobileProps {
  children: React.ReactNode
}

export function SidebarMobile({ children }: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 flex size-9 p-0 lg:hidden">
          <IconSidebar className="size-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0 pt-8">
        <Sidebar className="flex">{children}</Sidebar>
        <div className="fixed bottom-20 left-5">
          <p
            className="text-xs text-gray-500 bg-card p-4 rounded-lg shadow"
            style={{ width: 225 }}
          >
            VasaGPT är en forskningsprototyp från Göteborgs universitet, skapad
            av Appademin och baserad på race reports av Erik Wickström och
            Niklas Bergh.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
