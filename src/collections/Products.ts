import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

const computePotSize: CollectionBeforeChangeHook = async ({ data }) => {
  if (data.height && data.width) {
    data.potsize = Number(data.height) * Number(data.width)
  }
  return data
}

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
      name: 'botanicalName',
      type: 'text',
      label: 'Botanical Name',
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
      type: 'textarea',
      label: 'Description',
    },

    {
      name: 'longDescription',
      type: 'textarea',
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
    },
    {
      name: 'height',
      type: 'text',
      label: 'Height',
    },
    {
      name: 'potsize',
      type: 'text',
      label: 'Pot Size',
      admin: {
        condition: (data, siblingData, { user }) => {
          if (siblingData.potsize || data.potsize) {
            return true
          }
          return false
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
      defaultValue:"herb",
      options: [
        { value: 'herb', label: 'herb' },
        { value: 'herbal_teas', label: 'Herbal teas' },

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
    {
      name: 'usage',
      type: 'richText',
      label: 'Usage',
    },
  ],
  hooks: {
    beforeChange: [computePotSize],
  },
}
