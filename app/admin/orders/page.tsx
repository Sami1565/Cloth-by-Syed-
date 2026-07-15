'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true'
    if (!isAuthenticated) {
      router.push('/admin-login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white/50">Loading...</div>
      </div>
    )
  }

  // Your page content here...
}
'use client'

import { useState } from 'react'
import { FiSearch, FiEye } from 'react-icons/fi'

const orders = [
  { id: '#1001', customer: 'John Doe', email: 'john@email.com', total: 249, status: 'Delivered', date: '2024-01-15', items: 2 },
  { id: '#1002', customer: 'Jane Smith', email: 'jane@email.com', total: 189, status: 'Processing', date: '2024-01-14', items: 1 },
  { id: '#1003', customer: 'Mike Johnson', email: 'mike@email.com', total: 159, status: 'Shipped', date: '2024-01-14', items: 3 },
  { id: '#1004', customer: 'Sarah Wilson', email: 'sarah@email.com', total: 299, status: 'Pending', date: '2024-01-13', items: 2 },
  { id: '#1005', customer: 'Robert Brown', email: 'robert@email.com', total: 134, status: 'Delivered', date: '2024-01-12', items: 1 },
]

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrders = orders.filter(o => 
    o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.includes(searchTerm)
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-widest">ORDERS</h1>
          <p className="text-white/50 text-sm mt-1">Manage customer orders</p>
        </div>
      </div>

      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none"
        />
      </div>

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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 text-white/80">{order.id}</td>
                  <td className="p-4 text-white/80">{order.customer}</td>
                  <td className="p-4 text-white/50 text-sm">{order.email}</td>
                  <td className="p-4 text-white/80">${order.total}</td>
                  <td className="p-4 text-white/50 text-sm">{order.items}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-green-400/20 text-green-400' :
                        order.status === 'Processing' ? 'bg-blue-400/20 text-blue-400' :
                        order.status === 'Shipped' ? 'bg-purple-400/20 text-purple-400' :
                        'bg-yellow-400/20 text-yellow-400'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/50 text-sm">{order.date}</td>
                  <td className="p-4">
                    <button className="p-2 rounded-lg bg-blue-400/20 text-blue-400 hover:bg-blue-400/30 transition">
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
