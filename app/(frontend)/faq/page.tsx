import DiamondPattern from '@/components/DiamondPattern'
import DotPattern from '@/components/DotPattern'
import FaqAccordion, { FaqAccordionCategory } from '@/components/faq/FaqAccordion'
import { getFaq } from '@/lib/getFaq'

export const dynamic = 'force-dynamic'

const FALLBACK_HEADING = 'Frequently Asked Questions'
const FALLBACK_INTRO = 'Everything you need to know about our jewelry, services, and policies'

const FALLBACK_DATA: FaqAccordionCategory[] = [
  {
    category: 'Payment',
    questions: [
      { id: 'payment-1', question: 'What form of payments are accepted?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), wire transfers, and cryptocurrencies (Bitcoin, USDC). For custom orders over $10,000, we offer flexible payment plans.' },
      { id: 'payment-2', question: 'Am I able to split up payments?', answer: 'Yes! For custom orders, we offer flexible payment plans. A deposit is required to begin production, with the balance due before shipping. Contact us to discuss payment arrangements that work for you.' },
      { id: 'payment-3', question: 'What is the minimum deposit for a custom?', answer: 'The minimum deposit for custom jewelry is $500 CAD. This deposit is applied toward your final price and secures your spot in our production queue. The deposit is non-refundable once production begins.' },
      { id: 'payment-4', question: 'Are deposits refundable?', answer: 'Deposits are refundable before production begins. Once we start creating your custom piece, the deposit becomes non-refundable as materials have been sourced and labor committed.' },
    ],
  },
  {
    category: 'Shipping',
    questions: [
      { id: 'shipping-1', question: 'Can I track my shipments?', answer: 'Yes! Once your order ships, you will receive a tracking number via email. All shipments are fully insured and require an adult signature (21+) upon delivery.' },
      { id: 'shipping-2', question: 'How long does shipping take?', answer: 'Standard shipping within Canada takes 3-5 business days. International shipping varies by destination. Express shipping options are available for an additional fee.' },
      { id: 'shipping-3', question: 'Is shipping insured?', answer: 'Yes, all shipments are fully insured. We take every precaution to ensure your jewelry arrives safely and securely.' },
    ],
  },
  {
    category: 'Custom Orders',
    questions: [
      { id: 'custom-1', question: 'How long does a custom piece take?', answer: 'Custom jewelry typically takes 4-8 weeks from design approval to completion. Complex pieces may take longer. We will provide a detailed timeline during your consultation.' },
      { id: 'custom-2', question: 'Can I see the design before production?', answer: 'Absolutely! We provide CAD renderings and detailed sketches before production begins. You can request revisions until you are completely satisfied with the design.' },
      { id: 'custom-3', question: 'What is your return policy for custom pieces?', answer: 'Custom pieces are made to your specifications and are non-returnable. However, we offer complimentary resizing and adjustments within 30 days of delivery.' },
    ],
  },
  {
    category: 'Care & Maintenance',
    questions: [
      { id: 'care-1', question: 'How do I care for my jewelry?', answer: 'We provide detailed care instructions with every purchase. Generally, store jewelry in a soft pouch, avoid harsh chemicals, and clean with a soft cloth. Professional cleaning is recommended annually.' },
      { id: 'care-2', question: 'Do you offer resizing?', answer: 'Yes! We offer complimentary resizing within 30 days of purchase. After that, resizing is available for a small fee.' },
      { id: 'care-3', question: 'What is your warranty?', answer: 'All jewelry comes with a lifetime warranty against manufacturing defects. Normal wear and tear is not covered, but we offer repair services at reasonable rates.' },
    ],
  },
]

function groupFaq(
  categories: { id: string; name: string }[],
  items: { id: string; question: string; answer: string; category?: { id: string; name: string } | null }[],
): FaqAccordionCategory[] {
  if (categories.length === 0 || items.length === 0) return []
  return categories
    .map((cat) => ({
      category: cat.name,
      questions: items
        .filter((it) => it.category?.id === cat.id)
        .map((it) => ({ id: it.id, question: it.question, answer: it.answer })),
    }))
    .filter((cat) => cat.questions.length > 0)
}

export default async function FAQPage() {
  const cms = await getFaq()

  const heading = cms?.page?.heading?.trim() || FALLBACK_HEADING
  const intro = cms?.page?.intro?.trim() || FALLBACK_INTRO

  const cmsGrouped = cms ? groupFaq(cms.categories, cms.items) : []
  const data = cmsGrouped.length > 0 ? cmsGrouped : FALLBACK_DATA

  return (
    <>
      <div className="relative bg-soft-black text-white py-24 overflow-hidden">
        <DotPattern />
        <DiamondPattern className="text-white" />
        <div className="section-container relative z-10">
          <div className="text-center">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #8B7D6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {heading}
            </h1>
            <p className="text-lg text-stone max-w-3xl mx-auto whitespace-pre-line">{intro}</p>
          </div>
        </div>
      </div>
      <div className="bg-white py-24">
        <div className="section-container max-w-4xl">
          <FaqAccordion data={data} />
        </div>
      </div>
    </>
  )
}
