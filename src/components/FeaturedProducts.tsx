'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { payloadProductResponse, Product } from '@/app/types/type'
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import Link from 'next/link'

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [products, setProducts] = useState<Product[]>()

  async function fetchFeaturedProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const client = axios.create({ baseURL: baseUrl })

    const config: AxiosRequestConfig = {
      headers: {
        Accept: 'Application/json',
      } as RawAxiosRequestHeaders,
    }
    const query = 'products/getFeaturedProducts?depth=1'
    try {
      const activeProducts: AxiosResponse<payloadProductResponse> = await client.get(query, config)

      const activeProductsList: Product[] = activeProducts.data.docs
      setProducts(activeProductsList)
    } catch (err) {
      console.log(err)
      return null
    }
  }
  const nextSlide = () => {
    if (products) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }
  }

  const prevSlide = () => {
    if (products) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 2000)

    return () => clearInterval(timer)
  })
  useEffect(() => {
    const featuredProducts = async () => {
      await fetchFeaturedProducts()
    }
    featuredProducts()
  }, [])

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Herbs</h2>
        <div className="relative">
          <div className="flex overflow-hidden">
            {products &&
              products.map((product, index) => (
                <div
                  key={product.id}
                  className={`w-full flex-shrink-0 transition-all duration-300 ease-in-out transform ${
                    index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                  }`}
                  style={{ marginLeft: index === 0 ? `-${currentIndex * 100}%` : 0 }}
                >
                  <Card className="mx-auto max-w-sm overflow-hidden">
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
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href={`detail/${product.id}`}>View</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-background/80 text-foreground hover:bg-background"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-background/80 text-foreground hover:bg-background"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          {products &&
            products.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
