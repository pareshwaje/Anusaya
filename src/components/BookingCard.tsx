'use client';

import { Calendar, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';

interface BookingCardProps {
    id: string;
    amenityName: string;
    date: string;
    timeSlot: string;
    purpose: string;
    status: BookingStatus;
    member: string;
    flatNo: string;
    isAdmin?: boolean;
    onAction?: (id: string, action: 'approve' | 'reject') => void;
}

export default function BookingCard({
    id,
    amenityName,
    date,
    timeSlot,
    purpose,
    status,
    member,
    flatNo,
    isAdmin = false,
    onAction,
}: BookingCardProps) {

    const getStatusStyle = () => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-50 border-green-200 text-green-700';
            case 'rejected':
                return 'bg-red-50 border-red-200 text-red-700';
            default:
                return 'bg-yellow-50 border-yellow-200 text-yellow-700';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="font-bold text-gray-900">{amenityName}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {date} • {timeSlot}
                    </p>
                </div>
                <div className={cn("px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 capitalize", getStatusStyle())}>
                    {getStatusIcon()}
                    {status}
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700 italic">"{purpose}"</p>
                {isAdmin && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                        <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                            {member.charAt(0)}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-800">{member}</p>
                            <p className="text-[10px] text-gray-500">{flatNo}</p>
                        </div>
                    </div>
                )}
            </div>

            {isAdmin && status === 'pending' && onAction && (
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => onAction(id, 'approve')}
                        className="py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => onAction(id, 'reject')}
                        className="py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
}
