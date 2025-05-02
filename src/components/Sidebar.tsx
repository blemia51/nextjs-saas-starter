'use client'

import { signOut } from 'next-auth/react'
import { X } from 'lucide-react'
import clsx from 'clsx'
import Link from 'next/link'


interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay en mobile */}
      <div
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed z-50 md:static top-0 left-0 h-screen md:h-auto w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 transition-transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
      >
        {/* Bouton fermer mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* <h2 className="text-2xl font-bold mb-8 hidden md:block">SaaS Starter</h2> */}

        <nav className="flex-1 space-y-4 text-base">
          <Link href="/dashboard" className="block hover:text-blue-600">Dashboard</Link>
          <Link href="/admin" className="block hover:text-blue-600">Users</Link>
          <a href="#" className="block hover:text-blue-600">Billing</a>
          <Link href="/admin/settings" className="block hover:text-blue-600">Settings</Link>

          <button
            onClick={() => signOut()}
            className="mt-8  hover:text-blue-600 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}
