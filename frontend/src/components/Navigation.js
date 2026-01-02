import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const productMegaMenu = {
    mainCategories: [
      { name: 'The Icons', path: '/catalog?featured=true', featured: true },
      { name: 'New In', path: '/catalog', featured: true },
      { name: 'Engagement Rings', path: '/catalog?category=engagement-rings' },
      { name: 'Grillz', path: '/catalog?category=grillz' },
      { name: 'Chains', path: '/catalog?category=chains' },
      { name: 'Pendants', path: '/catalog?category=pendants' },
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
        subcategories: [
          { name: 'Natural Diamonds', path: '/catalog?inventory_type=natural' },
          { name: 'Lab-Grown Diamonds', path: '/catalog?inventory_type=lab-grown' },
        ]
      },
      {
        name: 'Watches',
        path: '/catalog?category=watches',
        subcategories: [
          { name: 'Custom Watches', path: '/custom/watches' },
          { name: 'Watch Repair', path: '/services/watch-repair' },
        ]
      },
    ],
  };

  const bespokeMenu = [
    { name: 'Rings', path: '/custom/rings', icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/l3vhvhkh_Design.png' },
    { name: 'Pendants', path: '/custom/pendants', icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/twegjzfj_Consultation.png' },
    { name: 'Chains', path: '/custom/chains', icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/ksl2vd8y_Sketch.png' },
    { name: 'Earrings', path: '/custom/earrings', icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/ye0fvbed_Presentation.png' },
    { name: 'Bracelets', path: '/custom/bracelets', icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/9fg6i9rv_In-House-Manufacture.png' },
    { name: 'Grillz', path: '/custom/grillz', icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/l3vhvhkh_Design.png' },
  ];

  const menuItems = [
    { name: 'Products', path: null, hasDropdown: true, dropdownType: 'products' },
    { name: 'Bespoke', path: null, hasDropdown: true, dropdownType: 'bespoke' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'FAQ', path: '/faq' },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

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
                  
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.dropdownType)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="text-sm font-semibold tracking-wide uppercase text-white/90 hover:text-champagne-gold transition-all duration-300 flex items-center gap-1"
                    data-testid={`nav-${item.name.toLowerCase()}-dropdown`}
                  >
                    {item.name}
                    <motion.svg
                      animate={{ rotate: openDropdown === item.dropdownType ? 180 : 0 }}
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
                    {/* Products Mega Menu */}
                    {openDropdown === 'products' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[650px] md:w-[700px] lg:w-[750px] rounded-xl shadow-2xl border-2 border-stone p-5 z-50 overflow-hidden bg-white"
                        data-testid="products-mega-menu"
                      >
                        <div className="grid grid-cols-6 gap-3">
                          {/* The Icons & New In - Top row */}
                          <Link
                            to={productMegaMenu.mainCategories[0].path}
                            className="col-span-3 group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer bg-white border-2 border-soft-black hover:border-champagne-gold"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                              <div className="w-10 h-10 mb-2 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" className="group-hover:scale-125 transition-transform duration-500">
                                  <path d="M16 4 L20 14 L28 16 L20 18 L16 28 L12 18 L4 16 L12 14 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-soft-black group-hover:text-champagne-gold transition-colors" />
                                </svg>
                              </div>
                              <span className="text-sm font-bold text-soft-black group-hover:text-champagne-gold transition-all duration-300">
                                {productMegaMenu.mainCategories[0].name}
                              </span>
                            </div>
                          </Link>

                          <Link
                            to={productMegaMenu.mainCategories[1].path}
                            className="col-span-3 group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer bg-white border-2 border-soft-black hover:border-champagne-gold"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                              <div className="w-10 h-10 mb-2 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" className="group-hover:scale-125 transition-transform duration-500">
                                  <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-soft-black group-hover:text-champagne-gold transition-colors" />
                                  <circle cx="16" cy="16" r="6" fill="currentColor" className="text-soft-black group-hover:text-champagne-gold transition-colors" />
                                </svg>
                              </div>
                              <span className="text-sm font-bold text-soft-black group-hover:text-champagne-gold transition-all duration-300">
                                {productMegaMenu.mainCategories[1].name}
                              </span>
                            </div>
                          </Link>

                          {/* Main Categories - 2 cols each */}
                          {productMegaMenu.mainCategories.slice(2).map((category, idx) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className="col-span-2 group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer bg-white border-2 border-soft-black hover:border-champagne-gold"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                              <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-8 h-8 mb-2">
                                  <svg width="32" height="32" viewBox="0 0 32 32" className="group-hover:scale-125 transition-transform duration-500">
                                    <rect x="6" y="6" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" className="text-soft-black group-hover:text-champagne-gold transition-colors" />
                                  </svg>
                                </div>
                                <span className="text-xs font-bold text-soft-black group-hover:text-champagne-gold transition-all duration-300">
                                  {category.name}
                                </span>
                              </div>
                            </Link>
                          ))}

                          {/* Extra Categories - 2 cols each */}
                          {productMegaMenu.extraCategories.map((category) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className="col-span-2 group relative overflow-hidden rounded-lg p-3 transition-all duration-400 hover:scale-105 cursor-pointer bg-white border-2 border-charcoal hover:border-champagne-gold"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
                              <div className="relative z-10 flex flex-col items-center text-center">
                                <span className="text-xs font-bold text-charcoal group-hover:text-champagne-gold transition-all duration-300">
                                  {category.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Featured Categories - White boxes */}
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {productMegaMenu.featuredCategories.map((featured) => (
                            <div
                              key={featured.name}
                              className="group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer bg-white border-2 border-soft-black hover:border-champagne-gold"
                              onClick={() => {
                                navigate(featured.path);
                                setOpenDropdown(null);
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-600" />
                              
                              <div className="relative z-10">
                                <h3 className="text-base font-heading font-bold text-soft-black group-hover:text-champagne-gold transition-all duration-400 mb-2">
                                  {featured.name}
                                </h3>
                                <div className="space-y-1">
                                  {featured.subcategories.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={sub.path}
                                      className="block text-xs text-charcoal hover:text-champagne-gold transition-all duration-300 pl-2 border-l-2 border-transparent hover:border-champagne-gold hover:pl-3"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdown(null);
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

                        <div className="mt-3 pt-3 border-t border-stone text-center">
                          <Link
                            to="/catalog"
                            className="inline-flex items-center gap-2 text-xs font-medium text-champagne-gold hover:text-warm-gold transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            View All
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}

                    {/* Bespoke Mega Menu */}
                    {openDropdown === 'bespoke' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[500px] md:w-[550px] lg:w-[600px] rounded-xl shadow-2xl border-2 border-stone p-5 z-50 bg-white"
                        data-testid="bespoke-mega-menu"
                      >
                        <div className="grid grid-cols-3 gap-3">
                          {bespokeMenu.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="group relative overflow-hidden rounded-lg p-4 transition-all duration-500 hover:scale-105 cursor-pointer bg-white border-2 border-soft-black hover:border-champagne-gold"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                              <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                                  <img src={item.icon} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <span className="text-sm font-bold text-soft-black group-hover:text-champagne-gold transition-all duration-300">
                                  {item.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              className="lg:hidden py-4 border-t border-champagne-gold/30 bg-charcoal/50"
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
                        onClick={() => setOpenDropdown(openDropdown === item.dropdownType ? null : item.dropdownType)}
                        className="w-full text-left py-3 px-4 text-base font-medium text-white hover:text-champagne-gold transition-colors flex items-center justify-between"
                      >
                        {item.name}
                        <motion.svg
                          animate={{ rotate: openDropdown === item.dropdownType ? 180 : 0 }}
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {openDropdown === 'products' && item.dropdownType === 'products' && (
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
                                onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}
                                className="block py-2 text-sm text-stone hover:text-champagne-gold transition-colors"
                              >
                                {category.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                        {openDropdown === 'bespoke' && item.dropdownType === 'bespoke' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 space-y-2 overflow-hidden"
                          >
                            {bespokeMenu.map((bespoke) => (
                              <Link
                                key={bespoke.name}
                                to={bespoke.path}
                                onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}
                                className="block py-2 text-sm text-stone hover:text-champagne-gold transition-colors"
                              >
                                {bespoke.name}
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
                      className="block py-3 px-4 text-base font-medium text-white hover:text-champagne-gold transition-colors"
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
                className="block mt-4 mx-4 text-center bg-gradient-to-r from-champagne-gold to-warm-gold text-soft-black px-8 py-3 rounded-lg font-bold"
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
