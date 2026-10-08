import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ShoppingCart, Heart, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--navy)]">Shop Electronics</h1>
            <p className="text-gray-500 mt-1">Find the best devices and accessories</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-[var(--light-blue)]" />
                <h3 className="text-lg font-bold text-[var(--navy)]">Categories</h3>
              </div>
              <ul className="space-y-2">
                {categories.map((category, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category ? 'bg-[var(--electric-blue)] bg-opacity-10 text-[var(--light-blue)] font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--navy)]'}`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
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
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {product.originalPrice && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                          SALE
                        </div>
                      )}
                      <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10 bg-white p-1.5 rounded-full shadow-sm">
                        <Heart size={18} />
                      </button>
                      <Link to={`/shop/${product.id}`}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                      <Link to={`/shop/${product.id}`}>
                        <h3 className="font-bold text-[var(--navy)] text-lg mb-2 hover:text-[var(--light-blue)] line-clamp-1">{product.name}</h3>
                      </Link>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-[var(--light-blue)] text-lg">KES {product.price.toLocaleString()}</div>
                          {product.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">KES {product.originalPrice.toLocaleString()}</div>
                          )}
                        </div>
                        <button className="bg-[var(--navy)] hover:bg-[var(--light-blue)] text-white p-2.5 rounded-xl transition-colors">
                          <ShoppingCart size={20} />
                        </button>
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
