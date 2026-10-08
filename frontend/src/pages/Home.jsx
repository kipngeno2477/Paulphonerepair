import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench, Package, Banknote, Zap, Users, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import heroImg1 from '../assets/electronics/samsung-a14.jpg';
import heroImg2 from '../assets/electronics/jbl-flip-6.jpg';
import heroImg3 from '../assets/electronics/shop-1.jpg';
import heroImg4 from '../assets/electronics/redmi-note-11se.jpg';

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4];
const Home = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative text-white py-32 lg:py-48 overflow-hidden min-h-[600px] flex items-center">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0 bg-[var(--navy)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImgIndex}
              src={heroImages[currentImgIndex]}
              alt="Paul Phone Care Hero"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.4 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
                PAUL PHONE CARE
                <span className="block text-[var(--electric-blue)] mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">Your Trusted Electronics Partner</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
                Quality electronics, professional repairs and reliable technology solutions—all under one roof. We bring your devices back to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-4 px-8 rounded-lg shadow-lg shadow-blue-500/30 transition-all text-center flex items-center justify-center text-lg">
                  Shop Electronics <ArrowRight className="ml-2" size={24} />
                </Link>
                <Link to="/book-repair" className="bg-white hover:bg-gray-100 text-[var(--navy)] font-bold py-4 px-8 rounded-lg shadow-lg transition-all text-center text-lg">
                  Book a Repair
                </Link>
                <a href="https://wa.me/254799902607" target="_blank" rel="noopener noreferrer" className="border-2 border-white hover:bg-white hover:text-[var(--navy)] text-white font-bold py-4 px-8 rounded-lg transition-all text-center text-lg">
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Zap, text: "Fast & Reliable" },
              { icon: Wrench, text: "Skilled Professionals" },
              { icon: Package, text: "Quality Products" },
              { icon: Banknote, text: "Affordable Prices" },
              { icon: ShieldCheck, text: "Genuine Parts" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <item.icon className="text-[var(--light-blue)]" size={24} />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Why Choose Us</h2>
            <div className="h-1 w-20 bg-[var(--electric-blue)] mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We provide the best electronics repair and sales services in the region, ensuring every customer leaves satisfied.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Fast Service", icon: "⚡", desc: "Quick turnaround times for all repairs to get you back online." },
              { title: "Skilled Technicians", icon: "🛠️", desc: "Expert staff with years of experience handling all major brands." },
              { title: "Quality Products", icon: "💯", desc: "We only sell and install premium, tested, and guaranteed parts." },
              { title: "Competitive Prices", icon: "💰", desc: "Fair and transparent pricing with no hidden costs." },
              { title: "Professional Repairs", icon: "🔧", desc: "Advanced tools and techniques for precise diagnostics and fixes." },
              { title: "Customer Support", icon: "🤝", desc: "Friendly service before, during, and after your purchase or repair." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[var(--navy)] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--light-blue)] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Your Device Fixed Today?</h2>
          <p className="text-xl mb-8 text-blue-100">Visit us at Langas Studio or book your repair online and we'll take care of the rest.</p>
          <Link to="/book-repair" className="bg-white text-[var(--light-blue)] hover:bg-gray-100 font-bold py-4 px-10 rounded-lg shadow-lg text-lg transition-all inline-block">
            Book Repair Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
