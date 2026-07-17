// ===== 3D BUTTON + CATEGORIES SECTION =====
<section className="py-16 px-4 max-w-7xl mx-auto pt-24 sm:pt-28">
  {/* 3D Button - Now Above Categories */}
  <div className="flex justify-center mb-12">
    <button 
      onClick={() => setIs3DViewerOpen(true)}
      className="px-10 sm:px-14 py-4 sm:py-5 bg-[#d4af37] text-black font-bold text-base sm:text-lg tracking-wide hover:bg-[#c5a028] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-[#d4af37]/50 hover:shadow-[#d4af37]/70"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span>View in 3D</span>
    </button>
  </div>

  {/* Categories */}
  <h2 className="text-2xl font-light tracking-widest text-center mb-12">
    SHOP BY <span className="text-[#d4af37]">CATEGORY</span>
  </h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
    {categories.map((category) => (
      <Link 
        key={category.name} 
        href={category.link}
        className={`relative rounded-2xl overflow-hidden group bg-gradient-to-br ${category.color} border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="relative p-6 text-center h-32 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">{category.icon}</span>
          <span className="text-white/90 font-medium text-sm tracking-wider group-hover:text-[#d4af37] transition">
            {category.name}
          </span>
          <span className="text-white/40 text-[10px] tracking-widest mt-1 group-hover:text-[#d4af37] transition">
            SHOP NOW →
          </span>
        </div>
      </Link>
    ))}
  </div>
</section>
