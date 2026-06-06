'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { useParams } from 'next/navigation'
import { ArrowLeft, BarChart2, MousePointer, Globe, Monitor } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function AnalyticsPage() {
  const params = useParams()
  const linkId = params.linkId as Id<'links'>

  const link = useQuery(api.links.getLinkById, { linkId })
  const clicks = useQuery(api.analytics.getLinkAnalytics, { linkId })

  if (!link || !clicks) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
      Loading...
    </div>
  )

  // Group clicks by day
  const clicksByDay = clicks.reduce((acc: Record<string, number>, click) => {
    const day = new Date(click.timestamp).toLocaleDateString()
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(clicksByDay).map(([date, count]) => ({
    date,
    clicks: count,
  }))

  // Group by device
  const deviceData = clicks.reduce((acc: Record<string, number>, click) => {
    const device = click.device || 'Unknown'
    acc[device] = (acc[device] || 0) + 1
    return acc
  }, {})

  // Group by referrer
  const referrerData = clicks.reduce((acc: Record<string, number>, click) => {
    const ref = click.referrer || 'Direct'
    acc[ref] = (acc[ref] || 0) + 1
    return acc
  }, {})

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

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">Analytics</h1>
          <p className="text-gray-400 text-sm flex items-center gap-2 flex-wrap">
  <span className="text-blue-400 shrink-0">/{link.slug}</span>
  <span className="text-gray-600">—</span>
  <span className="truncate max-w-xs md:max-w-lg text-gray-400">{link.originalUrl}</span>
</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-blue-600/15 rounded-lg flex items-center justify-center">
                <MousePointer size={18} className="text-blue-400" />
              </div>
              <span className="text-gray-400 text-sm">Total Clicks</span>
            </div>
            <p className="text-3xl font-black">{link.clicks}</p>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-green-600/15 rounded-lg flex items-center justify-center">
                <Globe size={18} className="text-green-400" />
              </div>
              <span className="text-gray-400 text-sm">Top Referrer</span>
            </div>
            <p className="text-lg font-bold truncate">
              {Object.keys(referrerData)[0] || 'None'}
            </p>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-violet-600/15 rounded-lg flex items-center justify-center">
                <Monitor size={18} className="text-violet-400" />
              </div>
              <span className="text-gray-400 text-sm">Top Device</span>
            </div>
            <p className="text-lg font-bold">
              {Object.keys(deviceData)[0] || 'Unknown'}
            </p>
          </div>
        </div>

        {/* Clicks over time chart */}
        <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 size={18} className="text-blue-400" />
            <h2 className="font-bold">Clicks over time</h2>
          </div>

          {chartData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No click data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Referrers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6">
            <h2 className="font-bold mb-4">Referrers</h2>
            {Object.keys(referrerData).length === 0 ? (
              <p className="text-gray-500 text-sm">No data yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(referrerData).map(([ref, count]) => (
                  <div key={ref} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm truncate">{ref}</span>
                    <span className="text-blue-400 font-bold text-sm">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6">
            <h2 className="font-bold mb-4">Devices</h2>
            {Object.keys(deviceData).length === 0 ? (
              <p className="text-gray-500 text-sm">No data yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(deviceData).map(([device, count]) => (
                  <div key={device} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{device}</span>
                    <span className="text-violet-400 font-bold text-sm">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}