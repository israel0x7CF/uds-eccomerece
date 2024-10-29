import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Store } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { v4 as uuidv4 } from 'uuid'

import fetchData from '@/app/utils/fetch'
import { Root } from '@/app/types/type'
import axios from 'axios'
type Props = {
  productPrice: string
}
export function CheckOutComponent(props: Props) {
  const [product, setProduct] = React.useState<string>(props.productPrice)
  const checkoutSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email' }),
    first_name: z.string().min(1, { message: 'First name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    phone_number: z.string().min(1, { message: 'Phone number is required' }),
  })

  type checkoutSchemaType = z.infer<typeof checkoutSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<checkoutSchemaType>({ resolver: zodResolver(checkoutSchema) })

  const onSubmit: SubmitHandler<checkoutSchemaType> = async (data) => {
    const secret = process.env.NEXT_PUBLIC_CHAPPA_API_PRIVATE_KEY
    //make api all to chappa and  checkout the customer
    var myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${secret}`)
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      amount: '10',
      currency: 'ETB',
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      tx_ref: uuidv4(),
      callback_url: 'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
      return_url: 'https://www.google.com/',
      'customization[title]': 'Payment for my favourite merchant',
      'customization[description]': 'I love online payments',
      'meta[hide_receipt]': 'true',
    })
    //create order
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }
    try {
        console.log("making request")
      const response = await axios.post<Root>(
        'https://api.chappa.com/checkout', // Replace with the actual Chappa API endpoint
        {
          amount: '10',
          currency: 'ETB',
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          tx_ref: uuidv4(),
          callback_url: 'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
          return_url: 'https://www.google.com/',
          customization: {
            title: 'Payment for my favourite merchant',
            description: 'I love online payments',
          },
          meta: {
            hide_receipt: 'true',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${secret}`,
            'Content-Type': 'application/json',
          },
        },
      )

      console.log(response.data)
    } catch (error) {
      console.error('Error creating Chappa checkout:', error)
      throw error // Re-throw the error after logging
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-full flex items-center justify-center bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground py-2 px-4 rounded-full font-bold hover:bg-accent dark:hover:bg-accent">
          <Store className="mr-2" />
          <span>Purchase</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Checkout</DrawerTitle>
            <DrawerDescription>Complete your purchase details.</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4 pb-0 space-y-4">
              <div>
                <Label htmlFor="amount">Amount:{product}ETB</Label>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" placeholder="Enter first name" {...register('first_name')} />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">{errors.first_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" placeholder="Enter last name" {...register('last_name')} />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  placeholder="Enter phone number"
                  {...register('phone_number')}
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-sm">{errors.phone_number.message}</p>
                )}
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Check Out</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
