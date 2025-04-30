import bcrypt from 'bcryptjs'

/**
 * Hash a plain-text password (signup / reset)
 */
export async function hashPassword(plain: string) {
  const SALT_ROUNDS = 12
  return bcrypt.hash(plain, SALT_ROUNDS)
}

/**
 * Compare entered password with the stored hash (login)
 */
export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash)
}
