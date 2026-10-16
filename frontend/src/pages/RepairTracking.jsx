import { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle, Clock, Settings, ShieldCheck, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ADMIN_PHONE = '+254 743 220999';
const ADMIN_WHATSAPP = '254743220999';

const RepairTracking = () => {
  const location = useLocation();
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const steps = [
    { title: "Device Received", icon: MapPin },
    { title: "Diagnosis", icon: Search },
    { title: "Repair In Progress", icon: Settings },
    { title: "Quality Testing", icon: ShieldCheck },
    { title: "Ready for Collection", icon: CheckCircle }
  ];

  const performSearch = (idToSearch) => {
    const cleanId = idToSearch.trim();
    if (!cleanId) return;

    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      // 1. Check localStorage for user bookings
      try {
        const stored = JSON.parse(localStorage.getItem('paul_repair_bookings') || '[]');
        const matched = stored.find(b => b.id.toLowerCase() === cleanId.toLowerCase());

        if (matched) {
          setResult({
            id: matched.id,
            device: matched.device || `${matched.brand || ''} ${matched.model || ''}`.trim() || matched.deviceType,
            problem: matched.problem,
            technician: matched.technician || "Paul (Shop Admin)",
            dateReceived: matched.dateReceived || "Recent",
            estimatedCompletion: matched.estimatedCompletion || "1-2 Business Days",
            estimatedCost: matched.estimatedCost || "Contact admin for quote",
            currentStatus: matched.currentStatus ?? 0,
            customerName: matched.fullName,
            customerPhone: matched.phone,
          });
          setIsSearching(false);
          return;
        }
      } catch (err) {
        console.warn('Error reading from localStorage', err);
      }

      // 2. Demo fallback if user enters demo ID or any other query
      if (cleanId.toUpperCase().includes('PPC') || cleanId.toUpperCase().includes('REP')) {
        setResult({
          id: cleanId.toUpperCase(),
          device: "Samsung Galaxy S22 Ultra",
          problem: "Diagnostic & Screen Inspection",
          technician: "Paul (Lead Technician)",
          dateReceived: "Oct 16, 2026",
          estimatedCompletion: "Oct 18, 2026",
          estimatedCost: "KES 4,500",
          currentStatus: 1, // Diagnosis
        });
        setIsSearching(false);
      } else {
        setNotFound(true);
        setResult(null);
        setIsSearching(false);
      }
    }, 600);
  };

  const handleTrack = (e) => {
    e.preventDefault();
    performSearch(trackingId);
  };

  // If URL has ?id=PPC-XXXXX, auto search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    if (idParam) {
      setTrackingId(idParam);
      performSearch(idParam);
    }
  }, [location.search]);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">Track Your Repair</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Enter your repair tracking number (e.g. <span className="font-mono font-semibold text-[var(--navy)]">PPC-123456</span>) to see the live status of your device.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              required
              className="flex-grow px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] text-lg uppercase font-mono tracking-wider" 
              placeholder="e.g. PPC-123456" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={isSearching}
              className="bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-4 px-8 rounded-xl shadow-lg transition-all disabled:opacity-70 flex items-center justify-center whitespace-nowrap cursor-pointer"
            >
              {isSearching ? 'Searching...' : 'Track Device'}
            </button>
          </form>

          {notFound && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
              No active repair found matching <span className="font-mono font-bold">{trackingId}</span>. Please verify your Repair ID or contact Admin Paul at <span className="font-bold">{ADMIN_PHONE}</span>.
            </div>
          )}
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="bg-[var(--navy)] text-white p-6 sm:px-10 flex justify-between items-center flex-wrap gap-4">
              <div>
                <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Repair Tracking ID</p>
                <p className="text-2xl font-mono font-bold">{result.id}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-4 py-1.5 bg-blue-500/30 text-blue-100 rounded-full text-sm font-semibold border border-blue-400/30">
                  {steps[result.currentStatus]?.title || "In System"}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              {/* Status Timeline */}
              <div className="relative mb-12 py-4">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0 transition-all duration-1000"
                  style={{ width: `${(result.currentStatus / (steps.length - 1)) * 100}%` }}
                ></div>
                
                <div className="flex justify-between relative z-10">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= result.currentStatus;
                    const isCurrent = idx === result.currentStatus;
                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-500
                          ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
                          ${isCurrent ? 'ring-4 ring-green-100' : ''}
                        `}>
                          <step.icon size={18} />
                        </div>
                        <span className={`text-xs mt-3 text-center hidden sm:block max-w-[80px] font-medium
                          ${isCompleted ? 'text-green-600' : 'text-gray-400'}
                        `}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Device</h3>
                  <p className="text-lg font-bold text-gray-800">{result.device}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Reported Issue</h3>
                  <p className="text-lg font-bold text-gray-800">{result.problem}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Technician / Attendant</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {result.technician.charAt(0)}
                    </div>
                    <p className="font-semibold text-gray-800">{result.technician}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Estimated Cost</h3>
                  <p className="text-lg font-bold text-[var(--light-blue)]">{result.estimatedCost}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <Clock className="text-gray-400" />
                  <div>
                    <h3 className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Date Logged</h3>
                    <p className="font-medium text-gray-800">{result.dateReceived}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                  <Clock className="text-blue-500" />
                  <div>
                    <h3 className="text-xs text-blue-600 uppercase tracking-wider font-semibold">Turnaround / Ready</h3>
                    <p className="font-medium text-blue-900">{result.estimatedCompletion}</p>
                  </div>
                </div>
              </div>

              {/* Contact Admin directly about this repair */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Questions about this repair?</p>
                  <p className="text-xs text-gray-500">Contact Admin Paul at {ADMIN_PHONE}</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <a 
                    href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`Hello Admin Paul, I am inquiring about my Repair ID: ${result.id} (${result.device})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial bg-[#25D366] hover:bg-green-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-sm text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} /> WhatsApp Admin
                  </a>
                  <a 
                    href={`tel:${ADMIN_PHONE.replace(/\s+/g, '')}`}
                    className="flex-1 sm:flex-initial bg-white border border-gray-300 hover:bg-gray-50 text-[var(--navy)] font-bold py-2.5 px-5 rounded-xl text-sm flex items-center justify-center gap-2"
                  >
                    <Phone size={16} /> Call
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RepairTracking;
