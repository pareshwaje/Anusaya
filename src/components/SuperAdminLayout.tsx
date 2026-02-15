'use client';

import SuperAdminSidebar from './SuperAdminSidebar';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <SuperAdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar used to be hardcoded, now using Navbar component for consistency */}
        <Navbar user={{ name: 'Super Admin', role: 'SUPER ADMIN' }} />

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}
