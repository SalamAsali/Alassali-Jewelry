'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const DEFAULT_LOGO = '/images/logo.png'

type NavigationProps = {
  logoUrl?: string | null
}

export default function Navigation(props?: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const logo = props?.logoUrl ?? DEFAULT_LOGO

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
    ],
  }

  const bespokeMenu = [
    { name: 'Engagement Rings', path: '/custom/engagement-rings', icon: '/images/icons/engagement-rings.svg' },
    { name: 'Wedding Bands', path: '/custom/wedding-bands', icon: '/images/icons/bridal-bands.svg' },
    { name: 'Rings', path: '/custom/rings', icon: '/images/icons/rings.svg' },
    { name: 'Pendants', path: '/custom/pendants', icon: '/images/icons/pendants.svg' },
    { name: 'Chains', path: '/custom/chains', icon: '/images/icons/chains.svg' },
    { name: 'Earrings', path: '/custom/earrings', icon: '/images/icons/earrings.svg' },
    { name: 'Bracelets', path: '/custom/bracelets', icon: '/images/icons/bracelets.svg' },
    { name: 'Grillz', path: '/custom/grillz', icon: '/images/icons/grillz.svg' },
  ]

  const menuItems = [
    { name: 'Bespoke', path: null, hasDropdown: true, dropdownType: 'bespoke' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'FAQ', path: '/faq' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-soft-black backdrop-blur-md border-b border-glacier-grey/30 shadow-lg"
    >
      <div className="section-container">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={logo}
              alt="Alassali Jewelry"
              className="h-14 md:h-20 lg:h-24 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.dropdownType || null)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="text-sm font-semibold tracking-wide uppercase text-white hover:text-glacier-grey-light transition-all duration-300 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-glacier-grey focus:ring-offset-2 focus:ring-offset-soft-black rounded px-2 py-1"
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
                              href={category.path}
                              className={`${idx < 2 ? 'col-span-3' : 'col-span-2'} group relative rounded-lg p-4 bg-white border-2 border-soft-black hover:border-glacier-grey transition-all duration-300 hover:scale-105`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="absolute inset-0 bg-glacier-grey/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                              <div className="relative z-10 text-center">
                                <span className="text-sm font-bold text-soft-black group-hover:text-glacier-grey block">
                                  {category.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                          {productMegaMenu.extraCategories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.path}
                              className="col-span-2 group relative rounded-lg p-3 bg-white border-2 border-charcoal hover:border-glacier-grey transition-all duration-300 hover:scale-105"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="absolute inset-0 bg-glacier-grey/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                              <div className="relative z-10 text-center">
                                <span className="text-xs font-bold text-charcoal group-hover:text-glacier-grey">
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
                              className="group relative rounded-lg p-4 bg-white border-2 border-soft-black hover:border-glacier-grey transition-all duration-300 hover:scale-105 cursor-pointer"
                              onClick={() => { router.push(featured.path); setOpenDropdown(null); }}
                            >
                              <h3 className="text-base font-bold text-soft-black group-hover:text-glacier-grey mb-2">
                                {featured.name}
                              </h3>
                              <div className="space-y-1">
                                {featured.subcategories.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.path}
                                    className="block text-xs text-charcoal hover:text-glacier-grey pl-2 border-l-2 border-transparent hover:border-glacier-grey"
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
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[680px] rounded-xl shadow-2xl border-2 border-stone p-5 z-50 bg-white"
                        role="menu"
                        aria-label="Bespoke custom jewelry menu"
                      >
                        <div className="grid grid-cols-4 gap-3">
                          {bespokeMenu.map((item) => (
                            <Link
                              key={item.name}
                              href={item.path}
                              className="group relative rounded-lg p-4 bg-white border-2 border-soft-black hover:border-glacier-grey transition-all duration-300 hover:scale-105"
                              onClick={() => setOpenDropdown(null)}
                              role="menuitem"
                            >
                              <div className="absolute inset-0 bg-glacier-grey/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                              <div className="relative z-10 text-center">
                                <div className="w-12 h-12 mx-auto mb-3">
                                  <img
                                    src={item.icon}
                                    alt={`Custom ${item.name} icon`}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                                  />
                                </div>
                                <span className="text-sm font-bold text-soft-black group-hover:text-glacier-grey block">
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
                  href={item.path || '#'}
                  className="text-sm font-semibold tracking-wide uppercase text-white hover:text-glacier-grey-light transition-all duration-300"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link
              href="/custom/general"
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start Your Journey
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-glacier-grey/20 rounded-lg transition-colors"
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
              className="lg:hidden py-4 border-t border-glacier-grey/30 bg-charcoal/50"
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
                        onClick={() => setOpenDropdown(openDropdown === item.dropdownType ? null : item.dropdownType || null)}
                        className="w-full text-left py-3 px-4 text-base font-medium text-white hover:text-glacier-grey-light transition-colors flex items-center justify-between"
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
                                href={category.path}
                                onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}
                                className="block py-2 text-sm text-stone hover:text-glacier-grey transition-colors"
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
                                href={bespoke.path}
                                onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}
                                className="block py-2 text-sm text-stone hover:text-glacier-grey transition-colors"
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
                      href={item.path || '#'}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 px-4 text-base font-medium text-white hover:text-glacier-grey-light transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <Link
                href="/custom/general"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-4 mx-4 text-center bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-3 rounded-lg font-bold"
              >
                Start Your Journey
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
