'use client';

import PassValidator from '@/components/PassValidator';

export default function WatchmanPage() {
    return (
        <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">

            <div className="w-full max-w-md">
                <div className="text-center mb-6 pt-4">
                    <h1 className="text-2xl font-bold text-white">Security Check</h1>
                    <p className="text-gray-400">Validate Guest Parking Pass</p>
                </div>

                <PassValidator />

            </div>
        </div>
    );
}
