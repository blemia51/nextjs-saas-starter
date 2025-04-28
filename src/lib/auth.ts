import type { AuthOptions, Session, SessionStrategy } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'
import GitHubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { render } from '@react-email/render'
import MagicLinkEmail from '@/emails/Email'

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
        const nodemailer = await import('nodemailer')
        const { host } = new URL(url)

        const transport = nodemailer.createTransport(provider.server)
        
        

        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          html: await render(MagicLinkEmail({url})),
          text: `Sign in to ${host}\n${url}\n\n`,
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
        }
      },
    }),
  ],
  session: {
    strategy: 'database' satisfies SessionStrategy,
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: AdapterUser }) {
      session.user.id = user.id
      session.user.role = user.role
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
