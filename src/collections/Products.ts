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
      admin:{
        description:"Featured Products Appear On The Home Page Of The Website"
      }
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
