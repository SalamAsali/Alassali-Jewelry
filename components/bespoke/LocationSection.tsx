'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

export default function LocationSection() {
  return (
    <section className="py-20 px-4 border-t border-glacier-grey/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Visit Our Toronto Studio
          </h2>
          <p className="text-stone max-w-2xl mx-auto">
            Al-Assali Jewelry Studio is in Toronto&apos;s Oakwood–Vaughan neighbourhood on Vaughan Rd. Appointment only — book a free consultation and we&apos;ll confirm a time that works for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Embedded map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-glacier-grey/20 bg-charcoal/40 min-h-[340px]"
          >
            <iframe
              src={SITE_CONFIG.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al-Assali Jewelry Studio on Google Maps"
            />
          </motion.div>

          {/* Info block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal/50 border border-glacier-grey/20 rounded-2xl p-8"
          >
            <div className="space-y-5">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-glacier-grey shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-glacier-grey mb-1">Address</div>
                  <div className="text-white text-sm">
                    {SITE_CONFIG.address.streetAddress}<br />
                    {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion} {SITE_CONFIG.address.postalCode}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-glacier-grey shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-glacier-grey mb-1">Phone</div>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-white text-sm hover:text-glacier-grey">
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-glacier-grey shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-glacier-grey mb-1">Email</div>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-white text-sm hover:text-glacier-grey break-all">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-glacier-grey shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-glacier-grey mb-1">Hours</div>
                  <div className="text-white text-sm space-y-0.5">
                    <div>Mon–Fri: 11:00 AM – 7:00 PM</div>
                    <div>Saturday: 11:00 AM – 5:00 PM</div>
                    <div>Sunday: Closed</div>
                    <div className="text-glacier-grey text-xs mt-2 italic">{SITE_CONFIG.hoursNote}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-glacier-grey/20">
              <div className="text-xs uppercase tracking-wide text-glacier-grey mb-2">Serving</div>
              <p className="text-stone text-xs leading-relaxed">
                Clients across Toronto and the GTA — Mississauga, Etobicoke, North York, Scarborough, Vaughan, Markham, Oakville, Burlington, Brampton, Milton, Richmond Hill, and the wider Greater Toronto Area.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
