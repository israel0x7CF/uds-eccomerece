import { Product } from '@/app/types/type'
import React from 'react'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import { redirect } from 'next/navigation'

type props = {
  product: Product
}
const ProductCard: React.FC<props> = (prop) => {
  const product = prop.product
  return (
    <div className="flex-shrink-0  relative overflow-hidden bg-[hsl(var(--primary))] rounded-lg max-w-xs shadow-lg">
      <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: 'scale(1.5)', opacity: 0.1 }}
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            background: 'radial-gradient(black, transparent 60%)',
            transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
            opacity: 0.2,
          }}
        ></div>
        <img
          className="relative w-40"
          src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
          alt="Peace Lily"
        />
      </div>
      <div className="relative text-[hsl(var(--primary-foreground))] px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1 text-[hsl(var(--muted-foreground))]">Indoor</span>
        <div className="flex justify-between">
          <span className="block font-semibold text-xl">{product.productName}</span>
          <span className="block bg-[hsl(var(--background))] rounded-full text-[hsl(var(--primary))] text-xs font-bold px-3 py-2 leading-none flex items-center">
            {product.price}
          </span>
        </div>
        <Button
          className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors
    bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
    hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:bg-[hsl(var(--primary), 0.8)]
    disabled:pointer-events-none disabled:opacity-50"
    onClick={redirect(`/checkout/${product.id}`)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
