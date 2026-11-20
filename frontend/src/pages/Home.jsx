import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench, Package, Banknote, Zap, ArrowRight, Phone, MessageCircle, MapPin, Star, Play, Video, Volume2, VolumeX, Sparkles, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { products } from '../data/products';
import VideoPlayer from '../components/VideoPlayer';

import shop1Img from '../assets/shop1.jpg';
import heroImg1 from '../assets/electronics/samsung-a14.jpg';
import heroImg2 from '../assets/electronics/jbl-flip-6.jpg';
import heroImg3 from '../assets/electronics/redmi-note-11se.jpg';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const heroImages = [shop1Img, heroImg1, heroImg2, heroImg3];

const Home = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [bgMode, setBgMode] = useState('video'); // 'video' | 'slideshow'
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const toggleHeroAudio = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isHeroMuted;
    }
    setIsHeroMuted(!isHeroMuted);
  };

  const scrollToVideos = () => {
    const el = document.getElementById('video-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative text-white py-24 sm:py-32 lg:py-40 overflow-hidden min-h-[640px] flex items-center">
        {/* Background (Video or Image Slideshow) */}
        <div className="absolute inset-0 z-0 bg-[var(--navy)]">
          {bgMode === 'video' ? (
            <video
              ref={heroVideoRef}
              src="/videos/demo-vid.mp4"
              autoPlay
              loop
              muted={isHeroMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          ) : (
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
          )}
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        </div>

        {/* Hero Background Control Bar */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          <div className="bg-black/50 backdrop-blur-md rounded-full p-1 border border-white/20 flex items-center text-xs shadow-lg">
            <button
              type="button"
              onClick={() => setBgMode('video')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all font-semibold ${
                bgMode === 'video'
                  ? 'bg-[var(--electric-blue)] text-[var(--navy)] shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Video size={14} /> Shop Video
            </button>
            <button
              type="button"
              onClick={() => setBgMode('slideshow')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all font-semibold ${
                bgMode === 'slideshow'
                  ? 'bg-[var(--electric-blue)] text-[var(--navy)] shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Sparkles size={14} /> Slides
            </button>
          </div>
          {bgMode === 'video' && (
            <button
              type="button"
              onClick={toggleHeroAudio}
              className="p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md border border-white/20 transition-all shadow-lg"
              title={isHeroMuted ? 'Unmute Background Video' : 'Mute Background Video'}
            >
              {isHeroMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-green-400" />}
            </button>
          )}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/30 text-blue-200 text-xs sm:text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
                  <MapPin size={16} className="text-blue-300" /> Langas Studio, Eldoret | Direct line: {ADMIN_PHONE}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg leading-tight">
                  PAUL PHONE CARE
                  <span className="block text-[var(--electric-blue)] mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold">
                    Expert Electronics & Repairs
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
                  Quality gadgets, genuine accessories, and professional motherboard & screen repairs. Watch our live workshop in action or chat directly with Admin Paul.
                </p>

                <div className="flex flex-wrap gap-3.5 mb-6">
                  <Link to="/book-repair" className="bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-blue-500/30 transition-all text-center flex items-center justify-center text-base">
                    Book a Repair <ArrowRight className="ml-2" size={20} />
                  </Link>
                  <Link to="/shop" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all text-center text-base">
                    Shop Electronics
                  </Link>
                  <a 
                    href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul Phone Care, I saw your website and would like to speak with the shop attendant / admin.')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all text-center flex items-center justify-center gap-2 text-base shadow-lg shadow-green-500/20"
                  >
                    <MessageCircle size={20} /> WhatsApp Admin
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Hero Video Preview Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-black/60 backdrop-blur-xl rounded-3xl p-3 border border-white/20 shadow-2xl relative"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
                  <video
                    src="/videos/vid-2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    Technician Bench Demo
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between text-left">
                  <div>
                    <h4 className="font-bold text-white text-sm">Live Repair Work</h4>
                    <p className="text-xs text-blue-200">Diagnostics & motherboard service at Langas Studio</p>
                  </div>
                  <button
                    type="button"
                    onClick={scrollToVideos}
                    className="text-xs bg-[var(--electric-blue)] text-[var(--navy)] font-bold px-3 py-1.5 rounded-lg hover:bg-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    View All <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            </div>

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

      {/* Live Video Showcase Section featuring Demo vid .mp4 & Vid 2.mp4 */}
      <section id="video-showcase" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900 to-slate-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-semibold mb-3 border border-blue-400/30">
              <Video size={16} /> Real Shop & Workshop Footage
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              See Paul Phone Care in Action
            </h2>
            <div className="h-1 w-20 bg-[var(--electric-blue)] mx-auto rounded-full mt-4 mb-4" />
            <p className="text-gray-300 text-base sm:text-lg">
              Watch real footage straight from our store and repair bench at Langas Studio, Eldoret.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Video 1: Demo vid .mp4 */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
              <div>
                <VideoPlayer
                  src="/videos/demo-vid.mp4"
                  badge="Store Tour"
                  title="Paul Phone Care Store Display"
                  subtitle="Langas Studio, Eldoret"
                  autoPlay={false}
                  loop={true}
                  className="mb-5 shadow-2xl"
                />
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <h3 className="text-xl font-bold text-white">Shop & Electronics Showcase</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Tour our physical store shelves stocked with tested headphones, Bluetooth sound rigs, fast chargers, power banks, and genuine replacement screens.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-blue-200">
                    <span className="bg-blue-950/60 border border-blue-800/50 px-2.5 py-1 rounded-md">Genuine Accessories</span>
                    <span className="bg-blue-950/60 border border-blue-800/50 px-2.5 py-1 rounded-md">Audio & Amplifiers</span>
                    <span className="bg-blue-950/60 border border-blue-800/50 px-2.5 py-1 rounded-md">Smartphones</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-700/60 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/shop"
                  className="flex-1 bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-3 px-4 rounded-xl text-center text-sm transition-all"
                >
                  Browse Shop Stock
                </Link>
                <a
                  href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul, I watched your shop demo video and want to ask about products in stock.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-3 px-5 rounded-xl text-center text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> Inquire Stock
                </a>
              </div>
            </div>

            {/* Video 2: Vid 2.mp4 */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
              <div>
                <VideoPlayer
                  src="/videos/vid-2.mp4"
                  badge="Technician Bench"
                  title="Live Diagnostics & Hardware Service"
                  subtitle="Lead Technician Paul at the Bench"
                  autoPlay={false}
                  loop={true}
                  className="mb-5 shadow-2xl"
                />
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <h3 className="text-xl font-bold text-white">Diagnostics & Repair Bench</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    See hands-on precision diagnostics, motherboard micro-soldering, and screen testing performed by technician Paul with professional repair tools.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-blue-200">
                    <span className="bg-blue-950/60 border border-blue-800/50 px-2.5 py-1 rounded-md">Micro-Soldering</span>
                    <span className="bg-blue-950/60 border border-blue-800/50 px-2.5 py-1 rounded-md">Screen Testing</span>
                    <span className="bg-blue-950/60 border border-blue-800/50 px-2.5 py-1 rounded-md">Motherboard Repair</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-700/60 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book-repair"
                  className="flex-1 bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-3 px-4 rounded-xl text-center text-sm transition-all flex items-center justify-center gap-1.5"
                >
                  Book This Repair <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Paul, I watched your repair bench video and need help with my device.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-3 px-5 rounded-xl text-center text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> Chat Technician
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
