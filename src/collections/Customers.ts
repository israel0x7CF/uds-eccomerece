import { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'customer_name',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  endpoints: [
    {
      path: '/upsertcustomer',
      method: 'patch',
      handler: async (req) => {
        const payloadRef = await req.payload
        let data
        if (req.json) {
          data = await req?.json()
          console.log("customer data",data)
          const customer = await payloadRef.find({
            collection: 'customers',
            where: {
              email: {
                equals: data.email,
              },
            },
          })
          console.log(customer)
          if (customer.totalDocs === 0) {
            const customerInformation = {
              customer_name: data.customer_name,
              email: data.email,
              phone: data.phone,
            }
            const newCustomer = await payloadRef.create({
              collection: 'customers',
              data: customerInformation,
            })
            if (newCustomer) {
              console.log('prespective')
            }
          }
        }
        return Response.json('power')
      },
    },
  ],
  fields: [
    {
      name: 'customer_name',
      type: 'text',
      label: 'Customer Name',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Customer Phone',
    },
  ],
}
