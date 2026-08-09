'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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
            {category.questions.map((faq) => {
              const isOpen = expandedItems.includes(faq.id)
              return (
                <div key={faq.id} className="bg-off-white rounded-lg border border-stone overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-soft-beige transition-colors"
                  >
                    <span className="font-semibold text-deep-charcoal pr-4">{faq.question}</span>
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full bg-glacier-grey flex items-center justify-center text-white transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {/*
                    The answer is always rendered in the DOM so AI crawlers and
                    no-JS fetches read the full Q&A text; it is only visually
                    collapsed via a CSS grid-rows transition (0fr → 1fr).
                  */}
                  <div
                    id={`faq-answer-${faq.id}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 py-4 text-taupe leading-relaxed whitespace-pre-line">{faq.answer}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
