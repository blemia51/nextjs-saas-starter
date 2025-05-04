// src/app/admin/layout.tsx
import { ReactNode }  from 'react'
import { getServerSession } from 'next-auth'
import { redirect }        from 'next/navigation'
import { Sidebar }         from '@/components/Sidebar'
import { Topbar }          from '@/components/Topbar'
import { authOptions }     from '@/lib/auth'
// import '@/styles/globals.css'  // si besoin

export const metadata = {
  title: 'Admin • SaaS Starter',
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  // 1️⃣ Auth guard applies to every /admin/* route
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')  // pas admin → renvoie à l’accueil
  }

  // 2️⃣ Shell with Sidebar & Topbar
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#212121] text-gray-900 dark:text-gray-100 flex flex-col">
      <Topbar />

      <div className="relative flex flex-col md:flex-row flex-1">
        <Sidebar isOpen={true} />
        <main className="p-6 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
