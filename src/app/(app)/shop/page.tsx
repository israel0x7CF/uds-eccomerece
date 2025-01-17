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

  const removeFromCart = (id: string) => {
    console.log(id)
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }
  return (
 <div className="min-h-screen bg-background text-foreground">
  <main className="container mx-auto px-6 lg:px-12 xl:px-20 py-8">
    <h1 className="text-3xl font-bold mb-8 text-center lg:text-left">Our Herbs</h1>

    <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
      {/* Left Section (Filters) */}
      {/* <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-sm">
       
      </aside> */}

      {/* Right Section (Products) */}
      <section className="w-full md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {products.map((product) => (
            <Link href={`/detail/${product.id}`} key={product.id}>
              <Card className="relative w-full h-60 lg:h-80 overflow-hidden rounded-lg group">
                {/* Image background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${
                      process.env.NEXT_PUBLIC_HOST_URL + product.image.value.url
                    }')`,
                  }}
                />

                {/* Gradient overlay and text */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-lg font-semibold mb-2 text-white drop-shadow-sm">
                    {product.productName}
                  </h3>
                  <p className="text-lg font-bold text-white drop-shadow-sm">
                    {parseFloat(product.price).toFixed(2)} ETB
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  </main>
</div>

  )
}
