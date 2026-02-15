'use client';

import { useState } from 'react';
import MemberLayout from '@/components/MemberLayout';
import DocumentCard from '@/components/DocumentCard';
import { Search, FileText } from 'lucide-react';

// Dummy Data
const initialDocs = [
    {
        id: '1',
        title: 'Society By-Laws 2024',
        category: 'Legal',
        date: '10 Oct 2024',
        size: '2.4 MB',
        type: 'pdf',
    },
    {
        id: '2',
        title: 'AGM Meeting Minutes',
        category: 'MOM',
        date: '15 Sep 2024',
        size: '1.1 MB',
        type: 'pdf',
    },
    {
        id: '3',
        title: 'Diwali Event Expense Report',
        category: 'Finance',
        date: '05 Nov 2024',
        size: '540 KB',
        type: 'pdf',
    },
    {
        id: '4',
        title: 'Gym Usage Guidelines',
        category: 'General',
        date: '01 Jan 2024',
        size: '320 KB',
        type: 'pdf',
    },
];

export default function MemberDocumentsPage() {
    const [docs, setDocs] = useState(initialDocs);
    const [filter, setFilter] = useState('All');

    const filteredDocs = filter === 'All' ? docs : docs.filter(d => d.category === filter);
    const categories = ['All', 'Legal', 'MOM', 'Finance', 'General', 'Notices'];

    return (
        <MemberLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Society Documents
                    </h1>
                    <p className="text-muted-foreground mt-1">Access important files, guidelines, and reports.</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${filter === cat
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                {/* Document List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocs.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            {...doc}
                            isAdmin={false}
                            onDownload={() => alert('Download started...')}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredDocs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No documents found in this category.</p>
                    </div>
                )}

            </div>
        </MemberLayout>
    );
}
