import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const productCategories = [
    { name: 'All Products', path: '/catalog' },
    { name: 'Engagement Rings', path: '/catalog?category=engagement-rings' },
    { name: 'Grillz', path: '/catalog?category=grillz' },
    { name: 'Chains', path: '/catalog?category=chains' },
    { name: 'Pendants', path: '/catalog?category=pendants' },
    { name: 'Natural Diamonds', path: '/catalog?inventory_type=natural' },
    { name: 'Lab-Grown Diamonds', path: '/catalog?inventory_type=lab-grown' },
  ];

  const menuItems = [
    { name: 'The Icons', path: '/catalog?featured=true' },
    { name: 'New In', path: '/catalog' },
    { name: 'Products', path: null, hasDropdown: true },
    { name: 'Bespoke Stories', path: '/custom/engagement-rings' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone"
    >
      <div className="section-container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-champagne-gold" />
            <span className="text-2xl font-heading font-semibold text-deep-charcoal">
              ALASSALI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <button
                    className="text-sm font-medium tracking-wide uppercase text-charcoal hover:text-champagne-gold transition-colors duration-200 flex items-center gap-1"
                    data-testid="nav-products-dropdown"
                  >
                    {item.name}
                    <motion.svg
                      animate={{ rotate: isProductsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-stone py-2 z-50"
                      >
                        {productCategories.map((category) => (
                          <Link
                            key={category.name}
                            to={category.path}
                            className="block px-6 py-3 text-sm text-charcoal hover:bg-soft-beige hover:text-champagne-gold transition-colors"
                            onClick={() => setIsProductsOpen(false)}
                            data-testid={`dropdown-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-sm font-medium tracking-wide uppercase text-charcoal hover:text-champagne-gold transition-colors duration-200"
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link
              to="/custom/engagement-rings"
              className="hidden md:block btn-primary text-sm"
              data-testid="nav-start-journey"
            >
              Start Your Journey
            </Link>
            
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-soft-beige rounded-lg transition-colors"
              data-testid="nav-cart-button"
            >
              <ShoppingCart className="w-6 h-6 text-charcoal" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-champagne-gold text-soft-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-soft-beige rounded-lg transition-colors"
              data-testid="nav-mobile-menu-button"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-stone"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.hasDropdown ? (
                    <div className="mb-2">
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className="w-full text-left py-3 text-base font-medium text-charcoal hover:text-champagne-gold transition-colors flex items-center justify-between"
                      >
                        {item.name}
                        <motion.svg
                          animate={{ rotate: isProductsOpen ? 180 : 0 }}
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {isProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 space-y-2 overflow-hidden"
                          >
                            {productCategories.map((category) => (
                              <Link
                                key={category.name}
                                to={category.path}
                                onClick={() => { setIsMenuOpen(false); setIsProductsOpen(false); }}
                                className="block py-2 text-sm text-taupe hover:text-champagne-gold transition-colors"
                              >
                                {category.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 text-base font-medium text-charcoal hover:text-champagne-gold transition-colors"
                      data-testid={`nav-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <Link
                to="/custom/engagement-rings"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-4 btn-primary text-center"
              >
                Start Your Journey
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
