'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaStar, FaArrowLeft, FaFilter } from 'react-icons/fa'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import { motion } from 'framer-motion'

// All products data
const allProducts = [
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

// Category display names and icons
const categoryInfo: { [key: string]: { displayName: string, icon: string, description: string } } = {
  'men': { displayName: 'Men', icon: '👔', description: 'Premium menswear collection' },
  'women': { displayName: 'Women', icon: '👗', description: 'Elegant womenswear collection' },
  'accessories': { displayName: 'Accessories', icon: '👜', description: 'Complete your look with our accessories' },
  'new-in': { displayName: 'New In', icon: '✨', description: 'Latest arrivals' },
  'sale': { displayName: 'Sale', icon: '🏷️', description: 'Limited time offers' },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params?.slug as string || ''
  
  const [isWishlist, setIsWishlist] = useState<{ [key: number]: boolean }>({})
  const [sortBy, setSortBy] = useState<string>('featured')

  // Get category info
  const category = categoryInfo[slug] || { displayName: slug.charAt(0).toUpperCase() + slug.slice(1), icon: '📦', description: 'Collection' }
  
  // Filter products by category
  let categoryProducts = allProducts.filter(product => 
    product.category.toLowerCase() === category.displayName.toLowerCase()
  )

  // Sort products
  if (sortBy === 'price-low') {
    categoryProducts = [...categoryProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.rating - a.rating)
  }

  const toggleWishlist = (id: number) => {
    setIsWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // If no products found
  if (categoryProducts.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white pt-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-3xl font-light tracking-widest mb-4">
            {category.displayName} <span className="text-[#d4af37]">Collection</span>
          </h1>
          <p className="text-white/50">No products found in this category</p>
          <Link href="/" className="inline-block mt-6 px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/50 hover:text-[#d4af37] transition p-2 rounded-full hover:bg-white/5">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-3xl font-light tracking-widest">
                {category.icon} {category.displayName} <span className="text-[#d4af37]">Collection</span>
              </h1>
              <p className="text-white/40 text-sm mt-1">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Stats and Sort */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <p className="text-white/50 text-sm">{categoryProducts.length} products found</p>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white/70 text-sm focus:border-[#d4af37]/50 outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categoryProducts.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur text-white/70 hover:text-red-400 transition"
                >
                  {isWishlist[product.id] ? <IoHeart className="text-red-400" /> : <IoHeartOutline />}
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
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 max-w-7xl mx-auto mt-16">
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
