'use client'
import { Product } from '@/app/types/type'
import React from 'react'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter } from './ui/card'
import Link from 'next/link'
import Image from 'next/image'

type props = {
  product: Product
}
const ProductCard: React.FC<props> = (prop) => {
  const product = prop.product
  const router = useRouter()
  return (
    <Card className="mx-auto max-w-sm overflow-hidden flex flex-col h-full" key={product.id}>
      <Image
        src={
          process.env.NEXT_PUBLIC_HOST_URL + product.image.value.url ||
          `/placeholder.svg?height=200&width=300&text=${product.productName}`
        }
        alt={product.productName}
        width={200}
        height={200}
        className="w-full h-58 object-cover hover:cursor-pointer"
        onClick={() => { router.push(`/detail/${product.id}`) }}
      />
      <CardContent className="p-4 flex-grow">
        <h3 className="text-xl font-semibold">{product.productName}</h3>
        <span className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
          {product.botanicalName || "no botanical name"}
        </span>
        <p className="text-lg font-bold text-primary">
          Br.{Number(product.price).toFixed(2)}
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