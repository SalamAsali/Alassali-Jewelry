import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';

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
      <div className="min-h-screen bg-off-white flex items-center justify-center py-12" data-testid="form-confirmation">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-8"
          >
            <CheckCircle2 className="w-24 h-24 text-champagne-gold" />
          </motion.div>
          <h1 className="heading-section mb-6">Thank You!</h1>
          <p className="text-lg text-taupe mb-4">
            Your custom {type.replace('-', ' ')} inquiry has been received successfully.
          </p>
          <p className="text-taupe mb-8">
            Our master craftspeople will review your request and contact you within 24-48 hours
            to begin bringing your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/')} className="btn-secondary">
              Return Home
            </button>
            <button onClick={() => navigate('/catalog')} className="btn-primary">
              Browse Collection
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white" data-testid="custom-form-hero">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img src={config.image} alt={config.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-soft-black/60 to-soft-black/80" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="heading-hero mb-4">{config.title}</h1>
            <p className="text-xl font-light">{config.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="section-container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12" data-testid="form-container">
            {/* Progress */}
            <div className="mb-8" data-testid="form-progress">
              <div className="flex justify-between mb-2">
                {[...Array(totalSteps)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full mx-1 transition-colors ${
                      i + 1 <= currentStep ? 'bg-champagne-gold' : 'bg-stone'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-taupe text-center">
                Step {currentStep} of {totalSteps}
              </p>
            </div>

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
                    <h2 className="heading-subsection mb-6">Let's Get Started</h2>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="+1 (416) 555-1234"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Budget Range</label>
                      <select name="budget" value={formData.budget} onChange={handleInputChange} className="input-field">
                        <option value="">Select your budget</option>
                        <option value="$1,000-$2,500">$1,000 - $2,500</option>
                        <option value="$2,500-$5,000">$2,500 - $5,000</option>
                        <option value="$5,000-$10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
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
                    <h2 className="heading-subsection mb-6">Your Style</h2>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Preferred Style</label>
                      <select name="style" value={formData.style} onChange={handleInputChange} className="input-field">
                        <option value="">Select a style</option>
                        {config.styles.map(style => (
                          <option key={style} value={style}>{style}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Metal Type</label>
                      <select name="metal_type" value={formData.metal_type} onChange={handleInputChange} className="input-field">
                        <option value="">Select metal</option>
                        {config.metals.map(metal => (
                          <option key={metal} value={metal}>{metal}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-4">Stone Preferences (Select all that apply)</label>
                      <div className="space-y-3">
                        {['Diamond', 'Sapphire', 'Ruby', 'Emerald', 'None'].map(stone => (
                          <label key={stone} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.stone_preferences.includes(stone)}
                              onChange={() => handleCheckboxChange(stone)}
                              className="w-5 h-5 text-champagne-gold rounded focus:ring-champagne-gold"
                            />
                            <span className="text-charcoal">{stone}</span>
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
                    <h2 className="heading-subsection mb-6">Share Your Inspiration</h2>
                    <p className="text-taupe mb-6">
                      Upload images that inspire you. This helps us understand your vision better.
                    </p>
                    <div className="border-2 border-dashed border-stone rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-champagne-gold mx-auto mb-4" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        disabled={uploading}
                      />
                      <label htmlFor="file-upload" className="btn-primary inline-block cursor-pointer">
                        {uploading ? 'Uploading...' : 'Choose Images'}
                      </label>
                      <p className="text-sm text-taupe mt-2">PNG, JPG up to 10MB each</p>
                    </div>
                    {formData.inspiration_images.length > 0 && (
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        {formData.inspiration_images.map((img, idx) => (
                          <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                            <img src={`${API_URL}${img}`} alt={`Inspiration ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
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
                    <h2 className="heading-subsection mb-6">Final Details</h2>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Size/Dimensions</label>
                      <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g., Ring size 7, Chain 22 inches"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Timeline</label>
                      <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="input-field">
                        <option value="">When do you need this?</option>
                        <option value="No rush">No Rush</option>
                        <option value="1-2 months">1-2 Months</option>
                        <option value="3-6 months">3-6 Months</option>
                        <option value="Specific date">Specific Date (we'll discuss)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Additional Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={4}
                        className="input-field"
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
                    <h2 className="heading-subsection mb-6">Review Your Request</h2>
                    <div className="space-y-4 bg-off-white rounded-lg p-6">
                      <div><span className="font-medium">Name:</span> {formData.name}</div>
                      <div><span className="font-medium">Email:</span> {formData.email}</div>
                      {formData.phone && <div><span className="font-medium">Phone:</span> {formData.phone}</div>}
                      {formData.budget && <div><span className="font-medium">Budget:</span> {formData.budget}</div>}
                      {formData.style && <div><span className="font-medium">Style:</span> {formData.style}</div>}
                      {formData.metal_type && <div><span className="font-medium">Metal:</span> {formData.metal_type}</div>}
                      {formData.stone_preferences.length > 0 && (
                        <div><span className="font-medium">Stones:</span> {formData.stone_preferences.join(', ')}</div>
                      )}
                      {formData.size && <div><span className="font-medium">Size:</span> {formData.size}</div>}
                      {formData.timeline && <div><span className="font-medium">Timeline:</span> {formData.timeline}</div>}
                      {formData.notes && <div><span className="font-medium">Notes:</span> {formData.notes}</div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8" data-testid="form-navigation">
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className="btn-ghost flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button type="button" onClick={nextStep} className="btn-primary ml-auto flex items-center gap-2">
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button type="submit" className="btn-primary ml-auto">
                    Submit Request
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomJewelryLanding;
