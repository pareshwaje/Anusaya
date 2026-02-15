'use client';

import SuperAdminLayout from '@/components/SuperAdminLayout';
import { UserMinus, Trash2, Search } from 'lucide-react';

export default function RemoveAdminPage() {
    const admins = [
        { id: 1, name: 'Alice Smith', email: 'alice@society.com', role: 'Society Admin' },
        { id: 2, name: 'Bob Jones', email: 'bob@society.com', role: 'Manager' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@society.com', role: 'Society Admin' },
    ];

    return (
        <SuperAdminLayout>
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-2xl text-red-600">
                            <UserMinus className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Remove Admin</h1>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search admins..." className="pl-10 pr-4 py-2 bg-white/60 border border-white/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                                <th className="text-right p-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {admins.map((admin) => (
                                <tr key={admin.id} className="hover:bg-red-50/30 transition-colors group">
                                    <td className="p-4 font-medium text-gray-800">{admin.name}</td>
                                    <td className="p-4 text-gray-600">{admin.email}</td>
                                    <td className="p-4 text-gray-600"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs font-bold">{admin.role}</span></td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 bg-white text-red-500 shadow-sm rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
