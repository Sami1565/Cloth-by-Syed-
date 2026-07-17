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
import Hero from '@/components/Hero'

// ============================================================
// PRODUCT DATA
// ============================================================
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
]

// ============================================================
// CATEGORIES DATA WITH LINKS
// ============================================================
const categories = [
  { name: 'NEW IN', icon: '✨', color: 'from-blue-500/20 to-purple-500/20', link: '/collections/new-in' },
  { name: 'WOMEN', icon: '👗', color: 'from-pink-500/20 to-rose-500/20', link: '/collections/women' },
  { name: 'MEN', icon: '👔', color: 'from-blue-600/20 to-cyan-500/20', link: '/collections/men' },
  { name: 'GIRLS', icon: '🎀', color: 'from-pink-400/20 to-purple-400/20', link: '/collections/girls' },
  { name: 'SALE', icon: '🏷️', color: 'from-red-500/20 to-orange-500/20', link: '/collections/sale' },
  { name: 'UNSTITCHED', icon: '🧵', color: 'from-emerald-500/20 to-teal-500/20', link: '/collections/unstitched' },
  { name: 'EMBROIDERED', icon: '🌸', color: 'from-amber-500/20 to-yellow-500/20', link: '/collections/embroidered' },
]

// ============================================================
// PRODUCT CARD COMPONENT
// ============================================================
interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    category: string
    color: string
    sizes: string[]
    image: string
    rating: number
    reviews: number
  }
  onQuickView: (product: any) => void
}

function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isWishlist, setIsWishlist] = useState(false)

  return (
    <motion.div 
      whileHover={{ y: -8 }} 
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500"
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
          <span className="text-[#d4af37] font-bold text-xl">${product.price}</span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
          <FaStar /> <span className="text-white/80 text-xs">{product.rating}</span>
          <span className="text-white/30 text-xs ml-2">({product.reviews})</span>
        </div>
        <button className="mt-4 w-full py-2.5 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition border border-white/20 text-sm">
          Add to Bag
        </button>
      </div>
    </motion.div>
  )
}

// ============================================================
// QUICK VIEW MODAL
// ============================================================
interface QuickViewModalProps {
  product: {
    id: number
    name: string
    price: number
    category: string
    color: string
    sizes: string[]
    image: string
    rating: number
    reviews: number
  } | null
  onClose: () => void
}

function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  if (!product) return null

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
        className="bg-zinc-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 border border-[#d4af37]/20 shadow-2xl"
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
            <p className="text-[#d4af37] text-3xl font-bold">${product.price}</p>
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
            <button className="mt-6 w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================
// MAIN HOME COMPONENT
// ============================================================
export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false)

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===== HEADER ===== */}
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
          
          {/* Right Icons with Account Dropdown */}
          <div className="flex items-center gap-4">
            <FaSearch className="text-white/40 hover:text-[#d4af37] transition cursor-pointer" />
            <FaHeart className="text-white/40 hover:text-red-400 transition cursor-pointer hidden sm:block" />
            <div className="relative">
              <FiShoppingCart className="text-white/40 hover:text-[#d4af37] transition cursor-pointer text-xl" />
              <span className="absolute -top-1 -right-2 bg-[#d4af37] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                3
              </span>
            </div>
            
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
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 py-4 px-4"
          >
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
          </motion.div>
        )}
      </header>

      {/* ===== HERO SECTION ===== */}
      <Hero onOpen3D={() => setIs3DViewerOpen(true)} />

      {/* ===== 3D VIEWER MODAL ===== */}
      {is3DViewerOpen && (
        <ThreeViewer onClose={() => setIs3DViewerOpen(false)} />
      )}

      {/* ===== 3D BUTTON + CATEGORIES SECTION ===== */}
      <section className="py-16 px-4 max-w-7xl mx-auto pt-24 sm:pt-28">
        {/* 3D Button - Now Above Categories */}
        <div className="flex justify-center mb-12">
          <button 
            onClick={() => setIs3DViewerOpen(true)}
            className="px-10 sm:px-14 py-4 sm:py-5 bg-[#d4af37] text-black font-bold text-base sm:text-lg tracking-wide hover:bg-[#c5a028] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-[#d4af37]/50 hover:shadow-[#d4af37]/70"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>View in 3D</span>
          </button>
        </div>

        {/* Categories */}
        <h2 className="text-2xl font-light tracking-widest text-center mb-12">
          SHOP BY <span className="text-[#d4af37]">CATEGORY</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={category.link}
              className={`relative rounded-2xl overflow-hidden group bg-gradient-to-br ${category.color} border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              <div className="relative p-6 text-center h-32 flex flex-col items-center justify-center">
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-white/90 font-medium text-sm tracking-wider group-hover:text-[#d4af37] transition">
                  {category.name}
                </span>
                <span className="text-white/40 text-[10px] tracking-widest mt-1 group-hover:text-[#d4af37] transition">
                  SHOP NOW →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-light tracking-widest">NEW <span className="text-[#d4af37]">ARRIVALS</span></h2>
            <p className="text-white/30 text-sm mt-1">Discover our latest collection</p>
          </div>
          <Link href="/shop" className="text-white/40 hover:text-[#d4af37] text-sm flex items-center gap-1 transition">
            View All <FaArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={setQuickViewProduct} 
            />
          ))}
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/10 to-black border border-[#d4af37]/20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80')] bg-cover bg-center opacity-10" />
          <div className="relative p-8 sm:p-12 text-center">
            <h3 className="text-3xl sm:text-4xl font-light tracking-widest">
              SUMMER <span className="text-[#d4af37]">SALE</span>
            </h3>
            <p className="text-white/50 mt-2">Up to 50% off on selected items</p>
            <Link 
              href="/collections/sale" 
              className="inline-block mt-6 px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-light tracking-widest text-center mb-12">
          VOICES OF <span className="text-[#d4af37]">LUXE</span>
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
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-[#d4af37]/20 transition"
            >
              <p className="text-white/70 italic text-sm">"{t.text}"</p>
              <p className="text-[#d4af37] font-medium mt-4">{t.name}</p>
              <p className="text-white/30 text-xs">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-light tracking-widest">JOIN THE <span className="text-[#d4af37]">MOVEMENT</span></h3>
          <p className="text-white/40 text-sm mt-2">Subscribe for exclusive drops and 3D experiences</p>
          <div className="flex mt-6 bg-white/5 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 bg-transparent px-6 py-4 text-white/80 outline-none text-sm" 
            />
            <button className="px-8 bg-white text-black font-medium hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
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
            <Link href="/admin-login" className="hover:text-[#d4af37] cursor-pointer block text-[#d4af37]/50">Admin Panel</Link>
          </div>
          <div>
            <p className="text-white/80 font-medium">Follow</p>
            <p className="hover:text-white/80 cursor-pointer">Instagram</p>
            <p className="hover:text-white/80 cursor-pointer">Twitter</p>
            <p className="hover:text-white/80 cursor-pointer">YouTube</p>
          </div>
        </div>
      </footer>

      {/* ===== QUICK VIEW MODAL ===== */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </main>
  )
}
