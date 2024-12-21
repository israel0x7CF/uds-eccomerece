import { Action, ContextProps, Product, productBasket } from '@/app/types/type';
import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react';

const initialState: productBasket = {
  items: [],
};

const productReducer = (state: productBasket, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case 'INITIALIZE_CART':
      return { ...state, items: action.payload };  // Initialize full cart from localStorage
    default:
      return state;
  }
};

const ProductCartContext = createContext<ContextProps | undefined>(undefined);

function ProductCart({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialCartState());
  const [isLoaded, setValueLoaded] = useState<boolean>(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('product_cart', JSON.stringify(state));
  }, [state]);

  // Initialize cart state from localStorage on mount
  function initialCartState() {
    const savedCart = localStorage.getItem('product_cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return initialState;
  }

  return (
    <ProductCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductCartContext.Provider>
  );
}

export const useProductCart = () => {
  const context = useContext(ProductCartContext);
  if (!context) {
    throw new Error('useProductCart must be used within a ProductCartProvider');
  }
  return context;
};

export default ProductCart;
