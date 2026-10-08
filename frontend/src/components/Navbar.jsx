import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <img src={logoImg} alt="Paul Phone Care Logo" className="h-12 w-auto" />
              <span className="font-bold text-2xl text-[var(--navy)] tracking-tight">
                PAUL <span className="text-[var(--light-blue)]">PHONE CARE</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[var(--light-blue)] font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-[var(--light-blue)] font-medium transition-colors">About</Link>
            <Link to="/shop" className="text-gray-700 hover:text-[var(--light-blue)] font-medium transition-colors">Shop</Link>
            <Link to="/repairs" className="text-gray-700 hover:text-[var(--light-blue)] font-medium transition-colors">Repairs</Link>
            <Link to="/track-repair" className="text-gray-700 hover:text-[var(--light-blue)] font-medium transition-colors">Track Repair</Link>
            <Link to="/sell-device" className="text-gray-700 hover:text-[var(--light-blue)] font-medium transition-colors">Sell Device</Link>
            <Link to="/contact" className="text-gray-700 hover:text-[var(--light-blue)] font-medium transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-[var(--light-blue)] relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-[var(--electric-blue)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-[var(--light-blue)]">
              <User size={24} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-[var(--light-blue)]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--light-blue)] hover:bg-gray-50 rounded-md">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--light-blue)] hover:bg-gray-50 rounded-md">About</Link>
            <Link to="/shop" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--light-blue)] hover:bg-gray-50 rounded-md">Shop</Link>
            <Link to="/repairs" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--light-blue)] hover:bg-gray-50 rounded-md">Repairs</Link>
            <Link to="/track-repair" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--light-blue)] hover:bg-gray-50 rounded-md">Track Repair</Link>
            <Link to="/sell-device" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--light-blue)] hover:bg-gray-50 rounded-md">Sell Device</Link>
            <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--light-blue)] hover:bg-gray-50 rounded-md">Contact</Link>
            <div className="flex space-x-4 px-3 py-2">
              <Link to="/cart" className="text-gray-700 hover:text-[var(--light-blue)]"><ShoppingCart size={24} /></Link>
              <Link to="/admin" className="text-gray-700 hover:text-[var(--light-blue)]"><User size={24} /></Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
