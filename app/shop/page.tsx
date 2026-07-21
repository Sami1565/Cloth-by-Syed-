'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa'
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
  { id: 7, name: 'Denim Jeans', price: 119, category: 'Men', subCategory: 'Pants', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop', rating: 4.6, reviews: 44 },
  { id: 8, name: 'T-Shirt', price: 49, category: 'Men', subCategory: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', rating: 4.4, reviews: 56 },
  { id: 9, name: 'Hoodie', price: 99, category: 'Men', subCategory: 'Sweaters', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop', rating: 4.5, reviews: 38 },
  
  // ===== WOMEN'S PRODUCTS =====
  { id: 10, name: 'Aura Dress', price: 189, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop', rating: 4.9, reviews: 38 },
  { id: 11, name: 'Silk Blouse', price: 119, category: 'Women', subCategory: 'Tops', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop', rating: 4.9, reviews: 47 },
  { id: 12, name: 'Summer Dress', price: 149, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', rating: 4.6, reviews: 35 },
  { id: 13, name: 'Designer Saree', price: 299, category: 'Women', subCategory: 'Traditional', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop', rating: 4.8, reviews: 43 },
  { id: 14, name: 'Women Kurti', price: 79, category: 'Women', subCategory: 'Traditional', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop', rating: 4.6, reviews: 28 },
  { id: 15, name: 'Party Gown', price: 249, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1566174053873-3156b1a6c5a6?w=400&h=500&fit=crop', rating: 4.9, reviews: 52 },
  { id: 16, name: 'Jeans', price: 99, category: 'Women', subCategory: 'Bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop', rating: 4.5, reviews: 33 },
  { id: 17, name: 'Skirt', price: 69, category: 'Women', subCategory: 'Bottoms', image: 'https://images.unsplash.com/photo-1583496661160-f4b2dafb1fd3?w=400&h=500&fit=crop', rating: 4.6, reviews: 41 },
  
  // ===== KIDS' PRODUCTS =====
  { id: 18, name: 'Kids T-Shirt', price: 49, category: 'Kids', subCategory: 'T-Shirts', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop', rating: 4.7, reviews: 18 },
  { id: 19, name: 'Kids Sneakers', price: 69, category: 'Kids', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=500&fit=crop', rating: 4.6, reviews: 24 },
  { id: 20, name: 'Kids Dress', price: 59, category: 'Kids', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop', rating: 4.8, reviews: 21 },
  { id: 21, name: 'Kids Jacket', price: 79, category: 'Kids', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', rating: 4.5, reviews: 16 },
  { id: 22, name: 'Kids Pants', price: 39, category: 'Kids', subCategory: 'Pants', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop', rating: 4.4, reviews: 19 },
  
  // ===== ACCESSORIES =====
  { id: 23, name: 'Nova Sneakers', price: 159, category: 'Accessories', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.7, reviews: 56 },
  { id: 24, name: 'Leather Belt', price: 89, category: 'Accessories', subCategory: 'Belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', rating: 4.5, reviews: 33 },
  { id: 25, name: 'Crossbody Bag', price: 79, category: 'Accessories', subCategory: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop', rating: 4.4, reviews: 22 },
  { id: 26, name: 'Designer Watch', price: 199, category: 'Accessories', subCategory: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop', rating: 4.8, reviews: 45 },
  { id: 27, name: 'Sunglasses', price: 129, category: 'Accessories', subCategory: 'Eyewear', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop', rating: 4.6, reviews: 38 },
  { id: 28, name: 'Leather Wallet', price: 49, category: 'Accessories', subCategory: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop', rating: 4.7, reviews: 41 },
  { id: 29, name: 'Scarf', price: 39, category: 'Accessories', subCategory: 'Scarves', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=500&fit=crop', rating: 4.3, reviews: 27 },
  
  // ===== UNSTITCHED =====
  { id: 30, name: 'Unstitched Fabric', price: 99, category: 'Unstitched', subCategory: 'Fabrics', image: 'https://images.unsplash.com/photo-1601071651953-a2c10558bae3?w=400&h=500&fit=crop', rating: 4.5, reviews: 31 },
  { id: 31, name: 'Premium Cotton', price: 129, category: 'Unstitched', subCategory: 'Fabrics', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop', rating: 4.6, reviews: 27 },
  { id: 32, name: 'Silk Fabric', price: 199, category: 'Unstitched', subCategory: 'Fabrics', image: 'https://images.unsplash.com/photo-1596783074918-c84cb5fc0bc0?w=400&h=500&fit=crop', rating: 4.8, reviews: 34 },
  { id: 33, name: 'Linen Fabric', price: 89, category: 'Unstitched', subCategory: 'Fabrics', image: 'https://images.unsplash.com/photo-1601071651953-a2c10558bae3?w=400&h=500&fit=crop', rating: 4.4, reviews: 19 },
  
  // ===== EMBROIDERED =====
  { id: 34, name: 'Embroidered Kurta', price: 179, category: 'Embroidered', subCategory: 'Kurtas', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop', rating: 4.9, reviews: 44 },
  { id: 35, name: 'Embroidered Shawl', price: 89, category: 'Embroidered', subCategory: 'Shawls', image: 'https://images.unsplash.com/photo-1596783074918-c84cb5fc0bc0?w=400&h=500&fit=crop', rating: 4.7, reviews: 36 },
  { id: 36, name: 'Embroidered Dupatta', price: 69, category: 'Embroidered', subCategory: 'Dupattas', image: 'https://images.unsplash.com/photo-1601071651953-a2c10558bae3?w=400&h=500&fit=crop', rating: 4.6, reviews: 29 },
  
  // ===== NEW IN =====
  { id: 37, name: 'Summer Collection Dress', price: 199, category: 'New In', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', rating: 4.9, reviews: 26 },
  { id: 38, name: 'New Arrival Jacket', price: 279, category: 'New In', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', rating: 4.8, reviews: 19 },
  { id: 39, name: 'Trendy Sneakers', price: 169, category: 'New In', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.7, reviews: 23 },
  { id: 40, name: 'Designer Handbag', price: 249, category: 'New In', subCategory: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop', rating: 4.8, reviews: 31 },
  
  // ===== SALE =====
  { id: 41, name: 'Sale Leather Jacket', price: 199, category: 'Sale', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', rating: 4.8, reviews: 45 },
  { id: 42, name: 'Sale Aura Dress', price: 129, category: 'Sale', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop', rating: 4.9, reviews: 33 },
  { id: 43, name: 'Sale Sneakers', price: 99, category: 'Sale', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.6, reviews: 28 },
  { id: 44, name: 'Sale Cargo Pants', price: 89, category: 'Sale', subCategory: 'Pants', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop', rating: 4.5, reviews: 22 },
  { id: 45, name: 'Sale Silk Blouse', price: 79, category: 'Sale', subCategory: 'Tops', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop', rating: 4.7, reviews: 39 },
]

// Sub-category mapping for each main category
const subCategories: { [key: string]: string[] } = {
  'Men': ['All', 'Jackets', 'Pants', 'Shirts', 'Sweaters', 'T-Shirts', 'Blazers'],
  'Women': ['All', 'Dresses', 'Tops', 'Traditional', 'Bottoms'],
  'Kids': ['All', 'T-Shirts', 'Shoes', 'Dresses', 'Jackets', 'Pants'],
  'Accessories': ['All', 'Shoes', 'Belts', 'Bags', 'Watches', 'Eyewear', 'Wallets', 'Scarves'],
  'Unstitched': ['All', 'Fabrics'],
  'Embroidered': ['All', 'Kurtas', 'Shawls', 'Dupattas'],
  'New In': ['All', 'Dresses', 'Jackets', 'Shoes', 'Bags'],
  'Sale': ['All', 'Jackets', 'Dresses', 'Shoes', 'Pants', 'Tops'],
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSubCategory, setSelectedSubCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSubCategories, setShowSubCategories] = useState(false)

  // Filter products based on category, sub-category and search
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSubCategory = selectedSubCategory === 'All' || product.subCategory === selectedSubCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSubCategory && matchesSearch
  })

  const categories = ['All', 'Men', 'Women', 'Kids', 'Accessories', 'Unstitched', 'Embroidered', 'New In', 'Sale']

  // Get sub-categories for selected category
  const getSubCategories = () => {
    if (selectedCategory === 'All') return ['All']
    return subCategories[selectedCategory] || ['All']
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'All': '🛍️',
      'Men': '👔',
      'Women': '👗',
      'Kids': '🧒',
      'Accessories': '👜',
      'Unstitched': '🧵',
      'Embroidered': '🌸',
      'New In': '✨',
      'Sale': '🏷️'
    }
    return icons[category] || '📦'
  }

  // Get sub-category icon
  const getSubCategoryIcon = (sub: string) => {
    const icons: { [key: string]: string } = {
      'All': '📋',
      'Jackets': '🧥',
      'Pants': '👖',
      'Shirts': '👔',
      'Sweaters': '🧶',
      'T-Shirts': '👕',
      'Blazers': '🤵',
      'Dresses': '👗',
      'Tops': '👚',
      'Traditional': '🧕',
      'Bottoms': '👖',
      'Shoes': '👟',
      'Belts': '🔗',
      'Bags': '👜',
      'Watches': '⌚',
      'Eyewear': '👓',
      'Wallets': '💳',
      'Scarves': '🧣',
      'Fabrics': '🧵',
      'Kurtas': '👘',
      'Shawls': '🧣',
      'Dupattas': '🧣'
    }
    return icons[sub] || '📦'
  }

  // Get product count for each category
  const getProductCount = (category: string) => {
    if (category === 'All') return allProducts.length
    return allProducts.filter(p => p.category === category).length
  }

  // Get product count for each sub-category
  const getSubCategoryCount = (sub: string) => {
    if (sub === 'All') return filteredProducts.length
    return allProducts.filter(p => p.subCategory === sub && (selectedCategory === 'All' || p.category === selectedCategory)).length
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
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

      {/* Shop Content */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-light tracking-widest mb-4">SHOP <span className="text-[#d4af37]">COLLECTION</span></h1>
        <p className="text-white/50 mb-8">Discover our latest arrivals and timeless classics</p>
        
        {/* Search Bar */}
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

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setSelectedSubCategory('All')
                setShowSubCategories(false)
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

        {/* Sub-Category Toggle Button */}
        {selectedCategory !== 'All' && (
          <button
            onClick={() => setShowSubCategories(!showSubCategories)}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-4 transition"
          >
            {showSubCategories ? <FaChevronUp /> : <FaChevronDown />}
            {showSubCategories ? 'Hide Sub-Categories' : 'Show Sub-Categories'}
          </button>
        )}

        {/* Sub-Category Filters */}
        {showSubCategories && selectedCategory !== 'All' && (
          <div className="flex flex-wrap gap-2 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <span className="text-white/40 text-xs uppercase tracking-wider mr-2 flex items-center">
              Sub-Categories:
            </span>
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

        {/* Results Count */}
        <p className="text-white/40 text-sm mb-6">
          {filteredProducts.length} products found
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {selectedSubCategory !== 'All' && ` / ${selectedSubCategory}`}
        </p>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50">No products found</p>
            <p className="text-white/30 text-sm mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur text-white/70 hover:text-red-400 transition">
                    <IoHeartOutline />
                  </button>
                  {product.category === 'Sale' && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-500/80 text-white text-xs font-medium">
                      SALE
                    </span>
                  )}
                  {product.category === 'New In' && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-500/80 text-white text-xs font-medium">
                      NEW
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
                  <button className="mt-4 w-full py-2 sm:py-2.5 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition border border-white/20 text-xs sm:text-sm">
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
