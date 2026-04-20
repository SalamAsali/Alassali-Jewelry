'use client'

import { motion } from 'framer-motion'
import { Video, Truck, Calendar } from 'lucide-react'

export default function LocationSection() {
  return (
    <section className="py-20 px-4 border-t border-glacier-grey/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            How We Work Together
          </h2>
          <p className="text-stone max-w-2xl mx-auto">
            A Toronto-based bespoke studio serving clients across the GTA by appointment. Most of the process happens virtually, with secure insured delivery when your piece is ready — and in-person meetings in Toronto whenever you prefer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-8"
          >
            <Video className="w-6 h-6 text-glacier-grey mb-4" />
            <div className="text-xs uppercase tracking-wide text-glacier-grey mb-2">Virtual Consultation</div>
            <h3 className="text-white text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Zoom, phone, or message
            </h3>
            <p className="text-stone text-sm leading-relaxed">
              Share references, review CAD renderings, and approve stones without leaving home. Most of our clients complete their project entirely virtually.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-8"
          >
            <Truck className="w-6 h-6 text-glacier-grey mb-4" />
            <div className="text-xs uppercase tracking-wide text-glacier-grey mb-2">Secure Insured Delivery</div>
            <h3 className="text-white text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Complimentary across the GTA
            </h3>
            <p className="text-stone text-sm leading-relaxed">
              Finished pieces are delivered fully insured to your door anywhere in Toronto and the Greater Toronto Area — no pickup required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-8"
          >
            <Calendar className="w-6 h-6 text-glacier-grey mb-4" />
            <div className="text-xs uppercase tracking-wide text-glacier-grey mb-2">In-Person by Request</div>
            <h3 className="text-white text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              By appointment in Toronto
            </h3>
            <p className="text-stone text-sm leading-relaxed">
              Prefer to meet face-to-face? We arrange private in-person appointments in Toronto at a time and location that works for you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
