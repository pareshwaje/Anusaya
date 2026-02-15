'use client';

import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Users, Trash2, Search, Filter } from 'lucide-react';

export default function RemoveMemberPage() {
    const members = [
        { id: 1, name: 'Rahul Sharma', flat: 'A-101', type: 'Owner' },
        { id: 2, name: 'Priya Patel', flat: 'B-203', type: 'Tenant' },
        { id: 3, name: 'Amit Singh', flat: 'C-004', type: 'Owner' },
        { id: 4, name: 'Sneha Gupta', flat: 'A-102', type: 'Owner' },
    ];

    return (
        <SuperAdminLayout>
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Manage Members</h1>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white/60 border border-white/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" />
                        </div>
                        <button className="p-2 bg-white/60 border border-white/40 rounded-xl hover:bg-white"><Filter className="w-4 h-4 text-gray-500" /></button>
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Member Name</th>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Flat No</th>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                <th className="text-right p-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-orange-50/30 transition-colors group">
                                    <td className="p-4 font-medium text-gray-800 flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold">{member.name.charAt(0)}</div>
                                        {member.name}
                                    </td>
                                    <td className="p-4 text-gray-600 font-mono">{member.flat}</td>
                                    <td className="p-4 text-gray-600">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${member.type === 'Owner' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {member.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 bg-white text-gray-400 shadow-sm rounded-lg hover:bg-red-500 hover:text-white transition-colors">
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
