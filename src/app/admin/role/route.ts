import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { userId, role } = await req.json()

  if (!userId || !['ADMIN', 'USER'].includes(role)) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  })

  return NextResponse.json({ success: true })
}
