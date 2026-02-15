import { notFound } from 'next/navigation';
import LoginInterface from '@/components/LoginInterface';

interface PageProps {
    params: Promise<{ societyCode: string }>;
}

export default async function SocietyLoginPage({ params }: PageProps) {
    // Await the params to resolve the societyCode
    const { societyCode } = await params;

    const validCodes = ["4325ANU", "ANUSAYA"];
    const code = societyCode.toUpperCase();

    if (!validCodes.includes(code)) {
        notFound();
    }

    return <LoginInterface initialStep="role-select" initialCode={code} />;
}
