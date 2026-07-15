'use client'

import { useState } from 'react'
import { FiSearch, FiMail, FiUser } from 'react-icons/fi'

const customers = [
  { id: 1, name: 'John Doe', email: 'john@email.com', orders: 12, spent: 2948, joined: '2023-06-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@email.com', orders: 8, spent: 1834, joined: '2023-08-22' },
  { id: 3, name: 'Mike Johnson', email: 'mike@email.com', orders: 5, spent: 967, joined: '2023-10-03' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@email.com', orders: 15, spent: 4200, joined: '2023-04-11' },
]

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-widest">CUSTOMERS</h1>
          <p className="text-white/50 text-sm mt-1">Manage customer accounts</p>
        </div>
      </div>

      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Total Customers</p>
          <p className="text-2xl font-bold text-white mt-2">4</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-white mt-2">40</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Average Spend</p>
          <p className="text-2xl font-bold text-white mt-2">$2,487</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">New This Week</p>
          <p className="text-2xl font-bold text-white mt-2">3</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/50 text-sm font-medium">ID</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Name</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Email</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Orders</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Total Spent</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-t border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 text-white/50 text-sm">#{customer.id}</td>
                  <td className="p-4 text-white/80">{customer.name}</td>
                  <td className="p-4 text-white/50 text-sm">{customer.email}</td>
                  <td className="p-4 text-white/80">{customer.orders}</td>
                  <td className="p-4 text-white/80">${customer.spent.toLocaleString()}</td>
                  <td className="p-4 text-white/50 text-sm">{customer.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
