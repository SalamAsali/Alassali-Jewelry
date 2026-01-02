import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const productMegaMenu = {
    mainCategories: [
      { name: 'The Icons', path: '/catalog?featured=true' },
      { name: 'New In', path: '/catalog' },
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
          { name: 'Natural', path: '/catalog?inventory_type=natural' },
          { name: 'Lab-Grown', path: '/catalog?inventory_type=lab-grown' },
        ]
      },
      {
        name: 'Watches',
        path: '/catalog?category=watches',
        subcategories: [
          { name: 'Custom', path: '/custom/watches' },
          { name: 'Repair', path: '/services/watch-repair' },
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-soft-black backdrop-blur-md border-b border-champagne-gold/30 shadow-lg"
    >
      <div className="section-container">
        <div className="flex items-center justify-between py-5">
          {/* Logo - White & Bigger */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/mos4tvrw_Final-W2-1.png" 
              alt="Alassali Jewelry" 
              className="h-20 w-auto"
              style={{ filter: 'invert(1)' }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.dropdownType)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onFocus={() => setOpenDropdown(item.dropdownType)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <button
                    className="text-sm font-semibold tracking-wide uppercase text-white/90 hover:text-champagne-gold transition-all duration-300 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-champagne-gold focus:ring-offset-2 focus:ring-offset-soft-black rounded px-2 py-1"
                    aria-expanded={openDropdown === item.dropdownType}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <motion.svg
                      animate={{ rotate: openDropdown === item.dropdownType ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[650px] rounded-xl shadow-2xl border-2 border-stone p-5 z-50 bg-white"
                        role="menu"
                        aria-label="Products menu"
                      >
                        <div className="grid grid-cols-6 gap-3">
                          {productMegaMenu.mainCategories.map((category, idx) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className={`${idx < 2 ? 'col-span-3' : 'col-span-2'} group relative rounded-lg p-4 bg-white border-2 border-soft-black hover:border-champagne-gold transition-all duration-300 hover:scale-105`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="absolute inset-0 bg-champagne-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                              <div className="relative z-10 text-center">
                                <span className="text-sm font-bold text-soft-black group-hover:text-champagne-gold block">
                                  {category.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                          {productMegaMenu.extraCategories.map((category) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className="col-span-2 group relative rounded-lg p-3 bg-white border-2 border-charcoal hover:border-champagne-gold transition-all duration-300 hover:scale-105"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="absolute inset-0 bg-champagne-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                              <div className="relative z-10 text-center">
                                <span className="text-xs font-bold text-charcoal group-hover:text-champagne-gold">
                                  {category.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {productMegaMenu.featuredCategories.map((featured) => (
                            <div
                              key={featured.name}
                              className="group relative rounded-lg p-4 bg-white border-2 border-soft-black hover:border-champagne-gold transition-all duration-300 hover:scale-105 cursor-pointer"
                              onClick={() => { navigate(featured.path); setOpenDropdown(null); }}
                            >
                              <h3 className="text-base font-bold text-soft-black group-hover:text-champagne-gold mb-2">
                                {featured.name}
                              </h3>
                              <div className="space-y-1">
                                {featured.subcategories.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    to={sub.path}
                                    className="block text-xs text-charcoal hover:text-champagne-gold pl-2 border-l-2 border-transparent hover:border-champagne-gold"
                                    onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {openDropdown === 'bespoke' && item.dropdownType === 'bespoke' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[600px] rounded-xl shadow-2xl border-2 border-stone p-5 z-50 bg-white"
                        role="menu"
                        aria-label="Bespoke custom jewelry menu"
                      >
                        <div className="grid grid-cols-3 gap-3">
                          {bespokeMenu.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="group relative rounded-lg p-4 bg-white border-2 border-soft-black hover:border-champagne-gold transition-all duration-300 hover:scale-105"
                              onClick={() => setOpenDropdown(null)}
                              role="menuitem"
                            >
                              <div className="absolute inset-0 bg-champagne-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                              <div className="relative z-10 text-center">
                                <div className="w-12 h-12 mx-auto mb-3">
                                  <img 
                                    src={item.icon} 
                                    alt={`Custom ${item.name} icon`} 
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
                                  />
                                </div>
                                <span className="text-sm font-bold text-soft-black group-hover:text-champagne-gold block">
                                  {item.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-sm font-semibold tracking-wide uppercase text-white/90 hover:text-champagne-gold transition-all duration-300"
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
            >
              Start Your Journey
            </Link>
            
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-champagne-gold/20 rounded-lg transition-colors"
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
