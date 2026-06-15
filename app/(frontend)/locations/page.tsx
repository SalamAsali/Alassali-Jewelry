import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Locations | Al-Assali Custom Jewelry',
  description: 'Visit Al-Assali Custom Jewelry at our Toronto and Oakville studios. Custom engagement rings, gold chains, grillz & more. Book your free consultation.',
  alternates: { canonical: 'https://www.alasalicustomjewelry.ca/locations' },
}

const locations = [
  {
    name: 'Toronto',
    address: '624 Vaughan Rd York',
    city: 'Toronto, ON M6E 2X3',
    phone: '(647) 562-4640',
    hours: 'By Appointment Only',
    rating: '5.0',
    reviews: '50+',
    mapUrl: 'https://maps.google.com/?q=624+Vaughan+Rd+York+Toronto+ON+M6E+2X3',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.5!2d-79.4264!3d43.6895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z624+Vaughan+Rd!5e0!3m2!1sen!2sca!4v1',
    cta: { label: 'Visit Toronto Studio', href: '/' },
    isMain: true,
  },
  {
    name: 'Oakville',
    address: '3158 Sixth Line',
    city: 'Oakville, ON L6M 4J9',
    phone: '(647) 562-4640',
    hours: 'By Appointment Only',
    rating: '5.0',
    reviews: 'New',
    mapUrl: 'https://maps.google.com/?q=3158+Sixth+Line+Oakville+ON+L6M+4J9',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.0!2d-79.7!3d43.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z3158+Sixth+Line!5e0!3m2!1sen!2sca!4v1',
    cta: { label: 'Visit Oakville Studio', href: '/oakville' },
    isMain: false,
  },
]

export default function LocationsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-soft-black py-20 sm:py-28">
        <div className="section-container text-center">
          <h1 className="heading-hero text-white mb-6">Our Locations</h1>
          <p className="text-lg text-stone max-w-2xl mx-auto leading-relaxed">
            Visit us at our Toronto or Oakville studio. Every piece is handcrafted in-house by master jewelers. Book your free consultation today.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((loc) => (
              <div key={loc.name} className="rounded-xl border-2 border-soft-black overflow-hidden">
                {/* Map */}
                <div className="relative h-[280px] bg-warm-white">
                  <iframe
                    src={loc.mapEmbed}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${loc.name} studio map`}
                  />
                </div>

                {/* Info */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-2xl font-semibold text-deep-charcoal">{loc.name}</h2>
                    {loc.isMain && (
                      <span className="px-3 py-1 rounded-full bg-glacier-grey/10 border border-glacier-grey/30 text-xs font-semibold text-glacier-grey uppercase tracking-wider">
                        Main Studio
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-glacier-grey flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-deep-charcoal">{loc.address}</p>
                        <p className="text-sm text-glacier-grey">{loc.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-glacier-grey flex-shrink-0" />
                      <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-medium text-deep-charcoal hover:text-glacier-grey transition-colors">
                        {loc.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-glacier-grey flex-shrink-0" />
                      <p className="text-sm text-deep-charcoal">{loc.hours}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-glacier-grey flex-shrink-0" />
                      <p className="text-sm text-deep-charcoal">
                        <span className="font-semibold">{loc.rating}</span> on Google · {loc.reviews} reviews
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={loc.cta.href}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      {loc.cta.label}
                    </Link>
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border-2 border-soft-black text-deep-charcoal px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-soft-black hover:text-white transition-all duration-300"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(locations.map(loc => ({
            '@context': 'https://schema.org',
            '@type': 'JewelryStore',
            name: `Al-Assali Custom Jewelry — ${loc.name}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: loc.address,
              addressLocality: loc.name,
              addressRegion: 'ON',
              addressCountry: 'CA',
            },
            telephone: loc.phone,
            openingHours: 'Mo-Su By Appointment',
            url: `https://www.alasalicustomjewelry.ca${loc.cta.href}`,
          }))),
        }}
      />
    </div>
  )
}
