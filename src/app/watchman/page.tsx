'use client';

import { useState } from 'react';
import PassValidator from '@/components/PassValidator';
import VisitorEntryForm from '@/components/VisitorEntryForm';
import { ScanLine, UserPlus, LogOut, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WatchmanDashboard() {
    const [activeTab, setActiveTab] = useState<'entry' | 'validate'>('entry');
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">

            {/* Top Bar */}
            <div className="bg-gray-800 p-4 sticky top-0 z-10 border-b border-gray-700 shadow-lg">
                <div className="flex justify-between items-center max-w-xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-lg leading-tight">Security</h1>
                            <p className="text-gray-400 text-xs">Anusaya Society</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-red-900/40 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 pb-24 overflow-y-auto">
                <div className="max-w-xl mx-auto">
                    {activeTab === 'entry' ? (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <VisitorEntryForm isWatchman={true} />
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <PassValidator />
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-2 pb-safe z-20">
                <div className="max-w-xl mx-auto grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setActiveTab('entry')}
                        className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${activeTab === 'entry'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                : 'text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <UserPlus className="w-6 h-6 mb-1" />
                        <span className="text-xs font-bold">Add Visitor</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('validate')}
                        className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${activeTab === 'validate'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                : 'text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <ScanLine className="w-6 h-6 mb-1" />
                        <span className="text-xs font-bold">Validate Pass</span>
                    </button>
                </div>
            </div>

        </div>
    );
}
