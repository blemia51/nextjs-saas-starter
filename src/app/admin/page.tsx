import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { PrismaClient } from '@prisma/client'
import { AdminPageClient } from './AdminPageClient'

type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}


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
