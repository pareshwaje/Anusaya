'use client';

import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Users, Save, Home } from 'lucide-react';

export default function AddMemberPage() {
    return (
        <SuperAdminLayout>
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                        <Users className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Add New Society Member</h1>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
                    <form className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Aadhar Number</label>
                                <input type="text" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 pt-4">Residence Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Wing / Block</label>
                                <input type="text" placeholder="e.g. A" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Flat Number</label>
                                <input type="text" placeholder="e.g. 101" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Ownership Type</label>
                                <select className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none">
                                    <option>Owner</option>
                                    <option>Tenant</option>
                                </select>
                            </div>
                        </div>

                        <button type="button" className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-4">
                            <Save className="w-5 h-5" /> Register Member
                        </button>
                    </form>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
