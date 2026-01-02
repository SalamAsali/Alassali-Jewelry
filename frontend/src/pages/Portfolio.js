import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DiamondPattern from '../components/DiamondPattern';
import DotPattern from '../components/DotPattern';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const Portfolio = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  // Additional portfolio items with custom images
  const customPortfolioItems = [
    {
      _id: 'custom-1',
      name: 'Custom Pendants Collection',
      category: 'pendants',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/vw4agpvw_4-pendants-on-the-rolls-Royce-scaled.jpeg'],
      description: 'Bespoke pendants featuring custom photo bezels'
    },
    {
      _id: 'custom-2',
      name: 'Silver Cuban Chains',
      category: 'chains',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/12igjdxa_DSC_0203_Original-scaled.jpg'],
      description: 'Premium silver Miami Cuban link chains'
    },
    {
      _id: 'custom-3',
      name: 'Custom Chain Design',
      category: 'chains',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/2vm3an05_DSC_2764_Original-scaled.jpg'],
      description: 'Hand-crafted custom chain with unique links'
    },
    {
      _id: 'custom-4',
      name: '"03" Ring',
      category: 'rings',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/ewu0gr89_image8.png'],
      description: 'Custom numbered ring design'
    },
    {
      _id: 'custom-5',
      name: 'Cartier Frames',
      category: 'accessories',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/0z9wb0kq_image9.png'],
      description: 'Luxury eyewear customization'
    },
    {
      _id: 'custom-6',
      name: 'Diamond Tennis Bracelet',
      category: 'bracelets',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/0lg7vzu6_image10.png'],
      description: 'Classic tennis bracelet with premium diamonds'
    },
    {
      _id: 'custom-7',
      name: 'Custom Gold Chain',
      category: 'chains',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/9milxomg_image11.png'],
      description: 'Handcrafted gold chain with unique design'
    },
    {
      _id: 'custom-8',
      name: 'Diamond Grillz Set',
      category: 'grillz',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/yymak1c4_image3.png'],
      description: 'Full set custom diamond grillz'
    },
    {
      _id: 'custom-9',
      name: 'Custom Name Pendant',
      category: 'pendants',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/p7ig6gz1_image4.png'],
      description: 'Personalized name necklace'
    },
    {
      _id: 'custom-10',
      name: 'Diamond Photo Pendant',
      category: 'pendants',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/vmbmd1a1_image5.png'],
      description: 'Custom photo pendant with diamond frame'
    },
    {
      _id: 'custom-11',
      name: 'Gold Cuban Link',
      category: 'chains',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/vymug39g_image6.png'],
      description: 'Premium gold Cuban link chain'
    },
    {
      _id: 'custom-12',
      name: 'Custom Diamond Piece',
      category: 'jewelry',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/r0vdc3yj_image7.png'],
      description: 'Bespoke diamond jewelry piece'
    },
    {
      _id: 'custom-13',
      name: 'G Pendant',
      category: 'pendants',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/e69dp6n0_G-pendant.jpg'],
      description: 'Custom letter G pendant with diamonds'
    },
    {
      _id: 'custom-14',
      name: 'Custom Diamond Ring',
      category: 'rings',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/sqmmun3t_image2.png'],
      description: 'Bespoke diamond ring design'
    },
    {
      _id: 'custom-15',
      name: 'Premium Gold Piece',
      category: 'jewelry',
      images: ['https://customer-assets.emergentagent.com/job_gemini-doc-analysis/artifacts/h7z2aalc_image3-1.png'],
      description: 'Custom gold jewelry creation'
    }
  ];

  const allPortfolio = [...customPortfolioItems, ...products];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Black with Diamond Pattern */}
      <section className="relative min-h-[60vh] flex items-center bg-soft-black text-white overflow-hidden">
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
              className="text-7xl md:text-8xl lg:text-9xl font-bold"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              PORTFOLIO
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative diamond elements scattered */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M 20,5 L 30,20 L 20,35 L 10,20 Z" fill="none" stroke="#2C2C2C" strokeWidth="1" />
              </svg>
            </div>
          ))}
        </div>

        <div className="section-container relative z-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-stone/20 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPortfolio.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => item._id.startsWith('custom-') ? null : navigate(`/product/${item._id}`)}
                  data-testid={`portfolio-item-${index}`}
                >
                  <div className="relative overflow-hidden rounded-lg border-4 border-soft-black shadow-lg">
                    <div className="aspect-square overflow-hidden bg-white">
                      <motion.img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    
                    {/* Text Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-soft-black via-soft-black/80 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300"
                    >
                      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-stone">{item.description}</p>
                      )}
                      {item.category && (
                        <span className="inline-block mt-2 text-xs uppercase tracking-wider text-champagne-gold font-medium">
                          {item.category.replace('-', ' ')}
                        </span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
