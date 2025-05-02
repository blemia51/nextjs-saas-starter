// src/lib/crypto.ts
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGO = 'aes-256-gcm'
const MASTER_KEY = Buffer.from(process.env.MASTER_SECRET!, 'hex') // 32 bytes

export function encrypt(plain: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv(ALGO, MASTER_KEY, iv)
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, encrypted]).toString('base64')
}

export function decrypt(ciphertext: string): string {
  const data = Buffer.from(ciphertext, 'base64')
  const iv = data.slice(0, 12)
  const tag = data.slice(12, 28)
  const text = data.slice(28)
  const decipher = createDecipheriv(ALGO, MASTER_KEY, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(text), decipher.final()]).toString('utf8')
}
