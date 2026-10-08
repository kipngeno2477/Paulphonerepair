import { Upload, Smartphone, DollarSign, Send } from 'lucide-react';

const SellDevice = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Smartphone className="mx-auto text-[var(--light-blue)] mb-4" size={48} />
          <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">Sell Your Device</h1>
          <p className="text-gray-500">Turn your old phones and laptops into cash. Fill out the details below and we'll contact you with an offer.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Category</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] bg-white">
                  <option>Smartphone</option>
                  <option>Laptop</option>
                  <option>Tablet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand & Model</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="e.g. iPhone 12 Pro 128GB" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)] bg-white">
                <option>Like New (No scratches, works perfectly)</option>
                <option>Good (Minor scratches, works perfectly)</option>
                <option>Fair (Noticeable wear, works fine)</option>
                <option>Broken/Faulty (Needs repair)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price (KES)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input type="number" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="e.g. 25000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]" placeholder="07XX XXX XXX" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-500">Upload front, back, and sides</p>
                <p className="text-xs text-gray-400 mt-1">Up to 4 images</p>
              </div>
            </div>

            <button type="button" className="w-full bg-[var(--navy)] hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-lg flex justify-center items-center gap-2">
              <Send size={20} /> Submit for Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SellDevice;
