import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'productName',
  },
  fields: [
    {
      name: 'productName',
      type: 'text',
      label: 'Name',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
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
