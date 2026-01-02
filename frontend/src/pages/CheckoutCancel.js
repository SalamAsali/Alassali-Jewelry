import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const CheckoutCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center px-4"
      >
        <XCircle className="w-24 h-24 text-error mx-auto mb-8" />
        <h1 className="heading-section mb-6">Checkout Cancelled</h1>
        <p className="text-lg text-taupe mb-8">
          Your order was not completed. Your cart has been saved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/cart')} className="btn-primary">
            Return to Cart
          </button>
          <button onClick={() => navigate('/catalog')} className="btn-secondary">
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutCancel;
