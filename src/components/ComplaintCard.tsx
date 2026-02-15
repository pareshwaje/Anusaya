'use client';

import { Calendar, User, Tag, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ComplaintStatus = 'open' | 'in-progress' | 'resolved';

interface ComplaintCardProps {
    id: string;
    category: string;
    description: string;
    status: ComplaintStatus;
    date: string;
    member: string;
    flatNo: string;
    onStatusChange?: (id: string, newStatus: ComplaintStatus) => void;
    isAdmin?: boolean;
}

export default function ComplaintCard({
    id,
    category,
    description,
    status,
    date,
    member,
    flatNo,
    onStatusChange,
    isAdmin = false,
}: ComplaintCardProps) {
    const getStatusColor = () => {
        switch (status) {
            case 'open':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'in-progress':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'resolved':
                return 'bg-green-100 text-green-700 border-green-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'open':
                return <AlertCircle className="w-4 h-4" />;
            case 'in-progress':
                return <Clock className="w-4 h-4" />;
            case 'resolved':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-white rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md relative group">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {date}
                    </span>
                </div>
                <div className={cn("px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 capitalize", getStatusColor())}>
                    {getStatusIcon()}
                    {status.replace('-', ' ')}
                </div>
            </div>

            <p className="text-sm text-gray-800 font-medium mb-4 leading-relaxed">
                {description}
            </p>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {member.charAt(0)}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-700">{member}</p>
                        <p className="text-[10px] text-gray-500">{flatNo}</p>
                    </div>
                </div>

                {isAdmin && onStatusChange && status !== 'resolved' && (
                    <div className="flex gap-2">
                        {status === 'open' && (
                            <button
                                onClick={() => onStatusChange(id, 'in-progress')}
                                className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                Start
                            </button>
                        )}
                        <button
                            onClick={() => onStatusChange(id, 'resolved')}
                            className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-lg hover:bg-green-100 transition-colors"
                        >
                            Resolve
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
