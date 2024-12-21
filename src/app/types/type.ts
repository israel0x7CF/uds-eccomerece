type CaptionNode = {
  type: string
  children: Array<{
    type: string
    children?: Array<{
      type: string
      detail: number
      format: number
      mode: string
      style: string
      text: string
      version: number
    }>
    direction?: string
    fields?: {
      linkType: string
      newTab: boolean
      url: string
    }
    format?: string
    indent?: number
    textFormat?: number
    version: number
  }>
  direction: string
  format: string
  indent: number
  version: number
}

type Image = {
  id: string
  alt: string
  caption: {
    root: CaptionNode
  }
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
  createdAt: string
  updatedAt: string
  url: string
  thumbnailURL: string | null
}

export type Product = {
  id: string
  productName: string
  description: string
  price: string
  Qty: number
  category:string
  available: boolean
  image: {
    relationTo: string
    value: Image
  }
  createdAt: string
  updatedAt: string
  created_at: string
  updated_at: string
  orderQunatity?:number
}

export interface Customers {
  id: string
  customer_name: string
  email: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: {
    docs: T[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
  }
  error: string | null
}

export interface ApiResponseSingleFetch<T> {
  data: T
  error: string | null
}

export interface checkoutSchema {
  amount: number
  currency: string | 'ETB'
  email: string
  first_name: string
  last_name: string
  phone_number: string
  tx_ref: string
}


export interface Root {
  message: string
  status: string
  data: Data
}

export interface Data {
  checkout_url: string
}
export interface payloadProductResponse{

    docs: Product[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: any;
    nextPage: any;
  
}
export interface productBasket{
  items:Product[]
}
export type Action =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INITIALIZE_CART';  payload: Product[]}
  ;

export type ContextProps = {
  state: productBasket;
  dispatch: React.Dispatch<Action>;

};
