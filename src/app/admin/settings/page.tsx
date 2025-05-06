'use client'

import { useEffect, useRef, useState } from 'react'
import { CONFIG_KEYS } from '@/lib/config-keys'
import { nanoid } from 'nanoid'
import { MoreVertical } from 'lucide-react'
import SettingsSkeleton from '@/components/SettingsSkeleton'

type Entry = {
  id: string
  key: string
  value: string
  secret: boolean
}

export default function SettingsPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [dirty, setDirty] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editKey, setEditKey] = useState('')
  const [editValue, setEditValue] = useState('')

  // Dropdown menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  // Local state for new custom key
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [isloading, setIsloading] = useState(true)

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Load existing config
  useEffect(() => {
    fetch('/api/admin/config')
      .then(res => res.json())
      .then((data: Array<{ key: string; value: string }>) => {
        const loaded: Entry[] = []

        // static keys
        for (const c of CONFIG_KEYS) {
          const found = data.find(d => d.key === c.key)
          loaded.push({
            id: c.key,
            key: c.key,
            value: found?.value ?? '',
            secret: c.secret,
          })
        }

        // dynamic/custom keys
        for (const d of data) {
          if (CONFIG_KEYS.some(c => c.key === d.key)) continue
          loaded.push({
            id: d.key,
            key: d.key,
            value: d.value,
            secret: false,
          })
        }

        setEntries(loaded)
      })
      .catch(() => { })
      .finally(() => setIsloading(false))
  }, [])

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const refs = menuRefs.current
      if (openMenuId && refs[openMenuId] && !refs[openMenuId]!.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openMenuId])



  // Begin edit mode for one entry
  function startEdit(id: string) {
    const e = entries.find(e => e.id === id)
    if (!e) return
    setEditingId(id)
    setEditKey(e.key)
    setEditValue(e.value)
    setOpenMenuId(null)
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null)
  }

  function removeEntry(id: string) {
    setEntries(prev => prev.filter(e => e.id !== id))
    setDirty(true)
    setOpenMenuId(null)
  }

  // Save single edit locally
  function saveEdit(id: string) {
    setEntries(prev => {
      const copy = [...prev]
      const idx = copy.findIndex(e => e.id === id)
      if (idx === -1) return prev
      copy[idx] = { ...copy[idx], key: editKey, value: editValue }
      return copy
    })
    setDirty(true)
    setEditingId(null)
  }

  // Add new custom
  function addCustomKey() {
    const k = newKey.trim()
    if (!k) return alert('Key cannot be empty')
    if (entries.some(e => e.key === k)) return alert(`Key "${k}" exists`)
    setEntries(prev => [
      ...prev,
      { id: nanoid(), key: k, value: newValue, secret: false },
    ])
    setDirty(true)
    setNewKey('')
    setNewValue('')
  }

  // Persist all
  async function saveAll(e?: React.FormEvent) {
    e?.preventDefault()
    await Promise.all(
      entries.map(e =>
        fetch('/api/admin/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: e.key, value: e.value }),
        })
      )
    )
    setDirty(false)
    alert('Saved!')
  }

  if (isloading) {
    return (
      <div className="p-5 max-w-5xl mt-4 space-y-6">
        <SettingsSkeleton />
      </div>
    )
  }

  return (
    <div className="p-5 max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold">App Settings</h1>
      <form onSubmit={saveAll} className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="flex flex-row gap-4">
            {editingId === entry.id ? (
              <>
                <input
                  className="w-1/3 border p-2 rounded"
                  value={editKey}
                  onChange={e => setEditKey(e.target.value)}
                />
                <input
                  className="w-2/3 border p-2 rounded"
                  // type={entry.secret ? 'password' : 'text'}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <button type="button" onClick={() => saveEdit(entry.id)} className="text-green-600 cursor-pointer ">Save</button>
                <button type="button" onClick={cancelEdit} className="text-gray-600 cursor-pointer">Cancel</button>
              </>
            ) : (
              <>
                <input
                  value={entry.key}
                  disabled
                  className="w-1/3 truncate font-medium text-gray-500 border p-2 rounded"
                />
                <input
                  type={entry.secret ? 'password' : 'text'}
                  value={entry.value}
                  disabled
                  className="w-2/3 truncate border p-2 rounded text-gray-500"
                />
                <div
                  ref={(el) => { menuRefs.current[entry.id] = el }}
                  className="relative"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenuId(openMenuId === entry.id ? null : entry.id)
                    }
                    }
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {openMenuId === entry.id && (
                    <div className="absolute top-1/2 left-full ml-6 transform -translate-y-1/2 w-32 bg-white dark:bg-[#171717] border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
                      <button onClick={() => startEdit(entry.id)} className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Edit</button>
                      <button onClick={() => removeEntry(entry.id)} className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Remove</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}

        {/* Custom key adder */}
        <div className="pt-6 border-t space-y-2">
          <h2 className="text-lg font-semibold">Add Custom Key</h2>
          <div className="flex gap-4">
            <input
              className="flex-1 border p-2 rounded"
              placeholder="KEY_NAME"
              value={newKey}
              onChange={e => setNewKey(e.target.value)}
            />
            <input
              className="flex-1 border p-2 rounded"
              placeholder="Value"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
            />
            <button
              type="button"
              onClick={addCustomKey}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition cursor-pointer"
            >
              + Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!dirty}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
