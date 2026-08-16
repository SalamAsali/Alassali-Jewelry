'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Loader2, KeyRound, CalendarCheck } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { buildCalendlyUrl } from '@/lib/calendly'

interface ChainInquiry {
  chainName: string
  karat: string
  metal: string
  lengthIn: number
  widthMm: number
  weightG: number
  priceCad: number
  slug: string
  chainId: string
}

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  chain: ChainInquiry
}

type ModalState = 'form' | 'submitting' | 'success' | 'success-new-account'

export default function InquiryModal({ isOpen, onClose, chain }: InquiryModalProps) {
  const { isSignedIn, user, isLoaded } = useUser()
  const [state, setState] = useState<ModalState>('form')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [orderNo, setOrderNo] = useState('')
  const [passwordUrl, setPasswordUrl] = useState('')

  // Pre-fill from Clerk if logged in
  useEffect(() => {
    if (isSignedIn && user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.emailAddresses?.[0]?.emailAddress || '',
        phone: user.phoneNumbers?.[0]?.phoneNumber || '',
      })
    }
  }, [isSignedIn, user])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setState('form')
      setError('')
      setOrderNo('')
      setPasswordUrl('')
    }
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!formData.firstName.trim()) {
      setError('First name is required')
      return
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setError('Please provide an email or phone number')
      return
    }

    setState('submitting')

    try {
      const res = await fetch('/api/inquiries/chain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          chainName: chain.chainName,
          karat: chain.karat,
          metal: chain.metal,
          lengthIn: chain.lengthIn,
          widthMm: chain.widthMm,
          weightG: chain.weightG,
          priceCad: chain.priceCad,
          slug: chain.slug,
          chainId: chain.chainId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setState('form')
        return
      }

      setOrderNo(data.orderNo || '')

      if (data.isNewAccount) {
        setPasswordUrl(data.passwordUrl || '/account/login')
        setState('success-new-account')
      } else {
        setState('success')
      }
    } catch {
      setError('Network error. Please try again.')
      setState('form')
    }
  }

  if (!isOpen) return null

  // Post-submit scheduling CTA — a plain link (not an embed) because the
  // modal is too small for the inline calendar. '' while Calendly is not
  // configured, which hides the button. The order number rides along as
  // utm_content so the booking can be matched to this inquiry.
  const calendlyBookingUrl = buildCalendlyUrl({
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    utmContent: orderNo || undefined,
  })

  const metalLabel = chain.metal.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const specLine = `${chain.karat.toUpperCase()} ${metalLabel} \u00b7 ${chain.lengthIn}" \u00b7 ${chain.weightG.toFixed(1)}g`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[80]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 hover:bg-warm-white rounded-lg transition-colors z-10"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>

              {/* Header */}
              <div className="bg-soft-black px-6 py-5">
                <h2
                  className="text-xl font-bold text-white pr-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Inquire About This Chain
                </h2>
                <p className="text-sm text-glacier-grey mt-1">{chain.chainName}</p>
                <p className="text-xs text-stone mt-0.5">{specLine}</p>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                {/* FORM STATE */}
                {state === 'form' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignedIn ? (
                      <div className="bg-warm-white rounded-lg p-4 text-sm text-charcoal">
                        <p className="font-medium text-deep-charcoal mb-1">
                          Inquiring as {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-taupe text-xs">
                          {user?.emailAddresses?.[0]?.emailAddress}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-charcoal mb-1 uppercase tracking-wide">
                              First Name *
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                              className="w-full px-3 py-2.5 rounded-lg border border-stone focus:border-glacier-grey focus:ring-1 focus:ring-glacier-grey outline-none text-sm transition-colors"
                              placeholder="John"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-charcoal mb-1 uppercase tracking-wide">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                              className="w-full px-3 py-2.5 rounded-lg border border-stone focus:border-glacier-grey focus:ring-1 focus:ring-glacier-grey outline-none text-sm transition-colors"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal mb-1 uppercase tracking-wide">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg border border-stone focus:border-glacier-grey focus:ring-1 focus:ring-glacier-grey outline-none text-sm transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal mb-1 uppercase tracking-wide">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg border border-stone focus:border-glacier-grey focus:ring-1 focus:ring-glacier-grey outline-none text-sm transition-colors"
                            placeholder="(647) 000-0000"
                          />
                        </div>
                      </>
                    )}

                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-soft-black text-white py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-charcoal transition-all duration-300"
                    >
                      Submit Inquiry
                    </button>

                    <p className="text-xs text-taupe text-center">
                      We&apos;ll reach out within 24-48 hours to discuss your piece.
                    </p>
                  </form>
                )}

                {/* SUBMITTING STATE */}
                {state === 'submitting' && (
                  <div className="text-center py-8">
                    <Loader2 className="w-10 h-10 text-glacier-grey animate-spin mx-auto mb-4" />
                    <p className="text-charcoal font-medium">Submitting your inquiry...</p>
                  </div>
                )}

                {/* SUCCESS STATE (existing account or logged in) */}
                {state === 'success' && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9 text-green-600" />
                    </div>
                    <h3
                      className="text-xl font-bold text-deep-charcoal mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Inquiry Received!
                    </h3>
                    {orderNo && (
                      <p className="text-sm text-glacier-grey mb-2">
                        Reference: <span className="font-semibold">{orderNo}</span>
                      </p>
                    )}
                    <p className="text-sm text-taupe mb-6">
                      Our team will review your request and contact you within 24-48 hours.
                      {isSignedIn && ' You can track this order in your account.'}
                    </p>
                    {calendlyBookingUrl && (
                      <a
                        href={calendlyBookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 mb-4 rounded-lg bg-glacier-grey text-white font-semibold text-sm hover:bg-glacier-grey-light transition-all"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Book Your Consultation
                      </a>
                    )}
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg border-2 border-soft-black text-deep-charcoal font-semibold text-sm hover:bg-soft-black hover:text-white transition-all"
                      >
                        Close
                      </button>
                      {isSignedIn && (
                        <a
                          href="/account/orders"
                          className="px-6 py-2.5 rounded-lg bg-soft-black text-white font-semibold text-sm hover:bg-charcoal transition-all"
                        >
                          View Orders
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* SUCCESS STATE (new account created - prompt password) */}
                {state === 'success-new-account' && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9 text-green-600" />
                    </div>
                    <h3
                      className="text-xl font-bold text-deep-charcoal mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Inquiry Received!
                    </h3>
                    {orderNo && (
                      <p className="text-sm text-glacier-grey mb-2">
                        Reference: <span className="font-semibold">{orderNo}</span>
                      </p>
                    )}
                    <p className="text-sm text-taupe mb-4">
                      Our team will contact you within 24-48 hours.
                    </p>

                    {calendlyBookingUrl && (
                      <a
                        href={calendlyBookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 mb-4 rounded-lg bg-glacier-grey text-white font-semibold text-sm hover:bg-glacier-grey-light transition-all"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Book Your Consultation
                      </a>
                    )}

                    <div className="bg-warm-white rounded-lg p-4 mb-5 text-left">
                      <div className="flex items-start gap-3">
                        <KeyRound className="w-5 h-5 text-glacier-grey mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-deep-charcoal mb-1">
                            Track your order status
                          </p>
                          <p className="text-xs text-taupe">
                            Set a password to create your account and view all your orders in one place.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg border-2 border-soft-black text-deep-charcoal font-semibold text-sm hover:bg-soft-black hover:text-white transition-all"
                      >
                        Maybe Later
                      </button>
                      <a
                        href="/account/login"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-soft-black text-white font-semibold text-sm hover:bg-charcoal transition-all"
                      >
                        <KeyRound className="w-4 h-4" />
                        Set Password
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
