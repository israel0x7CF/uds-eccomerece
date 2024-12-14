import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'productName',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  endpoints: [
    {
      path: '/getFeaturedProducts',
      method: 'get',
      handler: async (req) => {
        const payloadRef = await req.payload

        const featuredProducts = await payloadRef.find({
          collection: 'products',
          where: {
            featuredProduct: {
              equals: true,
            },
          },
        })

        return Response.json(featuredProducts)
      },
    },
  ],
  fields: [
    {
      name: 'productName',
      type: 'text',
      label: 'Name',
    },
    {
      name: 'featuredProduct',
      type: 'checkbox',
      label: 'Featured Product',
      admin: {
        description: 'Featured Products Appear On The Home Page Of The Website',
      },
    },

    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'longDescription',
      type: 'text',
      label: 'Details',
    },

    {
      name: 'price',
      type: 'text',
      label: 'Price',
    },
    {
      name: 'width',
      type: 'text',
      label: 'Width',
      admin: {
        condition: (data, siblingData, { user }) => {
          console.log("data:",data)
          return true
        },
      },
    },
    {
      name: 'height',
      type: 'text',
      label: 'Height',
      admin: {
        condition: (data, siblingData, { user }) => {
          console.log(data, siblingData)
          return true
        },
      },
    },
    {
      name: 'potsize',
      type: 'text',
      label: 'Pot Size',
      admin: {
        condition: (data, siblingData, { user }) => {
          console.log(data, siblingData)
          return true
        },
      },
    },
    {
      name: 'Qty',
      type: 'number',
      label: 'Quantity',
    },
    {
      name: 'available',
      type: 'checkbox',
      label: 'availability',
    },
    {
      name: 'productType',
      type: 'select',
      label: 'Product Type',
      options: [
        { value: 'Indoor', label: 'Indoor' },
        { value: 'Hanging', label: 'Hanging' },
        { value: 'Succulent', label: 'Succulent' },
        { value: 'Flowering', label: 'Flowering' },
      ],
    },
    {
      name: 'image',
      type: 'relationship',
      label: 'Product Image',
      relationTo: ['media'],
    },
    {
      name: 'created_at',
      type: 'date',
      label: 'Date Field',
      defaultValue: () => new Date().toISOString().split('T')[0], // Sets default to today's date
      hidden: true,
    },

    {
      name: 'updated_at',
      type: 'date',
      label: 'Date Field',
      defaultValue: () => new Date().toISOString().split('T')[0], // Sets default to today's date
    },
  ],
}
