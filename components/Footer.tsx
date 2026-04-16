'use client'

import Link from 'next/link'
import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'

const DEFAULT_LOGO = '/images/logo.png'
const DEFAULT_TAGLINE = 'Crafting bespoke luxury jewelry in Toronto since 2020. Where tradition meets innovation.'
const DEFAULT_PHONE = '+1 (416) 555-1234'
const DEFAULT_EMAIL = 'info@alassali.ca'
const DEFAULT_LOCATION = 'Toronto & Mississauga, ON'

type FooterProps = {
  logoUrl?: string | null
  tagline?: string | null
  phone?: string | null
  email?: string | null
  location?: string | null
}

export default function Footer(props?: FooterProps) {
  const logo = props?.logoUrl ?? DEFAULT_LOGO
  return (
    <footer className="bg-deep-charcoal text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Alassali Jewelry"
                className="h-10 md:h-14 lg:h-16 w-auto"
              />
            </Link>
            <p className="text-warm-gray text-sm mb-4">
              {props?.tagline ?? DEFAULT_TAGLINE}
            </p>
            <div className="flex items-center gap-2 text-glacier-grey font-accent text-sm">
              <MapPin className="w-4 h-4" />
              <span>Made in Toronto</span>
            </div>
          </div>

          {/* Bespoke Column 1 */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Bespoke</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/custom/engagement-rings" className="text-warm-gray hover:text-glacier-grey transition-colors text-sm">
                  Engagement Rings
                </Link>
              </li>
              <li>
                <Link href="/custom/rings" className="text-warm-gray hover:text-glacier-grey transition-colors text-sm">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/custom/pendants" className="text-warm-gray hover:text-glacier-grey transition-colors text-sm">
                  Pendants
                </Link>
              </li>
              <li>
                <Link href="/custom/chains" className="text-warm-gray hover:text-glacier-grey transition-colors text-sm">
                  Chains
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke Column 2 */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/custom/earrings" className="text-warm-gray hover:text-glacier-grey transition-colors text-sm">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/custom/bracelets" className="text-warm-gray hover:text-glacier-grey transition-colors text-sm">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link href="/custom/grillz" className="text-warm-gray hover:text-glacier-grey transition-colors text-sm">
                  Grillz
                </Link>
              </li>
              <li>
                <Link href="/custom/general" className="text-warm-gray hover:text-glacier-grey transition-colors text-sm">
                  General Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Connect */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Sign Up For Shop Updates</h3>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-charcoal border border-glacier-grey/30 text-white placeholder-warm-gray focus:border-glacier-grey focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-glacier-grey text-white px-6 py-2 rounded font-semibold hover:bg-glacier-grey-light transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
            <div className="mt-6">
              <h3 className="text-lg font-heading font-semibold mb-4">Connect</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-warm-gray text-sm">
                  <Phone className="w-4 h-4 text-glacier-grey" />
                  <a href={`tel:${props?.phone ?? DEFAULT_PHONE}`} className="hover:text-glacier-grey transition-colors">
                    {props?.phone ?? DEFAULT_PHONE}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-warm-gray text-sm">
                  <Mail className="w-4 h-4 text-glacier-grey" />
                  <a href={`mailto:${props?.email ?? DEFAULT_EMAIL}`} className="hover:text-glacier-grey transition-colors">
                    {props?.email ?? DEFAULT_EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-warm-gray text-sm">
                  <MapPin className="w-4 h-4 text-glacier-grey" />
                  <span>{props?.location ?? DEFAULT_LOCATION}</span>
                </li>
              </ul>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="text-warm-gray hover:text-glacier-grey transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-warm-gray hover:text-glacier-grey transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-charcoal text-center text-warm-gray text-sm">
          <p>&copy; {new Date().getFullYear()} Alassali Jewelry. Crafted with precision in Toronto.</p>
        </div>
      </div>
    </footer>
  )
}
