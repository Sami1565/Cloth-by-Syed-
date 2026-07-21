'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaHeart, FaUser, FaTimes, FaBars } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import CartIcon from './CartIcon'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#d4af37]">LUXE</h1>
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase hidden sm:inline">Studio</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-light">
            <Link href="/" className="hover:text-[#d4af37] transition">Home</Link>
            <Link href="/shop" className="hover:text-[#d4af37] transition">Shop</Link>
            <Link href="/collections" className="hover:text-[#d4af37] transition">Collections</Link>
            <Link href="/about" className="hover:text-[#d4af37] transition">About</Link>
            <Link href="/contact" className="hover:text-[#d4af37] transition">Contact</Link>
          </nav>
          
          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <FaSearch className="text-white/40 hover:text-[#d4af37] transition cursor-pointer" />
            <FaHeart className="text-white/40 hover:text-red-400 transition cursor-pointer hidden sm:block" />
            
            {/* Persistent Cart Icon */}
            <CartIcon />
            
            {/* Account Dropdown */}
            <div className="relative group">
              <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2">
                <FaUser className="text-sm" />
                <span className="hidden sm:inline">Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-xl border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/login" className="block px-4 py-2 text-white/80 hover:bg-white/5 hover:text-[#d4af37] transition rounded-t-xl">
                  Sign In
                </Link>
                <Link href="/signup" className="block px-4 py-2 text-white/80 hover:bg-white/5 hover:text-[#d4af37] transition">
                  Create Account
                </Link>
                <Link href="/admin-login" className="block px-4 py-2 text-white/80 hover:bg-white/5 hover:text-[#d4af37] transition rounded-b-xl border-t border-white/10">
                  Admin Panel
                </Link>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white/60 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 py-4 px-4">
            <div className="flex flex-col gap-4">
              <Link href="/" className="hover:text-[#d4af37] transition">Home</Link>
              <Link href="/shop" className="hover:text-[#d4af37] transition">Shop</Link>
              <Link href="/collections" className="hover:text-[#d4af37] transition">Collections</Link>
              <Link href="/about" className="hover:text-[#d4af37] transition">About</Link>
              <Link href="/contact" className="hover:text-[#d4af37] transition">Contact</Link>
              <div className="border-t border-white/10 pt-4">
                <Link href="/login" className="block py-2 text-white/80 hover:text-[#d4af37] transition">Sign In</Link>
                <Link href="/signup" className="block py-2 text-white/80 hover:text-[#d4af37] transition">Create Account</Link>
                <Link href="/admin-login" className="block py-2 text-[#d4af37]/70 hover:text-[#d4af37] transition">Admin Panel</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>
    </>
  )
}
