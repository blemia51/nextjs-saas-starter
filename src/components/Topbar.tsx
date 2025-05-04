'use client'

import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToogle'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface TopbarProps {
  onMenuClick?: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const classList = document.documentElement.classList
      const match = classList.contains('dark')
      setIsDark(match)

      // Watch for changes (optional)
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains('dark'))
      })
      observer.observe(document.documentElement, { attributes: true })

      return () => observer.disconnect()
    }
  }, [])

  const logo = isDark 
  ? '/logo_saas_noback.png'
  : '/logo_saas_light.png'


  return (
    <header className="w-full h-24 px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* 🍔 Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-700 dark:text-gray-300"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
        <Image
          src={logo}
          alt="SaaS Starter Logo"
          width={180}
          height={180}
          className="mr-2"
        />
        {/* Page Title */}
        {/* <div className="text-lg font-semibold hidden sm:block">
          Welcome back 👋
        </div> */}
      </div>

      {/* 🌙 Theme Switch */}
      <ThemeToggle />
    </header>
  )
}
