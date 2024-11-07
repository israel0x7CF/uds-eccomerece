'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Search, ShoppingCart, Facebook, Twitter, Instagram, Sun, Droplet, Wind } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'} text-foreground`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-2xl font-bold text-primary">PlantParadise</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="#" className="text-foreground hover:text-primary transition-colors">Shop</Link>
            <Link href="#" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="relative bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                Bring Nature Indoors
              </h1>
              <p className="text-xl mb-8 animate-fade-in-up animation-delay-200">
                Discover the perfect plants to transform your space into a green oasis.
              </p>
              <Button size="lg" className="animate-fade-in-up animation-delay-400 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-glow">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-transparent"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Plants background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </section>

        <section className="py-20 bg-card text-card-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose PlantParadise?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card text-card-foreground">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Sun className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Expert Plant Care Advice</h3>
                  <p className="text-muted-foreground">Our team of horticulturists provides personalized care tips for every plant you purchase.</p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Droplet className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
                  <p className="text-muted-foreground">We're committed to eco-friendly packaging and responsible sourcing of all our plants.</p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Wind className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Air-Purifying Selection</h3>
                  <p className="text-muted-foreground">Discover our curated collection of air-purifying plants to improve your indoor air quality.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Transform Your Space</h2>
                <p className="text-muted-foreground mb-6">
                  Plants do more than just look pretty. They can boost your mood, increase productivity, and clean the air around you. At PlantParadise, we're passionate about helping you create a greener, healthier home or office.
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Explore Our Collection
                </Button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Transformed space with plants"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Shop</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Plant Care Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p>&copy; 2024 PlantParadise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Add these styles to your global CSS file
const styles = `
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.hover\:shadow-glow:hover {
  box-shadow: 0 0 15px rgba(var(--primary), 0.5);
}
`