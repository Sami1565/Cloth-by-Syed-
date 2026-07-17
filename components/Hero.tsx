'use client'

import { motion } from 'framer-motion'

export default function Hero({ onOpen3D }: { onOpen3D: () => void }) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] text-white"
          >
            <span className="text-[#d4af37]">LUXE</span>{' '}
            <span className="text-white">STUDIO</span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }} 
            className="text-white/50 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 tracking-widest font-light max-w-2xl mx-auto px-4"
          >
            Where fashion meets dimension. Immersive 3D couture.
          </motion.p>
          
          {/* ===== SINGLE BUTTON - View in 3D ===== */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7 }} 
            className="mt-8 sm:mt-10 flex justify-center"
          >
            <button 
              onClick={onOpen3D}
              className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border-2 border-white/60 text-white font-semibold text-sm sm:text-base tracking-wide hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>View in 3D</span>
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-white/30 text-[10px] sm:text-xs tracking-[0.2em] uppercase"
          >
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              Premium Quality
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              3D Experience
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              Luxury Brand
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/15 text-[10px] sm:text-xs tracking-[0.3em] animate-bounce"
      >
        SCROLL
      </motion.div>
    </section>
  )
}
