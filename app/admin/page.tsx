'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth') === 'true'
    if (!auth) {
      router.replace('/admin-login')
    }
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to admin panel!</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: 'gray' }}>Revenue</p>
          <h2>$48,295</h2>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: 'gray' }}>Orders</p>
          <h2>356</h2>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: 'gray' }}>Customers</p>
          <h2>2,847</h2>
        </div>
      </div>
    </div>
  )
}
