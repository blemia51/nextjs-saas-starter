import './globals.css'
import { ReactNode } from 'react'
import { SessionProvider } from '@/components/SessionProvider'


export const metadata = {
  title: 'SaaS Starter',
  description: 'Next.js + Tailwind + Dark Mode',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
      <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
