// components/Navbar.tsx
"use client"
import { Button } from '@/components/ui/button'
import { useProductCart } from '@/hooks/cart'
import { Leaf, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { state, dispatch } = useProductCart()
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">ShitayeHerbs</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-secondary text-secondary-foreground hover:bg-secondary/80"
          onClick={()=>{router.push("/cart")}}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {state.items.length}
          </span>
        </Button>
      </div>
    </header>
  )
}
