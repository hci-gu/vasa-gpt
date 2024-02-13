import { Toaster } from 'react-hot-toast'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'

export const metadata = {
  metadataBase: new URL('https://vasagpt.se'),
  title: {
    default: 'VasaGPT'
  },
  description:
    'VasaGPT låter dig föruppleva Vasaloppet genom att chatta med en AI.',
  icons: {
    icon: '/img/favicon.ico',
    shortcut: '/img/favicon-16x16.png'
  },
  openGraph: {
    type: 'website',
    url: 'https://vasagpt.se',
    title: 'VasaGPT',
    description:
      'VasaGPT låter dig föruppleva Vasaloppet genom att chatta med en AI.',
    image: '/img/share.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Toaster />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
