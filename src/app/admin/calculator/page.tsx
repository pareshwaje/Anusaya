'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Calculator, ArrowRight, IndianRupee, Home, Percent } from 'lucide-react';

export default function CalculatorPage() {
  const [sqft, setSqft] = useState('');
  const [rate, setRate] = useState('2.5');
  const [total, setTotal] = useState<number | null>(null);

  const calculate = () => {
    const area = parseFloat(sqft);
    const r = parseFloat(rate);
    if (!isNaN(area) && !isNaN(r)) {
      setTotal(area * r);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl text-white shadow-lg shadow-green-500/30">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Maintenance Calculator</h1>
            <p className="text-gray-500">Estimate monthly maintenance charges based on flat area.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Flat Area (sq. ft.)</label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 text-lg font-medium shadow-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Maintenance Rate (per sq. ft.)</label>
              <div className="relative">
                <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 text-lg font-medium shadow-sm transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 ml-1">* Default rate set by society rules.</p>
            </div>

            <button
              onClick={calculate}
              className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold text-lg shadow-xl shadow-gray-500/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Calculate <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Calculator className="w-64 h-64 transform rotate-12" />
            </div>

            <div className="relative z-10 space-y-2">
              <h2 className="text-indigo-200 font-medium text-lg">Estimated Monthly Maintenance</h2>
              <div className="flex items-center justify-center gap-1">
                <IndianRupee className="w-8 h-8 opacity-80" />
                <span className="text-6xl font-bold tracking-tight">
                  {total ? total.toLocaleString() : '0'}
                </span>
              </div>
              {total && (
                <div className="pt-6 border-t border-white/10 mt-6 w-full">
                  <div className="flex justify-between text-sm opacity-80 mb-2">
                    <span>Annual Estimate</span>
                    <span>₹ {(total * 12).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-indigo-300 mt-4 bg-black/20 px-3 py-2 rounded-lg">
                    *This is an estimate. Actual charges may vary based on additional penalties or funds.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
