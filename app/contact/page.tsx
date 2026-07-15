'use client'

import Link from 'next/link'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Contact() {
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
            <Link href="/about" className="hover:text-gold-300 transition">About</Link>
            <Link href="/contact" className="text-gold-400 transition">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 rounded-full bg-gold-400 text-black text-sm font-medium hover:bg-gold-300 transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Contact Content */}
      <section className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-light tracking-widest mb-4">GET IN <span className="text-gold-400">TOUCH</span></h1>
        <p className="text-white/50 mb-12">We'd love to hear from you. Reach out with any questions or feedback.</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button className="w-full py-4 rounded-xl bg-gold-400 text-black font-medium hover:bg-gold-300 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <FaEnvelope className="text-gold-400 text-2xl mt-1" />
              <div>
                <h3 className="text-white font-medium">Email</h3>
                <p className="text-white/50">hello@luxestudio.com</p>
                <p className="text-white/50">support@luxestudio.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <FaPhone className="text-gold-400 text-2xl mt-1" />
              <div>
                <h3 className="text-white font-medium">Phone</h3>
                <p className="text-white/50">+1 (555) 123-4567</p>
                <p className="text-white/50">Mon-Fri 9am-6pm EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <FaMapMarkerAlt className="text-gold-400 text-2xl mt-1" />
              <div>
                <h3 className="text-white font-medium">Studio Location</h3>
                <p className="text-white/50">123 Fashion Avenue</p>
                <p className="text-white/50">New York, NY 10001</p>
              </div>
            </div>
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
