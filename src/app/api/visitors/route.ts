import { NextResponse } from 'next/server';
import { getVisitors, addVisitor } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const flatNo = searchParams.get('flatNo');
    const wing = searchParams.get('wing');
    const date = searchParams.get('date');

    let visitors = getVisitors();

    if (flatNo) {
        visitors = visitors.filter(v => v.flatNo === flatNo);
    }
    if (wing) {
        visitors = visitors.filter(v => v.wing === wing);
    }
    if (date) {
        // Simple date filtering (assuming exact match or includes)
        visitors = visitors.filter(v => v.date.includes(date));
    }

    return NextResponse.json(visitors);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Basic validation
        if (!body.name || !body.wing || !body.flatNo) {
            return NextResponse.json(
                { error: 'Name, Wing, and Flat Number are required' },
                { status: 400 }
            );
        }

        const newVisitor = addVisitor(body);
        return NextResponse.json(newVisitor);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create visitor entry' },
            { status: 500 }
        );
    }
}
