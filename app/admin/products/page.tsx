'use client'

import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'

// Sample product data
const initialProducts = [
  { id: 1, name: 'Velocity Jacket', price: 249, category: 'Men', stock: 45, status: 'Active' },
  { id: 2, name: 'Aura Dress', price: 189, category: 'Women', stock: 32, status: 'Active' },
  { id: 3, name: 'Nova Sneakers', price: 159, category: 'Accessories', stock: 18, status: 'Low Stock' },
  { id: 4, name: 'Cargo Pants', price: 134, category: 'Men', stock: 0, status: 'Out of Stock' },
]

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-widest">PRODUCTS</h1>
          <p className="text-white/50 text-sm mt-1">Manage your product catalog</p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gold-400 text-black rounded-xl font-medium hover:bg-gold-300 transition"
        >
          <FiPlus />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/50 text-sm font-medium">ID</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Product Name</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Category</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Price</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Stock</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <motion.tr 
                  key={product.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4 text-white/50 text-sm">#{product.id}</td>
                  <td className="p-4 text-white/80">{product.name}</td>
                  <td className="p-4 text-white/50 text-sm">{product.category}</td>
                  <td className="p-4 text-white/80">${product.price}</td>
                  <td className="p-4 text-white/50 text-sm">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${product.status === 'Active' ? 'bg-green-400/20 text-green-400' :
                        product.status === 'Low Stock' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-red-400/20 text-red-400'}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingProduct(product)
                          setShowModal(true)
                        }}
                        className="p-2 rounded-lg bg-blue-400/20 text-blue-400 hover:bg-blue-400/30 transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 rounded-3xl max-w-2xl w-full p-8 border border-gold-400/20 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-light tracking-widest mb-6">
              {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
            </h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Product Name</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct?.name || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct?.price || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Stock</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct?.stock || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Category</label>
                <select 
                  defaultValue={editingProduct?.category || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Description</label>
                <textarea 
                  rows={4}
                  defaultValue={editingProduct?.description || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none resize-none"
                  placeholder="Product description..."
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Product Image URL</label>
                <input 
                  type="url" 
                  defaultValue={editingProduct?.image || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gold-400 text-black font-medium hover:bg-gold-300 transition"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
