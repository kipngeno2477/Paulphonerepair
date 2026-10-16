import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import shop1Img from '../assets/shop1.jpg';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_PHONE_RAW = '254743220999';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = `*MESSAGE TO PAUL PHONE CARE*%0A━━━━━━━━━━━━━━━━━━━━%0A*Name:* ${encodeURIComponent(formData.name || 'Customer')}%0A*Phone:* ${encodeURIComponent(formData.phone || 'Not provided')}%0A*Email:* ${encodeURIComponent(formData.email || 'Not provided')}%0A*Message:* ${encodeURIComponent(formData.message || 'Hello, I would like to inquire about your repair services.')}`;
    window.open(`https://wa.me/${ADMIN_PHONE_RAW}?text=${text}`, '_blank');
  };

  const handleEmail = (e) => {
    e.preventDefault();
    const subject = `Contact Inquiry from ${formData.name || 'Customer'}`;
    const body = `Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:info@paulphonecare.co.ke?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Always Ready To Help
          </span>
          <h1 className="text-4xl font-extrabold text-[var(--navy)] mb-4">Contact Shop Attendant & Admin</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have questions about an electronics repair, need a quotation, or want to buy devices? Reach out directly via phone, WhatsApp, or visit our shop at Langas Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info & Shop Photo */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shop Photo Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-56 w-full">
                <img 
                  src={shop1Img} 
                  alt="Paul Phone Care Store at Langas Studio" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <p className="text-white font-bold text-sm">Paul Phone Care - Physical Store</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 text-xs text-blue-900 border-t border-blue-100">
                <span className="font-semibold">Shop Attendant on site:</span> Paul is available to test, diagnose, and repair your electronics.
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[var(--navy)] mb-6">Direct Contact</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[var(--light-blue)] flex-shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Our Location</h4>
                    <p className="text-gray-600 text-sm">Langas Studio<br />Eldoret, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[var(--light-blue)] flex-shrink-0">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Direct Attendant Line</h4>
                    <a href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`} className="text-[var(--navy)] font-bold text-base hover:text-blue-600 block">
                      {ADMIN_PHONE}
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">Calls & WhatsApp 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[var(--light-blue)] flex-shrink-0">
                    <Clock />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                    <p className="text-gray-600 text-sm">Mon - Sat: 8:00 AM - 7:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                <a 
                  href={`https://wa.me/${ADMIN_PHONE_RAW}?text=${encodeURIComponent('Hello Paul Phone Care, I want to talk to the shop attendant / admin.')}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-green-500/20"
                >
                  <MessageCircle size={20} /> Chat with Admin on WhatsApp
                </a>

                <a 
                  href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-[var(--navy)] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Phone size={18} /> Call {ADMIN_PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[var(--navy)] mb-2">Send Details Directly</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Fill in your message and choose to send directly via WhatsApp to <span className="font-bold text-[var(--navy)]">{ADMIN_PHONE}</span>.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
                      <input 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        type="tel" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                        placeholder="0743 220 999" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address (Optional)</label>
                    <input 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                      placeholder="john@example.com" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message / Device Inquiry</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows="5" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                      placeholder="Describe your device issue or product inquiry..."
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button 
                      type="button" 
                      onClick={handleWhatsApp} 
                      className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                    >
                      <MessageCircle size={20} /> Send Directly via WhatsApp (+254 743 220999)
                    </button>
                    <button 
                      type="button" 
                      onClick={handleEmail} 
                      className="bg-[var(--navy)] hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                    >
                      <Mail size={20} /> Send via Email
                    </button>
                  </div>
                </form>
              </div>

              {/* Physical Shop note */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-500">
                <MapPin size={18} className="text-[var(--light-blue)] flex-shrink-0" />
                <span>Visit Paul Phone Care directly at Langas Studio, Eldoret for immediate in-person diagnostics.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
