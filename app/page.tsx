'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaShoppingBag, 
  FaHeart, 
  FaSearch, 
  FaStar, 
  FaArrowRight, 
  FaUser,
  FaTimes,
  FaBars 
} from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import ThreeViewer from '@/components/ThreeViewer'

// ... (keep all your existing products data and components here)

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false)

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header - Keep your existing header code */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        {/* ... keep your existing header code ... */}
      </header>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2 }} 
            className="text-6xl sm:text-8xl font-extralight tracking-[0.2em] text-white/90"
          >
            <span className="text-gold-400">LUXE</span> STUDIO
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }} 
            className="text-white/50 text-lg sm:text-xl mt-6 tracking-widest font-light max-w-xl mx-auto"
          >
            Where fashion meets dimension. Immersive 3D couture.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.9 }} 
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link href="/shop" className="px-10 py-4 rounded-full bg-gold-400 text-black font-medium hover:bg-gold-300 transition shadow-xl shadow-gold-400/20">
              Explore Collection
            </Link>
            <button 
              onClick={() => setIs3DViewerOpen(true)}
              className="px-10 py-4 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition"
            >
              View in 3D
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.3em] animate-bounce hidden sm:block">
          SCROLL
        </div>
      </section>

      {/* 3D Viewer Modal */}
      {is3DViewerOpen && (
        <ThreeViewer onClose={() => setIs3DViewerOpen(false)} />
      )}

      {/* ... keep the rest of your existing page content ... */}
    </main>
  )
}
