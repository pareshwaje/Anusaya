'use client';

import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Calculator, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function CalculatorPage() {
    const [sqft, setSqft] = useState(1000);
    const [rate, setRate] = useState(2.5);

    const total = sqft * rate;

    return (
        <SuperAdminLayout>
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Maintenance Calculator</h1>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Flat Area (Sq. Ft)</label>
                            <input
                                type="number"
                                value={sqft}
                                onChange={(e) => setSqft(Number(e.target.value))}
                                className="w-full p-4 text-lg bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                            />
                            <input
                                type="range"
                                min="500" max="5000"
                                value={sqft}
                                onChange={(e) => setSqft(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Rate per Sq. Ft (₹)</label>
                            <input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full p-4 text-lg bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                            />
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center p-6 bg-green-50 rounded-2xl border border-green-100">
                                <span className="text-gray-600 font-medium">Estimated Monthly Maintenance</span>
                                <span className="text-3xl font-bold text-green-700">₹{total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
