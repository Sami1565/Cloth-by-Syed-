'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/login'
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-gold-400">LUXE</h1>
              <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Studio</p>
            </Link>
            <h2 className="text-2xl font-light tracking-widest mt-6">CREATE ACCOUNT</h2>
            <p className="text-white/40 text-sm mt-2">Join the LUXE community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none transition"
                  placeholder="john@example.com"
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
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none transition"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-gold-400 focus:ring-gold-400/50"
                required
              />
              <span className="text-white/40 text-sm">
                I agree to the{' '}
                <Link href="/terms" className="text-gold-400 hover:text-gold-300 transition">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-gold-400 hover:text-gold-300 transition">
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gold-400 text-black font-medium hover:bg-gold-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/30">or continue with</span>
              </div>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              className="w-full py-3.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 transition flex items-center justify-center gap-3"
            >
              <FaGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-white/40 text-sm mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-gold-400 hover:text-gold-300 transition">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </main>
  )
}
