import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const ProductCatalog = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    inventory_type: searchParams.get('inventory_type') || '',
    featured: searchParams.get('featured') || ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.inventory_type) params.inventory_type = filters.inventory_type;
      if (filters.featured) params.featured = filters.featured;
      
      const response = await axios.get(`${API_URL}/api/products`, { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: '', label: 'All' },
    { value: 'engagement-rings', label: 'Engagement Rings' },
    { value: 'grillz', label: 'Grillz' },
    { value: 'chains', label: 'Chains' },
    { value: 'pendants', label: 'Pendants' }
  ];

  const inventoryTypes = [
    { value: '', label: 'All' },
    { value: 'natural', label: 'Natural' },
    { value: 'lab-grown', label: 'Lab-Grown' }
  ];

  return (
    <div className="min-h-screen bg-off-white py-12">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="heading-section text-center mb-4">Our Collection</h1>
          <p className="text-center text-taupe max-w-2xl mx-auto">
            Discover our curated selection of fine jewelry
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-center" data-testid="product-filters">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-charcoal" />
            <span className="font-medium text-charcoal">Filters:</span>
          </div>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="input-field max-w-xs"
            data-testid="filter-category"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <select
            value={filters.inventory_type}
            onChange={(e) => setFilters({...filters, inventory_type: e.target.value})}
            className="input-field max-w-xs"
            data-testid="filter-inventory-type"
          >
            {inventoryTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-taupe text-lg">No products found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="product-grid">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
                data-testid={`product-card-${index}`}
              >
                <div className="product-card">
                  <div className="aspect-square overflow-hidden bg-warm-white relative">
                    <motion.img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.inventory_type === 'lab-grown' && (
                        <div className="bg-champagne-gold text-soft-black text-xs px-3 py-1 rounded-full font-medium">
                          Lab-Grown
                        </div>
                      )}
                      {product.specifications?.clarity && (
                        <div className="bg-white/90 backdrop-blur-sm text-deep-charcoal text-xs px-3 py-1 rounded-full font-medium">
                          {product.specifications.clarity}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-medium text-deep-charcoal mb-2 group-hover:text-champagne-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-taupe mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-deep-charcoal">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-champagne-gold font-medium">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
