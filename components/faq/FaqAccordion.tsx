'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export type FaqAccordionCategory = {
  category: string
  questions: { id: string; question: string; answer: string }[]
}

type Props = {
  data: FaqAccordionCategory[]
}

export default function FaqAccordion({ data }: Props) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-8">
      {data.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <h2 className="text-3xl font-bold text-deep-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {category.category}
          </h2>
          <div className="space-y-4">
            {category.questions.map((faq) => (
              <div key={faq.id} className="bg-off-white rounded-lg border border-stone overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-soft-beige transition-colors"
                >
                  <span className="font-semibold text-deep-charcoal pr-4">{faq.question}</span>
                  {expandedItems.includes(faq.id) ? (
                    <Minus className="w-5 h-5 text-glacier-grey flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-glacier-grey flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-taupe leading-relaxed whitespace-pre-line">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
