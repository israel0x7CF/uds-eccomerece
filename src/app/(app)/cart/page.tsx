'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Leaf, Minus, Plus, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useProductCart } from '@/hooks/cart'
import { Product, productBasket } from '@/app/types/type'
import { CheckOutComponent } from '@/components/CheckOutComponenet'
import FeaturedProducts from '@/components/FeaturedProducts'

export default function CartPage() {
  const { state, dispatch } = useProductCart()
  const { items } = state
  const [cartItems, setCartItems] = useState<Product[]>(items)

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, orderQunatity: Math.max(0, newQuantity) } : item,
      ),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.orderQunatity || 1),
    0,
  )
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Product</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_HOST_URL + item.image.value.url ||
                            `/placeholder.svg?height=200&width=300&text=${item.productName}`
                          }
                          alt={item.productName}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, (item.orderQunatity || 1) - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="0"
                            value={item.orderQunatity}
                            // onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-16 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, (item.orderQunatity || 1) + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${Number(item.price).toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        ${(Number(item.price) * (item.orderQunatity || 1)).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {/* onClick={() => removeItem(item.id)} */}
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-full px-2">
                    <CheckOutComponent productPrice={String(subtotal || '')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <FeaturedProducts />
      </main>

      <footer className="bg-muted text-muted-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ShitayeHerbs. All rights reserved.</p>
        </div>
      </footer>
  
    </div>
  )
}
