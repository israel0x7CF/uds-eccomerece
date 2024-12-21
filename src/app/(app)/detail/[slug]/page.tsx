'use client'
import React, { useEffect, useState, use } from 'react'
import fetchData from '@/app/utils/fetch'
import { Product } from '@/app/types/type'
import { useRouter } from 'next/navigation'
import { ApiResponseSingleFetch } from '@/app/types/type'
import FeaturedProducts from '@/components/FeaturedProducts'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useProductCart } from '@/hooks/cart'

type Props = {
  params: Promise<{
    slug: string
  }>
}
function Page({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { slug } = use(params)
  const { state, dispatch } = useProductCart()

  const addToCart = (product: Product) => {
 
    product.orderQunatity = product.orderQunatity ? product.orderQunatity + 1 : 1
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL || ''}products/${slug}`

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
    return <div className="text-center text-gray-600">Loading product details...</div>
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Product Image and Checkout */}
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-white dark:bg-gray-800 mb-4">
              <img
                className="w-full h-full object-cover"
                src={
                  product.image?.value?.url
                    ? `${process.env.NEXT_PUBLIC_HOST_URL}${product.image.value.url}`
                    : ''
                }
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-full px-2">
                <Button
                  className="flex items-center space-x-2 text-sm text-gray-700 bg-green-100 px-2 py-1 rounded hover:bg-green-200"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                  <ShoppingCart />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
              {product.productName || 'Product Name'}
            </h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-600 dark:text-gray-400">
                  Price: {product.price || 'N/A'} ETB
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-600 dark:text-gray-400">
                  {product.available ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-600 dark:text-gray-400">
                Product Description:
              </span>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                {product.description || 'No description available'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts />
    </div>
  )
}

export default Page
