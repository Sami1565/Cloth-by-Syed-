'use client'

import Link from 'next/link'
import { FaSearch, FaStar } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'

const products = [
  { id: 1, name: 'Velocity Jacket', price: 249, category: 'Men', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', rating: 4.8, reviews: 42 },
  { id: 2, name: 'Aura Dress', price: 189, category: 'Women', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop', rating: 4.9, reviews: 38 },
  { id: 3, name: 'Nova Sneakers', price: 159, category: 'Accessories', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.7, reviews: 56 },
  { id: 4, name: 'Cargo Pants', price: 134, category: 'Men', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop', rating: 4.6, reviews: 29 },
  { id: 5, name: 'Silk Blouse', price: 119, category: 'Women', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop', rating: 4.9, reviews: 47 },
  { id: 6, name: 'Leather Belt', price: 89, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', rating: 4.5, reviews: 33 },
  { id: 7, name: 'Wool Sweater', price: 159, category: 'Men', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop', rating: 4.7, reviews: 28 },
  { id: 8, name: 'Leather Jacket', price: 299, category: 'Men', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', rating: 4.8, reviews: 51 },
]

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
            <div className="relative">
              <FiShoppingCart className="text-white/40 hover:text-gold-300 transition cursor-pointer text-xl" />
              <span className="absolute -top-1 -right-2 bg-gold-400 text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">3</span>
            </div>
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
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 rounded-full bg-gold-400/20 text-gold-400 text-sm hover:bg-gold-400/30 transition">All</button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm hover:bg-white/20 transition">Men</button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm hover:bg-white/20 transition">Women</button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm hover:bg-white/20 transition">Accessories</button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm hover:bg-white/20 transition">Sale</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product.id} className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-gold-400/40 transition-all duration-500">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
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
