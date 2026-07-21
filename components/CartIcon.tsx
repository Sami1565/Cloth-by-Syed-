'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingBag, FaTimes, FaTrash } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'

export default function CartIcon() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore()
  
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="relative">
      {/* Cart Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-white/40 hover:text-[#d4af37] transition cursor-pointer p-1"
        aria-label="Open cart"
      >
        <FaShoppingBag className="text-xl" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-[10px] rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold px-1">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-white font-medium">Shopping Bag</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Cart Items */}
            <div className="max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-3">🛒</div>
                  <p className="text-white/50 text-sm">Your bag is empty</p>
                  <Link
                    href="/shop"
                    onClick={() => setIsOpen(false)}
                    className="inline-block mt-4 px-6 py-2 rounded-full bg-[#d4af37] text-black text-sm font-medium hover:bg-[#c5a028] transition"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="p-3 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-2 bg-white/5 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-white/40 text-xs">{item.category}</p>
                        <p className="text-[#d4af37] text-sm font-medium">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white/50 text-xs flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-white text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white/50 text-xs flex items-center justify-center"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-white/20 hover:text-red-400 transition ml-auto"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <div className="flex justify-between text-white mb-3">
                  <span>Total</span>
                  <span className="text-[#d4af37] font-bold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-full bg-[#d4af37] text-black font-medium hover:bg-[#c5a028] transition text-center block"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
