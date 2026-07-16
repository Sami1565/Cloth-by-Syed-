/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config) => {
    config.externals = [...config.externals, 'canvas', 'jsdom']
    return config
  },
}

module.exports = nextConfig
