'use client'
import { Action, ContextProps, Product, productBasket } from '@/app/types/type'
import React, {
  act,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

const initialState: productBasket = {
  items: [],
}

function initialCartState(): productBasket {
  // Handle SSR: return default state during server-side rendering
  if (typeof window === 'undefined') {
    return { items: [] }
  }

  try {
    const savedCart = localStorage.getItem('product_cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      if (Array.isArray(parsedCart.items)) {
        return { items: parsedCart.items } // Ensure items is an array
      }
    }
  } catch (e) {
    console.error('Failed to parse local storage at initialCartState:', e)
  }

  return { items: [] } // Fallback to default state
}

const productReducer = (state: productBasket = { items: [] }, action: Action): productBasket => {
  switch (action.type) {
    case 'ADD_ITEM':
      const id = action.payload.id
      const existingProductIndex = state.items.findIndex((item) => item.id === id)

      if (existingProductIndex !== -1) {
        // Update quantity if item already exists
        const updatedItems = state.items.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              orderQunatity: (item.orderQunatity || 0) + 1,
            }
          }
          return item
        })
        return { ...state, items: updatedItems }
      } else {
        // Add new item to cart
        return {
          ...state,
          items: [...state.items, { ...action.payload, orderQunatity: 1 }],
        }
      }

    case 'UPDATE_ITEMS':
      if (Array.isArray(action.payload)) {
        // Replace the entire items array
        return { ...state, items: action.payload }
      } else {
        // Update or add a single item
        const singleItem = action.payload as Product
        const itemIndex = state.items.findIndex((item) => item.id === singleItem.id)

        if (itemIndex !== -1) {
          const updatedItems = state.items.map((item, index) =>
            index === itemIndex ? { ...item, ...singleItem } : item,
          )
          return { ...state, items: updatedItems }
        } else {
          return { ...state, items: [...state.items, singleItem] }
        }
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case 'INITIALIZE_CART':
      return { ...state, items: action.payload }

    default:
      return state
  }
}

const ProductCartContext = createContext<ContextProps | undefined>(undefined)

function ProductCart({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialCartState())

  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('product_cart', JSON.stringify(state))
      } catch (e) {
        console.error('Failed to save cart to localStorage:', e)
      }
    }
  }, [state, isHydrated])
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
