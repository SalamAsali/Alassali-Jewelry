import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Share2, X, Check, Calendar, Truck, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const CustomGrillzDeposit = () => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    notes: '',
    service: 'Custom Grillz Order – Deposit',
    employee: '',
    location: '',
    bringingGuests: false,
    numberOfGuests: 0,
    acceptedTerms: false,
    uploadedFiles: []
  });

  const [showAddedModal, setShowAddedModal] = useState(false);
  const [serviceAvailable, setServiceAvailable] = useState(true);

  const product = {
    name: 'Custom Grillz Order – Deposit',
    price: 894.00,
    originalPrice: 1200.00,
    currency: 'CAD',
    sale: true,
    soldOut: false,
    images: [
      'https://images.unsplash.com/photo-1601121141499-17ae80afc03a?w=800',
      'https://images.pexels.com/photos/8084610/pexels-photo-8084610.jpeg?w=800',
    ],
    depositAmount: 500,
    timeline: {
      ordered: 'January 02',
      shipped: 'January 02 → January 22',
      delivered: 'February 11 → March 12',
      estimatedShip: 'February 11'
    }
  };

  const serviceOptions = [
    'Custom Grillz Order – Deposit',
    'Custom Pendant – Deposit and Design',
    'Custom Chain – Deposit and Design',
    'Custom Bracelet – Deposit and Design',
    'Custom Ring – Deposit and Design',
    'Custom Earrings – Deposit and Design',
    'Custom Watch – Deposit and Design'
  ];

  const employeeOptions = [
    'IN STORE APPOINTMENT With Tony',
    'Virtual/ Phone Call Appointment'
  ];

  const locationOptions = [
    'Toronto - Main Studio',
    'Mississauga - Satellite Location',
    'Virtual (No Physical Location)'
  ];

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files.map(f => f.name)]
    }));
  };

  const handleContinue = () => {
    if (!formData.acceptedTerms) {
      alert('Please accept the Terms of Service to continue');
      return;
    }
    if (!serviceAvailable) {
      alert('Selected service is currently not available');
      return;
    }
    // Proceed to next step (booking calendar, etc.)
    alert('Proceeding to appointment booking...');
  };

  const handleAddToCart = async () => {
    // In real implementation, this would add the deposit item
    setShowAddedModal(true);
    setTimeout(() => setShowAddedModal(false), 3000);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Banner */}
      <div className="bg-champagne-gold text-soft-black py-3 text-center text-sm font-medium">
        Free Shipping On Orders Over $500 Within US. Call or Text 281-248-8888 for Quotations and Assistance.
      </div>

      <div className="section-container py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-xl overflow-hidden mb-4 relative"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.sale && (
                <div className="absolute top-4 left-4 bg-error text-white px-3 py-1 rounded-full text-xs font-bold">
                  SALE
                </div>
              )}
              {product.soldOut && (
                <div className="absolute top-4 right-4 bg-charcoal text-white px-3 py-1 rounded-full text-xs font-bold">
                  SOLD OUT
                </div>
              )}
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-champagne-gold' : ''
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info & Form */}
          <div>
            <h1 className="heading-section mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-deep-charcoal">
                {product.currency} ${product.price.toFixed(2)}
              </span>
              {product.sale && (
                <span className="text-xl text-taupe line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm text-taupe mb-6">
              <a href="#" className="underline hover:text-champagne-gold">Shipping</a> calculated at checkout
            </p>

            {/* Important Deposit Info */}
            <div className="bg-warning/10 border border-warning rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-charcoal mb-2">Important Deposit Information:</h3>
              <ul className="text-sm text-charcoal space-y-1 list-disc list-inside">
                <li>${product.depositAmount} deposit required</li>
                <li>Deposit non-refundable if production started</li>
                <li>Custom pieces are final sale</li>
                <li>All custom item prices are deposit only</li>
              </ul>
            </div>

            {/* Upload Images Section */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <label className="block font-medium text-charcoal mb-3">
                Upload images to better help us understand your needs:
              </label>
              <div className="border-2 border-dashed border-stone rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-champagne-gold mx-auto mb-2" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload-deposit"
                />
                <label htmlFor="file-upload-deposit" className="btn-primary inline-block cursor-pointer text-sm px-6 py-2">
                  Choose File
                </label>
                <p className="text-xs text-taupe mt-2">PNG, JPG up to 10MB each</p>
                {formData.uploadedFiles.length > 0 && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium text-charcoal mb-2">Uploaded files:</p>
                    {formData.uploadedFiles.map((file, idx) => (
                      <div key={idx} className="text-xs text-taupe flex items-center gap-2">
                        <Check className="w-3 h-3 text-success" />
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-medium text-charcoal mb-2">
                Quantity ({quantity} in cart)
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-soft-beige flex items-center justify-center hover:bg-champagne-gold transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center input-field"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-soft-beige flex items-center justify-center hover:bg-champagne-gold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="mb-6 flex items-center gap-2 text-champagne-gold hover:text-warm-gold transition-colors text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            {/* Manufacturing Timeline */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-champagne-gold" />
                <h3 className="font-semibold text-charcoal">Custom Manufacturing and Shipping</h3>
              </div>
              <p className="text-sm font-medium text-charcoal mb-3">
                Made To Order – Will Ship By {product.timeline.estimatedShip}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-taupe">Ordered:</span>
                  <span className="text-charcoal font-medium">{product.timeline.ordered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-taupe">Shipped:</span>
                  <span className="text-charcoal font-medium">{product.timeline.shipped}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-taupe">Delivered:</span>
                  <span className="text-charcoal font-medium">{product.timeline.delivered}</span>
                </div>
              </div>
              <p className="text-xs text-taupe mt-3">
                Shipping time is separate from production time. Custom jewelry manufacture takes time.
              </p>
              <a href="#" className="text-xs text-champagne-gold hover:underline mt-2 inline-block">
                View Shipping Policy →
              </a>
            </div>
          </div>
        </div>

        {/* Custom Order Form Section */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="heading-subsection mb-6">Custom Order Details</h2>

          {/* Notes */}
          <div className="mb-6">
            <label className="block font-medium text-charcoal mb-2">Notes / Special Instructions</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={4}
              className="input-field"
              placeholder="Tell us about your vision, preferences, or any specific requirements..."
            />
          </div>

          {/* Service Selector */}
          <div className="mb-6">
            <label className="block font-medium text-charcoal mb-2">Please select service *</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              className="input-field"
              required
            >
              {serviceOptions.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Employee */}
          <div className="mb-6">
            <label className="block font-medium text-charcoal mb-2">Employee *</label>
            <select
              value={formData.employee}
              onChange={(e) => setFormData({...formData, employee: e.target.value})}
              className="input-field"
              required
            >
              <option value="">Select an option</option>
              {employeeOptions.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block font-medium text-charcoal mb-2">Location *</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="input-field"
              required
            >
              <option value="">Select a location</option>
              {locationOptions.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Bringing Guests */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.bringingGuests}
                onChange={(e) => setFormData({...formData, bringingGuests: e.target.checked})}
                className="w-5 h-5 text-champagne-gold rounded focus:ring-champagne-gold"
              />
              <span className="text-charcoal font-medium">Bringing anyone with you?</span>
            </label>
            
            {formData.bringingGuests && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <label className="block text-sm text-taupe mb-2">Number of Additional People</label>
                <input
                  type="number"
                  min="0"
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({...formData, numberOfGuests: parseInt(e.target.value) || 0})}
                  className="input-field max-w-xs"
                />
              </motion.div>
            )}
          </div>

          {/* Price Display */}
          <div className="bg-soft-beige rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-charcoal">Price:</span>
              <span className="text-2xl font-bold text-deep-charcoal">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptedTerms}
                onChange={(e) => setFormData({...formData, acceptedTerms: e.target.checked})}
                className="w-5 h-5 text-champagne-gold rounded focus:ring-champagne-gold mt-1"
                required
              />
              <span className="text-sm text-charcoal">
                I accept the <a href="/terms" className="text-champagne-gold hover:underline">Terms of Service</a>
              </span>
            </label>
          </div>

          {/* Availability Warning */}
          {!serviceAvailable && (
            <div className="bg-error/10 border border-error rounded-lg p-4 mb-6">
              <p className="text-error font-medium">Selected service is currently not available.</p>
              <p className="text-sm text-error/80 mt-1">Please try a different service or contact us.</p>
            </div>
          )}

          {/* Timezone Note */}
          <p className="text-xs text-taupe mb-6">Timezone: (GMT-06:00) Central Time (US & Canada)</p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => window.history.back()}
              className="btn-ghost flex-1"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!formData.acceptedTerms || !serviceAvailable}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Tab Sections */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="flex gap-4 border-b border-stone mb-6">
            {['description', 'shipping', 'warranty'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-champagne-gold text-champagne-gold'
                    : 'text-taupe hover:text-charcoal'
                }`}
              >
                {tab === 'description' && 'DESCRIPTION'}
                {tab === 'shipping' && 'SHIPPING & RETURNS'}
                {tab === 'warranty' && 'WARRANTY'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="prose max-w-none"
              >
                <p className="text-charcoal leading-relaxed mb-4">
                  This is a <strong>${product.depositAmount} deposit</strong> toward a custom designed grillz.
                </p>
                <p className="text-charcoal leading-relaxed mb-4">
                  Includes complimentary molding kit and virtual consultation OR in-house consultation + molding.
                </p>
                <p className="text-charcoal leading-relaxed">
                  Please save product codes, screenshots, or sketches of your ideas. You can attach images using
                  the "Choose File" button above to help us better understand your vision.
                </p>
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="prose max-w-none"
              >
                <ul className="space-y-2 text-charcoal">
                  <li>Extra processing time: 2-3 business days</li>
                  <li>Custom made grills: 2-3 weeks to complete</li>
                  <li>14-day return policy excluding custom products</li>
                  <li>Custom pieces are final sale</li>
                </ul>
              </motion.div>
            )}

            {activeTab === 'warranty' && (
              <motion.div
                key="warranty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="prose max-w-none"
              >
                <p className="text-charcoal">
                  30-day manufacturer warranty covers defects in materials and workmanship.
                </p>
                <p className="text-charcoal mt-2">
                  Does not cover damage from misuse, accidents, or normal wear and tear.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-soft-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-semibold">Share</h3>
                <button onClick={() => setShowShareModal(false)}>
                  <X className="w-5 h-5 text-taupe" />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="input-field flex-1"
                />
                <button onClick={copyShareLink} className="btn-primary whitespace-nowrap">
                  Copy Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Added to Cart Modal */}
      <AnimatePresence>
        {showAddedModal && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-white rounded-lg shadow-xl p-6 z-50 max-w-sm"
          >
            <div className="flex items-start gap-4">
              <div className="bg-success/10 rounded-full p-2">
                <Check className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Item added to your cart</h3>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => window.location.href = '/cart'} className="text-sm text-champagne-gold hover:underline">
                    View cart
                  </button>
                  <span className="text-taupe">•</span>
                  <button onClick={() => window.location.href = '/checkout'} className="text-sm text-champagne-gold hover:underline">
                    Check out
                  </button>
                  <span className="text-taupe">•</span>
                  <button onClick={() => setShowAddedModal(false)} className="text-sm text-taupe hover:text-charcoal">
                    Continue shopping
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomGrillzDeposit;
