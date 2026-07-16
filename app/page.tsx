export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'black', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#d4af37', fontSize: '48px' }}>LUXE STUDIO</h1>
      <p style={{ color: 'gray', marginTop: '10px' }}>Website is working!</p>
      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <a href="/admin-login" style={{ 
          padding: '10px 20px', 
          background: '#d4af37', 
          color: 'black', 
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Admin Login
        </a>
        <a href="/admin" style={{ 
          padding: '10px 20px', 
          border: '1px solid #333', 
          color: 'white', 
          borderRadius: '30px',
          textDecoration: 'none'
        }}>
          Admin Panel
        </a>
      </div>
    </div>
  )
}
