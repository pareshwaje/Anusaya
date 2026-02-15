'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import IssueCard from '@/components/IssueCard';
import IssueChatModal from '@/components/IssueChatModal';
import { Issue } from '@/lib/db';
import { Search, Inbox } from 'lucide-react';

export default function AdminIssuesPage() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
    const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');

    const fetchIssues = async () => {
        try {
            const res = await fetch('/api/issues');
            if (res.ok) {
                const data = await res.json();
                setIssues(data);
                if (activeIssue) {
                    const updatedActive = data.find((i: Issue) => i.id === activeIssue.id);
                    if (updatedActive) setActiveIssue(updatedActive);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const handleStatusChange = async (id: string, newStatus: Issue['status']) => {
        // Optimistic
        setIssues(issues.map(i => i.id === id ? { ...i, status: newStatus } : i));

        await fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'status', issueId: id, status: newStatus }),
        });
        fetchIssues();
    };

    const handleAddComment = async (text: string) => {
        if (!activeIssue) return;
        await fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'comment',
                issueId: activeIssue.id,
                text,
                author: 'Admin'
            }),
        });
        fetchIssues();
    };

    const filteredIssues = filter === 'all'
        ? issues
        : issues.filter(i => i.status === filter || (filter === 'open' && i.status === 'in-progress'));

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Community Issues
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage reported issues and resident discussions.</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    {['all', 'open', 'resolved'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${filter === f
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Issue Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading issues...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredIssues.length === 0 ? (
                            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed">
                                <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No issues found.</p>
                            </div>
                        ) : (
                            filteredIssues.map(issue => (
                                <IssueCard
                                    key={issue.id}
                                    {...issue}
                                    currentUserFlat="Admin"
                                    isAdmin={true}
                                    onVote={() => { }} // Admin doesn't vote usually
                                    onChat={setActiveIssue}
                                    onStatusChange={handleStatusChange}
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Chat Modal */}
                {activeIssue && (
                    <IssueChatModal
                        issue={activeIssue}
                        onClose={() => setActiveIssue(null)}
                        currentUser="Admin"
                        onAddComment={handleAddComment}
                    />
                )}

            </div>
        </AdminLayout>
    );
}
