'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'

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
  const { itemCount, setIsOpen: setCartOpen } = useCart()

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
    { name: 'Engagement Rings', path: '/toronto/custom-engagement-rings', icon: '/images/icons/engagement-rings.svg' },
    { name: 'Wedding Bands', path: '/toronto/custom-wedding-bands', icon: '/images/icons/bridal-bands.svg' },
    { name: 'Rings', path: '/toronto/custom-rings', icon: '/images/icons/rings.svg' },
    { name: 'Pendants', path: '/toronto/custom-pendants', icon: '/images/icons/pendants.svg' },
    { name: 'Chains', path: '/toronto/custom-chains', icon: '/images/icons/chains.svg' },
    { name: 'Earrings', path: '/toronto/custom-earrings', icon: '/images/icons/earrings.svg' },
    { name: 'Bracelets', path: '/toronto/custom-bracelets', icon: '/images/icons/bracelets.svg' },
    { name: 'Grillz', path: '/toronto/custom-grillz', icon: '/images/icons/grillz.svg' },
  ]

  const chainsMenu = {
    metals: [
      { name: 'Yellow Gold', path: '/chains/yellow-gold' },
      { name: 'White Gold', path: '/chains/white-gold' },
    ],
    types: [
      { name: 'Cuban', path: '/chains/yellow-gold/cuban' },
      { name: 'Figaro', path: '/chains/yellow-gold/figaro' },
      { name: 'Rope', path: '/chains/yellow-gold/rope' },
      { name: 'Box', path: '/chains/yellow-gold/box' },
      { name: 'Byzantine', path: '/chains/yellow-gold/byzantine' },
      { name: 'Curb', path: '/chains/yellow-gold/curb' },
      { name: 'Franco', path: '/chains/yellow-gold/franco' },
      { name: 'Snake', path: '/chains/yellow-gold/snake' },
      { name: 'Wheat', path: '/chains/yellow-gold/wheat' },
    ],
  }

  const locationsMenu = [
    { name: 'Toronto', path: '/toronto', address: '5070 Oscar Peterson Blvd, Mississauga' },
    { name: 'Oakville', path: '/oakville', address: '3158 Sixth Line, Oakville' },
  ]

  const menuItems = [
    { name: 'Customs', path: null, hasDropdown: true, dropdownType: 'bespoke' },
    { name: 'Chains', path: '/chains/yellow-gold', hasDropdown: true, dropdownType: 'chains' },
    { name: 'Locations', path: null, hasDropdown: true, dropdownType: 'locations' },
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
              alt="Alasali Jewelry"
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

                    {openDropdown === 'chains' && item.dropdownType === 'chains' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[500px] rounded-xl shadow-2xl border-2 border-stone p-5 z-50 bg-white"
                        role="menu"
                        aria-label="Gold chains menu"
                      >
                        {/* Metal tiles */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {chainsMenu.metals.map((metal) => (
                            <Link
                              key={metal.name}
                              href={metal.path}
                              className="group relative rounded-lg p-5 bg-soft-black border-2 border-soft-black hover:border-glacier-grey transition-all duration-300 hover:scale-105 text-center"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span className="text-base font-bold text-white group-hover:text-glacier-grey-light block font-heading">
                                {metal.name}
                              </span>
                              <span className="text-xs text-stone mt-1 block">Shop collection →</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {openDropdown === 'locations' && item.dropdownType === 'locations' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[340px] rounded-xl shadow-2xl border-2 border-stone p-5 z-50 bg-white"
                        role="menu"
                        aria-label="Locations menu"
                      >
                        <div className="space-y-3">
                          {locationsMenu.map((loc) => (
                            <Link
                              key={loc.name}
                              href={loc.path}
                              className="group flex items-start gap-3 rounded-lg p-3 hover:bg-warm-white transition-all duration-200"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="w-8 h-8 rounded-full bg-soft-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-glacier-grey transition-colors">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <span className="text-sm font-bold text-deep-charcoal group-hover:text-glacier-grey block">
                                  {loc.name}
                                </span>
                                <span className="text-xs text-glacier-grey">{loc.address}</span>
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
              href="/account"
              className="hidden md:inline-flex items-center p-2 text-white hover:text-glacier-grey-light transition-colors"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="hidden md:inline-flex items-center p-2 text-white hover:text-glacier-grey-light transition-colors relative"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-glacier-grey text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            <Link
              href="/custom-form"
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
                        {openDropdown === 'chains' && item.dropdownType === 'chains' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 space-y-2 overflow-hidden"
                          >
                            {chainsMenu.metals.map((metal) => (
                              <Link
                                key={metal.name}
                                href={metal.path}
                                onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}
                                className="block py-2 text-sm font-semibold text-glacier-grey-light hover:text-white transition-colors"
                              >
                                {metal.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                        {openDropdown === 'locations' && item.dropdownType === 'locations' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 space-y-2 overflow-hidden"
                          >
                            {locationsMenu.map((loc) => (
                              <Link
                                key={loc.name}
                                href={loc.path}
                                onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}
                                className="block py-2 text-sm text-stone hover:text-glacier-grey transition-colors"
                              >
                                <span className="font-semibold text-glacier-grey-light">{loc.name}</span>
                                <span className="block text-xs text-stone/70 mt-0.5">{loc.address}</span>
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
                href="/custom-form"
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
