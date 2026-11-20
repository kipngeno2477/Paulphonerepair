import { Link } from 'react-router-dom';
import { Smartphone, Battery, Zap, Droplets, Download, Unlock, Cpu, Wifi, Laptop, Tv, Monitor, Wrench, MessageCircle, Phone, CheckCircle, ShieldCheck, Video } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const Repairs = () => {
  const services = [
    { icon: Smartphone, title: "Screen Replacement", desc: "Fast and professional screen replacements for all major phone brands." },
    { icon: Battery, title: "Battery Replacement", desc: "Restore your phone's battery life with our high-quality replacements." },
    { icon: Zap, title: "Charging Port Repair", desc: "Fix charging issues quickly with our expert port repair services." },
    { icon: Droplets, title: "Water Damage Recovery", desc: "Advanced ultrasonic cleaning and component level repair for liquid damage." },
    { icon: Download, title: "Software Installation", desc: "OS upgrades, flashing, and software troubleshooting." },
    { icon: Unlock, title: "Phone Unlocking", desc: "Network unlocking and forgotten password recovery services." },
    { icon: Cpu, title: "Hardware Repair", desc: "Motherboard repairs and component level micro-soldering." },
    { icon: Wifi, title: "Network Issues", desc: "Fixing Wi-Fi, Bluetooth, and cellular signal reception problems." },
    { icon: Laptop, title: "Laptop Repair", desc: "Screen, battery, keyboard replacements and motherboard repairs." },
    { icon: Tv, title: "TV Repair", desc: "Fixing display issues, power supply problems, and audio faults." },
    { icon: Monitor, title: "Computer Maintenance", desc: "Cleaning, thermal paste replacement, and performance optimization." },
    { icon: Wrench, title: "General Electronics", desc: "Repairs for speakers, gaming consoles, and other electronics." },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[var(--navy)] text-white py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Professional Repair Services</h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto px-4">
          Expert technicians ready to fix your smartphones, laptops, TVs, and general electronics.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-[var(--light-blue)] group-hover:bg-[var(--light-blue)] group-hover:text-white transition-colors">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[var(--navy)] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{service.desc}</p>
              </div>
              <Link to="/book-repair" className="text-[var(--light-blue)] font-bold hover:underline flex items-center mt-auto">
                Book Service <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Live Video Demonstration & Workshop Section */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/30">
                <Video size={16} /> Workshop Demo Video
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                Watch Our Technicians in Action
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
                Watch technician Paul diagnosing circuit boards, testing replacement displays, and soldering micro-components at Langas Studio. Every repair undergoes rigorous testing before you pick it up.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--electric-blue)] flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-white text-sm">Micro-Soldering</h4>
                    <p className="text-xs text-gray-400">IC replacement, short circuit recovery, and board diagnostics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--electric-blue)] flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-white text-sm">Tested Spare Parts</h4>
                    <p className="text-xs text-gray-400">Guaranteed original screens, high-capacity batteries, and flex cables</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--electric-blue)] flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-white text-sm">Express Turnaround</h4>
                    <p className="text-xs text-gray-400">Same-day screen and battery replacements on common models</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--electric-blue)] flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-white text-sm">Warranty Included</h4>
                    <p className="text-xs text-gray-400">Full technician warranty backed by direct admin support</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/book-repair"
                  className="bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-3.5 px-6 rounded-xl transition-all"
                >
                  Book Your Repair Now
                </Link>
                <a
                  href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul, I saw your repair video and would like a quote for my device.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center gap-2"
                >
                  <MessageCircle size={18} /> WhatsApp Paul ({ADMIN_PHONE})
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <VideoPlayer
                src="/videos/vid-2.mp4"
                badge="Workshop Live Demo"
                title="Paul's Repair Bench"
                subtitle="Motherboard & Screen Diagnostics"
                autoPlay={false}
                loop={true}
                className="shadow-2xl border-white/20"
              />
            </div>

          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 text-center border border-blue-100">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Not sure what's wrong with your device?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Bring your device to Langas Studio for a free diagnostic check. Contact technician Paul at <span className="font-bold text-[var(--navy)]">{ADMIN_PHONE}</span> to discuss your device directly.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/book-repair" className="bg-[var(--navy)] text-white font-bold py-3.5 px-8 rounded-xl shadow-sm hover:bg-blue-900 transition-all">
              Book Online
            </Link>
            <a 
              href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul, I need help diagnosing a problem with my device.')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle size={20} /> Chat with Paul on WhatsApp
            </a>
            <a 
              href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`} 
              className="bg-white border border-gray-300 text-[var(--navy)] font-bold py-3.5 px-8 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Phone size={18} /> Call {ADMIN_PHONE}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repairs;
