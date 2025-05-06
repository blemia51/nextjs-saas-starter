'use client'

import { useState, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignupClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) return setMsg('Password must be ≥ 8 chars')
    setBusy(true)

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      setMsg('✅ Account created! Redirecting…')
      // auto-login after sign-up
      await signIn('credentials', { email, password, callbackUrl: '/dashboard' })
    } else {
      const { error } = await res.json()
      setMsg(`❌ ${error}`)
    }
    setBusy(false)
  }

  function goToLogin() {
    startTransition(() => {
      router.push('/login')
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-[#212121] text-gray-900 dark:text-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-gray-50 dark:bg-[#303030] p-6 rounded-xl shadow"
      >
        <h1 className="text-xl font-bold text-center">Create account</h1>

        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-[#171717] bg-white dark:bg-[#212121]"
        />

        <input
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-[#171717] bg-white dark:bg-[#212121]"
        />

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded cursor-pointer"
        >
          {busy ? 'Creating…' : 'Sign up'}
        </button>

        {msg && <p className="text-sm text-center">{msg}</p>}

        <p className="text-xs text-center">
          Already have an account?{' '}
          <button
            type="button"
            onClick={goToLogin}
            disabled={isPending}
            className="underline text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            Log in
          </button>
        </p>
      </form>
    </main>
  )
}
