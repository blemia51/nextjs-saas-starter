'use client'

import { useSession, signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiDiscord } from 'react-icons/si'



export default function LoginClient() {
  const searchParams = useSearchParams()
  const error   = searchParams.get('error')
  const { data: session } = useSession()

  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (session) window.location.href = '/dashboard'
  }, [session])

  /* 🔸 ICI : on renvoie le JSX */
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {error && (
        <p className="text-red-600 text-sm mb-4">
          Login failed: {error === 'OAuthCallback' ? 'GitHub error. Check credentials.' : error}
        </p>
      )}

      <div className="space-y-4 w-full max-w-sm">
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

        <p className='text-center'>Or</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const res = await signIn('email', { email, redirect: false })
            setMsg(res?.ok ? '📩 Magic link sent!' : '❌ Failed to send email.')
          }}
          className="space-y-2"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded cursor-pointer"
          >
            Send magic link
          </button>
        </form>


        {msg && <p className="text-sm text-center mt-2">{msg}</p>}
      </div>
    </main>
  )
}
