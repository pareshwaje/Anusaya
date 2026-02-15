'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, User, ShieldCheck } from 'lucide-react';
import { Issue, Comment } from '@/lib/db';
import { cn } from '@/lib/utils';

interface IssueChatModalProps {
    issue: Issue;
    onClose: () => void;
    currentUser: string; // "Wing-Flat" or "Admin"
    onAddComment: (text: string) => Promise<void>;
}

export default function IssueChatModal({ issue, onClose, currentUser, onAddComment }: IssueChatModalProps) {
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on load/new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [issue.comments]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setIsSending(true);
        await onAddComment(newMessage);
        setNewMessage('');
        setIsSending(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
            <div className="w-full md:max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">

                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="font-bold text-gray-800 line-clamp-1">{issue.title}</h2>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${issue.status === 'open' ? 'bg-red-50 text-red-600 border-red-100' :
                                issue.status === 'resolved' ? 'bg-green-50 text-green-600 border-green-100' :
                                    'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                            {issue.status}
                        </span>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Issue Details (Collapsible-ish) */}
                <div className="p-4 bg-gray-50/50 border-b text-sm text-gray-600">
                    <p>{issue.description}</p>
                    <div className="mt-2 text-xs text-gray-400 flex gap-2">
                        <span>Reported by <strong>{issue.author}</strong></span>
                        <span>•</span>
                        <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
                    {issue.comments.length === 0 && (
                        <div className="text-center py-10 text-gray-400 text-sm italic">
                            No comments yet. Start the discussion!
                        </div>
                    )}

                    {issue.comments.map((comment) => {
                        const isMe = comment.author === currentUser;
                        const isAdmin = comment.author === 'Admin';

                        return (
                            <div key={comment.id} className={cn("flex flex-col max-w-[85%]", isMe ? "ml-auto items-end" : "items-start")}>
                                <div className={cn(
                                    "px-4 py-2 rounded-2xl text-sm shadow-sm",
                                    isMe ? "bg-indigo-600 text-white rounded-br-none" :
                                        isAdmin ? "bg-purple-100 text-purple-900 border border-purple-200 rounded-bl-none" :
                                            "bg-white text-gray-700 border border-gray-100 rounded-bl-none"
                                )}>
                                    {comment.text}
                                </div>
                                <span className="text-[10px] text-gray-400 mt-1 px-1">
                                    {isAdmin && <ShieldCheck className="w-3 h-3 inline mr-1 text-purple-500" />}
                                    {isMe ? 'You' : comment.author} • {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-3 border-t bg-white">
                    <div className="flex items-center gap-2">
                        <input
                            disabled={isSending}
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <button
                            disabled={!newMessage.trim() || isSending}
                            type="submit"
                            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:scale-100 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
