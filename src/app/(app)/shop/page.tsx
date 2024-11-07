'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Leaf, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ApiResponse, Product } from '@/app/types/type'
import fetchData from '@/app/utils/fetch'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [products, setProducts] = useState<any[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const router = useRouter()

  useEffect(() => {
    const handleProductFetch = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL + 'products'
      const productsResponse = await fetchData<Product>(url, 'products')
      console.log(productsResponse)
      if (!productsResponse.error) {
        const fetchedProducts =(productsResponse as ApiResponse<Product>).data.docs
        console.log(fetchedProducts)
        setProducts(fetchedProducts)

        console.log(products)
      } else {
        console.log(productsResponse.error)
      }
    }

    handleProductFetch()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'All' || product.category === categoryFilter) &&
      parseFloat(product.price) >= priceRange[0] &&
      parseFloat(product.price) <= priceRange[1],
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Plants</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                
                <Card key={product.id} className="overflow-hidden">

                  <Image
                    src={
                      process.env.NEXT_PUBLIC_HOST_URL+product.image.value.url ||
                      `/placeholder.svg?height=200&width=300&text=${product.productName}`
                    }
                    alt={product.productName}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                    <p className="text-muted-foreground mb-2">{product.category}</p>
                    <p className="text-sm mb-2">{product.description}</p>
                    <p className="text-lg font-bold">{parseFloat(product.price).toFixed(2)} ETB</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={()=>{router.push(`/detail/${product.id}`)}}
                    >
                      Buy
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted text-muted-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 PlantParadise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
