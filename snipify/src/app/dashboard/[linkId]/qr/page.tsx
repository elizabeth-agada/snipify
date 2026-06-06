'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Id } from '../../../../../convex/_generated/dataModel'
import { useParams } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'

export default function QRPage() {
  const params = useParams()
  const linkId = params.linkId as Id<'links'>

  const link = useQuery(api.links.getLinkById, { linkId })

  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')

  const shortUrl = link ? `${window.location.origin}/${link.slug}` : ''

  const downloadQR = () => {
    const svg = document.getElementById('qr-code')
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `snipify-${link?.slug}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!link) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
      Loading...
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-black mb-2">QR Code</h1>
        <p className="text-gray-400 text-sm mb-8">
          For <span className="text-blue-400">/{link.slug}</span>
        </p>

        <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6">
          <div className="bg-white p-4 rounded-xl">
            <QRCodeSVG
              id="qr-code"
              value={shortUrl}
              size={200}
              fgColor={fgColor}
              bgColor={bgColor}
              level="H"
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                Foreground
              </label>
              <div className="flex items-center gap-3 bg-[#0f172a] border border-white/10 rounded-lg p-3">
                <input
                  type="color"
                  value={fgColor}
                  onChange={e => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-sm font-mono text-gray-300">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                Background
              </label>
              <div className="flex items-center gap-3 bg-[#0f172a] border border-white/10 rounded-lg p-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-sm font-mono text-gray-300">{bgColor}</span>
              </div>
            </div>
          </div>

          <button
            onClick={downloadQR}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition w-full justify-center"
          >
            <Download size={16} />
            Download SVG
          </button>
        </div>
      </main>
    </div>
  )
}