'use client'

import Link from 'next/link'

export default function Collections() {
  const collections = [
    { name: 'Men', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop', items: 45 },
    { name: 'Women', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=400&fit=crop', items: 38 },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop', items: 22 },
    { name: 'New Arrivals', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop', items: 12 },
    { name: 'Sale', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop', items: 8 },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gold-400">LUXE</h1>
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase hidden sm:inline">Studio</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-light">
            <Link href="/" className="hover:text-gold-300 transition">Home</Link>
            <Link href="/shop" className="hover:text-gold-300 transition">Shop</Link>
            <Link href="/collections" className="text-gold-400 transition">Collections</Link>
            <Link href="/about" className="hover:text-gold-300 transition">About</Link>
            <Link href="/contact" className="hover:text-gold-300 transition">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 rounded-full bg-gold-400 text-black text-sm font-medium hover:bg-gold-300 transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Collections Content */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-light tracking-widest mb-4">OUR <span className="text-gold-400">COLLECTIONS</span></h1>
        <p className="text-white/50 mb-12">Explore our curated collections for every style</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link href={`/collections/${collection.name.toLowerCase()}`} key={collection.name}>
              <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${collection.image})` }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-light tracking-widest text-white">{collection.name}</h3>
                  <p className="text-white/50 text-sm">{collection.items} products</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/40 rounded-2xl transition z-30" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/50 text-sm">
          <div>
            <span className="text-white/90 font-bold text-lg block mb-2">LUXE</span> 
            © 2026 — 3D fashion house.
          </div>
          <div>
            <p className="text-white/80 font-medium">Shop</p>
            <Link href="/shop" className="hover:text-white/80 cursor-pointer block">All Products</Link>
            <Link href="/collections/men" className="hover:text-white/80 cursor-pointer block">Men</Link>
            <Link href="/collections/women" className="hover:text-white/80 cursor-pointer block">Women</Link>
          </div>
          <div>
            <p className="text-white/80 font-medium">Info</p>
            <Link href="/about" className="hover:text-white/80 cursor-pointer block">About</Link>
            <Link href="/contact" className="hover:text-white/80 cursor-pointer block">Contact</Link>
          </div>
          <div>
            <p className="text-white/80 font-medium">Follow</p>
            <p className="hover:text-white/80 cursor-pointer">Instagram</p>
            <p className="hover:text-white/80 cursor-pointer">Twitter</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
