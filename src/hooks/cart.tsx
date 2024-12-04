import { Action, ContextProps, Product, productBasket } from '@/app/types/type'
import React, { createContext, ReactNode, useContext, useReducer } from 'react'

type Props = {}
const initialState: productBasket = {
  items: [],
}
const productReducer = (state: productBasket, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state,items: [...state.items, action.payload] }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) }
  }
}
const ProductCartContext = createContext<ContextProps | undefined>(undefined)
const cartDispatch = createContext(null)
function ProductCart({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialState)
  return (
    <ProductCartContext.Provider value={{ state, dispatch }}>
     {children}
    </ProductCartContext.Provider>
  )
}

export const useProductCart = () => {
  const context = useContext(ProductCartContext)
  if (!context) {
    throw new Error('useProductCart must be used within a ProductCartProvider')
  }
  return context
}

export default ProductCart
