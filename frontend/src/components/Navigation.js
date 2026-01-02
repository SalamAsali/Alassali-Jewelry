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

  const productMegaMenu = {
    mainCategories: [
      { name: 'The Icons', path: '/catalog?featured=true', icon: '⭐', featured: true },
      { name: 'New In', path: '/catalog', icon: '✨', featured: true },
      { name: 'Engagement Rings', path: '/catalog?category=engagement-rings', icon: '💍' },
      { name: 'Grillz', path: '/catalog?category=grillz', icon: '✨' },
      { name: 'Chains', path: '/catalog?category=chains', icon: '🔗' },
      { name: 'Pendants', path: '/catalog?category=pendants', icon: '💎' },
    ],
    extraCategories: [
      { name: 'Bracelets', path: '/catalog?category=bracelets' },
      { name: 'Earrings', path: '/catalog?category=earrings' },
      { name: 'Rings', path: '/catalog?category=rings' },
    ],
    featuredCategories: [
      {
        name: 'Diamonds',
        path: '/catalog?inventory_type=natural',
        icon: '💎',
        subcategories: [
          { name: 'Natural Diamonds', path: '/catalog?inventory_type=natural' },
          { name: 'Lab-Grown Diamonds', path: '/catalog?inventory_type=lab-grown' },
        ]
      },
      {
        name: 'Watches',
        path: '/catalog?category=watches',
        icon: '⌚',
        subcategories: [
          { name: 'Custom Watches', path: '/custom/watches' },
          { name: 'Watch Repair', path: '/services/watch-repair' },
        ]
      },
    ],
  };

  const menuItems = [
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
          <Link to="/" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/prxxxgzj_Al%20Assali%20Jewelry%20Logo.png" 
              alt="Alassali Jewelry" 
              className="h-12 w-auto"
            />
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
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[700px] bg-gradient-to-br from-deep-charcoal via-charcoal to-soft-black rounded-xl shadow-2xl border border-champagne-gold/20 p-6 z-50"
                        data-testid="products-mega-menu"
                      >
                        <div className="grid grid-cols-7 gap-3">
                          {/* Main Categories - Boxes with futuristic design */}
                          {productMegaMenu.mainCategories.map((category, idx) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className={`${category.featured ? 'col-span-2' : 'col-span-2'} group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-105`}
                              style={{
                                background: 'linear-gradient(135deg, rgba(201, 167, 94, 0.1) 0%, rgba(44, 44, 44, 0.3) 100%)',
                                border: '1px solid rgba(201, 167, 94, 0.2)'
                              }}
                              onClick={() => setIsProductsOpen(false)}
                              data-testid={`mega-menu-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {/* Futuristic glow effect on hover */}
                              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              <div className="relative z-10 flex flex-col items-center text-center">
                                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</span>
                                <span className="text-xs font-medium text-white group-hover:text-champagne-gold transition-colors leading-tight">
                                  {category.name}
                                </span>
                              </div>
                              
                              {/* Corner accent */}
                              <div className="absolute top-0 right-0 w-8 h-8 bg-champagne-gold/10 transform rotate-45 translate-x-4 -translate-y-4 group-hover:bg-champagne-gold/30 transition-colors" />
                            </Link>
                          ))}

                          {/* Extra Categories - Smaller boxes spanning 1 column each */}
                          {productMegaMenu.extraCategories.map((category) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className="col-span-1 group relative overflow-hidden rounded-lg p-3 transition-all duration-300 hover:scale-105"
                              style={{
                                background: 'linear-gradient(135deg, rgba(139, 125, 107, 0.2) 0%, rgba(44, 44, 44, 0.4) 100%)',
                                border: '1px solid rgba(139, 125, 107, 0.3)'
                              }}
                              onClick={() => setIsProductsOpen(false)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-taupe/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative z-10 flex flex-col items-center text-center">
                                <span className="text-xs font-medium text-stone group-hover:text-champagne-gold transition-colors leading-tight">
                                  {category.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Featured Categories - Compact Big Boxes */}
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {productMegaMenu.featuredCategories.map((featured) => (
                            <div
                              key={featured.name}
                              className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-105 cursor-pointer"
                              style={{
                                background: 'linear-gradient(135deg, rgba(201, 167, 94, 0.15) 0%, rgba(10, 10, 10, 0.6) 100%)',
                                border: '2px solid rgba(201, 167, 94, 0.3)'
                              }}
                              onClick={() => {
                                navigate(featured.path);
                                setIsProductsOpen(false);
                              }}
                            >
                              {/* Animated gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/30 via-transparent to-warm-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              
                              {/* Geometric accent */}
                              <div className="absolute -top-4 -right-4 w-16 h-16 bg-champagne-gold/10 rounded-full blur-xl group-hover:bg-champagne-gold/30 transition-all" />
                              
                              <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-3xl group-hover:scale-110 transition-transform">{featured.icon}</span>
                                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-champagne-gold transition-colors">
                                    {featured.name}
                                  </h3>
                                </div>
                                <div className="space-y-1 mt-3">
                                  {featured.subcategories.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={sub.path}
                                      className="block text-xs text-stone hover:text-champagne-gold transition-colors pl-2 border-l-2 border-transparent hover:border-champagne-gold"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsProductsOpen(false);
                                      }}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Banner - Minimal */}
                        <div className="mt-3 pt-3 border-t border-champagne-gold/20 text-center">
                          <Link
                            to="/catalog"
                            className="inline-flex items-center gap-2 text-xs font-medium text-champagne-gold hover:text-warm-gold transition-colors"
                            onClick={() => setIsProductsOpen(false)}
                          >
                            View All
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
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
                            {productMegaMenu.mainCategories.map((category) => (
                              <Link
                                key={category.name}
                                to={category.path}
                                onClick={() => { setIsMenuOpen(false); setIsProductsOpen(false); }}
                                className="block py-2 text-sm text-taupe hover:text-champagne-gold transition-colors"
                              >
                                {category.icon} {category.name}
                              </Link>
                            ))}
                            <div className="border-t border-stone pt-2 mt-2">
                              {productMegaMenu.extraCategories.map((category) => (
                                <Link
                                  key={category.name}
                                  to={category.path}
                                  onClick={() => { setIsMenuOpen(false); setIsProductsOpen(false); }}
                                  className="block py-2 text-xs text-taupe hover:text-champagne-gold transition-colors"
                                >
                                  {category.icon} {category.name}
                                </Link>
                              ))}
                            </div>
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
