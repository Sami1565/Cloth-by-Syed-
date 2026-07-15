'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Hardcoded credentials check
    if (username === 'admin' && password === 'admin123') {
      // Store auth in localStorage
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminUser', username)
      
      // Redirect to admin panel
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } else {
      setError('Invalid username or password. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-gold-400">LUXE</h1>
              <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Admin Access</p>
            </Link>
            <div className="flex items-center justify-center gap-2 mt-6">
              <FaShieldAlt className="text-gold-400 text-xl" />
              <h2 className="text-2xl font-light tracking-widest">ADMIN LOGIN</h2>
            </div>
            <p className="text-white/40 text-sm mt-2">Restricted access - Authorized personnel only</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none transition"
                  placeholder="Enter admin username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none transition"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gold-400 text-black font-medium hover:bg-gold-300 transition disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                'Access Admin Panel'
              )}
            </button>

            {/* Security Note */}
            <div className="text-center">
              <p className="text-white/20 text-xs tracking-widest">
                🔒 Secure Admin Access • Authorized Only
              </p>
            </div>
          </form>

          {/* Back to Site */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-white/30 hover:text-gold-400 text-sm transition">
              ← Return to LUXE Studio
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
