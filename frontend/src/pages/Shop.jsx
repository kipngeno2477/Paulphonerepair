import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ShoppingCart, Heart, Search, Filter, MessageCircle, Sparkles, Volume2, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

// WhatsApp images for the featured audio banner
import waSoundRigGreen from '../assets/WhatsApp Image 2026-10-16 at 22.38.51.jpeg';
import waSoundRigPurple from '../assets/WhatsApp Image 2026-10-16 at 22.38.52.jpeg';
import waMediaDeckAmp from '../assets/WhatsApp Image 2026-10-16 at 22.38.53.jpeg';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredAudio = products.filter(p => p.featured);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)]">Shop Electronics & Audio</h1>
            <p className="text-gray-500 mt-1">
              Top smartphones, accessories, and custom sound systems built in-house at Langas Studio.
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search phones, speakers, car audio..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] shadow-sm bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Featured Custom Audio Systems Showcase (The new WhatsApp Images) */}
        <div className="mb-12 bg-gradient-to-br from-[var(--navy)] via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-500/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/30">
                <Sparkles size={14} /> New In Stock & Custom Built
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <Volume2 className="text-[var(--electric-blue)]" /> Custom Car Audio & Amplifier Stations
              </h2>
              <p className="text-blue-200 text-sm mt-1">
                Handcrafted sound rigs, Pioneer Bluetooth players, Boschmann equalizers & amp decks by Njuguna Sounds.
              </p>
            </div>
            
            <a 
              href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hello Admin Paul, I am interested in your custom car audio and sound systems.')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg text-sm whitespace-nowrap cursor-pointer"
            >
              <MessageCircle size={18} /> Inquire Audio on WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAudio.map((item) => (
              <div 
                key={item.id} 
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/15 hover:border-blue-400/50 transition-all flex flex-col group"
              >
                <div className="relative aspect-[4/3] bg-black/40 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[var(--electric-blue)] text-[var(--navy)] text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md">
                    Custom Build
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-[var(--electric-blue)] transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-blue-200 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <span className="text-lg font-extrabold text-[var(--electric-blue)]">
                        KES {item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          KES {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Link 
                      to={`/shop/${item.id}`} 
                      className="bg-white text-[var(--navy)] hover:bg-[var(--electric-blue)] text-xs font-bold py-2 px-3.5 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories & Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-[var(--light-blue)]" />
                <h3 className="text-lg font-bold text-[var(--navy)]">Categories</h3>
              </div>
              <ul className="space-y-1.5">
                {categories.map((category, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all text-sm ${
                        selectedCategory === category 
                          ? 'bg-[var(--navy)] text-white font-semibold shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--navy)]'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Direct Shop Contact Card */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Shop Attendant</p>
                <p className="text-sm font-bold text-[var(--navy)] mb-1">Paul Phone Care</p>
                <p className="text-xs text-gray-600 mb-4">Call or WhatsApp for quick orders & delivery inquiries.</p>
                <a 
                  href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors mb-2"
                >
                  <Phone size={14} /> Call {ADMIN_PHONE}
                </a>
                <a 
                  href={`https://wa.me/${ADMIN_WHATSAPP}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors shadow-sm"
                >
                  <MessageCircle size={14} /> WhatsApp Attendant
                </a>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">No products found matching your search.</p>
                <button 
                  onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
                  className="mt-4 text-[var(--light-blue)] font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={product.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-3">
                      {product.originalPrice && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                          SALE
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded z-10 shadow-sm">
                          SHOP BUILD
                        </div>
                      )}
                      <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10 bg-white p-1.5 rounded-full shadow-sm">
                        <Heart size={18} />
                      </button>
                      <Link to={`/shop/${product.id}`} className="w-full h-full flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs font-medium text-[var(--light-blue)] mb-1 uppercase tracking-wider">{product.category}</div>
                      <Link to={`/shop/${product.id}`}>
                        <h3 className="font-bold text-[var(--navy)] text-base mb-2 hover:text-[var(--light-blue)] line-clamp-2 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                        <div>
                          <div className="font-extrabold text-[var(--navy)] text-lg">KES {product.price.toLocaleString()}</div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-400 line-through">KES {product.originalPrice.toLocaleString()}</div>
                          )}
                        </div>
                        <a 
                          href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`Hello Paul Phone Care, I am interested in purchasing ${product.name} (KES ${product.price.toLocaleString()}). Is it available?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Quick WhatsApp Order"
                          className="bg-[#25D366] hover:bg-green-600 text-white p-2.5 rounded-xl transition-colors shadow-sm"
                        >
                          <MessageCircle size={18} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
