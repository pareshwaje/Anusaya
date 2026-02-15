'use client';

import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Settings, Save, IndianRupee } from 'lucide-react';

export default function MaintenancePage() {
    return (
        <SuperAdminLayout>
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                        <Settings className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Maintenance Settings</h1>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
                    <form className="space-y-8">

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-gray-400" /> Default Rates
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Per Sq. Ft Rate</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</div>
                                        <input type="number" defaultValue="2.5" className="w-full pl-8 pr-3 py-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Fixed Monthly Charge</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</div>
                                        <input type="number" defaultValue="500" className="w-full pl-8 pr-3 py-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-700">Penalties & Late Fees</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Late Payment Interest (%)</label>
                                    <input type="number" defaultValue="12" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Grace Period (Days)</label>
                                    <input type="number" defaultValue="10" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:outline-none" />
                                </div>
                            </div>
                        </div>

                        <button type="button" className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                            <Save className="w-5 h-5" /> Update Settings
                        </button>
                    </form>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
