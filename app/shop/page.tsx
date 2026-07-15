'use client'

import Link from 'next/link'
import { FaSearch, FaFilter, FaArrowLeft } from 'react-icons/fa'

export default function Shop() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gold-400">LUXE</h1>
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase hidden sm:inline">Studio</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-light">
            <Link href="/" className="hover:text-gold-300 transition">Home</Link>
            <Link href="/shop" className="text-gold-400 transition">Shop</Link>
            <Link href="/collections" className="hover:text-gold-300 transition">Collections</Link>
            <Link href="/about" className="hover:text-gold-300 transition">About</Link>
            <Link href="/contact" className="hover:text-gold-300 transition">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <FaSearch className="text-white/40 hover:text-gold-300 transition cursor-pointer" />
            <button className="px-4 py-1.5 rounded-full bg-gold-400 text-black text-sm font-medium hover:bg-gold-300 transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Shop Content */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-light tracking-widest mb-4">SHOP <span className="text-gold-400">COLLECTION</span></h1>
        <p className="text-white/50 mb-8">Discover our latest arrivals and timeless classics</p>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition">
            All
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm hover:bg-white/20 transition">
            Men
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm hover:bg-white/20 transition">
            Women
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm hover:bg-white/20 transition">
            Accessories
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm hover:bg-white/20 transition">
            Sale
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1,2,3,4,5,6,7,8].map((i) => (
            <div key={i} className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-gold-400/40 transition-all duration-500">
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                <div className="w-full h-full flex items-center justify-center text-white/10 text-2xl">
                  Product {i}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider">Category</p>
                    <h3 className="text-white font-semibold text-lg mt-1">Product Name</h3>
                  </div>
                  <span className="text-gold-400 font-bold text-xl">$199</span>
                </div>
                <button className="mt-4 w-full py-2.5 rounded-full bg-gold-400/20 text-gold-300 font-medium hover:bg-gold-400/30 transition border border-gold-400/30 text-sm">
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/50 text-sm">
          <div>
            <span className="text-white/90 font-bold text-lg block mb-2">LUXE</span> 
            © 2026 — 3D fashion house.
          </div>
          <div>
            <p className="text-white/80 font-medium">Shop</p>
            <Link href="/shop" className="hover:text-white/80 cursor-pointer block">All Products</Link>
            <Link href="/collections/men" className="hover:text-white/80 cursor-pointer block">Men</Link>
            <Link href="/collections/women" className="hover:text-white/80 cursor-pointer block">Women</Link>
          </div>
          <div>
            <p className="text-white/80 font-medium">Info</p>
            <Link href="/about" className="hover:text-white/80 cursor-pointer block">About</Link>
            <Link href="/contact" className="hover:text-white/80 cursor-pointer block">Contact</Link>
          </div>
          <div>
            <p className="text-white/80 font-medium">Follow</p>
            <p className="hover:text-white/80 cursor-pointer">Instagram</p>
            <p className="hover:text-white/80 cursor-pointer">Twitter</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
