'use client';

import SuperAdminLayout from '@/components/SuperAdminLayout';
import { UserPlus, Save } from 'lucide-react';

export default function AddAdminPage() {
    return (
        <SuperAdminLayout>
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                        <UserPlus className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Add New Admin</h1>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" placeholder="e.g. John Doe" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" placeholder="+91 98765 43210" className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Role</label>
                                <select className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:outline-none">
                                    <option>Society Admin</option>
                                    <option>Manager</option>
                                </select>
                            </div>
                        </div>

                        <button type="button" className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                            <Save className="w-5 h-5" /> Create Admin Account
                        </button>
                    </form>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
