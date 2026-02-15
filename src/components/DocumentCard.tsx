'use client';

import { FileText, Download, Trash2, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
    id: string;
    title: string;
    category: string;
    date: string;
    size: string;
    type: string; // 'pdf', 'image', etc.
    isAdmin?: boolean;
    onDelete?: (id: string) => void;
    onDownload?: (id: string) => void;
}

export default function DocumentCard({
    id,
    title,
    category,
    date,
    size,
    type,
    isAdmin = false,
    onDelete,
    onDownload,
}: DocumentCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all group relative">
            <div className="flex items-start gap-4">
                <div className="bg-indigo-50 h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <FileText className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800 truncate pr-2" title={title}>{title}</h3>
                        {isAdmin && onDelete && (
                            <button
                                onClick={() => onDelete(id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded border">
                            {category}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-medium">{date}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                        <span className="text-xs text-gray-400 font-medium">{size}</span>
                        <button
                            onClick={() => onDownload && onDownload(id)}
                            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <Download className="w-3 h-3" /> Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
