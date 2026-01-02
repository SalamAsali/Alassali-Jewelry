import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import DiamondPattern from '../components/DiamondPattern';
import DotPattern from '../components/DotPattern';

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const faqData = [
    {
      category: 'Payment',
      questions: [
        {
          id: 'payment-1',
          question: 'What form of payments are accepted?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), wire transfers, and cryptocurrencies (Bitcoin, USDC). For custom orders over $10,000, we offer flexible payment plans.'
        },
        {
          id: 'payment-2',
          question: 'Am I able to split up payments?',
          answer: 'Yes! For custom orders, we offer flexible payment plans. A deposit is required to begin production, with the balance due before shipping. Contact us to discuss payment arrangements that work for you.'
        },
        {
          id: 'payment-3',
          question: 'What is the minimum deposit for a custom?',
          answer: 'The minimum deposit for custom jewelry is $500 CAD. This deposit is applied toward your final price and secures your spot in our production queue. The deposit is non-refundable once production begins.'
        },
        {
          id: 'payment-4',
          question: 'Are deposits refundable?',
          answer: 'Deposits are refundable before production begins. Once we start creating your custom piece, the deposit becomes non-refundable as materials have been sourced and labor committed.'
        }
      ]
    },
    {
      category: 'Shipping',
      questions: [
        {
          id: 'shipping-1',
          question: 'Can I track my shipments?',
          answer: 'Yes! Once your order ships, you will receive a tracking number via email. All shipments are fully insured and require an adult signature (21+) upon delivery.'
        },
        {
          id: 'shipping-2',
          question: 'Do you ship outside of Canada / USA?',
          answer: 'Yes, we ship worldwide! International shipping rates and times vary by destination. Customs duties and import fees are the responsibility of the recipient.'
        },
        {
          id: 'shipping-3',
          question: 'Can I get expedited shipping?',
          answer: 'Expedited shipping is available for in-stock items. For custom orders, production time is separate from shipping time. Contact us to discuss rush orders, which may incur additional fees.'
        },
        {
          id: 'shipping-4',
          question: 'Is my shipment insured?',
          answer: 'All shipments are fully insured at no additional cost to you. We use trusted carriers with specialized jewelry shipping protocols to ensure your piece arrives safely.'
        },
        {
          id: 'shipping-5',
          question: 'What about international duties & fees?',
          answer: 'International customers are responsible for any customs duties, taxes, or import fees imposed by their country. These fees are not included in our shipping costs and vary by destination.'
        }
      ]
    }
  ];

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
              FAQ'S
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative wavy lines and diamonds */}
        <svg className="absolute top-20 left-0 w-full h-96 opacity-5" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <path 
            d="M 0,200 Q 250,50 500,200 T 1000,200" 
            fill="none" 
            stroke="#8B7D6B" 
            strokeWidth="3"
          />
        </svg>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Alassali Jewelry Studio:
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqData.map((section, sectionIndex) => (
              <div key={section.category}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="text-2xl font-bold text-deep-charcoal mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {section.category}:
                </motion.h3>

                <div className="space-y-4">
                  {section.questions.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (index * 0.05) }}
                      className="bg-white rounded-lg shadow-lg border border-stone hover:border-champagne-gold transition-all"
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                        data-testid={`faq-question-${faq.id}`}
                      >
                        <span className="font-semibold text-deep-charcoal pr-4">
                          {faq.question}
                        </span>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-soft-black flex items-center justify-center transition-transform">
                          {expandedItems.includes(faq.id) ? (
                            <Minus className="w-5 h-5 text-champagne-gold" />
                          ) : (
                            <Plus className="w-5 h-5 text-champagne-gold" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedItems.includes(faq.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 text-taupe leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Decorative diamond elements */}
          <div className="absolute top-40 right-20 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <path d="M 50,10 L 75,50 L 50,90 L 25,50 Z" fill="none" stroke="#2C2C2C" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute bottom-40 left-20 opacity-10">
            <svg width="80" height="80" viewBox="0 0 100 100">
              <path d="M 50,10 L 75,50 L 50,90 L 25,50 Z" fill="none" stroke="#2C2C2C" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
