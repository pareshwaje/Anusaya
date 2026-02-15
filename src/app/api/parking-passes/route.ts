import { NextResponse } from 'next/server';
import { getParkingPasses, createParkingPass, updateParkingPassStatus } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const flatNo = searchParams.get('flatNo');

    let passes = getParkingPasses();

    if (flatNo) {
        passes = passes.filter(p => p.flatNo === flatNo);
    }

    return NextResponse.json(passes);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newPass = createParkingPass(body);
        return NextResponse.json(newPass);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to create parking pass' },
            { status: 400 } // Bad Request if limit reached
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        if (!body.id || !body.status) {
            return NextResponse.json({ error: 'ID and Status required' }, { status: 400 });
        }
        const updated = updateParkingPassStatus(body.id, body.status);
        if (!updated) {
            return NextResponse.json({ error: 'Pass not found' }, { status: 404 });
        }
        return NextResponse.json(updated);

    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
