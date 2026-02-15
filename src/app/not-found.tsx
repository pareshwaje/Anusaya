import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
            <div className="p-4 rounded-full bg-muted mb-6">
                <FileQuestion className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">404</h1>
            <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/login"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
                Go to Login
            </Link>
        </div>
    );
}
