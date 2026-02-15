'use client';

import MemberLayout from '@/components/MemberLayout';
import NoticeCard, { NoticeType } from '@/components/NoticeCard';
import { Megaphone, Search, Filter } from 'lucide-react';

// Dummy data (Same as admin for now, would fetch from API in real app)
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

export default function MemberNoticesPage() {
    return (
        <MemberLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Community Notices
                    </h1>
                    <p className="text-muted-foreground mt-1">Stay updated with the latest announcements.</p>
                </div>

                {/* Filters & Search - Reusable Component Candidate */}
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
                    {initialNotices.map((notice) => (
                        <NoticeCard
                            key={notice.id}
                            {...notice}
                            isAdmin={false}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {initialNotices.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Megaphone className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">No notices yet</h3>
                        <p className="text-gray-500 mt-2 max-w-xs">You're all caught up! Check back later for updates.</p>
                    </div>
                )}
            </div>
        </MemberLayout>
    );
}
