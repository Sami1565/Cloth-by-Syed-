'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FaStar, FaArrowLeft, FaShoppingBag, FaHeart, FaShare } from 'react-icons/fa'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import { motion } from 'framer-motion'

// All products data (same as shop page)
const allProducts = [
  // ===== MEN'S PRODUCTS =====
  { id: 1, name: 'Velocity Jacket', price: 249, category: 'Men', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop', rating: 4.8, reviews: 42, description: 'Premium quality jacket with a modern fit. Perfect for any occasion.', sizes: ['S','M','L','XL'], color: 'Black' },
  { id: 2, name: 'Cargo Pants', price: 134, category: 'Men', subCategory: 'Pants', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=800&fit=crop', rating: 4.6, reviews: 29, description: 'Comfortable cargo pants with multiple pockets. Ideal for casual wear.', sizes: ['S','M','L','XL'], color: 'Olive' },
  { id: 3, name: 'Wool Sweater', price: 159, category: 'Men', subCategory: 'Sweaters', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=800&fit=crop', rating: 4.7, reviews: 28, description: 'Warm wool sweater perfect for winter. Soft and comfortable.', sizes: ['S','M','L','XL'], color: 'Gray' },
  { id: 4, name: 'Leather Jacket', price: 299, category: 'Men', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop', rating: 4.8, reviews: 51, description: 'Genuine leather jacket with a classic design. A timeless piece.', sizes: ['S','M','L','XL'], color: 'Black' },
  { id: 5, name: 'Formal Shirt', price: 89, category: 'Men', subCategory: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop', rating: 4.5, reviews: 34, description: 'Crisp formal shirt perfect for office and events.', sizes: ['S','M','L','XL'], color: 'White' },
  { id: 6, name: 'Casual Blazer', price: 199, category: 'Men', subCategory: 'Blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop', rating: 4.7, reviews: 39, description: 'Stylish casual blazer for a sophisticated look.', sizes: ['S','M','L','XL'], color: 'Navy' },
  
  // ===== WOMEN'S PRODUCTS =====
  { id: 7, name: 'Aura Dress', price: 189, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop', rating: 4.9, reviews: 38, description: 'Elegant dress with a beautiful flow. Perfect for any event.', sizes: ['XS','S','M','L'], color: 'Gold' },
  { id: 8, name: 'Silk Blouse', price: 119, category: 'Women', subCategory: 'Tops', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop', rating: 4.9, reviews: 47, description: 'Luxurious silk blouse that drapes beautifully.', sizes: ['XS','S','M','L'], color: 'Cream' },
  { id: 9, name: 'Summer Dress', price: 149, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop', rating: 4.6, reviews: 35, description: 'Light and breezy summer dress for warm days.', sizes: ['XS','S','M','L'], color: 'Yellow' },
  
  // ===== ACCESSORIES =====
  { id: 10, name: 'Nova Sneakers', price: 159, category: 'Accessories', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop', rating: 4.7, reviews: 56, description: 'Comfortable and stylish sneakers for everyday wear.', sizes: ['6','7','8','9','10'], color: 'White' },
  { id: 11, name: 'Leather Belt', price: 89, category: 'Accessories', subCategory: 'Belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop', rating: 4.5, reviews: 33, description: 'Premium leather belt with a classic buckle.', sizes: ['S','M','L'], color: 'Brown' },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = parseInt(params?.id as string || '0')
  
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find product by id
    const found = allProducts.find(p => p.id === id)
    setProduct(found || null)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white pt-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-light tracking-widest mb-4">Product Not Found</h1>
          <p className="text-white/50">The product you're looking for doesn't exist.</p>
          <Link href="/shop" className="inline-block mt-6 px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition">
            Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()}
            className="text-white/50 hover:text-[#d4af37] transition p-2 rounded-full hover:bg-white/5"
          >
            <FaArrowLeft />
          </button>
          <Link href="/shop" className="text-white/30 text-sm hover:text-white/60 transition">
            Back to Shop
          </Link>
        </div>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover min-h-[400px] md:min-h-[500px]"
            />
            {product.category === 'Sale' && (
              <span className="absolute top-4 left-4 px-4 py-1 rounded-full bg-red-500/80 text-white text-sm font-medium">
                SALE
              </span>
            )}
            {product.category === 'New In' && (
              <span className="absolute top-4 left-4 px-4 py-1 rounded-full bg-blue-500/80 text-white text-sm font-medium">
                NEW
              </span>
            )}
            <button 
              onClick={() => setIsWishlist(!isWishlist)}
              className="absolute top-4 right-4 p-3 rounded-full bg-black/70 backdrop-blur text-white/70 hover:text-red-400 transition"
            >
              {isWishlist ? <IoHeart className="text-red-400 text-xl" /> : <IoHeartOutline className="text-xl" />}
            </button>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-white/40 text-sm uppercase tracking-wider">{product.category} / {product.subCategory}</p>
              <h1 className="text-4xl font-light tracking-widest mt-2">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar /> <span className="text-white text-sm">{product.rating}</span>
                </div>
                <span className="text-white/30 text-sm">({product.reviews} reviews)</span>
                <span className="text-white/20">|</span>
                <span className="text-white/30 text-sm">{product.color}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-[#d4af37]">${product.price}</div>

            <p className="text-white/50 text-sm leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div>
              <p className="text-white/70 text-sm mb-3">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full text-sm transition ${
                      selectedSize === size
                        ? 'bg-[#d4af37] text-black font-medium'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-white/70 text-sm mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition text-white/70"
                >
                  -
                </button>
                <span className="text-white text-lg w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition text-white/70"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full py-4 rounded-full bg-[#d4af37] text-black font-bold hover:bg-[#c5a028] transition flex items-center justify-center gap-3 text-lg">
              <FaShoppingBag />
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Share Button */}
            <button className="w-full py-3 rounded-full border border-white/20 text-white/50 hover:bg-white/5 transition flex items-center justify-center gap-2">
              <FaShare />
              Share Product
            </button>

            {/* Product Details */}
            <div className="border-t border-white/10 pt-6 mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/40">Category</span>
                <span className="text-white/70">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Sub-Category</span>
                <span className="text-white/70">{product.subCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Color</span>
                <span className="text-white/70">{product.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Rating</span>
                <span className="text-white/70">{product.rating} / 5.0</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="text-2xl font-light tracking-widest mb-8">YOU MAY <span className="text-[#d4af37]">ALSO LIKE</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {allProducts
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((related) => (
                <Link href={`/product/${related.id}`} key={related.id}>
                  <div className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img 
                        src={related.image} 
                        alt={related.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-white/50 text-xs uppercase tracking-wider">{related.category}</p>
                      <h3 className="text-white font-semibold text-sm mt-1">{related.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[#d4af37] font-bold">${related.price}</span>
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          <FaStar /> <span className="text-white/70">{related.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
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
