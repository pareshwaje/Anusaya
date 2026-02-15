'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DocumentCard from '@/components/DocumentCard';
import { UploadCloud, Search, FileText } from 'lucide-react';

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
];

export default function AdminDocumentsPage() {
    const [docs, setDocs] = useState(initialDocs);
    const [showUpload, setShowUpload] = useState(false);

    // Upload Form
    const [newDoc, setNewDoc] = useState({ title: '', category: 'General' });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        const doc = {
            id: Date.now().toString(),
            title: newDoc.title,
            category: newDoc.category,
            date: 'Just now',
            size: '1.5 MB',
            type: 'pdf',
        };
        setDocs([doc, ...docs]);
        setShowUpload(false);
        setNewDoc({ title: '', category: 'General' });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this document?')) {
            setDocs(docs.filter(d => d.id !== id));
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Repository
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage society documents and files.</p>
                    </div>
                    <button
                        onClick={() => setShowUpload(!showUpload)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                    >
                        <UploadCloud className="w-5 h-5" />
                        <span className="hidden md:inline">Upload New</span>
                        <span className="md:hidden">Upload</span>
                    </button>
                </div>

                {/* Upload Area (Collapsible) */}
                {showUpload && (
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 animate-in slide-in-from-top-4 duration-300">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Upload Document</h3>
                        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                                <input
                                    required
                                    type="text"
                                    value={newDoc.title}
                                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                    placeholder="e.g. Annual Report"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={newDoc.category}
                                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
                                >
                                    <option>General</option>
                                    <option>Legal</option>
                                    <option>MOM</option>
                                    <option>Finance</option>
                                    <option>Notices</option>
                                </select>
                            </div>
                            <div className="relative group cursor-pointer">
                                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-medium text-center group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors">
                                    Choose File (PDF/IMG)
                                </div>
                            </div>
                            <div className="md:col-span-3 pt-2 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowUpload(false)}
                                    className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all"
                                >
                                    Upload File
                                </button>
                            </div>
                        </form>
                    </div>
                )}

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
                    {docs.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            {...doc}
                            isAdmin={true}
                            onDelete={handleDelete}
                            onDownload={() => alert('Download started...')}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {docs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No documents uploaded yet.</p>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
}
