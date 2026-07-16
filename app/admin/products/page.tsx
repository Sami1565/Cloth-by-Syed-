'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiUpload } from 'react-icons/fi'
import { motion } from 'framer-motion'

// Sample product data
const initialProducts = [
  { id: 1, name: 'Velocity Jacket', price: 249, category: 'Men', stock: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&h=100&fit=crop' },
  { id: 2, name: 'Aura Dress', price: 189, category: 'Women', stock: 32, status: 'Active', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100&h=100&fit=crop' },
  { id: 3, name: 'Nova Sneakers', price: 159, category: 'Accessories', stock: 18, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
  { id: 4, name: 'Cargo Pants', price: 134, category: 'Men', stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=100&h=100&fit=crop' },
  { id: 5, name: 'Silk Blouse', price: 119, category: 'Women', stock: 28, status: 'Active', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=100&h=100&fit=crop' },
  { id: 6, name: 'Leather Belt', price: 89, category: 'Accessories', stock: 15, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
]

// Get unique categories
const allCategories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))]

export default function AdminProducts() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState(initialProducts)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth') === 'true'
    if (!auth) {
      router.push('/admin-login')
    } else {
      setIsLoading(false)
    }
  }, [])

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return
    if (confirm(`Delete ${selectedProducts.length} products?`)) {
      setProducts(products.filter(p => !selectedProducts.includes(p.id)))
      setSelectedProducts([])
    }
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const handleToggleSelect = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const productData = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      stock: parseInt(formData.get('stock') as string),
      status: parseInt(formData.get('stock') as string) === 0 ? 'Out of Stock' : 
               parseInt(formData.get('stock') as string) < 20 ? 'Low Stock' : 'Active',
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&h=100&fit=crop'
    }

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p))
    } else {
      setProducts([...products, { ...productData, id: Date.now() }])
    }
    setShowModal(false)
    setEditingProduct(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white/50">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-widest">PRODUCTS</h1>
          <p className="text-white/50 text-sm mt-1">Manage your product catalog</p>
        </div>
        <div className="flex gap-3">
          {selectedProducts.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm"
            >
              <FiTrash2 />
              Delete ({selectedProducts.length})
            </button>
          )}
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
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none transition"
          />
        </div>
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-xl px-6 py-3 pr-12 text-white focus:border-gold-400/50 outline-none transition cursor-pointer min-w-[150px]"
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat} className="bg-zinc-900">
                {cat}
              </option>
            ))}
          </select>
          <FiFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/50 text-sm font-medium w-12">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold-400 focus:ring-gold-400/50"
                  />
                </th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Product</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Category</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Price</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Stock</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr 
                  key={product.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleToggleSelect(product.id)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold-400 focus:ring-gold-400/50"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-white/5"
                      />
                      <span className="text-white/80">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white/50 text-sm">{product.category}</td>
                  <td className="p-4 text-white/80 font-medium">${product.price}</td>
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

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-white/30">
            <p className="text-lg">No products found</p>
            <p className="text-sm mt-1">Try adjusting your search or add a new product</p>
          </div>
        )}

        <div className="p-4 border-t border-white/10 flex justify-between items-center text-white/50 text-sm">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">Previous</button>
            <button className="px-4 py-2 rounded-lg bg-gold-400/20 text-gold-400 hover:bg-gold-400/30 transition">1</button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">2</button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 rounded-3xl max-w-2xl w-full p-8 border border-gold-400/20 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-light tracking-widest">
                  {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  {editingProduct ? 'Update product details' : 'Add a new product to your catalog'}
                </p>
              </div>
              <button 
                onClick={() => {
                  setShowModal(false)
                  setEditingProduct(null)
                }}
                className="text-white/50 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={editingProduct?.name || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    name="price"
                    defaultValue={editingProduct?.price || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Stock</label>
                  <input 
                    type="number" 
                    name="stock"
                    defaultValue={editingProduct?.stock || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                    placeholder="0"
                    required
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Category</label>
                <select 
                  name="category"
                  defaultValue={editingProduct?.category || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Men" className="bg-zinc-900">Men</option>
                  <option value="Women" className="bg-zinc-900">Women</option>
                  <option value="Accessories" className="bg-zinc-900">Accessories</option>
                  <option value="Kids" className="bg-zinc-900">Kids</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Product Image URL</label>
                <div className="flex gap-4">
                  <input 
                    type="url" 
                    name="image"
                    defaultValue={editingProduct?.image || ''}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button 
                    type="button"
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition"
                  >
                    <FiUpload />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Description</label>
                <textarea 
                  name="description"
                  rows={4}
                  defaultValue={editingProduct?.description || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition resize-none"
                  placeholder="Product description..."
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
                  onClick={() => {
                    setShowModal(false)
                    setEditingProduct(null)
                  }}
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
