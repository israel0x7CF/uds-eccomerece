'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { payloadProductResponse, Product } from '@/app/types/type'
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCard from './ProductCard'

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
                <ProductCard product={product} />
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
