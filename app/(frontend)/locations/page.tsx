import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Clock, CalendarClock, Navigation, ArrowRight } from 'lucide-react'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'

const TITLE = 'Our Locations — Toronto & Oakville Studios'
const DESCRIPTION =
  'Visit Al-Asali Custom Jewelry at our Toronto and Oakville studios. Custom engagement rings, gold chains, grillz & more. Book your free consultation.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.alasalicustomjewelry.ca/locations' },
  openGraph: mergeOpenGraph({ title: `${TITLE} | Al-Asali Jewelry`, description: DESCRIPTION, url: '/locations' }),
}

const locations = [
  {
    name: 'Toronto',
    address: '624 Vaughan Rd',
    city: 'Toronto, ON M6E 2X3',
    phone: '(647) 562-4340',
    phoneSchema: '+1-647-562-4340',
    hours: [
      { days: 'Monday – Friday', time: '11:00 AM – 7:00 PM', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '19:00' },
      { days: 'Saturday', time: '11:00 AM – 5:00 PM', dayOfWeek: 'Saturday', opens: '11:00', closes: '17:00' },
      { days: 'Sunday', time: 'Closed' },
    ],
    hoursNote: 'By appointment only',
    rating: '5.0',
    reviews: '42+',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.8662181637624!2d-79.44107981534424!3d43.69254459710162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b43ebc5d39ceb%3A0xe7cb39f29dad222f!2sAl-assali%20Jewelry%20Studio!5e0!3m2!1sen!2sca!4v1776446921332!5m2!1sen!2sca',
    mapUrl: 'https://www.google.com/maps?cid=16702507357223854639',
    cta: { label: 'Learn More', href: '/' },
    isMain: true,
  },
  {
    name: 'Oakville',
    address: '3158 Sixth Line',
    city: 'Oakville, ON L6M 4J9',
    phone: '(647) 562-4340',
    phoneSchema: '+1-647-562-4340',
    hours: [
      { days: 'Monday – Friday', time: '11:00 AM – 7:00 PM', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '19:00' },
      { days: 'Saturday', time: '11:00 AM – 5:00 PM', dayOfWeek: 'Saturday', opens: '11:00', closes: '17:00' },
      { days: 'Sunday', time: 'Closed' },
    ],
    hoursNote: 'By appointment only',
    rating: '5.0',
    reviews: 'New',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.0!2d-79.7!3d43.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z3158+Sixth+Line+Oakville!5e0!3m2!1sen!2sca!4v1',
    mapUrl: 'https://maps.google.com/?q=3158+Sixth+Line+Oakville+ON+L6M+4J9',
    cta: { label: 'Learn More', href: '/oakville' },
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
                {/* Map with GBP pin */}
                <div className="relative h-[300px] bg-warm-white">
                  <iframe
                    src={loc.mapEmbed}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${loc.name} studio location — Al-Asali Custom Jewelry`}
                  />
                </div>

                {/* Info */}
                <div className="p-6 sm:p-8">
                  <div className="mb-5">
                    <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-deep-charcoal">{loc.name}</h2>
                  </div>

                  {/* By Appointment Only — most important detail */}
                  <div className="mb-6 rounded-xl bg-glacier-grey/10 border-2 border-glacier-grey/40 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-glacier-grey/15 flex items-center justify-center flex-shrink-0">
                          <CalendarClock className="w-5 h-5 text-glacier-grey" />
                        </div>
                        <div>
                          <p className="font-heading text-base sm:text-lg font-bold text-deep-charcoal uppercase tracking-wide leading-tight">By Appointment Only</p>
                          <p className="text-xs text-charcoal/70">Call ahead to book your private visit</p>
                        </div>
                      </div>
                      <a
                        href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                        className="sm:ml-auto inline-flex items-center justify-center gap-2 bg-glacier-grey text-white px-5 py-3 rounded-lg font-bold text-sm whitespace-nowrap hover:bg-glacier-grey-light hover:shadow-lg transition-all duration-300"
                      >
                        <Phone className="w-4 h-4" />
                        {loc.phone}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-glacier-grey flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-deep-charcoal">{loc.address}</p>
                        <p className="text-sm text-glacier-grey">{loc.city}</p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-glacier-grey flex-shrink-0 mt-0.5" />
                      <div className="w-full">
                        {loc.hours.map((h) => (
                          <div key={h.days} className="flex justify-between gap-4 text-sm">
                            <span className="text-deep-charcoal font-medium">{h.days}</span>
                            <span className={h.time === 'Closed' ? 'text-glacier-grey italic' : 'text-charcoal'}>{h.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={loc.cta.href}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      {loc.cta.label}
                      <ArrowRight className="w-4 h-4" />
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
            name: `Al-Asali Custom Jewelry — ${loc.name}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: loc.address,
              addressLocality: loc.name,
              addressRegion: 'ON',
              addressCountry: 'CA',
            },
            telephone: loc.phoneSchema,
            openingHoursSpecification: loc.hours.filter(h => h.opens && h.closes).map(h => ({
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: h.dayOfWeek,
              opens: h.opens,
              closes: h.closes,
            })),
            url: `https://www.alasalicustomjewelry.ca${loc.cta.href}`,
            ...(loc.isMain ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: loc.rating,
                reviewCount: 42,
              },
            } : {}),
          }))),
        }}
      />
    </div>
  )
}
