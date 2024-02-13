import { Header } from '@/components/header'
import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 bg-muted/50">
        <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
          <SidebarDesktop />
          <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
            {children}
          </div>

          <div className="fixed top-20 right-5 invisible lg:visible">
            <p
              className="text-xs text-gray-500 bg-card p-4 rounded-lg shadow"
              style={{ width: 225 }}
            >
              VasaGPT är en forskningsprototyp från Göteborgs universitet,
              skapad av Appademin och baserad på race reports av Erik Wickström
              och Niklas Bergh.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
