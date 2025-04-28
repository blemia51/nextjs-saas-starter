'use client'

import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { data: session } = useSession()

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (session) {
      window.location.href = '/dashboard'
    }
  }, [session])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('email', {
      email,
      redirect: false,
    })

    if (res?.ok) {
      setMessage('📩 Magic link sent! Check your inbox.')
    } else {
      setMessage('❌ Failed to send email.')
    }
  }

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
          className="w-full px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Sign in with GitHub
        </button>

        <form onSubmit={handleEmailSignIn} className="space-y-2">
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Send magic link
          </button>
        </form>

        {message && (
          <p className="text-sm text-center mt-2">{message}</p>
        )}
      </div>
    </main>
  )
}
