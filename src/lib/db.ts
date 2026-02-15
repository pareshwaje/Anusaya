import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
export const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');
export const PASSES_FILE = path.join(DATA_DIR, 'passes.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Visitor {
    id: string;
    name: string;
    type: string;
    guestCount?: number; // Optional? Or required? Let's make optional initially to avoid breaking old data if strict. But logically user wants it.
    vehicleNo?: string;
    wing: string;
    flatNo: string;
    date: string; // ISO string
    entryTime: string;
}

export interface ParkingPass {
    id: string;
    visitorName: string;
    vehicleNo: string;
    wing: string;
    flatNo: string;
    generatedAt: string; // ISO string
    expiresAt: string;   // ISO string (48h from generation)
    status: 'active' | 'expired' | 'used';
    accessCode: string;
}

// --- Visitors ---

export function getVisitors(): Visitor[] {
    if (!fs.existsSync(VISITORS_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(VISITORS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export function addVisitor(visitor: Omit<Visitor, 'id' | 'entryTime'>) {
    const visitors = getVisitors();
    const newVisitor: Visitor = {
        ...visitor,
        id: Math.random().toString(36).substring(2, 10),
        entryTime: new Date().toISOString(),
    };
    visitors.unshift(newVisitor); // Add to top
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(visitors, null, 2));
    return newVisitor;
}

// --- Parking Passes ---

export function getParkingPasses(): ParkingPass[] {
    if (!fs.existsSync(PASSES_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(PASSES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export function createParkingPass(pass: Omit<ParkingPass, 'id' | 'generatedAt' | 'expiresAt' | 'status'>) {
    const passes = getParkingPasses();
    const now = new Date();

    // Check GLOBAL active pass count
    // Filter for passes that are active AND not expired
    const activePasses = passes.filter(p => {
        return p.status === 'active' && new Date(p.expiresAt) > now;
    });

    if (activePasses.length >= 2) {
        throw new Error('Parking Full: Global limit of 2 guest vehicles reached.');
    }

    const expiresAt = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48h

    const newPass: ParkingPass = {
        ...pass,
        id: Math.random().toString(36).substring(2, 10).toUpperCase(),
        generatedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        status: 'active',
    };

    passes.unshift(newPass);
    fs.writeFileSync(PASSES_FILE, JSON.stringify(passes, null, 2));
    return newPass;
}

export function updateParkingPassStatus(id: string, status: ParkingPass['status']) {
    const passes = getParkingPasses();
    const index = passes.findIndex(p => p.id === id);
    if (index !== -1) {
        passes[index].status = status;
        fs.writeFileSync(PASSES_FILE, JSON.stringify(passes, null, 2));
        return passes[index];
    }
    return null;
}

// --- Community Forum (Issues) ---

export const ISSUES_FILE = path.join(DATA_DIR, 'issues.json');

export interface Comment {
    id: string;
    text: string;
    author: string; // "Wing-Flat" or "Admin"
    createdAt: string;
}

export interface Issue {
    id: string;
    category: string;
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved';
    author: string; // Member name
    flatNo: string;
    createdAt: string;
    upvotes: string[]; // List of flat numbers who "Me Too"d
    comments: Comment[];
}

export function getIssues(): Issue[] {
    if (!fs.existsSync(ISSUES_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(ISSUES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export function addIssue(issue: Omit<Issue, 'id' | 'createdAt' | 'upvotes' | 'comments'>) {
    const issues = getIssues();
    const newIssue: Issue = {
        ...issue,
        id: Math.random().toString(36).substring(2, 10),
        createdAt: new Date().toISOString(),
        upvotes: [],
        comments: [],
    };
    issues.unshift(newIssue);
    fs.writeFileSync(ISSUES_FILE, JSON.stringify(issues, null, 2));
    return newIssue;
}

export function updateIssue(id: string, updates: Partial<Issue>) {
    const issues = getIssues();
    const index = issues.findIndex(i => i.id === id);
    if (index !== -1) {
        issues[index] = { ...issues[index], ...updates };
        fs.writeFileSync(ISSUES_FILE, JSON.stringify(issues, null, 2));
        return issues[index];
    }
    return null;
}

export function addCommentToIssue(issueId: string, text: string, author: string) {
    const issues = getIssues();
    const index = issues.findIndex(i => i.id === issueId);
    if (index !== -1) {
        const newComment: Comment = {
            id: Math.random().toString(36).substring(2, 10),
            text,
            author,
            createdAt: new Date().toISOString(),
        };
        issues[index].comments.push(newComment);
        fs.writeFileSync(ISSUES_FILE, JSON.stringify(issues, null, 2));
        return issues[index];
    }
    return null;
}

export function voteIssue(issueId: string, flatNo: string) {
    const issues = getIssues();
    const index = issues.findIndex(i => i.id === issueId);
    if (index !== -1) {
        const upvotes = new Set(issues[index].upvotes);
        if (upvotes.has(flatNo)) {
            upvotes.delete(flatNo); // Toggle off
        } else {
            upvotes.add(flatNo); // Toggle on
        }
        issues[index].upvotes = Array.from(upvotes);
        fs.writeFileSync(ISSUES_FILE, JSON.stringify(issues, null, 2));
        return issues[index];
    }
    return null;
}
