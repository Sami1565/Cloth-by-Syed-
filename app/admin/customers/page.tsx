'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiMail, FiUser, FiDownload, FiChevronDown, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { motion } from 'framer-motion'

const customersData = [
  { id: 1, name: 'John Doe', email: 'john@email.com', orders: 12, spent: 2948, joined: '2023-06-15', status: 'Active', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@email.com', orders: 8, spent: 1834, joined: '2023-08-22', status: 'Active', avatar: 'JS' },
  { id: 3, name: 'Mike Johnson', email: 'mike@email.com', orders: 5, spent: 967, joined: '2023-10-03', status: 'Active', avatar: 'MJ' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@email.com', orders: 15, spent: 4200, joined: '2023-04-11', status: 'Active', avatar: 'SW' },
  { id: 5, name: 'Robert Brown', email: 'robert@email.com', orders: 3, spent: 450, joined: '2024-01-05', status: 'Inactive', avatar: 'RB' },
  { id: 6, name: 'Emily Davis', email: 'emily@email.com', orders: 7, spent: 1250, joined: '2023-11-20', status: 'Active', avatar: 'ED' },
  { id: 7, name: 'David Wilson', email: 'david@email.com', orders: 2, spent: 280, joined: '2024-02-10', status: 'Inactive', avatar: 'DW' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa@email.com', orders: 10, spent: 2100, joined: '2023-07-08', status: 'Active', avatar: 'LA' },
]

export default function AdminCustomers() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [customers, setCustomers] = useState(customersData)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth') === 'true'
    if (!auth) {
      router.push('/admin-login')
    } else {
      setIsLoading(false)
    }
  }, [])

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statuses = ['All', ...Array.from(new Set(customers.map(c => c.status)))]

  const viewCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setShowModal(true)
  }

  const editCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setShowEditModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id))
    }
  }

  const handleUpdateCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const updatedCustomer = {
      ...selectedCustomer,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      status: formData.get('status') as string,
    }
    setCustomers(customers.map(c => c.id === selectedCustomer.id ? updatedCustomer : c))
    setShowEditModal(false)
    setSelectedCustomer(null)
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === 'Active').length
  const totalRevenue = customers.reduce((sum, c) => sum + c.spent, 0)
  const avgSpent = Math.round(totalRevenue / totalCustomers)

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
          <h1 className="text-3xl font-light tracking-widest">CUSTOMERS</h1>
          <p className="text-white/50 text-sm mt-1">Manage customer accounts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition text-sm">
          <FiDownload />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Total Customers</p>
          <p className="text-2xl font-bold text-white mt-2">{totalCustomers}</p>
          <p className="text-green-400 text-sm mt-1">+12% this month</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Active Customers</p>
          <p className="text-2xl font-bold text-white mt-2">{activeCustomers}</p>
          <p className="text-green-400 text-sm mt-1">{Math.round((activeCustomers/totalCustomers)*100)}% of total</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-gold-400 mt-2">${totalRevenue.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-1">+8.3% this month</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Average Spend</p>
          <p className="text-2xl font-bold text-white mt-2">${avgSpent.toLocaleString()}</p>
          <p className="text-white/30 text-sm mt-1">Per customer</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search customers by name or email..."
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

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Customer</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Email</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Orders</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Total Spent</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Joined</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <motion.tr 
                  key={customer.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-400 font-medium">
                        {customer.avatar}
                      </div>
                      <span className="text-white/80 font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white/50 text-sm">{customer.email}</td>
                  <td className="p-4 text-white/80">{customer.orders}</td>
                  <td className="p-4 text-white/80 font-medium">${customer.spent.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${customer.status === 'Active' ? 'bg-green-400/20 text-green-400' :
                        'bg-red-400/20 text-red-400'}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/50 text-sm">{customer.joined}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => viewCustomer(customer)}
                        className="p-2 rounded-lg bg-blue-400/20 text-blue-400 hover:bg-blue-400/30 transition"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => editCustomer(customer)}
                        className="p-2 rounded-lg bg-purple-400/20 text-purple-400 hover:bg-purple-400/30 transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id)}
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

        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center text-white/30">
            <p className="text-lg">No customers found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}

        <div className="p-4 border-t border-white/10 flex justify-between items-center text-white/50 text-sm">
          <span>Showing {filteredCustomers.length} of {customers.length} customers</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">Previous</button>
            <button className="px-4 py-2 rounded-lg bg-gold-400/20 text-gold-400 hover:bg-gold-400/30 transition">1</button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">2</button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">Next</button>
          </div>
        </div>
      </div>

      {showModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 rounded-3xl max-w-2xl w-full p-8 border border-gold-400/20 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-light tracking-widest">Customer Details</h2>
                <p className="text-white/50 text-sm mt-1">View customer information</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-white/50 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-400 text-xl font-medium">
                {selectedCustomer.avatar}
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">{selectedCustomer.name}</h3>
                <p className="text-white/50">{selectedCustomer.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-white/50 text-sm">Orders</p>
                <p className="text-2xl font-bold text-white">{selectedCustomer.orders}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-white/50 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-gold-400">${selectedCustomer.spent.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-white/50 text-sm">Status</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium
                  ${selectedCustomer.status === 'Active' ? 'bg-green-400/20 text-green-400' :
                    'bg-red-400/20 text-red-400'}`}
                >
                  {selectedCustomer.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-white/50">Member Since</span>
                <span className="text-white">{selectedCustomer.joined}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-white/50">Average Order Value</span>
                <span className="text-white">${Math.round(selectedCustomer.spent / selectedCustomer.orders)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Last Order</span>
                <span className="text-white">Today</span>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button className="flex-1 py-3 rounded-xl bg-gold-400 text-black font-medium hover:bg-gold-300 transition">
                Send Email
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showEditModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 rounded-3xl max-w-md w-full p-8 border border-gold-400/20"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-light tracking-widest">Edit Customer</h2>
                <p className="text-white/50 text-sm mt-1">Update customer information</p>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-white/50 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={selectedCustomer.name}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  defaultValue={selectedCustomer.email}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Status</label>
                <select 
                  name="status"
                  defaultValue={selectedCustomer.status}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400/50 outline-none transition"
                >
                  <option value="Active" className="bg-zinc-900">Active</option>
                  <option value="Inactive" className="bg-zinc-900">Inactive</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gold-400 text-black font-medium hover:bg-gold-300 transition"
                >
                  Update Customer
                </button>
                <button 
                  type="button"
                  onClick={() => setShowEditModal(false)}
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
