'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { ThemeToggle } from '@/components/ThemeToogle'

export default function HomePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleLiveDemo() {
    if (!session) {
      // si pas connecté, garde la transition fluid
      startTransition(() => router.push('/login'))
    } else {
      startTransition(() => router.push('/dashboard'))
    }
  }
  return (
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-[#212121] text-gray-800 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Launch your SaaS in hours, not weeks
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A clean, scalable Next.js 14 starter with Auth, Stripe, and modern UI—release faster.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleLiveDemo}
            disabled={isPending}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? 'Loading…' : 'Live Demo'}
          </button>
          <a
            href="#"
            className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-gray-800"
          >
            Buy Template
          </a>
          <ThemeToggle />
        </div>

        <section className="mt-20 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <Feature
            title="Next.js 14"
            desc="Built with the App Router and modern best practices."
          />
          <Feature
            title="Tailwind CSS v4"
            desc="Fully responsive and themeable with minimal effort."
          />
          <Feature
            title="Auth & Stripe Ready"
            desc="Start billing your users in minutes."
          />
          <Feature
            title="Dark Mode"
            desc="Native light/dark theme with persistence."
          />
          <Feature
            title="Clean UI"
            desc="Minimalist dashboard with reusable components."
          />
          <Feature
            title="One-Click Deploy"
            desc="Optimized for Vercel, Netlify, and beyond."
          />
        </section>
      </div>
    </main>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-[#303030] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-[#303030]">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  )
}