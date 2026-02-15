'use client';

import { Calendar, Tag, MessageCircle, ThumbsUp, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Issue } from '@/lib/db'; // We can share the type

export interface IssueCardProps extends Issue {
    currentUserFlat: string;
    onVote: (id: string, flatNo: string) => void;
    onChat: (issue: Issue) => void;
    isAdmin?: boolean;
    onStatusChange?: (id: string, newStatus: Issue['status']) => void;
}

export default function IssueCard({
    id,
    category,
    title,
    description,
    status,
    createdAt,
    author,
    flatNo,
    upvotes,
    comments,
    currentUserFlat,
    onVote,
    onChat,
    isAdmin = false,
    onStatusChange,
}: IssueCardProps) {

    const isUpvoted = upvotes.includes(currentUserFlat);

    const getStatusColor = () => {
        switch (status) {
            case 'open': return 'bg-red-50 text-red-700 border-red-100';
            case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'resolved': return 'bg-green-50 text-green-700 border-green-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all group">

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-bold text-gray-600 flex items-center gap-1 uppercase tracking-wide">
                        <Tag className="w-3 h-3" /> {category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(createdAt).toLocaleDateString()}
                    </span>
                </div>
                <div className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 uppercase tracking-wide", getStatusColor())}>
                    {status === 'resolved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {status.replace('-', ' ')}
                </div>
            </div>

            {/* Content */}
            <h3 className="font-bold text-gray-900 mb-1 leading-snug">{title}</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                {description}
            </p>

            {/* Footer / Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">

                {/* Author Info */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-100">
                        {flatNo.split('-')[1] || flatNo.charAt(0)}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-700">{author}</p>
                        <p className="text-[10px] text-gray-400">{flatNo}</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onVote(id, currentUserFlat)}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95",
                            isUpvoted
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {upvotes.length > 0 ? upvotes.length : 'Vote'}
                    </button>

                    <button
                        onClick={() => onChat({ id, category, title, description, status, createdAt, author, flatNo, upvotes, comments } as Issue)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold hover:bg-orange-100 transition-all active:scale-95"
                    >
                        <MessageCircle className="w-3.5 h-3.5" />
                        {comments.length > 0 ? comments.length : 'Chat'}
                    </button>

                    {isAdmin && status !== 'resolved' && (
                        <button
                            onClick={() => onStatusChange && onStatusChange(id, 'resolved')}
                            className="bg-green-50 text-green-700 p-1.5 rounded-lg hover:bg-green-100 ml-1"
                            title="Mark as Resolved"
                        >
                            <CheckCircle className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Context: "X people facing this" */}
            {upvotes.length > 0 && (
                <div className="mt-3 text-[10px] text-gray-400 font-medium">
                    {upvotes.length} resident{upvotes.length !== 1 && 's'} facing this issue.
                </div>
            )}
        </div>
    );
}
