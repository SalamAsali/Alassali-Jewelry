import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-deep-charcoal text-white mt-24">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-champagne-gold" />
              <span className="text-2xl font-heading font-semibold">ALASSALI</span>
            </Link>
            <p className="text-warm-gray text-sm mb-4">
              Crafting bespoke luxury jewelry in Toronto since 2020. Where tradition meets innovation.
            </p>
            <div className="flex items-center gap-2 text-champagne-gold font-accent text-sm">
              <MapPin className="w-4 h-4" />
              <span>Made in Toronto</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?category=engagement-rings" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Engagement Rings
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=grillz" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Grillz
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=chains" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Chains
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=pendants" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Pendants
                </Link>
              </li>
              <li>
                <Link to="/catalog?featured=true" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          {/* Custom */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Bespoke Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/custom/engagement-rings" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Custom Engagement Rings
                </Link>
              </li>
              <li>
                <Link to="/custom/grillz" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Custom Grillz
                </Link>
              </li>
              <li>
                <Link to="/custom/chains" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Custom Chains
                </Link>
              </li>
              <li>
                <Link to="/custom/pendants" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Custom Pendants
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-warm-gray hover:text-champagne-gold transition-colors text-sm">
                  Stories & Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-warm-gray text-sm">
                <Phone className="w-4 h-4 text-champagne-gold" />
                <a href="tel:+14165551234" className="hover:text-champagne-gold transition-colors">
                  +1 (416) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-2 text-warm-gray text-sm">
                <Mail className="w-4 h-4 text-champagne-gold" />
                <a href="mailto:info@alassali.ca" className="hover:text-champagne-gold transition-colors">
                  info@alassali.ca
                </a>
              </li>
              <li className="flex items-center gap-2 text-warm-gray text-sm">
                <MapPin className="w-4 h-4 text-champagne-gold" />
                <span>Toronto & Mississauga, ON</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-warm-gray hover:text-champagne-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-warm-gray hover:text-champagne-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-charcoal">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-champagne-gold mb-1 font-medium">Fully Insured</p>
            <p className="text-warm-gray text-sm">Shipping</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-champagne-gold mb-1 font-medium">Lifetime</p>
            <p className="text-warm-gray text-sm">Warranty</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-champagne-gold mb-1 font-medium">Complimentary</p>
            <p className="text-warm-gray text-sm">Resizing</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-champagne-gold mb-1 font-medium">Adult Signature</p>
            <p className="text-warm-gray text-sm">Required (21+)</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-charcoal text-center text-warm-gray text-sm">
          <p>&copy; {new Date().getFullYear()} Alassali Jewelry. Crafted with precision in Toronto.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
