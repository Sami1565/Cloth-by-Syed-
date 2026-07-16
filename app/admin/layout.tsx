'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth') === 'true'
    if (!auth) {
      router.replace('/admin-login')
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'black', color: 'white', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #333',
        paddingBottom: '15px'
      }}>
        <h1 style={{ color: '#d4af37' }}>LUXE Admin</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('adminAuth')
            localStorage.removeItem('adminUser')
            router.replace('/admin-login')
          }}
          style={{ 
            padding: '8px 16px', 
            background: 'rgba(255,0,0,0.2)', 
            color: 'red', 
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      <div style={{ paddingTop: '20px' }}>
        {children}
      </div>
    </div>
  )
}
