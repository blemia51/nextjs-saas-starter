// src/app/providers.tsx
'use client'

import { ReactNode }      from 'react'
import { ThemeProvider }   from 'next-themes'
import { SessionProvider } from '@/components/SessionProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
