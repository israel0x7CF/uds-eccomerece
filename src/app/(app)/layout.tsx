'use client'
import React from 'react'
import './globals.scss'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import Navbar from '@/components/NavBar'

import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'
const ProductCart = dynamic(() => import('@/hooks/cart'), { ssr: false })
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Define your theme conditionally, or simply use 'theme-custom' if you want it globally
  const themeClass = 'theme-custom' // or add logic to toggle between themes

  return (
    <html lang="en">
      <body className={cn('min-h-screen w-full flex', inter.className, themeClass)}>
        {/* Sidebar */}
        {/* main page */}
        <div className="w-full">
          <ProductCart>
            <Navbar />
            {children}
            <Footer />
          </ProductCart>
        </div>
      </body>
    </html>
  )
}

export default Layout
