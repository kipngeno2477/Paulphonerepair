import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useState } from 'react';
import { ShoppingCart, Heart, Star, CheckCircle, MessageCircle } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0]; // fallback for demo
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[var(--light-blue)]">Home</Link> / 
          <Link to="/shop" className="hover:text-[var(--light-blue)] ml-1">Shop</Link> / 
          <span className="text-gray-800 ml-1">{product.category}</span> / 
          <span className="text-gray-400 ml-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-8">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm font-semibold tracking-wider text-[var(--light-blue)] uppercase">
              {product.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)] mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({product.reviews} customer reviews)</span>
            </div>

            <div className="mb-6 flex items-end gap-3">
              <span className="text-4xl font-extrabold text-[var(--navy)]">KES {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">KES {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <CheckCircle size={20} />
                <span className="font-medium">{product.inStock ? 'In Stock and ready to ship' : 'Out of Stock'}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-300 rounded-xl bg-white w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-gray-500 hover:text-[var(--navy)]">-</button>
                  <span className="px-4 py-3 font-semibold text-[var(--navy)] w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-gray-500 hover:text-[var(--navy)]">+</button>
                </div>
                
                <button className="flex-1 bg-[var(--navy)] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                
                <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            <a 
              href={`https://wa.me/254799902607?text=Hello%20PAUL%20PHONE%20CARE,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}.%20Is%20it%20available?`}
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
