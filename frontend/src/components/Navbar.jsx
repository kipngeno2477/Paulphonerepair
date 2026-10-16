import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);

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
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[var(--light-blue)] transition-transform duration-200"
              aria-label="Toggle menu"
            >
              <div className="relative w-7 h-7">
                <X
                  size={28}
                  className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
                />
                <Menu
                  size={28}
                  className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — smooth slide transition */}
      <div
        ref={menuRef}
        className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/shop', label: 'Shop' },
            { to: '/repairs', label: 'Repairs' },
            { to: '/track-repair', label: 'Track Repair' },
            { to: '/sell-device', label: 'Sell Device' },
            { to: '/contact', label: 'Contact' },
          ].map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:text-[var(--light-blue)] hover:bg-gray-50 rounded-md transition-all duration-200"
              style={{
                transform: isOpen ? 'translateX(0)' : 'translateX(-12px)',
                opacity: isOpen ? 1 : 0,
                transition: `transform 0.3s ease ${i * 0.04}s, opacity 0.3s ease ${i * 0.04}s`,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className="flex space-x-4 px-3 py-2 border-t border-gray-100 mt-2 pt-3"
            style={{
              transform: isOpen ? 'translateX(0)' : 'translateX(-12px)',
              opacity: isOpen ? 1 : 0,
              transition: 'transform 0.3s ease 0.3s, opacity 0.3s ease 0.3s',
            }}
          >
            <Link to="/cart" onClick={closeMenu} className="text-gray-700 hover:text-[var(--light-blue)] relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-[var(--electric-blue)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
            <Link to="/admin" onClick={closeMenu} className="text-gray-700 hover:text-[var(--light-blue)]">
              <User size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
