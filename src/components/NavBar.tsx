// components/Navbar.tsx

import { Button } from '@/components/ui/button'
import { Leaf, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">PlantParadise</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        {/* <Button
          variant="outline"
          size="icon"
          className="relative bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </Button> */}
      </div>
    </header>
  )
}
