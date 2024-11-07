'use client'
import React, { use, useEffect, useState } from 'react'
import fetchData from '@/app/utils/fetch'
import { Product } from '@/app/types/type'
import { useRouter } from 'next/navigation'
import { ApiResponseSingleFetch } from '@/app/types/type'
import { CheckOutComponent } from '@/components/CheckOutComponenet'

type Props = {
  params: Promise<{
    slug: string
  }>
}

function page({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { slug } = use(params)

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}products/${slug}`

      try {
        const productResponse = await fetchData<Product>(url, 'products', true)

        if ((productResponse as ApiResponseSingleFetch<Product>).error) {
          setError('Failed to fetch product')
        } else {
          const fetchedProduct = (productResponse as ApiResponseSingleFetch<Product>).data
          setProduct(fetchedProduct)
        }
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unknown error')
      }
    }

    fetchProduct()
  }, [slug])

  // Check if product is null and return a fallback UI
  if (!product) {
    return <div>Loading product details...</div>
  }

  return (
    <div className="bg-background dark:bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-card dark:bg-card mb-4">
              <img
                className="w-full h-full object-cover"
                src={product.image?.value?.url ? `${process.env.NEXT_PUBLIC_HOST_URL}${product.image.value.url}` : ''}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-full px-2">
                <CheckOutComponent productPrice={product.price || ''} />
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-foreground dark:text-foreground mb-2">
              {product.productName || 'Product Name'}
            </h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-muted-foreground dark:text-muted-foreground">
                  Price: {product.price || 'N/A'} ETB
                </span>
              </div>
              <div>
                <span className="font-bold text-muted-foreground dark:text-muted-foreground">
                {product.available ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold text-muted-foreground dark:text-muted-foreground">
                Product Description:
              </span>
              <p className="text-muted-foreground dark:text-muted-foreground text-sm mt-2">
                {product.description || 'No description available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
