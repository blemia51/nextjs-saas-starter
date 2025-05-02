'use client'

import { User } from "@prisma/client"
import { useState } from "react"

export function AdminPageClient({ users }: { users: User[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} /> */}
      <div className="flex flex-1">
        {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
        <main className="p-6 flex-1 overflow-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <table className="w-full border border-gray-300 dark:border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-2">{user.name || '–'}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">
                    <form action="/api/admin/role" method="POST">
                      <input type="hidden" name="userId" value={user.id} />
                      <input
                        type="hidden"
                        name="role"
                        value={user.role === 'ADMIN' ? 'USER' : 'ADMIN'}
                      />
                      <button
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                      >
                        {user.role === 'ADMIN' ? 'Demote' : 'Promote'}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  )
}
