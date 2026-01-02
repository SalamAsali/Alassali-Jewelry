import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const success = await addToCart(product._id);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-champagne-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="heading-section mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/catalog')} className="btn-primary">
            Return to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white py-12" data-testid="product-detail">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-xl overflow-hidden mb-4"
              data-testid="product-images"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === idx ? 'ring-2 ring-champagne-gold' : ''
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            data-testid="product-info"
          >
            <div className="inline-block bg-champagne-gold/10 px-4 py-2 rounded-full mb-4">
              <span className="text-sm uppercase tracking-wider font-medium text-champagne-gold">
                {product.category.replace('-', ' ')}
              </span>
            </div>
            
            <h1 className="heading-section mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-deep-charcoal">
                ${product.price.toLocaleString()}
              </span>
              {product.inventory_type === 'lab-grown' && (
                <span className="bg-soft-beige text-charcoal px-3 py-1 rounded-full text-sm font-medium">
                  Lab-Grown
                </span>
              )}
              {product.specifications?.clarity && (
                <span className="bg-champagne-gold/20 text-deep-charcoal px-3 py-1 rounded-full text-sm font-medium">
                  {product.specifications.clarity} Clarity
                </span>
              )}
            </div>

            <p className="text-lg text-taupe leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="bg-white rounded-lg p-6 mb-8">
                <h3 className="font-heading text-lg font-semibold mb-4">Specifications</h3>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-taupe capitalize">{key}:</dt>
                      <dd className="font-medium text-charcoal">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center gap-2"
                data-testid="add-to-cart-button"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              
              <button
                onClick={() => navigate(`/custom/${product.category}`)}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Customize This Design
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-success/10 border border-success text-success px-4 py-3 rounded-lg flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Added to cart successfully!</span>
              </motion.div>
            )}

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-stone grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-champagne-gold font-medium mb-1">
                  Fully Insured
                </p>
                <p className="text-taupe text-sm">Shipping</p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-champagne-gold font-medium mb-1">
                  Lifetime
                </p>
                <p className="text-taupe text-sm">Warranty</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
