
import { NextResponse } from 'next/server';
import { getIssues, addIssue, updateIssue, addCommentToIssue, voteIssue } from '@/lib/db';

export async function GET() {
    const issues = getIssues();
    return NextResponse.json(issues);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Handle Action based requests (Comment, Vote, Update Status)
        if (body.action) {
            const { action, issueId, ...rest } = body;

            if (action === 'comment') {
                const issue = addCommentToIssue(issueId, rest.text, rest.author);
                return NextResponse.json(issue);
            }

            if (action === 'vote') {
                const issue = voteIssue(issueId, rest.flatNo);
                return NextResponse.json(issue);
            }

            if (action === 'status') {
                const issue = updateIssue(issueId, { status: rest.status });
                return NextResponse.json(issue);
            }

            return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
        }

        // Default: Create New Issue
        const newIssue = addIssue({
            category: body.category,
            title: body.title,
            description: body.description,
            status: 'open',
            author: body.author || 'Anonymous',
            flatNo: body.flatNo || 'Unknown',
        });
        return NextResponse.json(newIssue, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
