// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth'
import { DefaultJWT }     from 'next-auth/jwt'

// 1️⃣ Extend the Session and User from next-auth
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: 'ADMIN' | 'USER'   // match your Prisma Role enum
    } & DefaultSession['user']
  }

  interface User {
    role?: 'ADMIN' | 'USER'
  }
}

// 2️⃣ Augment the JWT so that `token.role` is the same union
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?:   string
    role?: 'ADMIN' | 'USER'
  }
}
