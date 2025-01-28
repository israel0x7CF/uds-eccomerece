'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import { ChevronLeft, Minus, Plus, Leaf, Droplet, Sun, ThermometerSun, Coffee } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import axios from 'axios'
import { Product } from '@/app/types/type'
import { useProductCart } from '@/hooks/cart'
import LexicalProcessor from '@/components/LexicalProcessor'
import FeaturedProducts from '@/components/FeaturedProducts'

type Props = {
    params: Promise<{
      slug: string
    }>
  }

export default function ProductDetail({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { slug } = use(params)
  const { state, dispatch } = useProductCart()

  const addToCart = (product: Product) => {
    product.orderQunatity = product.orderQunatity ? product.orderQunatity + 1 : 1
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  // Fetch the product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get<Product>(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`
        )
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }

    fetchProductDetails()
  }, [slug])

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  if (!product) {
    return <p>Loading...</p>
  }

  const images = product.image?.value?.url
    ? [process.env.NEXT_PUBLIC_HOST_URL + product.image.value.url]
    : ['/placeholder.svg']

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/shop" className="inline-flex items-center text-purple-800 hover:text-purple-900 mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to herbs
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={images[selectedImage] || '/placeholder.svg'}
              alt={product.productName}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-md border ${
                  selectedImage === index ? 'ring-2 ring-purple-800' : ''
                }`}
              >
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">{product.productName}</h1>
            <h5 className="text-xl italic">{product.botanicalName || "no botanical name"}</h5>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-semibold">Br.{Number(product.price).toFixed(2)}</span>
            <span className="text-sm text-gray-500">Price includes VAT</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-medium">About this product</h2>
            <p className="text-gray-600">
              {product.description|| 'No additional details.'}
            </p>
            

          </div>
          <div className="space-y-1">
            <h2 className="font-medium">Pot Size</h2>
            <p className="text-gray-600">
              {product.width+"X"+product.height|| 'No additional details.'}
            </p>
            

          </div>

          <Card>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
              <div className="text-center space-y-2">
                {product.productType === 'herb' ?  (
                  <>
                  <div className="mx-auto w-fit p-2 rounded-full bg-purple-50">
                    {/* <Sun className="h-5 w-5 text-purple-800" /> */}
                    <Leaf className="h-5 w-5 text-purple-800"/>
                  </div>
                  <p className="text-sm">Herb</p>
                  </>

                ) : <></>}
              <div className="text-center space-y-2">
                {product.productType === 'herbal_teas' ?  (
                  <>
                  <div className="mx-auto w-fit p-2 rounded-full bg-purple-50">
                    {/* <Sun className="h-5 w-5 text-purple-800" /> */}
                    <Coffee className="h-5 w-5 text-purple-800"/>
                  </div>
                  <p className="text-sm">Herb</p>
                  </>

                ) : <></>}
              </div>
              </div>

            </CardContent>
          </Card>

          <Tabs defaultValue="usage" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger  value="usage" >Usage</TabsTrigger>
              {/* <TabsTrigger value="description">Description</TabsTrigger> */}
              <TabsTrigger value="Detail">Detail</TabsTrigger>
            </TabsList>
            <TabsContent  value="usage" className="text-gray-600">
            {product.usage ? <LexicalProcessor serializedState={product.usage as any} /> : null}
            </TabsContent>

            <TabsContent value="Detail" className="text-gray-600">
              {product.longDescription}
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-6 pt-6 border-t">
            <Button className="flex-1 hover:bg-sage-green/90" onClick={()=>{addToCart(product)}}>Add to basket</Button>
          </div>
        </div>
      </div>
      <FeaturedProducts />
    </div>
  )
}
