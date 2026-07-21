'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaStar } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { IoHeartOutline } from 'react-icons/io5'

const allProducts = [
  // ===== MEN'S PRODUCTS =====
  { id: 1, name: 'Velocity Jacket', price: 249, category: 'Men', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', rating: 4.8, reviews: 42 },
  { id: 2, name: 'Cargo Pants', price: 134, category: 'Men', subCategory: 'Pants', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop', rating: 4.6, reviews: 29 },
  { id: 3, name: 'Wool Sweater', price: 159, category: 'Men', subCategory: 'Sweaters', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop', rating: 4.7, reviews: 28 },
  { id: 4, name: 'Leather Jacket', price: 299, category: 'Men', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', rating: 4.8, reviews: 51 },
  { id: 5, name: 'Formal Shirt', price: 89, category: 'Men', subCategory: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop', rating: 4.5, reviews: 34 },
  { id: 6, name: 'Casual Blazer', price: 199, category: 'Men', subCategory: 'Blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop', rating: 4.7, reviews: 39 },
  
  // ===== WOMEN'S PRODUCTS =====
  { id: 7, name: 'Aura Dress', price: 189, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop', rating: 4.9, reviews: 38 },
  { id: 8, name: 'Silk Blouse', price: 119, category: 'Women', subCategory: 'Tops', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop', rating: 4.9, reviews: 47 },
  { id: 9, name: 'Summer Dress', price: 149, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', rating: 4.6, reviews: 35 },
  
  // ===== ACCESSORIES =====
  { id: 10, name: 'Nova Sneakers', price: 159, category: 'Accessories', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.7, reviews: 56 },
  { id: 11, name: 'Leather Belt', price: 89, category: 'Accessories', subCategory: 'Belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', rating: 4.5, reviews: 33 },
]

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSubCategory, setSelectedSubCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSubCategory = selectedSubCategory === 'All' || product.subCategory === selectedSubCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSubCategory && matchesSearch
  })

  const categories = ['All', 'Men', 'Women', 'Accessories']
  const subCategories: { [key: string]: string[] } = {
    'Men': ['Jackets', 'Pants', 'Shirts', 'Sweaters', 'Blazers'],
    'Women': ['Dresses', 'Tops'],
    'Accessories': ['Shoes', 'Belts'],
  }

  const getSubCategories = () => {
    if (selectedCategory === 'All') return []
    return subCategories[selectedCategory] || []
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'All': '🛍️',
      'Men': '👔',
      'Women': '👗',
      'Accessories': '👜',
    }
    return icons[category] || '📦'
  }

  const getSubCategoryIcon = (sub: string) => {
    const icons: { [key: string]: string } = {
      'Jackets': '🧥',
      'Pants': '👖',
      'Shirts': '👔',
      'Sweaters': '🧶',
      'Blazers': '🤵',
      'Dresses': '👗',
      'Tops': '👚',
      'Shoes': '👟',
      'Belts': '🔗',
    }
    return icons[sub] || '📦'
  }

  const getProductCount = (category: string) => {
    if (category === 'All') return allProducts.length
    return allProducts.filter(p => p.category === category).length
  }

  const getSubCategoryCount = (sub: string) => {
    return allProducts.filter(p => p.subCategory === sub && (selectedCategory === 'All' || p.category === selectedCategory)).length
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#d4af37]">LUXE</h1>
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase hidden sm:inline">Studio</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-light">
            <Link href="/" className="hover:text-[#d4af37] transition">Home</Link>
            <Link href="/shop" className="text-[#d4af37] transition">Shop</Link>
            <Link href="/collections" className="hover:text-[#d4af37] transition">Collections</Link>
            <Link href="/about" className="hover:text-[#d4af37] transition">About</Link>
            <Link href="/contact" className="hover:text-[#d4af37] transition">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <FaSearch className="text-white/40 hover:text-[#d4af37] transition cursor-pointer" />
            <div className="relative">
              <FiShoppingCart className="text-white/40 hover:text-[#d4af37] transition cursor-pointer text-xl" />
              <span className="absolute -top-1 -right-2 bg-[#d4af37] text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">3</span>
            </div>
            <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-light tracking-widest mb-4">SHOP <span className="text-[#d4af37]">COLLECTION</span></h1>
        <p className="text-white/50 mb-8">Discover our latest arrivals and timeless classics</p>
        
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-[#d4af37]/50 outline-none transition"
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setSelectedSubCategory('All')
              }}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition flex items-center gap-1 sm:gap-1.5 ${
                selectedCategory === category
                  ? 'bg-[#d4af37] text-black font-medium'
                  : 'bg-white/5 text-white/50 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span>{getCategoryIcon(category)}</span>
              {category}
              <span className={`text-[10px] ${selectedCategory === category ? 'text-black/60' : 'text-white/30'}`}>
                ({getProductCount(category)})
              </span>
            </button>
          ))}
        </div>

        {selectedCategory !== 'All' && getSubCategories().length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <span className="text-white/40 text-xs uppercase tracking-wider mr-2 flex items-center">
              Sub-Categories:
            </span>
            <button
              onClick={() => setSelectedSubCategory('All')}
              className={`px-3 py-1.5 rounded-full text-xs transition flex items-center gap-1 ${
                selectedSubCategory === 'All'
                  ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>📋</span>
              All
              <span className="text-[10px] text-white/30">
                ({getSubCategoryCount('All')})
              </span>
            </button>
            {getSubCategories().map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1.5 rounded-full text-xs transition flex items-center gap-1 ${
                  selectedSubCategory === sub
                    ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{getSubCategoryIcon(sub)}</span>
                {sub}
                <span className="text-[10px] text-white/30">
                  ({getSubCategoryCount(sub)})
                </span>
              </button>
            ))}
          </div>
        )}

        <p className="text-white/40 text-sm mb-6">
          {filteredProducts.length} products found
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {selectedSubCategory !== 'All' && ` / ${selectedSubCategory}`}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50">No products found</p>
            <p className="text-white/30 text-sm mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="block">
                <div className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500 cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur text-white/70 hover:text-red-400 transition z-10"
                    >
                      <IoHeartOutline />
                    </button>
                    {product.category === 'Sale' && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-500/80 text-white text-xs font-medium">
                        SALE
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white/60 text-[10px]">
                      {product.subCategory}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">{product.category}</p>
                        <h3 className="text-white font-semibold text-sm sm:text-lg mt-1">{product.name}</h3>
                      </div>
                      <span className="text-[#d4af37] font-bold text-base sm:text-xl">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
                      <FaStar /> <span className="text-white/80 text-xs">{product.rating}</span>
                      <span className="text-white/30 text-xs ml-2">({product.reviews})</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className="mt-4 w-full py-2 sm:py-2.5 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition border border-white/20 text-xs sm:text-sm"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

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
