// src/lib/config.ts
import prisma from './prisma'
import { decrypt } from './crypto'

export async function getConfig(key: string): Promise<string> {
  const row = await prisma.appConfig.findUnique({ where: { key } })
  if (!row) throw new Error(`Config "${key}" not set`)
  return decrypt(row.value)
}
