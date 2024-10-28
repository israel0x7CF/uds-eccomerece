import { CollectionConfig } from "payload";
import { v4 as uuidv4 } from 'uuid';

export const Orders: CollectionConfig = {
    slug:"orders",
    admin:{
        useAsTitle:"order_identifier"
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
      },
    fields:[
        {
            name:"order_identifier",
            type:'text',
            label:"Order Code",
            defaultValue:uuidv4(),
            admin:{
                readOnly:true
            }
        },
        {
            name:"order_customer",
            type:'relationship',
            label:"Customer",
            relationTo:"customers"
        },
        {
            name:"order_product",
            type:'relationship',
            label:"Product",
            relationTo:"products"
        },
        {
            name:"quantity",
            type:'number',
            label:"Product",
          
        },
        {
            name:"status",
            type:'select',
            label:"Status",
            options:[
                {
                    label:"Waiting For Delivery",
                    value:"pending"
                },
                {
                    label:"delivered",
                    value:"delivered"
                },

            ]
        },
        {
            name:"payment_status",
            type:'select',
            label:"Status",
            options:[
                {
                    label:"Waiting For Payment",
                    value:"pending"
                },
                {
                    label:"paid",
                    value:"paid"
                },

            ]
        },
        {
            name: 'order_date',
            type: 'date',
            label: 'Order Date',
            defaultValue: () => new Date().toISOString().split('T')[0], // Sets default to today's date
            admin:{
                readOnly:true
            }
          },
    ]
}