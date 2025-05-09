// src/app/api/admin/config/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { decrypt, encrypt } from '@/lib/crypto'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const rows = await prisma.appConfig.findMany()
    const data = rows.map(r => ({
      key: r.key,
      value: r.value === ''
        ? ''
        : decrypt(r.value),
    }))

    return NextResponse.json(data)
  } catch (err: unknown) {
    console.error('GET /api/admin/config error:', err)
    const message =
      err instanceof Error
        ? err.message
        : String(err)  // fallback for non-Error throwables
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { key, value } = await req.json()
    if (typeof key !== 'string' || typeof value !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const encrypted = value === '' ? '' : encrypt(value)
    await prisma.appConfig.upsert({
      where: { key },
      update: { value: encrypted },
      create: { key, value: encrypted },
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('POST /api/admin/config error:', err)
    const message =
      err instanceof Error
        ? err.message
        : String(err)  // fallback for non-Error throwables
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
