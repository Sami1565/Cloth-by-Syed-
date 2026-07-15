'use client'

import Link from 'next/link'

export default function About() {
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
            <Link href="/shop" className="hover:text-gold-300 transition">Shop</Link>
            <Link href="/collections" className="hover:text-gold-300 transition">Collections</Link>
            <Link href="/about" className="text-gold-400 transition">About</Link>
            <Link href="/contact" className="hover:text-gold-300 transition">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 rounded-full bg-gold-400 text-black text-sm font-medium hover:bg-gold-300 transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* About Content */}
      <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-light tracking-widest mb-4">ABOUT <span className="text-gold-400">LUXE</span></h1>
        
        <div className="space-y-8 text-white/70">
          <div>
            <h2 className="text-2xl font-light text-white mb-4">Our Story</h2>
            <p className="leading-relaxed">
              LUXE Studio was born from a vision to revolutionize the fashion industry through technology. 
              We believe that clothing is not just about style—it's about experience, innovation, and self-expression.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-white mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              To create immersive shopping experiences that bridge the gap between physical and digital fashion. 
              We leverage cutting-edge 3D technology to bring our collections to life.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-white mb-4">Sustainability</h2>
            <p className="leading-relaxed">
              We're committed to sustainable fashion. Every piece in our collection is designed with 
              eco-conscious materials and ethical manufacturing practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-white mb-4">Innovation</h2>
            <p className="leading-relaxed">
              Our interactive 3D viewer allows you to experience products like never before. 
              Rotate, zoom, and explore every detail of our collections from any device.
            </p>
          </div>
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
