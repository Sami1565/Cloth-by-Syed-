'use client'

import { FiTrendingUp, FiPackage, FiUsers, FiDollarSign } from 'react-icons/fi'
import { motion } from 'framer-motion'

const stats = [
  { name: 'Total Revenue', value: '$48,295', change: '+12.5%', icon: FiDollarSign, color: 'text-green-400' },
  { name: 'Total Orders', value: '356', change: '+8.2%', icon: FiPackage, color: 'text-blue-400' },
  { name: 'Total Customers', value: '2,847', change: '+15.3%', icon: FiUsers, color: 'text-purple-400' },
  { name: 'Conversion Rate', value: '3.2%', change: '+2.1%', icon: FiTrendingUp, color: 'text-gold-400' },
]

const recentOrders = [
  { id: '#1001', customer: 'John Doe', total: '$249.00', status: 'Delivered', date: '2024-01-15' },
  { id: '#1002', customer: 'Jane Smith', total: '$189.00', status: 'Processing', date: '2024-01-14' },
  { id: '#1003', customer: 'Mike Johnson', total: '$159.00', status: 'Shipped', date: '2024-01-14' },
  { id: '#1004', customer: 'Sarah Wilson', total: '$299.00', status: 'Pending', date: '2024-01-13' },
]

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-widest">DASHBOARD</h1>
        <p className="text-white/50 text-sm mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/50 text-sm">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`text-2xl ${stat.color}`} />
            </div>
            <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change} from last month
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-light tracking-widest">RECENT ORDERS</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Order ID</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Customer</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Total</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 text-white/80">{order.id}</td>
                  <td className="p-4 text-white/80">{order.customer}</td>
                  <td className="p-4 text-white/80">{order.total}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
