'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero({ onOpen3D }: { onOpen3D: () => void }) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background - Black & White Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-50 text-center max-w-4xl px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }} 
          className="text-6xl sm:text-8xl font-extralight tracking-[0.2em]"
        >
          <span className="text-[#d4af37]">LUXE</span>{' '}
          <span className="text-white">STUDIO</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }} 
          className="text-white/60 text-lg sm:text-xl mt-6 tracking-widest font-light max-w-xl mx-auto"
        >
          Where fashion meets dimension. Immersive 3D couture.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.9 }} 
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link 
            href="/shop" 
            className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition shadow-xl hover:shadow-2xl transform hover:scale-105 text-base"
          >
            Explore Collection →
          </Link>
          
          <button 
            onClick={onOpen3D}
            className="px-10 py-4 rounded-full border-2 border-white/50 text-white font-medium hover:bg-white hover:text-black transition transform hover:scale-105 text-base"
          >
            View in 3D
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.3em] animate-bounce z-40">
        SCROLL
      </div>
    </section>
  )
}
