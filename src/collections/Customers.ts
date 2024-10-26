import { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
    slug:"customers",
    admin:{
        useAsTitle:"customer_name"
    },
    fields:[
        {
            name:"customer_name",
            type:'text',
            label:"Customer Name"
        },
        {
            name:"email",
            type:'text',
            label:"Email"
        },
        {
            name:"phone",
            type:'text',
            label:"Customer Name"
        },
    ]
}