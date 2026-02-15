'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import VisitorCard, { VisitorStatus } from '@/components/VisitorCard';
import { Search, Filter, ShieldCheck, RefreshCw, Calendar, Building, MapPin } from 'lucide-react';
import { Visitor } from '@/lib/db'; // Import type, but need to redefine here if frontend can't see backend types easily, or use 'any' for now to speed up.
// Actually, defining interface locally for state to avoid import issues if tsconfig is strict about server/client imports.
interface VisitorData {
    id: string;
    name: string;
    type: string;
    guestCount?: number;
    vehicleNo?: string;
    wing: string;
    flatNo: string;
    date: string;
    entryTime: string;
    status: VisitorStatus; // We might need to map this if backend doesn't return 'status'
    member: string;
    accessCode: string;
}


export default function AdminVisitorsPage() {
    const [visitors, setVisitors] = useState<VisitorData[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [wingFilter, setWingFilter] = useState('');
    const [flatFilter, setFlatFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const fetchVisitors = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (wingFilter) params.append('wing', wingFilter);
            if (flatFilter) params.append('flatNo', flatFilter);
            if (dateFilter) params.append('date', dateFilter);

            const res = await fetch(`/api/visitors?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                // Map backend data to frontend VisitorCard expected format
                const mappedData = data.map((v: any) => ({
                    ...v,
                    date: new Date(v.entryTime).toLocaleString(),
                    status: 'active', // All logs are just 'logs' now, treat as info
                    member: `Wing ${v.wing}`, // Placeholder
                    flatNo: `${v.wing}-${v.flatNo}`,
                    accessCode: v.vehicleNo || 'N/A' // Show Vehicle No instead of code
                }));
                setVisitors(mappedData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVisitors();
    }, [wingFilter, flatFilter, dateFilter]);

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Visitor Log
                        </h1>
                        <p className="text-muted-foreground mt-1">Real-time entry logs of guests and service personnel.</p>
                    </div>
                    <button
                        onClick={fetchVisitors}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 shadow-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={wingFilter}
                            onChange={(e) => setWingFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        >
                            <option value="">All Wings</option>
                            {['A', 'B', 'C', 'D'].map(w => <option key={w} value={w}>Wing {w}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Flat Number (e.g. 101)"
                            value={flatFilter}
                            onChange={(e) => setFlatFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>

                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>
                </div>

                {/* Visitor List */}
                {loading ? (
                    <div className="py-20 text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading logs...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visitors.map((visitor) => (
                            <VisitorCard
                                key={visitor.id}
                                {...visitor}
                                isAdmin={true}
                            // onAction={handleAction} // Approvals removed
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && visitors.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No visitor logs found matching filters.</p>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
}
