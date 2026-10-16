import { useState } from 'react';
import { Upload, Smartphone, DollarSign, Send, MessageCircle, Phone, CheckCircle } from 'lucide-react';
import shop1Img from '../assets/shop1.jpg';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const SellDevice = () => {
  const [formData, setFormData] = useState({
    category: 'Smartphone',
    brandModel: '',
    condition: 'Like New (No scratches, works perfectly)',
    expectedPrice: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const waText = 
`*DEVICE FOR SALE - TRADE IN INQUIRY*
━━━━━━━━━━━━━━━━━━━━
*Category:* ${formData.category}
*Brand & Model:* ${formData.brandModel}
*Condition:* ${formData.condition}
*Expected Price:* KES ${formData.expectedPrice}
*Client Phone:* ${formData.phone}
━━━━━━━━━━━━━━━━━━━━
Hello Admin Paul, I want to sell this device to Paul Phone Care. Please review and make an offer.`;

    const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Smartphone className="mx-auto text-[var(--light-blue)] mb-4" size={48} />
          <h1 className="text-4xl font-extrabold text-[var(--navy)] mb-4">Sell or Trade In Your Device</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Turn your old phones, laptops, and tablets into instant cash. Send details directly to shop admin Paul at <span className="font-bold text-[var(--navy)]">{ADMIN_PHONE}</span>.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--navy)] mb-2">Details Sent to Admin!</h3>
            <p className="text-gray-600 mb-6">
              Your device trade-in details have been formatted and sent via WhatsApp to {ADMIN_PHONE}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[var(--navy)] text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-900"
              >
                Submit Another Device
              </button>
              <a 
                href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`}
                className="bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Call Admin Directly
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Device Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] bg-white"
                  >
                    <option>Smartphone</option>
                    <option>Laptop</option>
                    <option>Tablet</option>
                    <option>TV / Screen</option>
                    <option>Audio / Speaker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand & Model *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.brandModel}
                    onChange={(e) => setFormData({...formData, brandModel: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                    placeholder="e.g. iPhone 12 Pro 128GB" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Condition</label>
                <select 
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] bg-white"
                >
                  <option>Like New (No scratches, works perfectly)</option>
                  <option>Good (Minor scratches, works perfectly)</option>
                  <option>Fair (Noticeable wear, works fine)</option>
                  <option>Broken/Faulty (Needs repair / Screen broken)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price (KES) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                      required
                      type="number" 
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({...formData, expectedPrice: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                      placeholder="e.g. 25000" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number *</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                    placeholder="07XX XXX XXX" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600 font-medium">Attach photos directly in WhatsApp chat</p>
                  <p className="text-xs text-gray-400 mt-1">Front, back, and any damaged areas</p>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-lg flex justify-center items-center gap-2 cursor-pointer"
              >
                <MessageCircle size={22} /> Send Details to Admin (+254 743 220999)
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellDevice;
