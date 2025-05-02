// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const { createCipheriv, randomBytes } = require('crypto')

// ⚙️ Copy-paste the same AES logic here:
const ALGO       = 'aes-256-gcm'
const MASTER_KEY = Buffer.from(process.env.MASTER_SECRET, 'hex')

function encrypt(plain) {
  const iv     = randomBytes(12)
  const cipher = createCipheriv(ALGO, MASTER_KEY, iv)
  const encrypted = Buffer.concat([
    cipher.update(plain, 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, encrypted]).toString('base64')
}

async function main() {
  const prisma = new PrismaClient()
  const defaults = [
    { key: 'SENDGRID_API_KEY', value: process.env.SENDGRID_API_KEY },
    { key: 'GITHUB_ID',         value: process.env.GITHUB_ID },
    // …autres clés
  ]

  for (const { key, value } of defaults) {
    if (!value) {
      console.warn(`⚠️ Missing env for "${key}", skipping`)
      continue
    }
    await prisma.appConfig.upsert({
      where:  { key },
      update: { value: encrypt(value) },
      create: { key,   value: encrypt(value) },
    })
    console.log(`Upserted ${key}`)
  }
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
