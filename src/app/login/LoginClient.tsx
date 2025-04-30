'use client'

import { useSession, signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiDiscord } from 'react-icons/si'
import { useRouter } from 'next/navigation'



export default function LoginClient() {
  const { data: session } = useSession()
  const error             = useSearchParams().get('error')

  /* state magic-link */
  const [mlEmail, setMlEmail] = useState('')
  const [mlMsg,   setMlMsg]   = useState('')

  /* state credentials */
  const [credEmail, setCredEmail]     = useState('')
  const [credPass,  setCredPass]      = useState('')
  const [credMsg,   setCredMsg]       = useState('')

  const router = useRouter()

  useEffect(() => {
    if (session) window.location.href = '/dashboard'
  }, [session])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="w-full max-w-sm bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* ------ OAUTH BUTTONS ------ */}
        {error && (
          <p className="text-red-600 text-sm mb-4">
            Login failed: {error === 'OAuthCallback' ? 'OAuth error.' : error}
          </p>
        )}

        <div className="space-y-4 w-full max-w-sm">
          {/* GitHub */}
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer"
          >
            Sign in with GitHub
          </button>

          {/* Discord */}
          <button
            onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-[#5865F2] text-white rounded hover:bg-[#4752c4] transition cursor-pointer"
          >
            <SiDiscord size={18} />
            Sign in with Discord
          </button>

          {/* Google */}
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <FcGoogle size={18} />
            Sign in with Google
          </button>
        </div>

        {/* ------ MAGIC LINK ------ */}
        <div className="w-full max-w-sm mt-8 space-y-3">
          <h2 className="text-center font-semibold">Magic link</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const res = await signIn('email', { email: mlEmail, redirect: false })
              setMlMsg(res?.ok ? '📩 Magic link sent!' : '❌ Failed to send email.')
            }}
            className="space-y-2"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={mlEmail}
              onChange={(e) => setMlEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded cursor-pointer"
            >
              Send magic link
            </button>
          </form>
          {mlMsg && <p className="text-sm text-center">{mlMsg}</p>}
        </div>

        {/* ------ CREDENTIALS ------ */}
        <div className="w-full max-w-sm mt-10 space-y-3">
          <h2 className="text-center font-semibold">Email + Password</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const res = await signIn('credentials', {
                email: credEmail,
                password: credPass,
                callbackUrl: '/dashboard',    
              })
            }}
            className="space-y-2"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={credEmail}
              onChange={(e) => setCredEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={credPass}
              onChange={(e) => setCredPass(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded cursor-pointer"
            >
              Signin
            </button>
          </form>
          <p className="text-xs text-center">
            No account yet?{' '}
            <a href="/signup" className="underline text-blue-600">Create one</a>
          </p>

          {credMsg && <p className="text-sm text-center">{credMsg}</p>}
        </div>
      </div>
    </main>
  )
}
