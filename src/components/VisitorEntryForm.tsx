'use client';

import { useState } from 'react';
import { User, Building, MapPin, Truck, CheckCircle } from 'lucide-react';

export default function VisitorEntryForm({ onSuccess, isWatchman = false }: { onSuccess?: () => void, isWatchman?: boolean }) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        type: 'Guest',
        guestCount: 1,
        wing: 'A',
        flatNo: '',
        vehicleNo: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/visitors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    type: formData.type,
                    guestCount: formData.guestCount,
                    wing: formData.wing,
                    flatNo: formData.flatNo,
                    vehicleNo: formData.vehicleNo,
                    date: new Date().toISOString(),
                }),
            });

            if (res.ok) {
                setStatus('success');
                if (onSuccess) onSuccess();
            } else {
                alert('Something went wrong. Please try again.');
                setStatus('idle');
            }
        } catch (error) {
            console.error(error);
            alert('Network error. Please try again.');
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center animate-in zoom-in duration-300 border border-green-100">
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Entry Logged!</h2>
                <p className="text-gray-500 mb-6">
                    Visitor has been registered for <strong>{formData.wing}-{formData.flatNo}</strong>.
                </p>
                <button
                    onClick={() => {
                        setStatus('idle');
                        setFormData({ ...formData, name: '', vehicleNo: '', flatNo: '' });
                    }}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                    Add Another Visitor
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
            {isWatchman && (
                <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">New Visitor Entry</h3>
                    <p className="text-sm text-gray-500">Fill details to log entry</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            required
                            type="text"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Flat Details */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Wing</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                value={formData.wing}
                                onChange={e => setFormData({ ...formData, wing: e.target.value })}
                                className="w-full pl-9 pr-2 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium appearance-none"
                            >
                                {['A', 'B', 'C', 'D'].map(w => <option key={w}>{w}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Flat No.</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                required
                                type="number"
                                placeholder="101"
                                value={formData.flatNo}
                                onChange={e => setFormData({ ...formData, flatNo: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Type & Guests */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Visitor Type</label>
                        <div className="relative">
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium appearance-none"
                            >
                                {['Guest', 'Delivery', 'Service'].map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">No. of Guests</label>
                        <input
                            type="number"
                            min="1"
                            value={formData.guestCount}
                            onChange={e => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Vehicle (Optional) */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Vehicle No. <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                        <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="MH 12 AB 1234"
                            value={formData.vehicleNo}
                            onChange={e => setFormData({ ...formData, vehicleNo: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium uppercase"
                        />
                    </div>
                </div>

                <button
                    disabled={status === 'submitting'}
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100 mt-4"
                >
                    {status === 'submitting' ? 'Registering...' : 'Log Entry'}
                </button>

            </form>
        </div>
    );
}
