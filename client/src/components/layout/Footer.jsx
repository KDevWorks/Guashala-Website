import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { SITE_NAME, CONTACT_INFO, SOCIAL_LINKS, NAV_LINKS } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-cream-100 pt-16 pb-8 border-t border-saffron-100 mt-auto relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-saffron-500 rounded-full text-white">
                <span className="text-xl font-bold">ॐ</span>
              </div>
              <span className="font-heading font-bold text-2xl text-charcoal-900 tracking-tight">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-charcoal-600 text-sm leading-relaxed">
              Dedicated to the rescue, care, and protection of cows. Join our mission to provide a safe haven for abandoned and injured cattle.
            </p>
            <div className="flex gap-4">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal-600 hover:text-saffron-600 hover:bg-saffron-50 transition-colors shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal-600 hover:text-saffron-600 hover:bg-saffron-50 transition-colors shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal-600 hover:text-saffron-600 hover:bg-saffron-50 transition-colors shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal-600 hover:text-saffron-600 hover:bg-saffron-50 transition-colors shadow-sm">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-charcoal-600 hover:text-saffron-600 transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-saffron-400"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-saffron-600 flex-shrink-0 mt-0.5" />
                <span className="text-charcoal-600 text-sm leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-saffron-600 flex-shrink-0" />
                <span className="text-charcoal-600 text-sm">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-saffron-600 flex-shrink-0" />
                <span className="text-charcoal-600 text-sm">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-6">Newsletter</h3>
            <p className="text-charcoal-600 text-sm mb-4">Subscribe to get updates on our rescue missions and events.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 text-sm"
                required
              />
              <button type="submit" className="btn-primary w-full py-2 text-sm justify-center">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-saffron-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-charcoal-500 text-sm">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-charcoal-500 hover:text-saffron-600">Privacy Policy</Link>
            <Link to="/terms" className="text-charcoal-500 hover:text-saffron-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
