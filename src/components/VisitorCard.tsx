'use client';

import { User, Clock, CheckCircle, XCircle, Share2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export type VisitorStatus = 'expected' | 'checked-in' | 'checked-out';

interface VisitorCardProps {
    id: string;
    name: string;
    type: string; // Guest, Delivery, Cab, etc.
    guestCount?: number;
    accessCode: string;
    date: string;
    status: VisitorStatus;
    member: string;
    flatNo: string;
    isAdmin?: boolean;
    onAction?: (id: string, action: 'check-in' | 'check-out') => void;
}

export default function VisitorCard({
    id,
    name,
    type,
    guestCount,
    accessCode,
    date,
    status,
    member,
    flatNo,
    isAdmin = false,
    onAction,
}: VisitorCardProps) {
    // Simple toast mock since we haven't implemented full toast system
    const copyCode = () => {
        navigator.clipboard.writeText(accessCode);
        alert(`Access Code ${accessCode} copied!`);
    };

    const sharePass = () => {
        const text = `Hi ${name}, your entry pass for Flat ${flatNo} is ${accessCode}. Valid for ${date}.`;
        if (navigator.share) {
            navigator.share({ title: 'Visitor Pass', text: text });
        } else {
            navigator.clipboard.writeText(text);
            alert('Pass details copied to clipboard!');
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'checked-in': return 'bg-green-100 text-green-700 border-green-200';
            case 'checked-out': return 'bg-gray-100 text-gray-500 border-gray-200';
            default: return 'bg-blue-50 text-blue-600 border-blue-100';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-full z-0 opacity-50" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-600 border border-gray-200">
                                {type}
                            </span>
                            {/* Status removed as per request. Showing just time logic implicitly via 'date' */}
                            {guestCount && guestCount > 1 && (
                                <span className="px-2 py-0.5 rounded bg-blue-50 text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-100">
                                    {guestCount} Guests
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" /> {date}
                        </p>
                    </div>

                    <div className="text-center bg-gray-50 p-2 rounded-xl border border-dashed border-gray-300">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">CODE</p>
                        <p className="text-xl font-mono font-bold text-gray-800 tracking-wider select-all">{accessCode}</p>
                    </div>
                </div>

                {!isAdmin && status === 'expected' && (
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={copyCode}
                            className="flex-1 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                        >
                            <Copy className="w-3 h-3" /> Copy
                        </button>
                        <button
                            onClick={sharePass}
                            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-3 h-3" /> Share
                        </button>
                    </div>
                )}

                {isAdmin && (
                    <div className="flex items-center gap-2 mb-4 pt-4 border-t border-gray-100">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                            {member.charAt(0)}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-800 leading-tight">{member}</p>
                            <p className="text-[10px] text-gray-500 leading-tight">Flat {flatNo}</p>
                        </div>
                    </div>
                )}

                {isAdmin && onAction && (
                    <div className="flex gap-2">
                        {status === 'expected' && (
                            <button
                                onClick={() => onAction(id, 'check-in')}
                                className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 shadow-md shadow-green-500/20 active:scale-95 transition-all"
                            >
                                In Update
                            </button>
                        )}
                        {status === 'checked-in' && (
                            <button
                                onClick={() => onAction(id, 'check-out')}
                                className="flex-1 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 active:scale-95 transition-all"
                            >
                                Register Exit
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
