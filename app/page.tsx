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
  { 
    id: 5, 
    name: 'Silk Blouse', 
    price: 119, 
    category: 'Women', 
    color: 'Cream', 
    sizes: ['XS','S','M','L'],
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop', 
    rating: 4.9, 
    reviews: 47 
  },
  { 
    id: 6, 
    name: 'Leather Belt', 
    price: 89, 
    category: 'Accessories', 
    color: 'Brown', 
    sizes: ['S','M','L'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', 
    rating: 4.5, 
    reviews: 33 
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

// Quick View Modal
function QuickViewModal({ product, onClose }: any) {
  if (!product) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9 }} 
        animate={{ scale: 1 }} 
        className="bg-zinc-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 border border-gold-400/20 shadow-2xl"
      >
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-white">{product.name}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white text-2xl">
            <FaTimes />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="rounded-2xl w-full h-80 object-cover" 
          />
          <div>
            <p className="text-gold-400 text-3xl font-bold">${product.price}</p>
            <p className="text-white/60 mt-2">Category: {product.category}</p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {product.sizes.map((size: string) => (
                <span key={size} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm border border-white/10">
                  {size}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-white/60 text-sm">Color: {product.color}</p>
            </div>
            <button className="mt-6 w-full py-3 rounded-full bg-gold-400 text-black font-semibold hover:bg-gold-300 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Home Component
export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);

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
          
          {/* Right Icons with Account Dropdown */}
          <div className="flex items-center gap-4">
            <FaSearch className="text-white/40 hover:text-gold-300 transition cursor-pointer" />
            <FaHeart className="text-white/40 hover:text-red-400 transition cursor-pointer hidden sm:block" />
            <div className="relative">
              <FiShoppingCart className="text-white/40 hover:text-gold-300 transition cursor-pointer text-xl" />
              <span className="absolute -top-1 -right-2 bg-gold-400 text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                3
              </span>
            </div>
            
            {/* Account Dropdown */}
            <div className="relative group">
              <button className="px-4 py-1.5 rounded-full bg-gold-400 text-black text-sm font-medium hover:bg-gold-300 transition flex items-center gap-2">
                <FaUser className="text-sm" />
                <span className="hidden sm:inline">Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-xl border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/login" className="block px-4 py-2 text-white/80 hover:bg-white/5 hover:text-gold-400 transition rounded-t-xl">
                  Sign In
                </Link>
                <Link href="/signup" className="block px-4 py-2 text-white/80 hover:bg-white/5 hover:text-gold-400 transition">
                  Create Account
                </Link>
                <Link href="/admin-login" className="block px-4 py-2 text-white/80 hover:bg-white/5 hover:text-gold-400 transition rounded-b-xl border-t border-white/10">
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
              <div className="border-t border-white/10 pt-4">
                <Link href="/login" className="block py-2 text-white/80 hover:text-gold-400 transition">Sign In</Link>
                <Link href="/signup" className="block py-2 text-white/80 hover:text-gold-400 transition">Create Account</Link>
                <Link href="/admin-login" className="block py-2 text-gold-400/70 hover:text-gold-400 transition">Admin Panel</Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section - FIXED */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        </div>
        <div className="relative z-20 text-center max-w-4xl px-4">
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
            className="mt-10 flex flex-wrap justify-center gap-4 relative z-30"
          >
            <Link 
              href="/shop" 
              className="px-10 py-4 rounded-full bg-gold-400 text-black font-medium hover:bg-gold-300 transition shadow-xl shadow-gold-400/20 hover:shadow-gold-400/40 hover:scale-105 transform transition-all duration-300"
            >
              Explore Collection
            </Link>
            <button 
              onClick={() => setIs3DViewerOpen(true)}
              className="px-10 py-4 rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition hover:border-gold-400/50 hover:text-gold-300 transform hover:scale-105 transition-all duration-300"
            >
              View in 3D
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.3em] animate-bounce hidden sm:block z-10">
          SCROLL
        </div>
      </section>

      {/* 3D Viewer Modal */}
      {is3DViewerOpen && (
        <ThreeViewer onClose={() => setIs3DViewerOpen(false)} />
      )}

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

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-light tracking-widest text-center mb-12">
          SHOP BY <span className="text-gold-400">CATEGORY</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Men', 'Women', 'Accessories', 'Sale'].map((category) => (
            <motion.div 
              key={category}
              whileHover={{ scale: 1.05 }}
              className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-black/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-light tracking-widest text-white/90 group-hover:text-gold-400 transition">
                  {category}
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/40 rounded-2xl transition" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-light tracking-widest text-center mb-12">
          VOICES OF <span className="text-gold-400">LUXE</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Elena V.', text: 'The quality is unmatched. Feels like wearing art.', role: 'Fashion Editor' },
            { name: 'Marcus R.', text: '3D viewer made me buy instantly. Incredible experience.', role: 'Tech Lead' },
            { name: 'Sophia L.', text: 'Sustainable luxury. My new favorite brand.', role: 'Designer' },
          ].map((t, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02 }} 
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-gold-400/20 transition"
            >
              <p className="text-white/70 italic text-sm">"{t.text}"</p>
              <p className="text-gold-400 font-medium mt-4">{t.name}</p>
              <p className="text-white/30 text-xs">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-light tracking-widest text-center mb-12">
          FOLLOW US <span className="text-gold-400">@LUXE</span>
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[1,2,3,4,5,6].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden cursor-pointer"
            >
              <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 text-xs">
                📸
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-light tracking-widest">JOIN THE <span className="text-gold-400">MOVEMENT</span></h3>
          <p className="text-white/40 text-sm mt-2">Subscribe for exclusive drops and 3D experiences</p>
          <div className="flex mt-6 bg-white/5 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 bg-transparent px-6 py-4 text-white/80 outline-none text-sm" 
            />
            <button className="px-8 bg-gold-400 text-black font-medium hover:bg-gold-300 transition">
              Subscribe
            </button>
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
            <Link href="/admin-login" className="hover:text-gold-400 cursor-pointer block text-gold-400/50">Admin Panel</Link>
          </div>
          <div>
            <p className="text-white/80 font-medium">Follow</p>
            <p className="hover:text-white/80 cursor-pointer">Instagram</p>
            <p className="hover:text-white/80 cursor-pointer">Twitter</p>
            <p className="hover:text-white/80 cursor-pointer">YouTube</p>
          </div>
        </div>
      </footer>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </main>
  )
}
