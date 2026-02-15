// components/AdminLayout.tsx
'use client';

import AdminSidebar from './AdminSidebar';
import Navbar from './Navbar';
import MobileBottomNav from './MobileBottomNav';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={{ name: 'Raj Kumar', role: 'ADMIN' }} />

        {/* Page Content */}
        <main className="p-6 pb-24 md:pb-6 flex-1 overflow-y-auto bg-muted/30 scrollbar-hide">
          {children}
        </main>
      </div>
      <MobileBottomNav role="ADMIN" />
    </div>
  );
}
