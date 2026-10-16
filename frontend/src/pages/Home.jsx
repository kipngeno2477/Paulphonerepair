import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench, Package, Banknote, Zap, ArrowRight, Phone, MessageCircle, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { products } from '../data/products';

import shop1Img from '../assets/shop1.jpg';
import heroImg1 from '../assets/electronics/samsung-a14.jpg';
import heroImg2 from '../assets/electronics/jbl-flip-6.jpg';
import heroImg3 from '../assets/electronics/redmi-note-11se.jpg';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const heroImages = [shop1Img, heroImg1, heroImg2, heroImg3];

const Home = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/30 text-blue-200 text-xs sm:text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
                <MapPin size={16} className="text-blue-300" /> Langas Studio, Eldoret | Direct line: {ADMIN_PHONE}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg leading-tight">
                PAUL PHONE CARE
                <span className="block text-[var(--electric-blue)] mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold">
                  Expert Electronics & Repairs
                </span>
              </h1>
              <p className="text-lg sm:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
                Quality gadgets, genuine accessories, and professional motherboard & screen repairs. Send your details directly to Admin Paul for immediate assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-repair" className="bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all text-center flex items-center justify-center text-lg">
                  Book a Repair <ArrowRight className="ml-2" size={22} />
                </Link>
                <Link to="/shop" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-center text-lg">
                  Shop Electronics
                </Link>
                <a 
                  href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul Phone Care, I saw your website and would like to speak with the shop attendant / admin.')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all text-center flex items-center justify-center gap-2 text-lg shadow-lg shadow-green-500/20"
                >
                  <MessageCircle size={22} /> WhatsApp Admin
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
              { icon: Wrench, text: "Skilled Technicians" },
              { icon: Package, text: "Tested Genuine Stock" },
              { icon: Banknote, text: "Affordable Pricing" },
              { icon: ShieldCheck, text: "Direct Admin Support" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2.5 text-gray-700">
                <item.icon className="text-[var(--light-blue)]" size={24} />
                <span className="font-semibold text-sm sm:text-base">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Shop Showcase Section featuring shop1.jpg */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100 group">
                <img 
                  src={shop1Img} 
                  alt="Paul Phone Care Store Display at Langas Studio" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[var(--navy)] text-white p-5 rounded-2xl shadow-xl border border-blue-400/20 max-w-xs">
                <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Storefront</p>
                <p className="font-bold text-base sm:text-lg">Langas Studio, Eldoret</p>
                <p className="text-xs text-gray-300 mt-1">Open Mon - Sat 8:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div>
              <span className="text-[var(--light-blue)] font-bold text-sm uppercase tracking-wider">
                Visit Our Physical Store
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)] mt-2 mb-6">
                Your Neighborhood Tech & Electronics Hub
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Come see us at Langas Studio! We stock top-grade wireless headphones, Bluetooth speakers, shavers, smartwatches, phone screens, chargers, and studio gear.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Got a broken phone, laptop, or TV? Hand it directly to our lead technician Paul for honest diagnostics, fast turnaround, and guaranteed genuine spare parts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul, I would like to visit the shop or ask about a product.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp ({ADMIN_PHONE})
                </a>
                <a 
                  href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`}
                  className="bg-gray-100 hover:bg-gray-200 text-[var(--navy)] font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> Call {ADMIN_PHONE}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Products — Amplifiers & Sound Systems */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[var(--light-blue)] font-bold text-sm uppercase tracking-wider">
              Hot Deals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)] mt-2 mb-4">
              Featured Sound Systems & Amplifiers
            </h2>
            <div className="h-1 w-20 bg-[var(--electric-blue)] mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Custom-built audio rigs, amplifiers, and Bluetooth media decks — hand-tuned at Langas Studio. Order via WhatsApp for same-day pickup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => p.featured).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-[var(--navy)]/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    ⚡ Featured
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-[var(--light-blue)] font-semibold uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-base font-bold text-[var(--navy)] mb-2 leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          size={14}
                          className={s < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-2xl font-extrabold text-[var(--navy)]">
                      KSh {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through mb-0.5">
                        KSh {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-[var(--navy)] font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`Hello Paul, I'd like to order: ${product.name} (KSh ${product.price.toLocaleString()})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-[#25D366] hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm"
                    >
                      <MessageCircle size={16} /> Order
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-blue-900 text-white font-bold py-3.5 px-8 rounded-xl transition-colors text-lg shadow-lg"
            >
              Browse All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Why Choose Paul Phone Care</h2>
            <div className="h-1 w-20 bg-[var(--electric-blue)] mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We provide the most reliable electronics repair and sales services in Eldoret, ensuring every customer leaves with a working device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Direct Attendant Care", icon: "🤝", desc: "Speak directly with Paul (+254 743 220999) without intermediaries." },
              { title: "Fast Turnaround", icon: "⚡", desc: "Same-day diagnostic and express repairs for all major phone brands." },
              { title: "Quality Replacement Parts", icon: "💯", desc: "Tested original screens, batteries, and charging ports." },
              { title: "Fair Pricing", icon: "💰", desc: "Clear, upfront quotes before any work begins — no surprise charges." },
              { title: "Micro-Soldering", icon: "🔧", desc: "Advanced motherboard repairs, IC replacements, and water damage recovery." },
              { title: "Full Warranty Support", icon: "🛡️", desc: "Peace of mind with warranty coverage on all repairs and new electronics." }
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
      <section className="py-20 bg-gradient-to-r from-[var(--navy)] to-blue-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Need Your Device Repaired Today?</h2>
          <p className="text-xl mb-8 text-blue-200">
            Book online and send the details straight to Admin Paul via WhatsApp at <span className="text-white font-bold">{ADMIN_PHONE}</span>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/book-repair" className="bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-4 px-10 rounded-xl shadow-lg text-lg transition-all inline-block">
              Book Repair Now
            </Link>
            <a 
              href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul, I need emergency repair for my device.')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg text-lg transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={22} /> WhatsApp {ADMIN_PHONE}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
