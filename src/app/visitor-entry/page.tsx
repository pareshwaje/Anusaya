'use client';

import VisitorEntryForm from '@/components/VisitorEntryForm';
import Link from 'next/link';

export default function VisitorEntryPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8 pt-4">
                    <div className="font-bold text-2xl text-indigo-600 mb-2">Anusaya Society</div>
                    <h1 className="text-3xl font-bold text-gray-900">Visitor Entry</h1>
                    <p className="text-gray-500">Please fill your details to notify the resident.</p>
                </div>

                <VisitorEntryForm />

                <p className="text-center text-gray-400 text-xs mt-8">
                    Powered by SocietyFlow &copy; {new Date().getFullYear()}
                </p>
                <div className="text-center mt-4">
                    <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
