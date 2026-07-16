'use client'

import Link from 'next/link'
import { FaSearch, FaStar } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'

const products = [
  { id: 1, name: 'Velocity Jacket', price: 249, category: 'Men', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', rating: 4.8, reviews: 42 },
  { id: 2, name: 'Aura Dress', price: 189, category: 'Women', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop', rating: 4.9, reviews: 38 },
  { id: 3, name: 'Nova Sneakers', price: 159, category: 'Accessories', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.7, reviews: 56 },
  { id: 4, name: 'Cargo Pants', price: 134, category: 'Men', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop', rating: 4.6, reviews: 29 },
]

export default function Shop() {
  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-light tracking-widest mb-4">SHOP <span className="text-gold-400">COLLECTION</span></h1>
        <p className="text-white/50 mb-8">Discover our latest arrivals and timeless classics</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product.id} className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-gold-400/40 transition-all duration-500">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
      </div>
    </main>
  )
}
