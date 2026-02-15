'use client';

import MemberSidebar from '@/components/MemberSidebar';
import Navbar from './Navbar';
import MobileBottomNav from './MobileBottomNav';
import { ReactNode } from 'react';

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <MemberSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={{ name: 'Aarav Sharma', role: 'MEMBER' }} />

        {/* Page Content */}
        <main className="p-6 pb-24 md:pb-6 flex-1 overflow-y-auto bg-muted/30 scrollbar-hide">
          {children}
        </main>
      </div>
      <MobileBottomNav role="MEMBER" />
    </div>
  );
}
