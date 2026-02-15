'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import NoticeCard, { NoticeType } from '@/components/NoticeCard';
import { Plus, Search, Filter, Megaphone } from 'lucide-react';

// Dummy data
const initialNotices = [
    {
        id: '1',
        title: 'Water Cut on Saturday',
        date: '15 Oct 2024',
        content: 'Due to tank cleaning, water supply will be unavailable from 10 AM to 4 PM. Please store water accordingly.',
        type: 'urgent' as NoticeType,
        author: 'Secretary',
    },
    {
        id: '2',
        title: 'Diwali Celebration',
        date: '20 Oct 2024',
        content: 'Join us for the Grand Diwali Party at the Clubhouse! Snacks and games for kids starting at 6 PM.',
        type: 'event' as NoticeType,
        author: 'Cultural Comm',
    },
    {
        id: '3',
        title: 'Lift Maintenance',
        date: '12 Oct 2024',
        content: 'Lift A will be under maintenance on Monday. Please use Lift B.',
        type: 'info' as NoticeType,
        author: 'Admin',
    },
];

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState(initialNotices);
    const [showModal, setShowModal] = useState(false);

    // Form state
    const [newNotice, setNewNotice] = useState({
        title: '',
        content: '',
        type: 'info' as NoticeType,
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this notice?')) {
            setNotices(notices.filter(n => n.id !== id));
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const notice = {
            id: Date.now().toString(),
            title: newNotice.title,
            content: newNotice.content,
            type: newNotice.type,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            author: 'Admin',
        };
        setNotices([notice, ...notices]);
        setShowModal(false);
        setNewNotice({ title: '', content: '', type: 'info' });
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Notice Board
                        </h1>
                        <p className="text-muted-foreground mt-1">Broadcast announcements to all society members.</p>
                    </div>

                    {/* Desktop Create Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                    >
                        <Plus className="w-5 h-5" /> Create Notice
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex-1 min-w-[200px] relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search notices..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                    </div>
                    <button className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 hover:bg-white flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>

                {/* Notice List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notices.map((notice) => (
                        <NoticeCard
                            key={notice.id}
                            {...notice}
                            isAdmin={true}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {notices.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Megaphone className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">No active notices</h3>
                        <p className="text-gray-500 mt-2 max-w-xs">Create a new notice to inform members about events or updates.</p>
                    </div>
                )}

                {/* Mobile Floating Action Button (FAB) */}
                <button
                    onClick={() => setShowModal(true)}
                    className="md:hidden fixed bottom-24 right-6 h-14 w-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/30 flex items-center justify-center z-40 active:scale-90 transition-transform"
                >
                    <Plus className="w-8 h-8" />
                </button>

                {/* Create Notice Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
                        <div className="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-full md:zoom-in-95 duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">New Announcement</h2>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <span className="text-2xl leading-none">&times;</span>
                                </button>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        required
                                        type="text"
                                        value={newNotice.title}
                                        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                                        placeholder="e.g., Water Tank Cleaning"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['info', 'urgent', 'event'].map((t) => (
                                            <button
                                                type="button"
                                                key={t}
                                                onClick={() => setNewNotice({ ...newNotice, type: t as NoticeType })}
                                                className={`py-2 px-1 rounded-lg capitalize text-sm font-medium border transition-all ${newNotice.type === t
                                                        ? (t === 'urgent' ? 'bg-red-50 border-red-500 text-red-700' : t === 'event' ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-blue-50 border-blue-500 text-blue-700')
                                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={newNotice.content}
                                        onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                                        placeholder="Enter the details..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all"
                                    >
                                        Post Notice
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
}
