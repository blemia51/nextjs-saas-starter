'use client'

import { ThemeToggle } from '@/components/ThemeToogle'

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Build your SaaS in hours, not weeks
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A clean and scalable Next.js 14 starter with Auth, Stripe, and modern UI — launch faster.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
            Live Demo
          </a>
          <a href="#" className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-gray-800">
            Buy Template
          </a>
        </div>

        <div className="pt-4">
          <ThemeToggle />
        </div>
        <section className="mt-20 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <Feature
            title="Next.js 14"
            desc="Built with App Router and modern best practices."
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
            desc="Built-in light/dark theme with persistence."
          />
          <Feature
            title="Clean UI"
            desc="Minimalist dashboard with reusable components."
          />
          <Feature
            title="Deploy in 1 click"
            desc="Optimized for Vercel, Netlify and beyond."
          />
        </section>
      </div>
    </main>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  )
}

