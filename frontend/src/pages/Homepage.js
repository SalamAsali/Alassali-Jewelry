import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Award, Heart, ArrowRight, Star } from 'lucide-react';
import axios from 'axios';
import DiamondPattern from '../components/DiamondPattern';
import DotPattern from '../components/DotPattern';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products?featured=true`);
      setFeaturedProducts(response.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const customProcess = [
    { 
      icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/twegjzfj_Consultation.png', 
      label: 'Consultation', 
      description: 'Discuss Your Vision' 
    },
    { 
      icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/ksl2vd8y_Sketch.png', 
      label: 'Sketch', 
      description: 'Initial Design' 
    },
    { 
      icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/twegjzfj_Consultation.png', 
      label: 'Material Selection', 
      description: 'Choose Metals & Stones' 
    },
    { 
      icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/l3vhvhkh_Design.png', 
      label: 'Design', 
      description: 'CAD Rendering' 
    },
    { 
      icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/9fg6i9rv_In-House-Manufacture.png', 
      label: 'In-House Manufacture', 
      description: 'Crafting' 
    },
    { 
      icon: 'https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/ye0fvbed_Presentation.png', 
      label: 'Presentation', 
      description: 'Final Reveal' 
    },
  ];

  const testimonials = [
    {
      name: 'gray',
      rating: 5,
      text: 'Had a perfect experience! Unmatched creativity and execution, definitely the only place to go in toronto for jewelry',
      source: 'Google'
    },
    {
      name: 'Umair Alahi',
      rating: 5,
      text: 'My experience shopping here was excellent. They answered all my questions, worked out a price that fits my budget, & helped me choose the perfect piece and also kept in touch after the sale to make sure I was satisfied.',
      source: 'Google'
    },
    {
      name: 'Padrono',
      rating: 5,
      text: "I've been to many shops looking for custom grillz and kept getting really high quotes. At this shop I was taken care of and the price was explained. The final product was worth way more than what I paid. By far the only place I will be going!",
      source: 'Google'
    },
    {
      name: 'Huss',
      rating: 5,
      text: 'Have bought a couple of custom pieces with this store (rings, grills) and the dedication to making a product you like and want to wear is the best thing about working with them. From start to finish a great experience!',
      source: 'Google'
    },
    {
      name: 'Fahmi Tobaji',
      rating: 5,
      text: 'Excellent quality and professionally made parts',
      source: 'Google'
    },
    {
      name: 'MuhannadMB',
      rating: 5,
      text: "Extremely professional service. Moe was able to incorporate his own ideas into the design I had in mind. The work and quality were flawless and I am very satisfied. I was also able to build a long lasting relationship with Moe, he's very friendly and genuine.",
      source: 'Google'
    }
  ];

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section - Black with Diamond Pattern */}
      <section className="relative min-h-screen flex items-center bg-soft-black text-white overflow-hidden" data-testid="homepage-hero">
        <DotPattern />
        <DiamondPattern className="text-white" />
        
        <div className="section-container py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              TORONTO
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-4xl md:text-5xl font-light mb-6 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Custom Jeweler
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-sm uppercase tracking-widest mb-12 text-stone"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              ONLY THE FINEST
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <Link
                to="/catalog"
                className="inline-block bg-white text-soft-black px-12 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-champagne-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
                data-testid="hero-cta-primary"
              >
                VIEW MY WORK
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Custom Made Process Section */}
      <section className="bg-white py-24" data-testid="custom-made-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Custom Made
            </h2>
            <p className="text-lg text-taupe max-w-3xl mx-auto leading-relaxed">
              "We believe in a collaborative approach to custom jewelry creation. Each piece is a partnership 
              between your vision and our expertise, resulting in truly one-of-a-kind artistry."
            </p>
          </motion.div>

          {/* Process Icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {customProcess.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, backgroundColor: 'rgba(201, 167, 94, 0.1)' }}
                className="group flex flex-col items-center bg-white border-2 border-soft-black rounded-xl p-6 w-40 transition-all duration-300 hover:border-champagne-gold"
              >
                <div className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <img src={step.icon} alt={step.label} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-sm font-bold text-deep-charcoal mb-1 text-center">{step.label}</h3>
                <p className="text-xs text-taupe text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/custom/engagement-rings"
              className="inline-flex items-center gap-2 bg-deep-charcoal text-white px-10 py-4 rounded-lg font-semibold hover:bg-champagne-gold hover:text-soft-black transition-all duration-300"
            >
              SHOP NOW
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Made In Toronto Section - Redesigned with Integrated Images */}
      <section className="relative bg-soft-black text-white py-32 overflow-hidden">
        <DotPattern />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Text with Integrated Images */}
            <div className="relative">
              {/* First Row: MADE */}
              <div className="flex items-center justify-center mb-8">
                {/* M with image */}
                <div className="relative inline-block">
                  <h2 
                    className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none text-white/30"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    M
                  </h2>
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/12igjdxa_DSC_0203_Original-scaled.jpg"
                    alt=""
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 object-cover rounded-lg shadow-2xl border-4 border-champagne-gold/50"
                    style={{ zIndex: 10, mixBlendMode: 'overlay', opacity: 0.9 }}
                  />
                </div>
                
                {/* ADE */}
                <h2 
                  className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  ADE
                </h2>
              </div>

              {/* Second Row: IN */}
              <div className="flex items-center justify-center mb-8">
                <h2 
                  className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  IN
                </h2>
              </div>

              {/* Third Row: TORONTO */}
              <div className="flex items-center justify-center relative">
                {/* T with image */}
                <div className="relative inline-block">
                  <h2 
                    className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none text-white/30"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    T
                  </h2>
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/2vm3an05_DSC_2764_Original-scaled.jpg"
                    alt=""
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 object-cover rounded-lg shadow-2xl border-4 border-champagne-gold/50"
                    style={{ zIndex: 10, mixBlendMode: 'overlay', opacity: 0.9 }}
                  />
                </div>
                
                {/* ORONTO */}
                <h2 
                  className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  ORONTO
                </h2>
              </div>

              {/* Floating accent image */}
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/sqmmun3t_image2.png"
                alt=""
                className="absolute top-20 right-10 w-32 h-40 object-cover rounded-lg shadow-2xl border-2 border-white/20 transform rotate-12"
              />

              <motion.img
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/vw4agpvw_4-pendants-on-the-rolls-Royce-scaled.jpeg"
                alt=""
                className="absolute bottom-20 left-10 w-40 h-56 object-cover rounded-lg shadow-2xl border-2 border-white/20 transform -rotate-6"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section with Wavy Line */}
      <section className="bg-white py-24 relative overflow-hidden">
        {/* Decorative wavy line */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path 
            d="M 0,250 Q 250,100 500,250 T 1000,250" 
            fill="none" 
            stroke="#8B7D6B" 
            strokeWidth="2"
          />
        </svg>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-8">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <path d="M30 5 L40 25 L60 30 L40 35 L30 55 L20 35 L0 30 L20 25 Z" fill="#C9A75E" />
              </svg>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-stone"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-deep-charcoal">{testimonial.name}</span>
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4" />
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-taupe text-sm leading-relaxed mb-3 line-clamp-4">{testimonial.text}</p>
                <button className="text-champagne-gold text-sm font-medium hover:underline">Read more</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Check Out Our Creations Section */}
      <section className="bg-off-white py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/vw4agpvw_4-pendants-on-the-rolls-Royce-scaled.jpeg"
                alt="Custom Pendants on Rolls Royce"
                className="w-full rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Check Out Some Of
                <br />
                Our Creations
              </h2>
              <p className="text-lg text-taupe mb-8 leading-relaxed">
                Every piece tells a story. From intricate diamond settings to bold statement chains,
                our portfolio showcases the breadth of our artistry and technical precision.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 bg-deep-charcoal text-white px-8 py-4 rounded-lg font-semibold hover:bg-champagne-gold hover:text-soft-black transition-all duration-300"
              >
                PORTFOLIO
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Toronto Serving Globally Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        {/* Diagonal line decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-1 h-full bg-deep-charcoal transform -rotate-12"></div>
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/w5nwegci_storeout.jpg"
                alt="Alassali Jewelry Studio Exterior"
                className="col-span-2 w-full rounded-xl shadow-2xl"
              />
              <img
                src="https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/w7ayj2uj_storein.jpg"
                alt="Alassali Jewelry Studio Interior"
                className="col-span-2 w-full rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Toronto,
                <br />
                Serving Globally
              </h2>
              <p className="text-lg text-taupe mb-6 leading-relaxed">
                Rooted in Toronto's multicultural excellence, we craft jewelry that transcends borders.
                Our commitment to ethical sourcing and masterful artistry has earned us clients worldwide.
              </p>
              <p className="text-base text-taupe mb-8 leading-relaxed">
                From the Diamond District heritage to cutting-edge lab-grown innovations,
                we honor tradition while embracing the future of fine jewelry.
              </p>
              <Link
                to="/custom/engagement-rings"
                className="inline-flex items-center gap-2 bg-deep-charcoal text-white px-8 py-4 rounded-lg font-semibold hover:bg-champagne-gold hover:text-soft-black transition-all duration-300"
              >
                VIEW MORE
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-off-white py-16" data-testid="trust-badges-section">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'FULLY INSURED', subtitle: 'Shipping' },
              { icon: Award, title: 'LIFETIME', subtitle: 'Warranty' },
              { icon: Heart, title: 'COMPLIMENTARY', subtitle: 'Resizing' },
              { icon: Sparkles, title: 'ADULT SIGNATURE', subtitle: 'Required (21+)' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center bg-white rounded-lg p-6 border border-stone hover:border-champagne-gold transition-colors"
                data-testid={`trust-badge-${index}`}
              >
                <badge.icon className="w-8 h-8 text-champagne-gold mb-3" />
                <p className="text-xs uppercase tracking-wider font-bold text-deep-charcoal mb-1">
                  {badge.title}
                </p>
                <p className="text-sm text-taupe">{badge.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - "The Icons" */}
      <section className="bg-white py-20" data-testid="featured-products-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              The Icons
            </h2>
            <p className="text-lg text-taupe max-w-2xl mx-auto">
              Our signature pieces that define timeless luxury
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-96 animate-pulse border border-stone" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="featured-products-grid">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                  data-testid={`featured-product-${index}`}
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-stone hover:border-champagne-gold transition-all shadow-lg hover:shadow-2xl">
                    <div className="aspect-square overflow-hidden bg-white relative">
                      <motion.img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.inventory_type === 'lab-grown' && (
                          <div className="bg-champagne-gold text-soft-black text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide">
                            Lab-Grown
                          </div>
                        )}
                        {product.specifications?.clarity && (
                          <div className="bg-white/90 backdrop-blur-sm text-deep-charcoal text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide">
                            {product.specifications.clarity}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-semibold text-deep-charcoal mb-2 group-hover:text-champagne-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-taupe mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-deep-charcoal">
                          ${product.price.toLocaleString()}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-champagne-gold font-medium">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA - Black Background */}
      <section className="relative bg-soft-black text-white py-20" data-testid="final-cta-section">
        <DotPattern />
        
        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Ready to Create Something
              <br />
              <span className="text-champagne-gold">Extraordinary?</span>
            </h2>
            <p className="text-lg text-stone mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life. Schedule a consultation with our master craftspeople.
            </p>
            <Link 
              to="/custom/engagement-rings" 
              className="inline-block bg-champagne-gold text-soft-black px-12 py-4 rounded-lg font-bold hover:bg-warm-gold transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              START YOUR JOURNEY TODAY
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
