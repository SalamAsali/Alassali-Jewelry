'use client'

import { motion } from 'framer-motion'
import { Video, Truck, CalendarClock, Phone, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

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
            Al-Assali Jewelry is a Toronto-based bespoke atelier. Every piece is designed and handcrafted in-house — consultations are virtual by default, with insured delivery across the GTA and in-person meetings available by appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-6"
          >
            <Video className="w-6 h-6 text-glacier-grey mb-3" />
            <div className="text-white font-semibold mb-2">Virtual Consultation</div>
            <p className="text-stone text-sm leading-relaxed">
              Free 30-minute Zoom or phone consult to discuss your piece, stones, and budget. Sketches, CAD renders, and stone selection all happen remotely.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-6"
          >
            <Truck className="w-6 h-6 text-glacier-grey mb-3" />
            <div className="text-white font-semibold mb-2">Insured Delivery</div>
            <p className="text-stone text-sm leading-relaxed">
              Complimentary insured delivery anywhere in the Greater Toronto Area. Ring sizers and preview pieces shipped ahead as needed — no need to travel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-6"
          >
            <CalendarClock className="w-6 h-6 text-glacier-grey mb-3" />
            <div className="text-white font-semibold mb-2">In-Person by Appointment</div>
            <p className="text-stone text-sm leading-relaxed">
              Prefer to meet face-to-face? We book private in-person sessions in Toronto by appointment when a project calls for it — just let us know.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto"
        >
          <div className="text-center mb-5">
            <div className="text-xs uppercase tracking-wide text-glacier-grey mb-2">Start a Project</div>
            <div className="text-white text-sm">
              Toronto, Ontario · serving the entire GTA by appointment
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-glacier-grey/20 rounded-xl py-3 text-white text-sm transition"
            >
              <Phone className="w-4 h-4" />
              {SITE_CONFIG.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-glacier-grey/20 rounded-xl py-3 text-white text-sm transition break-all"
            >
              <Mail className="w-4 h-4" />
              {SITE_CONFIG.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
