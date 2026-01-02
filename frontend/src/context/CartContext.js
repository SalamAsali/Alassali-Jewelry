import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate or get session ID
  useEffect(() => {
    let sid = localStorage.getItem('sessionId');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substr(2, 9) + Date.now();
      localStorage.setItem('sessionId', sid);
    }
    setSessionId(sid);
  }, []);

  // Fetch cart when session ID is available
  useEffect(() => {
    if (sessionId) {
      fetchCart();
    }
  }, [sessionId]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/api/cart/${sessionId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(`${API_URL}/api/cart/${sessionId}/add`, {
        product_id: productId,
        quantity
      });
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post(`${API_URL}/api/cart/${sessionId}/remove`, null, {
        params: { product_id: productId }
      });
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.post(`${API_URL}/api/cart/${sessionId}/update`, null, {
        params: { product_id: productId, quantity }
      });
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider value={{
      cart,
      sessionId,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartCount,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
