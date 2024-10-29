import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { ApiResponse, Product } from '../types/type'
import fetchData from '../utils/fetch'

export interface ProductResponse {
  data: Product[] // Adjusted to reflect the array of Product directly in `data`
  error: string | null
}

export default async function Shop() {
  const url = process.env.NEXT_PUBLIC_API_URL + 'products'

  const productsResponse = await fetchData<Product>(url, 'products')
  let products: Product[] = [] // Instead of `any`
  let error = null

  if (!productsResponse.error) {
    products = (productsResponse as ApiResponse<Product>).data.docs
  } else {
    error = true
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-[hsl(var(--foreground))] sm:text-5xl xl:text-6xl/none">
                    Your Trusted Source for Natural Wellness
                  </h1>
                  <p className="max-w-[600px] text-[hsl(var(--muted-foreground))] md:text-xl">
                    Empower your well-being with nature’s finest herbs. Discover, select, and enjoy
                    premium herbal remedies to rejuvenate, heal, and nurture your body, mind, and
                    spirit naturally.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors
    bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
    hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:bg-[hsl(var(--primary), 0.8)]
    disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              {/* <img
                src=""
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              /> */}
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tighter text-[hsl(var(--foreground))] text-center sm:text-5xl xl:text-6xl mb-16">
              Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-12 lg:gap-16">
              {products.map((item: Product) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
