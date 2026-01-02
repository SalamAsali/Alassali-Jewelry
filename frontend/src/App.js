import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Pages
import Homepage from './pages/Homepage';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetail from './pages/ProductDetail';
import CustomJewelryLanding from './pages/CustomJewelryLanding';
import CustomGrillzDeposit from './pages/CustomGrillzDeposit';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FAQ from './pages/FAQ';
import Portfolio from './pages/Portfolio';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Context
import { CartProvider } from './context/CartContext';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <Navigation />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/catalog" element={<ProductCatalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/custom/engagement-rings" element={<CustomJewelryLanding type="engagement-rings" />} />
                <Route path="/custom/grillz" element={<CustomJewelryLanding type="grillz" />} />
                <Route path="/custom/chains" element={<CustomJewelryLanding type="chains" />} />
                <Route path="/custom/pendants" element={<CustomJewelryLanding type="pendants" />} />
                <Route path="/custom/rings" element={<CustomJewelryLanding type="rings" />} />
                <Route path="/custom/earrings" element={<CustomJewelryLanding type="earrings" />} />
                <Route path="/custom/bracelets" element={<CustomJewelryLanding type="bracelets" />} />
                <Route path="/custom-grillz-deposit" element={<CustomGrillzDeposit />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/checkout/cancel" element={<CheckoutCancel />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
