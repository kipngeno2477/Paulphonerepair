import { useState } from 'react';
import { Wrench, CheckCircle, Upload, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const RepairBooking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [repairData, setRepairData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '', phone: '', deviceType: 'Smartphone', brand: '', model: '', problem: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('deviceImage', imageFile);

    try {
      // Send data to our backend API
      const res = await fetch('http://localhost:5000/api/repair-request', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();

      if (result.success) {
        setRepairData(result);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to submit request. Ensure backend server is running on port 5000.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Request Sent!</h2>
          <p className="text-gray-600 mb-6">Your details and image have been securely sent to our system and email.</p>
          
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8">
            <p className="text-sm text-blue-800 mb-1">Your Tracking Number:</p>
            <p className="text-2xl font-mono font-bold text-[var(--navy)]">{repairData?.repairId}</p>
          </div>

          <a 
            href={repairData?.whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex justify-center items-center gap-3 mb-4"
          >
            <MessageCircle size={24} /> Proceed to WhatsApp
          </a>

          <button onClick={() => window.location.href = '/track-repair'} className="text-[var(--light-blue)] hover:underline font-medium">
            Track Repair Status Instead
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Wrench className="mx-auto text-[var(--light-blue)] mb-4" size={48} />
          <h1 className="text-4xl font-bold text-[var(--navy)]">Book a Repair</h1>
          <p className="text-gray-500 mt-2">Fill out the form below to schedule a repair for your device.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input required type="text" onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input required type="tel" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="07XX XXX XXX" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Type</label>
                <select onChange={(e) => setFormData({...formData, deviceType: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] bg-white">
                  <option>Smartphone</option><option>Laptop</option><option>Tablet</option><option>TV</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input required type="text" onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="e.g. Samsung" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input required type="text" onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="e.g. S23 Ultra" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Problem Description</label>
              <textarea required rows="4" onChange={(e) => setFormData({...formData, problem: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="Describe the issue..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Device Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[var(--navy)] hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-lg mt-4 disabled:opacity-70">
              {isSubmitting ? 'Sending Request...' : 'Submit Repair Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RepairBooking;