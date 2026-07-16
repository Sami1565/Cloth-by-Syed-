'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminUser', username)
      router.push('/admin')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'black', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        background: 'rgba(255,255,255,0.05)', 
        padding: '40px', 
        borderRadius: '24px',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ textAlign: 'center', color: '#d4af37' }}>LUXE Admin</h1>
        <p style={{ textAlign: 'center', color: 'gray' }}>Login to access dashboard</p>
        
        {error && (
          <div style={{ 
            background: 'rgba(255,0,0,0.2)', 
            padding: '10px', 
            borderRadius: '8px',
            color: 'red',
            marginTop: '15px'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'gray' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid #333',
                borderRadius: '8px',
                color: 'white'
              }}
              placeholder="admin"
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'gray' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid #333',
                borderRadius: '8px',
                color: 'white'
              }}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#d4af37',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="/" style={{ color: 'gray', textDecoration: 'none' }}>← Back to Site</a>
        </div>
      </div>
    </div>
  )
}
