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
import { useProductCart } from '@/hooks/cart'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [products, setProducts] = useState<Product[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const { state, dispatch } = useProductCart()
  const router = useRouter()

  useEffect(() => {
    const handleProductFetch = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL + 'products'
      const productsResponse = await fetchData<Product>(url, 'products')
      console.log(productsResponse)
      if (!productsResponse.error) {
        const fetchedProducts = (productsResponse as ApiResponse<Product>).data.docs

        setProducts(fetchedProducts)
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
  const addToCart = (product: Product) => {
    console.log('adding to cart:', product)
    product.orderQunatity = product.orderQunatity ? product.orderQunatity +1 : 1
    dispatch({ type: 'ADD_ITEM', payload: product })
  }
  const removeFromCart = (id: string) => {
    console.log(id)
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Herbs</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_HOST_URL + product.image.value.url ||
                      `/placeholder.svg?height=200&width=300&text=${product.productName}`
                    }
                    alt={product.productName}
                    width={300}
                    height={200}
                    onClick={() => {
                      router.push(`/detail/${product.id}`)
                    }}
                    className="w-full h-48 object-cover max-w-xs transition duration-300 ease-in-out hover:scale-110"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                    <p className="text-muted-foreground mb-2">{product.category}</p>

                    <p className="text-lg font-bold">{parseFloat(product.price).toFixed(2)} ETB</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 space-x-1">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => {
                        router.push(`/detail/${product.id}`)
                      }}
                    >
                      Buy
                    </Button>
                    <div className="flex items-center justify-between border w-full bg-white px-2 py-1 rounded-md">
                      <button
                        className="text-sm text-gray-700 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
                        onClick={() => removeFromCart(product.id)}
                      >
                        -
                      </button>
                      <span className="text-sm font-medium text-gray-900">add</span>
                      <button
                        className="text-sm text-gray-700 bg-green-100 px-2 py-1 rounded hover:bg-green-200"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted text-muted-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ShitayeHerbs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
