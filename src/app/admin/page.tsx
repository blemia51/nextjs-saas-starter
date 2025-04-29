import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
// import { PrismaClient } from '@prisma/client'
import { AdminPageClient } from './AdminPageClient'
import { authOptions } from '@/lib/auth'
import type { User } from '@prisma/client'


export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/')
  }

  const users: User[] = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <AdminPageClient users={users} />
  )
}
