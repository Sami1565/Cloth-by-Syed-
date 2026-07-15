'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiHome, 
  FiBox, 
  FiShoppingBag, 
  FiUsers, 
  FiStar, 
  FiPercent, 
  FiBarChart2,
  FiSettings,
  FiLogOut
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

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900/50 border-r border-white/10 min-h-screen fixed top-0 left-0 overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-gold-400">LUXE</h1>
          <p className="text-xs text-white/30 uppercase tracking-widest">Admin Panel</p>
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

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all w-full">
            <FiLogOut className="text-lg" />
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
