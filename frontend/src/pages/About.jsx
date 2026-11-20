import { CheckCircle, Phone, MessageCircle, MapPin, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import shop1 from '../assets/shop1.jpg';
import shop2 from '../assets/electronics/shop-2.jpg';
import shop3 from '../assets/electronics/shop-3.jpg';
import shop4 from '../assets/electronics/shop-4.jpg';
import shop5 from '../assets/electronics/shop-5.jpg';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const About = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
              Our Story & Mission
            </span>
            <h1 className="text-4xl font-extrabold text-[var(--navy)] mb-6">About PAUL PHONE CARE</h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Located at Langas Studio, PAUL PHONE CARE is your premier destination for electronics and expert repairs. We pride ourselves on being more than just a shop — we are a trusted community technology hub dedicated to keeping you connected.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our lead technician and store admin Paul handles everything from complex motherboard micro-soldering, liquid damage recovery, and display replacements to providing the latest smartphones and sound accessories at friendly prices.
            </p>

            <h3 className="text-2xl font-bold text-[var(--navy)] mb-4">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {['Guaranteed Quality', 'Direct Admin Communication', 'Fast Turnaround', 'Customer Satisfaction'].map((value, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-800 font-medium">
                  <CheckCircle className="text-[var(--light-blue)]" size={20} /> {value}
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-grow">
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Contact Shop Attendant / Admin</p>
                <p className="text-xl font-bold text-[var(--navy)]">{ADMIN_PHONE}</p>
              </div>
              <a
                href={`https://wa.me/${ADMIN_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm transition-all"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img src={shop1} alt="Paul Phone Care Store Display" className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 mt-8">
              <img src={shop4} alt="Electronics Shelf" className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* Video Tour Section */}
        <div className="mt-24 bg-gradient-to-br from-[var(--navy)] via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-blue-500/20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-400/30">
              <Video size={14} /> Virtual Video Tour
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Experience Our Shop & Workshop Live
            </h2>
            <p className="text-blue-200 text-base mt-2">
              Get an authentic inside look at Paul Phone Care in Langas Studio, Eldoret — from our retail display shelves to our repair workbench.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <VideoPlayer
                src="/videos/demo-vid.mp4"
                badge="Retail Store Tour"
                title="Store & Stock Showcase"
                subtitle="Langas Studio, Eldoret"
                autoPlay={false}
                loop={true}
              />
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/shop"
                  className="flex-1 bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-2.5 px-4 rounded-xl text-center text-sm transition-colors"
                >
                  Explore Products
                </Link>
                <a
                  href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul, I watched your store video and have a question.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} /> WhatsApp Shop
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <VideoPlayer
                src="/videos/vid-2.mp4"
                badge="Repair Workshop"
                title="Technician at the Bench"
                subtitle="Precision Micro-Soldering & Diagnostics"
                autoPlay={false}
                loop={true}
              />
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book-repair"
                  className="flex-1 bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-2.5 px-4 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  Book a Repair <ArrowRight size={14} />
                </Link>
                <a
                  href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul, I watched your repair demo video and would like to fix my device.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} /> WhatsApp Paul
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-[var(--navy)] mb-4">Inside Our Shop</h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-12">
            A glimpse into our workshop and retail shelves at Langas Studio.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm group">
              <img src={shop1} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Store Shelves" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm group">
              <img src={shop2} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Accessories" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm group">
              <img src={shop3} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Repair Station" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm group">
              <img src={shop4} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Electronics Display" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm group">
              <img src={shop5} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Workshop" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
