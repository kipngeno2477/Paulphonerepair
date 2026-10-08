import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

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
              Quality electronics, professional repairs, and reliable technology solutions—all under one roof. Your trusted technology partner in Kenya.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">Shop Electronics</Link></li>
              <li><Link to="/repairs" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">Book a Repair</Link></li>
              <li><Link to="/track-repair" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">Track Your Repair</Link></li>
              <li><Link to="/sell-device" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">Sell Your Device</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Smartphone Repair</li>
              <li className="text-gray-400 text-sm">Laptop Maintenance</li>
              <li className="text-gray-400 text-sm">TV Repair</li>
              <li className="text-gray-400 text-sm">Software Installation</li>
              <li className="text-gray-400 text-sm">Electronics Sales</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-[var(--electric-blue)] flex-shrink-0" />
                <span className="text-gray-400 text-sm">Langas Studio<br />Eldoret, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-[var(--electric-blue)] flex-shrink-0" />
                <span className="text-gray-400 text-sm">0799 902 607<br />0799 902 607</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-[var(--electric-blue)] flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@paulphonecare.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Paul Phone Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
