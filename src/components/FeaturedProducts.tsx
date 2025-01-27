'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { payloadProductResponse, Product } from '@/app/types/type'
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import Link from 'next/link'

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <Card
              key={product.id}
              className="mx-auto w-full sm:w-72 lg:w-80 h-auto overflow-hidden rounded-lg shadow-md bg-white"
            >
              <Image
                src={
                  product.image?.value?.url
                    ? process.env.NEXT_PUBLIC_HOST_URL + product.image.value.url
                    : `/placeholder.svg?height=200&width=300&text=${product.productName}`
                }
                alt={product.productName}
                width={400}
                height={300}
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.productName}</h3>
                <p className="text-lg font-bold text-green-700">
                  ${Number(product.price).toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link
                  className="w-full text-center hover:bg-green-800 hover:text-white font-medium rounded-lg text-sm px-4 py-2"
                  href={`/detail/${product.id}`}
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
