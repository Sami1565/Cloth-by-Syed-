'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero({ onOpen3D }: { onOpen3D: () => void }) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      </div>

      {/* Subtle Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-50 text-center max-w-4xl px-4">
        {/* Logo */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }} 
          className="text-6xl sm:text-8xl font-extralight tracking-[0.2em] text-white"
        >
          <span className="text-[#d4af37]">LUXE</span> STUDIO
        </motion.h1>
        
        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }} 
          className="text-white/60 text-lg sm:text-xl mt-6 tracking-widest font-light max-w-xl mx-auto"
        >
          Where fashion meets dimension. Immersive 3D couture.
        </motion.p>
        
        {/* ===== BLACK & WHITE BUTTONS ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.9 }} 
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          {/* Primary Button - White Background, Black Text */}
          <Link 
            href="/shop" 
            className="group relative px-10 py-4 rounded-2xl bg-white text-black font-bold text-base tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/20 hover:shadow-white/40 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12h18M3 12l4-4m-4 4l4 4" />
              </svg>
              Explore Collection
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          {/* Secondary Button - Transparent with White Border */}
          <button 
            onClick={onOpen3D}
            className="group relative px-10 py-4 rounded-2xl border-2 border-white text-white font-bold text-base tracking-wide hover:scale-105 transition-all duration-300 hover:bg-white hover:text-black overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              View in 3D
            </span>
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-white/30 text-xs tracking-widest"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            Premium Quality
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            3D Experience
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            Luxury Brand
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.3em] animate-bounce z-40"
      >
        SCROLL
      </motion.div>
    </section>
  )
}
