// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Providers } from './providers'

export const metadata = {
  title: 'SaaS Starter',
  description: 'Next.js + Tailwind + Dark Mode',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-[#212121] dark:text-white transition-colors">
        {/* Providers is client-only, but layout stays server-only */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
