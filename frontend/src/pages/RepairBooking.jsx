import { useState } from 'react';
import { Wrench, CheckCircle, Upload, MessageCircle, Phone, Copy, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import shop1Img from '../assets/shop1.jpg';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const RepairBooking = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [repairData, setRepairData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    deviceType: 'Smartphone',
    brand: '',
    model: '',
    problem: '',
    urgency: 'Standard (1-2 days)',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate unique repair ID
    const repairId = `PPC-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Save to localStorage for standalone frontend persistence & tracking
    const newBooking = {
      id: repairId,
      fullName: formData.fullName,
      phone: formData.phone,
      device: `${formData.brand} ${formData.model}`.trim() || formData.deviceType,
      deviceType: formData.deviceType,
      brand: formData.brand,
      model: formData.model,
      problem: formData.problem,
      urgency: formData.urgency,
      technician: 'Paul (Shop Admin)',
      dateReceived: formattedDate,
      estimatedCompletion: '1-2 Days (Diagnostics)',
      estimatedCost: 'To be confirmed on inspection',
      currentStatus: 0, // 0: Device Received / Booked
      hasImage: !!previewImage,
    };

    try {
      const existingBookings = JSON.parse(localStorage.getItem('paul_repair_bookings') || '[]');
      existingBookings.unshift(newBooking);
      localStorage.setItem('paul_repair_bookings', JSON.stringify(existingBookings));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }

    // Compose formatted WhatsApp message for Admin
    const waMessage = 
`*NEW REPAIR BOOKING - PAUL PHONE CARE*
━━━━━━━━━━━━━━━━━━━━
*Repair ID:* ${repairId}
*Customer Name:* ${formData.fullName}
*Customer Phone:* ${formData.phone}
*Device Type:* ${formData.deviceType}
*Brand & Model:* ${formData.brand} ${formData.model}
*Reported Issue:* ${formData.problem}
*Urgency:* ${formData.urgency}
*Date:* ${formattedDate}
━━━━━━━━━━━━━━━━━━━━
Hello Admin Paul, I have booked a repair on your website with the details above. Please confirm diagnostic time and pricing.`;

    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;

    // Store repair data
    setRepairData({
      repairId,
      whatsappUrl,
      booking: newBooking,
    });

    // Auto open WhatsApp directly to admin
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const copyTrackingId = () => {
    if (repairData?.repairId) {
      navigator.clipboard.writeText(repairData.repairId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white p-8 md:p-10 rounded-3xl shadow-xl max-w-xl w-full text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-inner">
            <CheckCircle size={44} />
          </div>

          <h2 className="text-3xl font-bold text-[var(--navy)] mb-2">Booking Created!</h2>
          <p className="text-gray-600 mb-6">
            Your repair request has been saved. Your details are ready to be sent directly to the admin on WhatsApp.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-6 relative">
            <p className="text-xs uppercase tracking-wider font-semibold text-blue-700 mb-1">Your Unique Repair Tracking ID</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-mono font-extrabold text-[var(--navy)] tracking-wide">{repairData?.repairId}</span>
              <button 
                onClick={copyTrackingId}
                className="p-2 bg-white text-blue-600 hover:text-blue-800 rounded-lg shadow-sm border border-blue-200 transition-colors"
                title="Copy Repair ID"
              >
                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
              </button>
            </div>
            {copied && <p className="text-xs text-green-600 font-medium mt-1">Copied to clipboard!</p>}
          </div>

          {/* Direct Actions */}
          <div className="space-y-3 mb-8">
            <a 
              href={repairData?.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-all flex justify-center items-center gap-3 text-lg"
            >
              <MessageCircle size={24} /> Send Details to Admin (+254 743 220999)
            </a>

            <a 
              href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`}
              className="w-full bg-white hover:bg-gray-50 text-[var(--navy)] border-2 border-gray-200 font-bold py-3.5 px-6 rounded-xl transition-all flex justify-center items-center gap-2"
            >
              <Phone size={20} className="text-[var(--light-blue)]" /> Call Admin Directly ({ADMIN_PHONE})
            </a>
          </div>

          {/* Shop Attendant info banner */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6 flex items-center gap-4 text-left">
            <img src={shop1Img} alt="Paul Phone Care Shop" className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-sm" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned Shop Attendant</p>
              <p className="font-bold text-[var(--navy)] text-sm">Paul Phone Care - Langas Studio</p>
              <p className="text-xs text-gray-600">WhatsApp / Call: <span className="font-semibold text-blue-600">{ADMIN_PHONE}</span></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => navigate(`/track-repair?id=${repairData?.repairId}`)} 
              className="flex-1 bg-[var(--navy)] hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Track Repair Status <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '', phone: '', deviceType: 'Smartphone', brand: '', model: '', problem: '', urgency: 'Standard (1-2 days)'
                });
                setPreviewImage(null);
              }} 
              className="py-3 px-4 text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Book Another Device
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with shop badge */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Wrench size={16} /> Direct Technician Service
          </div>
          <h1 className="text-4xl font-extrabold text-[var(--navy)]">Book a Device Repair</h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Submit your device details and connect immediately with our shop attendant or admin via WhatsApp at <span className="font-bold text-[var(--navy)]">{ADMIN_PHONE}</span>.
          </p>
        </div>

        {/* Attendant & Shop Banner */}
        <div className="bg-gradient-to-r from-[var(--navy)] to-blue-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg flex flex-col md:flex-row items-center gap-6">
          <img 
            src={shop1Img} 
            alt="Paul Phone Care Storefront" 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-md border-2 border-white/20 flex-shrink-0"
          />
          <div className="flex-grow text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-blue-500/30 text-blue-200 text-xs font-semibold rounded-full mb-2">
              Langas Studio, Eldoret
            </span>
            <h3 className="text-2xl font-bold mb-1">Direct Attendant & Admin Booking</h3>
            <p className="text-blue-100 text-sm mb-4">
              Your repair request is handled directly by Paul. Submit below to receive instant confirmation on WhatsApp.
            </p>
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                <Phone size={14} className="text-green-400" /> {ADMIN_PHONE}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                <CheckCircle size={14} className="text-green-400" /> Free Diagnostics & Fair Quotes
              </span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Customer Details */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4">1. Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                    placeholder="e.g. John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number *</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                    placeholder="e.g. 0743 220 999" 
                  />
                </div>
              </div>
            </div>

            {/* Device Details */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4">2. Device Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Device Type *</label>
                  <select 
                    value={formData.deviceType}
                    onChange={(e) => setFormData({...formData, deviceType: e.target.value})} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] bg-white"
                  >
                    <option>Smartphone</option>
                    <option>Laptop</option>
                    <option>Tablet / iPad</option>
                    <option>TV / Smart Screen</option>
                    <option>Speaker / Sound System</option>
                    <option>Smartwatch</option>
                    <option>Other Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                    placeholder="e.g. Samsung, HP, Apple" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                    placeholder="e.g. S23 Ultra, ProBook 450" 
                  />
                </div>
              </div>
            </div>

            {/* Issue Description */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4">3. Repair Issue</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Problem Description *</label>
                <textarea 
                  required 
                  rows="4" 
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" 
                  placeholder="Describe what's wrong (e.g. Cracked screen, battery draining in 1 hour, not turning on, water damaged...)"
                ></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency / Preferred Turnaround</label>
                <select 
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] bg-white"
                >
                  <option>Same Day Express (Subject to parts availability)</option>
                  <option>Standard (1-2 days)</option>
                  <option>Weekend Pickup</option>
                </select>
              </div>
            </div>

            {/* Optional Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Image (Optional)
                <span className="text-gray-400 text-xs ml-2">You can also attach it directly in WhatsApp</span>
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] text-sm" 
                />
                {previewImage && (
                  <img src={previewImage} alt="Device Preview" className="w-14 h-14 rounded-xl object-cover border border-gray-200" />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-500/20 transition-all text-lg flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
              >
                <MessageCircle size={24} />
                {isSubmitting ? 'Processing Booking...' : 'Book Repair & Send Details to Admin (+254 743 220999)'}
              </button>
              <p className="text-center text-xs text-gray-500 mt-2">
                Clicking will register your booking, generate your tracking ID, and open a pre-filled WhatsApp chat with Admin Paul.
              </p>
            </div>
          </form>
        </div>

        {/* Need assistance direct call */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Prefer to speak on phone right now?{' '}
          <a href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`} className="text-[var(--navy)] font-bold hover:underline">
            Call Shop Attendant at {ADMIN_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepairBooking;