import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Upload, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import axios from 'axios';
import DiamondPattern from '../components/DiamondPattern';
import DotPattern from '../components/DotPattern';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const CustomJewelryLanding = ({ type }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type,
    name: '',
    email: '',
    phone: '',
    budget: '',
    style: '',
    metal_type: '',
    stone_preferences: [],
    size: '',
    timeline: '',
    notes: '',
    inspiration_images: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const typeConfig = {
    'engagement-rings': {
      title: 'Custom Engagement Rings',
      subtitle: 'Begin your forever with a ring as unique as your love story',
      image: 'https://images.unsplash.com/photo-1721103428207-597c5ceff1cd?w=1200',
      styles: ['Classic', 'Modern', 'Vintage', 'Art Deco', 'Halo', 'Solitaire'],
      metals: ['Platinum', '18K White Gold', '18K Yellow Gold', '18K Rose Gold', '14K White Gold', '14K Yellow Gold']
    },
    'grillz': {
      title: 'Custom Grillz',
      subtitle: 'Bold statements crafted in precious metal',
      image: 'https://images.unsplash.com/photo-1601121141499-17ae80afc03a?w=1200',
      styles: ['Full Set', 'Top 6', 'Bottom 6', 'Single Tooth', 'Fangs'],
      metals: ['10K Gold', '14K Gold', '18K Gold', 'White Gold', 'Rose Gold']
    },
    'chains': {
      title: 'Custom Chains',
      subtitle: 'Wearable art, crafted to your specifications',
      image: 'https://images.unsplash.com/photo-1758995115518-26f90aa61b97?w=1200',
      styles: ['Miami Cuban', 'Rope', 'Franco', 'Figaro', 'Box Chain'],
      metals: ['10K Gold', '14K Gold', '18K Gold', 'White Gold', 'Rose Gold', 'Platinum']
    },
    'pendants': {
      title: 'Custom Pendants',
      subtitle: 'Your story, beautifully told',
      image: 'https://images.unsplash.com/photo-1764179690227-af049306cd20?w=1200',
      styles: ['Initial', 'Name', 'Symbol', 'Religious', 'Custom Design'],
      metals: ['10K Gold', '14K Gold', '18K Gold', 'White Gold', 'Rose Gold', 'Platinum']
    }
  };

  const config = typeConfig[type] || typeConfig['engagement-rings'];
  const totalSteps = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (value) => {
    const stones = formData.stone_preferences.includes(value)
      ? formData.stone_preferences.filter(s => s !== value)
      : [...formData.stone_preferences, value];
    setFormData({ ...formData, stone_preferences: stones });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${API_URL}/api/inquiries/upload`, formData);
        return response.data.url;
      });
      
      const urls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        inspiration_images: [...prev.inspiration_images, ...urls]
      }));
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/inquiries`, formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Error submitting inquiry. Please try again.');
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-soft-black relative overflow-hidden flex items-center justify-center" data-testid="form-confirmation">
        <DotPattern />
        <DiamondPattern className="text-white" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto text-center px-4 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-8"
          >
            <div className="w-32 h-32 rounded-full bg-champagne-gold/20 flex items-center justify-center">
              <CheckCircle2 className="w-20 h-20 text-champagne-gold" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Thank You!
          </h1>
          <p className="text-xl text-stone mb-6">
            Your custom {type.replace('-', ' ')} inquiry has been received.
          </p>
          <p className="text-stone mb-12 max-w-2xl mx-auto">
            Our master craftspeople will review your request and contact you within 24-48 hours
            to begin bringing your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')} 
              className="bg-white/10 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-soft-black transition-all"
            >
              Return Home
            </button>
            <button 
              onClick={() => navigate('/catalog')} 
              className="bg-champagne-gold text-soft-black px-8 py-3 rounded-lg font-semibold hover:bg-warm-gold transition-all"
            >
              Browse Collection
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-black relative overflow-hidden" data-testid="custom-form-hero">
      <DotPattern />
      <DiamondPattern className="text-white" />

      {/* Full Portal Container */}
      <div className="relative z-10">
        {/* Portal Header */}
        <div className="border-b border-champagne-gold/20 bg-deep-charcoal/50 backdrop-blur-sm">
          <div className="section-container py-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-champagne-gold" />
                <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {config.title}
                </h1>
              </div>
              <p className="text-xl text-stone font-light max-w-3xl mx-auto">
                {config.subtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Portal Content */}
        <div className="section-container py-16">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-12" data-testid="form-progress">
              <div className="flex justify-between items-center mb-4">
                {[...Array(totalSteps)].map((_, i) => (
                  <div key={i} className="flex-1 mx-2">
                    <div className="relative">
                      <div className={`h-1 rounded-full transition-all duration-500 ${
                        i + 1 <= currentStep 
                          ? 'bg-gradient-to-r from-champagne-gold to-warm-gold' 
                          : 'bg-charcoal'
                      }`} />
                      <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                        i + 1 <= currentStep
                          ? 'bg-champagne-gold border-champagne-gold text-soft-black scale-110'
                          : 'bg-charcoal border-taupe text-taupe'
                      }`}>
                        {i + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-stone px-2">
                <span>Contact</span>
                <span>Style</span>
                <span>Inspiration</span>
                <span>Details</span>
                <span>Review</span>
              </div>
            </div>

            {/* Form Container - Futuristic Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(44, 44, 44, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                border: '1px solid rgba(201, 167, 94, 0.3)',
                boxShadow: '0 0 60px rgba(201, 167, 94, 0.15)'
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 via-transparent to-champagne-gold/5 pointer-events-none" />
              
              <div className="relative z-10 p-8 md:p-12" data-testid="form-container">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {/* Step 1: Contact Info */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        data-testid="step-inquiry"
                      >
                        <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                          Let's Get Started
                        </h2>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Email *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                            placeholder="john@example.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                            placeholder="+1 (416) 555-1234"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Budget Range</label>
                          <select 
                            name="budget" 
                            value={formData.budget} 
                            onChange={handleInputChange} 
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                          >
                            <option value="" className="bg-charcoal">Select your budget</option>
                            <option value="$1,000-$2,500" className="bg-charcoal">$1,000 - $2,500</option>
                            <option value="$2,500-$5,000" className="bg-charcoal">$2,500 - $5,000</option>
                            <option value="$5,000-$10,000" className="bg-charcoal">$5,000 - $10,000</option>
                            <option value="$10,000+" className="bg-charcoal">$10,000+</option>
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Style Preferences */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        data-testid="step-preferences"
                      >
                        <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                          Your Style
                        </h2>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Preferred Style</label>
                          <select 
                            name="style" 
                            value={formData.style} 
                            onChange={handleInputChange} 
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                          >
                            <option value="" className="bg-charcoal">Select a style</option>
                            {config.styles.map(style => (
                              <option key={style} value={style} className="bg-charcoal">{style}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Metal Type</label>
                          <select 
                            name="metal_type" 
                            value={formData.metal_type} 
                            onChange={handleInputChange} 
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                          >
                            <option value="" className="bg-charcoal">Select metal</option>
                            {config.metals.map(metal => (
                              <option key={metal} value={metal} className="bg-charcoal">{metal}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-4 uppercase tracking-wide">
                            Stone Preferences
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Diamond', 'Sapphire', 'Ruby', 'Emerald', 'None'].map(stone => (
                              <label 
                                key={stone} 
                                className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/20 hover:bg-champagne-gold/10 transition-all"
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.stone_preferences.includes(stone)}
                                  onChange={() => handleCheckboxChange(stone)}
                                  className="w-5 h-5 rounded bg-white/10 border-champagne-gold text-champagne-gold focus:ring-champagne-gold"
                                />
                                <span className="text-white text-sm">{stone}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Inspiration Images */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        data-testid="step-inspiration"
                      >
                        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                          Share Your Inspiration
                        </h2>
                        <p className="text-stone mb-8">
                          Upload images that inspire you. This helps us understand your vision better.
                        </p>
                        
                        <div className="relative border-2 border-dashed border-champagne-gold/30 rounded-xl p-12 text-center bg-white/5 hover:bg-white/10 transition-all">
                          <Upload className="w-16 h-16 text-champagne-gold mx-auto mb-4" />
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                            disabled={uploading}
                          />
                          <label 
                            htmlFor="file-upload" 
                            className="inline-block bg-champagne-gold text-soft-black px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-warm-gold transition-all"
                          >
                            {uploading ? 'Uploading...' : 'Choose Images'}
                          </label>
                          <p className="text-sm text-stone mt-3">PNG, JPG up to 10MB each</p>
                        </div>
                        
                        {formData.inspiration_images.length > 0 && (
                          <div className="mt-8 grid grid-cols-3 gap-4">
                            {formData.inspiration_images.map((img, idx) => (
                              <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-square rounded-lg overflow-hidden border-2 border-champagne-gold/30"
                              >
                                <img src={`${API_URL}${img}`} alt={`Inspiration ${idx + 1}`} className="w-full h-full object-cover" />
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Step 4: Additional Details */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        data-testid="step-specifications"
                      >
                        <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                          Final Details
                        </h2>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Size/Dimensions</label>
                          <input
                            type="text"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                            placeholder="e.g., Ring size 7, Chain 22 inches"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Timeline</label>
                          <select 
                            name="timeline" 
                            value={formData.timeline} 
                            onChange={handleInputChange} 
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                          >
                            <option value="" className="bg-charcoal">When do you need this?</option>
                            <option value="No rush" className="bg-charcoal">No Rush</option>
                            <option value="1-2 months" className="bg-charcoal">1-2 Months</option>
                            <option value="3-6 months" className="bg-charcoal">3-6 Months</option>
                            <option value="Specific date" className="bg-charcoal">Specific Date (we'll discuss)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-champagne-gold mb-2 uppercase tracking-wide">Additional Notes</label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all outline-none"
                            placeholder="Tell us more about your vision..."
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Step 5: Review */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        data-testid="step-review"
                      >
                        <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                          Review Your Request
                        </h2>
                        
                        <div className="space-y-4 bg-white/5 rounded-lg p-6 border border-champagne-gold/20">
                          <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                            <span className="font-medium text-champagne-gold">Name:</span>
                            <span className="text-white">{formData.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                            <span className="font-medium text-champagne-gold">Email:</span>
                            <span className="text-white">{formData.email}</span>
                          </div>
                          {formData.phone && (
                            <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                              <span className="font-medium text-champagne-gold">Phone:</span>
                              <span className="text-white">{formData.phone}</span>
                            </div>
                          )}
                          {formData.budget && (
                            <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                              <span className="font-medium text-champagne-gold">Budget:</span>
                              <span className="text-white">{formData.budget}</span>
                            </div>
                          )}
                          {formData.style && (
                            <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                              <span className="font-medium text-champagne-gold">Style:</span>
                              <span className="text-white">{formData.style}</span>
                            </div>
                          )}
                          {formData.metal_type && (
                            <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                              <span className="font-medium text-champagne-gold">Metal:</span>
                              <span className="text-white">{formData.metal_type}</span>
                            </div>
                          )}
                          {formData.stone_preferences.length > 0 && (
                            <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                              <span className="font-medium text-champagne-gold">Stones:</span>
                              <span className="text-white">{formData.stone_preferences.join(', ')}</span>
                            </div>
                          )}
                          {formData.size && (
                            <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                              <span className="font-medium text-champagne-gold">Size:</span>
                              <span className="text-white">{formData.size}</span>
                            </div>
                          )}
                          {formData.timeline && (
                            <div className="flex justify-between border-b border-champagne-gold/10 pb-3">
                              <span className="font-medium text-champagne-gold">Timeline:</span>
                              <span className="text-white">{formData.timeline}</span>
                            </div>
                          )}
                          {formData.notes && (
                            <div className="border-b border-champagne-gold/10 pb-3">
                              <span className="font-medium text-champagne-gold block mb-2">Notes:</span>
                              <span className="text-white text-sm">{formData.notes}</span>
                            </div>
                          )}
                          {formData.inspiration_images.length > 0 && (
                            <div>
                              <span className="font-medium text-champagne-gold block mb-2">Inspiration Images:</span>
                              <span className="text-white text-sm">{formData.inspiration_images.length} image(s) uploaded</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-12 pt-8 border-t border-champagne-gold/20" data-testid="form-navigation">
                    {currentStep > 1 && (
                      <button 
                        type="button" 
                        onClick={prevStep} 
                        className="flex items-center gap-2 px-8 py-3 rounded-lg bg-white/5 border border-champagne-gold/30 text-white hover:bg-white/10 transition-all font-semibold"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                      </button>
                    )}
                    
                    {currentStep < totalSteps ? (
                      <button 
                        type="button" 
                        onClick={nextStep} 
                        className="ml-auto flex items-center gap-2 px-8 py-3 rounded-lg bg-champagne-gold text-soft-black hover:bg-warm-gold transition-all font-semibold shadow-lg hover:shadow-xl"
                      >
                        Next
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        className="ml-auto px-8 py-3 rounded-lg bg-champagne-gold text-soft-black hover:bg-warm-gold transition-all font-semibold shadow-lg hover:shadow-xl"
                      >
                        Submit Request
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomJewelryLanding;
