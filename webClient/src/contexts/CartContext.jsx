// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from memory on mount
  useEffect(() => {
    const savedCart = [];
    setCartItems(savedCart);
  }, []);

  // Add item to cart
  const addToCart = (listing, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.listing._id === listing._id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.listing._id === listing._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { listing, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (listingId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.listing._id !== listingId));
  };

  // Update item quantity
  const updateQuantity = (listingId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(listingId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.listing._id === listingId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.listing.price * item.quantity, 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};