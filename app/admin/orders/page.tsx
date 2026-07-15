'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiEye, FiFilter, FiDownload, FiChevronDown } from 'react-icons/fi'
import { motion } from 'framer-motion'

// Sample orders data
const ordersData = [
  { id: '#1001', customer: 'John Doe', email: 'john@email.com', total: 249, status: 'Delivered', date: '2024-01-15', items: 2, payment: 'Credit Card' },
  { id: '#1002', customer: 'Jane Smith', email: 'jane@email.com', total: 189, status: 'Processing', date: '2024-01-14', items: 1, payment: 'PayPal' },
  { id: '#1003', customer: 'Mike Johnson', email: 'mike@email.com', total: 159, status: 'Shipped', date: '2024-01-14', items: 3, payment: 'Credit Card' },
  { id: '#1004', customer: 'Sarah Wilson', email: 'sarah@email.com', total: 299, status: 'Pending', date: '2024-01-13', items: 2, payment: 'Apple Pay' },
  { id: '#1005', customer: 'Robert Brown', email: 'robert@email.com', total: 134, status: 'Delivered', date: '2024-01-12', items: 1, payment: 'Credit Card' },
  { id: '#1006', customer: 'Emily Davis', email: 'emily@email.com', total: 349, status: 'Processing', date: '2024-01-12', items: 4, payment: 'PayPal' },
  { id: '#1007', customer: 'David Wilson', email: 'david@email.com', total: 79, status: 'Cancelled', date: '2024-01-11', items: 1, payment: 'Credit Card' },
  { id: '#1008', customer: 'Lisa Anderson', email: 'lisa@email.com', total: 219, status: 'Shipped', date: '2024-01-11', items: 2, payment: 'Apple Pay' },
]

export default function AdminOrders() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [orders, setOrders] = useState(ordersData)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true'
    if (!isAuthenticated) {
      router.push('/admin-login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Get unique statuses for filter
  const statuses = ['All', ...new Set(orders.map(o => o.status))]

  // View order details
  const viewOrder = (order: any) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  // Update order status
  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ))
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
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-widest">ORDERS</h1>
          <p className="text-white/50 text-sm mt-1">Manage customer orders</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition text-sm">
            <FiDownload />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition text-sm">
            <FiFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search orders by ID, customer, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none transition"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-xl px-6 py-3 pr-12 text-white focus:border-gold-400/50 outline-none transition cursor-pointer min-w-[150px]"
          >
            {statuses.map((status) => (
              <option key={status} value={status} className="bg-zinc-900">
                {status}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Order ID</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Customer</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Email</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Total</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Items</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Date</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr 
                  key={order.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4 text-white/80 font-medium">{order.id}</td>
                  <td className="p-4 text-white/80">{order.customer}</td>
                  <td className="p-4 text-white/50 text-sm">{order.email}</td>
                  <td className="p-4 text-white/80 font-medium">${order.total}</td>
                  <td className="p-4 text-white/50 text-sm">{order.items}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 outline-none cursor-pointer transition
                        ${order.status === 'Delivered' ? 'bg-green-400/20 text-green-400' :
                          order.status === 'Processing' ? 'bg-blue-400/20 text-blue-400' :
                          order.status === 'Shipped' ? 'bg-purple-400/20 text-purple-400' :
                          order.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'}`}
                    >
                      <option value="Pending" className="bg-zinc-900 text-yellow-400">Pending</option>
                      <option value="Processing" className="bg-zinc-900 text-blue-400">Processing</option>
                      <option value="Shipped" className="bg-zinc-900 text-purple-400">Shipped</option>
                      <option value="Delivered" className="bg-zinc-900 text-green-400">Delivered</option>
                      <option value="Cancelled" className="bg-zinc-900 text-red-400">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-white/50 text-sm">{order.date}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => viewOrder(order)}
                      className="p-2 rounded-lg bg-blue-400/20 text-blue-400 hover:bg-blue-400/30 transition"
                    >
                      <FiEye />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-white/30">
            <p className="text-lg">No orders found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Pagination */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-white/50 text-sm">
          <span>Showing {filteredOrders.length} of {orders.length} orders</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition disabled:opacity-30">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-gold-400/20 text-gold-400 hover:bg-gold-400/30 transition">
              1
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
              2
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 rounded-3xl max-w-2xl w-full p-8 border border-gold-400/20 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-light tracking-widest">Order {selectedOrder.id}</h2>
                <p className="text-white/50 text-sm mt-1">Order Details</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-white/50 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Customer</p>
                  <p className="text-white font-medium">{selectedOrder.customer}</p>
                  <p className="text-white/40 text-sm">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Order Date</p>
                  <p className="text-white">{selectedOrder.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-gold-400">${selectedOrder.total}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Payment Method</p>
                  <p className="text-white">{selectedOrder.payment}</p>
                </div>
              </div>

              <div>
                <p className="text-white/50 text-sm">Status</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium
                  ${selectedOrder.status === 'Delivered' ? 'bg-green-400/20 text-green-400' :
                    selectedOrder.status === 'Processing' ? 'bg-blue-400/20 text-blue-400' :
                    selectedOrder.status === 'Shipped' ? 'bg-purple-400/20 text-purple-400' :
                    selectedOrder.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-red-400/20 text-red-400'}`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/50 text-sm mb-2">Items ({selectedOrder.items})</p>
                <div className="space-y-2">
                  {[...Array(selectedOrder.items)].map((_, i) => (
                    <div key={i} className="flex justify-between text-white/70 text-sm">
                      <span>Product {i + 1}</span>
                      <span>${(selectedOrder.total / selectedOrder.items).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="flex-1 py-3 rounded-xl bg-gold-400 text-black font-medium hover:bg-gold-300 transition">
                  Update Status
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
