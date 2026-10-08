import { Link } from 'react-router-dom';
import { Smartphone, Battery, Zap, Droplets, Download, Unlock, Cpu, Wifi, Laptop, Tv, Monitor, Wrench } from 'lucide-react';

const Repairs = () => {
  const services = [
    { icon: Smartphone, title: "Screen Replacement", desc: "Fast and professional screen replacements for all major phone brands." },
    { icon: Battery, title: "Battery Replacement", desc: "Restore your phone's battery life with our high-quality replacements." },
    { icon: Zap, title: "Charging Port Repair", desc: "Fix charging issues quickly with our expert port repair services." },
    { icon: Droplets, title: "Water Damage", desc: "Advanced ultrasonic cleaning and component level repair for liquid damage." },
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
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Professional Repair Services</h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto px-4">Expert technicians ready to fix your smartphones, laptops, TVs, and general electronics.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-[var(--light-blue)] group-hover:bg-[var(--light-blue)] group-hover:text-white transition-colors">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-[var(--navy)] mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.desc}</p>
              <Link to="/book-repair" className="text-[var(--light-blue)] font-bold hover:underline flex items-center">
                Book Service <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 text-center border border-blue-100">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Not sure what's wrong?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">Bring your device to Langas Studio for a free diagnostic check. Our expert technicians will identify the problem and give you a fair quote.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="bg-white text-[var(--navy)] font-bold py-3 px-8 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-all">
              Find Our Shop
            </Link>
            <a href="https://wa.me/254799902607" target="_blank" rel="noopener noreferrer" className="bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-3 px-8 rounded-xl shadow-lg transition-all">
              Chat with a Technician
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repairs;
