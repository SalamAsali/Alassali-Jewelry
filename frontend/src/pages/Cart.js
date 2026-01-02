import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, sessionId } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    if (cart.items.length === 0) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/checkout/create-session`, {
        session_id: sessionId,
        origin_url: window.location.origin
      });
      
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Error creating checkout. Please try again.');
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-taupe mx-auto mb-6" />
          <h2 className="heading-section mb-4">Your Cart is Empty</h2>
          <p className="text-taupe mb-8">Discover our exquisite collection</p>
          <button onClick={() => navigate('/catalog')} className="btn-primary">
            Browse Jewelry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section-container">
        <h1 className="heading-section text-center mb-12">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <motion.div
                key={item.product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 flex gap-6"
                data-testid={`cart-item-${index}`}
              >
                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2">
                    {item.product.name}
                  </h3>
                  <p className="text-taupe text-sm mb-4">{item.product.category.replace('-', ' ')}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-soft-beige flex items-center justify-center hover:bg-champagne-gold transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-charcoal w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-soft-beige flex items-center justify-center hover:bg-champagne-gold transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-error hover:text-error/80 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-deep-charcoal">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <p className="text-sm text-taupe">${item.product.price.toLocaleString()} each</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="font-heading text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-charcoal">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal">
                  <span>Shipping</span>
                  <span className="text-sm text-taupe">Calculated at checkout</span>
                </div>
                <div className="border-t border-stone pt-4 flex justify-between text-lg font-bold text-deep-charcoal">
                  <span>Total</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 mb-4"
                data-testid="checkout-button"
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/catalog')}
                className="w-full btn-ghost"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-stone space-y-3">
                <div className="flex items-center gap-3 text-sm text-taupe">
                  <div className="w-6 h-6 rounded-full bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <span>Fully insured shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-taupe">
                  <div className="w-6 h-6 rounded-full bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <span>Lifetime warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-taupe">
                  <div className="w-6 h-6 rounded-full bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <span>Complimentary resizing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
