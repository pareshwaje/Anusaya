'use client';

import { useState, useEffect } from 'react';
import MemberLayout from '@/components/MemberLayout';
import IssueCard from '@/components/IssueCard';
import IssueChatModal from '@/components/IssueChatModal';
import { Issue } from '@/lib/db';
import { Plus, MessageSquare, Search } from 'lucide-react';

export default function CommunityForumPage() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // User Context (Mock)
    const currentUserWing = 'A';
    const currentUserFlat = '102';
    const currentUserFullFlat = `${currentUserWing}-${currentUserFlat}`;
    const currentUserName = 'Rahul Deshmukh';

    // Form State
    const [newIssue, setNewIssue] = useState({
        title: '',
        category: 'General',
        description: ''
    });

    const fetchIssues = async () => {
        try {
            const res = await fetch('/api/issues');
            if (res.ok) {
                const data = await res.json();
                setIssues(data);
                // Update active issue if open
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

    const handleVote = async (id: string, flatNo: string) => {
        // Optimistic UI Update
        const updatedIssues = issues.map(issue => {
            if (issue.id === id) {
                const hasVoted = issue.upvotes.includes(flatNo);
                const newUpvotes = hasVoted
                    ? issue.upvotes.filter(v => v !== flatNo)
                    : [...issue.upvotes, flatNo];
                return { ...issue, upvotes: newUpvotes };
            }
            return issue;
        });
        setIssues(updatedIssues);

        // API Call
        await fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'vote', issueId: id, flatNo }),
        });
        fetchIssues(); // Sync
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...newIssue,
                author: currentUserName,
                flatNo: currentUserFullFlat
            }),
        });
        setNewIssue({ title: '', category: 'General', description: '' });
        setShowCreateModal(false);
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
                author: currentUserFullFlat // Or Name
            }),
        });
        fetchIssues();
    };

    return (
        <MemberLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Community Forum
                        </h1>
                        <p className="text-muted-foreground mt-1">Raise issues, discuss solutions, and track progress.</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                    >
                        <Plus className="w-5 h-5" /> New Issue
                    </button>
                </div>

                {/* Filter/Search Bar Placeholder */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search discussions..."
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                {/* Issue Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading forum...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {issues.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">No discussions yet.</p>
                                <button onClick={() => setShowCreateModal(true)} className="text-indigo-600 font-bold mt-2 text-sm hover:underline">Start a discussion</button>
                            </div>
                        ) : (
                            issues.map(issue => (
                                <IssueCard
                                    key={issue.id}
                                    {...issue}
                                    currentUserFlat={currentUserFullFlat} // Pass identifying info for logic
                                    onVote={handleVote}
                                    onChat={setActiveIssue}
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Mobile FAB */}
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="md:hidden fixed bottom-24 right-6 h-14 w-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/30 flex items-center justify-center z-40 active:scale-90 transition-transform"
                >
                    <Plus className="w-8 h-8" />
                </button>

                {/* Create Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Raise New Issue</h2>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                                    <input
                                        required
                                        type="text"
                                        value={newIssue.title}
                                        onChange={e => setNewIssue({ ...newIssue, title: e.target.value })}
                                        placeholder="Brief summary of the issue"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                    <select
                                        value={newIssue.category}
                                        onChange={e => setNewIssue({ ...newIssue, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                                    >
                                        {['General', 'Plumbing', 'Electrical', 'Security', 'Cleanliness', 'Parking'].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={newIssue.description}
                                        onChange={e => setNewIssue({ ...newIssue, description: e.target.value })}
                                        placeholder="Describe the issue in detail..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                                    >
                                        Post Issue
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Chat Modal */}
                {activeIssue && (
                    <IssueChatModal
                        issue={activeIssue}
                        onClose={() => setActiveIssue(null)}
                        currentUser={currentUserFullFlat}
                        onAddComment={handleAddComment}
                    />
                )}

            </div>
        </MemberLayout>
    );
}
