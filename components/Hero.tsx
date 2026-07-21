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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Logo */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.15em]"
          >
            <span className="text-[#d4af37]">LUXE</span>{' '}
            <span className="text-white">STUDIO</span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }} 
            className="text-white/60 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 tracking-widest font-light max-w-2xl mx-auto px-4"
          >
            Where fashion meets dimension. Immersive 3D couture.
          </motion.p>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-8 text-white/30 text-[10px] sm:text-xs tracking-[0.2em] uppercase"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
              Premium Quality
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
              3D Experience
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
              Luxury Brand
            </span>
          </motion.div>
        </div>
      </div>

      {/* SCROLL */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-white/20 text-[10px] sm:text-xs tracking-[0.3em] animate-bounce">
          SCROLL
        </span>
        <div className="w-px h-8 bg-white/10" />
      </motion.div>
    </section>
  )
}
