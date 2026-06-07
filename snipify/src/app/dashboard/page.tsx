'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Scissors, Plus, BarChart2, Link2, Trash2, Copy, QrCode } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import CreateLinkModal from '@/components/CreateLinkModal'

export default function DashboardPage() {
  const { user } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const links = useQuery(api.links.getUserLinks, {
    userId: user?.id ?? '',
  })

  const deleteLink = useMutation(api.links.deleteLink)

  const copyToClipboard = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${slug}`)
    setCopied(slug)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDelete = async (linkId: string) => {
    if (!confirm('Delete this link?')) return
    await deleteLink({ linkId: linkId as never })
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <nav className="border-b border-white/10 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
          <Scissors size={22} className="text-blue-400" />
          <span className="text-xl font-black tracking-tight">snipify</span>
        </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.firstName}</span>
            <UserButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-black">My Links</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {links?.length ?? 0} links created
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded-lg transition text-sm"
          >
            <Plus size={15} />
            New link
          </button>
        </div>

        {links === undefined ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : links.length === 0 ? (
          <div className="text-center py-20">
            <Link2 size={40} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No links yet</p>
            <p className="text-gray-600 text-sm mt-1">
              Click New link to create your first short URL
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((link) => (
              <div key={link._id} className="bg-[#1e293b] border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-blue-400 font-mono text-sm font-semibold">
                        /{link.slug}
                      </span>
                      <div className="flex items-center gap-1">
                        <BarChart2 size={12} className="text-green-400" />
                        <span className="text-green-400 text-xs font-bold">{link.clicks} clicks</span>
                      </div>
                      <span className="text-gray-600 text-xs">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs truncate">
                      {link.originalUrl}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copyToClipboard(link.slug)}
                      className="p-2 hover:bg-white/10 rounded-lg transition"
                      title="Copy link"
                    >
                      <Copy size={14} className={copied === link.slug ? 'text-green-400' : 'text-gray-400'} />
                    </button>
                    <Link href={`/dashboard/${link._id}`} className="p-2 hover:bg-white/10 rounded-lg transition" title="Analytics">
                      <BarChart2 size={14} className="text-gray-400" />
                    </Link>
                    <Link href={`/dashboard/${link._id}/qr`} className="p-2 hover:bg-white/10 rounded-lg transition" title="QR Code">
                      <QrCode size={14} className="text-gray-400" />
                    </Link>
                    <button
                      onClick={() => handleDelete(link._id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && <CreateLinkModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
