import Link from 'next/link'
import { Scissors, BarChart2, QrCode, ArrowRight, Link2, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">

      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Scissors size={22} className="text-blue-400" />
          <span className="text-xl font-black tracking-tight">snipify</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="hidden sm:block text-sm text-gray-400 hover:text-white transition">
            Log in
          </Link>
          <Link href="/sign-up"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            Get started <ArrowRight size={14} />
          </Link>
        </div>
      </nav>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-full mb-6">
            <Zap size={12} />
            Free to use. No credit card required.
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
            Short links that<br />
            <span className="text-blue-400">actually work.</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
            Paste any URL and get a short link in seconds. Track who clicks it,
            where they are, and what device they use, all in one dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/sign-up"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-lg transition text-base">
              Create free account <ArrowRight size={16} />
            </Link>
            <Link href="/sign-in"
              className="flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-gray-300 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition text-base">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* URL preview mockup */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="space-y-3">
            <div className="bg-[#0f172a] border border-white/10 rounded-lg p-3 text-sm">
              <span className="text-gray-500 text-xs block mb-1">Long URL</span>
              <span className="text-gray-300 break-all">https://www.example.com/very/long/url/that/nobody/wants/to/share</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm px-2">
              <Scissors size={14} className="text-blue-400" />
              <span>Paste and shorten</span>
            </div>
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-3 text-sm">
              <span className="text-gray-500 text-xs block mb-1">Short URL</span>
              <span className="text-blue-400 font-semibold">snipify.app/xK9mP2</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-black mb-2">Everything you need</h2>
        <p className="text-gray-400 mb-10">No fluff. Just the tools that matter.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6">
            <div className="w-10 h-10 bg-blue-600/15 rounded-lg flex items-center justify-center mb-4">
              <Link2 size={20} className="text-blue-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Custom slugs</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Set your own short slug like <span className="text-blue-400">/my-brand</span> with real-time availability check.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6">
            <div className="w-10 h-10 bg-green-600/15 rounded-lg flex items-center justify-center mb-4">
              <BarChart2 size={20} className="text-green-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Click analytics</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              See clicks over time, top referrers, device types and geographic data in real-time.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6">
            <div className="w-10 h-10 bg-violet-600/15 rounded-lg flex items-center justify-center mb-4">
              <QrCode size={20} className="text-violet-400" />
            </div>
            <h3 className="font-bold text-white mb-2">QR code generator</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every link gets a downloadable QR code. Customize colors and download as PNG or SVG.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6">
            <div className="w-10 h-10 bg-orange-600/15 rounded-lg flex items-center justify-center mb-4">
              <Shield size={20} className="text-orange-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Link expiry</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Set an expiry date on any link. Expired links return a clean 410 page.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6">
            <div className="w-10 h-10 bg-pink-600/15 rounded-lg flex items-center justify-center mb-4">
              <Zap size={20} className="text-pink-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Instant redirect</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Links redirect in milliseconds using edge functions. No delays, no waiting.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6">
            <div className="w-10 h-10 bg-cyan-600/15 rounded-lg flex items-center justify-center mb-4">
              <BarChart2 size={20} className="text-cyan-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Link dashboard</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Manage all your links in one place. Copy, delete, search and filter with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Scissors size={22} className="text-blue-400" />
              <span className="text-xl font-black tracking-tight">snipify</span>
            </Link>
          </div>
          
        </div>
      </footer>

    </div>
  )
}