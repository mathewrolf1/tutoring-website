// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'; // Only one import line for React and its hooks

// 1. Create the Cart Context
export const CartContext = createContext();

// 2. Custom Hook for easier context consumption
export const useCart = () => {
  return useContext(CartContext);
};

// 3. CartProvider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCartData = localStorage.getItem('highsteaksJerkyCart');
      return localCartData ? JSON.parse(localCartData) : [];
    } catch (error) {
      console.error("Failed to parse cart data from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('highsteaksJerkyCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (product.quantity || 1),
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: (product.quantity || 1) }];
      }
    });
  };

  const removeItemFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateItemQuantity = (productId, quantity) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const contextValue = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
    getCartItemCount,
    getCartTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};