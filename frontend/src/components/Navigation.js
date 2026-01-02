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
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Bespoke Stories', path: '/custom/engagement-rings' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-soft-black backdrop-blur-md border-b border-champagne-gold/30 shadow-lg"
    >
      <div className="section-container">
        <div className="flex items-center justify-between py-5">
          {/* Logo - Full Logo White & Bigger */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/prxxxgzj_Al%20Assali%20Jewelry%20Logo.png" 
              alt="Alassali Jewelry" 
              className="h-16 w-auto brightness-0 invert"
              style={{ filter: 'brightness(0) invert(1)' }}
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
                    className="text-sm font-medium tracking-wide uppercase text-white hover:text-champagne-gold transition-all duration-300 flex items-center gap-1"
                    data-testid="nav-products-dropdown"
                  >
                    {item.name}
                    <motion.svg
                      animate={{ rotate: isProductsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
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
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[700px] rounded-xl shadow-2xl border border-champagne-gold/20 p-6 z-50 overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
                          backdropFilter: 'blur(10px)'
                        }}
                        data-testid="products-mega-menu"
                      >
                        <div className="grid grid-cols-6 gap-3">
                          {/* The Icons & New In - Top row, 3 cols each */}
                          <Link
                            to={productMegaMenu.mainCategories[0].path}
                            className="col-span-3 group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer"
                            style={{
                              background: 'linear-gradient(135deg, rgba(201, 167, 94, 0.15) 0%, rgba(44, 44, 44, 0.4) 100%)',
                              border: '1px solid rgba(201, 167, 94, 0.25)'
                            }}
                            onClick={() => setIsProductsOpen(false)}
                            data-testid="mega-menu-the-icons"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                              <span className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-500 ease-out">{productMegaMenu.mainCategories[0].icon}</span>
                              <span className="text-xs font-medium text-white group-hover:text-champagne-gold transition-all duration-300 leading-tight">
                                {productMegaMenu.mainCategories[0].name}
                              </span>
                            </div>
                          </Link>

                          <Link
                            to={productMegaMenu.mainCategories[1].path}
                            className="col-span-3 group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer"
                            style={{
                              background: 'linear-gradient(135deg, rgba(201, 167, 94, 0.15) 0%, rgba(44, 44, 44, 0.4) 100%)',
                              border: '1px solid rgba(201, 167, 94, 0.25)'
                            }}
                            onClick={() => setIsProductsOpen(false)}
                            data-testid="mega-menu-new-in"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                              <span className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-500 ease-out">{productMegaMenu.mainCategories[1].icon}</span>
                              <span className="text-xs font-medium text-white group-hover:text-champagne-gold transition-all duration-300 leading-tight">
                                {productMegaMenu.mainCategories[1].name}
                              </span>
                            </div>
                          </Link>

                          {/* Main Categories - 2 cols each */}
                          {productMegaMenu.mainCategories.slice(2).map((category, idx) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className="col-span-2 group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer"
                              style={{
                                background: 'linear-gradient(135deg, rgba(201, 167, 94, 0.15) 0%, rgba(44, 44, 44, 0.4) 100%)',
                                border: '1px solid rgba(201, 167, 94, 0.25)'
                              }}
                              onClick={() => setIsProductsOpen(false)}
                              data-testid={`mega-menu-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                              <div className="relative z-10 flex flex-col items-center text-center">
                                <span className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-500 ease-out">{category.icon}</span>
                                <span className="text-xs font-medium text-white group-hover:text-champagne-gold transition-all duration-300 leading-tight">
                                  {category.name}
                                </span>
                              </div>
                              <div className="absolute top-0 right-0 w-8 h-8 bg-champagne-gold/10 transform rotate-45 translate-x-4 -translate-y-4 group-hover:bg-champagne-gold/40 group-hover:scale-150 transition-all duration-500" />
                            </Link>
                          ))}

                          {/* Extra Categories - 2 cols each, more compact */}
                          {productMegaMenu.extraCategories.map((category) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className="col-span-2 group relative overflow-hidden rounded-lg p-3 transition-all duration-400 hover:scale-110 cursor-pointer"
                              style={{
                                background: 'linear-gradient(135deg, rgba(139, 125, 107, 0.2) 0%, rgba(44, 44, 44, 0.5) 100%)',
                                border: '1px solid rgba(139, 125, 107, 0.3)'
                              }}
                              onClick={() => setIsProductsOpen(false)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-taupe/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
                              <div className="relative z-10 flex flex-col items-center text-center">
                                <span className="text-xs font-medium text-stone group-hover:text-champagne-gold transition-all duration-300 leading-tight">
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
                              className="group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer"
                              style={{
                                background: 'linear-gradient(135deg, rgba(201, 167, 94, 0.2) 0%, rgba(10, 10, 10, 0.7) 100%)',
                                border: '2px solid rgba(201, 167, 94, 0.35)'
                              }}
                              onClick={() => {
                                navigate(featured.path);
                                setIsProductsOpen(false);
                              }}
                            >
                              {/* Smooth animated gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/35 via-transparent to-warm-gold/25 opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out" />
                              
                              {/* Pulsing geometric accent */}
                              <div className="absolute -top-4 -right-4 w-16 h-16 bg-champagne-gold/15 rounded-full blur-xl group-hover:bg-champagne-gold/40 group-hover:scale-150 transition-all duration-600" />
                              
                              <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-3xl group-hover:scale-125 transition-transform duration-500 ease-out">{featured.icon}</span>
                                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-champagne-gold transition-all duration-400">
                                    {featured.name}
                                  </h3>
                                </div>
                                <div className="space-y-1 mt-3">
                                  {featured.subcategories.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={sub.path}
                                      className="block text-xs text-stone hover:text-champagne-gold transition-all duration-300 pl-2 border-l-2 border-transparent hover:border-champagne-gold hover:pl-3"
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
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-champagne-gold to-warm-gold text-soft-black px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300"
              data-testid="nav-start-journey"
            >
              Start Your Journey
            </Link>
            
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-champagne-gold/20 rounded-lg transition-colors"
              data-testid="nav-cart-button"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
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
              className="lg:hidden p-2 hover:bg-champagne-gold/20 rounded-lg transition-colors"
              data-testid="nav-mobile-menu-button"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
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
