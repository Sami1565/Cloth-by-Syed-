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

// Dummy products data
const products = [
  { 
    id: 1, 
    name: 'Velocity Jacket', 
    price: 249, 
    category: 'Men', 
    color: 'Black', 
    sizes: ['S','M','L','XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', 
    rating: 4.8, 
    reviews: 42 
  },
  { 
    id: 2, 
    name: 'Aura Dress', 
    price: 189, 
    category: 'Women', 
    color: 'Gold', 
    sizes: ['XS','S','M','L'],
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop', 
    rating: 4.9, 
    reviews: 38 
  },
  { 
    id: 3, 
    name: 'Nova Sneakers', 
    price: 159, 
    category: 'Accessories', 
    color: 'White', 
    sizes: ['6','7','8','9','10'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', 
    rating: 4.7, 
    reviews: 56 
  },
  { 
    id: 4, 
    name: 'Cargo Pants', 
    price: 134, 
    category: 'Men', 
    color: 'Olive', 
    sizes: ['S','M','L','XL'],
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop', 
    rating: 4.6, 
    reviews: 29 
  },
];

// Product Card Component
function ProductCard({ product, onQuickView }: any) {
  const [isWishlist, setIsWishlist] = useState(false);
  
  return (
    <motion.div 
      whileHover={{ y: -8 }} 
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-gold-400/40 transition-all duration-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <button 
          onClick={() => setIsWishlist(!isWishlist)} 
          className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur text-white/70 hover:text-red-400 transition"
        >
          {isWishlist ? <IoHeart className="text-red-400" /> : <IoHeartOutline />}
        </button>
        <button 
          onClick={() => onQuickView(product)} 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-black/70 backdrop-blur text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity border border-white/10"
        >
          Quick View
        </button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider">{product.category}</p>
            <h3 className="text-white font-semibold text-lg mt-1">{product.name}</h3>
          </div>
          <span className="text-gold-400 font-bold text-xl">${product.price}</span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
          <FaStar /> <span className="text-white/80 text-xs">{product.rating}</span>
          <span className="text-white/30 text-xs ml-2">({product.reviews})</span>
        </div>
        <button className="mt-4 w-full py-2.5 rounded-full bg-gold-400/20 text-gold-300 font-medium hover:bg-gold-400/30 transition border border-gold-400/30 text-sm">
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
}

// Main Home Component
export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gold-400">LUXE</h1>
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase hidden sm:inline">Studio</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-light">
            <Link href="/" className="hover:text-gold-300 transition">Home</Link>
            <Link href="/shop" className="hover:text-gold-300 transition">Shop</Link>
            <Link href="/collections" className="hover:text-gold-300 transition">Collections</Link>
            <Link href="/about" className="hover:text-gold-300 transition">About</Link>
            <Link href="/contact" className="hover:text-gold-300 transition">Contact</Link>
          </nav>
          
          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <FaSearch className="text-white/40 hover:text-gold-300 transition cursor-pointer" />
            <FaHeart className="text-white/40 hover:text-red-400 transition cursor-pointer hidden sm:block" />
            <div className="relative">
              <FiShoppingCart className="text-white/40 hover:text-gold-300 transition cursor-pointer text-xl" />
              <span className="absolute -top-1 -right-2 bg-gold-400 text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                3
              </span>
            </div>
            <button className="px-4 py-1.5 rounded-full bg-gold-400 text-black text-sm font-medium hover:bg-gold-300 transition hidden sm:block">
              Sign In
            </button>
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
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 py-4 px-4"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" className="hover:text-gold-300 transition">Home</Link>
              <Link href="/shop" className="hover:text-gold-300 transition">Shop</Link>
              <Link href="/collections" className="hover:text-gold-300 transition">Collections</Link>
              <Link href="/about" className="hover:text-gold-300 transition">About</Link>
              <Link href="/contact" className="hover:text-gold-300 transition">Contact</Link>
              <button className="px-4 py-2 rounded-full bg-gold-400 text-black text-sm font-medium hover:bg-gold-300 transition w-full">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
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
            <a href="#" className="px-10 py-4 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
              View in 3D
            </a>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.3em] animate-bounce hidden sm:block">
          SCROLL
        </div>
      </section>

      {/* 3D Viewer Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light tracking-widest text-center text-white/90 mb-12">
          INTERACTIVE <span className="text-gold-400">3D</span> STUDIO
        </h2>
        <div className="w-full h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-bold tracking-widest">
            3D
          </div>
          <div className="relative w-64 h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-gold-600/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-40 h-56 bg-gradient-to-br from-gold-400/80 to-gold-600/30 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-700" 
                   style={{ boxShadow: '0 25px 60px rgba(212,175,55,0.3)' }}>
                <div className="w-full h-full flex items-center justify-center text-black/30 text-sm font-bold tracking-widest">
                  LUXE
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 flex gap-3">
            <button className="glass px-4 py-2 rounded-full text-white/80 text-xs hover:text-gold-300 transition bg-white/5 backdrop-blur-sm border border-white/10">
              ⚡ Auto
            </button>
            <button className="glass px-4 py-2 rounded-full text-white/80 text-xs hover:text-gold-300 transition bg-white/5 backdrop-blur-sm border border-white/10">
              🔄 Rotate
            </button>
            <button className="glass px-4 py-2 rounded-full text-white/80 text-xs hover:text-gold-300 transition bg-white/5 backdrop-blur-sm border border-white/10">
              🔍 Zoom
            </button>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gold-400 border border-white/20 cursor-pointer hover:scale-110 transition"></div>
            <div className="w-6 h-6 rounded-full bg-black border border-white/20 cursor-pointer hover:scale-110 transition"></div>
            <div className="w-6 h-6 rounded-full bg-white border border-white/20 cursor-pointer hover:scale-110 transition"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl font-light tracking-widest">NEW <span className="text-gold-400">ARRIVALS</span></h2>
          <Link href="/shop" className="text-white/40 hover:text-gold-300 text-sm flex items-center gap-1 transition">
            View All <FaArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={setQuickViewProduct} 
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      // In the footer section, add this link:
<div>
  <p className="text-white/80 font-medium">Info</p>
  <Link href="/about" className="hover:text-white/80 cursor-pointer block">About</Link>
  <Link href="/contact" className="hover:text-white/80 cursor-pointer block">Contact</Link>
  <Link href="/admin" className="hover:text-gold-400 cursor-pointer block text-gold-400/50">Admin Panel</Link>
</div>
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
