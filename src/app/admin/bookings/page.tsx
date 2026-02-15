'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import BookingCard, { BookingStatus } from '@/components/BookingCard';
import { Search, Filter, CalendarDays } from 'lucide-react';

// Dummy data
const initialBookings = [
    {
        id: '1',
        amenityName: 'Clubhouse Hall',
        date: '25 Oct 2024',
        timeSlot: '6:00 PM - 10:00 PM',
        purpose: 'Daughter\'s Birthday Party',
        status: 'pending' as BookingStatus,
        member: 'Rahul Deshmukh',
        flatNo: 'A-102',
    },
    {
        id: '2',
        amenityName: 'Tennis Court',
        date: '21 Oct 2024',
        timeSlot: '7:00 AM - 9:00 AM',
        purpose: 'Morning Practice',
        status: 'confirmed' as BookingStatus,
        member: 'Amit Kumar',
        flatNo: 'C-501',
    },
    {
        id: '3',
        amenityName: 'Guest Parking',
        date: '20 Oct 2024',
        timeSlot: 'Full Day',
        purpose: 'Guest Initial Visit',
        status: 'rejected' as BookingStatus,
        member: 'Priya Sharma',
        flatNo: 'B-304',
    },
];

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState(initialBookings);
    const [filter, setFilter] = useState<BookingStatus | 'all'>('all');

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        const newStatus = action === 'approve' ? 'confirmed' : 'rejected';
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    };

    const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Booking Requests
                    </h1>
                    <p className="text-muted-foreground mt-1">Approve or reject amenity reservation requests.</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['all', 'pending', 'confirmed', 'rejected'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold capitalize whitespace-nowrap transition-colors ${filter === f
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Requests List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBookings.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            {...booking}
                            isAdmin={true}
                            onAction={handleAction}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredBookings.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <CalendarDays className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No bookings found in this category.</p>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
}
