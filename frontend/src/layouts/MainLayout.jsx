import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageCircle } from 'lucide-react';

const ADMIN_WHATSAPP = '254743220999';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul Phone Care, I would like to make an inquiry.')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        title="Chat with Admin on WhatsApp (+254 743 220999)"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50 flex items-center justify-center group"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold text-sm">
          Chat with Admin
        </span>
      </a>
    </div>
  );
};

export default MainLayout;
