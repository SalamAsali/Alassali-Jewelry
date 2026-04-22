'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/seo/siteConfig'

const DEFAULT_LOGO = '/images/logo.png'
const DEFAULT_TAGLINE = `Custom jeweller in Toronto since ${SITE_CONFIG.founded}. Every piece designed, cast, set, and finished in-house in Toronto.`
const DEFAULT_PHONE = SITE_CONFIG.phoneDisplay
const DEFAULT_EMAIL = SITE_CONFIG.email
const DEFAULT_LOCATION = `${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.addressRegion}`

// TikTok icon — lucide doesn't ship one
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.958-1.166-1.928-1.282-2.606h.004C16.367 1.24 16.417.86 16.417.5h-3.584v14.175c0 .191 0 .38-.008.566v.066a2.905 2.905 0 0 1-2.898 2.828 2.907 2.907 0 1 1 0-5.814c.168 0 .334.013.496.04V8.702a6.49 6.49 0 0 0-.496-.018 6.487 6.487 0 0 0-6.487 6.487 6.487 6.487 0 0 0 6.487 6.487 6.487 6.487 0 0 0 6.486-6.487V8.17a9.95 9.95 0 0 0 5.808 1.856V6.483a6.036 6.036 0 0 1-2.9-.921z" />
    </svg>
  )
}

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
                className="h-14 md:h-20 lg:h-24 w-auto"
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

          {/* Bespoke */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Bespoke</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/custom/engagement-rings" className="text-warm-gray hover:text-glacier-grey transition-colors">Engagement Rings</Link></li>
              <li><Link href="/custom/wedding-bands" className="text-warm-gray hover:text-glacier-grey transition-colors">Wedding Bands</Link></li>
              <li><Link href="/custom/rings" className="text-warm-gray hover:text-glacier-grey transition-colors">Rings</Link></li>
              <li><Link href="/custom/pendants" className="text-warm-gray hover:text-glacier-grey transition-colors">Pendants</Link></li>
              <li><Link href="/custom/chains" className="text-warm-gray hover:text-glacier-grey transition-colors">Chains</Link></li>
              <li><Link href="/custom/earrings" className="text-warm-gray hover:text-glacier-grey transition-colors">Earrings</Link></li>
              <li><Link href="/custom/bracelets" className="text-warm-gray hover:text-glacier-grey transition-colors">Bracelets</Link></li>
              <li><Link href="/custom/grillz" className="text-warm-gray hover:text-glacier-grey transition-colors">Grillz</Link></li>
            </ul>
          </div>

          {/* Guides & Studio */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Guides &amp; Studio</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/custom-engagement-ring-cost-toronto-2026" className="text-warm-gray hover:text-glacier-grey transition-colors">Engagement Ring Cost Guide</Link></li>
              <li><Link href="/blog/grillz-price-guide-toronto-2026" className="text-warm-gray hover:text-glacier-grey transition-colors">Grillz Price Guide</Link></li>
              <li><Link href="/blog/lab-grown-vs-natural-diamonds-toronto" className="text-warm-gray hover:text-glacier-grey transition-colors">Lab vs Natural Diamonds</Link></li>
              <li><Link href="/blog" className="text-warm-gray hover:text-glacier-grey transition-colors">All Guides</Link></li>
              <li className="pt-2"><Link href="/about/master-jeweller/mohammad-al-assali" className="text-warm-gray hover:text-glacier-grey transition-colors">Master Jeweller</Link></li>
              <li><Link href="/portfolio" className="text-warm-gray hover:text-glacier-grey transition-colors">Portfolio</Link></li>
              <li><Link href="/faq" className="text-warm-gray hover:text-glacier-grey transition-colors">FAQ</Link></li>
            </ul>
            <h3 className="text-lg font-heading font-semibold mt-6 mb-3">Serving Toronto</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/service-areas" className="text-glacier-grey hover:text-glacier-grey-light font-medium transition-colors">All service areas →</Link></li>
              <li><Link href="/toronto/oakwood-vaughan" className="text-warm-gray hover:text-glacier-grey transition-colors">Oakwood–Vaughan</Link></li>
              <li><Link href="/toronto/wychwood" className="text-warm-gray hover:text-glacier-grey transition-colors">Wychwood</Link></li>
              <li><Link href="/toronto/forest-hill" className="text-warm-gray hover:text-glacier-grey transition-colors">Forest Hill</Link></li>
              <li><Link href="/toronto/bathurst-st-clair" className="text-warm-gray hover:text-glacier-grey transition-colors">Bathurst–St Clair</Link></li>
              <li><Link href="/toronto/yorkville" className="text-warm-gray hover:text-glacier-grey transition-colors">Yorkville</Link></li>
              <li><Link href="/toronto/north-york" className="text-warm-gray hover:text-glacier-grey transition-colors">North York</Link></li>
              <li><Link href="/toronto/etobicoke" className="text-warm-gray hover:text-glacier-grey transition-colors">Etobicoke</Link></li>
              <li><Link href="/toronto/scarborough" className="text-warm-gray hover:text-glacier-grey transition-colors">Scarborough</Link></li>
              <li className="pt-2 border-t border-charcoal mt-2"><Link href="/gta/mississauga" className="text-warm-gray hover:text-glacier-grey transition-colors">Mississauga</Link></li>
              <li><Link href="/gta/vaughan" className="text-warm-gray hover:text-glacier-grey transition-colors">Vaughan</Link></li>
              <li><Link href="/gta/markham" className="text-warm-gray hover:text-glacier-grey transition-colors">Markham</Link></li>
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
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-warm-gray hover:text-glacier-grey transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={SITE_CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-warm-gray hover:text-glacier-grey transition-colors">
                  <TikTokIcon className="w-5 h-5" />
                </a>
                <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-warm-gray hover:text-glacier-grey transition-colors">
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
