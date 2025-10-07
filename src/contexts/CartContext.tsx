import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import useGeolocation from '../hooks/useGeolocation'
// Define the MenuItem interface to match our GraphQL schema
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
  isVegetarian: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isAvailable?: boolean;
}

// Define the shape of a single cart item (extends MenuItem with quantity)
export interface CartItem extends MenuItem {
  quantity: number;
}

// Define the shape of the context's value
interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: MenuItem) => void;
  removeItemFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);



// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const {user} = useAuth()
  const { location, coords } = useGeolocation();
  console.log("Lo",location)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

 const addItemToCart = (itemToAdd: MenuItem,) => {
  console.log("cart", itemToAdd);

  setCartItems(prevItems => {
    const existingItem = prevItems.find(item => item.id === itemToAdd.id);
    let updatedCart;

    if (existingItem) {
      // If item already exists, just increase the quantity
      updatedCart = prevItems.map(item =>
        item.id === itemToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Otherwise, add the new item with quantity 1
      updatedCart = [...prevItems, { ...itemToAdd, quantity: 1 }];
    }

    // 🔹 Store simplified data in localStorage
    const simplifiedCart = updatedCart.map(item => ({
      foodName: item.name,
      count: item.quantity,
      totalPrice: item.price * item.quantity,
      userId: user?._id,
      foodId:item.id
    }));

    localStorage.setItem("cartData", JSON.stringify(simplifiedCart));

    return updatedCart;
  });
};

  const removeItemFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('cartData');
    } catch (e) {
      // ignore
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Keep localStorage cartData in sync with cartItems
  useEffect(() => {
    try {
      if (cartItems.length === 0) {
        localStorage.removeItem("cartData");
      } else {
        const simplifiedCart = cartItems.map(item => ({
          foodName: item.name,
          count: item.quantity,
          totalPrice: item.price * item.quantity,
          userId: user?._id,
          foodId: item.id
        }));
        localStorage.setItem("cartData", JSON.stringify(simplifiedCart));
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [cartItems, user?._id]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addItemToCart, 
      removeItemFromCart, 
      updateQuantity, 
      clearCart, 
      getCartTotal, 
      getItemCount 
    }}>
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