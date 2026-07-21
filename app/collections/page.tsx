'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaStar, FaArrowLeft } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
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
  { 
    id: 7, 
    name: 'Wool Sweater', 
    price: 159, 
    category: 'Men', 
    color: 'Gray', 
    sizes: ['S','M','L','XL'],
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop', 
    rating: 4.7, 
    reviews: 28 
  },
  { 
    id: 8, 
    name: 'Leather Jacket', 
    price: 299, 
    category: 'Men', 
    color: 'Black', 
    sizes: ['S','M','L','XL'],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', 
    rating: 4.8, 
    reviews: 51 
  },
  { 
    id: 9, 
    name: 'Summer Dress', 
    price: 149, 
    category: 'Women', 
    color: 'Yellow', 
    sizes: ['XS','S','M','L'],
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', 
    rating: 4.6, 
    reviews: 35 
  },
  { 
    id: 10, 
    name: 'Crossbody Bag', 
    price: 79, 
    category: 'Accessories', 
    color: 'Brown', 
    sizes: ['One Size'],
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop', 
    rating: 4.4, 
    reviews: 22 
  },
]

// Category display names
const categoryNames: { [key: string]: string } = {
  'new-in': 'New In',
  'women': 'Women',
  'men': 'Men',
  'girls': 'Girls',
  'sale': 'Sale',
  'unstitched': 'Unstitched',
  'embroidered': 'Embroidered'
}

// Map category slugs to actual categories
const categoryMap: { [key: string]: string } = {
  'new-in': 'New In',
  'women': 'Women',
  'men': 'Men',
  'girls': 'Girls',
  'sale': 'Sale',
  'unstitched': 'Unstitched',
  'embroidered': 'Embroidered'
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [isWishlist, setIsWishlist] = useState<{ [key: number]: boolean }>({})

  // Get category name from slug
  const categoryName = categoryMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)
  
  // Filter products by category
  const categoryProducts = allProducts.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase() ||
    (slug === 'new-in' && product.id <= 3) ||
    (slug === 'sale' && product.id % 2 === 0) ||
    (slug === 'unstitched' && product.id > 7) ||
    (slug === 'embroidered' && product.id > 5)
  )

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
          <h1 className="text-3xl font-light tracking-widest mb-4">
            {categoryName} <span className="text-[#d4af37]">Collection</span>
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
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-white/50 hover:text-[#d4af37] transition">
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl font-light tracking-widest">
            {categoryName} <span className="text-[#d4af37]">Collection</span>
          </h1>
        </div>
        <p className="text-white/50 mb-8">{categoryProducts.length} products found</p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categoryProducts.map((product) => (
            <motion.div 
              key={product.id}
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
