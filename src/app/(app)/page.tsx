import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Search, Menu, Leaf, Droplet, Sun } from 'lucide-react'
import AnimatedButton from '@/components/customButton'
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import { ApiResponse, payloadProductResponse, Product } from '../types/type'

async function fetchFeaturedProducts(): Promise<Product[] | null> {
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
    return activeProductsList
  } catch (err) {
    console.log(err)
    return null
  }
}

export default async function PlantSalesLandingPage() {
  const activeProducts = await fetchFeaturedProducts()
  const assetUrl = process.env.NEXT_PUBLIC_HOST_URL

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="relative h-[70vh]">
          <Image src="/newname.png" alt="Beautiful plants" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Bring Nature Into Your Home
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Discover our wide selection of Herbs to transform your space.
              </p>
              <div className="flex justify-center">
                <AnimatedButton url="/shop" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ShitayeHerbs?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: 'Expert Plant Selection',
                  description: 'Carefully curated plants for every environment.',
                },
                {
                  icon: Droplet,
                  title: 'Care Instructions',
                  description: 'Detailed guides to keep your plants thriving.',
                },
                {
                  icon: Sun,
                  title: 'Satisfaction Guarantee',
                  description: '30-day happiness guarantee for all plants.',
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <item.icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold mb-4 text-[#0d2617]">Get Plant Care Tips</h2>
                <p className="text-xl mb-6 text-[#0d2617]">
                  Subscribe to our newsletter for expert advice on keeping your plants healthy and
                  happy.
                </p>
                {/* <div className="flex">
                  <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
                  <Button type="submit" className="rounded-l-none">
                    Subscribe
                  </Button>
                </div> */}
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/homegarden.jpg"
                  alt="Plant care tips"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Featured Herbs</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      {activeProducts &&
        activeProducts.map((plant) => (
          <div key={plant.id}>
            <Link href={`/detail/${plant.id}`} className="cursor-pointer">
              <div
                key={plant.productName}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <Image
                  src={assetUrl + plant.image.value.url}
                  alt={plant.productName}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {plant.productName}
                    </h3>
                    <h2 className="text-xl font-semibold mb-2 text-white">
                      Br.{plant.price}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={`/detail/${plant.id}`} className="text-white hover:underline">
              Learn More
            </Link>
          </div>
        ))}
    </div>
  </div>
</section>


        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#0d2617]">
              Ready to Start Your Plant Journey?
            </h2>
            <Button size="lg">
              {' '}
              <Link href="/shop">Shop All Plants</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
