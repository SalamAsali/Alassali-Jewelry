import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Award, Heart, ArrowRight } from 'lucide-react';
import axios from 'axios';

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

  const customJewelryTypes = [
    {
      title: 'Engagement Rings',
      description: 'Forever begins with the perfect ring',
      image: 'https://images.unsplash.com/photo-1721103428207-597c5ceff1cd?w=800',
      path: '/custom/engagement-rings'
    },
    {
      title: 'Grillz',
      description: 'Bold statements in precious metal',
      image: 'https://images.unsplash.com/photo-1601121141499-17ae80afc03a?w=800',
      path: '/custom/grillz'
    },
    {
      title: 'Chains',
      description: 'Timeless elegance, wearable art',
      image: 'https://images.unsplash.com/photo-1758995115518-26f90aa61b97?w=800',
      path: '/custom/chains'
    },
    {
      title: 'Pendants',
      description: 'Your story, beautifully told',
      image: 'https://images.unsplash.com/photo-1764179690227-af049306cd20?w=800',
      path: '/custom/pendants'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center gradient-hero"
        data-testid="homepage-hero"
      >
        <div className="section-container py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5 text-champagne-gold" />
              <span className="text-sm uppercase tracking-wider font-medium text-charcoal">
                Crafted in Toronto
              </span>
            </motion.div>

            <h1 className="heading-hero text-deep-charcoal mb-6">
              Where Craftsmanship
              <br />
              Meets <span className="text-champagne-gold">Luxury</span>
            </h1>

            <p className="text-lg sm:text-xl text-taupe mb-12 max-w-2xl mx-auto leading-relaxed">
              Bespoke jewelry tailored to your vision. From timeless engagement rings to bold statement pieces, 
              each creation tells your unique story.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/custom/engagement-rings"
                className="btn-primary"
                data-testid="hero-cta-primary"
              >
                Start Your Journey
                <ArrowRight className="inline-block w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/catalog"
                className="btn-secondary"
                data-testid="hero-cta-secondary"
              >
                Explore Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Trust Badges */}
      <section className="bg-white py-12" data-testid="trust-badges-section">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Fully Insured', subtitle: 'Shipping' },
              { icon: Award, title: 'Lifetime', subtitle: 'Warranty' },
              { icon: Heart, title: 'Complimentary', subtitle: 'Resizing' },
              { icon: Sparkles, title: 'Adult Signature', subtitle: 'Required (21+)' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
                data-testid={`trust-badge-${index}`}
              >
                <badge.icon className="w-8 h-8 text-champagne-gold mb-3" />
                <p className="text-xs uppercase tracking-wider font-medium text-deep-charcoal mb-1">
                  {badge.title}
                </p>
                <p className="text-sm text-taupe">{badge.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-off-white py-20" data-testid="featured-products-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-deep-charcoal mb-4">The Icons</h2>
            <p className="text-lg text-taupe max-w-2xl mx-auto">
              Handpicked pieces that define timeless elegance
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
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
                  <div className="product-card">
                    <div className="aspect-square overflow-hidden bg-warm-white relative">
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
                      <h3 className="font-heading text-lg font-medium text-deep-charcoal mb-2 group-hover:text-champagne-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-taupe mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-deep-charcoal">
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

          <div className="text-center mt-12">
            <Link to="/catalog" className="btn-secondary" data-testid="view-all-products">
              View All Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Jewelry Section */}
      <section className="bg-white py-24" data-testid="custom-jewelry-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section text-deep-charcoal mb-4">Bespoke Stories</h2>
            <p className="text-lg text-taupe max-w-2xl mx-auto">
              From concept to creation, we bring your vision to life with precision and artistry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customJewelryTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="group cursor-pointer"
                onClick={() => navigate(type.path)}
                data-testid={`custom-type-${index}`}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <div className="aspect-[3/4] overflow-hidden">
                    <motion.img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-soft-black/80 via-soft-black/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-heading text-2xl font-semibold mb-2">{type.title}</h3>
                    <p className="text-sm text-white/80 mb-4">{type.description}</p>
                    <motion.div
                      className="flex items-center text-champagne-gold font-medium text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <span>Start Custom Design</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Made in Toronto Section */}
      <section className="bg-off-white py-20" data-testid="made-in-toronto-section">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-block bg-champagne-gold/10 px-4 py-2 rounded-full mb-6">
                <span className="text-sm uppercase tracking-wider font-medium text-champagne-gold">
                  Crafted in Canada
                </span>
              </div>
              <h2 className="heading-section text-deep-charcoal mb-6">
                Made in Toronto,
                <br />
                Cherished Globally
              </h2>
              <p className="text-lg text-taupe mb-6 leading-relaxed">
                Every piece from Alassali is a testament to Toronto's multicultural artistry and 
                our commitment to ethical excellence. We source responsibly, craft meticulously, 
                and deliver with pride.
              </p>
              <p className="text-base text-taupe mb-8 leading-relaxed">
                From the Diamond District's heritage to cutting-edge lab-grown innovations, 
                we honor tradition while embracing the future of fine jewelry.
              </p>
              <Link to="/custom/engagement-rings" className="btn-primary">
                Discover Our Process
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1706955008775-c00874bb4d4b?w=800"
                  alt="Artisan crafting jewelry"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-deep-charcoal text-white py-16" data-testid="final-cta-section">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section mb-6">
              Ready to Create Something
              <br />
              <span className="text-champagne-gold">Extraordinary?</span>
            </h2>
            <p className="text-lg text-warm-gray mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life. Schedule a consultation with our master craftspeople.
            </p>
            <Link to="/custom/engagement-rings" className="gradient-gold inline-block px-10 py-4 rounded-lg text-soft-black font-semibold hover:shadow-xl transition-shadow duration-300">
              Start Your Journey Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
