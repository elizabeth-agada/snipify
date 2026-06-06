'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { useUser } from '@clerk/nextjs'
import { api } from '../../convex/_generated/api'
import { X, Link2, Scissors } from 'lucide-react'

interface Props {
  onClose: () => void
}

export default function CreateLinkModal({ onClose }: Props) {
  const { user } = useUser()
  const createLink = useMutation(api.links.createLink)

  const [url, setUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || !user) return

    setLoading(true)
    setError('')

    try {
      await createLink({
        userId: user.id,
        originalUrl: url,
        customSlug: customSlug || undefined,
      })
      onClose()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-6 w-full max-w-md">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Scissors size={18} className="text-blue-400" />
            <h2 className="font-bold text-lg">Create new link</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Destination URL
            </label>
            <div className="relative">
              <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/long-url"
                required
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Custom slug <span className="text-gray-600 normal-case font-normal">(optional)</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm shrink-0">snipify.app/</span>
              <input
                type="text"
                value={customSlug}
                onChange={e => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="my-link"
                className="flex-1 bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-white/15 hover:border-white/30 text-gray-300 font-semibold py-3 rounded-lg transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !url}
              className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition text-sm"
            >
              {loading ? 'Creating...' : 'Create link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}