'use client'

import { useEffect, useState } from 'react'
import { CONFIG_KEYS }      from '@/lib/config-keys'
import { nanoid }           from 'nanoid'

type Entry = {
  id:     string
  key:    string
  value:  string
  secret: boolean
}

export default function SettingsPage() {
  const [entries, setEntries]       = useState<Entry[]>([])
  const [dirty, setDirty]           = useState(false)
  const [editingId, setEditingId]   = useState<string | null>(null)
  const [editKey, setEditKey]       = useState('')
  const [editValue, setEditValue]   = useState('')

  // Local state for new custom key
  const [newKey, setNewKey]         = useState('')
  const [newValue, setNewValue]     = useState('')

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
            id:     c.key,
            key:    c.key,
            value:  found?.value ?? '',
            secret: c.secret,
          })
        }

        // dynamic/custom keys
        for (const d of data) {
          if (CONFIG_KEYS.some(c => c.key === d.key)) continue
          loaded.push({
            id:     d.key,
            key:    d.key,
            value:  d.value,
            secret: false,
          })
        }

        setEntries(loaded)
      })
  }, [])

  // Begin edit mode for one entry
  function startEdit(id: string) {
    const e = entries.find(e => e.id === id)
    if (!e) return
    setEditingId(id)
    setEditKey(e.key)
    setEditValue(e.value)
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null)
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
                <button type="button" onClick={() => startEdit(entry.id)} className="text-blue-600 cursor-pointer">Edit</button>
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
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
