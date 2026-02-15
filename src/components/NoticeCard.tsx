'use client';

import { Calendar, AlertCircle, Info, PartyPopper, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NoticeType = 'urgent' | 'info' | 'event';

interface NoticeCardProps {
    id: string;
    title: string;
    date: string;
    content: string;
    type: NoticeType;
    author: string;
    onDelete?: (id: string) => void;
    isAdmin?: boolean;
}

export default function NoticeCard({
    id,
    title,
    date,
    content,
    type,
    author,
    onDelete,
    isAdmin = false,
}: NoticeCardProps) {
    const getIcon = () => {
        switch (type) {
            case 'urgent':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            case 'event':
                return <PartyPopper className="w-5 h-5 text-purple-600" />;
            default:
                return <Info className="w-5 h-5 text-blue-600" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'urgent':
                return 'bg-red-50 border-red-100 shadow-red-100/50';
            case 'event':
                return 'bg-purple-50 border-purple-100 shadow-purple-100/50';
            default:
                return 'bg-blue-50 border-blue-100 shadow-blue-100/50';
        }
    };

    return (
        <div className={cn(
            "rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md relative group",
            getStyles()
        )}>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                        {getIcon()}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 leading-tight">{title}</h3>
                        <p className="text-xs text-gray-500 font-medium mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {date}
                        </p>
                    </div>
                </div>
                {isAdmin && onDelete && (
                    <button
                        onClick={() => onDelete(id)}
                        className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {content}
            </p>

            <div className="flex justify-between items-center pt-3 border-t border-black/5">
                <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                    type === 'urgent' ? "bg-red-200 text-red-700" :
                        type === 'event' ? "bg-purple-200 text-purple-700" :
                            "bg-blue-200 text-blue-700"
                )}>
                    {type}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                    Posted by {author}
                </span>
            </div>
        </div>
    );
}
