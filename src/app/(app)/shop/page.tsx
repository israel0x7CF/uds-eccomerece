'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Leaf, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { ApiResponse, Product } from '@/app/types/type'
import fetchData from '@/app/utils/fetch'
import Link from 'next/link'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleProductFetch = async () => {
      setIsLoading(true)
      const url = process.env.NEXT_PUBLIC_API_URL + 'products'
      const productsResponse = await fetchData<Product>(url, 'products')

      if (!productsResponse.error) {
        const fetchedProducts = (productsResponse as ApiResponse<Product>).data.docs
        setProducts(fetchedProducts)
      } else {
        console.error(productsResponse.error)
      }
      setIsLoading(false)
    }

    handleProductFetch()
  }, [])

  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(product.price) // Convert price to number
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      categoryFilter === 'All' || product.productType === categoryFilter
    const matchesPriceRange =
      productPrice >= priceRange[0] && productPrice <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPriceRange
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          <aside className="w-full md:w-1/4">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Search</h2>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Category</h2>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Hanging">Hanging</SelectItem>
                    <SelectItem value="Indoor">Indoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                <Slider
                  defaultValue={[(priceRange[1]/2)]}
                  min={priceRange[0]}
                  max={priceRange[1]}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="w-full md:w-3/4">
            {isLoading ? (
              <p>Loading...</p>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card className="mx-auto max-w-sm overflow-hidden" key={product.id}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_HOST_URL + product.image.value.url ||
                      `/placeholder.svg?height=200&width=300&text=${product.productName}`
                    }
                    alt={product.productName}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
                    <p className="text-lg font-bold text-primary">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link
                      className="w-full text-white bg-primary hover:bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-primary-foreground hover:bg-primary/90"
                      href={`/detail/${product.id}`}
                    >
                      View
                    </Link>
                  </CardFooter>
                </Card>
                ))}
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
