'use client'

import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Simple 3D Model Component
function Model3D({ color = '#d4af37' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
      position={[0, 0, 0]}
    >
      <boxGeometry args={[2, 3, 1.5]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.7} 
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Loading Fallback
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full text-white/50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading 3D Experience...</p>
      </div>
    </div>
  )
}

// Main 3D Viewer Component
export default function ThreeViewer({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden border border-gold-400/20 bg-zinc-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 backdrop-blur text-white hover:bg-white/20 transition border border-white/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 3D Canvas */}
        <Suspense fallback={<Loader />}>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} />
            <pointLight position={[0, 5, 5]} intensity={0.5} />
            
            <Model3D color="#d4af37" />
            
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              autoRotate={true}
              autoRotateSpeed={3}
              minDistance={3}
              maxDistance={10}
              dampingFactor={0.05}
            />
            <Environment preset="studio" />
          </Canvas>
        </Suspense>

        {/* Controls Info */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 text-white/50 text-xs bg-black/50 backdrop-blur px-4 py-2 rounded-full">
          <span>🔄 Drag to Rotate</span>
          <span>🔍 Scroll to Zoom</span>
          <span>✋ Drag to Pan</span>
        </div>

        {/* Color Options */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          <button 
            onClick={() => {}} 
            className="w-8 h-8 rounded-full bg-[#d4af37] border-2 border-white/20 hover:border-white/60 transition hover:scale-110"
            title="Gold"
          />
          <button 
            onClick={() => {}} 
            className="w-8 h-8 rounded-full bg-black border-2 border-white/20 hover:border-white/60 transition hover:scale-110"
            title="Black"
          />
          <button 
            onClick={() => {}} 
            className="w-8 h-8 rounded-full bg-white border-2 border-white/20 hover:border-white/60 transition hover:scale-110"
            title="White"
          />
          <button 
            onClick={() => {}} 
            className="w-8 h-8 rounded-full bg-red-500 border-2 border-white/20 hover:border-white/60 transition hover:scale-110"
            title="Red"
          />
        </div>

        {/* Title */}
        <div className="absolute top-4 left-6 text-white/30 text-sm tracking-widest">
          LUXE • 3D STUDIO
        </div>
      </div>
    </div>
  )
}
