'use client';

import { useState } from 'react';
import MemberLayout from '@/components/MemberLayout';
import AmenityCard from '@/components/AmenityCard';
import BookingCard, { BookingStatus } from '@/components/BookingCard';
import { CalendarDays, Plus } from 'lucide-react';

// Dummy Amenities
const amenities = [
    {
        id: '1',
        name: 'Clubhouse Hall',
        image: '🎉',
        capacity: '50-80 People',
        timings: '10:00 AM - 10:00 PM',
        rules: 'Advance booking required (7 days). Alcohol not permitted.',
    },
    {
        id: '2',
        name: 'Tennis Court',
        image: '🎾',
        capacity: '2/4 Players',
        timings: '6:00 AM - 9:00 PM',
        rules: 'Max 1 hour slot per member. Bring your own gear.',
    },
    {
        id: '3',
        name: 'Guest Parking',
        image: '🚗',
        capacity: '1 Vehicle Slot',
        timings: '24 Hours',
        rules: 'Overnight parking charged extra. Limit 2 days.',
    },
    {
        id: '4',
        name: 'Swimming Pool',
        image: '🏊‍♂️',
        capacity: '20 People',
        timings: '6:00 AM - 10:00 PM',
        rules: 'Proper swimwear mandatory. Shower before entering.',
    },
];

// Dummy My Bookings
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
];

export default function MemberBookingsPage() {
    const [activeTab, setActiveTab] = useState<'browse' | 'my-bookings'>('browse');
    const [myBookings, setMyBookings] = useState(initialBookings);
    const [showModal, setShowModal] = useState(false);
    const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null);

    // Booking Form State
    const [bookingForm, setBookingForm] = useState({
        date: '',
        timeSlot: '',
        purpose: '',
    });

    const handleBookClick = (id: string) => {
        setSelectedAmenity(id);
        setShowModal(true);
    };

    const handleSubmitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        const amenity = amenities.find(a => a.id === selectedAmenity);
        if (!amenity) return;

        const newBooking = {
            id: Date.now().toString(),
            amenityName: amenity.name,
            date: bookingForm.date,
            timeSlot: bookingForm.timeSlot,
            purpose: bookingForm.purpose,
            status: 'pending' as BookingStatus,
            member: 'Rahul Deshmukh',
            flatNo: 'A-102',
        };

        setMyBookings([newBooking, ...myBookings]);
        setShowModal(false);
        setActiveTab('my-bookings');
        setBookingForm({ date: '', timeSlot: '', purpose: '' });
    };

    return (
        <MemberLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Amenities & Booking
                    </h1>
                    <p className="text-muted-foreground mt-1">Reserve common facilities for personal use.</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab('browse')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'browse'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Browse Amenities
                    </button>
                    <button
                        onClick={() => setActiveTab('my-bookings')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'my-bookings'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        My Bookings
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'browse' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {amenities.map((amenity) => (
                            <AmenityCard
                                key={amenity.id}
                                {...amenity}
                                onBook={handleBookClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {myBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                {...booking}
                                isAdmin={false}
                            />
                        ))}
                        {myBookings.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <CalendarDays className="w-12 h-12 text-gray-300 mb-4" />
                                <p className="text-gray-500">No bookings yet. Browse amenities to create one!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Booking Modal */}
                {showModal && selectedAmenity && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
                        <div className="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-full md:zoom-in-95 duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Request Booking</h2>
                                    <p className="text-sm text-indigo-600 font-medium">
                                        {amenities.find(a => a.id === selectedAmenity)?.name}
                                    </p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <span className="text-2xl leading-none">&times;</span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmitBooking} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            required
                                            type="date"
                                            value={bookingForm.date}
                                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                                        <select
                                            required
                                            value={bookingForm.timeSlot}
                                            onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
                                        >
                                            <option value="">Select Slot</option>
                                            <option>Morning (9 AM - 12 PM)</option>
                                            <option>Afternoon (1 PM - 4 PM)</option>
                                            <option>Evening (5 PM - 9 PM)</option>
                                            <option>Full Day</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose / Occasion</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={bookingForm.purpose}
                                        onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })}
                                        placeholder="e.g., Birthday Party, Family Gathering..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all"
                                    >
                                        Confirm Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </MemberLayout>
    );
}
