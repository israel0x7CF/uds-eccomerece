"use client"
import React from 'react'
import './globals.scss'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Define your theme conditionally, or simply use 'theme-custom' if you want it globally
  const themeClass = 'theme-custom'; // or add logic to toggle between themes

  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen w-full flex',
          inter.className,
          themeClass
        )}
      >
        {/* Sidebar */}
        {/* main page */}
        <div className="p-8 w-full">{children}</div>
      </body>
    </html>
  )
}

export default Layout
