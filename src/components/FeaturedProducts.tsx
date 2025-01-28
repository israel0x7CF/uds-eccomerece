'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { payloadProductResponse, Product } from '@/app/types/type'
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])

  // Fetch featured products
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
      console.error(err)
    }
  }

  // Fetch products on component mount
  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary">Popular Herbs</h2>
          <a href="/shop" className="text-red-600 font-medium hover:underline">
            View more &gt;
          </a>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card className="overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_HOST_URL + product.image.value.url ||
                        `/placeholder.svg?height=200&width=300&text=${product.productName}`
                      }
                      alt={product.productName}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{product.productName}</h3>
                    <p className="text-lg font-bold text-primary">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link
                      className="w-full text-white bg-primary hover:bg-primary/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                      href={`/detail/${product.id}`}
                    >
                      View
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 rounded-full p-2 shadow-lg" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 rounded-full p-2 shadow-lg" />
        </Carousel>
      </div>
    </section>
  )
}