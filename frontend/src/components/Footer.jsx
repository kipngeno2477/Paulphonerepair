import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const Footer = () => {
  return (
    <footer className="bg-[var(--navy)] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">
              PAUL <span className="text-[var(--electric-blue)]">PHONE CARE</span>
            </h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Quality electronics, professional device repairs, and reliable technology solutions—all under one roof. Your trusted technology partner in Eldoret, Kenya.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">Shop Electronics</Link></li>
              <li><Link to="/book-repair" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">Book a Repair</Link></li>
              <li><Link to="/track-repair" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">Track Your Repair</Link></li>
              <li><Link to="/sell-device" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">Sell Your Device</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Smartphone Screen & Battery Repair</li>
              <li className="text-gray-400 text-sm">Laptop Diagnostics & Upgrades</li>
              <li className="text-gray-400 text-sm">TV & Sound System Repair</li>
              <li className="text-gray-400 text-sm">Micro-Soldering & IC Replacement</li>
              <li className="text-gray-400 text-sm">Genuine Electronics Retail</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Attendant</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-[var(--electric-blue)] flex-shrink-0" />
                <span className="text-gray-400 text-sm">Langas Studio<br />Eldoret, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-[var(--electric-blue)] flex-shrink-0" />
                <a href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`} className="text-gray-400 hover:text-white text-sm">
                  {ADMIN_PHONE}
                </a>
              </li>
              <li className="flex items-center">
                <MessageCircle size={20} className="mr-2 text-[#25D366] flex-shrink-0" />
                <a 
                  href={`https://wa.me/${ADMIN_WHATSAPP}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-green-400 text-sm"
                >
                  WhatsApp: {ADMIN_PHONE}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-[var(--electric-blue)] flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@paulphonecare.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Paul Phone Care. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Shop Attendant Direct Line: <span className="text-[var(--electric-blue)] font-semibold">{ADMIN_PHONE}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
