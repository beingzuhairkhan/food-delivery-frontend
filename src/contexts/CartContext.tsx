import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of a single cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the shape of the context's value
interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: { id: string; name: string; price: number }) => void;
  // We will add functions for removing and updating items later
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (itemToAdd: { id: string; name: string; price: number }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        // If item already exists, just increase the quantity
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Otherwise, add the new item with quantity 1
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
    console.log('Cart Items:', cartItems); // For debugging
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to easily use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};