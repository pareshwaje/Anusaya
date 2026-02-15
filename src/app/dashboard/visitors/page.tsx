'use client';

import { useState, useEffect } from 'react';
import MemberLayout from '@/components/MemberLayout';
import VisitorCard, { VisitorStatus } from '@/components/VisitorCard';
import { UserPlus, Shield, Car, CheckCircle, AlertTriangle } from 'lucide-react';

export default function MemberVisitorsPage() {
    const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    // Data State
    const [visitorLogs, setVisitorLogs] = useState<any[]>([]);
    const [activePasses, setActivePasses] = useState<any[]>([]);

    // Form State
    const [passForm, setPassForm] = useState({
        name: '',
        vehicleNo: '',
        date: '',
    });

    const [generatedPass, setGeneratedPass] = useState<any>(null);

    // Initial Fetch
    const fetchData = async () => {
        setStatus('loading');
        try {
            // Fetch Visitors for this flat (Hardcoded A-102 for demo)
            const vRes = await fetch('/api/visitors?flatNo=102&wing=A');
            const vData = await vRes.json();

            // Map visitor data
            const mappedVisitors = vData.map((v: any) => ({
                id: v.id,
                name: v.name,
                type: v.type,
                guestCount: v.guestCount,
                accessCode: v.vehicleNo || 'N/A', // Show vehicle no as secondary info
                date: new Date(v.entryTime).toLocaleString(),
                status: 'checked-in', // Default to checked in for logs
                member: 'You',
                flatNo: 'A-102'
            }));
            setVisitorLogs(mappedVisitors);

            // Fetch Parking Passes
            const pRes = await fetch('/api/parking-passes/route?flatNo=102'); // Wait, route URL might be just /api/parking-passes ??
            // Checking implementation plan, it should be /api/parking-passes. 
            // Correcting fetch URL below.
            const pResCorrect = await fetch('/api/parking-passes?flatNo=102');
            const pData = await pResCorrect.json();

            // Filter only active ones for "Active Passes" view
            const active = pData.filter((p: any) => p.status === 'active' && new Date(p.expiresAt) > new Date());

            const mappedPasses = active.map((p: any) => ({
                id: p.id,
                name: p.visitorName,
                type: 'Parking',
                accessCode: p.accessCode || p.id, // ID is the code
                date: `Expires: ${new Date(p.expiresAt).toLocaleString()}`,
                status: 'expected',
                member: 'You',
                flatNo: 'A-102',
                vehicleNo: p.vehicleNo
            }));

            setActivePasses(mappedPasses);
            setStatus('idle');

        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreatePass = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const res = await fetch('/api/parking-passes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    visitorName: passForm.name,
                    vehicleNo: passForm.vehicleNo,
                    wing: 'A',
                    flatNo: '102',
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle Parking Full Error
                setErrorMsg(data.error || 'Failed to generate pass');
                return;
            }

            // Success
            const newPass = {
                id: data.id,
                name: data.visitorName,
                type: 'Parking',
                accessCode: data.id,
                date: `Expires: ${new Date(data.expiresAt).toLocaleString()}`,
                status: 'expected' as VisitorStatus,
                member: 'You',
                flatNo: 'A-102',
            };

            setGeneratedPass(newPass);
            setActivePasses([newPass as any, ...activePasses]);
            setPassForm({ name: '', vehicleNo: '', date: '' });
            alert('Parking Pass Generated Successfully!');

        } catch (error) {
            setErrorMsg('Network error. Please try again.');
        }
    };

    return (
        <MemberLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        My Visitors & Parking
                    </h1>
                    <p className="text-muted-foreground mt-1">Manage guest parking passes and view entry logs.</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'create'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Parking Pass
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Visitor Logs
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'create' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Form */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Car className="w-5 h-5 text-indigo-600" /> New Parking Pass
                            </h3>

                            <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl mb-6 text-xs text-indigo-800">
                                <strong>Note:</strong> Guest parking is limited to 2 vehicles globally for the society.
                                Pass is valid for 48 hours.
                            </div>

                            {errorMsg && (
                                <div className="bg-red-50 border border-red-100 p-3 rounded-xl mb-4 flex items-start gap-2 text-red-700 text-sm">
                                    <AlertTriangle className="w-4 h-4 mt-0.5" />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <form onSubmit={handleCreatePass} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={passForm.name}
                                        onChange={(e) => setPassForm({ ...passForm, name: e.target.value })}
                                        placeholder="e.g. John Doe"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                                    <input
                                        required
                                        type="text"
                                        value={passForm.vehicleNo}
                                        onChange={(e) => setPassForm({ ...passForm, vehicleNo: e.target.value })}
                                        placeholder="MH 12 AB 1234"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none uppercase"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all mt-4"
                                >
                                    Generate Parking Pass
                                </button>
                            </form>
                        </div>

                        {/* Active Passes */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-green-600" /> Active Passes
                            </h3>

                            <div className="space-y-4">
                                {generatedPass && (
                                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                                        <VisitorCard {...generatedPass} isAdmin={false} />
                                    </div>
                                )}

                                {activePasses.filter((p: any) => p.id !== generatedPass?.id).map((pass: any) => (
                                    <VisitorCard key={pass.id} {...pass} isAdmin={false} />
                                ))}

                                {activePasses.length === 0 && !generatedPass && (
                                    <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-3xl">
                                        <p className="text-gray-400 font-medium">No active parking passes.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visitorLogs.length === 0 ? (
                            <div className="col-span-full py-10 text-center text-gray-400">No visitor logs found.</div>
                        ) : (
                            visitorLogs.map((visitor: any) => (
                                <VisitorCard
                                    key={visitor.id}
                                    {...visitor}
                                    isAdmin={false}
                                />
                            ))
                        )}
                    </div>
                )}

            </div>
        </MemberLayout>
    );
}
