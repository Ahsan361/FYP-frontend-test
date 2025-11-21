// context/userContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext(null);

// Create provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Restore user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  // Keep user in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ============ MARKETPLACE ADDITIONS ============
  
  // Update user data (for refreshing Stripe status, etc.)
  const updateUser = (updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  // Update Stripe account status specifically
  const updateStripeStatus = (stripeAccountId) => {
    setUser((prev) => {
      const newUser = { ...prev, stripeAccountId };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  // Login helper
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout helper
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      loading,
      updateUser,
      updateStripeStatus,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};