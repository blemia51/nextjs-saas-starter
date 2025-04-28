// app/dashboard/page.tsx

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import DashboardShell from './DashboardShell'
import { authOptions } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')

  return <DashboardShell />
}
