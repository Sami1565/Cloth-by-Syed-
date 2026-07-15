import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LUXE Studio - Premium 3D Clothing',
  description: 'Experience luxury fashion with immersive 3D product visualization.',
  keywords: '3D clothing, luxury fashion, ecommerce, virtual try-on',
  authors: [{ name: 'LUXE Studio' }],
  openGraph: {
    title: 'LUXE Studio - Premium 3D Clothing',
    description: 'Experience luxury fashion with immersive 3D product visualization.',
    url: 'https://cloth-by-syed-leq1.vercel.app',
    siteName: 'LUXE Studio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXE Studio - Premium 3D Clothing',
    description: 'Experience luxury fashion with immersive 3D product visualization.',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
