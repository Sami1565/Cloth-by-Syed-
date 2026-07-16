'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  FiHome, 
  FiBox, 
  FiShoppingBag, 
  FiUsers, 
  FiStar, 
  FiPercent, 
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiShield
} from 'react-icons/fi'

const menuItems = [
  { name: 'Dashboard', icon: FiHome, path: '/admin' },
  { name: 'Products', icon: FiBox, path: '/admin/products' },
  { name: 'Orders', icon: FiShoppingBag, path: '/admin/orders' },
  { name: 'Customers', icon: FiUsers, path: '/admin/customers' },
  { name: 'Reviews', icon: FiStar, path: '/admin/reviews' },
  { name: 'Coupons', icon: FiPercent, path: '/admin/coupons' },
  { name: 'Analytics', icon: FiBarChart2, path: '/admin/analytics' },
  { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [adminUser, setAdminUser] = useState('Admin')

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const auth = localStorage.getItem('adminAuth') === 'true'
      const user = localStorage.getItem('adminUser') || 'Admin'
      
      if (!auth) {
        router.push('/admin-login')
      } else {
        setIsAuthenticated(true)
        setAdminUser(user)
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Clear all admin authentication data
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminUser')
      
      // Redirect to login page
      router.push('/admin-login')
    }
  }

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900/50 border-r border-white/10 min-h-screen fixed top-0 left-0 overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-gold-400">LUXE</h1>
          </Link>
          <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        
        {/* Admin User Info */}
        <div className="px-4 py-3 mx-4 mt-2 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center gap-3">
          <FiShield className="text-gold-400" />
          <div>
            <p className="text-white/70 text-xs">Logged in as</p>
            <p className="text-white text-sm font-medium">{adminUser}</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gold-400/10 text-gold-400 border border-gold-400/20' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="text-lg" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-zinc-900/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-all w-full group"
          >
            <FiLogOut className="text-lg group-hover:rotate-180 transition-transform duration-300" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
