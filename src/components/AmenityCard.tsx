'use client';

import { Users, Clock, Info, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AmenityCardProps {
    id: string;
    name: string;
    image: string; // Emoji or URL
    capacity: string;
    timings: string;
    rules: string;
    onBook: (id: string) => void;
}

export default function AmenityCard({
    id,
    name,
    image,
    capacity,
    timings,
    rules,
    onBook,
}: AmenityCardProps) {
    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
            <div className="h-32 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-6xl">
                {image}
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>Capacity: <span className="font-medium text-gray-800">{capacity}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{timings}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span className="text-xs text-muted-foreground leading-snug">{rules}</span>
                    </div>
                </div>

                <button
                    onClick={() => onBook(id)}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <CalendarCheck className="w-4 h-4" /> Book Now
                </button>
            </div>
        </div>
    );
}
