'use client'
import { Product } from '@/app/types/type'
import React from 'react'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardFooter } from './ui/card'
import Link from 'next/link'
import Image from 'next/image'

type props = {
  product: Product
}
const ProductCard: React.FC<props> = (prop) => {
  const product = prop.product
  return (
    <Card className="mx-auto max-w-sm overflow-hidden" key={product.id}>
    <Image
      src={
        process.env.NEXT_PUBLIC_HOST_URL + product.image.value.url ||
        `/placeholder.svg?height=200&width=300&text=${product.productName}`
      }
      alt={product.productName}
      width={200}
      height={200}
      className="w-full h-58 object-cover"
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
  )
}

export default ProductCard
