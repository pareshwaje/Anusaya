'use client';

import { useState } from 'react';
import { ScanLine, Search, CheckCircle, XCircle } from 'lucide-react';

export default function PassValidator() {
    const [passId, setPassId] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [result, setResult] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'checking' | 'error'>('idle');

    const handleValidate = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('checking');
        setResult(null);

        try {
            // Fetch all passes (in real app, use specific validation endpoint)
            const res = await fetch('/api/parking-passes');
            const passes = await res.json();

            // Find pass by ID (Case insensitive)
            const pass = passes.find((p: any) => p.id.toLowerCase() === passId.toLowerCase());

            if (!pass) {
                setResult({ valid: false, reason: 'Invalid Pass ID' });
                setStatus('idle');
                return;
            }

            // Check if expired
            if (new Date(pass.expiresAt) < new Date()) {
                setResult({ valid: false, reason: 'Pass Expired', data: pass });
                setStatus('idle');
                return;
            }

            // Check Vehicle Number
            const inputVehicle = vehicleNo.replace(/\s/g, '').toLowerCase();
            const passVehicle = pass.vehicleNo.replace(/\s/g, '').toLowerCase();

            if (inputVehicle !== passVehicle) {
                setResult({
                    valid: false,
                    reason: 'Vehicle Number Mismatch',
                    expected: pass.vehicleNo,
                    data: pass
                });
                setStatus('idle');
                return;
            }

            setResult({ valid: true, data: pass });
            setStatus('idle');

        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-700 mb-6">
                <form onSubmit={handleValidate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-1">Pass ID / Code</label>
                        <div className="relative">
                            <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                required
                                type="text"
                                placeholder="Enter Pass Code"
                                value={passId}
                                onChange={e => setPassId(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase font-mono tracking-widest"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-1">Vehicle Number</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                required
                                type="text"
                                placeholder="MH 12 AB 1234"
                                value={vehicleNo}
                                onChange={e => setVehicleNo(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'checking'}
                        className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all mt-2"
                    >
                        {status === 'checking' ? 'Verifying...' : 'Validate Entry'}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            {result && (
                <div className={`p-6 rounded-3xl border-2 animate-in slide-in-from-bottom-4 duration-300 ${result.valid ? 'bg-green-900/30 border-green-500/50' : 'bg-red-900/30 border-red-500/50'
                    }`}>
                    <div className="flex flex-col items-center text-center">
                        {result.valid ? (
                            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        ) : (
                            <XCircle className="w-16 h-16 text-red-500 mb-4" />
                        )}

                        <h2 className={`text-2xl font-bold mb-1 ${result.valid ? 'text-green-400' : 'text-red-400'}`}>
                            {result.valid ? 'Access Granted' : 'Access Denied'}
                        </h2>

                        {!result.valid && (
                            <p className="text-red-300 font-medium text-lg mb-2">{result.reason}</p>
                        )}

                        {result.reason === 'Vehicle Number Mismatch' && (
                            <p className="text-gray-400 text-sm bg-black/30 px-3 py-1 rounded-lg">
                                Pass registered for: <span className="text-white font-mono">{result.expected}</span>
                            </p>
                        )}

                        {result.data && (
                            <div className="mt-4 pt-4 border-t border-white/10 w-full text-left bg-black/20 p-4 rounded-xl">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400 text-sm">Guest</span>
                                    <span className="text-white font-bold">{result.data.visitorName}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400 text-sm">Destination</span>
                                    <span className="text-white font-bold">{result.data.wing}-{result.data.flatNo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Expires</span>
                                    <span className="text-indigo-300 text-xs mt-0.5">{new Date(result.data.expiresAt).toLocaleString()}</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}
