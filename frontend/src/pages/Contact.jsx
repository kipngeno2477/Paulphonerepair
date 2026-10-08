import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';

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

  const handleWhatsApp = () => {
    const text = `Hello Paul Phone Care!%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/254799902607?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:info@paulphonecare.co.ke?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Have a question about a product or need a repair quote? Reach out to us using the form below or visit our shop.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[var(--navy)] mb-6">Get In Touch</h3>

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
                    <h4 className="font-semibold text-gray-800 mb-1">Phone & WhatsApp</h4>
                    <p className="text-gray-600 text-sm">0799 902 607<br />0799902607</p>
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

              <div className="mt-8 pt-8 border-t border-gray-100">
                <a href="https://wa.me/254799902607" target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Phone size={20} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 h-full">
              <h3 className="text-2xl font-bold text-[var(--navy)] mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="07XX XXX XXX" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address (Optional)</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="How can we help you?"></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="button" onClick={handleWhatsApp} className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                    <MessageCircle size={20} /> Send via WhatsApp
                  </button>
                  <button type="button" onClick={handleEmail} className="bg-[var(--navy)] hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Mail size={20} /> Send via Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-gray-200 w-full h-96 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
            [Google Maps Integration Here - Langas Studio]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
