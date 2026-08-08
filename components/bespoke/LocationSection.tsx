'use client'

import { motion } from 'framer-motion'
import { Video, Truck, Calendar } from 'lucide-react'
import type { City } from '@/lib/locations'

const COPY: Record<City, { intro: string; delivery: string; apptHeading: string; appt: string }> = {
  toronto: {
    intro: 'A Toronto-based custom studio serving clients across the GTA by appointment. Most of the process happens virtually, with secure insured delivery when your piece is ready, plus in-person meetings in Toronto whenever you’d like one.',
    delivery: 'Finished pieces are delivered fully insured to your door anywhere in Toronto and the Greater Toronto area. No pickup required.',
    apptHeading: 'By appointment in Toronto',
    appt: 'Prefer to meet face-to-face? We arrange private in-person appointments in Toronto at a time and location that works for you.',
  },
  oakville: {
    intro: 'A custom studio working with Oakville clients by appointment or entirely online. Most of the process happens virtually, with secure insured delivery once your piece is ready. If you’d rather meet in person, we’re happy to set that up at our Oakville studio too.',
    delivery: 'Finished pieces are delivered fully insured to your door anywhere in Oakville and the rest of the Greater Toronto Area. No pickup required.',
    apptHeading: 'By appointment in Oakville',
    appt: 'Prefer to meet face-to-face? We arrange private in-person appointments in Oakville at a time and location that works for you.',
  },
}

// The approved copy docs write this intro fresh for every page — chains talk
// about texting a reference photo, grillz about the mold appointment, and so
// on. Only the intro varies; delivery and appointment copy stay city-level.
// Anything not listed here falls back to the city default above.
const INTRO_BY_TYPE: Record<string, Partial<Record<City, string>>> = {
  'engagement-rings': {
    toronto: 'A Toronto-based custom studio serving clients across the GTA by appointment. Most of the process happens virtually, with secure insured delivery when your piece is ready, plus in-person meetings in Toronto whenever you’d like one.',
    oakville: 'A custom studio serving Oakville clients by appointment. Most of the process happens virtually, with secure insured delivery when your piece is ready, plus in-person meetings in Oakville whenever you’d like one.',
  },
  'rings': {
    toronto: 'A Toronto-based custom studio serving clients across the GTA by appointment. Most rings are designed virtually from start to finish, with insured delivery once your piece is ready. If you’d rather have an in-person meeting in Toronto, we’d be happy to arrange that too.',
    oakville: 'A custom studio working with Oakville clients by appointment or entirely online. Most rings are designed virtually from start to finish, with insured delivery once your piece is ready. If you’d rather meet in person, we’re happy to set that up at our Oakville studio too.',
  },
  'wedding-bands': {
    toronto: 'A Toronto-based custom studio working with clients across the GTA by appointment. Most bands are designed entirely virtually, with your finished piece delivered fully insured, or you’re welcome to book an in-person visit in Toronto instead.',
    oakville: 'A custom studio working with Oakville clients by appointment or entirely online. Most bands are designed entirely virtually, with your finished piece delivered fully insured, or you’re welcome to book a private consultation at our Oakville studio instead.',
  },
  'pendants': {
    toronto: 'A Toronto-based custom studio working with clients across the GTA by appointment. Most pendants are designed and approved entirely online, with your finished piece delivered fully insured. In-person meetings in Toronto are available anytime you’d prefer one.',
    oakville: 'A custom studio working with Oakville clients by appointment or entirely online. Most pendants are designed and approved entirely online, with your finished piece delivered fully insured. In-person meetings in Oakville are available anytime you’d prefer one.',
  },
  'chains': {
    toronto: 'A Toronto-based custom studio serving clients across the GTA. Meet virtually or by appointment in Toronto, whichever you prefer, with secure insured delivery once your piece is ready. Most chain orders start the same way: a quick text with a photo of the style and length you’re picturing.',
    oakville: 'A custom studio serving clients in Oakville. Meet virtually or by appointment in Oakville, whichever you prefer, with secure insured delivery once your piece is ready. Most chain orders start the same way: a quick text with a photo of the style and length you’re picturing.',
  },
  'earrings': {
    toronto: 'A Toronto-based custom studio working with clients across the GTA by appointment. Most earring designs are finalized entirely online, with your finished piece delivered fully insured. In-person meetings in Toronto are available whenever you prefer.',
    oakville: 'A custom studio working with Oakville clients by appointment or entirely online. Most earring designs are finalized entirely online, with your finished piece delivered fully insured. In-person meetings in Oakville are available whenever you prefer.',
  },
  'bracelets': {
    toronto: 'A Toronto-based custom studio working with clients across the GTA by appointment. Most bracelets are designed and approved entirely online, with your finished piece delivered fully insured. Want to go over the design in person? We’ll set up an appointment in Toronto.',
    oakville: 'A custom studio working with Oakville clients by appointment. Most bracelets are designed and approved entirely online, with your finished piece delivered fully insured. Want to go over the design in person? We’ll set up an appointment in Oakville.',
  },
  'grillz': {
    // Mold sessions genuinely happen at the Toronto studio, which the Oakville
    // copy states plainly rather than relocating.
    toronto: 'A Toronto-based custom studio working with clients across the GTA. Most grillz start with a virtual consultation to plan your metal, configuration, and stone setting, followed by an in-person mold appointment in Toronto. Your finished grillz are delivered fully insured once they’re ready.',
    oakville: 'A custom studio working with clients in Oakville. Most grillz start with a virtual consultation to plan your metal, configuration, and stone setting, followed by an in-person mold appointment in Toronto. Your finished grillz are delivered fully insured once they’re ready.',
  },
}

export default function LocationSection({ city = 'toronto', type }: { city?: City; type?: string }) {
  const base = COPY[city] ?? COPY.toronto
  const intro = (type && INTRO_BY_TYPE[type]?.[city]) || base.intro
  const copy = { ...base, intro }
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
            {copy.intro}
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
              {copy.delivery}
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
              {copy.apptHeading}
            </h3>
            <p className="text-stone text-sm leading-relaxed">
              {copy.appt}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
