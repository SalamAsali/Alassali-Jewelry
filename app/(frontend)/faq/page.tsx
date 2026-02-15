'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'

export const dynamic = 'force-dynamic'

const faqData = [
  { category: 'Payment', questions: [
    { id: 'payment-1', question: 'What form of payments are accepted?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), wire transfers, and cryptocurrencies (Bitcoin, USDC). For custom orders over $10,000, we offer flexible payment plans.' },
    { id: 'payment-2', question: 'Am I able to split up payments?', answer: 'Yes! For custom orders, we offer flexible payment plans. A deposit is required to begin production, with the balance due before shipping. Contact us to discuss payment arrangements that work for you.' },
    { id: 'payment-3', question: 'What is the minimum deposit for a custom?', answer: 'The minimum deposit for custom jewelry is $500 CAD. This deposit is applied toward your final price and secures your spot in our production queue. The deposit is non-refundable once production begins.' },
    { id: 'payment-4', question: 'Are deposits refundable?', answer: 'Deposits are refundable before production begins. Once we start creating your custom piece, the deposit becomes non-refundable as materials have been sourced and labor committed.' },
  ]},
  { category: 'Shipping', questions: [
    { id: 'shipping-1', question: 'Can I track my shipments?', answer: 'Yes! Once your order ships, you will receive a tracking number via email. All shipments are fully insured and require an adult signature (21+) upon delivery.' },
    { id: 'shipping-2', question: 'How long does shipping take?', answer: 'Standard shipping within Canada takes 3-5 business days. International shipping varies by destination. Express shipping options are available for an additional fee.' },
    { id: 'shipping-3', question: 'Is shipping insured?', answer: 'Yes, all shipments are fully insured. We take every precaution to ensure your jewelry arrives safely and securely.' },
  ]},
  { category: 'Custom Orders', questions: [
    { id: 'custom-1', question: 'How long does a custom piece take?', answer: 'Custom jewelry typically takes 4-8 weeks from design approval to completion. Complex pieces may take longer. We will provide a detailed timeline during your consultation.' },
    { id: 'custom-2', question: 'Can I see the design before production?', answer: 'Absolutely! We provide CAD renderings and detailed sketches before production begins. You can request revisions until you are completely satisfied with the design.' },
    { id: 'custom-3', question: 'What is your return policy for custom pieces?', answer: 'Custom pieces are made to your specifications and are non-returnable. However, we offer complimentary resizing and adjustments within 30 days of delivery.' },
  ]},
  { category: 'Care & Maintenance', questions: [
    { id: 'care-1', question: 'How do I care for my jewelry?', answer: 'We provide detailed care instructions with every purchase. Generally, store jewelry in a soft pouch, avoid harsh chemicals, and clean with a soft cloth. Professional cleaning is recommended annually.' },
    { id: 'care-2', question: 'Do you offer resizing?', answer: 'Yes! We offer complimentary resizing within 30 days of purchase. After that, resizing is available for a small fee.' },
    { id: 'care-3', question: 'What is your warranty?', answer: 'All jewelry comes with a lifetime warranty against manufacturing defects. Normal wear and tear is not covered, but we offer repair services at reasonable rates.' },
  ]},
]

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <>
      <div className="relative bg-soft-black text-white py-24 overflow-hidden">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Frequently Asked Questions</h1>
            <p className="text-lg text-stone max-w-3xl mx-auto">Everything you need to know about our jewelry, services, and policies</p>
          </motion.div>
        </div>
      </div>
      <div className="bg-white py-24">
        <div className="section-container max-w-4xl">
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <motion.div key={category.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: categoryIndex * 0.1 }}>
                <h2 className="text-3xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq) => (
                    <div key={faq.id} className="bg-off-white rounded-lg border border-stone overflow-hidden">
                      <button onClick={() => toggleItem(faq.id)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-soft-beige transition-colors">
                        <span className="font-semibold text-deep-charcoal pr-4">{faq.question}</span>
                        {expandedItems.includes(faq.id) ? <Minus className="w-5 h-5 text-glacier-grey flex-shrink-0" /> : <Plus className="w-5 h-5 text-glacier-grey flex-shrink-0" />}
                      </button>
                      <AnimatePresence>
                        {expandedItems.includes(faq.id) && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="px-6 py-4 text-taupe leading-relaxed">{faq.answer}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
