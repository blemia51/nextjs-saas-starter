import type { AuthOptions } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider  from 'next-auth/providers/discord'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { render } from '@react-email/render'
import MagicLinkEmail from '@/emails/Email'
import { verifyPassword }  from '@/lib/password'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const authOptions: AuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const { host } = new URL(url)
        const msg = {
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          html: await render(MagicLinkEmail({url})),
          text: `Sign in to ${host}\n${url}\n\n`,
        }
        await sgMail.send(msg)
      },
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        if (!creds?.email || !creds.password) return null
       // ① Récupère l'utilisateur dans la DB
    const user = await prisma.user.findUnique({ 
      where: { email: creds.email },
      select: { id: true, name: true, email: true, role: true, passwordHash: true },
    })
    console.log('user', user)
    if (!user || !user.passwordHash) return null

    // ② Vérifie le mot de passe
    const isValid = await verifyPassword(creds.password, user.passwordHash)
    return isValid ? user : null     // → “Invalid credentials”
      },
    }),

  ],
  session: {
    // strategy: 'database' satisfies SessionStrategy,
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as AdapterUser).role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id   = token.id!
      session.user.role = token.role!
      return session
    },
  },
}
