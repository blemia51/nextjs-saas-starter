// app/dashboard/DashboardShell.tsx
'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Topbar } from '@/components/Topbar'
import { DashboardContent } from '@/components/DashboardContent'

export default function DashboardShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="relative flex flex-col md:flex-row flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}  />
        <main className="flex-1 p-6 overflow">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
