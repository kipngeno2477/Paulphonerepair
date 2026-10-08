import { CheckCircle } from 'lucide-react';
import shop1 from '../assets/electronics/shop-1.jpg';
import shop2 from '../assets/electronics/shop-2.jpg';
import shop3 from '../assets/electronics/shop-3.jpg';
import shop4 from '../assets/electronics/shop-4.jpg';
import shop5 from '../assets/electronics/shop-5.jpg';


const About = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl font-bold text-[var(--navy)] mb-6">About PAUL PHONE CARE</h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Located at Langas Studio, PAUL PHONE CARE is your premier destination for all things electronics. We pride ourselves on being more than just a repair shop or an electronics store — we are a comprehensive technology hub dedicated to keeping our community connected.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team of skilled professionals handles everything from complex motherboard micro-soldering to providing the latest smartphones and accessories at competitive prices.
            </p>
            
            <h3 className="text-2xl font-bold text-[var(--navy)] mb-4">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {['Quality', 'Reliability', 'Professionalism', 'Customer Satisfaction'].map((value, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-800 font-medium">
                  <CheckCircle className="text-[var(--light-blue)]" size={20} /> {value}
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img src={shop5} alt="Repair Shop" className="rounded-2xl shadow-md w-full h-64 object-cover" />
            <img src={shop4} alt="Electronics Store" className="rounded-2xl shadow-md w-full h-64 object-cover mt-8" />
          </div>
        </div>

        {/* Gallery Section Placeholder */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-[var(--navy)] mb-12">Shop Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden"><img src={shop1} className="w-full h-full object-cover" alt="Gallery" /></div>
            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden"><img src={shop2} className="w-full h-full object-cover" alt="Gallery" /></div>
            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden"><img src={shop3} className="w-full h-full object-cover" alt="Gallery" /></div>
            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden"><img src={shop4} className="w-full h-full object-cover" alt="Gallery" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
