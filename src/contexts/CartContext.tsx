import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface PizzaFormulation {
  size: {
    id: string;
    name: string;
    price: number;
  };
  crust: {
    id: string;
    name: string;
    price: number;
  };
  sauceAmount: {
    id: string;
    name: string;
    price: number;
  };
  cheeseAmount: {
    id: string;
    name: string;
    price: number;
  };
  cookingPreference: {
    id: string;
    name: string;
  };
  specialInstructions?: string[];
}

export interface PizzaItem {
  base: {
    id: string;
    name: string;
    price: number;
  };
  sauce: {
    id: string;
    name: string;
    price: number;
  };
  cheese: {
    id: string;
    name: string;
    price: number;
  };
  veggies: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  formulation: PizzaFormulation;
  totalPrice: number;
}

interface CartContextType {
  items: PizzaItem[];
  addToCart: (pizza: PizzaItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  totalAmount: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PizzaItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setItems(parsedCart);
    }
  }, []);

  useEffect(() => {
    const newTotal = items.reduce((total, item) => total + item.totalPrice, 0);
    setTotalAmount(newTotal);
    setItemCount(items.length);
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (pizza: PizzaItem) => {
    setItems([...items, pizza]);
    toast.success('Pizza added to cart!');
  };

  const removeFromCart = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    toast.info('Item removed from cart');
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    totalAmount,
    itemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};