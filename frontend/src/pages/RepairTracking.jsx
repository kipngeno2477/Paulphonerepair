import { useState } from 'react';
import { Search, MapPin, CheckCircle, Clock, Settings, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const RepairTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        id: trackingId || "PPC-2026-00125",
        device: "Samsung Galaxy S22 Ultra",
        problem: "Cracked Screen & Battery Drain",
        technician: "Paul",
        dateReceived: "Oct 5, 2026",
        estimatedCompletion: "Oct 9, 2026",
        estimatedCost: "KES 15,000",
        currentStatus: 2 // 0: Received, 1: Diagnosis, 2: In Progress, 3: Testing, 4: Ready
      });
      setIsSearching(false);
    }, 1200);
  };

  const steps = [
    { title: "Device Received", icon: MapPin },
    { title: "Diagnosis", icon: Search },
    { title: "Repair In Progress", icon: Settings },
    { title: "Quality Testing", icon: ShieldCheck },
    { title: "Ready for Collection", icon: CheckCircle }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">Track Your Repair</h1>
          <p className="text-gray-500">Enter your repair ID to see the current status of your device.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              required
              className="flex-grow px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] text-lg" 
              placeholder="e.g. PPC-2026-00125" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={isSearching}
              className="bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] font-bold py-4 px-8 rounded-xl shadow-lg transition-all disabled:opacity-70 flex items-center justify-center whitespace-nowrap"
            >
              {isSearching ? 'Searching...' : 'Track Device'}
            </button>
          </form>
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="bg-[var(--navy)] text-white p-6 sm:px-10 flex justify-between items-center flex-wrap gap-4">
              <div>
                <p className="text-blue-200 text-sm mb-1">Repair ID</p>
                <p className="text-2xl font-mono font-bold">{result.id}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-blue-500/30 text-blue-100 rounded-full text-sm font-semibold border border-blue-400/30">
                  {steps[result.currentStatus].title}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Device</h3>
                  <p className="text-lg font-semibold text-gray-800">{result.device}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Reported Problem</h3>
                  <p className="text-lg font-semibold text-gray-800">{result.problem}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Assigned Technician</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {result.technician.charAt(0)}
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{result.technician}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Estimated Cost</h3>
                  <p className="text-lg font-semibold text-[var(--light-blue)]">{result.estimatedCost}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <Clock className="text-gray-400" />
                  <div>
                    <h3 className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Received On</h3>
                    <p className="font-medium text-gray-800">{result.dateReceived}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                  <Clock className="text-blue-500" />
                  <div>
                    <h3 className="text-xs text-blue-600 uppercase tracking-wider font-semibold">Expected Completion</h3>
                    <p className="font-medium text-blue-900">{result.estimatedCompletion}</p>
                  </div>
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
